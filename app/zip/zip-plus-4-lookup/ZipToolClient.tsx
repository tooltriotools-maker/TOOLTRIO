'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

function shareResult(result: any) {
  const text = `📬 ZIP+4 Info: ${result.zip}\n📍 ${result.city}, ${result.state}\n👥 Population: ${result.population > 0 ? result.population.toLocaleString() : 'N/A'}\n🕐 ${result.tzLabel}\nGet your ZIP+4: tooltrio.com/zip/zip-plus-4-lookup`
  if (navigator.share) navigator.share({ title: 'ZIP+4 Lookup', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResult(result: any, plus4Examples: string[]) {
  const text = `ZIP+4 Lookup Report\n\nBase ZIP: ${result.zip}\nCity: ${result.city}, ${result.state}\nCounty: ${result.county}\nType: ${result.type}\nPopulation: ${result.population > 0 ? result.population.toLocaleString() : 'N/A'}\nTimezone: ${result.tzLabel}\nArea Code: (${result.areaCode})\n\nExample ZIP+4 Codes for ${result.zip}:\n${plus4Examples.join('\n')}\n\nNote: The +4 suffix identifies a specific block, building, or delivery route. For an exact ZIP+4 for a full street address, use the USPS ZIP Code Lookup at tools.usps.com.\n\nGenerated: tooltrio.com/zip/zip-plus-4-lookup`
  const blob = new Blob([text], { type: 'text/plain' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `zip-plus4-${result.zip}.txt`; a.click()
}

const USPS_LOOKUP = 'https://tools.usps.com/zip-code-lookup.htm?byaddress'

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

  const plus4Examples = result
    ? Array.from({ length: 8 }, (_, i) => {
        const base = (parseInt(result.zip) * 17 + i * 137) % 9000 + 1000
        return `${result.zip}-${base}`
      })
    : []

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
          onKeyDown={e => e.key === 'Enter' && lookup()}
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

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 mb-4 text-sm text-blue-800">
              <p className="font-bold mb-1">📬 What is ZIP+4?</p>
              <p className="text-xs leading-relaxed">The 4-digit extension (e.g. <span className="font-mono font-bold">{result.zip}-1234</span>) identifies a specific delivery segment within this ZIP — a city block, building floor, or PO Box range. It improves mail delivery accuracy and is required for USPS bulk mail discounts.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {[
                { label: '📬 ZIP Type',   value: result.type },
                { label: '🏛️ County',     value: result.county },
                { label: '👥 Population', value: result.population > 0 ? result.population.toLocaleString() : 'N/A' },
                { label: '🏠 Est. Households', value: result.population > 0 ? Math.round(result.population / 2.53).toLocaleString() : 'N/A' },
                { label: '📞 Area Code',  value: `(${result.areaCode})` },
                { label: '🕐 Timezone',   value: result.tzLabel },
                { label: '🌐 Latitude',   value: result.lat?.toFixed(4) },
                { label: '🌐 Longitude',  value: result.lng?.toFixed(4) },
                { label: '⛰️ Elevation',  value: result.elevation != null ? `${result.elevation} ft` : 'N/A' },
              ].map((r: any) => (
                <div key={r.label} className="rounded-xl border p-3 bg-white/70">
                  <div className="text-xs text-gray-400">{r.label}</div>
                  <div className="font-bold text-gray-900 text-sm">{r.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border p-4 bg-white/80 mb-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Example ZIP+4 formats for {result.zip}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {plus4Examples.map(ex => (
                  <div key={ex} className="font-mono text-sm font-bold text-gray-700 bg-gray-50 rounded-lg px-3 py-1.5">{ex}</div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">These are illustrative examples. Your exact +4 depends on your specific street address.</p>
            </div>

            <a href={USPS_LOOKUP} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl text-white mb-3"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)' }}>
              🏛️ Get Exact ZIP+4 from USPS (Official)
            </a>
          </div>

          <div className="flex gap-2">
            <button onClick={() => shareResult(result)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share
            </button>
            <button onClick={() => downloadResult(result, plus4Examples)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
