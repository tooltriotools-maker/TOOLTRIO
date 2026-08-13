'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { zipFetch } from '@/lib/data/zip-client'

const STATES = [
  ['Alabama','AL'],['Alaska','AK'],['Arizona','AZ'],['Arkansas','AR'],['California','CA'],
  ['Colorado','CO'],['Connecticut','CT'],['Delaware','DE'],['Florida','FL'],['Georgia','GA'],
  ['Hawaii','HI'],['Idaho','ID'],['Illinois','IL'],['Indiana','IN'],['Iowa','IA'],
  ['Kansas','KS'],['Kentucky','KY'],['Louisiana','LA'],['Maine','ME'],['Maryland','MD'],
  ['Massachusetts','MA'],['Michigan','MI'],['Minnesota','MN'],['Mississippi','MS'],['Missouri','MO'],
  ['Montana','MT'],['Nebraska','NE'],['Nevada','NV'],['New Hampshire','NH'],['New Jersey','NJ'],
  ['New Mexico','NM'],['New York','NY'],['North Carolina','NC'],['North Dakota','ND'],['Ohio','OH'],
  ['Oklahoma','OK'],['Oregon','OR'],['Pennsylvania','PA'],['Rhode Island','RI'],['South Carolina','SC'],
  ['South Dakota','SD'],['Tennessee','TN'],['Texas','TX'],['Utah','UT'],['Vermont','VT'],
  ['Virginia','VA'],['Washington','WA'],['West Virginia','WV'],['Wisconsin','WI'],['Wyoming','WY'],
  ['Washington DC','DC'],['Puerto Rico','PR'],
]

function shareResults(state: string, results: any[]) {
  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const text = `State ZIP Codes — ${state}\n✅ ${results.length} ZIP codes\n👥 Population: ${totalPop.toLocaleString()}\n🏙️ Cities: ${[...new Set(results.map(r => r.city))].length}\nSource: tooltrio.com/zip/state-zip-codes`
  if (navigator.share) navigator.share({ title: `${state} ZIP Codes`, text })
  else navigator.clipboard.writeText(text).then(() => alert('Results copied to clipboard!'))
}

function downloadResults(state: string, results: any[]) {
  const header = 'ZIP,City,County,Population,Type,Timezone\n'
  const rows = results.map(r => `${r.zip},"${r.city}","${r.county}",${r.population || 0},${r.type},${r.timezone}`)
  const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = `${state}-zip-codes.csv`; a.click()
  URL.revokeObjectURL(url)
}

export default function ZipToolClient() {
  const [state, setState] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  async function lookup(code: string) {
    if (!code) return
    setState(code)
    setLoading(true); setError(''); setSearch('')
    // API expects ?code= not ?state=
    const res = await zipFetch(`/api/zip/state?code=${code}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error || 'Error loading state data'); setResults([]); return }
    setResults(data.results || [])
  }

  const filtered = search
    ? results.filter(r => r.zip.includes(search) || r.city.toLowerCase().includes(search.toLowerCase()))
    : results

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const stateName = STATES.find(([, code]) => code === state)?.[0] || state

  // Chart: top 8 cities by population
  const cityPop = (Object.entries(
    results.reduce((acc: Record<string,number>, r) => {
      acc[r.city] = (acc[r.city] || 0) + (r.population || 0); return acc
    }, {})
  ) as Array<[string, number]>).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([city, pop]) => ({ city, pop }))

  const colors = ['#22c55e','#16a34a','#4ade80','#86efac','#15803d','#166534','#bbf7d0','#dcfce7']

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <select value={state}
          onChange={e => lookup(e.target.value)}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-green-500 bg-white" style={{ borderColor: '#e2e8f0' }}>
          <option value="">Select a state…</option>
          {STATES.map(([name, code]) => <option key={code} value={code}>{name} ({code})</option>)}
        </select>
        <button onClick={() => lookup(state)} disabled={loading || !state} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : 'Get ZIPs'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {results.length > 0 && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'ZIP Codes', value: results.length.toLocaleString(), icon: '📮' },
              { label: 'Total Population', value: totalPop > 0 ? totalPop.toLocaleString() : 'N/A', icon: '👥' },
              { label: 'Unique Cities', value: [...new Set(results.map(r => r.city))].length.toLocaleString(), icon: '🏙️' },
              { label: 'Counties', value: [...new Set(results.map(r => r.county))].length.toLocaleString(), icon: '🗺️' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
                <div className="text-xs text-gray-500">{s.icon} {s.label}</div>
                <div className="text-xl font-black text-green-600">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Demographics info panel */}
          <div className="rounded-xl border p-4 mb-4 bg-blue-50 border-blue-100">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">📊 {stateName} Demographics Overview</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-blue-800">
              <div><span className="font-bold">Avg pop/ZIP:</span> {results.length ? Math.round(totalPop / results.length).toLocaleString() : 'N/A'}</div>
              <div><span className="font-bold">Largest city:</span> {cityPop[0]?.city || 'N/A'}</div>
              <div><span className="font-bold">Timezones:</span> {[...new Set(results.map(r => r.timezone))].length}</div>
            </div>
          </div>

          {/* Population by city chart */}
          {cityPop.length > 0 && (
            <div className="rounded-xl border p-4 mb-4 bg-white">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">👥 Top Cities by Population — {stateName}</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={cityPop} margin={{ top: 0, right: 8, bottom: 40, left: 0 }}>
                  <XAxis dataKey="city" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                  <Tooltip formatter={v => Number(v ?? 0).toLocaleString()} />
                  <Bar dataKey="pop" radius={[4,4,0,0]}>
                    {cityPop.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Share/Download */}
          <div className="flex gap-2 mb-3">
            <button onClick={() => shareResults(stateName, results)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50 flex items-center justify-center gap-1">
              📤 Share Results
            </button>
            <button onClick={() => downloadResults(state, results)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50 flex items-center justify-center gap-1">
              ⬇️ Download CSV
            </button>
          </div>

          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`Filter ${stateName} ZIPs by city or code…`}
            className="w-full border rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-green-400" style={{ borderColor: '#e2e8f0' }} />
          <div className="overflow-auto max-h-96 rounded-xl border">
            <table className="w-full text-sm">
              <thead className="sticky top-0" style={{ background: 'rgba(240,253,244,0.97)' }}>
                <tr>
                  {['ZIP', 'City', 'County', '👥 Population', 'Type', 'Timezone'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-bold text-gray-600 border-b">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 500).map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="px-3 py-2 font-mono font-bold text-green-700">{r.zip}</td>
                    <td className="px-3 py-2">{r.city}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{r.county}</td>
                    <td className="px-3 py-2 font-bold">{r.population > 0 ? r.population.toLocaleString() : '—'}</td>
                    <td className="px-3 py-2 text-xs">{r.type}</td>
                    <td className="px-3 py-2 text-xs text-gray-500">{r.timezone?.replace('America/', '') || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length > 500 && (
              <div className="text-center text-xs text-gray-400 py-2 border-t">Showing first 500 of {filtered.length.toLocaleString()} results. Use filter to narrow down.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
