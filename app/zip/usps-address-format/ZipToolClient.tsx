'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'
import { zipFetch } from '@/lib/data/zip-client'

const ADDRESS_TYPES = [
  { key: 'street', label: '🏠 Street Address' },
  { key: 'pobox', label: '📬 PO Box' },
  { key: 'rural', label: '🌾 Rural Route' },
  { key: 'military', label: '🎖️ Military (APO/FPO)' },
]

function formatAddress(type: string, fields: any, result: any): string[] {
  const city = result.city.toUpperCase()
  const state = result.stateCode
  const zip = result.zip
  switch (type) {
    case 'pobox':
      return [
        fields.name?.toUpperCase() || 'RECIPIENT NAME',
        `PO BOX ${fields.boxNum || '1234'}`,
        `${city} ${state} ${zip}`,
      ]
    case 'rural':
      return [
        fields.name?.toUpperCase() || 'RECIPIENT NAME',
        `RR ${fields.route || '1'} BOX ${fields.box || '100'}`,
        `${city} ${state} ${zip}`,
      ]
 case 'military':
  return [
    fields.name?.toUpperCase() || 'SGT JOHN DOE',
    fields.unit
      ? `UNIT ${fields.unit} BOX ${fields.box || '1234'}`
      : 'UNIT 1234 BOX 5678',
    `${city} ${state} ${zip}`,
  ]
    default:
      return [
        fields.name?.toUpperCase() || 'RECIPIENT NAME',
        fields.company ? fields.company.toUpperCase() : '',
        `${(fields.street || '123 MAIN ST').toUpperCase()}${fields.apt ? ` APT ${fields.apt.toUpperCase()}` : ''}`,
        `${city} ${state} ${zip}`,
      ].filter(Boolean)
  }
}

function shareResult(lines: string[]) {
  const text = `📬 USPS Formatted Address\n\n${lines.join('\n')}\n\nFormat yours: tooltrio.com/zip/usps-address-format`
  if (navigator.share) navigator.share({ title: 'USPS Address', text })
  else navigator.clipboard.writeText(lines.join('\n')).then(() => alert('Address copied!'))
}

function downloadResult(lines: string[], zip: string) {
  const text = `USPS Formatted Address\n\n${lines.join('\n')}\n\nFormatted per USPS Publication 28 (Postal Addressing Standards)\nGenerated: tooltrio.com/zip/usps-address-format`
  const blob = new Blob([text], { type: 'text/plain' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `usps-address-${zip}.txt`; a.click()
}

export default function ZipToolClient() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addrType, setAddrType] = useState('street')
  const [fields, setFields] = useState<Record<string,string>>({ name: '', company: '', street: '', apt: '', boxNum: '', route: '', box: '', unit: '' })
  const [copied, setCopied] = useState(false)

  const setField = (k: string, v: string) => setFields(f => ({ ...f, [k]: v }))

async function lookup(z?: string) {
  const val = (z || zip).trim()

  if (z) {
    setZip(z)
  }

  // Clear previous result before a new lookup
  setResult(null)

  // Validate ZIP format
  if (!/^\d{5}$/.test(val)) {
    setError('Please enter a valid 5-digit ZIP Code.')
    return
  }

  setLoading(true)
  setError('')

  try {
    const res = await zipFetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json()

    if (!res.ok) {
      setError(
        data?.error || 'ZIP Code could not be verified. Please try another ZIP Code.'
      )
      return
    }

    if (!data?.zip) {
      setError('ZIP Code was not found. Please enter a valid US ZIP Code.')
      return
    }

    setResult(data)

  } catch (err) {
    setError('Unable to verify the ZIP Code right now. Please try again.')
    setResult(null)

  } finally {
    setLoading(false)
  }
}

  const formatted = result ? formatAddress(addrType, fields, result) : []

  function copyAddress() {
    navigator.clipboard.writeText(formatted.join('\n'))
    setCopied(true); setTimeout(() => setCopied(false), 1500)
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
        {loading ? 'Loading...' : '🔍 Verify ZIP'}
      </button>
    </div>
  </div>
  {/* ── TRUST INDICATORS ─────────────────────────────────────── */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5">
  {[
    { icon: "📮", text: "USPS Compatible" },
    { icon: "✅", text: "ZIP Verified" },
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

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {result && (
        <div>
 {/* ── PREMIUM ZIP VERIFICATION SUMMARY ───────────────────── */}
<div
  className="rounded-3xl border p-6 mb-5"
  style={{
    background: "linear-gradient(135deg,#f0fdf4,#eff6ff)",
    borderColor: "#d1fae5",
    boxShadow: "0 10px 30px rgba(0,0,0,.06)",
  }}
>
  <div className="text-center">

    <div className="text-xs uppercase tracking-[3px] text-gray-500 font-bold">
      ZIP Code Report
    </div>

    <h2 className="text-4xl font-black mt-3 text-gray-900 leading-tight">
      {result.city}
      <span className="text-green-600">
        {" "}({result.zip})
      </span>
    </h2>

    <p className="text-gray-500 mt-2">
      {result.city}, {result.state}
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-3 mt-6">

    <div className="rounded-2xl border bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
        ZIP CODE
      </div>

      <div className="font-mono font-black text-2xl text-gray-900 mt-1">
        {result.zip}
      </div>

      <div className="text-sm text-green-600 font-semibold mt-1">
        ✅ Verified
      </div>
    </div>

    <div className="rounded-2xl border bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
        CITY / STATE
      </div>

      <div className="font-bold text-lg text-gray-900 mt-1">
        {result.city}
      </div>

      <div className="text-sm text-gray-500 mt-1">
        {result.state}
      </div>
    </div>

    <div className="rounded-2xl border bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
        COUNTY
      </div>

      <div className="font-bold text-lg text-gray-900 mt-1">
        {result.county || 'N/A'}
      </div>

      <div className="text-sm text-gray-500 mt-1">
        US ZIP Location
      </div>
    </div>

  </div>
</div>

     {/* ── ADDRESS TYPE SELECTOR ───────────────────────────────── */}
<div className="mb-5">

  <div className="flex items-center justify-between mb-2">
    <div>
      <div className="text-sm font-bold text-gray-800">
        Address Type
      </div>

      <div className="text-xs text-gray-500 mt-0.5">
        Choose the type of USPS address you want to format
      </div>
    </div>

    <div className="text-xs font-semibold text-green-600">
      {ADDRESS_TYPES.find(t => t.key === addrType)?.label}
    </div>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

    {ADDRESS_TYPES.map((t) => {

      const selected = addrType === t.key

      return (
        <button
          key={t.key}
          onClick={() => setAddrType(t.key)}
          className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
            selected
              ? 'border-green-500 bg-green-50 shadow-sm'
              : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/40'
          }`}
        >

          {/* Selected indicator */}
          {selected && (
            <span className="absolute top-2 right-2 text-green-600 text-sm">
              ✓
            </span>
          )}

          <div className="text-2xl mb-2">
            {t.label.split(' ')[0]}
          </div>

          <div
            className={`text-sm font-bold ${
              selected ? 'text-green-700' : 'text-gray-700'
            }`}
          >
            {t.label.substring(t.label.indexOf(' ') + 1)}
          </div>

          <div className="text-[11px] text-gray-400 mt-1">
            {t.key === 'street' && 'Standard street address'}
            {t.key === 'pobox' && 'Post Office Box'}
            {t.key === 'rural' && 'Rural Route address'}
            {t.key === 'military' && 'APO / FPO address'}
          </div>

        </button>
      )
    })}

  </div>
</div>

       {/* ── ADDRESS DETAILS ─────────────────────────────────────── */}
<div className="rounded-2xl border border-gray-200 bg-white p-5 mb-5 shadow-sm">

  <div className="flex items-center gap-2 mb-4">
    <span className="text-xl">📝</span>

    <div>
      <h3 className="text-sm font-bold text-gray-900">
        Address Details
      </h3>

      <p className="text-xs text-gray-500 mt-0.5">
        Enter the information you want to include in the formatted address
      </p>
    </div>
  </div>

  {/* Recipient */}
  <div className="mb-3">
    <label className="text-xs font-semibold text-gray-600 block mb-1">
      Recipient Name
    </label>

    <input
      value={fields.name}
      onChange={e => setField('name', e.target.value)}
      placeholder="e.g. JOHN SMITH"
      className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
      style={{ borderColor: '#e2e8f0' }}
    />
  </div>

  {/* Street Address */}
  {addrType === 'street' && (
    <>
      <div className="mb-3">
        <label className="text-xs font-semibold text-gray-600 block mb-1">
          Company Name
          <span className="text-gray-400 font-normal"> (optional)</span>
        </label>

        <input
          value={fields.company}
          onChange={e => setField('company', e.target.value)}
          placeholder="e.g. ACME CORPORATION"
          className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
          style={{ borderColor: '#e2e8f0' }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-3">

        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            Street Address
          </label>

          <input
            value={fields.street}
            onChange={e => setField('street', e.target.value)}
            placeholder="e.g. 123 MAIN ST"
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
            style={{ borderColor: '#e2e8f0' }}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            Apt / Suite
          </label>

          <input
            value={fields.apt}
            onChange={e => setField('apt', e.target.value)}
            placeholder="e.g. 4B"
            maxLength={10}
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
            style={{ borderColor: '#e2e8f0' }}
          />
        </div>

      </div>
    </>
  )}

  {/* PO Box */}
  {addrType === 'pobox' && (
    <div>
      <label className="text-xs font-semibold text-gray-600 block mb-1">
        PO Box Number
      </label>

      <input
        value={fields.boxNum}
        onChange={e => setField('boxNum', e.target.value)}
        placeholder="e.g. 1234"
        className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
        style={{ borderColor: '#e2e8f0' }}
      />
    </div>
  )}

  {/* Rural Route */}
  {addrType === 'rural' && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">
          Route Number
        </label>

        <input
          value={fields.route}
          onChange={e => setField('route', e.target.value)}
          placeholder="e.g. 1"
          className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
          style={{ borderColor: '#e2e8f0' }}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">
          Box Number
        </label>

        <input
          value={fields.box}
          onChange={e => setField('box', e.target.value)}
          placeholder="e.g. 100"
          className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
          style={{ borderColor: '#e2e8f0' }}
        />
      </div>

    </div>
  )}

  {/* Military */}
  {addrType === 'military' && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">
          Unit Number
        </label>

        <input
          value={fields.unit}
          onChange={e => setField('unit', e.target.value)}
          placeholder="e.g. 1234"
          className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
          style={{ borderColor: '#e2e8f0' }}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">
          Box Number
        </label>

        <input
          value={fields.box}
          onChange={e => setField('box', e.target.value)}
          placeholder="e.g. 5678"
          className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all"
          style={{ borderColor: '#e2e8f0' }}
        />
      </div>

    </div>
  )}

</div>

       {/* ── PREMIUM USPS FORMATTED ADDRESS ─────────────────────── */}
<div
  className="rounded-3xl border p-6 mb-5"
  style={{
    background: "linear-gradient(135deg,#f0fdf4,#eff6ff)",
    borderColor: "#d1fae5",
    boxShadow: "0 10px 30px rgba(0,0,0,.07)",
  }}
>
  {/* Header */}
  <div className="flex items-center justify-between gap-3 mb-5">

    <div>
      <div className="text-xs uppercase tracking-[3px] text-gray-500 font-bold">
        USPS Address Report
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
        Formatted Address
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Ready to copy, share, or download
      </p>
    </div>

    <div className="shrink-0 rounded-2xl bg-green-100 border border-green-200 px-3 py-2 text-center">
      <div className="text-lg">📮</div>
      <div className="text-[10px] font-bold text-green-700 uppercase">
        USPS
      </div>
    </div>

  </div>

  {/* Address */}
  <div className="rounded-2xl border bg-white p-5 sm:p-6">

    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
        Mailing Address
      </span>

      <span className="text-xs font-semibold text-green-600">
        ✓ Formatted
      </span>
    </div>

    <div className="font-mono text-sm sm:text-base space-y-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
      {formatted.map((line, i) => (
        <div
          key={i}
          className="font-bold text-gray-800 leading-relaxed"
        >
          {line || '\u00A0'}
        </div>
      ))}
    </div>

  </div>

  {/* Format information */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">

    <div className="rounded-xl bg-white border p-3">
      <div className="text-xs text-gray-400 uppercase font-bold">
        ZIP
      </div>
      <div className="font-mono font-black text-gray-800 mt-1">
        {result.zip}
      </div>
    </div>

    <div className="rounded-xl bg-white border p-3">
      <div className="text-xs text-gray-400 uppercase font-bold">
        State
      </div>
      <div className="font-black text-gray-800 mt-1">
        {result.stateCode}
      </div>
    </div>

    <div className="rounded-xl bg-white border p-3">
      <div className="text-xs text-gray-400 uppercase font-bold">
        Type
      </div>
      <div className="font-black text-gray-800 mt-1">
        {addrType === 'street' && 'Street'}
        {addrType === 'pobox' && 'PO Box'}
        {addrType === 'rural' && 'Rural'}
        {addrType === 'military' && 'Military'}
      </div>
    </div>

    <div className="rounded-xl bg-white border p-3">
      <div className="text-xs text-gray-400 uppercase font-bold">
        Status
      </div>
      <div className="font-black text-green-600 mt-1">
        ✓ Verified
      </div>
    </div>

  </div>

  <p className="text-xs text-gray-400 mt-4">
    Per USPS Publication 28 — formatted using the selected address type
    and verified ZIP location.
  </p>

</div>

       {/* ── RESULT ACTIONS ──────────────────────────────────────── */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">

  <button
    onClick={copyAddress}
    className="py-3 px-4 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 bg-white hover:bg-green-50 hover:border-green-400 transition-all"
  >
    {copied ? '✅ Copied!' : '📋 Copy Address'}
  </button>

  <button
    onClick={() => shareResult(formatted)}
    className="py-3 px-4 text-sm font-bold rounded-xl border-2 border-blue-300 text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-400 transition-all"
  >
    📤 Share Address
  </button>

  <button
    onClick={() => downloadResult(formatted, result.zip)}
    className="py-3 px-4 text-sm font-bold rounded-xl border-2 border-purple-300 text-purple-700 bg-white hover:bg-purple-50 hover:border-purple-400 transition-all"
  >
    ⬇️ Download TXT
  </button>

</div>

       {/* ── USPS PRO TIP ───────────────────────────────────────── */}
<div
  className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3 items-start"
>
  <div className="text-xl shrink-0">
    💡
  </div>

  <div>
    <div className="font-bold text-amber-800 text-sm mb-1">
      USPS Formatting Tip
    </div>

    <p className="text-xs text-amber-700 leading-relaxed">
      Use ALL CAPS for maximum machine readability. Keep the
      two-letter state abbreviation and ZIP Code on the final
      address line. Avoid unnecessary punctuation.
    </p>
  </div>
</div>
        </div>
      )}
    </div>
  )
}
