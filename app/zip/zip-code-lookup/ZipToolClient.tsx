'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

export default function ZipLookupClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(z?: string) {
    const val = (z || zip).trim()
    if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP code'); setResult(null); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    setResult(data)
  }

  const fields = result ? [
    { label: 'ZIP Code',    value: result.zip,          mono: true },
    { label: 'City',        value: result.city },
    { label: 'State',       value: `${result.state} (${result.stateCode})` },
    { label: 'County',      value: result.county },
    { label: 'Timezone',    value: result.tzLabel },
    { label: 'Area Code',   value: `(${result.areaCode})`, mono: true },
    { label: 'Population',  value: result.population > 0 ? result.population.toLocaleString() : 'N/A' },
    { label: 'ZIP Type',    value: result.type },
    { label: 'Elevation',   value: `${result.elevation.toLocaleString()} ft / ${Math.round(result.elevation*0.3048)} m` },
    { label: 'Coordinates', value: `${result.lat}, ${result.lng}`, mono: true },
  ] : []

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g,''))}
          onKeyDown={e => e.key==='Enter\' && lookup()}
          placeholder="Enter any US ZIP code (e.g. 10001)"
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500"
          style={{borderColor:'#e2e8f0',background:'rgba(255,255,255,0.9)'}} maxLength={5} />
        <button onClick={() => lookup()} disabled={loading}
          className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
          {loading ? '...' : 'Lookup'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div>
          <div className="rounded-2xl border p-4 mb-4 flex items-center justify-between"
            style={{background:'linear-gradient(135deg,rgba(240,253,244,0.9),rgba(236,253,245,0.8))',borderColor:'rgba(134,239,172,0.5)'}}>
            <div>
              <div className="text-3xl font-black text-green-700 font-mono">{result.zip}</div>
              <div className="text-lg font-semibold text-gray-700">{result.city}, {result.state}</div>
              <div className="text-sm text-gray-500">{result.county}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">Type</div>
              <div className="font-bold text-gray-700 text-sm">{result.type}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {fields.map(f => (
              <div key={f.label} className="rounded-xl border p-3"
                style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                <div className="text-xs text-gray-400 mb-0.5">{f.label}</div>
                <div className={`font-bold text-gray-800 text-sm ${f.mono?'font-mono':''}`}>{f.value}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              {label:'📍 View on Google Maps', url:`https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lng}`, color:'linear-gradient(135deg,#3b82f6,#2563eb)'},
              {label:'🛰️ Satellite View', url:`https://www.google.com/maps/@${result.lat},${result.lng},14z`, color:'linear-gradient(135deg,#10b981,#059669)'},
              {label:'🗺️ Get Directions', url:`https://www.google.com/maps/dir/?api=1&destination=${result.lat},${result.lng}`, color:'linear-gradient(135deg,#f59e0b,#d97706)'},
            ].map(b => (
              <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
                style={{background:b.color,boxShadow:'0 4px 14px rgba(0,0,0,0.15)'}}>
                {b.label}
              </a>
            ))}
          </div>
          {result.nearby?.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">📍 Nearby ZIP Codes</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {result.nearby.map((n: any) => (
                  <button key={n.zip} onClick={() => lookup(n.zip)}
                    className="rounded-xl border p-2.5 text-left hover:border-green-300 hover:bg-green-50 transition-all"
                    style={{background:'rgba(255,255,255,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                    <div className="font-black font-mono text-green-600 text-sm">{n.zip}</div>
                    <div className="text-xs text-gray-600">{n.city}</div>
                    <div className="text-xs text-gray-400">{n.distance.toFixed(1)} mi</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
