'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipToolClient() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function lookup() {
    const q = query.trim()
    if (!q) return
    setLoading(true)
    let url = '/api/zip/'
    if (/^\d{5}$/.test(q)) url += 'lookup?zip=' + q
    else url += 'search?q=' + encodeURIComponent(q) + '&limit=30'
    const res = await fetch(url)
    const data = await res.json()
    setLoading(false); setSearched(true)
    if (res.ok) {
      setResults(data.results || (data.zip ? [data] : []))
    } else { setResults([]) }
  }

  return (
    <div>
      <ZipQuickFill onSelect={z => { setQuery(z); setTimeout(lookup, 50) }} />
      <div className="flex gap-2 mb-6">
        <input value={query} onChange={e=>setQuery(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&lookup()}
          placeholder="Enter ZIP code or city name..."
          className="flex-1 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
        <button onClick={lookup} disabled={loading}
          className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading ? '...' : 'Search'}
        </button>
      </div>
      {searched && results.length === 0 && !loading && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
          No results found for "{query}". Try a different search term.
        </div>
      )}
      {results.length > 0 && (
        <div>
          <div className="text-sm text-gray-500 mb-3">{results.length} result{results.length !== 1 ? 's' : ''} found</div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((r:any) => (
              <div key={r.zip} className="rounded-xl border p-3 flex items-center justify-between"
                style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                <div>
                  <span className="font-black font-mono text-green-600 mr-3">{r.zip}</span>
                  <span className="font-semibold text-gray-800">{r.city}, {r.stateCode}</span>
                  <div className="text-xs text-gray-400">{r.county} · {r.type}</div>
                </div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm">📍</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
