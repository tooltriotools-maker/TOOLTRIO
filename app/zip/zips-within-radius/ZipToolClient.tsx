'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [radius, setRadius] = useState('25')
  const [results, setResults] = useState<any[]>([])
  const [origin, setOrigin] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function calculate(z?: string) {
    const val=(z||zip).trim(); if(z) setZip(z)
    if(!/^\d{5}$/.test(val)){setError('Enter a valid 5-digit ZIP');return}
    setLoading(true);setError('')
    const res = await fetch(`/api/zip/nearby?zip=${val}&radius=${radius}&limit=50`)
    const data = await res.json()
    setLoading(false)
    if(!res.ok){setError(data.error);return}
    setOrigin(data.origin);setResults(data.results)
  }

  return (
    <div>
      <ZipQuickFill onSelect={z=>calculate(z)} />
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="col-span-2">
          <label className="text-sm font-semibold text-gray-600 block mb-1">Center ZIP</label>
          <input value={zip} onChange={e=>setZip(e.target.value.replace(/\D/g,''))} placeholder="e.g. 10001" maxLength={5}
            className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500"
            style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Radius</label>
          <select value={radius} onChange={e=>setRadius(e.target.value)}
            className="w-full border-2 rounded-xl px-3 py-3 focus:outline-none focus:border-green-500"
            style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}}>
            {['10','25','50','100','200'].map(r=><option key={r} value={r}>{r} mi</option>)}
          </select>
        </div>
      </div>
      <button onClick={()=>calculate()} disabled={loading}
        className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60"
        style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
        {loading?'Searching...':'Find ZIPs Within '+radius+' Miles'}
      </button>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4">{error}</div>}
      {origin&&results.length>0&&(
        <div>
          <div className="text-sm text-gray-500 mb-3">{results.length} ZIPs within {radius} miles of {origin.city}, {origin.stateCode} ({origin.zip})</div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((r:any)=>(
              <div key={r.zip} className="rounded-xl border p-3 flex items-center justify-between"
                style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                <div className="flex items-center gap-3">
                  <span className="font-black font-mono text-green-600 w-14">{r.zip}</span>
                  <div><div className="font-semibold text-gray-800 text-sm">{r.city}, {r.stateCode}</div><div className="text-xs text-gray-400">{r.county}</div></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600 text-sm">{r.distance.toFixed(1)} mi</span>
                  <a href={`https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${r.lat},${r.lng}`}
                    target="_blank" rel="noopener noreferrer" className="text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-50 text-sm">🗺️</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {origin&&results.length===0&&!loading&&<div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">No ZIPs found within {radius} miles. Try a larger radius.</div>}
    </div>
  )
}
