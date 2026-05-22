'use client'
import { useState } from 'react'

export default function ZipToolClient() {
  const [city, setCity] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function lookup() {
    if(!city.trim()||city.trim().length<2) return
    setLoading(true)
    const res = await fetch(`/api/zip/search?q=${encodeURIComponent(city.trim())}&limit=50`)
    const data = await res.json()
    setLoading(false); setSearched(true)
    setResults(res.ok ? data.results : [])
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==='Enter\'&&lookup()}
          placeholder="Enter city name (e.g. New York, Boston, Austin)"
          className="flex-1 border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
        <button onClick={lookup} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading?'...':'Find ZIPs'}
        </button>
      </div>
      {searched&&results.length===0&&<div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">No results for "{city}". Try a different spelling.</div>}
      {results.length>0&&(
        <div>
          <div className="text-sm text-gray-500 mb-3">{results.length} ZIP code{results.length!==1?'s':''} found for "{city}"</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
            {results.map((r:any)=>(
              <div key={r.zip} className="rounded-xl border p-3 flex items-center justify-between"
                style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                <div>
                  <span className="font-black font-mono text-green-600 text-lg">{r.zip}</span>
                  <span className="text-gray-600 text-sm ml-2">{r.city}, {r.stateCode}</span>
                  <div className="text-xs text-gray-400">{r.county} · {r.type}</div>
                </div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
                  target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50">📍</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
