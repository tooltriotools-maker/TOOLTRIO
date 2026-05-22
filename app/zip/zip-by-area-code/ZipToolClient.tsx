'use client'
import { useState } from 'react'

export default function ZipToolClient() {
  const [areaCode, setAreaCode] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function lookup() {
    const code = areaCode.trim()
    if (!/^\d{3}$/.test(code)) return
    setLoading(true)
    const res = await fetch(`/api/zip/search?q=${code}&limit=50`)
    const data = await res.json(); setLoading(false); setSearched(true)
    // Filter results where area code matches
    const filtered = res.ok ? data.results.filter((r:any) => r.areaCode === code) : []
    setResults(filtered)
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input value={areaCode} onChange={e=>setAreaCode(e.target.value.replace(/\D/g,''))} onKeyDown={e=>e.key==='Enter'&&lookup()}
          placeholder="Enter area code (e.g. 212)" maxLength={3}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-2xl font-mono text-center focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
        <button onClick={lookup} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading?'...':'Find ZIPs'}
        </button>
      </div>
      {searched&&results.length===0&&!loading&&(
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">No ZIP codes found for area code ({areaCode}).</div>
      )}
      {results.length>0&&(
        <div>
          <div className="text-sm text-gray-500 mb-3">{results.length} ZIP codes use area code ({areaCode})</div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((r:any)=>(
              <div key={r.zip} className="rounded-xl border p-3 flex items-center justify-between"
                style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                <div>
                  <span className="font-black font-mono text-green-600 mr-3">{r.zip}</span>
                  <span className="font-semibold text-gray-800">{r.city}, {r.stateCode}</span>
                  <div className="text-xs text-gray-400">{r.county}</div>
                </div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`}
                  target="_blank" rel="noopener noreferrer" className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm">📍</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
