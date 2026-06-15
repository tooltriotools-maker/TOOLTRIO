'use client'
import { useState } from 'react'
import { ZipQuickFill } from '@/components/ui/ZipQuickFill'

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
        fields.unit ? `UNIT ${fields.unit} BOX ${fields.box || '1234'}` : 'UNIT 1234 BOX 5678',
        `APO AE 09012`,
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
    const val = (z || zip).trim(); if (z) setZip(z)
    if (!/^\d{5}$/.test(val)) { setError('Enter a valid 5-digit ZIP'); setResult(null); return }
    setLoading(true); setError('')
    const res = await fetch(`/api/zip/lookup?zip=${val}`)
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error); setResult(null); return }
    setResult(data)
  }

  const formatted = result ? formatAddress(addrType, fields, result) : []

  function copyAddress() {
    navigator.clipboard.writeText(formatted.join('\n'))
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <ZipQuickFill onSelect={z => lookup(z)} />
      <div className="flex gap-2 mb-4">
        <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          placeholder="Enter ZIP code (e.g. 10001)" maxLength={5}
          className="flex-1 border-2 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
        <button onClick={() => lookup()} disabled={loading} className="px-6 py-3 text-white font-bold rounded-xl disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          {loading ? '…' : '🔍 Load'}
        </button>
      </div>

      {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 mb-4 text-sm">{error}</div>}

      {result && (
        <div>
          <div className="rounded-xl border p-3 mb-4 text-sm" style={{ background: 'rgba(240,253,244,0.7)', borderColor: 'rgba(187,247,208,0.6)' }}>
            <span className="font-bold text-green-700">✅ ZIP Verified: </span>
            <span className="font-mono font-black">{result.zip}</span>
            <span className="text-gray-600 ml-2">{result.city}, {result.state}</span>
            <span className="text-gray-400 ml-2">· {result.county}</span>
          </div>

          {/* Address type selector */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {ADDRESS_TYPES.map(t => (
              <button key={t.key} onClick={() => setAddrType(t.key)}
                className={`py-2 rounded-xl text-sm font-semibold border transition-all ${addrType === t.key ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="space-y-2 mb-4">
            <input value={fields.name} onChange={e => setField('name', e.target.value)}
              placeholder="Recipient name" className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
            {addrType === 'street' && <>
              <input value={fields.company} onChange={e => setField('company', e.target.value)}
                placeholder="Company name (optional)" className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
              <div className="flex gap-2">
                <input value={fields.street} onChange={e => setField('street', e.target.value)}
                  placeholder="Street address (e.g. 123 Main St)" className="flex-1 border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
                <input value={fields.apt} onChange={e => setField('apt', e.target.value)}
                  placeholder="Apt/Suite" maxLength={10} className="w-24 border-2 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
              </div>
            </>}
            {addrType === 'pobox' && (
              <input value={fields.boxNum} onChange={e => setField('boxNum', e.target.value)}
                placeholder="PO Box number" className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
            )}
            {addrType === 'rural' && (
              <div className="flex gap-2">
                <input value={fields.route} onChange={e => setField('route', e.target.value)}
                  placeholder="Route #" className="flex-1 border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
                <input value={fields.box} onChange={e => setField('box', e.target.value)}
                  placeholder="Box #" className="flex-1 border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
              </div>
            )}
            {addrType === 'military' && (
              <div className="flex gap-2">
                <input value={fields.unit} onChange={e => setField('unit', e.target.value)}
                  placeholder="Unit #" className="flex-1 border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
                <input value={fields.box} onChange={e => setField('box', e.target.value)}
                  placeholder="Box #" className="flex-1 border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" style={{ borderColor: '#e2e8f0' }} />
              </div>
            )}
          </div>

          {/* Formatted output */}
          <div className="rounded-2xl border p-5 mb-4 bg-white">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">📬 USPS Formatted Address</p>
            <div className="font-mono text-sm space-y-1 bg-gray-50 rounded-xl p-4">
              {formatted.map((line, i) => <div key={i} className="font-bold text-gray-800">{line || '\u00A0'}</div>)}
            </div>
            <p className="text-xs text-gray-400 mt-2">Per USPS Publication 28 — all caps, no punctuation, city/state/ZIP on last line</p>
          </div>

          <div className="flex gap-2 mb-3">
            <button onClick={copyAddress}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              {copied ? '✅ Copied!' : '📋 Copy Address'}
            </button>
            <button onClick={() => shareResult(formatted)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              📤 Share
            </button>
            <button onClick={() => downloadResult(formatted, result.zip)}
              className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-green-300 text-green-700 hover:bg-green-50">
              ⬇️ Download
            </button>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-700">
            💡 USPS standard: ALL CAPS · No comma between city and state · Two-letter state abbreviation · 5-digit ZIP
          </div>
        </div>
      )}
    </div>
  )
}
