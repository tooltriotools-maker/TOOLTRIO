'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import { zipFetch } from '@/lib/data/zip-client'

function shareResult(result: any) {
  const text = `📍 ZIP Boundary Info: ${result.zip}\n🏙️ ${result.city}, ${result.state}\n📐 Land Area: ~${landAreaSqMi(result).toFixed(1)} sq mi\n👥 Population: ${result.population > 0 ? result.population.toLocaleString() : 'N/A'}\n🗺️ ${result.county}\nSee full details: tooltrio.com/zip/zip-boundary-info`
  if (navigator.share) navigator.share({ title: 'ZIP Boundary Info', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResult(result: any) {
  const text = `ZIP Code Boundary Information Report\n\nZIP Code: ${result.zip}\nCity: ${result.city}\nState: ${result.state} (${result.stateCode})\nCounty: ${result.county}\nZIP Type: ${result.type}\n\nGeography\n---------\nLatitude (center): ${result.lat}\nLongitude (center): ${result.lng}\nTimezone: ${result.tzLabel || result.timezone}\nElevation: ${result.elevation ?? 'N/A'} ft\n\nDemographics\n------------\nPopulation: ${result.population > 0 ? result.population.toLocaleString() : 'N/A'}\nEstimated Households: ${result.population > 0 ? Math.round(result.population / 2.53).toLocaleString() : 'N/A'}\nArea Code: (${result.areaCode})\n\nGenerated: tooltrio.com/zip/zip-boundary-info`
  const blob = new Blob([text], { type: 'text/plain' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `boundary-${result.zip}.txt`; a.click()
}

function landAreaSqMi(result: any) {
  // Estimate from population density typical for zip type
  if (!result.population) return 12
  const density = result.type === 'PO Box' ? 0 : result.population > 50000 ? 8000 : result.population > 20000 ? 3000 : result.population > 5000 ? 800 : 200
  return density > 0 ? result.population / density : 15
}

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

  const estHouseholds = result?.population > 0 ? Math.round(result.population / 2.53) : null
  const estLandArea = result ? landAreaSqMi(result) : 0
  const mapUrl = result ? `https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lng}&zoom=12` : ''
  const censusUrl = result ? `https://data.census.gov/table?g=860XX00US${result.zip}` : ''

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Enter ZIP code (e.g. 10001)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <button onClick={() => lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '🔍 Look Up'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div>
          <div className="rounded-2xl border p-5 mb-4" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
            <div className="text-center mb-4">
              <div className="text-4xl font-black text-green-600 font-mono">{result.zip}</div>
              <div className="text-gray-600 mt-1 font-semibold">{result.city}, {result.state}</div>
              <div className="text-xs text-gray-400 mt-1">{result.county} · {result.type} ZIP</div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">📍 Geography</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: '🌐 Latitude', value: result.lat?.toFixed(5) },
                  { label: '🌐 Longitude', value: result.lng?.toFixed(5) },
                  { label: '⛰️ Elevation', value: result.elevation != null ? `${result.elevation} ft` : 'N/A' },
                  { label: '🕐 Timezone', value: result.tzLabel || result.timezone },
                  { label: '📞 Area Code', value: `(${result.areaCode})` },
                  { label: '📐 Est. Area', value: `~${estLandArea.toFixed(1)} sq mi` },
                ].map(r => (
                  <div key={r.label} className="rounded-xl border p-3 bg-white/70">
                    <div className="text-xs text-gray-400">{r.label}</div>
                    <div className="font-bold text-gray-900 text-sm">{r.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">👥 Demographics</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: '👥 Population', value: result.population > 0 ? result.population.toLocaleString() : 'N/A' },
                  { label: '🏠 Est. Households', value: estHouseholds ? estHouseholds.toLocaleString() : 'N/A' },
                  { label: '📊 Pop Density', value: estLandArea > 0 && result.population > 0 ? `${Math.round(result.population / estLandArea).toLocaleString()}/sq mi` : 'N/A' },
                ].map(r => (
                  <div key={r.label} className="rounded-xl border p-3 bg-white/70">
                    <div className="text-xs text-gray-400">{r.label}</div>
                    <div className="font-bold text-gray-900 text-sm">{r.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-700 mb-3">
              📌 Boundary coordinates represent the geographic center point of ZIP {result.zip}. For precise polygon boundaries, use the USPS ZIP Code tabulation areas (ZCTA) available from the Census Bureau TIGER/Line files.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl text-white"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)' }}>
              📍 View on Map
            </a>
            <a href={censusUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl border-2 border-blue-300 text-blue-700 hover:bg-blue-50">
              📊 Census Data
            </a>
          </div>

          <div className="flex gap-2">
            <button onClick={() => shareResult(result)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share
            </button>
            <button onClick={() => downloadResult(result)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
