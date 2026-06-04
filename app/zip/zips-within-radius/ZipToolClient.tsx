'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [radius, setRadius] = useState(25)
  const [results, setResults] = useState<any[]>([])
  const [center, setCenter] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(z?: string) {
    const val = (z || zip).trim(); if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP'); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/nearby?zip=${val}&radius=${radius}&limit=200`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); setResults([]); return }
    setCenter(data.center)
    setResults(data.nearby || [])
    if (!data.nearby?.length) setError(`No ZIP codes found within ${radius} miles of ${val}`)
  }

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)
  const avgPop = results.length ? Math.round(totalPop / results.length) : 0

  return (
    <div>
      <ZipQuickFill onSelect={z => setZip(z)} />
      <div className="flex gap-2 mb-3">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))} onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Center ZIP (e.g. 10001)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <div className="flex items-center gap-2 border-2 rounded-xl px-4 py-2" style={{ borderColor: '#e2e8f0' }}>
          <label className="text-xs text-gray-500 whitespace-nowrap">Radius:</label>
          <select value={radius} onChange={e => setRadius(+e.target.value)} className="font-bold text-green-700 bg-transparent focus:outline-none">
            {[5,10,15,25,50,75,100].map(r => <option key={r} value={r}>{r} mi</option>)}
          </select>
        </div>
      </div>
      <button onClick={() => lookup()} disabled={loading} className="w-full py-3 text-white font-bold rounded-xl mb-6 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        {loading ? 'Searching…' : `🔍 Find ZIPs Within ${radius} Miles`}
      </button>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {center && (
        <div className="rounded-2xl border p-3 mb-4 text-sm" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
          <span className="font-bold text-green-700">📍 Center: </span>
          <span className="font-mono font-black">{center.zip}</span>
          <span className="text-gray-600 ml-2">{center.city}, {center.stateCode}</span>
          <span className="text-gray-400 ml-2">· 👥 {center.population > 0 ? center.population.toLocaleString() : 'N/A'}</span>
        </div>
      )}
      {results.length > 0 && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'ZIP Codes',       value: results.length.toLocaleString() },
              { label: '👥 Total Pop',    value: totalPop > 0 ? totalPop.toLocaleString() : 'N/A' },
              { label: 'Avg Pop/ZIP',     value: avgPop > 0 ? avgPop.toLocaleString() : 'N/A' },
              { label: 'States',          value: [...new Set(results.map(r => r.stateCode))].length },
            ].map((s: any) => (
              <div key={s.label} className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
                <div className="text-xs text-gray-500">{s.label}</div>
                <div className="text-xl font-black text-green-600">{s.value}</div>
              </div>
            ))}
          </div>
          <div className="overflow-auto max-h-96 rounded-xl border">
            <table className="w-full text-sm">
              <thead className="sticky top-0" style={{ background: 'rgba(240,253,244,0.97)' }}>
                <tr>
                  {['ZIP', 'City', 'State', 'County', '👥 Population', 'Distance'].map(h => (
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
                    <td className="px-3 py-2 text-green-700 font-bold">{r.distance ? `${r.distance.toFixed(1)} mi` : '—'}</td>
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
