import path from 'path'
import fs from 'fs'

// Server-side only - reads JSON files from disk
const DATA_DIR = path.join(process.cwd(), 'lib/data/zips')

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

// Cache in memory after first load (per server instance)
let _index: Record<string, [string,string,number,number,string,string,string,number,number,string,string]> | null = null
const _stateCache: Record<string, ZipRecord[]> = {}

function loadIndex() {
  if (_index) return _index
  const raw = fs.readFileSync(path.join(DATA_DIR, 'index.json'), 'utf-8')
  _index = JSON.parse(raw)
  return _index!
}

export function lookupZip(zip: string): ZipRecord | null {
  const idx = loadIndex()
  const entry = idx[zip]
  if (!entry) return null
  return {
    zip,
    city: entry[0],
    stateCode: entry[1],
    lat: entry[2],
    lng: entry[3],
    timezone: entry[4],
    areaCode: entry[5],
    county: entry[6],
    population: entry[7],
    elevation: entry[8],
    type: entry[9],
    state: entry[10],
  }
}

export function lookupMany(zips: string[]): ZipRecord[] {
  return zips.map(z => lookupZip(z)).filter(Boolean) as ZipRecord[]
}

export function loadState(stateCode: string): ZipRecord[] {
  if (_stateCache[stateCode]) return _stateCache[stateCode]
  const filePath = path.join(DATA_DIR, `${stateCode.toUpperCase()}.json`)
  if (!fs.existsSync(filePath)) return []
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  _stateCache[stateCode] = data
  return data
}

export function searchByCity(query: string, limit = 30): ZipRecord[] {
  const idx = loadIndex()
  const q = query.toLowerCase().trim()
  const results: ZipRecord[] = []
  for (const [zip, entry] of Object.entries(idx)) {
    if (entry[0].toLowerCase().includes(q) || entry[6].toLowerCase().includes(q)) {
      results.push({ zip, city:entry[0], stateCode:entry[1], lat:entry[2], lng:entry[3],
        timezone:entry[4], areaCode:entry[5], county:entry[6], population:entry[7],
        elevation:entry[8], type:entry[9], state:entry[10] })
      if (results.length >= limit) break
    }
  }
  return results
}

export function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

export function getNearby(zip: string, radiusMiles = 25, limit = 30): (ZipRecord & {distance:number})[] {
  const origin = lookupZip(zip)
  if (!origin) return []
  const idx = loadIndex()
  const results: (ZipRecord & {distance:number})[] = []
  for (const [z, entry] of Object.entries(idx)) {
    if (z === zip) continue
    const d = distanceMiles(origin.lat, origin.lng, entry[2], entry[3])
    if (d <= radiusMiles) {
      results.push({ zip:z, city:entry[0], stateCode:entry[1], lat:entry[2], lng:entry[3],
        timezone:entry[4], areaCode:entry[5], county:entry[6], population:entry[7],
        elevation:entry[8], type:entry[9], state:entry[10], distance:d })
    }
  }
  return results.sort((a,b) => a.distance - b.distance).slice(0, limit)
}

export function getTotalCount(): number {
  return Object.keys(loadIndex()).length
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

export const STATE_NAMES: Record<string,string> = {
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
