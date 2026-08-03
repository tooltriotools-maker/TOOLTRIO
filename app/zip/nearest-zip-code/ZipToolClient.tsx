'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import { zipFetch } from '@/lib/data/zip-client'

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(z?: string) {
    const val = (z || zip).trim(); if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP'); setResult(null); return }
    setLoading(true); setError('')
    const res = await zipFetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    setResult(data)
  }

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))} onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Enter ZIP code (e.g. 10001)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <button onClick={() => lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '📍 Find Nearby'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div>
          <div className="rounded-2xl border p-4 mb-4" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">📍 CENTER ZIP</span>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="text-3xl font-black text-green-600 font-mono">{result.zip}</div>
              <div>
                <div className="font-bold text-gray-900">{result.city}, {result.state}</div>
                <div className="text-sm text-gray-500">{result.county} · 👥 {result.population > 0 ? result.population.toLocaleString() : 'N/A'}</div>
              </div>
            </div>
          </div>

          {result.nearby && result.nearby.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">Nearby ZIP Codes</h3>
              <div className="space-y-2">
                {result.nearby.map((n: any, i: number) => (
                  <div key={i} className="flex items-center justify-between gap-3 rounded-xl border p-3 bg-white/80">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-black flex items-center justify-center">{i + 1}</span>
                      <div>
                        <span className="font-mono font-black text-green-700 mr-2">{n.zip}</span>
                        <span className="text-gray-800 font-semibold">{n.city}, {n.stateCode}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-bold text-gray-700">{n.distance ? `${n.distance.toFixed(1)} mi` : '—'}</div>
                      <div className="text-xs text-gray-400">👥 {n.population > 0 ? n.population.toLocaleString() : 'N/A'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
