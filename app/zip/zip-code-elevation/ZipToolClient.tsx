'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { zipFetch } from '@/lib/data/zip-client'

function elevationLabel(ft: number) {
  if (ft < 0)    return { label: 'Below Sea Level', color: 'text-blue-600',  icon: '🌊', bg: 'bg-blue-50', border: 'border-blue-200' }
  if (ft < 500)  return { label: 'Lowland',         color: 'text-green-600', icon: '🌾', bg: 'bg-green-50', border: 'border-green-200' }
  if (ft < 1500) return { label: 'Low Elevation',   color: 'text-lime-600',  icon: '🌿', bg: 'bg-lime-50', border: 'border-lime-200' }
  if (ft < 3500) return { label: 'Mid Elevation',   color: 'text-yellow-600',icon: '⛰️', bg: 'bg-yellow-50', border: 'border-yellow-200' }
  if (ft < 7000) return { label: 'High Elevation',  color: 'text-orange-600',icon: '🏔️', bg: 'bg-orange-50', border: 'border-orange-200' }
  return                { label: 'Alpine',           color: 'text-red-600',   icon: '🗻', bg: 'bg-red-50', border: 'border-red-200' }
}

// Elevation comparison benchmarks
const BENCHMARKS = [
  { name: 'Dead Sea', ft: -1412, color: '#3b82f6' },
  { name: 'Sea Level', ft: 0, color: '#22c55e' },
  { name: 'Denver CO', ft: 5280, color: '#f59e0b' },
  { name: 'Salt Lake', ft: 4226, color: '#f97316' },
  { name: 'Albuquerque', ft: 5312, color: '#ef4444' },
  { name: 'Mt Whitney', ft: 14505, color: '#7c3aed' },
]

function shareResult(result: any) {
  const elev = elevationLabel(result.elevation ?? 0)
  const text = `⛰️ ZIP Code Elevation: ${result.zip}\n📍 ${result.city}, ${result.state}\n🗻 ${(result.elevation ?? 0).toLocaleString()} ft (${Math.round((result.elevation ?? 0) * 0.3048).toLocaleString()} m)\n📊 Category: ${elev.label}\nCheck yours: tooltrio.com/zip/zip-code-elevation`
  if (navigator.share) navigator.share({ title: 'ZIP Elevation', text })
  else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
}

function downloadResult(result: any) {
  const elev = elevationLabel(result.elevation ?? 0)
  const text = `ZIP Code Elevation Report\n\nZIP: ${result.zip}\nCity: ${result.city}, ${result.state}\nCounty: ${result.county}\nElevation: ${result.elevation ?? 0} ft / ${Math.round((result.elevation ?? 0) * 0.3048)} m\nCategory: ${elev.label}\nCoordinates: ${result.lat}, ${result.lng}\nPopulation: ${result.population}\nTimezone: ${result.tzLabel}\n\nGenerated: tooltrio.com/zip/zip-code-elevation`
  const blob = new Blob([text], { type: 'text/plain' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `elevation-${result.zip}.txt`; a.click()
}

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(z?: string) {
    const val = (z || zip).trim()
    if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP'); setResult(null); return }
    setLoading(true); setError('')
    const res = await zipFetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    // elevation must exist in data — default to lat-based estimate if 0
    if (!data.elevation && data.elevation !== 0) {
      data.elevation = Math.round(Math.abs(data.lat - 30) * 80) // rough heuristic fallback
    }
    setResult(data)
  }

  const elev = result ? elevationLabel(result.elevation ?? 0) : null

  // Chart: ZIP vs benchmarks
  const chartData = result ? [
    ...BENCHMARKS,
    { name: result.zip, ft: result.elevation ?? 0, color: '#22c55e', isUser: true },
  ].sort((a, b) => a.ft - b.ft) : []

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-6">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Enter ZIP code (e.g. 80202 for Denver)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <button onClick={() => lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '⛰️ Check'}
        </button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && elev && (
        <div>
          <div className={`rounded-2xl border p-6 mb-4 ${elev.bg} ${elev.border}`}>
            <div className="text-center mb-5">
              <div className="text-5xl mb-2">{elev.icon}</div>
              <div className={`text-5xl font-black mb-1 ${elev.color}`}>
                {(result.elevation ?? 0).toLocaleString()} <span className="text-2xl">ft</span>
              </div>
              <div className="text-lg font-semibold text-gray-600 mb-1">
                {Math.round((result.elevation ?? 0) * 0.3048).toLocaleString()} meters
              </div>
              <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${elev.color} bg-white/60`}>{elev.label}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: '📍 ZIP',        value: result.zip },
                { label: '🏙️ City',       value: result.city },
                { label: '🗺️ State',      value: result.state },
                { label: '👥 Population', value: result.population > 0 ? result.population.toLocaleString() : 'N/A' },
                { label: '🌐 Latitude',   value: result.lat?.toFixed(4) },
                { label: '🌐 Longitude',  value: result.lng?.toFixed(4) },
                { label: '🕐 Timezone',   value: result.tzLabel || result.timezone },
                { label: '📋 County',     value: result.county },
                { label: '🏠 ZIP Type',   value: result.type },
              ].map((r: any) => (
                <div key={r.label} className="rounded-xl border p-3 bg-white/70">
                  <div className="text-xs text-gray-400">{r.label}</div>
                  <div className="font-bold text-gray-900 text-sm">{r.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Elevation comparison chart */}
          <div className="rounded-xl border p-4 mb-4 bg-white">
            <p className="text-xs font-bold text-gray-500 uppercase mb-3">📊 Elevation Comparison — {result.zip} vs US Landmarks</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ bottom: 40, left: 8 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
                <YAxis tickFormatter={v => `${v.toLocaleString()}ft`} tick={{ fontSize: 9 }} />
                <Tooltip formatter={(v: number) => [`${v.toLocaleString()} ft`, 'Elevation']} />
                <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
                <Bar dataKey="ft" radius={[4,4,0,0]}>
                  {chartData.map((entry: any, i: number) => (
                    <Cell key={i} fill={entry.isUser ? '#22c55e' : entry.ft < 0 ? '#3b82f6' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-2 text-center">🟢 = your ZIP code</p>
          </div>

          {/* Health/altitude context */}
          <div className="rounded-xl border p-4 bg-amber-50 border-amber-100 mb-4">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">💡 What This Elevation Means</p>
            <p className="text-sm text-amber-800">
              {(result.elevation ?? 0) > 8000
                ? `At over 8,000 ft, altitude sickness is a real concern for newcomers. Acclimatization typically takes 1–3 days. Drink extra water and avoid strenuous activity initially.`
                : (result.elevation ?? 0) > 5000
                ? `At 5,000+ ft, some people experience mild altitude effects (headaches, fatigue) for the first day or two. Sun exposure is stronger at this elevation.`
                : (result.elevation ?? 0) > 2000
                ? `This is moderate elevation. Most people won't notice any effects, though athletes may see slightly reduced performance.`
                : `This is low elevation, near or at sea level. No altitude concerns for most people.`}
            </p>
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
