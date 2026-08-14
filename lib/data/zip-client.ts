import { API_LIMITS, clampPositiveInt, clampPositiveNumber } from '@/lib/api/request-limits'
import { normalizeZipCode } from '@/lib/data/zip-utils'

// Client-side ZIP data layer.
// Loads /public/zip-data/index.json (real USPS/Census-derived city, state,
// county, coordinates, timezone, area code data — served as a static file,
// gzip-compressed by the host to ~1MB) ONCE per browser session, caches it
// in memory, and answers every ZIP tool page from that cache. No API route,
// no per-lookup network round trip after the first load.

export interface ZipRecord {
  zip: string
  city: string
  state: string
  stateCode: string
  county: string
  lat: number
  lng: number
  timezone: string
  areaCode: string
  population: number
  elevation: number
  type: string
}

type RawEntry = [string, string, number, number, string, string, string, number, number, string, string]
type RawIndex = Record<string, RawEntry>

let _indexPromise: Promise<RawIndex> | null = null

function loadIndex(): Promise<RawIndex> {
  if (!_indexPromise) {
    _indexPromise = fetch('/zip-data/index.json').then(r => {
      if (!r.ok) throw new Error('Failed to load ZIP data')
      return r.json()
    })
  }
  return _indexPromise
}

function toRecord(zip: string, e: RawEntry): ZipRecord {
  return {
    zip, city: e[0], stateCode: e[1], lat: e[2], lng: e[3], timezone: e[4],
    areaCode: e[5], county: e[6], population: e[7], elevation: e[8], type: e[9], state: e[10],
  }
}

export function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const TIMEZONE_OFFSETS: Record<string, string> = {
  'America/New_York': 'Eastern (ET)',
  'America/Chicago': 'Central (CT)',
  'America/Denver': 'Mountain (MT)',
  'America/Los_Angeles': 'Pacific (PT)',
  'America/Phoenix': 'Mountain (No DST)',
  'America/Anchorage': 'Alaska (AKT)',
  'Pacific/Honolulu': 'Hawaii (HT)',
  'America/Indiana/Indianapolis': 'Eastern (No DST)',
  'America/Kentucky/Louisville': 'Eastern (ET)',
  'America/Detroit': 'Eastern (ET)',
  'America/Boise': 'Mountain (MT)',
}

export const ALL_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI',
  'ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV',
  'NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY']

export const STATE_NAMES: Record<string, string> = {
  'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California',
  'CO':'Colorado','CT':'Connecticut','DC':'Washington DC','DE':'Delaware','FL':'Florida',
  'GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa',
  'KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland',
  'MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri',
  'MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey',
  'NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio',
  'OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina',
  'SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont',
  'VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming',
}

async function lookupZip(zip: string): Promise<ZipRecord | null> {
  const idx = await loadIndex()
  const e = idx[zip]
  return e ? toRecord(zip, e) : null
}

async function getNearby(zip: string, radiusMiles = 25, limit = 30): Promise<(ZipRecord & { distance: number })[]> {
  const idx = await loadIndex()
  const origin = idx[zip]
  if (!origin) return []
  const oLat = origin[2], oLng = origin[3]
  const results: (ZipRecord & { distance: number })[] = []
  for (const [z, e] of Object.entries(idx)) {
    if (z === zip) continue
    const d = distanceMiles(oLat, oLng, e[2], e[3])
    if (d <= radiusMiles) results.push({ ...toRecord(z, e), distance: d })
  }
  return results.sort((a, b) => a.distance - b.distance).slice(0, limit)
}

async function loadState(stateCode: string): Promise<ZipRecord[]> {
  const idx = await loadIndex()
  const code = stateCode.toUpperCase()
  const results: ZipRecord[] = []
  for (const [z, e] of Object.entries(idx)) if (e[1] === code) results.push(toRecord(z, e))
  return results
}

async function searchByQuery(q: string, limit = 30): Promise<ZipRecord[]> {
  const idx = await loadIndex()
  const query = q.toLowerCase().trim()
  const results: ZipRecord[] = []
  for (const [z, e] of Object.entries(idx)) {
    if (e[0].toLowerCase().includes(query) || e[6].toLowerCase().includes(query)) {
      results.push(toRecord(z, e))
      if (results.length >= limit) break
    }
  }
  return results
}

async function searchByCity(city: string, stateCode?: string, limit = 30): Promise<ZipRecord[]> {
  const idx = await loadIndex()
  const c = city.toLowerCase().trim()
  const s = stateCode?.toUpperCase()
  const results: ZipRecord[] = []
  for (const [z, e] of Object.entries(idx)) {
    if (e[0].toLowerCase() === c && (!s || e[1] === s)) {
      results.push(toRecord(z, e))
      if (results.length >= limit) break
    }
  }
  if (!results.length) return searchByQuery(city, limit)
  return results
}

async function searchByAreaCode(areaCode: string, limit = 500): Promise<ZipRecord[]> {
  const idx = await loadIndex()
  const results: ZipRecord[] = []
  for (const [z, e] of Object.entries(idx)) {
    if (e[5] === areaCode) {
      results.push(toRecord(z, e))
      if (results.length >= limit) break
    }
  }
  return results
}

interface MockResponse { ok: boolean; json: () => Promise<any> }

// Drop-in replacement for `fetch('/api/zip/...')`. Same call signature,
// same response shape (`res.ok`, `res.json()`), but resolved entirely from
// the cached static index — no server route involved.
export async function zipFetch(url: string): Promise<MockResponse> {
  const u = new URL(url, 'http://local')
  const p = u.searchParams
  const ok = (json: any): MockResponse => ({ ok: true, json: async () => json })
  const fail = (error: string): MockResponse => ({ ok: false, json: async () => ({ error }) })

  try {
    if (u.pathname === '/api/zip/lookup') {
      const rawZip = p.get('zip')?.trim() || ''
      const zip = normalizeZipCode(rawZip)
      if (!zip) return fail('Enter a valid 5-digit ZIP or 9-digit ZIP+4 code')
      const rec = await lookupZip(zip)
      if (!rec) return fail(`ZIP code ${zip} not found`)
      const nearby = await getNearby(zip, 30, 6)
      const tzLabel = TIMEZONE_OFFSETS[rec.timezone] || rec.timezone
      return ok({ ...rec, tzLabel, nearby })
    }

    if (u.pathname === '/api/zip/search') {
      const limit = clampPositiveInt(p.get('limit'), 30, API_LIMITS.searchLimit)
      const areaCode = p.get('areaCode')?.trim()
      const city = p.get('city')?.trim()
      const state = p.get('state')?.trim()
      const q = p.get('q')?.trim()
      let results: ZipRecord[] = []
      if (areaCode) results = await searchByAreaCode(areaCode, limit)
      else if (city) results = await searchByCity(city, state, limit)
      else if (q && q.length >= 2) results = await searchByQuery(q, limit)
      else return fail('Enter at least 2 characters')
      return ok({ results, count: results.length })
    }

    if (u.pathname === '/api/zip/state') {
      const code = p.get('code')?.trim().toUpperCase() || ''
      if (code.length !== 2) return fail('Enter a valid 2-letter state code')
      const results = await loadState(code)
      if (!results.length) return fail(`No ZIPs found for ${code}`)
      return ok({ state: code, results, count: results.length })
    }

    if (u.pathname === '/api/zip/nearby') {
      const zip = p.get('zip')?.trim() || ''
      const radius = parseFloat(p.get('radius') || '25')
      const limit = clampPositiveInt(p.get('limit'), 30, API_LIMITS.searchLimit)
      if (!/^\d{5}$/.test(zip)) return fail('Enter a valid 5-digit ZIP code')
      const origin = await lookupZip(zip)
      if (!origin) return fail(`ZIP ${zip} not found`)
      const results = await getNearby(zip, radius, limit)
      return ok({ origin, results, count: results.length })
    }

    if (u.pathname === '/api/zip/distance') {
      const from = p.get('from')?.trim() || ''
      const to = p.get('to')?.trim() || ''
      if (!/^\d{5}$/.test(from) || !/^\d{5}$/.test(to)) return fail('Enter valid 5-digit ZIP codes for both fields')
      const r1 = await lookupZip(from)
      const r2 = await lookupZip(to)
      if (!r1) return fail(`ZIP ${from} not found`)
      if (!r2) return fail(`ZIP ${to} not found`)
      const miles = distanceMiles(r1.lat, r1.lng, r2.lat, r2.lng)
      const km = miles * 1.60934
      return ok({ r1, r2, miles: +miles.toFixed(2), km: +km.toFixed(2) })
    }

    return fail('Unknown ZIP data request')
  } catch {
    return fail('Failed to load ZIP data')
  }
}
