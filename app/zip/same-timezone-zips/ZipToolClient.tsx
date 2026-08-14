'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import { zipFetch } from '@/lib/data/zip-client'
import { normalizeZipCode, sanitizeZipInput } from '@/lib/data/zip-utils'

const TIMEZONES = [
  { tz: 'America/New_York', label: 'Eastern (ET)', offset: 'UTC-5/-4', states: 'NY, FL, GA, MA, NC, OH, PA, VA...', icon: '🗽' },
  { tz: 'America/Chicago', label: 'Central (CT)', offset: 'UTC-6/-5', states: 'IL, TX, MN, WI, MO, TN, AL...', icon: '🌾' },
  { tz: 'America/Denver', label: 'Mountain (MT)', offset: 'UTC-7/-6', states: 'CO, UT, NM, ID, MT, WY...', icon: '🏔️' },
  { tz: 'America/Los_Angeles', label: 'Pacific (PT)', offset: 'UTC-8/-7', states: 'CA, WA, OR, NV...', icon: '🌊' },
  { tz: 'America/Phoenix', label: 'Arizona (No DST)', offset: 'UTC-7', states: 'AZ (most)', icon: '🌵' },
  { tz: 'America/Anchorage', label: 'Alaska (AKT)', offset: 'UTC-9/-8', states: 'AK', icon: '🐻' },
  { tz: 'Pacific/Honolulu', label: 'Hawaii (HST)', offset: 'UTC-10', states: 'HI', icon: '🌺' },
]

function shareResults(tzLabel: string, results: any[]) {
  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const text = `🕐 Same Time Zone ZIP Codes — ${tzLabel}\n📮 ${results.length} ZIP codes\n👥 Population: ${totalPop.toLocaleString()}\n🗺️ States: ${[...new Set(results.map(r => r.stateCode))].join(', ')}\nFind yours: tooltrio.com/zip/same-timezone-zips`
  if (navigator.share) navigator.share({ title: `${tzLabel} ZIPs`, text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResults(tzLabel: string, results: any[]) {
  const header = 'ZIP,City,State,County,Population,Timezone\n'
  const rows = results.map(r => `${r.zip},"${r.city}","${r.stateCode}","${r.county}",${r.population || 0},"${r.timezone}"`)
  const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${tzLabel.replace(/\s/g,'-')}-zips.csv`; a.click()
}

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [selectedTz, setSelectedTz] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [centerInfo, setCenterInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchText, setSearchText] = useState('')

  async function lookupByZip(z?: string) {
    const rawVal = (z || zip).trim(); if (z) setZip(sanitizeZipInput(z))
    const val = normalizeZipCode(rawVal)
    if (!val) { setError('Enter a valid 5-digit ZIP or 9-digit ZIP+4 code'); return }
    setLoading(true); setError(''); setResults([])
    const res = await zipFetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); return }
    setCenterInfo(data)
    setSelectedTz(data.timezone)
    await loadByTimezone(data.timezone)
  }

  async function loadByTimezone(tz: string) {
    setLoading(true); setError(''); setResults([])
    // Use state search for each state that matches — faster approach via nearby for a large set
    // We'll do a search query using timezone directly
    try {
      // Fetch from multiple representative ZIPs per timezone and get all nearby
      const tzToSampleZips: Record<string, string[]> = {
        'America/New_York': ['10001','30301','33101','02101','28201'],
        'America/Chicago': ['60601','77001','55401','53201','63101'],
        'America/Denver': ['80201','84101','87101','83701','59701'],
        'America/Los_Angeles': ['90001','98101','97201','89101'],
        'America/Phoenix': ['85001','85201','85301'],
        'America/Anchorage': ['99501','99701'],
        'Pacific/Honolulu': ['96801','96801'],
      }
      const sampleZips = tzToSampleZips[tz] || ['10001']
      // Use state-level API to gather ZIPs, then client-filter by timezone
      // For best results, use the nearby API on representative points with large radius
      const fetches = await Promise.all(
        sampleZips.map(z => zipFetch(`/api/zip/nearby?zip=${z}&radius=500&limit=500`).then(r => r.json()))
      )
      const allResults: any[] = []
      const seen = new Set<string>()
      fetches.forEach(d => {
        const items = d.nearby || []
        items.forEach((r: any) => {
          if (!seen.has(r.zip) && r.timezone === tz) {
            seen.add(r.zip); allResults.push(r)
          }
        })
      })
      allResults.sort((a, b) => (b.population || 0) - (a.population || 0))
      setResults(allResults)
      if (!allResults.length) setError(`No ZIP codes found for timezone: ${tz}`)
    } catch {
      setError('Failed to load timezone data')
    }
    setLoading(false)
  }

  async function lookupByTz(tz: string) {
    setSelectedTz(tz); setCenterInfo(null); setZip('')
    await loadByTimezone(tz)
  }

  const filtered = searchText
    ? results.filter(r => r.zip.includes(searchText) || r.city.toLowerCase().includes(searchText.toLowerCase()) || r.stateCode.toLowerCase().includes(searchText.toLowerCase()))
    : results

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const tzInfo = TIMEZONES.find(t => t.tz === selectedTz)
  const currentTzLabel = tzInfo?.label || selectedTz

  // Current time in selected timezone
  const nowInTz = selectedTz ? new Intl.DateTimeFormat('en-US', {
    timeZone: selectedTz, hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, weekday: 'short', month: 'short', day: 'numeric'
  }).format(new Date()) : ''

  return (
    <div>
      <ZipQuickFill onSelect={z => lookupByZip(z)} />

      {/* Manual ZIP input */}
      <div className="flex gap-2 mb-4">
        <input value={zip} onChange={e => setZip(sanitizeZipInput(e.target.value))}
          onKeyDown={e => e.key === 'Enter' && lookupByZip()}
          placeholder="Enter ZIP or ZIP+4 to find its timezone peers" maxLength={9}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <button onClick={() => lookupByZip()} disabled={loading}
          className="px-5 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : 'Find'}
        </button>
      </div>

      {/* — OR — browse by timezone */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-bold text-gray-400 uppercase">Or browse by timezone</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-2 mb-6">
        {TIMEZONES.map(tz => (
          <button key={tz.tz} onClick={() => lookupByTz(tz.tz)} disabled={loading}
            className={`text-left p-3 rounded-xl border-2 transition-all ${selectedTz === tz.tz ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'}`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{tz.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-sm">{tz.label}</div>
                <div className="text-xs text-gray-500">{tz.offset} · {tz.states}</div>
              </div>
              {selectedTz === tz.tz && <span className="text-green-600 font-bold text-xs">Selected ✓</span>}
            </div>
          </button>
        ))}
      </div>

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {loading && <div className="text-center py-8 text-gray-400 animate-pulse">Loading timezone data…</div>}

      {results.length > 0 && (
        <div>
          {/* Live clock */}
          {selectedTz && (
            <div className="rounded-xl border p-3 mb-4 bg-indigo-50 border-indigo-100 text-center">
              <div className="text-xs font-bold text-indigo-600 uppercase mb-1">🕐 Current Time — {currentTzLabel}</div>
              <div className="font-black text-indigo-700 text-lg">{nowInTz}</div>
            </div>
          )}

          {centerInfo && (
            <div className="rounded-xl border p-3 mb-4 text-sm" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <span className="font-bold text-green-700">📍 Your ZIP: </span>
              <span className="font-mono font-black">{centerInfo.zip}</span>
              <span className="text-gray-600 ml-2">{centerInfo.city}, {centerInfo.stateCode}</span>
              <span className="text-gray-400 ml-2">· {tzInfo?.label}</span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'ZIP Codes', value: results.length.toLocaleString(), icon: '📮' },
              { label: 'Total Population', value: totalPop > 0 ? totalPop.toLocaleString() : 'N/A', icon: '👥' },
              { label: 'States', value: [...new Set(results.map(r => r.stateCode))].length, icon: '🗺️' },
              { label: 'Cities', value: [...new Set(results.map(r => r.city))].length.toLocaleString(), icon: '🏙️' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
                <div className="text-xs text-gray-500">{s.icon} {s.label}</div>
                <div className="text-xl font-black text-green-600">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-3">
            <button onClick={() => shareResults(currentTzLabel, results)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share Results
            </button>
            <button onClick={() => downloadResults(currentTzLabel, results)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download CSV
            </button>
          </div>

          <input value={searchText} onChange={e => setSearchText(e.target.value)}
            placeholder="Filter by city, state, or ZIP…"
            className="w-full border rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-green-400" style={{ borderColor: '#e2e8f0' }} />

          <div className="overflow-auto max-h-96 rounded-xl border">
            <table className="w-full text-sm">
              <thead className="sticky top-0" style={{ background: 'rgba(240,253,244,0.97)' }}>
                <tr>
                  {['ZIP', 'City', 'State', 'County', '👥 Population'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-bold text-gray-600 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 300).map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="px-3 py-2 font-mono font-bold text-green-700">{r.zip}</td>
                    <td className="px-3 py-2">{r.city}</td>
                    <td className="px-3 py-2 font-bold">{r.stateCode}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{r.county}</td>
                    <td className="px-3 py-2 font-bold">{r.population > 0 ? r.population.toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length > 300 && (
              <div className="text-center text-xs text-gray-400 py-2 border-t">Showing 300 of {filtered.length.toLocaleString()}. Use filter to narrow down.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
