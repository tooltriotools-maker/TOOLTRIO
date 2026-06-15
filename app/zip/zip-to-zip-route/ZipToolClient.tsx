'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

const MODES = [
  { key: 'driving', label: '🚗 Driving', code: 0 },
  { key: 'walking', label: '🚶 Walking', code: 2 },
  { key: 'bicycling', label: '🚴 Cycling', code: 1 },
  { key: 'transit', label: '🚌 Transit', code: 3 },
]

function shareResult(result: any, zip1: string, zip2: string, mode: string) {
  const modeLabel = MODES.find(m => m.key === mode)?.label || mode
  const text = `🗺️ ZIP to ZIP Route: ${zip1} → ${zip2}\n${modeLabel}\n📏 ${result.miles.toFixed(1)} mi straight-line\n📍 ${result.r1.city}, ${result.r1.stateCode} → ${result.r2.city}, ${result.r2.stateCode}\nPlan yours: tooltrio.com/zip/zip-to-zip-route`
  if (navigator.share) navigator.share({ title: 'ZIP Route', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResult(result: any, zip1: string, zip2: string, mode: string) {
  const text = `ZIP to ZIP Route Report\n\nFrom: ${zip1} — ${result.r1.city}, ${result.r1.stateCode}\nTo:   ${zip2} — ${result.r2.city}, ${result.r2.stateCode}\nMode: ${mode}\n\nStraight-line Distance: ${result.miles.toFixed(1)} miles / ${(result.miles * 1.60934).toFixed(1)} km\nEst. Drive Distance: ${(result.miles * 1.2).toFixed(1)} miles\n\nFrom ZIP Population: ${result.r1.population > 0 ? result.r1.population.toLocaleString() : 'N/A'}\nTo ZIP Population:   ${result.r2.population > 0 ? result.r2.population.toLocaleString() : 'N/A'}\n\nCoordinates From: ${result.r1.lat}, ${result.r1.lng}\nCoordinates To:   ${result.r2.lat}, ${result.r2.lng}\n\nGenerated: tooltrio.com/zip/zip-to-zip-route`
  const blob = new Blob([text], { type: 'text/plain' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `route-${zip1}-to-${zip2}.txt`; a.click()
}

export default function ZipToolClient() {
  const [zip1, setZip1] = useState('')
  const [zip2, setZip2] = useState('')
  const [mode, setMode] = useState('driving')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function plan() {
    if (!/^\d{5}$/.test(zip1) || !/^\d{5}$/.test(zip2)) { setError('Enter valid 5-digit ZIP codes for both fields'); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/distance?from=${zip1}&to=${zip2}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); return }
    setResult(data)
  }

  const modeObj = MODES.find(m => m.key === mode)!
  const directionsUrl = result
    ? `https://www.google.com/maps/dir/${result.r1.lat},${result.r1.lng}/${result.r2.lat},${result.r2.lng}/data=!4m2!4m1!3e${modeObj.code}`
    : ''

  return (
    <div>
      <ZipQuickFill onSelect={z => setZip1(z)} label="Quick fill FROM:" />

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">From ZIP</label>
          <input value={zip1} onChange={e => setZip1(e.target.value.replace(/\D/g, ''))}
            onKeyDown={e => e.key === 'Enter' && zip2.length === 5 && plan()}
            placeholder="e.g. 10001" maxLength={5}
            className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500"
            style={{ borderColor: '#e2e8f0', background: 'rgba(255,255,255,0.9)' }} />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">To ZIP</label>
          <input value={zip2} onChange={e => setZip2(e.target.value.replace(/\D/g, ''))}
            onKeyDown={e => e.key === 'Enter' && zip1.length === 5 && plan()}
            placeholder="e.g. 90210" maxLength={5}
            className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500"
            style={{ borderColor: '#e2e8f0', background: 'rgba(255,255,255,0.9)' }} />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-600 block mb-2">Travel Mode</label>
        <div className="grid grid-cols-4 gap-2">
          {MODES.map(m => (
            <button key={m.key} onClick={() => setMode(m.key)}
              className={`py-2 rounded-xl text-sm font-semibold border transition-all ${mode === m.key ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={plan} disabled={loading}
        className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        {loading ? 'Planning...' : '🗺️ Plan Route'}
      </button>

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {result && (
        <div>
          <div className="rounded-2xl border p-4 mb-4" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
            <div className="flex items-center gap-3 text-sm mb-4">
              <div className="text-center flex-1">
                <div className="font-black text-green-600 text-xl">{result.r1.zip}</div>
                <div className="text-gray-700 font-semibold">{result.r1.city}</div>
                <div className="text-gray-500 text-xs">{result.r1.stateCode}</div>
                <div className="text-xs text-gray-400 mt-1">👥 {result.r1.population > 0 ? result.r1.population.toLocaleString() : 'N/A'}</div>
              </div>
              <div className="text-center text-gray-400 flex-shrink-0">
                <div className="text-2xl">→</div>
                <div className="text-xs font-bold text-gray-600 mt-1">{result.miles.toFixed(1)} mi</div>
                <div className="text-xs text-gray-400">straight-line</div>
              </div>
              <div className="text-center flex-1">
                <div className="font-black text-green-600 text-xl">{result.r2.zip}</div>
                <div className="text-gray-700 font-semibold">{result.r2.city}</div>
                <div className="text-gray-500 text-xs">{result.r2.stateCode}</div>
                <div className="text-xs text-gray-400 mt-1">👥 {result.r2.population > 0 ? result.r2.population.toLocaleString() : 'N/A'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-white/60 p-2 text-center"><div className="text-xs text-gray-400">Est. drive distance</div><div className="font-bold">{(result.miles * 1.2).toFixed(1)} mi</div></div>
              <div className="rounded-xl bg-white/60 p-2 text-center"><div className="text-xs text-gray-400">Kilometers</div><div className="font-bold">{(result.miles * 1.60934).toFixed(1)} km</div></div>
            </div>
          </div>

          <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl mb-3 hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>
            {modeObj.label} — Open in Google Maps
          </a>

          <div className="flex gap-2">
            <button onClick={() => shareResult(result, zip1, zip2, mode)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share
            </button>
            <button onClick={() => downloadResult(result, zip1, zip2, mode)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
