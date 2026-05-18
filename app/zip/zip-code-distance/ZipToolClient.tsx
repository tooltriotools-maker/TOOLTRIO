'use client'
import { useState } from 'react'

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

const POPULAR = [
  {zip:'10001',label:'NYC'}, {zip:'90210',label:'Beverly Hills'},
  {zip:'60601',label:'Chicago'}, {zip:'77001',label:'Houston'},
  {zip:'85001',label:'Phoenix'}, {zip:'19101',label:'Philadelphia'},
  {zip:'78201',label:'San Antonio'}, {zip:'92101',label:'San Diego'},
  {zip:'75201',label:'Dallas'}, {zip:'98101',label:'Seattle'},
  {zip:'02108',label:'Boston'}, {zip:'30303',label:'Atlanta'},
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

  function handleQuickFill(zip: string) {
    if (filling === 'from') setZip1(zip)
    else setZip2(zip)
  }

  async function calculate() {
    if (!/^\d{5}$/.test(zip1) || !/^\d{5}$/.test(zip2)) {
      setError('Enter valid 5-digit ZIP codes'); return
    }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/distance?from=${zip1}&to=${zip2}`)
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    setResult(data)
  }

  // ── Derived metrics ───────────────────────────────────────────────────────
  let driveMiles = 0, driveKm = 0, driveHours = 0, driveMin = 0
  let flightMiles = 0, flightHours = 0
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

    flightMiles = Math.round(s * 1.05)
    flightHours = +(flightMiles / 500).toFixed(1)

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
        <div className="flex flex-wrap gap-2">
          {POPULAR.map(p => (
            <button key={p.zip} onClick={() => handleQuickFill(p.zip)}
              className="text-xs px-3 py-1.5 rounded-full border font-mono transition-all"
              style={{
                borderColor: filling==='from' ? 'rgba(134,239,172,0.6)' : 'rgba(147,197,253,0.6)',
                color: filling==='from' ? '#15803d' : '#1d4ed8',
                background:'#fff',
              }}>
              {p.zip} <span className="font-sans text-gray-400">({p.label})</span>
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

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {result && (
        <div className="space-y-4">

          {/* ── HERO: Driving Distance — THE main number ─────────────── */}
          <div className="rounded-2xl border p-5 text-center"
            style={{background:'rgba(240,253,244,0.9)',borderColor:'rgba(134,239,172,0.8)',boxShadow:'0 4px 20px rgba(34,197,94,0.15)'}}>
            <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">🚗 Driving Distance</div>
            <div className="text-6xl font-black text-green-600 leading-none">
              {driveMiles.toLocaleString()}
            </div>
            <div className="text-base text-green-700 font-semibold mt-1">
              miles &nbsp;·&nbsp; {driveKm.toLocaleString()} km
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Straight-line: {result.miles.toFixed(1)} mi &nbsp;·&nbsp; {result.km.toFixed(1)} km
            </div>
          </div>

          {/* ── City labels ──────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3">
            {[result.r1, result.r2].map((r, i) => (
              <div key={i} className="rounded-xl border p-3" style={{background:'rgba(248,250,248,0.9)'}}>
                <div className="text-xs text-gray-400">{i===0 ? '📍 From' : '🏁 To'}</div>
                <div className="font-bold text-gray-800">{r.city}, {r.stateCode}</div>
                <div className="text-sm text-gray-500">ZIP {r.zip}</div>
              </div>
            ))}
          </div>

          {/* ── Full Journey Report ──────────────────────────────────── */}
          <div className="rounded-2xl border p-4"
            style={{background:'rgba(255,255,255,0.9)',borderColor:'rgba(226,232,240,0.8)'}}>
            <h3 className="font-bold text-gray-700 text-sm mb-3">📊 Full Journey Report</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

              {/* Drive time */}
              <div className="rounded-xl p-3 text-center"
                style={{background:'rgba(254,243,199,0.7)',border:'1px solid rgba(251,191,36,0.4)'}}>
                <div className="text-xl mb-1">🚗</div>
                <div className="text-xs text-amber-700 font-semibold">Drive Time</div>
                <div className="font-black text-amber-800 text-lg">{driveHours}h {driveMin}m</div>
                <div className="text-xs text-amber-600">{driveMiles.toLocaleString()} mi by road</div>
              </div>

              {/* Flight */}
              <div className="rounded-xl p-3 text-center"
                style={{background:'rgba(239,246,255,0.7)',border:'1px solid rgba(147,197,253,0.4)'}}>
                <div className="text-xl mb-1">✈️</div>
                <div className="text-xs text-blue-700 font-semibold">Flight Distance</div>
                <div className="font-black text-blue-800 text-lg">{flightMiles.toLocaleString()} mi</div>
                <div className="text-xs text-blue-600">~{flightHours}h airtime</div>
              </div>

              {/* Fuel cost */}
              <div className="rounded-xl p-3 text-center"
                style={{background:'rgba(240,253,244,0.7)',border:'1px solid rgba(134,239,172,0.4)'}}>
                <div className="text-xl mb-1">⛽</div>
                <div className="text-xs text-green-700 font-semibold">Fuel Cost Est.</div>
                <div className="font-black text-green-800 text-lg">${fuelCostLow}-${fuelCostHigh}</div>
                <div className="text-xs text-green-600">avg 25 mpg</div>
              </div>

              {/* Timezone */}
              <div className="rounded-xl p-3 text-center"
                style={{background:'rgba(245,243,255,0.7)',border:'1px solid rgba(196,181,253,0.4)'}}>
                <div className="text-xl mb-1">🕐</div>
                <div className="text-xs text-purple-700 font-semibold">Time Zones</div>
                <div className="font-black text-purple-800 text-lg">{tzMsg}</div>
                <div className="text-xs text-purple-600">{tzDetail}</div>
              </div>

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
            <div style={{height:180,background:'linear-gradient(135deg,#e0f2fe,#dbeafe)'}}>
              <div className="h-full flex flex-col items-center justify-center gap-3 p-4">
                <div className="flex items-center gap-4 w-full max-w-xs">
                  <div className="flex-1 rounded-xl p-3 text-center text-white font-bold text-sm"
                    style={{background:'linear-gradient(135deg,#22c55e,#16a34a)'}}>
                    📍 {result.r1.city}<br />
                    <span className="text-xs font-normal opacity-90">{result.r1.stateCode} {result.r1.zip}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-gray-500 text-lg">→</div>
                    <div className="text-xs font-black text-gray-700">{driveMiles.toLocaleString()} mi</div>
                  </div>
                  <div className="flex-1 rounded-xl p-3 text-center text-white font-bold text-sm"
                    style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)'}}>
                    🏁 {result.r2.city}<br />
                    <span className="text-xs font-normal opacity-90">{result.r2.stateCode} {result.r2.zip}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {driveMiles.toLocaleString()} mi road · {driveHours}h {driveMin}m drive · {tzMsg}
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
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
            Road distance calibrated vs Google Maps (SA-NYC: 1,830 mi vs Google 1,829 mi). Drive time uses distance-adjusted avg speed. Fuel at avg US prices, 25 mpg.
          </div>

        </div>
      )}
    </div>
  )
}
