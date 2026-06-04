'use client'
import { useState } from 'react'

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

export default function ZipToolClient() {
  const [state, setState] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  async function lookup(code?: string) {
    const val = code || state; if (!val) return
    setLoading(true); setError(''); setSearch('')
    const res = await fetch(`/api/zip/state?state=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error || 'Error loading state data'); setResults([]); return }
    setResults(data.results || [])
  }

  const filtered = search
    ? results.filter(r => r.zip.includes(search) || r.city.toLowerCase().includes(search.toLowerCase()))
    : results

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const stateName = STATES.find(([, code]) => code === state)?.[0] || state

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <select value={state} onChange={e => { setState(e.target.value); lookup(e.target.value) }}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-green-500 bg-white" style={{ borderColor: '#e2e8f0' }}>
          <option value="">Select a state…</option>
          {STATES.map(([name, code]) => <option key={code} value={code}>{name} ({code})</option>)}
        </select>
        <button onClick={() => lookup()} disabled={loading || !state} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : 'Get ZIPs'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {results.length > 0 && (
        <div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">ZIP Codes</div>
              <div className="text-3xl font-black text-green-600">{results.length.toLocaleString()}</div>
            </div>
            <div className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">👥 Total Population</div>
              <div className="text-xl font-black text-green-600">{totalPop > 0 ? totalPop.toLocaleString() : 'N/A'}</div>
            </div>
            <div className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">Cities</div>
              <div className="text-3xl font-black text-green-600">{[...new Set(results.map(r => r.city))].length.toLocaleString()}</div>
            </div>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`Filter ${stateName} ZIPs by city or code…`}
            className="w-full border rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-green-400" style={{ borderColor: '#e2e8f0' }} />
          <div className="overflow-auto max-h-96 rounded-xl border">
            <table className="w-full text-sm">
              <thead className="sticky top-0" style={{ background: 'rgba(240,253,244,0.97)' }}>
                <tr>
                  {['ZIP', 'City', 'County', '👥 Population', 'Type'].map(h => (
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
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length > 500 && (
              <div className="text-center text-xs text-gray-400 py-2 border-t">Showing first 500 of {filtered.length.toLocaleString()} results. Use the filter to narrow down.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
