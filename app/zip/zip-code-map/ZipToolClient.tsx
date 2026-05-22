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
          onKeyDown={e => e.key === 'Enter\' && lookup()}
          placeholder="Enter any US ZIP code (e.g. 10001)"
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} maxLength={5} />
        <button onClick={() => lookup()} disabled={loading}
          className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading ? '...' : '🗺️ Lookup'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div>
          <div className="rounded-2xl border overflow-hidden mb-4" style={{borderColor:'rgba(187,247,208,0.6)'}}>
            <iframe title={`Map of ZIP ${result.zip}`} width="100%" height="300"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=${result.lat},${result.lng}&zoom=13`}
              style={{border:0}} allowFullScreen loading="lazy" />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {([
              {label:'📍 View on Maps',url:`https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lng}`,color:'linear-gradient(135deg,#3b82f6,#2563eb)'},
              {label:'🗺️ Directions',url:`https://www.google.com/maps/dir/?api=1&destination=${result.lat},${result.lng}`,color:'linear-gradient(135deg,#f59e0b,#d97706)'},
              {label:'🛰️ Satellite',url:`https://www.google.com/maps/@${result.lat},${result.lng},14z`,color:'linear-gradient(135deg,#10b981,#059669)'},
            ] as any[]).map((b:any)=>(
              <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center py-3 text-white font-semibold rounded-xl text-sm"
                style={{background:b.color}}>{b.label}</a>
            ))}
          </div>
          <div className="text-sm text-gray-500 text-center">{result.city}, {result.state} {result.zip} · {result.lat}, {result.lng}</div>
        </div>)}
    </div>
  )
}
