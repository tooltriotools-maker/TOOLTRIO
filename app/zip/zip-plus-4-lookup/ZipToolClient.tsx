'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(z?: string) {
    const val = (z || zip).trim(); if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP'); setResult(null); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    setResult(data)
  }

  // Generate example +4 extensions deterministically from ZIP
  const plus4Examples = result
    ? Array.from({ length: 6 }, (_, i) => {
        const base = (parseInt(result.zip) * 17 + i * 137) % 9000 + 1000
        return `${result.zip}-${base}`
      })
    : []

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))} onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Enter 5-digit ZIP (e.g. 10001)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <button onClick={() => lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '🔍 Lookup'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div>
          <div className="rounded-2xl border p-5 mb-4" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
            <div className="text-center mb-4">
              <div className="text-4xl font-black text-green-600 font-mono">{result.zip}-XXXX</div>
              <div className="text-gray-600 mt-1">{result.city}, {result.state} {result.zip}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: '📬 ZIP Type',   value: result.type },
                { label: '🏛️ County',     value: result.county },
                { label: '👥 Population', value: result.population > 0 ? result.population.toLocaleString() : 'N/A' },
                { label: '📞 Area Code',  value: `(${result.areaCode})` },
                { label: '🕐 Timezone',   value: result.tzLabel },
                { label: '🌐 Coords',     value: `${result.lat.toFixed(3)}, ${result.lng.toFixed(3)}` },
              ].map((r: any) => (
                <div key={r.label} className="rounded-xl border p-3 bg-white/70">
                  <div className="text-xs text-gray-400">{r.label}</div>
                  <div className="font-bold text-gray-900 text-sm">{r.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border p-4 bg-white/80">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Example ZIP+4 formats for {result.zip}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {plus4Examples.map(ex => (
                <div key={ex} className="font-mono text-sm font-bold text-gray-700 bg-gray-50 rounded-lg px-3 py-1.5">{ex}</div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">The exact +4 extension depends on the specific street address. Use the USPS ZIP Code Lookup tool for an exact match.</p>
          </div>
        </div>
      )}
    </div>
  )
}
