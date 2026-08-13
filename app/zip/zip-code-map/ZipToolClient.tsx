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

  const mapUrl = result
    ? `https://maps.google.com/maps?q=${result.lat},${result.lng}&z=13&output=embed`
    : null

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
      {loading ? 'Loading...' : '🗺️ Show Map'}
    </button>

  </div>

</div>
{/* ── TRUST INDICATORS ─────────────────────────────────────── */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5">
  {[
    { icon: "🗺️", text: "Interactive Map" },
    { icon: "📍", text: "ZIP Location" },
    { icon: "🔲", text: "ZIP Boundaries" },
    { icon: "⚡", text: "Instant Results" },
    { icon: "🆓", text: "Free Forever" },
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


      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div>
        {/* ── ZIP LOCATION REPORT ────────────────────────────────── */}
<div
  className="rounded-3xl border p-6 mb-5"
  style={{
    background: "linear-gradient(135deg,#f0fdf4,#eff6ff)",
    borderColor: "#d1fae5",
    boxShadow: "0 10px 30px rgba(0,0,0,.07)",
  }}
>

  {/* Report Header */}
  <div className="text-center mb-6">

    <div className="text-xs uppercase tracking-[3px] text-gray-500 font-bold">
      ZIP Location Report
    </div>

    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3">
      {result.city}
      <span className="text-green-600">
        {" "}({result.zip})
      </span>
    </h2>

    <p className="text-gray-500 mt-2">
      {result.state} · Interactive ZIP Map
    </p>

  </div>

  {/* Location Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

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
        ZIP location
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
        {result.state}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        State / region
      </div>

    </div>

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
        ZIP population
      </div>

    </div>

    {/* County */}
    <div className="rounded-2xl border bg-white p-4">

      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          County
        </div>

        <span className="text-lg">🏛️</span>
      </div>

      <div className="font-black text-gray-900 text-xl mt-2">
        {result.county || 'N/A'}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        County area
      </div>

    </div>

    {/* Latitude */}
    <div className="rounded-2xl border bg-white p-4">

      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Latitude
        </div>

        <span className="text-lg">🌐</span>
      </div>

      <div className="font-mono font-black text-gray-900 text-lg mt-2">
        {result.lat.toFixed(5)}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        Geographic coordinate
      </div>

    </div>

    {/* Longitude */}
    <div className="rounded-2xl border bg-white p-4">

      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Longitude
        </div>

        <span className="text-lg">🌐</span>
      </div>

      <div className="font-mono font-black text-gray-900 text-lg mt-2">
        {result.lng.toFixed(5)}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        Geographic coordinate
      </div>

    </div>

    {/* Area Code */}
    <div className="rounded-2xl border bg-white p-4">

      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Area Code
        </div>

        <span className="text-lg">📞</span>
      </div>

      <div className="font-black text-gray-900 text-xl mt-2">
        {result.areaCode ? `(${result.areaCode})` : 'N/A'}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        Telephone area code
      </div>

    </div>

    {/* Timezone */}
    <div className="rounded-2xl border bg-white p-4">

      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Timezone
        </div>

        <span className="text-lg">🕐</span>
      </div>

      <div className="font-black text-gray-900 text-lg mt-2">
        {result.tzLabel || 'N/A'}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        Local time zone
      </div>

    </div>

  </div>

</div>
          {/* ── INTERACTIVE ZIP MAP ─────────────────────────────────── */}
<div
  className="rounded-3xl border overflow-hidden mb-5"
  style={{
    borderColor: "#d1fae5",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,.07)",
  }}
>

  {/* Map Header */}
  <div className="px-5 py-4 border-b bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

    <div>
      <div className="text-xs uppercase tracking-[2px] text-gray-400 font-bold">
        Interactive Map
      </div>

      <h3 className="text-lg font-black text-gray-900 mt-1">
        📍 ZIP {result.zip} Location
      </h3>
    </div>

    <div className="text-xs font-semibold text-green-600">
      ✓ Coordinates loaded
    </div>

  </div>

  {/* Map */}
  <div
    className="relative"
    style={{ height: 420 }}
  >
    <iframe
      src={mapUrl!}
      width="100%"
      height="100%"
      style={{
        border: 0,
        display: 'block',
      }}
      allowFullScreen
      loading="lazy"
      title={`Interactive map of ZIP ${result.zip}`}
    />
  </div>

  {/* Map Footer */}
  <div className="px-5 py-3 border-t bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

    <div className="text-xs text-gray-500">
      <span className="font-semibold text-gray-700">
        Center:
      </span>{' '}
      {result.lat.toFixed(5)}, {result.lng.toFixed(5)}
    </div>

    <div className="text-xs text-gray-400">
      ZIP {result.zip} · {result.city}, {result.state}
    </div>

  </div>

</div>
     {/* ── GOOGLE MAPS ACTION ──────────────────────────────────── */}
<div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

    <div>
      <div className="text-sm font-bold text-gray-900">
        📍 View This ZIP on Google Maps
      </div>

      <div className="text-xs text-gray-500 mt-1">
        Open the ZIP location directly in Google Maps.
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

{/* ── MAP PRO TIP ─────────────────────────────────────────── */}
<div
  className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3 items-start"
>
  <div className="text-xl shrink-0">
    💡
  </div>

  <div>
    <div className="font-bold text-amber-800 text-sm mb-1">
      ZIP Map Tip
    </div>

    <p className="text-xs text-amber-700 leading-relaxed">
      ZIP Code boundaries shown on maps are geographic approximations
      based on Census ZIP Code Tabulation Areas (ZCTAs). Use the map
      for geographic context and the coordinates for precise location
      calculations.
    </p>
  </div>
</div>

        </div>
      )}
    </div>
  )
}
