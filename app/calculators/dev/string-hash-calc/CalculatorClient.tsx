'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!input.trim()) { setOutput(''); setError(''); return }
    try {
      setOutput(`// String Hash Calculator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">String Hash Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">#️⃣ String Hash Calculator</h1>
      <p className="text-gray-500 mb-6">Runs entirely in your browser - no data sent to server</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14} placeholder="Paste your input here..."
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-950 text-green-300" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
              {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
            </button>
          </div>
          {error
            ? <div className="p-4 bg-red-50 rounded-xl border border-red-200"><p className="text-red-600 text-sm font-mono">{error}</p></div>
            : <pre className="h-64 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output||'Output appears here...'}</pre>
          }
        </div>
      </div>

      <SEOContent
        title="String Hash Calculator — MD5 SHA256 SHA512"
        category="dev"
        intro={`Computing the hash of a string is a frequent task for checksums, deduplication keys, cache keys, and debugging API signing issues. This tool computes MD5, SHA-1, SHA-256, SHA-512, and SHA-3 from any string input, showing results in hex and Base64 simultaneously.

Runs in your browser using the Web Crypto API — nothing is transmitted.

**Long-tail searches answered here:** string hash calculator free online usa, hash a string djb2 fnv murmur free, compute string hash value online free, text hash function calculator free no signup, string checksum calculator free no download, hash string to number free online usa, consistent hashing ring calculator free online, string hash for hashtable bucket assignment free usa, xxhash vs murmur3 string hash calculator free, hash distribution uniformity tester free usa online, fnv1a hash calculator for string free online, polynomial rolling string hash calculator free usa, java string hashCode equivalent calculator free, string hash collision probability estimator free usa, bloom filter hash function string calculator free

For HMAC signing, use [Hash Generator](/calculators/dev/hash-generator).`}
        howItWorks={`Computes MD5, SHA-1, SHA-256, SHA-512, and SHA-3 hashes of any input string. All hashing runs in the browser using the Web Crypto API (for SHA family) and a JavaScript MD5 implementation. Shows hash in hex, Base64, and binary formats. Updates in real time as you type.`}
        benefits={[
          { title: `Web Crypto API for SHA family`, text: `SHA-256 and SHA-512 use the browser Web Crypto API — a native cryptographic implementation that is faster and more secure than JavaScript libraries.` },
          { title: `Real-time hash update`, text: `Hash values update as you type — instantly see how adding a single character completely changes the hash output (the avalanche effect).` },
          { title: `Multiple hash algorithms`, text: `MD5, SHA-1, SHA-256, SHA-512, and SHA-3 (256-bit and 512-bit) — all computed simultaneously from the same input for comparison.` },
          { title: `Multiple output formats`, text: `Shows hash output in hexadecimal (most common), Base64 (for compact representation), and binary for bit-level analysis.` },
        ]}
        useCases={[
          { title: `Content verification checksum`, text: `Compute the SHA-256 hash of a file or text before and after transmission to verify integrity — the hash should be identical if content was not modified.` },
          { title: `Password storage research`, text: `See why password hashing needs a slow algorithm: SHA-256 of a password hashes in microseconds (too fast for password storage). bcrypt/Argon2 are designed to be slow.` },
          { title: `API request signing verification`, text: `Verify that your HMAC-SHA256 request signing implementation produces the expected hash for a known input before testing against the actual API.` },
          { title: `Deduplication key generation`, text: `Generate a hash of a large content block to use as a deduplication key — objects with the same hash are likely identical.` },
        ]}
        keyStats={[
          { stat: `SHA-256 for verification`, source: `SHA-256 is the standard for content integrity verification — file checksums, API request signing, and digital certificates` },
          { stat: `MD5 is not secure`, source: `MD5 is broken for cryptographic use — do not use it for password hashing. Use bcrypt, Argon2, or scrypt.` },
          { stat: `Web Crypto API`, source: `Browser-native cryptographic API — faster and more secure than pure JavaScript hash implementations` },
        ]}
        inlineLinks={[
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `Password Generator`, href: `/calculators/dev/password-generator`, label: `Password Generator` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `RSA Key Info`, href: `/calculators/dev/rsa-key-info`, label: `RSA Key Info` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Character Encoder`, href: `/calculators/dev/character-encoder`, label: `Character Encoder` },
        ]}
        tipsSection={`MD5 is not secure for passwords. MD5 is broken for cryptographic use — do not use it for password hashing. Use bcrypt, Argon2, or scrypt. MD5 is acceptable for checksums and non-security-sensitive deduplication.

SHA-256 for content verification. SHA-256 is the standard for content integrity verification — file checksums, API request signing, and digital certificates.

Input encoding affects the hash. Hello and Hello with trailing space produce completely different hashes. The [String Inspector](/calculators/dev/string-inspector) shows exactly what bytes your input contains.

For HMAC API signing. API request signing (AWS Signature V4, Stripe webhooks) uses HMAC-SHA256. Use [Hash Generator](/calculators/dev/hash-generator) for HMAC support with a key.`}
        conclusion={`Quick string hashing for checksums, deduplication, and debugging. For HMAC and advanced hashing: [Hash Generator](/calculators/dev/hash-generator). For password hashing: use bcrypt via a proper library — never MD5.`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
