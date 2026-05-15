'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipDistanceClient() {
  const [zip1, setZip1] = useState('')
  const [zip2, setZip2] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function calculate() {
    if (!/^\d{5}$/.test(zip1)||!/^\d{5}$/.test(zip2)){setError('Enter valid 5-digit ZIP codes');return}
    setLoading(true);setError('')
    const res = await fetch(`/api/zip/distance?from=${zip1}&to=${zip2}`)
    const data = await res.json()
    setLoading(false)
    if(!res.ok){setError(data.error);setResult(null);return}
    setResult(data)
  }

  return (
    <div>
      <ZipQuickFill onSelect={z=>setZip1(z)} label="Quick fill FROM:" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {[{label:'From ZIP',val:zip1,set:setZip1,ph:'e.g. 10001'},{label:'To ZIP',val:zip2,set:setZip2,ph:'e.g. 90210'}].map(f=>(
          <div key={f.label}>
            <label className="text-sm font-semibold text-gray-600 block mb-1">{f.label}</label>
            <input value={f.val} onChange={e=>f.set(e.target.value.replace(/\D/g,''))} placeholder={f.ph} maxLength={5}
              className="w-full border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500"
              style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
          </div>
        ))}
      </div>
      <button onClick={calculate} disabled={loading}
        className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60"
        style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
        {loading?'Calculating...':'Calculate Distance'}
      </button>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result&&(
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-2xl border p-4 text-center" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.6)'}}>
              <div className="text-xs text-gray-500 mb-1">Miles</div>
              <div className="text-4xl font-black text-green-600">{result.miles.toFixed(1)}</div>
              <div className="text-sm text-gray-400">miles</div>
            </div>
            <div className="rounded-2xl border p-4 text-center" style={{background:'rgba(239,246,255,0.7)',borderColor:'rgba(147,197,253,0.5)'}}>
              <div className="text-xs text-gray-500 mb-1">Kilometers</div>
              <div className="text-4xl font-black text-blue-600">{result.km.toFixed(1)}</div>
              <div className="text-sm text-gray-400">km</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[result.r1,result.r2].map((r:any,i:number)=>(
              <div key={i} className="rounded-xl border p-3" style={{background:'rgba(248,250,248,0.8)'}}>
                <div className="text-xs text-gray-400">{i===0?'From':'To'}</div>
                <div className="font-bold text-gray-800">{r.city}, {r.stateCode}</div>
                <div className="text-sm text-gray-500">ZIP {r.zip}</div>
              </div>
            ))}
          </div>
          <a href={`https://www.google.com/maps/dir/${result.r1.lat},${result.r1.lng}/${result.r2.lat},${result.r2.lng}`}
            target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
            style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)',boxShadow:'0 4px 16px rgba(59,130,246,0.3)'}}>
            🗺️ Get Directions on Google Maps
          </a>
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
            ⚠️ Straight-line distance. Actual driving distance is typically 20-30% more.
          </div>
        </div>
      )}
    </div>
  )
}
