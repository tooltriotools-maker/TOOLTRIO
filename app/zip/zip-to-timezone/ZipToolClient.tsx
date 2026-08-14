'use client'
import { useState, useEffect } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import { zipFetch } from '@/lib/data/zip-client'
import { normalizeZipCode, sanitizeZipInput } from '@/lib/data/zip-utils'

const TZ_LABELS: Record<string,string> = {
  'America/New_York':'Eastern (ET)','America/Chicago':'Central (CT)',
  'America/Denver':'Mountain (MT)','America/Los_Angeles':'Pacific (PT)',
  'America/Phoenix':'Mountain (No DST)','America/Anchorage':'Alaska (AKT)',
  'Pacific/Honolulu':'Hawaii (HT)','America/Indiana/Indianapolis':'Eastern (ET)',
}

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [now, setNow] = useState(new Date())

  useEffect(()=>{ const t=setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(t) },[])

  async function lookup(z?: string) {
    const rawVal=(z||zip).trim(); if(z) setZip(sanitizeZipInput(z))
    const val=normalizeZipCode(rawVal)
    if(!val){setError('Enter a valid 5-digit ZIP or 9-digit ZIP+4 code');setResult(null);return}
    setLoading(true);setError('')
    const res=await zipFetch(`/api/zip/lookup?zip=${val}`)
    const data=await res.json(); setLoading(false)
    if(!res.ok){setError(data.error);setResult(null);return}
    setResult(data)
  }

  function getLocalTime(tz: string) {
    try { return now.toLocaleTimeString('en-US',{timeZone:tz,hour12:true,hour:'2-digit',minute:'2-digit',second:'2-digit'}) }
    catch { return '--' }
  }

function getLocalDate(tz: string) {
  try {
    return now.toLocaleDateString('en-US', {
      timeZone: tz,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return '--'
  }
}

function getUtcOffset(tz: string) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'longOffset',
    }).formatToParts(now)

    const offset =
      parts.find(part => part.type === 'timeZoneName')?.value || ''

    return offset.replace('GMT', 'UTC')
  } catch {
    return '--'
  }
}

function getTimezoneShortName(tz: string) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'short',
    }).formatToParts(now)

    return (
      parts.find(part => part.type === 'timeZoneName')?.value || '--'
    )
  } catch {
    return '--'
  }
}

function getOffsetMinutes(tz: string, date: Date) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'longOffset',
    }).formatToParts(date)

    const value =
      parts.find(part => part.type === 'timeZoneName')?.value || ''

    // Examples:
    // GMT-07:00
    // GMT-08:00
    // GMT+10:00

    if (value === 'GMT') return 0

    const match = value.match(/GMT([+-])(\d{2}):?(\d{2})?/)

    if (!match) return null

    const sign = match[1] === '+' ? 1 : -1
    const hours = Number(match[2])
    const minutes = Number(match[3] || 0)

    return sign * (hours * 60 + minutes)
  } catch {
    return null
  }
}

function formatOffset(minutes: number | null) {
  if (minutes === null) return '--'

  if (minutes === 0) return 'UTC'

  const sign = minutes >= 0 ? '+' : '-'
  const absolute = Math.abs(minutes)

  const hours = Math.floor(absolute / 60)
  const mins = absolute % 60

  return `UTC${sign}${hours}${mins ? `:${String(mins).padStart(2, '0')}` : ''}`
}

function getDSTInfo(tz: string) {

  const year = now.getFullYear()

  const january = new Date(Date.UTC(year, 0, 15, 12))
  const july = new Date(Date.UTC(year, 6, 15, 12))

  const janOffset = getOffsetMinutes(tz, january)
  const julOffset = getOffsetMinutes(tz, july)
  const currentOffset = getOffsetMinutes(tz, now)

  if (
    janOffset === null ||
    julOffset === null ||
    currentOffset === null
  ) {
    return {
      observesDST: false,
      active: false,
      currentOffset: '--',
      standardOffset: '--',
    }
  }

  // The smaller UTC offset is normally standard time.
  // Example:
  // PST = -480
  // PDT = -420
  const standardOffset = Math.min(janOffset, julOffset)

  const observesDST = janOffset !== julOffset
  const active =
    observesDST &&
    currentOffset !== standardOffset

  return {
    observesDST,
    active,
    currentOffset: formatOffset(currentOffset),
    standardOffset: formatOffset(standardOffset),
  }
}






  function getTimeParts(tz: string, date = now) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'short',
    }).formatToParts(date)

    return {
      hour: Number(parts.find(p => p.type === 'hour')?.value || 0),
      minute: Number(parts.find(p => p.type === 'minute')?.value || 0),
      weekday: parts.find(p => p.type === 'weekday')?.value || '',
    }
  } catch {
    return {
      hour: 0,
      minute: 0,
      weekday: '',
    }
  }
}


function getBrowserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return ''
  }
}


function getTimeDifference(targetTz: string) {

  const browserTz = getBrowserTimezone()

  if (!browserTz) {
    return {
      browserTz: '',
      difference: 0,
      text: 'Unavailable',
    }
  }

  const browserOffset = getOffsetMinutes(browserTz, now)
  const targetOffset = getOffsetMinutes(targetTz, now)

  if (
    browserOffset === null ||
    targetOffset === null
  ) {
    return {
      browserTz,
      difference: 0,
      text: 'Unavailable',
    }
  }

  const difference =
    (targetOffset - browserOffset) / 60

  if (difference === 0) {
    return {
      browserTz,
      difference,
      text: 'Same time as you',
    }
  }

  const absolute = Math.abs(difference)

  return {
    browserTz,
    difference,
    text:
      difference > 0
        ? `${absolute} ${absolute === 1 ? 'hour' : 'hours'} ahead of you`
        : `${absolute} ${absolute === 1 ? 'hour' : 'hours'} behind you`,
  }
}


function getBusinessStatus(tz: string) {

  const { hour, weekday } = getTimeParts(tz)

  const weekend =
    weekday === 'Sat' ||
    weekday === 'Sun'

  if (weekend) {
    return {
      open: false,
      label: 'Weekend',
      detail: 'Typical offices may be closed',
    }
  }

  if (hour >= 9 && hour < 17) {
    return {
      open: true,
      label: 'Business Hours',
      detail: 'Typical 9 AM–5 PM working hours',
    }
  }

  if (hour >= 7 && hour < 9) {
    return {
      open: false,
      label: 'Early Morning',
      detail: 'Business hours usually begin around 9 AM',
    }
  }

  if (hour >= 17 && hour < 21) {
    return {
      open: false,
      label: 'After Hours',
      detail: 'Typical office hours have ended',
    }
  }

  return {
    open: false,
    label: 'Outside Business Hours',
    detail: 'Consider contacting during local daytime',
  }
}


// ── Derived timezone data ─────────────────────────

const dstInfo = result
  ? getDSTInfo(result.timezone)
  : null

const timeDifference = result
  ? getTimeDifference(result.timezone)
  : null

const businessStatus = result
  ? getBusinessStatus(result.timezone)
  : null

const browserTimezone = getBrowserTimezone()




  return (
    <div>
   <ZipQuickFill onSelect={z => lookup(z)} />

{/* ── Timezone Search ───────────────────────────── */}
<div className="mb-5">

  <div className="mb-2">
    <label
      htmlFor="timezone-zip-input"
      className="block text-sm font-bold text-gray-800"
    >
      Enter a US ZIP Code
    </label>

    <p className="text-xs text-gray-500 mt-1">
      Find the timezone and current local time for a 5-digit ZIP or ZIP+4 code.
    </p>
  </div>

  <div className="flex flex-col sm:flex-row gap-2">

    <div className="relative flex-1">

      <span
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
        "
      >
        📍
      </span>

      <input
        id="timezone-zip-input"
        value={zip}
        onChange={e => {
          setZip(sanitizeZipInput(e.target.value))
          setError('')
        }}
        onKeyDown={e => e.key === 'Enter' && lookup()}
        placeholder="e.g. 76033-4007"
        maxLength={9}
        inputMode="numeric"
        autoComplete="postal-code"
        aria-label="Enter 5-digit ZIP or 9-digit ZIP+4"
        className="
          w-full
          border-2
          border-gray-200
          rounded-xl
          pl-11
          pr-4
          py-3
          text-lg
          font-mono
          font-semibold
          text-gray-900
          bg-white
          focus:outline-none
          focus:border-green-500
          focus:ring-4
          focus:ring-green-100
          transition-all
        "
      />

    </div>

    <button
      onClick={() => lookup()}
      disabled={loading || !normalizeZipCode(zip)}
      className="
        sm:min-w-[180px]
        px-6
        py-3
        rounded-xl
        text-white
        font-bold
        disabled:opacity-50
        disabled:cursor-not-allowed
        hover:-translate-y-0.5
        transition-all
      "
      style={{
        background:'linear-gradient(135deg,#22c55e,#16a34a)',
        boxShadow:'0 4px 16px rgba(34,197,94,0.25)'
      }}
    >
      {loading ? 'Finding...' : '🕐 Find ZIP Timezone'}
    </button>

  </div>

  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-gray-400">
 <span>🇺🇸 US ZIP Codes</span>
<span>✓ Current Local Time</span>
<span>✓ UTC Offset</span>
<span>✓ DST Aware</span>
<span>✓ Free</span>
  </div>

</div>
      {error&&<div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4">{error}</div>}
     {result && (

  <div className="space-y-4">

    {/* ── Premium Timezone Result ─────────────────── */}
    <div
      className="rounded-3xl border p-5 sm:p-6"
      style={{
        background:
          'linear-gradient(135deg,rgba(240,253,244,0.95),rgba(239,246,255,0.95))',
        borderColor: 'rgba(187,247,208,0.7)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.07)',
      }}
    >

      {/* Status */}
      <div className="text-center">

        <div
          className="
            inline-flex
            items-center
            gap-1.5
            px-3
            py-1
            rounded-full
            bg-green-100
            text-green-700
            text-[11px]
            font-bold
            mb-3
          "
        >
          ✓ US ZIP TIMEZONE FOUND
        </div>


        {/* Main timezone */}
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
          {TZ_LABELS[result.timezone] || result.timezone}
        </h2>

        <div className="text-sm text-gray-500 mt-1 font-mono">
          {result.timezone}
        </div>


        {/* Current Time */}
        <div className="mt-5">

          <div className="text-xs uppercase tracking-[2px] text-gray-400 font-bold">
            Current Local Time
          </div>

          <div className="text-4xl sm:text-5xl font-black font-mono text-green-600 mt-2">
            {getLocalTime(result.timezone)}
          </div>

          <div className="text-sm text-gray-600 mt-2">
            {getLocalDate(result.timezone)}
          </div>

        </div>


        {/* Location */}
        <div className="mt-4 text-sm text-gray-600">

          📍{' '}

          <span className="font-bold text-gray-800">
            {result.city}, {result.stateCode}
          </span>

          <span className="text-gray-400">
            {' '}• ZIP {result.zip} • USA
          </span>

        </div>

      </div>


      {/* Main timezone metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">

        {/* IANA */}
        <div className="rounded-xl border border-gray-200 bg-white/80 p-3 text-center">

          <div className="text-xs text-gray-400">
            🌎 IANA Timezone
          </div>

          <div className="font-bold text-gray-900 text-sm mt-1 break-all">
            {result.timezone}
          </div>

        </div>


        {/* UTC */}
        <div className="rounded-xl border border-gray-200 bg-white/80 p-3 text-center">

          <div className="text-xs text-gray-400">
            🌐 UTC Offset
          </div>

          <div className="font-black text-blue-700 text-lg mt-1">
            {getUtcOffset(result.timezone)}
          </div>

        </div>


        {/* Current timezone abbreviation */}
        <div className="rounded-xl border border-gray-200 bg-white/80 p-3 text-center">

          <div className="text-xs text-gray-400">
            🕐 Current Zone
          </div>

          <div className="font-black text-purple-700 text-lg mt-1">
            {getTimezoneShortName(result.timezone)}
          </div>

        </div>

      </div>

    </div>


{/* ── DST Intelligence ─────────────────────────── */}
{dstInfo && (

  <div className="rounded-2xl border border-gray-200 bg-white p-4">

    <div className="flex items-center justify-between gap-3 mb-4">

      <div>

        <h3 className="text-sm font-bold text-gray-900">
          ☀️ Daylight Saving Time
        </h3>

        <p className="text-[11px] text-gray-500 mt-0.5">
          Current DST status for {result.city}, {result.stateCode}
        </p>

      </div>


      <div
        className={`
          px-3
          py-1
          rounded-full
          text-[11px]
          font-black

          ${
            !dstInfo.observesDST
              ? 'bg-gray-100 text-gray-600'
              : dstInfo.active
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
          }
        `}
      >

        {!dstInfo.observesDST
          ? 'NO DST'
          : dstInfo.active
            ? 'DST ACTIVE'
            : 'STANDARD TIME'
        }

      </div>

    </div>


    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

      {/* DST Observance */}
      <div className="rounded-xl bg-gray-50 p-3">

        <div className="text-[11px] text-gray-400">
          Observes DST
        </div>

        <div className="font-black text-gray-900 mt-1">
          {dstInfo.observesDST ? 'Yes' : 'No'}
        </div>

      </div>


      {/* Current zone */}
      <div className="rounded-xl bg-gray-50 p-3">

        <div className="text-[11px] text-gray-400">
          Current Zone
        </div>

        <div className="font-black text-gray-900 mt-1">
          {getTimezoneShortName(result.timezone)}
        </div>

      </div>


      {/* Current Offset */}
      <div className="rounded-xl bg-gray-50 p-3">

        <div className="text-[11px] text-gray-400">
          Current Offset
        </div>

        <div className="font-black text-blue-700 mt-1">
          {dstInfo.currentOffset}
        </div>

      </div>


      {/* Standard Offset */}
      <div className="rounded-xl bg-gray-50 p-3">

        <div className="text-[11px] text-gray-400">
          Standard Offset
        </div>

        <div className="font-black text-gray-900 mt-1">
          {dstInfo.standardOffset}
        </div>

      </div>

    </div>


    {/* Explanation */}
    <div
      className={`
        mt-3
        rounded-xl
        px-3
        py-2.5
        text-xs
        leading-5

        ${
          !dstInfo.observesDST
            ? 'bg-gray-50 text-gray-600'
            : dstInfo.active
              ? 'bg-green-50 text-green-700'
              : 'bg-blue-50 text-blue-700'
        }
      `}
    >

      {!dstInfo.observesDST ? (

        <>
          This timezone does not currently show a seasonal UTC-offset
          change in the selected year.
        </>

      ) : dstInfo.active ? (

        <>
          Daylight Saving Time is currently active. The local clock is
          using <strong>{getTimezoneShortName(result.timezone)}</strong>{' '}
          at <strong>{dstInfo.currentOffset}</strong>.
        </>

      ) : (

        <>
          Standard time is currently active at{' '}
          <strong>{dstInfo.currentOffset}</strong>.
          This timezone also observes Daylight Saving Time during part
          of the year.
        </>

      )}

    </div>

  </div>

)}


{/* ── Time Difference & Scheduling ─────────────── */}
{timeDifference && businessStatus && (

  <div className="rounded-2xl border border-gray-200 bg-white p-4">

    <div className="mb-4">

      <h3 className="text-sm font-bold text-gray-900">
        🗓️ Time Difference & Scheduling
      </h3>

      <p className="text-[11px] text-gray-500 mt-0.5">
        Compare your current timezone with {result.city}, {result.stateCode}.
      </p>

    </div>


    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

      {/* Your local time */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">

        <div className="text-[11px] text-gray-400 mb-1">
          👤 Your Local Time
        </div>

        <div className="font-black text-gray-900 text-lg">
          {browserTimezone
            ? getLocalTime(browserTimezone)
            : '--'
          }
        </div>

        <div
          className="
            text-[10px]
            text-gray-400
            mt-1
            truncate
          "
          title={browserTimezone}
        >
          {browserTimezone || 'Timezone unavailable'}
        </div>

      </div>


      {/* ZIP local time */}
      <div className="rounded-xl border border-green-200 bg-green-50/60 p-3">

        <div className="text-[11px] text-green-600 mb-1">
          📍 {result.city} Time
        </div>

        <div className="font-black text-green-700 text-lg">
          {getLocalTime(result.timezone)}
        </div>

        <div className="text-[10px] text-green-600 mt-1 truncate">
          {result.timezone}
        </div>

      </div>


      {/* Difference */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3">

        <div className="text-[11px] text-blue-500 mb-1">
          ↔ Time Difference
        </div>

        <div className="font-black text-blue-700 text-sm mt-1">
          {timeDifference.text}
        </div>

        <div className="text-[10px] text-blue-500 mt-1">
          Based on current UTC offsets
        </div>

      </div>

    </div>


    {/* Business status */}
    <div
      className={`
        mt-3
        rounded-xl
        border
        p-3

        ${
          businessStatus.open
            ? 'border-green-200 bg-green-50'
            : 'border-amber-200 bg-amber-50'
        }
      `}
    >

      <div className="flex items-center justify-between gap-3">

        <div>

          <div
            className={`
              text-xs
              font-bold

              ${
                businessStatus.open
                  ? 'text-green-700'
                  : 'text-amber-700'
              }
            `}
          >

            {businessStatus.open ? '🟢' : '🟡'}{' '}
            {businessStatus.label}

          </div>

          <div
            className={`
              text-[11px]
              mt-1

              ${
                businessStatus.open
                  ? 'text-green-600'
                  : 'text-amber-600'
              }
            `}
          >
            {businessStatus.detail}
          </div>

        </div>


        <div className="text-right shrink-0">

          <div className="text-[10px] text-gray-400">
            Local time
          </div>

          <div className="font-black text-gray-800">
            {getLocalTime(result.timezone)}
          </div>

        </div>

      </div>

    </div>

  </div>

)}


    {/* ── Location Details ────────────────────────── */}
    <div className="rounded-2xl border border-gray-200 bg-white p-4">

      <div className="text-sm font-bold text-gray-800 mb-3">
        📍 ZIP Code Details
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

        <div className="rounded-xl bg-gray-50 p-3">

          <div className="text-[11px] text-gray-400">
            ZIP Code
          </div>

          <div className="font-black font-mono text-gray-900 mt-1">
            {result.zip}
          </div>

        </div>


        <div className="rounded-xl bg-gray-50 p-3">

          <div className="text-[11px] text-gray-400">
            City
          </div>

          <div className="font-bold text-gray-900 mt-1">
            {result.city}
          </div>

        </div>


        <div className="rounded-xl bg-gray-50 p-3">

          <div className="text-[11px] text-gray-400">
            State
          </div>

          <div className="font-bold text-gray-900 mt-1">
            {result.stateCode}
          </div>

        </div>


        <div className="rounded-xl bg-gray-50 p-3">

          <div className="text-[11px] text-gray-400">
            County
          </div>

          <div className="font-bold text-gray-900 mt-1 truncate">
            {result.county || 'N/A'}
          </div>

        </div>

      </div>

    </div>


{/* ── Dynamic ZIP Timezone FAQ ────────────────── */}
<div className="rounded-2xl border border-gray-200 bg-white p-5">

  <div className="mb-4">
    <h3 className="text-lg font-black text-gray-900">
      Frequently Asked About ZIP {result.zip}
    </h3>

    <p className="text-xs text-gray-500 mt-1">
      Timezone and local time information for {result.city}, {result.stateCode}.
    </p>
  </div>


  <div className="space-y-2">

    {/* FAQ 1 */}
    <details className="group rounded-xl border border-gray-200 overflow-hidden">

      <summary
        className="
          cursor-pointer
          list-none
          flex
          items-center
          justify-between
          gap-3
          p-4
          font-semibold
          text-sm
          text-gray-800
          hover:bg-gray-50
        "
      >
        <span>
          What timezone is ZIP code {result.zip}?
        </span>

        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ↓
        </span>
      </summary>

      <div className="px-4 pb-4 text-sm text-gray-600 leading-6">
        ZIP code <strong>{result.zip}</strong> in{' '}
        <strong>{result.city}, {result.stateCode}</strong> uses{' '}
        <strong>
          {TZ_LABELS[result.timezone] || result.timezone}
        </strong>.
        Its IANA timezone identifier is{' '}
        <strong>{result.timezone}</strong>.
      </div>

    </details>


    {/* FAQ 2 */}
    <details className="group rounded-xl border border-gray-200 overflow-hidden">

      <summary
        className="
          cursor-pointer
          list-none
          flex
          items-center
          justify-between
          gap-3
          p-4
          font-semibold
          text-sm
          text-gray-800
          hover:bg-gray-50
        "
      >
        <span>
          What time is it in ZIP code {result.zip}?
        </span>

        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ↓
        </span>
      </summary>

      <div className="px-4 pb-4 text-sm text-gray-600 leading-6">
        The current local time in{' '}
        <strong>{result.city}, {result.stateCode}</strong> is{' '}
        <strong>{getLocalTime(result.timezone)}</strong>.
        The current date is{' '}
        <strong>{getLocalDate(result.timezone)}</strong>.
      </div>

    </details>


    {/* FAQ 3 */}
    <details className="group rounded-xl border border-gray-200 overflow-hidden">

      <summary
        className="
          cursor-pointer
          list-none
          flex
          items-center
          justify-between
          gap-3
          p-4
          font-semibold
          text-sm
          text-gray-800
          hover:bg-gray-50
        "
      >
        <span>
          Does ZIP code {result.zip} observe Daylight Saving Time?
        </span>

        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ↓
        </span>
      </summary>

      <div className="px-4 pb-4 text-sm text-gray-600 leading-6">

        {dstInfo?.observesDST ? (
          <>
            Yes. ZIP code <strong>{result.zip}</strong> is in a timezone
            that observes Daylight Saving Time.

            {' '}

            {dstInfo.active
              ? `Daylight Saving Time is currently active.`
              : `Standard time is currently active.`
            }
          </>
        ) : (
          <>
            ZIP code <strong>{result.zip}</strong> is in a timezone
            that does not currently show a seasonal UTC-offset change
            during this year.
          </>
        )}

      </div>

    </details>


    {/* FAQ 4 */}
    <details className="group rounded-xl border border-gray-200 overflow-hidden">

      <summary
        className="
          cursor-pointer
          list-none
          flex
          items-center
          justify-between
          gap-3
          p-4
          font-semibold
          text-sm
          text-gray-800
          hover:bg-gray-50
        "
      >
        <span>
          What is the UTC offset for ZIP code {result.zip}?
        </span>

        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ↓
        </span>
      </summary>

      <div className="px-4 pb-4 text-sm text-gray-600 leading-6">
        The current UTC offset for ZIP code{' '}
        <strong>{result.zip}</strong> is{' '}
        <strong>{getUtcOffset(result.timezone)}</strong>.
        The current timezone abbreviation is{' '}
        <strong>{getTimezoneShortName(result.timezone)}</strong>.
      </div>

    </details>

  </div>

</div>





  </div>

)}
    </div>
  )
}
