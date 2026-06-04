'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(z?: string) {
    const val=(z||zip).trim(); if(z) setZip(z)
    if(!/^\d{5}$/.test(val)){setError('Enter a valid 5-digit ZIP');setResult(null);return}
    setLoading(true);setError('')
    const res=await fetch(`/api/zip/lookup?zip=${val}`)
    const data=await res.json(); setLoading(false)
    if(!res.ok){setError(data.error);setResult(null);return}
    setResult(data)
  }

  return (
    <div>
      <ZipQuickFill onSelect={z=>lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e=>setZip(e.target.value.replace(/\D/g,''))} onKeyDown={e=>e.key==='Enter'&&lookup()}
          placeholder="Enter any US ZIP code (e.g. 10001)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
        <button onClick={()=>lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading?'...':'🌐 Lookup'}
        </button>
      </div>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result&&(
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {([{label:'Latitude',value:result.lat.toFixed(6)},{label:'Longitude',value:result.lng.toFixed(6)}] as any[]).map((r:any)=>(
              <div key={r.label} className="rounded-xl border p-4 text-center" style={{background:'rgba(240,253,244,0.6)',borderColor:'rgba(187,247,208,0.5)'}}>
                <div className="text-xs text-gray-500 mb-1">{r.label}</div>
                <div className="text-2xl font-black text-green-600 font-mono mb-2">{r.value}</div>
                <button onClick={()=>navigator.clipboard.writeText(r.value)} className="text-xs px-3 py-1 rounded-full border border-green-200 text-green-700 hover:bg-green-50">Copy</button>
              </div>
            ))}
          </div>
          <div className="rounded-xl border p-3 mb-4 font-mono text-sm text-gray-600" style={{background:'rgba(248,250,248,0.8)'}}>
            {result.lat}, {result.lng}
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-xl border p-3 bg-white/70 text-center">
              <div className="text-xs text-gray-400 mb-1">👥 Population</div>
              <div className="font-black text-gray-900 text-sm">{result.population>0?result.population.toLocaleString():'N/A'}</div>
            </div>
            <div className="rounded-xl border p-3 bg-white/70 text-center">
              <div className="text-xs text-gray-400 mb-1">📍 City</div>
              <div className="font-black text-gray-900 text-sm">{result.city}</div>
            </div>
            <div className="rounded-xl border p-3 bg-white/70 text-center">
              <div className="text-xs text-gray-400 mb-1">🗺️ State</div>
              <div className="font-black text-gray-900 text-sm">{result.stateCode}</div>
            </div>
          </div>
          <a href={`https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lng}`}
            target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-xl"
            style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)',boxShadow:'0 4px 16px rgba(59,130,246,0.3)'}}>
            📍 Open in Google Maps
          </a>
        </div>
      )}
    </div>
  )
}
