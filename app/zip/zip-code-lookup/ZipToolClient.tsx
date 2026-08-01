'use client'
import { useRef,useState } from 'react'



const POPULAR_ZIP_LOOKUPS = [
  {
    zip: '10001',
    city: 'New York',
    state: 'NY',
    icon: '🗽',
  },
  {
    zip: '90210',
    city: 'Beverly Hills',
    state: 'CA',
    icon: '🌴',
  },
  {
    zip: '60601',
    city: 'Chicago',
    state: 'IL',
    icon: '🌆',
  },
  {
    zip: '33101',
    city: 'Miami',
    state: 'FL',
    icon: '🌴',
  },
  {
    zip: '94102',
    city: 'San Francisco',
    state: 'CA',
    icon: '🌉',
  },
  {
    zip: '75201',
    city: 'Dallas',
    state: 'TX',
    icon: '🤠',
  },
]


export default function ZipLookupClient() {
  const [zip, setZip] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)
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

setTimeout(() => {
  resultRef.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}, 100)
  }



  return (
    <div>


{/* ── Popular ZIP Code Lookups ───────────────────── */}
<div
  className="mb-4 rounded-2xl border border-gray-200 p-3"
  style={{
    background: 'rgba(248,250,252,0.75)'
  }}
>

  <div className="flex items-center justify-between mb-2">

    <div>
      <div className="text-xs font-bold text-gray-600">
        Popular ZIP Code Lookups
      </div>

      <div className="text-[10px] text-gray-400">
        Click a ZIP code for instant location details
      </div>
    </div>

    <span className="text-[10px] text-green-600 font-semibold">
      Quick Lookup
    </span>

  </div>

  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">

    {POPULAR_ZIP_LOOKUPS.map(item => (

      <button
        key={item.zip}
        type="button"
        onClick={() => lookup(item.zip)}
        className="
          group
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          py-2.5
          text-left
          transition-all
          hover:border-green-400
          hover:bg-green-50
        "
      >

        <div className="flex items-center gap-2">

          <span className="text-lg">
            {item.icon}
          </span>

          <div>

            <div
              className="
                font-black
                font-mono
                text-sm
                text-gray-800
                group-hover:text-green-700
              "
            >
              {item.zip}
            </div>

            <div className="text-[11px] text-gray-500">
              {item.city}, {item.state}
            </div>

          </div>

        </div>

      </button>

    ))}

  </div>

</div>


  

{/* ── ZIP Lookup Search ───────────────────────────── */}
<div className="mb-5">

  <div className="mb-2">
    <label
      htmlFor="zip-lookup"
      className="block text-sm font-bold text-gray-700"
    >
      Enter a US ZIP Code
    </label>

    <p className="text-xs text-gray-500 mt-1">
      Find city, state, county, timezone, population and location details.
    </p>
  </div>

  <div className="flex flex-col sm:flex-row gap-3">

    <div className="relative flex-1">

      <span
        className="absolute left-4 top-1/2 -translate-y-1/2 text-lg"
        aria-hidden="true"
      >
        📍
      </span>

      <input
        id="zip-lookup"
        value={zip}
        onChange={e => {
          setZip(e.target.value.replace(/\D/g, ''))
          if (error) setError('')
        }}
        onKeyDown={e => e.key === 'Enter' && lookup()}
        placeholder="e.g. 10001"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={5}
        aria-label="Enter a 5-digit US ZIP code"
        className="
          w-full
          rounded-xl
          border-2
          border-gray-200
          bg-white
          py-3.5
          pl-12
          pr-4
          text-lg
          font-mono
          font-bold
          text-gray-900
          outline-none
          transition-all
          focus:border-green-500
          focus:ring-4
          focus:ring-green-100
        "
      />

    </div>

    <button
      onClick={() => lookup()}
      disabled={loading || zip.length !== 5}
      className="
        sm:min-w-[170px]
        px-6
        py-3.5
        rounded-xl
        text-white
        font-bold
        transition-all
        hover:-translate-y-0.5
        disabled:opacity-50
        disabled:hover:translate-y-0
      "
      style={{
        background: 'linear-gradient(135deg,#22c55e,#16a34a)',
        boxShadow: '0 4px 16px rgba(34,197,94,0.25)'
      }}
    >
      {loading ? 'Looking up...' : '🔍 Lookup ZIP Code'}
    </button>

  </div>

  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">

    <span>✓ 5-digit US ZIP Codes</span>

    <span>✓ Instant results</span>

    <span>✓ Free lookup</span>

  </div>

</div>


{/* ── ZIP Lookup Data Trust Bar ───────────────────── */}
<div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">

  {[
    {
      icon: '🏙️',
      title: 'City & State',
      text: 'USPS location',
    },
    {
      icon: '🏛️',
      title: 'County',
      text: 'County details',
    },
    {
      icon: '🕐',
      title: 'Timezone',
      text: 'Local timezone',
    },
    {
      icon: '👥',
      title: 'Population',
      text: 'ZIP population',
    },
    {
      icon: '📍',
      title: 'Coordinates',
      text: 'Latitude & longitude',
    },
  ].map(item => (

    <div
      key={item.title}
      className="
        rounded-xl
        border
        border-gray-200
        bg-gray-50/70
        px-3
        py-3
        text-center
      "
    >

      <div className="text-xl mb-1">
        {item.icon}
      </div>

      <div className="text-xs font-bold text-gray-700">
        {item.title}
      </div>

      <div className="text-[10px] text-gray-400 mt-0.5">
        {item.text}
      </div>

    </div>

  ))}

</div>









      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}
      {result && (
        <div ref={resultRef}>
        {/* ── Premium ZIP Result Summary ─────────────────── */}
<div
  className="rounded-3xl border p-5 mb-4"
  style={{
    background: 'linear-gradient(135deg,#f0fdf4,#eff6ff)',
    borderColor: '#d1fae5',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
  }}
>

  {/* Main ZIP */}
  <div className="text-center">

    <div className="text-[10px] uppercase tracking-[3px] font-bold text-gray-400">
      ZIP CODE LOOKUP
    </div>

    <div className="text-4xl font-black font-mono text-green-600 mt-2">
      {result.zip}
    </div>

    <div className="text-xl font-bold text-gray-800 mt-1">
      {result.city}, {result.stateCode}
    </div>

    <div className="text-sm text-gray-500 mt-1">
      {result.county}
    </div>

  </div>


  {/* ── Core ZIP information ── */}
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-5">

    {/* City */}
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      <div className="text-[10px] uppercase text-gray-400">
        🏙️ City
      </div>

      <div className="font-bold text-gray-800 text-sm mt-1">
        {result.city}
      </div>

    </div>


    {/* County */}
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      <div className="text-[10px] uppercase text-gray-400">
        🏛️ County
      </div>

      <div className="font-bold text-gray-800 text-sm mt-1">
        {result.county}
      </div>

    </div>


    {/* Population */}
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      <div className="text-[10px] uppercase text-gray-400">
        👥 Population
      </div>

      <div className="font-bold text-gray-800 text-sm mt-1">
        {result.population > 0
          ? result.population.toLocaleString()
          : 'N/A'}
      </div>

    </div>


    {/* Timezone */}
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      <div className="text-[10px] uppercase text-gray-400">
        🕐 Timezone
      </div>

      <div className="font-bold text-gray-800 text-sm mt-1">
        {result.tzLabel || 'N/A'}
      </div>

    </div>


    {/* Area Code */}
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      <div className="text-[10px] uppercase text-gray-400">
        📞 Area Code
      </div>

      <div className="font-bold font-mono text-gray-800 text-sm mt-1">
        {result.areaCode
          ? `(${result.areaCode})`
          : 'N/A'}
      </div>

    </div>


    {/* ZIP Type */}
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      <div className="text-[10px] uppercase text-gray-400">
        📮 ZIP Type
      </div>

      <div className="font-bold text-gray-800 text-sm mt-1">
        {result.type || 'Standard'}
      </div>

    </div>

  </div>


  {/* ── Technical location details ── */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">

    {/* Coordinates */}
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      <div className="text-[10px] uppercase text-gray-400">
        📍 Coordinates
      </div>

      <div className="font-bold font-mono text-gray-800 text-sm mt-1">
        {result.lat}, {result.lng}
      </div>

    </div>


    {/* Elevation */}
    <div className="rounded-xl border border-gray-200 bg-white p-3">

      <div className="text-[10px] uppercase text-gray-400">
        ⛰️ Elevation
      </div>

      <div className="font-bold text-gray-800 text-sm mt-1">
        {result.elevation != null
          ? `${result.elevation.toLocaleString()} ft / ${Math.round(
              result.elevation * 0.3048
            ).toLocaleString()} m`
          : 'N/A'}
      </div>

    </div>

  </div>

</div>


{/* ── Dynamic ZIP Intelligence ───────────────────── */}
<div
  className="rounded-2xl border border-gray-200 bg-white p-5 mb-4"
>

  <div className="flex items-start gap-3">

    <div
      className="
        w-10 h-10
        rounded-xl
        bg-green-50
        flex items-center justify-center
        text-xl
        shrink-0
      "
    >
      📍
    </div>

    <div className="flex-1">

      <h3 className="text-lg font-bold text-gray-900">
        About ZIP Code {result.zip}
      </h3>

      <p className="text-sm text-gray-600 leading-6 mt-1">

        ZIP Code <strong>{result.zip}</strong> is located in{' '}

        <strong>
          {result.city}, {result.state}
        </strong>

        {result.county && (
          <>
            {' '}and is associated with{' '}
            <strong>{result.county}</strong>
          </>
        )}

        . The ZIP code uses the{' '}

        <strong>
          {result.tzLabel || 'local'}
        </strong>{' '}

        timezone

        {result.areaCode && (
          <>
            {' '}and area code{' '}
            <strong>{result.areaCode}</strong>
          </>
        )}

        .
      </p>


{result.lat != null && result.lng != null && (
  <p className="text-xs text-gray-500 leading-5 mt-2">

    Its approximate ZIP code center is located at{' '}

    <strong className="text-gray-600">
      {Number(result.lat).toFixed(4)}, {Number(result.lng).toFixed(4)}
    </strong>

    {result.elevation != null && (
      <>
        {' '}with an elevation of approximately{' '}
        <strong className="text-gray-600">
          {Math.round(result.elevation).toLocaleString()} ft
        </strong>
      </>
    )}

    .
  </p>
)}



      {/* Quick facts */}
      <div className="flex flex-wrap gap-2 mt-3">

        <span
          className="
            text-xs
            px-3 py-1.5
            rounded-full
            bg-blue-50
            text-blue-700
            font-semibold
          "
        >
          🏙️ {result.city}
        </span>


        {result.county && (
          <span
            className="
              text-xs
              px-3 py-1.5
              rounded-full
              bg-purple-50
              text-purple-700
              font-semibold
            "
          >
            🏛️ {result.county}
          </span>
        )}


        {result.population > 0 && (
          <span
            className="
              text-xs
              px-3 py-1.5
              rounded-full
              bg-green-50
              text-green-700
              font-semibold
            "
          >
            👥 {result.population.toLocaleString()} population
          </span>
        )}


        {result.areaCode && (
          <span
            className="
              text-xs
              px-3 py-1.5
              rounded-full
              bg-orange-50
              text-orange-700
              font-semibold
            "
          >
            📞 Area Code {result.areaCode}
          </span>
        )}

      </div>

    </div>

  </div>

</div>


{/* ── ZIP+4 Bridge ───────────────────────────────── */}
<div
  className="
    rounded-2xl
    border
    border-blue-200
    bg-blue-50/60
    p-4
    mb-4
  "
>

  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

    <div className="flex items-start gap-3">

      <div
        className="
          w-10 h-10
          rounded-xl
          bg-white
          border
          border-blue-100
          flex
          items-center
          justify-center
          text-xl
          shrink-0
        "
      >
        📮
      </div>

      <div>

        <div className="font-bold text-gray-900">
          Need the full ZIP+4 Code?
        </div>

        <p className="text-xs text-gray-600 mt-1 leading-5">
          A 5-digit ZIP like <strong>{result.zip}</strong> identifies a
          delivery area. ZIP+4 adds four digits to identify a more specific
          delivery segment, such as a street, building, or group of addresses.
        </p>

      </div>

    </div>


    <a
      href="/zip/zip-plus-4-lookup"
      className="
        shrink-0
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-600
        px-4
        py-2.5
        text-xs
        font-bold
        text-white
        hover:bg-blue-700
        transition-all
      "
    >
      Find ZIP+4
      <span>→</span>
    </a>

  </div>

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
          {/* ── Nearby ZIP Codes ───────────────────────────── */}
{result.nearby?.length > 0 && (

  <div className="rounded-2xl border border-gray-200 bg-white p-5 mb-4">

    {/* Header */}
    <div className="flex items-start justify-between gap-3 mb-4">

      <div>

        <h3 className="text-lg font-bold text-gray-900">
          Nearby ZIP Codes to {result.zip}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          Explore ZIP codes near {result.city}, {result.stateCode}.
          Click any ZIP code to view its full details.
        </p>

      </div>

      <div
        className="
          hidden sm:flex
          items-center
          justify-center
          w-9 h-9
          rounded-xl
          bg-green-50
          text-lg
          shrink-0
        "
      >
        📍
      </div>

    </div>


    {/* Nearby ZIP grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

      {result.nearby.map((n: any) => (

        <button
          key={n.zip}
          type="button"
          onClick={() => lookup(n.zip)}
          className="
            group
            rounded-xl
            border
            border-gray-200
            bg-gray-50/50
            p-3
            text-left
            transition-all
            hover:border-green-400
            hover:bg-green-50
            hover:-translate-y-0.5
          "
        >

          <div className="flex items-center justify-between gap-2">

            <div>

              {/* ZIP */}
              <div
                className="
                  font-black
                  font-mono
                  text-green-600
                  text-base
                "
              >
                {n.zip}
              </div>


              {/* City */}
              <div className="font-semibold text-gray-700 text-xs mt-0.5">
                {n.city}
                {n.stateCode ? `, ${n.stateCode}` : ''}
              </div>

            </div>


            {/* Arrow */}
            <div
              className="
                text-gray-300
                group-hover:text-green-600
                group-hover:translate-x-0.5
                transition-all
              "
            >
              →
            </div>

          </div>


          {/* Distance */}
          <div className="flex items-center gap-1 mt-2">

            <span className="text-[10px] text-gray-400">
              📏
            </span>

            <span className="text-[11px] text-gray-500">
              {Number(n.distance).toFixed(1)} miles away
            </span>

          </div>


          {/* CTA */}
          <div
            className="
              text-[10px]
              font-semibold
              text-green-600
              mt-2
              opacity-70
              group-hover:opacity-100
            "
          >
            View ZIP details →
          </div>

        </button>

      ))}
      

    </div>

  </div>

)}



{/* ── Dynamic ZIP FAQ ────────────────────────────── */}
<div className="rounded-2xl border border-gray-200 bg-white p-5 mb-4">

  <div className="mb-4">
    <h3 className="text-lg font-bold text-gray-900">
      Questions About ZIP Code {result.zip}
    </h3>

    <p className="text-xs text-gray-500 mt-1">
      Quick answers for {result.city}, {result.stateCode}.
    </p>
  </div>

  <div className="space-y-2">

    <details className="group rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden">
      <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
        <span>
          What city is ZIP Code {result.zip} in?
        </span>

        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ▾
        </span>
      </summary>

      <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-600 leading-6">
        ZIP Code <strong>{result.zip}</strong> is associated with{' '}
        <strong>
          {result.city}, {result.state}
        </strong>.
      </div>
    </details>


    <details className="group rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden">
      <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
        <span>
          What county is ZIP Code {result.zip} in?
        </span>

        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ▾
        </span>
      </summary>

      <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-600 leading-6">
        ZIP Code <strong>{result.zip}</strong> in{' '}
        <strong>{result.city}, {result.stateCode}</strong> is associated with{' '}
        <strong>
          {result.county || 'county information unavailable'}
        </strong>.
      </div>
    </details>


    <details className="group rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden">
      <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
        <span>
          What timezone is ZIP Code {result.zip} in?
        </span>

        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ▾
        </span>
      </summary>

      <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-600 leading-6">
        ZIP Code <strong>{result.zip}</strong> uses the{' '}
        <strong>{result.tzLabel || 'local timezone'}</strong>.
      </div>
    </details>


    <details className="group rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden">
      <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
        <span>
          What is the population of ZIP Code {result.zip}?
        </span>

        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ▾
        </span>
      </summary>

      <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-600 leading-6">

        {result.population > 0 ? (
          <>
            ZIP Code <strong>{result.zip}</strong> has an estimated
            population of{' '}
            <strong>
              {result.population.toLocaleString()} people
            </strong>.
          </>
        ) : (
          <>
            Population data is currently unavailable for ZIP Code{' '}
            <strong>{result.zip}</strong>.
          </>
        )}

      </div>
    </details>

  </div>

</div>



{/* ── Contextual Internal Links ─────────────────── */}
<div className="rounded-2xl border border-gray-200 bg-white p-5 mb-4">

  <div className="mb-4">

    <h3 className="text-lg font-bold text-gray-900">
      Explore ZIP Code {result.zip}
    </h3>

    <p className="text-xs text-gray-500 mt-1">
      Explore maps, population, coordinates and nearby ZIP information for{' '}
      {result.city}, {result.stateCode}.
    </p>

  </div>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

    {/* ZIP Map */}
    <a
      href={`/zip/zip-code-map?zip=${result.zip}`}
      className="
        group
        rounded-xl
        border border-gray-200
        p-3
        hover:border-green-400
        hover:bg-green-50
        transition-all
      "
    >
      <div className="flex items-start gap-3">

        <span className="text-xl">
          🗺️
        </span>

        <div>
          <div className="font-bold text-sm text-gray-800 group-hover:text-green-700">
            Map of ZIP {result.zip}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            View ZIP location and map.
          </div>
        </div>

      </div>
    </a>


    {/* Population */}
    <a
      href={`/zip/zip-code-population?zip=${result.zip}`}
      className="
        group
        rounded-xl
        border border-gray-200
        p-3
        hover:border-green-400
        hover:bg-green-50
        transition-all
      "
    >
      <div className="flex items-start gap-3">

        <span className="text-xl">
          👥
        </span>

        <div>
          <div className="font-bold text-sm text-gray-800 group-hover:text-green-700">
            Population of ZIP {result.zip}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            View population information.
          </div>
        </div>

      </div>
    </a>


    {/* Coordinates */}
    <a
      href={`/zip/zip-to-coordinates?zip=${result.zip}`}
      className="
        group
        rounded-xl
        border border-gray-200
        p-3
        hover:border-green-400
        hover:bg-green-50
        transition-all
      "
    >
      <div className="flex items-start gap-3">

        <span className="text-xl">
          🌐
        </span>

        <div>
          <div className="font-bold text-sm text-gray-800 group-hover:text-green-700">
            Coordinates for ZIP {result.zip}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            Find latitude and longitude.
          </div>
        </div>

      </div>
    </a>


    {/* Boundary */}
    <a
      href={`/zip/zip-boundary-info?zip=${result.zip}`}
      className="
        group
        rounded-xl
        border border-gray-200
        p-3
        hover:border-green-400
        hover:bg-green-50
        transition-all
      "
    >
      <div className="flex items-start gap-3">

        <span className="text-xl">
          🔲
        </span>

        <div>
          <div className="font-bold text-sm text-gray-800 group-hover:text-green-700">
            ZIP {result.zip} Boundary
          </div>

          <div className="text-xs text-gray-500 mt-1">
            Explore ZIP boundary details.
          </div>
        </div>

      </div>
    </a>


    {/* ZIP+4 */}
    <a
      href={`/zip/zip-plus-4-lookup?zip=${result.zip}`}
      className="
        group
        rounded-xl
        border border-gray-200
        p-3
        hover:border-green-400
        hover:bg-green-50
        transition-all
      "
    >
      <div className="flex items-start gap-3">

        <span className="text-xl">
          🔢
        </span>

        <div>
          <div className="font-bold text-sm text-gray-800 group-hover:text-green-700">
            ZIP+4 Lookup
          </div>

          <div className="text-xs text-gray-500 mt-1">
            Find ZIP+4 information.
          </div>
        </div>

      </div>
    </a>


    {/* Nearby */}
    <a
      href={`/zip/nearest-zip-code?zip=${result.zip}`}
      className="
        group
        rounded-xl
        border border-gray-200
        p-3
        hover:border-green-400
        hover:bg-green-50
        transition-all
      "
    >
      <div className="flex items-start gap-3">

        <span className="text-xl">
          📌
        </span>

        <div>
          <div className="font-bold text-sm text-gray-800 group-hover:text-green-700">
            ZIP Codes Near {result.zip}
          </div>

          <div className="text-xs text-gray-500 mt-1">
            Find nearby ZIP codes.
          </div>
        </div>

      </div>
    </a>

  </div>

</div>



        </div>
      )}
    </div>
  )
}
