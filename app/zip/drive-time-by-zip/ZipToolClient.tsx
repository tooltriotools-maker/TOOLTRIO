'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

// Generate 300 speed options 1-300 mph
const SPEED_OPTIONS = Array.from({ length: 300 }, (_, i) => i + 1)

const SPEED_LABELS: Record<number, string> = {
  15: 'School zone',
  25: 'Residential',
  30: 'City streets',
  35: 'Urban mixed',
  45: 'Suburban',
  55: 'Rural highway',
  60: 'Highway (default)',
  65: 'Interstate',
  70: 'Fast interstate',
  75: 'High-speed interstate',
  80: 'Speed limit max',
  100: 'Track day 🏁',
  150: 'Race car 🚗',
  200: 'Formula 1 🏎️',
  250: 'Bullet train 🚄',
  300: 'Theoretical max 🛸',
}

function getSpeedLabel(s: number) {
  return SPEED_LABELS[s] || (s <= 30 ? 'City' : s <= 55 ? 'Mixed roads' : s <= 80 ? 'Highway' : s <= 150 ? 'Racing speed' : 'Extreme speed')
}

function shareResult(result: any, zip1: string, zip2: string, speed: number) {
  const h = Math.floor(result.hours), m = Math.round((result.hours - h) * 60)
  const time = h > 0 ? `${h}h ${m}m` : `${m} min`
  const text = `🚗 Drive Time: ${zip1} → ${zip2}\n⏱️ ${time} at ${speed} mph\n📏 ${result.driveMiles.toFixed(1)} mi estimated drive\n📍 ${result.r1.city} → ${result.r2.city}\nCalculate yours: tooltrio.com/zip/drive-time-by-zip`
  if (navigator.share) navigator.share({ title: 'Drive Time', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResult(result: any, zip1: string, zip2: string, speed: number) {
  const h = Math.floor(result.hours), m = Math.round((result.hours - h) * 60)
  const text = `Drive Time Report\n\nFrom: ${zip1} (${result.r1.city}, ${result.r1.stateCode})\nTo: ${zip2} (${result.r2.city}, ${result.r2.stateCode})\n\nAverage Speed: ${speed} mph\nStraight-line Distance: ${result.miles.toFixed(1)} miles\nEstimated Drive Distance: ${result.driveMiles.toFixed(1)} miles\nEstimated Drive Time: ${h > 0 ? `${h}h ${m}m` : `${m} min`}\n\nFrom Population: ${result.r1.population > 0 ? result.r1.population.toLocaleString() : 'N/A'}\nTo Population: ${result.r2.population > 0 ? result.r2.population.toLocaleString() : 'N/A'}\n\nNote: Estimate only. Use Google Maps for actual turn-by-turn directions.\nGenerated: tooltrio.com/zip/drive-time-by-zip`
  const blob = new Blob([text], { type: 'text/plain' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `drive-time-${zip1}-to-${zip2}.txt`; a.click()
}

export default function ZipToolClient() {
  const [zip1, setZip1] = useState('')
  const [zip2, setZip2] = useState('')
  const [speed, setSpeed] = useState(60)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function calculate() {
    if (!/^\d{5}$/.test(zip1) || !/^\d{5}$/.test(zip2)) { setError('Enter valid 5-digit ZIP codes'); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/distance?from=${zip1}&to=${zip2}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); return }
    const driveMiles = data.miles * 1.2
    const hours = driveMiles / speed
    setResult({ ...data, driveMiles, hours })
  }

  const h = result ? Math.floor(result.hours) : 0
  const m = result ? Math.round((result.hours - h) * 60) : 0
  const directionsUrl = result ? `https://www.google.com/maps/dir/${result.r1.lat},${result.r1.lng}/${result.r2.lat},${result.r2.lng}` : ''

  return (
    <div>
      <ZipQuickFill onSelect={z => setZip1(z)} label="Quick fill FROM:" />
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">From ZIP</label>
          <input value={zip1} onChange={e => setZip1(e.target.value.replace(/\D/g, ''))}
            placeholder="e.g. 10001" maxLength={5}
            className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500"
            style={{ borderColor: '#e2e8f0', background: 'rgba(255,255,255,0.9)' }} />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">To ZIP</label>
          <input value={zip2} onChange={e => setZip2(e.target.value.replace(/\D/g, ''))}
            placeholder="e.g. 90210" maxLength={5}
            className="w-full border-2 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-green-500"
            style={{ borderColor: '#e2e8f0', background: 'rgba(255,255,255,0.9)' }} />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-600 block mb-1">
          Average Speed: <span className="text-green-700 font-black">{speed} mph</span>
          <span className="ml-2 text-gray-400 text-xs font-normal">— {getSpeedLabel(speed)}</span>
        </label>
        <div className="flex items-center gap-3">
          <select value={speed} onChange={e => setSpeed(+e.target.value)}
            className="flex-1 border-2 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-500"
            style={{ borderColor: '#e2e8f0', background: 'rgba(255,255,255,0.9)' }}>
            {SPEED_OPTIONS.map(s => (
              <option key={s} value={s}>{s} mph{SPEED_LABELS[s] ? ` — ${SPEED_LABELS[s]}` : ''}</option>
            ))}
          </select>
        </div>
        <input type="range" min={1} max={300} value={speed} onChange={e => setSpeed(+e.target.value)}
          className="w-full mt-2 accent-green-500" />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 mph</span><span>150 mph</span><span>300 mph</span>
        </div>
      </div>

      <button onClick={calculate} disabled={loading}
        className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        {loading ? 'Calculating...' : '🚗 Estimate Drive Time'}
      </button>

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {result && (
        <div>
          <div className="rounded-2xl border p-6 text-center mb-4" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
            <div className="text-5xl font-black text-green-600 mb-1">
              {h > 0 ? `${h}h ${m}m` : `${m} min`}
            </div>
            <div className="text-gray-500 mb-1">Estimated drive time at {speed} mph</div>
            <div className="text-sm text-gray-400 mb-4">{result.r1.city}, {result.r1.stateCode} → {result.r2.city}, {result.r2.stateCode}</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              <div className="rounded-xl bg-white/60 p-2"><div className="text-xs text-gray-400">Straight-line</div><div className="font-bold">{result.miles.toFixed(1)} mi</div></div>
              <div className="rounded-xl bg-white/60 p-2"><div className="text-xs text-gray-400">Est. drive</div><div className="font-bold">{result.driveMiles.toFixed(1)} mi</div></div>
              <div className="rounded-xl bg-white/60 p-2"><div className="text-xs text-gray-400">👥 Pop (from)</div><div className="font-bold">{result.r1.population > 0 ? result.r1.population.toLocaleString() : 'N/A'}</div></div>
              <div className="rounded-xl bg-white/60 p-2"><div className="text-xs text-gray-400">👥 Pop (to)</div><div className="font-bold">{result.r2.population > 0 ? result.r2.population.toLocaleString() : 'N/A'}</div></div>
            </div>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl mb-3 hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>
            🗺️ Get Real Directions on Google Maps
          </a>
          <div className="flex gap-2 mb-3">
            <button onClick={() => shareResult(result, zip1, zip2, speed)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share
            </button>
            <button onClick={() => downloadResult(result, zip1, zip2, speed)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download
            </button>
          </div>
          <div className="mt-1 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
            ⚠️ Estimate only — drive distance uses 1.2× straight-line factor. Use Google Maps for actual routes.
          </div>
        </div>
      )}
    </div>
  )
}
