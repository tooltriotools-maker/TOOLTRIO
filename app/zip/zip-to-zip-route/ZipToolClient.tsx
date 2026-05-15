'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipToolClient() {
  const [zip1, setZip1] = useState('')
  const [zip2, setZip2] = useState('')
  const [mode, setMode] = useState('driving')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function plan() {
    if (!/^\d{5}$/.test(zip1)||!/^\d{5}$/.test(zip2)){setError('Enter valid 5-digit ZIP codes');return}
    setLoading(true);setError('')
    const res = await fetch(`/api/zip/distance?from=${zip1}&to=${zip2}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok){setError(data.error);return}
    setResult(data)
  }

  const modeMap: Record<string,string> = {driving:'🚗 Driving',walking:'🚶 Walking',bicycling:'🚴 Cycling',transit:'🚌 Transit'}
  const modeCode: Record<string,number> = {driving:0,transit:3,walking:2,bicycling:1}
  const directionsUrl = result
    ? `https://www.google.com/maps/dir/${result.r1.lat},${result.r1.lng}/${result.r2.lat},${result.r2.lng}/data=!4m2!4m1!3e${modeCode[mode]}`
    : ''

  return (
    <div>
      <ZipQuickFill onSelect={z=>setZip1(z)} label="Quick fill FROM:" />
      <div className="grid grid-cols-2 gap-3 mb-3">
        {[{label:'From ZIP',val:zip1,set:setZip1},{label:'To ZIP',val:zip2,set:setZip2}].map(f=>(
          <div key={f.label}>
            <label className="text-sm font-semibold text-gray-600 block mb-1">{f.label}</label>
            <input value={f.val} onChange={e=>f.set(e.target.value.replace(/\D/g,''))} placeholder="e.g. 10001" maxLength={5}
              className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500"
              style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-600 block mb-1">Travel Mode</label>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(modeMap).map(([m,l])=>(
            <button key={m} onClick={()=>setMode(m)}
              className={`py-2 rounded-xl text-sm font-semibold border transition-all ${mode===m?'border-green-500 bg-green-50 text-green-700':'border-gray-200 text-gray-600 hover:border-green-300'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <button onClick={plan} disabled={loading}
        className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60"
        style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
        {loading ? 'Planning...' : 'Plan Route'}
      </button>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result&&(
        <div>
          <div className="rounded-2xl border p-4 mb-4" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.6)'}}>
            <div className="flex items-center gap-3 text-sm">
              <div className="text-center"><div className="font-black text-green-600 text-lg">{result.r1.zip}</div><div className="text-gray-500">{result.r1.city}</div></div>
              <div className="flex-1 text-center text-gray-400 text-xs">✈ {result.miles.toFixed(1)} mi straight-line</div>
              <div className="text-center"><div className="font-black text-green-600 text-lg">{result.r2.zip}</div><div className="text-gray-500">{result.r2.city}</div></div>
            </div>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
            style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)',boxShadow:'0 4px 16px rgba(59,130,246,0.3)'}}>
            {modeMap[mode]} Open Directions in Google Maps
          </a>
        </div>
      )}
    </div>
  )
}
