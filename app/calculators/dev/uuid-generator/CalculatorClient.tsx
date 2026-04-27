'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export default function CalculatorClient({ faqs }: Props) {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState<string[]>(() => Array.from({length:5}, uuidv4))
  const [format, setFormat] = useState<'standard'|'upper'|'no-dash'|'braces'|'urn'>('standard')
  const [copied, setCopied] = useState<string|null>(null)

  const generate = useCallback(() => setUuids(Array.from({length: Math.min(count,100)}, uuidv4)), [count])

  const fmt = (u: string) => {
    if (format === 'upper') return u.toUpperCase()
    if (format === 'no-dash') return u.replace(/-/g,'')
    if (format === 'braces') return `{${u}}`
    if (format === 'urn') return `urn:uuid:${u}`
    return u
  }

  const copyOne = (u: string) => { navigator.clipboard.writeText(fmt(u)); setCopied(u); setTimeout(()=>setCopied(null),1500) }
  const copyAll = () => { navigator.clipboard.writeText(uuids.map(fmt).join('\n')); setCopied('all'); setTimeout(()=>setCopied(null),1500) }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">UUID Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🆔 UUID v4 Generator</h1>
      <p className="text-gray-500 mb-6">Generate cryptographically random UUID v4 identifiers instantly in your browser.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-4 mb-5">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Count (1-100)</label>
            <input type="number" min={1} max={100} value={count} onChange={e=>setCount(Number(e.target.value))}
              className="w-24 px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Format</label>
            <select value={format} onChange={e=>setFormat(e.target.value as any)}
              className="px-3 py-2 border-2 border-gray-200 rounded-xl font-semibold text-sm focus:border-green-400 focus:outline-none">
              <option value="standard">Standard lowercase</option>
              <option value="upper">UPPERCASE</option>
              <option value="no-dash">No dashes</option>
              <option value="braces">{'{Braces}'}</option>
              <option value="urn">URN format</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button onClick={generate} className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700">
              <RefreshCw className="w-4 h-4" /> Generate
            </button>
            <button onClick={copyAll} className="flex items-center gap-2 px-4 py-2 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 text-sm">
              {copied==='all'?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4"/>} Copy All
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {uuids.map((u,i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 group">
              <code className="flex-1 font-mono text-sm text-gray-800 break-all">{fmt(u)}</code>
              <button onClick={()=>copyOne(u)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-lg transition-all">
                {copied===u?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4 text-gray-500"/>}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 text-sm text-blue-900">
        <p className="font-bold mb-1">UUID v4 Anatomy</p>
        <code className="font-mono text-xs bg-white px-3 py-1 rounded-lg border border-blue-200 block">{uuids[0]}</code>
        <p className="text-xs mt-2 text-blue-700">Format: 8-4-4-4-12 hex digits. The third group always starts with <strong>4</strong> (version). The fourth group starts with 8, 9, a, or b (variant).</p>
      </div>

      <div className="space-y-3">
        {faqs.map(f => (
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
      <SEOContent
        title="UUID Generator — UUID v4 and v7"
        category="dev"
        intro={`UUIDs (Universally Unique Identifiers) are 128-bit identifiers used as primary keys, session IDs, correlation IDs, and request tracing identifiers. Version 4 UUIDs are random; version 7 UUIDs are time-ordered and sortable by creation time — better for database primary keys.

This generator creates cryptographically random UUIDs in your browser.

**Long-tail searches answered here:** uuid generator free online usa, generate uuid v4 online free no signup, bulk uuid generator free tool online, random uuid v1 v4 generator free, how to generate uuid free online tool, unique identifier generator free usa no download, uuid v4 vs v7 difference when to use free usa, guid vs uuid difference explained free guide, uuid collision probability calculator free, bulk 100 uuid batch generator free online usa, uuid format 8 4 4 4 12 explained free guide, nil uuid use case explained free usa, how to validate uuid format checker free online, uuid for primary keys in database guide free usa, uuid namespace deterministic v5 v3 generator free

For realistic test data with UUIDs, pair with [Fake Data Generator](/calculators/dev/fake-data-generator).`}
        howItWorks={`Generates UUID v4 (random, using window.crypto.getRandomValues() for cryptographic randomness) and UUID v7 (time-ordered, using the current millisecond timestamp in the high bits followed by random bits).

UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx where y is 8, 9, a, or b.
UUID v7 format: timestamp milliseconds encoded in the first 48 bits, followed by version bits and random bits — sortable chronologically while remaining unique.`}
        benefits={[
          { title: `UUID v4 (random)`, text: `Cryptographically random UUID using window.crypto.getRandomValues(). The most common UUID format for general use.` },
          { title: `UUID v7 (time-ordered)`, text: `Time-ordered UUID where the first bits encode the millisecond timestamp. Sortable chronologically — preferred for database primary keys to avoid index fragmentation.` },
          { title: `Batch generation`, text: `Generate multiple UUIDs at once for bulk record creation, test fixtures, or populating lookup tables.` },
          { title: `Nil UUID reference`, text: `Shows the nil UUID (all zeros: 00000000-0000-0000-0000-000000000000) — the standard null/default UUID value.` },
        ]}
        useCases={[
          { title: `Database primary keys`, text: `Generate UUID primary keys for your records. UUID v7 is preferred for database PKs because time-ordering reduces B-tree index fragmentation vs random v4.` },
          { title: `Correlation IDs for request tracing`, text: `Generate a UUID at the start of each request to use as a correlation ID. Pass it through all service calls for distributed tracing.` },
          { title: `Test fixture generation`, text: `Generate UUIDs for test fixtures and mock data. Using UUIDs as fixture IDs prevents ID collision between test runs.` },
          { title: `Session and token IDs`, text: `Generate cryptographically random UUIDs for session IDs, CSRF tokens, and one-time-use codes where unpredictability is required.` },
        ]}
        keyStats={[
          { stat: `UUID v4`, source: `Random UUID — 122 bits of randomness, ~5.3 * 10^36 possible values` },
          { stat: `UUID v7`, source: `Time-ordered UUID — millisecond precision timestamp in first 48 bits, sortable by creation time` },
          { stat: `RFC 4122`, source: `The UUID specification — defines version 1, 3, 4, and 5. Version 7 is from the newer RFC 9562.` },
        ]}
        inlineLinks={[
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `Password Generator`, href: `/calculators/dev/password-generator`, label: `Password Generator` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Epoch Converter`, href: `/calculators/dev/epoch-converter`, label: `Epoch Converter` },
        ]}
        tipsSection={`UUID v7 for database primary keys. UUID v4 generates random values that cause B-tree index fragmentation. UUID v7 encodes the timestamp in the high bits, so new records cluster near each other in the index — dramatically better write performance for large tables.

UUIDs are not sequential by default. UUID v4 is random — do not use them for ordering or pagination without a separate created_at column. Use UUID v7 or a separate timestamp if chronological ordering matters.

Store as BINARY(16) not VARCHAR(36). Storing UUIDs as text (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) uses 36 bytes. Storing as binary uses 16 bytes — 55% less space. Remove the hyphens and decode to binary before storing.

Version 1 vs 4 vs 7. Version 1 uses MAC address + timestamp (privacy risk, now deprecated). Version 4 is random (current standard for most uses). Version 7 is time-ordered random (preferred for database PKs).`}
        conclusion={`UUIDs are the most common globally unique identifier format. This generator creates cryptographically random v4 UUIDs and time-ordered v7 UUIDs for database primary keys. For realistic test data with UUIDs: [Fake Data Generator](/calculators/dev/fake-data-generator).`}
      />
    </div>
  )
}
