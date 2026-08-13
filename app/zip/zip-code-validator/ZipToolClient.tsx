'use client'
import { useState } from 'react'
import { zipFetch } from '@/lib/data/zip-client'

export default function ZipToolClient() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function validate() {
    const zips = input.split(/[\s,\n]+/).map(z => z.trim()).filter(z => z.length > 0)
    if (!zips.length) return
    setLoading(true)
    const rows = await Promise.all(zips.map(async z => {
      if (!/^\d{5}$/.test(z)) return { zip: z, valid: false, reason: 'Not 5 digits' }
      const res = await zipFetch(`/api/zip/lookup?zip=${z}`)
      const data = await res.json()
      if (!res.ok) return { zip: z, valid: false, reason: 'Not found in USPS database' }
      return { zip: z, valid: true, city: data.city, state: data.stateCode, county: data.county, population: data.population, type: data.type, areaCode: data.areaCode }
    }))
    setResults(rows)
    setLoading(false)
  }

  const validCount = results.filter(r => r.valid).length

  return (
    <div>
{/* ── ZIP VALIDATION INPUT ───────────────────────────────── */}
<div className="rounded-2xl border border-gray-200 bg-white p-5 mb-5 shadow-sm">

  <div className="flex items-center gap-2 mb-4">

    <span className="text-xl">
      ✅
    </span>

    <div>
      <h3 className="text-sm font-bold text-gray-900">
        ZIP Code Validation
      </h3>

      <p className="text-xs text-gray-500 mt-0.5">
        Enter one or more US ZIP codes to check their validity.
      </p>
    </div>

  </div>

  <label className="text-sm font-semibold text-gray-600 block mb-1">
    ZIP Codes
  </label>

  <textarea
    value={input}
    onChange={e => setInput(e.target.value)}
    placeholder={`Enter ZIP codes separated by commas, spaces, or new lines

Example:
10001, 90210, 60601
99999
00000`}
    rows={6}
    className="w-full border-2 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-green-500 transition-all resize-none"
    style={{
      borderColor: '#e2e8f0',
      background: 'rgba(255,255,255,0.9)',
    }}
  />

  <div className="flex items-center justify-between gap-3 mt-3">

    <div className="text-xs text-gray-400">
      💡 You can validate multiple ZIP codes at once.
    </div>

    <button
      onClick={validate}
      disabled={loading || !input.trim()}
      className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60 transition-all shrink-0"
      style={{
        background: 'linear-gradient(135deg,#22c55e,#16a34a)',
        boxShadow: '0 4px 16px rgba(34,197,94,0.3)',
      }}
    >
      {loading ? 'Validating...' : '✅ Validate ZIP Codes'}
    </button>

  </div>

</div>
      <button onClick={validate} disabled={loading || !input.trim()} className="w-full py-3 text-white font-bold rounded-xl mb-6 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
        {loading ? 'Validating…' : '✅ Validate ZIP Codes'}
      </button>

      {/* ── TRUST INDICATORS ─────────────────────────────────────── */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5">
  {[
    { icon: "🔍", text: "Format Checked" },
    { icon: "✅", text: "Database Verified" },
    { icon: "📮", text: "US ZIP Codes" },
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

      {results.length > 0 && (
        <div>
      {/* ── VALIDATION SUMMARY ─────────────────────────────────── */}
<div
  className="rounded-3xl border p-6 mb-5"
  style={{
    background: "linear-gradient(135deg,#f0fdf4,#eff6ff)",
    borderColor: "#d1fae5",
    boxShadow: "0 10px 30px rgba(0,0,0,.06)",
  }}
>

  <div className="text-center mb-5">

    <div className="text-xs uppercase tracking-[3px] text-gray-500 font-bold">
      Validation Report
    </div>

    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
      ZIP Code Results
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Format and database validation completed
    </p>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

    {/* Valid */}
    <div className="rounded-2xl border border-green-200 bg-white p-5">

      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Valid
        </div>

        <span className="text-xl">
          ✅
        </span>
      </div>

      <div className="text-4xl font-black text-green-600 mt-2">
        {validCount}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        ZIP codes verified
      </div>

    </div>

    {/* Invalid */}
    <div className="rounded-2xl border border-red-200 bg-white p-5">

      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Invalid
        </div>

        <span className="text-xl">
          ❌
        </span>
      </div>

      <div className="text-4xl font-black text-red-500 mt-2">
        {results.length - validCount}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        ZIP codes need attention
      </div>

    </div>

    {/* Total */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5">

      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
          Total
        </div>

        <span className="text-xl">
          📊
        </span>
      </div>

      <div className="text-4xl font-black text-gray-800 mt-2">
        {results.length}
      </div>

      <div className="text-xs text-gray-400 mt-1">
        ZIP codes checked
      </div>

    </div>

  </div>

</div>
        {/* ── ZIP VALIDATION RESULTS ──────────────────────────────── */}
<div className="space-y-3">

  {results.map((r, i) => (

    <div
      key={i}
      className={`rounded-2xl border p-5 transition-all ${
        r.valid
          ? 'border-green-200 bg-green-50/40'
          : 'border-red-200 bg-red-50/40'
      }`}
    >

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">

        <div className="flex items-center gap-3">

          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              r.valid
                ? 'bg-green-100'
                : 'bg-red-100'
            }`}
          >
            {r.valid ? '✓' : '✕'}
          </div>

          <div>

            <div className="flex items-center gap-2 flex-wrap">

              <span className="font-mono font-black text-xl text-gray-900">
                {r.zip}
              </span>

              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  r.valid
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {r.valid ? 'Valid ZIP' : 'Invalid ZIP'}
              </span>

            </div>

            {r.valid && (
              <div className="text-sm text-gray-500 mt-1">
                {r.city}, {r.state}
              </div>
            )}

          </div>

        </div>

        {r.valid && (
          <div className="text-xs font-semibold text-green-600">
            ✓ Verified
          </div>
        )}

      </div>

      {/* Valid ZIP details */}
      {r.valid && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">

          <div className="rounded-xl border bg-white p-3">
            <div className="text-[11px] uppercase tracking-wide text-gray-400 font-bold">
              County
            </div>

            <div className="text-sm font-bold text-gray-800 mt-1">
              {r.county || 'N/A'}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-3">
            <div className="text-[11px] uppercase tracking-wide text-gray-400 font-bold">
              ZIP Type
            </div>

            <div className="text-sm font-bold text-gray-800 mt-1">
              {r.type || 'N/A'}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-3">
            <div className="text-[11px] uppercase tracking-wide text-gray-400 font-bold">
              Area Code
            </div>

            <div className="text-sm font-bold text-gray-800 mt-1">
              {r.areaCode ? `(${r.areaCode})` : 'N/A'}
            </div>
          </div>

        </div>
      )}

      {/* Population */}
      {r.valid && (
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span>👥</span>
          <span className="font-semibold text-gray-700">
            Population:
          </span>

          <span>
            {r.population > 0
              ? r.population.toLocaleString()
              : 'N/A'}
          </span>
        </div>
      )}

      {/* Invalid reason */}
      {!r.valid && (
        <div className="mt-4 rounded-xl border border-red-100 bg-white/70 p-3">

          <div className="text-xs uppercase tracking-wide text-red-400 font-bold">
            Validation Issue
          </div>

          <div className="text-sm font-semibold text-red-600 mt-1">
            {r.reason}
          </div>

          <div className="text-xs text-gray-400 mt-1">
            Check the ZIP code and try again.
          </div>

        </div>
      )}

    </div>

  ))}

</div>
{/* ── VALIDATION PRO TIP ──────────────────────────────────── */}
<div
  className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3 items-start"
>
  <div className="text-xl shrink-0">
    💡
  </div>

  <div>
    <div className="font-bold text-amber-800 text-sm mb-1">
      ZIP Validation Tip
    </div>

    <p className="text-xs text-amber-700 leading-relaxed">
      A ZIP code can have the correct 5-digit format but still be
      inactive or unassigned. Always verify the ZIP against a current
      ZIP database before using it for mailing, shipping, or customer
      records.
    </p>
  </div>
</div>


        </div>
      )}
    </div>
  )
}
