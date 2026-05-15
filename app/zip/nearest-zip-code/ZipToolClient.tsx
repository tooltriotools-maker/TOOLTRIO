'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [count, setCount] = useState('10')
  const [results, setResults] = useState<any[]>([])
  const [origin, setOrigin] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function find(z?: string) {
    const val=(z||zip).trim(); if(z) setZip(z)
    if(!/^\d{5}$/.test(val)){setError('Enter a valid 5-digit ZIP');return}
    setLoading(true);setError('')
    const res = await fetch(`/api/zip/nearby?zip=${val}&radius=500&limit=${count}`)
    const data = await res.json()
    setLoading(false)
    if(!res.ok){setError(data.error);return}
    setOrigin(data.origin);setResults(data.results)
  }

  return (
    <div>
      <ZipQuickFill onSelect={z=>find(z)} />
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="col-span-2">
          <label className="text-sm font-semibold text-gray-600 block mb-1">ZIP Code</label>
          <input value={zip} onChange={e=>setZip(e.target.value.replace(/\D/g,''))} placeholder="e.g. 10001" maxLength={5}
            className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500"
            style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Results</label>
          <select value={count} onChange={e=>setCount(e.target.value)}
            className="w-full border-2 rounded-xl px-3 py-3 focus:outline-none focus:border-green-500"
            style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}}>
            {['5','10','15','20'].map(n=><option key={n} value={n}>{n} nearest</option>)}
          </select>
        </div>
      </div>
      <button onClick={()=>find()} disabled={loading} className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60"
        style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
        {loading?'Finding...':'Find Nearest ZIPs'}
      </button>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4">{error}</div>}
      {results.length>0&&origin&&(
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {results.map((r:any,i:number)=>(
            <div key={r.zip} className="rounded-xl border p-3 flex items-center gap-3"
              style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-xs text-gray-400 w-6">#{i+1}</span>
              <span className="font-black font-mono text-green-600 w-14">{r.zip}</span>
              <div className="flex-1"><div className="font-semibold text-gray-800 text-sm">{r.city}, {r.stateCode}</div><div className="text-xs text-gray-400">{r.county}</div></div>
              <span className="font-bold text-green-600 text-sm">{r.distance.toFixed(1)} mi</span>
              <a href={`https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${r.lat},${r.lng}`}
                target="_blank" rel="noopener noreferrer" className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm">🗺️</a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
