'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

const TZ_CONFIG: Record<string, { label: string; offset: string; dstOffset: string; icon: string; color: string; states: string }> = {
  'America/New_York':    { label: 'Eastern Time (ET)',    offset: 'UTC-5', dstOffset: 'UTC-4', icon: '🗽', color: '#3b82f6', states: 'CT, DE, FL, GA, IN, KY, ME, MD, MA, MI, NH, NJ, NY, NC, OH, PA, RI, SC, TN, VA, VT, WV, DC' },
  'America/Chicago':     { label: 'Central Time (CT)',    offset: 'UTC-6', dstOffset: 'UTC-5', icon: '🌾', color: '#22c55e', states: 'AL, AR, IL, IA, KS, LA, MN, MS, MO, NE, ND, OK, SD, TN, TX, WI' },
  'America/Denver':      { label: 'Mountain Time (MT)',   offset: 'UTC-7', dstOffset: 'UTC-6', icon: '🏔️', color: '#f59e0b', states: 'CO, ID, MT, NM, UT, WY' },
  'America/Los_Angeles': { label: 'Pacific Time (PT)',    offset: 'UTC-8', dstOffset: 'UTC-7', icon: '🌊', color: '#8b5cf6', states: 'CA, NV, OR, WA' },
  'America/Phoenix':     { label: 'Arizona (No DST)',     offset: 'UTC-7', dstOffset: 'UTC-7', icon: '🌵', color: '#ef4444', states: 'AZ (most areas)' },
  'America/Anchorage':   { label: 'Alaska Time (AKT)',    offset: 'UTC-9', dstOffset: 'UTC-8', icon: '🐻', color: '#06b6d4', states: 'AK' },
  'Pacific/Honolulu':    { label: 'Hawaii Time (HST)',    offset: 'UTC-10', dstOffset: 'UTC-10', icon: '🌺', color: '#ec4899', states: 'HI' },
}

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
  useState(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(id)
  })

  async function lookup(z?: string) {
    const val = (z || zip).trim(); if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP'); setResult(null); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    setResult(data)
  }

  const tzCfg = result ? TZ_CONFIG[result.timezone] : null

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
          {/* Primary result */}
          <div className="rounded-2xl border p-5 mb-4" style={{ background: `${tzCfg.color}12`, borderColor: `${tzCfg.color}40` }}>
            <div className="text-center mb-4">
              <div className="text-4xl mb-1">{tzCfg.icon}</div>
              <div className="text-2xl font-black" style={{ color: tzCfg.color }}>{tzCfg.label}</div>
              <div className="text-gray-500 text-sm mt-1">{result.city}, {result.state} · ZIP {result.zip}</div>
            </div>
            <div className="rounded-xl p-4 mb-3 text-center" style={{ background: `${tzCfg.color}18` }}>
              <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Current Local Time</div>
              <div className="font-black text-xl" style={{ color: tzCfg.color }} suppressHydrationWarning>
                {getCurrentTimeInTz(result.timezone)}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { label: '⏱️ Standard Offset', value: tzCfg.offset },
                { label: '☀️ DST Offset', value: tzCfg.dstOffset },
                { label: '🔁 DST Active', value: result.timezone === 'America/Phoenix' || result.timezone === 'Pacific/Honolulu' ? 'No (No DST)' : 'Yes (Mar–Nov)' },
                { label: '👥 Population', value: result.population > 0 ? result.population.toLocaleString() : 'N/A' },
                { label: '📋 TZ ID', value: result.timezone },
                { label: '📞 Area Code', value: `(${result.areaCode})` },
              ].map(r => (
                <div key={r.label} className="rounded-xl border p-3 bg-white/70">
                  <div className="text-xs text-gray-400">{r.label}</div>
                  <div className="font-bold text-gray-900 text-sm">{r.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 rounded-lg bg-white/50 text-xs text-gray-500">
              📍 States in {tzCfg.label}: {tzCfg.states}
            </div>
          </div>

          {/* All US timezones comparison */}
          <div className="rounded-xl border p-4 mb-4 bg-white">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">🕐 All US Timezones Right Now</p>
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
