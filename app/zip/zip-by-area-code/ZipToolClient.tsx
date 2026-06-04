'use client'
import { useState } from 'react'

export default function ZipToolClient() {
  const [areaCode, setAreaCode] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup() {
    const val = areaCode.trim()
    if (!/^\d{3}$/.test(val)) { setError('Enter a valid 3-digit area code'); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/search?areaCode=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error || 'No results found'); setResults([]); return }
    setResults(data.results || [])
    if (!data.results?.length) setError(`No ZIP codes found for area code (${val})`)
  }

  const totalPop = results.reduce((s, r) => s + (r.population || 0), 0)

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">(</span>
          <input value={areaCode} onChange={e => setAreaCode(e.target.value.replace(/\D/g, '').slice(0, 3))}
            onKeyDown={e => e.key === 'Enter' && lookup()}
            placeholder="212" maxLength={3}
            className="w-full border-2 rounded-xl pl-8 pr-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">)</span>
        </div>
        <button onClick={lookup} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '🔍 Find ZIPs'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {results.length > 0 && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <div className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">ZIP Codes</div>
              <div className="text-3xl font-black text-green-600">{results.length}</div>
            </div>
            <div className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">👥 Total Population</div>
              <div className="text-2xl font-black text-green-600">{totalPop > 0 ? totalPop.toLocaleString() : 'N/A'}</div>
            </div>
            <div className="rounded-xl border p-3 text-center" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
              <div className="text-xs text-gray-500">States</div>
              <div className="text-2xl font-black text-green-600">{[...new Set(results.map(r => r.stateCode))].length}</div>
            </div>
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
