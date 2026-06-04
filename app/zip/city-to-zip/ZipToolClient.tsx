'use client'
import { useState } from 'react'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC','PR']

export default function ZipToolClient() {
  const [city, setCity] = useState('')
  const [stateCode, setStateCode] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup() {
    if (!city.trim()) { setError('Enter a city name'); return }
    setLoading(true); setError('')
    const params = new URLSearchParams({ city: city.trim() })
    if (stateCode) params.set('state', stateCode)
    const res = await fetch(`/api/zip/search?${params}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok || !data.results?.length) { setError(`No ZIP codes found for "${city}"${stateCode ? `, ${stateCode}` : ''}`); setResults([]); return }
    setResults(data.results)
  }

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="City name (e.g. Brooklyn)" 
          className="flex-1 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <select value={stateCode} onChange={e => setStateCode(e.target.value)}
          className="border-2 rounded-xl px-3 py-3 bg-white focus:outline-none focus:border-green-500 text-sm" style={{ borderColor: '#e2e8f0' }}>
          <option value="">Any State</option>
          {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <button onClick={lookup} disabled={loading} className="w-full py-3 text-white font-bold rounded-xl mb-6 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        {loading ? 'Searching…' : '🔍 Find ZIP Codes'}
      </button>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {results.length > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">ZIP Codes Found</div>
              <div className="text-3xl font-black text-green-600">{results.length}</div>
            </div>
            <div className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">👥 Total Population</div>
              <div className="text-2xl font-black text-green-600">{totalPop > 0 ? totalPop.toLocaleString() : 'N/A'}</div>
            </div>
          </div>
          <div className="overflow-auto max-h-80 rounded-xl border">
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
                    <td className="px-3 py-2 font-semibold">{r.city}</td>
                    <td className="px-3 py-2">{r.stateCode}</td>
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
