'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipToolClient() {
  const [zip1, setZip1] = useState('')
  const [zip2, setZip2] = useState('')
  const [speed, setSpeed] = useState('60')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function calculate() {
    if (!/^\d{5}$/.test(zip1)||!/^\d{5}$/.test(zip2)){setError('Enter valid 5-digit ZIP codes');return}
    setLoading(true);setError('')
    const res = await fetch(`/api/zip/distance?from=${zip1}&to=${zip2}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok){setError(data.error);return}
    const avgSpeed = parseFloat(speed)||60
    const driveMiles = data.miles * 1.2
    const hours = driveMiles / avgSpeed
    const h = Math.floor(hours), m = Math.round((hours-h)*60)
    setResult({ ...data, driveMiles, h, m })
  }

  const directionsUrl = result ? `https://www.google.com/maps/dir/${result.r1.lat},${result.r1.lng}/${result.r2.lat},${result.r2.lng}` : ''

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
        <label className="text-sm font-semibold text-gray-600 block mb-1">Average Speed</label>
        <select value={speed} onChange={e=>setSpeed(e.target.value)}
          className="w-full border-2 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}}>
          <option value="30">30 mph — City traffic</option>
          <option value="45">45 mph — Mixed roads</option>
          <option value="60">60 mph — Highway (default)</option>
          <option value="70">70 mph — Interstate</option>
        </select>
      </div>
      <button onClick={calculate} disabled={loading}
        className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60"
        style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
        {loading ? 'Calculating...' : 'Estimate Drive Time'}
      </button>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result&&(
        <div>
          <div className="rounded-2xl border p-6 text-center mb-4" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.6)'}}>
            <div className="text-5xl font-black text-green-600 mb-1">
              {result.h > 0 ? `${result.h}h ${result.m}m` : `${result.m} min`}
            </div>
            <div className="text-gray-500 mb-3">Estimated drive time</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-white/60 p-2"><div className="text-xs text-gray-400">Straight-line</div><div className="font-bold">{result.miles.toFixed(1)} mi</div></div>
              <div className="rounded-xl bg-white/60 p-2"><div className="text-xs text-gray-400">Est. drive</div><div className="font-bold">{result.driveMiles.toFixed(1)} mi</div></div>
            </div>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
            style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)',boxShadow:'0 4px 16px rgba(59,130,246,0.3)'}}>
            🗺️ Get Real Directions on Google Maps
          </a>
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
            ⚠️ Estimate only. Use Google Maps for accurate turn-by-turn directions.
          </div>
        </div>
      )}
    </div>
  )
}
