'use client'
import { useState, useEffect } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import dynamic from 'next/dynamic'
import { zipFetch } from '@/lib/data/zip-client'


const USTimezoneMap = dynamic(
  () => import('@/components/ui/USTimezoneMap'),
  {
    ssr: false,

    loading: () => (
      <div className="h-[430px] rounded-2xl border border-gray-200 bg-gray-50 animate-pulse flex items-center justify-center">

        <div className="text-sm text-gray-400">
          Loading US timezone map...
        </div>

      </div>
    ),
  }
)

const TZ_CONFIG: Record<string, { label: string; offset: string; dstOffset: string; icon: string; color: string; states: string }> = {
  'America/New_York':    { label: 'Eastern Time (ET)',    offset: 'UTC-5', dstOffset: 'UTC-4', icon: '🗽', color: '#3b82f6', states: 'CT, DE, FL, GA, IN, KY, ME, MD, MA, MI, NH, NJ, NY, NC, OH, PA, RI, SC, TN, VA, VT, WV, DC' },
  'America/Chicago':     { label: 'Central Time (CT)',    offset: 'UTC-6', dstOffset: 'UTC-5', icon: '🌾', color: '#22c55e', states: 'AL, AR, IL, IA, KS, LA, MN, MS, MO, NE, ND, OK, SD, TN, TX, WI' },
  'America/Denver':      { label: 'Mountain Time (MT)',   offset: 'UTC-7', dstOffset: 'UTC-6', icon: '🏔️', color: '#f59e0b', states: 'CO, ID, MT, NM, UT, WY' },
  'America/Los_Angeles': { label: 'Pacific Time (PT)',    offset: 'UTC-8', dstOffset: 'UTC-7', icon: '🌊', color: '#8b5cf6', states: 'CA, NV, OR, WA' },
  'America/Phoenix':     { label: 'Arizona (No DST)',     offset: 'UTC-7', dstOffset: 'UTC-7', icon: '🌵', color: '#ef4444', states: 'AZ (most areas)' },
  'America/Anchorage':   { label: 'Alaska Time (AKT)',    offset: 'UTC-9', dstOffset: 'UTC-8', icon: '🐻', color: '#06b6d4', states: 'AK' },
  'Pacific/Honolulu':    { label: 'Hawaii Time (HST)',    offset: 'UTC-10', dstOffset: 'UTC-10', icon: '🌺', color: '#ec4899', states: 'HI' },
  // Adak, AK is a genuine outlier — it's the one part of the US on
  // Hawaii-Aleutian Time, which (unlike Honolulu) DOES observe DST.
  'America/Adak':        { label: 'Hawaii-Aleutian Time (HDT)', offset: 'UTC-10', dstOffset: 'UTC-9', icon: '🏝️', color: '#0ea5e9', states: 'AK (Aleutian Islands)' },
}

// ZIPs in "state-split" counties resolve to their own specific IANA tzid
// (e.g. Detroit, Louisville, Boise, Indianapolis, parts of North Dakota)
// rather than one of the 7 keys above. Every one of these observes the
// exact same present-day civil time rules as one of the major zones — the
// separate IANA id exists only for pre-1970 historical reasons — so map
// each to the matching TZ_CONFIG entry for display purposes. The specific
// tzid itself (e.g. "America/Indiana/Vincennes") is still shown to the
// user elsewhere and used for the actual boundary highlight on the map.
const TZID_DISPLAY_ALIASES: Record<string, string> = {
  'America/Detroit': 'America/New_York',
  'America/Kentucky/Louisville': 'America/New_York',
  'America/Kentucky/Monticello': 'America/New_York',
  'America/Indiana/Indianapolis': 'America/New_York',
  'America/Indiana/Vincennes': 'America/New_York',
  'America/Indiana/Winamac': 'America/New_York',
  'America/Indiana/Marengo': 'America/New_York',
  'America/Indiana/Petersburg': 'America/New_York',
  'America/Indiana/Vevay': 'America/New_York',
  'America/Indiana/Tell_City': 'America/Chicago',
  'America/Indiana/Knox': 'America/Chicago',
  'America/Menominee': 'America/Chicago',
  'America/North_Dakota/Center': 'America/Denver',
  'America/North_Dakota/New_Salem': 'America/Denver',
  'America/North_Dakota/Beulah': 'America/Denver',
  'America/Boise': 'America/Denver',
  'America/Juneau': 'America/Anchorage',
  'America/Sitka': 'America/Anchorage',
  'America/Metlakatla': 'America/Anchorage',
  'America/Yakutat': 'America/Anchorage',
  'America/Nome': 'America/Anchorage',
  // Deprecated/legacy link some ZIP records may still use.
  'America/Shiprock': 'America/Denver',
}

function getTzConfig(tzid: string | undefined) {
  if (!tzid) return null
  return TZ_CONFIG[tzid] ?? TZ_CONFIG[TZID_DISPLAY_ALIASES[tzid]] ?? null
}

const TIMEZONE_MAP_ORDER = [
  'Pacific/Honolulu',
  'America/Anchorage',
  'America/Los_Angeles',
  'America/Denver',
  'America/Phoenix',
  'America/Chicago',
  'America/New_York',
]




function getCurrentTimeInTz(tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  }).format(new Date())
}

function isDST(tz: string): boolean {
  const jan = new Date(new Date().getFullYear(), 0, 1)
  const jul = new Date(new Date().getFullYear(), 6, 1)
  const janOff = new Date(jan.toLocaleString('en-US', { timeZone: tz })).getTime() - jan.getTime()
  const julOff = new Date(jul.toLocaleString('en-US', { timeZone: tz })).getTime() - jul.getTime()
  return Math.min(janOff, julOff) !== new Date(new Date().toLocaleString('en-US', { timeZone: tz })).getTime() - new Date().getTime()
}

function shareResult(result: any, tzCfg: any) {
  const text = `🌐 Timezone for ZIP ${result.zip}\n📍 ${result.city}, ${result.state}\n🕐 ${tzCfg.label}\n⏰ Current time: ${getCurrentTimeInTz(result.timezone)}\nCheck yours: tooltrio.com/zip/zip-to-timezone-map`
  if (navigator.share) navigator.share({ title: 'ZIP Timezone', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResult(result: any, tzCfg: any) {
  const text = `ZIP Code Timezone Report\n\nZIP: ${result.zip}\nCity: ${result.city}, ${result.state}\nCounty: ${result.county}\n\nTimezone: ${tzCfg.label}\nTZ Identifier: ${result.timezone}\nStandard Offset: ${tzCfg.offset}\nDST Offset: ${tzCfg.dstOffset}\nCurrent Time: ${getCurrentTimeInTz(result.timezone)}\n\nOther US Timezones Comparison:\n${Object.entries(TZ_CONFIG).map(([tz, cfg]) => `${cfg.label}: ${getCurrentTimeInTz(tz)}`).join('\n')}\n\nGenerated: tooltrio.com/zip/zip-to-timezone-map`
  const blob = new Blob([text], { type: 'text/plain' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `timezone-${result.zip}.txt`; a.click()
}

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tick, setTick] = useState(0)

  // Tick every second for live clocks
 // Tick every second for live clocks
useEffect(() => {
  const id = setInterval(() => {
    setTick(t => t + 1)
  }, 1000)

  return () => clearInterval(id)
}, [])

  async function lookup(z?: string) {
    const val = (z || zip).trim(); if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP'); setResult(null); return }
    setLoading(true); setError('')
    const res = await zipFetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    setResult(data)
  }

  const tzCfg = getTzConfig(result?.timezone)

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Enter ZIP code (e.g. 10001)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <button onClick={() => lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '🌐 Look Up'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {result && tzCfg && (
        <div>
      {/* ── Timezone Map Result Summary ───────────────────── */}
<div
  className="rounded-3xl border p-5 mb-4"
  style={{
    background: `linear-gradient(135deg, ${tzCfg.color}12, #ffffff)`,
    borderColor: `${tzCfg.color}35`,
    boxShadow: '0 8px 25px rgba(15,23,42,.06)',
  }}
>

  {/* Found status */}
  <div className="text-center">

    <div
      className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[2px] px-3 py-1 rounded-full"
      style={{
        color: tzCfg.color,
        background: `${tzCfg.color}12`,
      }}
    >
      ✓ US ZIP TIMEZONE FOUND
    </div>

    <div className="text-4xl mt-4">
      {tzCfg.icon}
    </div>

    <h2
      className="text-2xl sm:text-3xl font-black mt-2"
      style={{ color: tzCfg.color }}
    >
      {tzCfg.label}
    </h2>

    <div className="text-sm text-gray-500 mt-2">
      <strong className="text-gray-800">
        {result.city}, {result.stateCode}
      </strong>
      {' '}• ZIP {result.zip} • USA
    </div>

  </div>


  {/* Main timezone facts */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-5">

    {/* Current time */}
    <div className="col-span-2 lg:col-span-1 rounded-xl border border-gray-200 bg-white p-3 text-center">

      <div className="text-[10px] uppercase font-bold tracking-wide text-gray-400">
        🕐 Local Time
      </div>

      <div
        className="font-black text-lg mt-1"
        style={{ color: tzCfg.color }}
        suppressHydrationWarning
      >
        {new Intl.DateTimeFormat('en-US', {
          timeZone: result.timezone,
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date())}
      </div>

    </div>


    {/* Timezone abbreviation */}
    <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">

      <div className="text-[10px] uppercase font-bold tracking-wide text-gray-400">
        Zone
      </div>

      <div className="font-black text-gray-900 mt-1">
        {new Intl.DateTimeFormat('en-US', {
          timeZone: result.timezone,
          timeZoneName: 'short',
        })
          .formatToParts(new Date())
          .find(p => p.type === 'timeZoneName')?.value || '—'}
      </div>

    </div>


    {/* Current UTC */}
    <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">

      <div className="text-[10px] uppercase font-bold tracking-wide text-gray-400">
        Standard
      </div>

      <div className="font-black text-gray-900 mt-1">
        {tzCfg.offset}
      </div>

    </div>


    {/* DST */}
    <div className="rounded-xl border border-gray-200 bg-white p-3 text-center">

      <div className="text-[10px] uppercase font-bold tracking-wide text-gray-400">
        ☀️ DST
      </div>

      <div className="font-black text-gray-900 text-sm mt-1">
        {result.timezone === 'America/Phoenix' ||
        result.timezone === 'Pacific/Honolulu'
          ? 'No DST'
          : isDST(result.timezone)
            ? 'Active'
            : 'Inactive'}
      </div>

    </div>

  </div>


  {/* Map explanation */}
  <div
    className="rounded-xl p-3 mt-3 flex items-start gap-3"
    style={{
      background: `${tzCfg.color}0D`,
    }}
  >

    <div className="text-xl">
      📍
    </div>

    <div>

      <div className="text-xs font-bold text-gray-800">
        Where is ZIP {result.zip} on the US timezone map?
      </div>

      <div className="text-xs text-gray-500 mt-1 leading-5">
        {result.city}, {result.stateCode} is assigned to{' '}
        <strong style={{ color: tzCfg.color }}>
          {tzCfg.label}
        </strong>
        {' '}with the IANA timezone identifier{' '}
        <strong className="text-gray-700">
          {result.timezone}
        </strong>.
        The matching timezone region is highlighted below.
      </div>

    </div>

  </div>

</div>


{/* ── Real Interactive US Timezone Map ─────────────────── */}

<USTimezoneMap
  lat={result.lat}
  lng={result.lng}
  zip={result.zip}
  city={result.city}
  stateCode={result.stateCode}
  timezone={result.timezone}
/>






          {/* All US timezones comparison */}
          <div className="rounded-xl border p-4 mb-4 bg-white">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">🕐 Current Time Across Major US Time Zones</p>
            <div className="space-y-2">
              {Object.entries(TZ_CONFIG).map(([tz, cfg]) => (
                <div key={tz} className={`flex items-center gap-3 p-2.5 rounded-xl ${tz === result.timezone ? 'ring-2 ring-green-500' : ''}`}
                  style={{ background: tz === result.timezone ? `${cfg.color}15` : 'rgba(248,250,252,0.8)' }}>
                  <span className="text-xl w-7 flex-shrink-0">{cfg.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs text-gray-700 truncate">{cfg.label}</div>
                    <div className="text-xs text-gray-400">{cfg.offset}</div>
                  </div>
                  <div className="font-mono text-xs font-bold text-gray-700 text-right flex-shrink-0" suppressHydrationWarning>
                    {getCurrentTimeInTz(tz)}
                  </div>
                  {tz === result.timezone && <span className="text-green-600 font-bold text-xs flex-shrink-0">← yours</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => shareResult(result, tzCfg)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share
            </button>
            <button onClick={() => downloadResult(result, tzCfg)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
