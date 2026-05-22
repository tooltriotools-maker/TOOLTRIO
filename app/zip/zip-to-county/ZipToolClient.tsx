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
          {loading ? '...' : '📍 Lookup'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div className="rounded-2xl border p-6" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.6)'}}>
          <div className="text-center mb-4">
            <div className="text-4xl font-black text-green-600 mb-1">{result.county}</div>
            <div className="text-gray-600">{result.city}, {result.state}</div>
            <div className="text-sm text-gray-400 mt-1">ZIP: {result.zip}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{label:'City',value:result.city},{label:'State',value:result.state},{label:'State Code',value:result.stateCode},{label:'ZIP',value:result.zip}].map((r:any)=>(
              <div key={r.label} className="rounded-xl border p-3 bg-white/60">
                <div className="text-xs text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900">{r.value}</div>
              </div>
            ))}
          </div>
        </div>)}
    </div>
  )
}
