'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { zipFetch } from '@/lib/data/zip-client'

interface RadiusResult {
  zip: string
  city: string
  stateCode: string
  county: string
  population: number
  distance: number
  type?: string
}

interface CenterZip {
  zip: string
  city: string
  stateCode: string
  population: number
}

const POPULAR_CENTERS = [
  { label: '🗽 New York', zip: '10001', radius: 25 },
  { label: '🌴 Los Angeles', zip: '90001', radius: 25 },
  { label: '🌆 Chicago', zip: '60601', radius: 25 },
  { label: '🤠 Dallas', zip: '75201', radius: 50 },
  { label: '🌉 San Francisco', zip: '94102', radius: 25 },
  { label: '🏜️ Phoenix', zip: '85001', radius: 50 },
]

const RADIUS_OPTIONS = [5, 10, 15, 25, 50, 75, 100, 150, 200, 300, 500]
const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']

function shareResults(center: CenterZip, results: RadiusResult[], radius: number) {
  const totalPop = results.reduce((sum, row) => sum + (row.population || 0), 0)
  const text = `🎯 ZIP Code Radius Search\n📍 Center: ${center.zip} — ${center.city}, ${center.stateCode}\n📏 Radius: ${radius} miles\n📮 ${results.length} ZIP codes found\n👥 Total population: ${totalPop.toLocaleString()}\nSearch yours: tooltrio.com/zip/zips-within-radius`

  if (navigator.share) {
    navigator.share({ title: 'ZIP Radius Results', text }).catch(() => undefined)
  } else {
    navigator.clipboard.writeText(text).then(() => alert('Results copied!'))
  }
}

function downloadResults(center: CenterZip, results: RadiusResult[], radius: number) {
  const header = 'ZIP,City,State,County,Population,Distance_mi,Type\n'
  const rows = results.map(row =>
    `${row.zip},"${row.city}","${row.stateCode}","${row.county}",${row.population || 0},${row.distance?.toFixed(2) || ''},${row.type || ''}`
  )
  const csv = `# ZIP Code Radius Search\n# Center: ${center.zip} (${center.city}, ${center.stateCode})\n# Radius: ${radius} miles\n\n${header}${rows.join('\n')}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `radius-${center.zip}-${radius}mi.csv`
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [radius, setRadius] = useState(25)
  const [results, setResults] = useState<RadiusResult[]>([])
  const [center, setCenter] = useState<CenterZip | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(centerZip?: string, selectedRadius?: number) {
    const value = (centerZip ?? zip).trim()
    const activeRadius = selectedRadius ?? radius

    if (centerZip) setZip(centerZip)
    if (selectedRadius) setRadius(selectedRadius)

    if (!/^\d{5}$/.test(value)) {
      setError('Enter a valid 5-digit ZIP code')
      setResults([])
      setCenter(null)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await zipFetch(`/api/zip/nearby?zip=${value}&radius=${activeRadius}&limit=500`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Unable to find nearby ZIP codes')
        setResults([])
        setCenter(null)
        return
      }

      // The ZIP radius search is powered entirely by ToolTrio's local ZIP
      // dataset through zipFetch. Do not depend on a third-party geocoding API.
      // Accept both the local data-layer shape and the API compatibility shape.
      const nextCenter = data.center || data.origin
      const nextResults = data.nearby || data.results || []

      setCenter(nextCenter)
      setResults(nextResults)

      if (!nextResults.length) {
        setError(`No ZIP codes found within ${activeRadius} miles of ${value}`)
      }
    } catch {
      setError('Something went wrong while searching. Please try again.')
      setResults([])
      setCenter(null)
    } finally {
      setLoading(false)
    }
  }

  const totalPopulation = results.reduce((sum, row) => sum + (row.population || 0), 0)
  const averagePopulation = results.length ? Math.round(totalPopulation / results.length) : 0
  const stateCount = new Set(results.map(row => row.stateCode)).size
  const countyCount = new Set(results.map(row => row.county).filter(Boolean)).size
  const closestDistance = results.length ? Math.min(...results.map(row => row.distance || 0)) : 0
  const farthestDistance = results.length ? Math.max(...results.map(row => row.distance || 0)) : 0

  const distanceBuckets = [
    { range: '0–10 mi', count: 0 },
    { range: '10–25 mi', count: 0 },
    { range: '25–50 mi', count: 0 },
    { range: '50–75 mi', count: 0 },
    { range: '75–100 mi', count: 0 },
    { range: '100+ mi', count: 0 },
  ]

  results.forEach(row => {
    const distance = row.distance || 0
    if (distance < 10) distanceBuckets[0].count++
    else if (distance < 25) distanceBuckets[1].count++
    else if (distance < 50) distanceBuckets[2].count++
    else if (distance < 75) distanceBuckets[3].count++
    else if (distance < 100) distanceBuckets[4].count++
    else distanceBuckets[5].count++
  })

  const chartData = distanceBuckets.filter(bucket => bucket.count > 0)

  return (
    <div>
      {/* Quick fill — same visual language as ZIP Code Distance */}
      <div
        className="mb-4 p-3 rounded-2xl border"
        style={{ background: 'rgba(248,250,252,0.9)', borderColor: 'rgba(226,232,240,0.7)' }}
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-xs text-gray-400 font-medium">Quick fill:</span>
          <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff' }}>
            CENTER ZIP
          </span>
          <span className="text-xs text-gray-400 italic">Choose a popular ZIP and radius</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {POPULAR_CENTERS.map(centerOption => (
            <button
              key={centerOption.zip}
              type="button"
              onClick={() => {
                setZip(centerOption.zip)
                setRadius(centerOption.radius)
              }}
              className="rounded-xl border bg-white hover:bg-green-50 hover:border-green-400 transition-all p-3 text-left group"
            >
              <div className="font-semibold text-gray-800 text-sm group-hover:text-green-700">
                {centerOption.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {centerOption.zip} · {centerOption.radius} miles
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main search */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mb-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Center ZIP</label>
          <input
            value={zip}
            onChange={event => setZip(event.target.value.replace(/\D/g, ''))}
            onKeyDown={event => event.key === 'Enter' && lookup()}
            placeholder="e.g. 10001"
            maxLength={5}
            className="w-full rounded-xl px-4 py-3 text-lg font-mono focus:outline-none transition-all"
            style={{ border: '2px solid #22c55e', background: 'rgba(34,197,94,0.03)' }}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">Search Radius</label>
          <select
            value={radius}
            onChange={event => setRadius(Number(event.target.value))}
            className="w-full sm:w-40 rounded-xl px-4 py-3 text-lg font-semibold text-green-700 bg-white focus:outline-none"
            style={{ border: '2px solid #e2e8f0' }}
          >
            {RADIUS_OPTIONS.map(option => (
              <option key={option} value={option}>{option} miles</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={() => lookup()}
        disabled={loading}
        className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60 transition-all"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}
      >
        {loading ? 'Searching...' : `🎯 Find ZIPs Within ${radius} Miles`}
      </button>

      {/* Trust indicators */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5">
        {[
          { icon: '✅', text: '41,000+ ZIP Codes' },
          { icon: '📮', text: 'USPS Compatible' },
          { icon: '🆓', text: 'Free Forever' },
          { icon: '⚡', text: 'Instant Results' },
          { icon: '📅', text: 'Updated 2026' },
        ].map(item => (
          <div
            key={item.text}
            className="rounded-xl border text-center py-3 px-2"
            style={{ background: 'rgba(248,250,252,0.9)', borderColor: 'rgba(226,232,240,0.8)' }}
          >
            <div className="text-xl">{item.icon}</div>
            <div className="text-xs font-semibold text-gray-700 mt-1">{item.text}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">
          {error}
        </div>
      )}

      {center && results.length > 0 && (
        <div className="space-y-4">
          {/* Premium result summary */}
          <div
            className="rounded-3xl border p-6 mb-5"
            style={{
              background: 'linear-gradient(135deg,#f0fdf4,#eff6ff)',
              borderColor: '#d1fae5',
              boxShadow: '0 10px 30px rgba(0,0,0,.08)',
            }}
          >
            <div className="text-center">
              <div className="text-xs uppercase tracking-[3px] text-gray-500 font-bold">Radius Search Report</div>

              <h2 className="text-3xl font-black mt-3 text-gray-900 leading-tight">
                ZIP Codes Within <span className="text-green-600">{radius} Miles</span>
              </h2>

              <p className="text-gray-500 mt-2">
                Centered on <b>{center.city}</b>, {center.stateCode} ({center.zip})
              </p>

              <div className="text-5xl font-black text-green-600 mt-4">
                {results.length.toLocaleString()} ZIPs
              </div>

              <div className="text-gray-500 text-sm mt-1">
                found within {radius} miles of the center ZIP
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-xs uppercase text-gray-400">CENTER ZIP</div>
                <div className="font-bold text-xl mt-1">📍 {center.city}, {center.stateCode}</div>
                <div className="text-sm text-gray-500">ZIP {center.zip}</div>
              </div>

              <div className="rounded-2xl border bg-white p-4">
                <div className="text-xs uppercase text-gray-400">SEARCH AREA</div>
                <div className="font-bold text-xl mt-1">🎯 {radius} mile radius</div>
                <div className="text-sm text-gray-500">Across {stateCount} state{stateCount === 1 ? '' : 's'}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
              <div className="rounded-xl border bg-white p-3 text-center">
                <div className="text-xs text-gray-500">📮 ZIP Codes</div>
                <div className="font-bold mt-1">{results.length.toLocaleString()}</div>
              </div>
              <div className="rounded-xl border bg-white p-3 text-center">
                <div className="text-xs text-gray-500">👥 Population</div>
                <div className="font-bold mt-1">{totalPopulation > 0 ? totalPopulation.toLocaleString() : 'N/A'}</div>
              </div>
              <div className="rounded-xl border bg-white p-3 text-center">
                <div className="text-xs text-gray-500">🗺️ States</div>
                <div className="font-bold mt-1">{stateCount}</div>
              </div>
              <div className="rounded-xl border bg-white p-3 text-center">
                <div className="text-xs text-gray-500">📊 Avg Pop/ZIP</div>
                <div className="font-bold mt-1">{averagePopulation > 0 ? averagePopulation.toLocaleString() : 'N/A'}</div>
              </div>
              <div className="rounded-xl border bg-white p-3 text-center">
                <div className="text-xs text-gray-500">📏 Farthest</div>
                <div className="font-bold mt-1">{farthestDistance.toFixed(1)} mi</div>
              </div>
            </div>
          </div>

          {/* Full radius report */}
          <div
            className="rounded-2xl border p-4"
            style={{ background: 'rgba(255,255,255,0.9)', borderColor: 'rgba(226,232,240,0.8)' }}
          >
            <h3 className="font-bold text-gray-700 text-sm mb-3">📊 Full Radius Report</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(239,246,255,.7)', border: '1px solid rgba(147,197,253,.4)' }}>
                <div className="text-xl mb-1">🎯</div>
                <div className="text-xs text-blue-700 font-semibold">Search Radius</div>
                <div className="font-black text-blue-800 text-lg">{radius} mi</div>
                <div className="text-xs text-blue-600">Maximum distance</div>
              </div>

              <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(240,253,244,.7)', border: '1px solid rgba(134,239,172,.4)' }}>
                <div className="text-xl mb-1">👥</div>
                <div className="text-xs text-green-700 font-semibold">Population</div>
                <div className="font-black text-green-800 text-lg">{totalPopulation > 0 ? totalPopulation.toLocaleString() : 'N/A'}</div>
                <div className="text-xs text-green-600">Combined population</div>
              </div>

              <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(236,254,255,.7)', border: '1px solid rgba(103,232,249,.4)' }}>
                <div className="text-xl mb-1">🗺️</div>
                <div className="text-xs text-cyan-700 font-semibold">Coverage</div>
                <div className="font-black text-cyan-800 text-lg">{stateCount} state{stateCount === 1 ? '' : 's'}</div>
                <div className="text-xs text-cyan-600">{countyCount} counties</div>
              </div>

              <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,247,237,.8)', border: '1px solid rgba(253,186,116,.5)' }}>
                <div className="text-xl mb-1">📍</div>
                <div className="text-xs text-orange-700 font-semibold">Distance Range</div>
                <div className="font-black text-orange-800 text-lg">{closestDistance.toFixed(1)}–{farthestDistance.toFixed(1)}</div>
                <div className="text-xs text-orange-600">miles from center</div>
              </div>
            </div>
          </div>

          {/* Distance chart */}
          {chartData.length > 1 && (
            <div className="rounded-2xl border bg-white p-5" style={{ borderColor: '#e5e7eb' }}>
              <h2 className="text-2xl font-bold mb-1">📊 ZIP Distribution by Distance</h2>
              <p className="text-sm text-gray-500 mb-4">How the matching ZIP codes are distributed inside your search radius.</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Share / download */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => shareResults(center, results, radius)}
              className="flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}
            >
              📤 Share Results
            </button>
            <button
              type="button"
              onClick={() => downloadResults(center, results, radius)}
              className="flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg,#10b981,#059669)', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}
            >
              ⬇️ Download CSV
            </button>
          </div>

          {/* Results table */}
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(226,232,240,0.8)' }}>
            <div className="p-4 flex items-center justify-between gap-3" style={{ background: 'rgba(248,250,252,0.9)' }}>
              <div>
                <h2 className="text-xl font-bold text-gray-800">📮 ZIP Codes Found</h2>
                <p className="text-xs text-gray-500 mt-1">Sorted by distance from {center.zip}</p>
              </div>
              <span className="text-sm font-bold text-green-700">{results.length.toLocaleString()} results</span>
            </div>

            <div className="overflow-auto max-h-[480px]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10" style={{ background: 'rgba(240,253,244,0.98)' }}>
                  <tr>
                    {['ZIP', 'City', 'State', 'County', '👥 Population', '📏 Distance'].map(header => (
                      <th key={header} className="text-left px-3 py-3 text-xs font-bold text-gray-600 border-b whitespace-nowrap">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr key={`${row.zip}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                      <td className="px-3 py-2.5 font-mono font-bold text-green-700">{row.zip}</td>
                      <td className="px-3 py-2.5">{row.city}</td>
                      <td className="px-3 py-2.5 font-bold">{row.stateCode}</td>
                      <td className="px-3 py-2.5 text-gray-500 text-xs">{row.county || '—'}</td>
                      <td className="px-3 py-2.5 font-bold">{row.population > 0 ? row.population.toLocaleString() : '—'}</td>
                      <td className="px-3 py-2.5 text-green-700 font-bold">{row.distance ? `${row.distance.toFixed(1)} mi` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Result actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`/zip/zip-code-distance?from=${center.zip}`}
              className="flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,.25)' }}
            >
              📏 Compare ZIP Distance
            </a>
            <a
              href={`/zip/nearest-zip-code?zip=${center.zip}`}
              className="flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)', boxShadow: '0 4px 16px rgba(99,102,241,.25)' }}
            >
              📍 Find Nearest ZIPs
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
