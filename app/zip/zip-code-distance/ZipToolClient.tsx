'use client'
import { useState } from 'react'
import { zipFetch } from '@/lib/data/zip-client'

// ── Road Distance Formula ─────────────────────────────────────────────────
// Distance-aware factor calibrated against 14 verified Google Maps routes:
//   <150mi:    1.130x  (urban, turns & signals)
//   150-300mi: 1.100x  (regional mix)
//   300-600mi: 1.115x  (mostly highway)
//   600-1000mi:1.118x  NYC->Chicago: 710.7x1.118=795mi (Google:793 +0.3%)
//   >1000mi:   1.156x  SA->NYC: 1582.8x1.156=1830mi  (Google:1829 +0.1%)
// Speed also scales: 55/60/63/66/68 mph per tier (matches Google implied avg)

function getRoadFactor(s: number) {
  return s < 150 ? 1.130 : s < 300 ? 1.100 : s < 600 ? 1.115 : s < 1000 ? 1.118 : 1.156
}
function getAvgSpeed(s: number) {
  return s < 150 ? 55 : s < 300 ? 60 : s < 600 ? 63 : s < 1000 ? 66 : 68
}

const TZ_OFFSET: Record<string, number> = {
  'America/New_York': -5, 'America/Indiana/Indianapolis': -5,
  'America/Kentucky/Louisville': -5, 'America/Detroit': -5,
  'America/Chicago': -6, 'America/Denver': -7,
  'America/Boise': -7, 'America/Phoenix': -7,
  'America/Los_Angeles': -8, 'America/Anchorage': -9, 'Pacific/Honolulu': -10,
}
const TZ_LABEL: Record<string, string> = {
  'America/New_York': 'Eastern (ET)', 'America/Indiana/Indianapolis': 'Eastern (ET)',
  'America/Kentucky/Louisville': 'Eastern (ET)', 'America/Detroit': 'Eastern (ET)',
  'America/Chicago': 'Central (CT)', 'America/Denver': 'Mountain (MT)',
  'America/Boise': 'Mountain (MT)', 'America/Phoenix': 'Mountain No DST',
  'America/Los_Angeles': 'Pacific (PT)', 'America/Anchorage': 'Alaska (AKT)',
  'Pacific/Honolulu': 'Hawaii (HT)',
}
const STATE_CLIMATE: Record<string, string> = {
  AK:'Subarctic', HI:'Tropical', FL:'Subtropical', CA:'Mediterranean',
  AZ:'Desert', TX:'Hot/Humid', NY:'Four Seasons', IL:'Continental',
  WA:'Rainy/Mild', CO:'Alpine', LA:'Humid Subtropical', ME:'Cold/Humid',
  NV:'Arid', MT:'Cold Continental', OR:'Maritime', MN:'Cold Continental',
}

const POPULAR_ROUTES = [
  {
    label: '🗽 New York → Los Angeles',
    from: '10001',
    to: '90001',
  },
  {
    label: '🤠 Dallas → Houston',
    from: '75201',
    to: '77001',
  },
  {
    label: '🌴 Los Angeles → Las Vegas',
    from: '90001',
    to: '89101',
  },
  {
    label: '🌉 San Francisco → Seattle',
    from: '94102',
    to: '98101',
  },
  {
    label: '🌆 Chicago → Miami',
    from: '60601',
    to: '33101',
  },
  {
    label: '🏜 Phoenix → Denver',
    from: '85001',
    to: '80202',
  },
]




interface ZipInfo {
  zip: string; city: string; stateCode: string; state: string
  lat: number; lng: number; timezone: string; population: number
}
interface Result { r1: ZipInfo; r2: ZipInfo; miles: number; km: number }

export default function ZipDistanceClient() {
  const [zip1, setZip1] = useState('')
  const [zip2, setZip2] = useState('')
  const [filling, setFilling] = useState<'from'|'to'>('from')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

function handleQuickFill(route: { from: string; to: string }) {
  setZip1(route.from)
  setZip2(route.to)
}

  async function calculate() {
    if (!/^\d{5}$/.test(zip1) || !/^\d{5}$/.test(zip2)) {
      setError('Enter valid 5-digit ZIP codes'); return
    }
    setLoading(true); setError('')
    const res = await zipFetch(`/api/zip/distance?from=${zip1}&to=${zip2}`)
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    setResult(data)
  }

  // ── Derived metrics ───────────────────────────────────────────────────────
  let driveMiles = 0, driveKm = 0, driveHours = 0, driveMin = 0
 let straightLineMiles = 0,flightHours = 0
  let fuelCostLow = 0, fuelCostHigh = 0
  let tzMsg = '', tzDetail = ''
  let shippingGround = '', shippingPriority = ''

  if (result) {
    const s = result.miles
    const factor = getRoadFactor(s)
    const speed  = getAvgSpeed(s)
    driveMiles = Math.round(s * factor)
    driveKm    = Math.round(driveMiles * 1.60934)
    const totalMin = Math.round((driveMiles / speed) * 60)
    driveHours = Math.floor(totalMin / 60)
    driveMin   = totalMin % 60

    straightLineMiles = Math.round(s)
    flightHours = +(straightLineMiles / 500).toFixed(1)

    const gallons = driveMiles / 25
    fuelCostLow  = Math.round(gallons * 3.40)
    fuelCostHigh = Math.round(gallons * 4.20)

    const tz1 = TZ_OFFSET[result.r1.timezone] ?? -6
    const tz2 = TZ_OFFSET[result.r2.timezone] ?? -6
    const diff = Math.abs(tz2 - tz1)
    tzMsg    = diff === 0 ? 'Same timezone' : `${diff}h difference`
    tzDetail = `${TZ_LABEL[result.r1.timezone] ?? 'Unknown'} -> ${TZ_LABEL[result.r2.timezone] ?? 'Unknown'}`

    if (s < 150)       { shippingGround = '1 day';    shippingPriority = 'Overnight' }
    else if (s < 600)  { shippingGround = '2-3 days'; shippingPriority = '1-2 days' }
    else if (s < 1500) { shippingGround = '3-5 days'; shippingPriority = '2 days' }
    else               { shippingGround = '5-7 days'; shippingPriority = '2-3 days' }
  }

  return (
    <div>
      {/* ── Smart QuickFill — FROM / TO toggle ───────────────────────── */}
      <div className="mb-4 p-3 rounded-2xl border"
        style={{background:'rgba(248,250,252,0.9)',borderColor:'rgba(226,232,240,0.7)'}}>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-xs text-gray-400 font-medium">Quick fill:</span>
          <button onClick={() => setFilling('from')}
            className="text-xs px-3 py-1 rounded-full font-semibold transition-all"
            style={filling==='from'
              ? {background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'#fff'}
              : {background:'#fff',color:'#6b7280',border:'1px solid #e5e7eb'}}>
            -- FROM
          </button>
          <button onClick={() => setFilling('to')}
            className="text-xs px-3 py-1 rounded-full font-semibold transition-all"
            style={filling==='to'
              ? {background:'linear-gradient(135deg,#3b82f6,#2563eb)',color:'#fff'}
              : {background:'#fff',color:'#6b7280',border:'1px solid #e5e7eb'}}>
            -- TO
          </button>
          <span className="text-xs text-gray-400 italic">
            {filling==='from' ? 'Click city to set FROM ZIP' : 'Click city to set TO ZIP'}
          </span>
        </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

  {POPULAR_ROUTES.map(route => (

    <button
      key={route.label}
      onClick={() => handleQuickFill(route)}
      className="rounded-xl border bg-white hover:bg-green-50 hover:border-green-400 transition-all p-3 text-left group"
    >

      <div className="font-semibold text-gray-800 text-sm group-hover:text-green-700">
        {route.label}
      </div>

      <div className="text-xs text-gray-500 mt-1">
        {route.from} → {route.to}
      </div>

    </button>

  ))}

</div>
      </div>

      {/* ── ZIP inputs ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {[
          {label:'From ZIP', val:zip1, set:setZip1, ph:'e.g. 10001', color:'#22c55e', mode:'from' as const},
          {label:'To ZIP',   val:zip2, set:setZip2, ph:'e.g. 90210', color:'#3b82f6', mode:'to'   as const},
        ].map(f => (
          <div key={f.label}>
            <label className="text-sm font-semibold text-gray-600 block mb-1">{f.label}</label>
            <input
              value={f.val}
              onChange={e => f.set(e.target.value.replace(/\D/g,''))}
              onFocus={() => setFilling(f.mode)}
              placeholder={f.ph}
              maxLength={5}
              className="w-full rounded-xl px-4 py-3 text-lg font-mono focus:outline-none transition-all"
              style={{
                border: `2px solid ${filling===f.mode ? f.color : '#e2e8f0'}`,
                background: filling===f.mode ? `${f.color}08` : 'rgba(255,255,255,0.9)',
              }}
            />
          </div>
        ))}
      </div>

      <button onClick={calculate} disabled={loading}
        className="w-full py-3 text-white font-bold rounded-xl mb-4 disabled:opacity-60 transition-all"
        style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',boxShadow:'0 4px 16px rgba(34,197,94,0.3)'}}>
        {loading ? 'Calculating...' : '🔍 Calculate Distance + Full Report'}
      </button>
      
      {/* Trust Indicators */}
<div
  className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5"
>
  {[
    { icon: "✅", text: "41,000+ ZIP Codes" },
    { icon: "📮", text: "US ZIP Dataset" },
    { icon: "🆓", text: "Free Forever" },
    { icon: "⚡", text: "Instant Results" },
    { icon: "📅", text: "Updated 2026" },
  ].map((item) => (
    <div
      key={item.text}
      className="rounded-xl border text-center py-3 px-2"
      style={{
        background: "rgba(248,250,252,0.9)",
        borderColor: "rgba(226,232,240,0.8)",
      }}
    >
      <div className="text-xl">{item.icon}</div>
      <div
        className="text-xs font-semibold text-gray-700 mt-1"
      >
        {item.text}
      </div>
    </div>
  ))}
</div>

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {result && (
        <div className="space-y-4">

          {/* ── HERO: Driving Distance — THE main number ─────────────── */}
       {/* ── Premium Result Summary ───────────────────────────── */}

<div
  className="rounded-3xl border p-6 mb-5"
  style={{
    background: "linear-gradient(135deg,#f0fdf4,#eff6ff)",
    borderColor: "#d1fae5",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  }}
>
  <div className="text-center">

  <div className="text-center">

<div className="text-xs uppercase tracking-[3px] text-gray-500 font-bold">
Distance Report
</div>

<h2 className="text-3xl font-black mt-3 text-gray-900 leading-tight">

{result.r1.city}

<span className="text-green-600">
{" "}({result.r1.zip})
</span>

{" "}→{" "}

{result.r2.city}

<span className="text-blue-600">
{" "}({result.r2.zip})
</span>

</h2>

<p className="text-gray-500 mt-3">

Driving Distance between

<b> {result.r1.city}</b>

and

<b> {result.r2.city}</b>

</p>

</div>

    <div className="text-5xl font-black text-green-600 mt-3">
      {driveMiles.toLocaleString()} mi
    </div>

    <div className="text-gray-500 text-sm mt-1">
      {driveKm.toLocaleString()} km Driving Distance
    </div>

  </div>

  <div className="grid md:grid-cols-2 gap-4 mt-6">

    <div className="rounded-2xl border bg-white p-4">

      <div className="text-xs uppercase text-gray-400">
        FROM
      </div>

      <div className="font-bold text-xl mt-1">
        📍 {result.r1.city}, {result.r1.stateCode}
      </div>

      <div className="text-sm text-gray-500">
        ZIP {result.r1.zip}
      </div>

    </div>

    <div className="rounded-2xl border bg-white p-4">

      <div className="text-xs uppercase text-gray-400">
        TO
      </div>

      <div className="font-bold text-xl mt-1">
        🏁 {result.r2.city}, {result.r2.stateCode}
      </div>

      <div className="text-sm text-gray-500">
        ZIP {result.r2.zip}
      </div>

    </div>

  </div>

  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-6">

    <div className="rounded-xl border bg-white p-3 text-center">
      <div className="text-xs text-gray-500">🚗 Estimated Road</div>
      <div className="font-bold mt-1">
        {driveMiles.toLocaleString()} mi
      </div>
    </div>

    <div className="rounded-xl border bg-white p-3 text-center">
      <div className="text-xs text-gray-500">📏 Straight-Line</div>
      <div className="font-bold mt-1">
        {straightLineMiles.toLocaleString()} mi
      </div>
    </div>

    <div className="rounded-xl border bg-white p-3 text-center">
      <div className="text-xs text-gray-500">⏱ Time</div>
      <div className="font-bold mt-1">
        {driveHours}h {driveMin}m
      </div>
    </div>

    <div className="rounded-xl border bg-white p-3 text-center">
      <div className="text-xs text-gray-500">⛽ Fuel</div>
      <div className="font-bold mt-1">
        ${fuelCostLow}-${fuelCostHigh}
      </div>
    </div>

    <div className="rounded-xl border bg-white p-3 text-center">
      <div className="text-xs text-gray-500">🕐 Timezone</div>
      <div className="font-bold mt-1">
        {tzMsg}
      </div>
    </div>

  </div>

</div>



          {/* ── Full Journey Report ──────────────────────────────────── */}
          <div className="rounded-2xl border p-4"
            style={{background:'rgba(255,255,255,0.9)',borderColor:'rgba(226,232,240,0.8)'}}>
            <h3 className="font-bold text-gray-700 text-sm mb-3">📊 Full Journey Report</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          

              {/* Shipping */}
              <div className="rounded-xl p-3 text-center"
                style={{background:'rgba(255,241,242,0.7)',border:'1px solid rgba(254,202,202,0.4)'}}>
                <div className="text-xl mb-1">📦</div>
                <div className="text-xs text-red-700 font-semibold">Ground Shipping</div>
                <div className="font-black text-red-800 text-lg">{shippingGround}</div>
                <div className="text-xs text-red-600">Priority: {shippingPriority}</div>
              </div>

              {/* Climate */}
              <div className="rounded-xl p-3 text-center"
                style={{background:'rgba(236,254,255,0.7)',border:'1px solid rgba(103,232,249,0.4)'}}>
                <div className="text-xl mb-1">🌤</div>
                <div className="text-xs text-cyan-700 font-semibold">Climate</div>
                <div className="font-black text-cyan-800 text-xs leading-tight mt-1">
                  {STATE_CLIMATE[result.r1.stateCode] || 'Temperate'}<br />vs<br />
                  {STATE_CLIMATE[result.r2.stateCode] || 'Temperate'}
                </div>
              </div>
              {/* Road Type */}

<div
  className="rounded-xl p-3 text-center"
  style={{
    background:'rgba(239,246,255,.7)',
    border:'1px solid rgba(147,197,253,.4)'
  }}
>
  <div className="text-xl mb-1">🛣️</div>

<div className="rounded-xl border bg-white p-3 text-center">
  <div className="text-xs text-gray-500">
    📐 Method
  </div>

  <div className="font-bold mt-1">
    ZIP Coordinate
  </div>

  <div className="text-xs text-gray-500">
    Haversine + road estimate
  </div>
</div>

</div>

{/* Travel Tips */}

<div
  className="rounded-xl p-3 text-center"
  style={{
    background:'rgba(240,253,244,.7)',
    border:'1px solid rgba(134,239,172,.4)'
  }}
>
  <div className="text-xl mb-1">💡</div>

  <div className="text-xs text-green-700 font-semibold">
    Travel Tip
  </div>

  <div className="font-black text-green-800 mt-1">
    Best for Road Trips
  </div>

  <div className="text-xs text-green-600">
    Plan fuel & rest stops
  </div>

</div>

            </div>
          </div>

          <div
className="rounded-2xl border bg-white p-6"
style={{borderColor:"#e5e7eb"}}
>

<h2 className="text-2xl font-bold mb-5">

📊 Route Statistics

</h2>

<div className="grid md:grid-cols-2 gap-4">

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Origin City</span>
<b>{result.r1.city}, {result.r1.stateCode}</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Destination</span>
<b>{result.r2.city}, {result.r2.stateCode}</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Origin ZIP</span>
<b>{result.r1.zip}</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Destination ZIP</span>
<b>{result.r2.zip}</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Driving Distance</span>
<b>{driveMiles.toLocaleString()} mi</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Air Distance</span>
<b>{Math.round(result.miles).toLocaleString()} mi</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Estimated Drive Time</span>
<b>{driveHours}h {driveMin}m</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Estimated Fuel Cost</span>
<b>${fuelCostLow}-${fuelCostHigh}</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Timezone</span>
<b>{tzMsg}</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Ground Shipping</span>
<b>{shippingGround}</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Climate</span>
<b>{STATE_CLIMATE[result.r1.stateCode]} → {STATE_CLIMATE[result.r2.stateCode]}</b>
</div>

<div className="flex justify-between border-b pb-2">
<span className="text-gray-600">Route Type</span>
<b>Interstate Highway</b>
</div>

</div>

</div>

          {/* ── Route preview + Map CTA ──────────────────────────────── */}
          <div className="rounded-2xl border overflow-hidden"
            style={{borderColor:'rgba(226,232,240,0.7)'}}>
            <div className="p-3 flex items-center justify-between"
              style={{background:'rgba(248,250,252,0.9)'}}>
              <span className="font-bold text-gray-700 text-sm">🗺️ Route Preview</span>
              <a href={`https://www.google.com/maps/dir/${result.r1.lat},${result.r1.lng}/${result.r2.lat},${result.r2.lng}`}
                target="_blank" rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline font-semibold">
                Open in Google Maps ↗
              </a>
            </div>
          <div
  className="p-6"
  style={{
    background: "linear-gradient(135deg,#f8fafc,#eff6ff)"
  }}
>
           <div className="grid md:grid-cols-3 gap-5 items-center">

  <div className="text-center">

    <div className="text-3xl mb-2">
      📍
    </div>

    <div className="font-bold text-lg">
      {result.r1.city}
    </div>

    <div className="text-gray-500">
      {result.r1.stateCode}
    </div>

    <div className="text-sm text-gray-400">
      ZIP {result.r1.zip}
    </div>

  </div>

  <div className="text-center">

    <div className="text-4xl">
      🚗
    </div>

    <div className="font-black text-3xl mt-2 text-green-600">
      {driveMiles.toLocaleString()} mi
    </div>

    <div className="text-gray-500 mt-1">
      {driveHours}h {driveMin}m Drive
    </div>

    <div className="text-sm text-blue-600 mt-2">
      Interstate Route
    </div>

  </div>

  <div className="text-center">

    <div className="text-3xl mb-2">
      🏁
    </div>

    <div className="font-bold text-lg">
      {result.r2.city}
    </div>

    <div className="text-gray-500">
      {result.r2.stateCode}
    </div>

    <div className="text-sm text-gray-400">
      ZIP {result.r2.zip}
    </div>

  </div>

</div>
            </div>
          </div>

          {/* ── Google Maps CTAs ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href={`https://www.google.com/maps/dir/${result.r1.lat},${result.r1.lng}/${result.r2.lat},${result.r2.lng}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
              style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)',boxShadow:'0 4px 16px rgba(59,130,246,0.3)'}}>
              🗺️ Get Driving Directions
            </a>
            <a href={`https://www.google.com/maps/@${(result.r1.lat+result.r2.lat)/2},${(result.r1.lng+result.r2.lng)/2},7z`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
              style={{background:'linear-gradient(135deg,#10b981,#059669)',boxShadow:'0 4px 16px rgba(16,185,129,0.3)'}}>
              🛰️ View Area on Map
            </a>
          </div>

          {/* ── Disclaimer ───────────────────────────────────────────── */}

          {/* Dynamic FAQ */}

          <div
className="rounded-2xl border bg-white p-6 mt-6"
style={{borderColor:"#e5e7eb"}}
>

<h2 className="text-2xl font-bold mb-5">

🔗 Continue Exploring

</h2>

<div className="grid md:grid-cols-2 gap-6">

<div>

<h3 className="font-bold mb-3">

📍 {result.r1.city} ({result.r1.zip})

</h3>

<div className="space-y-2">

<a href={`/zip/zip-boundary-info?zip=${result.r1.zip}`} className="block hover:text-green-600">
🗺 ZIP Boundary
</a>

<a href={`/zip/zip-code-population?zip=${result.r1.zip}`} className="block hover:text-green-600">
👥 Population
</a>

<a href={`/zip/zip-to-timezone?zip=${result.r1.zip}`} className="block hover:text-green-600">
🕐 Timezone
</a>

<a href={`/zip/zip-to-coordinates?zip=${result.r1.zip}`} className="block hover:text-green-600">
📍 Coordinates
</a>

<a href={`/zip/county-zip-codes?zip=${result.r1.zip}`} className="block hover:text-green-600">
🏛 County
</a>

</div>

</div>

<div>

<h3 className="font-bold mb-3">

📍 {result.r2.city} ({result.r2.zip})

</h3>

<div className="space-y-2">

<a href={`/zip/zip-boundary-info?zip=${result.r2.zip}`} className="block hover:text-green-600">
🗺 ZIP Boundary
</a>

<a href={`/zip/zip-code-population?zip=${result.r2.zip}`} className="block hover:text-green-600">
👥 Population
</a>

<a href={`/zip/zip-to-timezone?zip=${result.r2.zip}`} className="block hover:text-green-600">
🕐 Timezone
</a>

<a href={`/zip/zip-to-coordinates?zip=${result.r2.zip}`} className="block hover:text-green-600">
📍 Coordinates
</a>

<a href={`/zip/county-zip-codes?zip=${result.r2.zip}`} className="block hover:text-green-600">
🏛 County
</a>

</div>

</div>

</div>

</div>

<div
className="rounded-2xl border bg-gradient-to-r from-green-50 to-blue-50 p-6 mt-6"
>

<h2 className="text-xl font-bold mb-5">

🚀 More ZIP Tools

</h2>

<div className="grid md:grid-cols-3 gap-3">

<a href="/zip/zips-within-radius">🎯 ZIPs Within Radius</a>

<a href="/zip/zip-code-map">🗺 ZIP Code Map</a>

<a href="/zip/drive-time-by-zip">🚗 Drive Time by ZIP</a>

<a href="/zip/zip-to-zip-route">🛣 ZIP Route Planner</a>

<a href="/zip/nearest-zip-code">📍 Nearest ZIP</a>

<a href="/zip/multi-zip-distance">📐 Multi ZIP Distance</a>

<a href="/zip/zip-code-lookup">🔍 ZIP Lookup</a>

<a href="/zip/address-to-zip">🏠 Address to ZIP</a>

<a href="/zip/zip-to-city">🏙 ZIP to City</a>

</div>

</div>





<div
  className="rounded-2xl border p-5 mt-6"
  style={{
    borderColor:"#e5e7eb",
    background:"#fff"
  }}
>

<h3 className="text-xl font-bold mb-4">
Frequently Asked About This Route
</h3>

<div className="space-y-3">

<details className="rounded-xl border p-3">

<summary className="font-semibold cursor-pointer">

How far is {result.r1.city} ({result.r1.zip}) from {result.r2.city} ({result.r2.zip})?

</summary>

<p className="mt-3 text-gray-600">

Estimated road distance is approximately <b>{driveMiles.toLocaleString()} miles</b> while straight-line distance is <b>{Math.round(result.miles).toLocaleString()} miles</b>.

</p>

</details>

<details className="rounded-xl border p-3">

<summary className="font-semibold cursor-pointer">

How long does it take to drive?

</summary>

<p className="mt-3 text-gray-600">

The estimated drive time is

<b> {driveHours}h {driveMin}m </b>

under normal highway conditions.

</p>

</details>

<details className="rounded-xl border p-3">

<summary className="font-semibold cursor-pointer">

What is the estimated fuel cost?

</summary>

<p className="mt-3 text-gray-600">

Fuel cost is approximately

<b>

${fuelCostLow} - ${fuelCostHigh}

</b>

based on 25 MPG.

</p>

</details>

<details className="rounded-xl border p-3">

<summary className="font-semibold cursor-pointer">

Do these ZIP Codes share the same timezone?

</summary>

<p className="mt-3 text-gray-600">

{tzMsg}.

{tzDetail}

</p>

</details>

</div>

</div>

<div
className="rounded-2xl border p-6 bg-white"
style={{borderColor:"#e5e7eb"}}
>

<h2 className="text-2xl font-bold mb-4">
  ZIP Code vs. ZCTA: Why the Difference Matters
</h2>

<p className="text-gray-700 leading-8">
  A USPS ZIP Code is created for mail delivery. A Census ZIP Code
  Tabulation Area (ZCTA) is a generalized geographic representation
  created for mapping and statistical analysis.
</p>

<p className="text-gray-700 leading-8 mt-4">
  They often have the same five-digit code, but they are not identical
  geographic concepts. Not every USPS ZIP Code has a corresponding ZCTA.
</p>

<p className="text-gray-700 leading-8 mt-4">
  For a ZIP distance calculation, this distinction matters because
  different datasets can use different representative coordinates.
</p> 

<h2 className="text-2xl font-bold mb-4">

Driving from {result.r1.city}, {result.r1.stateCode}
to {result.r2.city}, {result.r2.stateCode}

</h2>

<p className="text-gray-700 leading-8">

The driving distance from

<b> {result.r1.city} ({result.r1.zip})</b>

to

<b> {result.r2.city} ({result.r2.zip})</b>

is approximately

<b> {driveMiles.toLocaleString()} miles</b>

({driveKm.toLocaleString()} km).

The estimated driving time is

<b> {driveHours} hours {driveMin} minutes</b>

using the calculator&apos;s estimated average travel speed.

The straight-line air distance between these ZIP codes is

<b> {Math.round(result.miles).toLocaleString()} miles</b>.

</p>

</div>

<div
className="rounded-2xl border p-6 bg-white"
style={{borderColor:"#e5e7eb"}}
>

<h2 className="text-2xl font-bold mb-4">

{result.r1.city} vs {result.r2.city}

</h2>

<p className="leading-8 text-gray-700">

Traveling from

<b>{result.r1.city}, {result.r1.stateCode}</b>

to

<b>{result.r2.city}, {result.r2.stateCode}</b>

covers approximately

<b>{driveMiles.toLocaleString()} driving miles</b>

with an estimated travel time of

<b>{driveHours} hours {driveMin} minutes</b>.

This journey crosses different geographic regions of the United States and may include interstate highways, mountain passes, urban areas, or rural roads depending on the selected ZIP Codes.

</p>

<p className="leading-8 text-gray-700 mt-4">

The straight-line distance between these ZIP Codes is

<b> {Math.round(result.miles).toLocaleString()} miles</b>,

while the estimated road distance is

<b>{driveMiles.toLocaleString()} miles</b>.

Fuel cost is estimated between

<b>${fuelCostLow}-${fuelCostHigh}</b>

for an average vehicle achieving

<b>25 MPG</b>.

</p>

</div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
            Road distance calibrated vs Google Maps (SA-NYC: 1,830 mi vs Google 1,829 mi). Drive time uses distance-adjusted avg speed. Fuel at avg US prices, 25 mpg.
          </div>

        </div>
      )}
    </div>
  )
}
