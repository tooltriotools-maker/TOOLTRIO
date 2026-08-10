'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { zipFetch } from '@/lib/data/zip-client'

// Popular US area codes for quick select
const POPULAR_AREA_CODES = [
  { code: '212', label: 'New York City' },
  { code: '213', label: 'Los Angeles' },
  { code: '312', label: 'Chicago' },
  { code: '713', label: 'Houston' },
  { code: '602', label: 'Phoenix' },
  { code: '215', label: 'Philadelphia' },
  { code: '210', label: 'San Antonio' },
  { code: '619', label: 'San Diego' },
  { code: '214', label: 'Dallas' },
  { code: '408', label: 'San Jose' },
  { code: '512', label: 'Austin' },
  { code: '617', label: 'Boston' },
]

function shareResults(areaCode: string, results: any[]) {
  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const text = `📞 Area Code (${areaCode}) ZIP Codes\n📮 ${results.length} ZIP codes\n👥 Population: ${totalPop.toLocaleString()}\n🗺️ States: ${[...new Set(results.map(r => r.stateCode))].join(', ')}\nLook up yours: tooltrio.com/zip/zip-by-area-code`
  if (navigator.share) navigator.share({ title: `Area Code ${areaCode} ZIPs`, text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResults(areaCode: string, results: any[]) {
  const header = 'ZIP,City,State,County,Population,Type\n'
  const rows = results.map(r => `${r.zip},"${r.city}","${r.stateCode}","${r.county}",${r.population || 0},${r.type}`)
  const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `area-code-${areaCode}-zips.csv`; a.click()
}

const COLORS = ['#22c55e','#16a34a','#4ade80','#86efac','#15803d','#166534','#bbf7d0','#dcfce7']

export default function ZipToolClient() {
  const [areaCode, setAreaCode] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(code?: string) {
    const val = (code || areaCode).trim()
    if (code) setAreaCode(code)
    if (!/^\d{3}$/.test(val)) { setError('Enter a valid 3-digit area code'); return }
    setLoading(true); setError('')
    const res = await zipFetch(`/api/zip/search?areaCode=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error || 'No results found'); setResults([]); return }
    setResults(data.results || [])
    if (!data.results?.length) setError(`No ZIP codes found for area code (${val})`)
  }

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const states = [...new Set(results.map(r => r.stateCode))]

  // Top cities by population for chart
  const cityPop = (Object.entries(
    results.reduce((acc: Record<string,number>, r) => {
      acc[r.city] = (acc[r.city] || 0) + (r.population || 0); return acc
    }, {})
  ) as Array<[string, number]>).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([city, pop]) => ({ city, pop }))

  return (
    <div>
      {/* Popular area codes quick select */}
      <div className="mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Popular Area Codes</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_AREA_CODES.map(ac => (
            <button key={ac.code} onClick={() => lookup(ac.code)}
              className="px-3 py-1 rounded-lg border text-xs font-bold transition-all hover:bg-green-50 hover:border-green-400"
              style={{ borderColor: areaCode === ac.code ? '#22c55e' : '#e2e8f0', color: areaCode === ac.code ? '#16a34a' : '#6b7280', background: areaCode === ac.code ? 'rgba(240,253,244,0.8)' : 'white' }}>
              ({ac.code}) {ac.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">(</span>
          <input value={areaCode} onChange={e => setAreaCode(e.target.value.replace(/\D/g, '').slice(0, 3))}
            onKeyDown={e => e.key === 'Enter' && lookup()}
            placeholder="212" maxLength={3}
            className="w-full border-2 rounded-xl pl-8 pr-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">)</span>
        </div>
        <button onClick={() => lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '🔍 Find ZIPs'}
        </button>
      </div>

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {results.length > 0 && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'ZIP Codes', value: results.length, icon: '📮' },
              { label: 'Total Population', value: totalPop > 0 ? totalPop.toLocaleString() : 'N/A', icon: '👥' },
              { label: 'States', value: states.length, icon: '🗺️' },
              { label: 'Cities', value: [...new Set(results.map(r => r.city))].length.toLocaleString(), icon: '🏙️' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
                <div className="text-xs text-gray-500">{s.icon} {s.label}</div>
                <div className="text-xl font-black text-green-600">{s.value}</div>
              </div>
            ))}
          </div>

          {states.length > 0 && (
            <div className="rounded-xl border p-3 mb-4 bg-blue-50 border-blue-100 text-sm">
              <span className="font-bold text-blue-700">States covered:</span>
              <span className="ml-2 text-blue-800">{states.join(', ')}</span>
            </div>
          )}

          {cityPop.length > 0 && (
            <div className="rounded-xl border p-4 mb-4 bg-white">
              <p className="text-xs font-bold text-gray-500 uppercase mb-3">👥 Top Cities by Population — ({areaCode})</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={cityPop} margin={{ bottom: 40 }}>
                  <XAxis dataKey="city" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)} />
                  <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  <Bar dataKey="pop" radius={[4,4,0,0]}>
                    {cityPop.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="flex gap-2 mb-3">
            <button onClick={() => shareResults(areaCode, results)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share Results
            </button>
            <button onClick={() => downloadResults(areaCode, results)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download CSV
            </button>
          </div>

          <div className="overflow-auto max-h-96 rounded-xl border">
            <table className="w-full text-sm">
              <thead className="sticky top-0" style={{ background: 'rgba(240,253,244,0.97)' }}>
                <tr>
                  {['ZIP', 'City', 'State', 'County', '👥 Population', 'Type'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-bold text-gray-600 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="px-3 py-2 font-mono font-bold text-green-700">{r.zip}</td>
                    <td className="px-3 py-2">{r.city}</td>
                    <td className="px-3 py-2 font-bold">{r.stateCode}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{r.county}</td>
                    <td className="px-3 py-2 font-bold">{r.population > 0 ? r.population.toLocaleString() : '—'}</td>
                    <td className="px-3 py-2 text-xs">{r.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
