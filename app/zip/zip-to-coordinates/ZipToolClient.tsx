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
    const val=(z||zip).trim(); if(z) setZip(z)
    if(!/^\d{5}$/.test(val)){setError('Enter a valid 5-digit ZIP');setResult(null);return}
    setLoading(true);setError('')
    const res=await zipFetch(`/api/zip/lookup?zip=${val}`)
    const data=await res.json(); setLoading(false)
    if(!res.ok){setError(data.error);setResult(null);return}
    setResult(data)
  }

  return (
    <div>
  {/* ── ZIP INPUT ───────────────────────────────────────────── */}
<div className="mb-4">
  <ZipQuickFill onSelect={z => lookup(z)} />
</div>

<div className="mb-4">

  <label className="text-sm font-semibold text-gray-600 block mb-1">
    ZIP Code
  </label>

  <div className="flex gap-3">

    <input
      value={zip}
      onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
      onKeyDown={e => e.key === 'Enter' && lookup()}
      placeholder="e.g. 10001"
      maxLength={5}
      className="flex-1 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none transition-all"
      style={{
        border: '2px solid #e2e8f0',
        background: 'rgba(255,255,255,0.9)',
      }}
    />

    <button
      onClick={() => lookup()}
      disabled={loading}
      className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60 transition-all"
      style={{
        background: 'linear-gradient(135deg,#22c55e,#16a34a)',
        boxShadow: '0 4px 16px rgba(34,197,94,0.3)',
      }}
    >
      {loading ? 'Loading...' : '🌐 Lookup'}
    </button>

  </div>

</div>
{/* ── TRUST INDICATORS ─────────────────────────────────────── */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5">
  {[
    { icon: "🌐", text: "US ZIP Coverage" },
    { icon: "📍", text: "Lat / Longitude" },
    { icon: "🆓", text: "Free Forever" },
    { icon: "⚡", text: "Instant Results" },
    { icon: "🔒", text: "No Data Stored" },
  ].map((item) => (
    <div
      key={item.text}
      className="rounded-xl border text-center py-3 px-2"
      style={{
        background: "rgba(248,250,252,0.9)",
        borderColor: "rgba(226,232,240,0.8)",
      }}
    >
      <div className="text-xl">
        {item.icon}
      </div>

      <div className="text-xs font-semibold text-gray-700 mt-1">
        {item.text}
      </div>
    </div>
  ))}
</div>

      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result&&(
        <div>
       {/* ── COORDINATE RESULT ───────────────────────────────────── */}
<div
  className="rounded-3xl border p-6 mb-5"
  style={{
    background: "linear-gradient(135deg,#f0fdf4,#eff6ff)",
    borderColor: "#d1fae5",
    boxShadow: "0 10px 30px rgba(0,0,0,.07)",
  }}
>
  <div className="text-center mb-6">

    <div className="text-xs uppercase tracking-[3px] text-gray-500 font-bold">
      Coordinate Report
    </div>

    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
      {result.city}
      <span className="text-green-600">
        {" "}({result.zip})
      </span>
    </h2>

    <p className="text-gray-500 mt-2">
      {result.stateCode} · Geographic ZIP Centroid
    </p>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Latitude */}
    <div className="rounded-2xl border bg-white p-5">

      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Latitude
        </div>

        <span className="text-lg">↕️</span>
      </div>

      <div className="text-3xl font-black text-green-600 font-mono">
        {result.lat.toFixed(6)}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        North / South coordinate
      </div>

      <button
        onClick={() =>
          navigator.clipboard.writeText(result.lat.toFixed(6))
        }
        className="mt-4 text-xs px-4 py-2 rounded-xl border border-green-200 text-green-700 font-semibold hover:bg-green-50 transition-all"
      >
        📋 Copy Latitude
      </button>

    </div>

    {/* Longitude */}
    <div className="rounded-2xl border bg-white p-5">

      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Longitude
        </div>

        <span className="text-lg">↔️</span>
      </div>

      <div className="text-3xl font-black text-blue-600 font-mono">
        {result.lng.toFixed(6)}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        East / West coordinate
      </div>

      <button
        onClick={() =>
          navigator.clipboard.writeText(result.lng.toFixed(6))
        }
        className="mt-4 text-xs px-4 py-2 rounded-xl border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition-all"
      >
        📋 Copy Longitude
      </button>

    </div>

  </div>
  {/* ── COPY COORDINATES ───────────────────────────────────── */}
<div className="mt-4">

  <button
    onClick={() => {
      navigator.clipboard.writeText(
        `${result.lat.toFixed(6)}, ${result.lng.toFixed(6)}`
      )
    }}
    className="w-full py-3 px-5 rounded-xl border-2 border-green-300 bg-white text-green-700 font-bold text-sm hover:bg-green-50 hover:border-green-400 transition-all"
  >
    📋 Copy Coordinates
  </button>

</div>
</div>
          <div className="rounded-xl border p-3 mb-4 font-mono text-sm text-gray-600" style={{background:'rgba(248,250,248,0.8)'}}>
            {result.lat}, {result.lng}
          </div>
       {/* ── LOCATION SUMMARY ───────────────────────────────────── */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">

  {/* Population */}
  <div className="rounded-2xl border bg-white p-4">

    <div className="flex items-center justify-between">
      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
        Population
      </div>

      <span className="text-lg">👥</span>
    </div>

    <div className="font-black text-gray-900 text-xl mt-2">
      {result.population > 0
        ? result.population.toLocaleString()
        : 'N/A'}
    </div>

    <div className="text-xs text-gray-400 mt-1">
      ZIP Code population
    </div>

  </div>

  {/* City */}
  <div className="rounded-2xl border bg-white p-4">

    <div className="flex items-center justify-between">
      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
        City
      </div>

      <span className="text-lg">📍</span>
    </div>

    <div className="font-black text-gray-900 text-xl mt-2">
      {result.city}
    </div>

    <div className="text-xs text-gray-400 mt-1">
      Associated city
    </div>

  </div>

  {/* State */}
  <div className="rounded-2xl border bg-white p-4">

    <div className="flex items-center justify-between">
      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
        State
      </div>

      <span className="text-lg">🗺️</span>
    </div>

    <div className="font-black text-gray-900 text-xl mt-2">
      {result.stateCode}
    </div>

    <div className="text-xs text-gray-400 mt-1">
      USPS state abbreviation
    </div>

  </div>

</div>
       {/* ── GOOGLE MAPS ACTION ──────────────────────────────────── */}
<div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

    <div>
      <div className="text-sm font-bold text-gray-900">
        📍 View Location on Map
      </div>

      <div className="text-xs text-gray-500 mt-1">
        Open these ZIP centroid coordinates directly in Google Maps.
      </div>
    </div>

    <a
      href={`https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-bold rounded-xl transition-all hover:opacity-90 shrink-0"
      style={{
        background: 'linear-gradient(135deg,#3b82f6,#2563eb)',
        boxShadow: '0 4px 16px rgba(59,130,246,0.3)',
      }}
    >
      🗺️ Open Google Maps
    </a>

  </div>

</div>
        </div>
      )}
    </div>
  )
}
