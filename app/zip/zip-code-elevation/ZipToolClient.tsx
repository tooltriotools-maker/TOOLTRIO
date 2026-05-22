'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'


export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(z?: string) {
    const val = (z || zip).trim()
    if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP code'); setResult(null); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`/api/zip/lookup?zip=${val}`)
      const data = await res.json()
      setLoading(false)
      if (!res.ok) { setError(data.error); setResult(null); return }
      setResult(data)
    } catch { setLoading(false); setError('Failed to fetch. Please try again.') }
  }

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g,''))}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Enter any US ZIP code (e.g. 10001)"
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} maxLength={5} />
        <button onClick={() => lookup()} disabled={loading}
          className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading ? '...' : '⛰️ Lookup'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div className="rounded-2xl border p-6 text-center" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.6)'}}>
          <div className="text-5xl font-black text-green-600 mb-1">{result.elevation.toLocaleString()} ft</div>
          <div className="text-xl text-gray-600 mb-1">{Math.round(result.elevation*0.3048).toLocaleString()} meters</div>
          <div className="text-lg mt-2 mb-1">{result.elevation<100?'🌊 Near Sea Level':result.elevation<500?'🌿 Low Elevation':result.elevation<2000?'🏔️ Moderate Elevation':'⛰️ High Elevation'}</div>
          <div className="text-gray-400 text-sm">{result.city}, {result.state} · ZIP {result.zip}</div>
          <a href={`https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lng}`}
            target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl"
            style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)'}}>📍 View on Google Maps</a>
        </div>)}
    </div>
  )
}
