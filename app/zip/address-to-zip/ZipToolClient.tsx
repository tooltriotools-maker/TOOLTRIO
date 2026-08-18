'use client'
import { useState } from 'react'
import { zipFetch } from '@/lib/data/zip-client'

function shareResult(results: any[], query: string) {
  const top = results.slice(0, 3).map(r => `${r.zip} — ${r.city}, ${r.stateCode}`).join('\n')
  const text = `📮 ZIP Code Results for "${query}"\n\n${top}\n\nFind yours: tooltrio.com/zip/address-to-zip`
  if (navigator.share) navigator.share({ title: 'Address to ZIP', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResult(results: any[], query: string) {
  const header = 'ZIP,City,State,County,Population,Type,Lat,Lng\n'
  const rows = results.map(r => `${r.zip},"${r.city}","${r.stateCode}","${r.county}",${r.population || 0},${r.type},${r.lat},${r.lng}`)
  const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `zip-results.csv`; a.click()
}

const EXAMPLES = [
  { label: 'New York, NY', query: 'New York' },
  { label: 'Los Angeles, CA', query: 'Los Angeles' },
  { label: 'Chicago, IL', query: 'Chicago' },
  { label: 'Houston, TX', query: 'Houston' },
  { label: 'Miami, FL', query: 'Miami' },
  { label: 'Denver, CO', query: 'Denver' },
]

export default function ZipToolClient() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [selectedZip, setSelectedZip] = useState<any>(null)

  async function lookup(q?: string) {
    const val = (q || query).trim()
    if (!val || val.length < 2) return
    if (q) setQuery(q)
    setLoading(true); setSearched(false); setSelectedZip(null)
    const parts = val.split(',').map(x => x.trim()).filter(Boolean)
    const state = parts.length ? parts[parts.length - 1].toUpperCase() : ''
    const city = parts.length >= 2 ? parts[parts.length - 2] : ''
    const url = /^\d{5}$/.test(val)
      ? `/api/zip/lookup?zip=${val}`
      : city && /^[A-Z]{2}$/.test(state)
        ? `/api/zip/search?city=${encodeURIComponent(city)}&state=${state}&limit=50`
        : `/api/zip/search?q=${encodeURIComponent(val)}&limit=50`
    const res = await zipFetch(url)
    const data = await res.json()
    setLoading(false); setSearched(true)
    if (res.ok) setResults(data.results || (data.zip ? [data] : []))
    else setResults([])
  }

  async function selectZip(zip: string) {
    const res = await zipFetch(`/api/zip/lookup?zip=${zip}`)
    const data = await res.json()
    if (res.ok) setSelectedZip(data)
  }

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)

  return (
    <div>
      {/* Quick examples */}
      <div className="mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Quick Examples</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(ex => (
            <button key={ex.query} onClick={() => lookup(ex.query)}
              className="px-3 py-1 rounded-lg border text-xs font-bold hover:bg-green-50 hover:border-green-400 transition-all"
              style={{ borderColor: '#e2e8f0', color: '#6b7280' }}>
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Enter city name, ZIP code, or address…"
          className="flex-1 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          style={{ borderColor: '#e2e8f0', background: 'rgba(255,255,255,0.9)' }} />
        <button onClick={() => lookup()} disabled={loading}
          className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '🔍 Find ZIP'}
        </button>
      </div>

      {searched && results.length === 0 && !loading && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 mb-4">
          No ZIP codes found for &quot;{query}&quot;. Try a city name, state, or exact ZIP.
        </div>
      )}

      {results.length > 0 && (
        <div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'ZIP Codes Found', value: results.length, icon: '📮' },
              { label: 'Total Population', value: totalPop > 0 ? totalPop.toLocaleString() : 'N/A', icon: '👥' },
              { label: 'States', value: [...new Set(results.map(r => r.stateCode))].length, icon: '🗺️' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
                <div className="text-xs text-gray-500">{s.icon} {s.label}</div>
                <div className="text-xl font-black text-green-600">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-3">
            <button onClick={() => shareResult(results, query)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share Results
            </button>
            <button onClick={() => downloadResult(results, query)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download CSV
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
            {results.map((r: any) => (
              <div key={r.zip}
                onClick={() => selectZip(r.zip)}
                className={`rounded-xl border p-3 flex items-center justify-between cursor-pointer transition-all ${selectedZip?.zip === r.zip ? 'border-green-500 bg-green-50' : 'hover:border-green-300'}`}
                style={{ background: selectedZip?.zip === r.zip ? undefined : 'rgba(255,255,255,0.8)', borderColor: selectedZip?.zip === r.zip ? undefined : 'rgba(226,232,240,0.7)' }}>
                <div>
                  <span className="font-black font-mono text-green-600 mr-3 text-base">{r.zip}</span>
                  <span className="font-semibold text-gray-800">{r.city}, {r.stateCode}</span>
                  <div className="text-xs text-gray-400 mt-0.5">{r.county} · {r.type} · 👥 {r.population > 0 ? r.population.toLocaleString() : 'N/A'}</div>
                </div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
                  onClick={e => e.stopPropagation()}
                  target="_blank" rel="noopener noreferrer"
                  className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm">📍</a>
              </div>
            ))}
          </div>

          {/* Expanded detail panel */}
          {selectedZip && (
            <div className="rounded-2xl border p-4" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <p className="text-xs font-bold text-gray-500 uppercase mb-3">📋 Full Details — {selectedZip.zip}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: '📮 ZIP', value: selectedZip.zip },
                  { label: '🏙️ City', value: selectedZip.city },
                  { label: '🗺️ State', value: `${selectedZip.state} (${selectedZip.stateCode})` },
                  { label: '📋 County', value: selectedZip.county },
                  { label: '📞 Area Code', value: `(${selectedZip.areaCode})` },
                  { label: '🕐 Timezone', value: selectedZip.tzLabel },
                  { label: '👥 Population', value: selectedZip.population > 0 ? selectedZip.population.toLocaleString() : 'N/A' },
                  { label: '🏠 Est. Households', value: selectedZip.population > 0 ? Math.round(selectedZip.population / 2.53).toLocaleString() : 'N/A' },
                  { label: '⛰️ Elevation', value: selectedZip.elevation != null ? `${selectedZip.elevation} ft` : 'N/A' },
                  { label: '🌐 Latitude', value: selectedZip.lat?.toFixed(4) },
                  { label: '🌐 Longitude', value: selectedZip.lng?.toFixed(4) },
                  { label: '📦 ZIP Type', value: selectedZip.type },
                ].map(r => (
                  <div key={r.label} className="rounded-xl border p-2 bg-white/70">
                    <div className="text-xs text-gray-400">{r.label}</div>
                    <div className="font-bold text-gray-900 text-sm">{r.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
