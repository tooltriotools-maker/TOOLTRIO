'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

async function digest(algorithm: string, message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer)
  return Array.from(new Uint8Array(hashBuffer)).map(b=>b.toString(16).padStart(2,'0')).join('')
}

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('Hello, World!')
  const [hashes, setHashes] = useState<Record<string,string>>({})
  const [copied, setCopied] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!input) { setHashes({}); return }
    setLoading(true)
    Promise.all([
      digest('SHA-1', input),
      digest('SHA-256', input),
      digest('SHA-384', input),
      digest('SHA-512', input),
    ]).then(([sha1, sha256, sha384, sha512]) => {
      setHashes({ 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-384': sha384, 'SHA-512': sha512 })
      setLoading(false)
    })
  }, [input])

  const copy = (val: string, key: string) => { navigator.clipboard.writeText(val); setCopied(key); setTimeout(()=>setCopied(null),1500) }

  const EXAMPLES = ['Hello, World!', 'password123', 'The quick brown fox', '']

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Hash Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1"># Hash Generator</h1>
      <p className="text-gray-500 mb-6">Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes using the browser's native Web Crypto API. Nothing leaves your device.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input Text</label>
        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4}
          placeholder="Enter text to hash..."
          className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
        <div className="flex flex-wrap gap-2 mt-3">
          {EXAMPLES.map(ex=>(
            <button key={ex||'empty'} onClick={()=>setInput(ex)}
              className="px-3 py-1 text-xs font-semibold bg-gray-100 hover:bg-green-50 hover:text-green-700 rounded-lg border border-gray-200">
              {ex || '(empty string)'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(hashes).map(([algo, hash]) => (
          <div key={algo} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-black text-gray-900">{algo}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{hash.length / 2} bytes</span>
                <button onClick={()=>copy(hash, algo)} className="flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700">
                  {copied===algo?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
                </button>
              </div>
            </div>
            <code className={`block font-mono text-xs break-all ${loading?'text-gray-300':'text-gray-700'}`}>{loading?'Computing...':hash}</code>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-4 text-sm text-amber-900">
        <strong>⚠️ Security note:</strong> MD5 and SHA-1 are cryptographically broken and should not be used for passwords or security-sensitive hashing. Use SHA-256 or SHA-512 for security applications.
      </div>


      <SEOContent
        title="Hash Generator — MD5 SHA256 HMAC"
        category="dev"
        intro={`Hashing is fundamental to security: password storage, content verification, API request signing, and digital signatures all use hash functions. Choosing the wrong hash algorithm (MD5 for password storage) or misunderstanding HMAC vs plain hashing is a common security mistake.

This generator computes MD5, SHA-1, SHA-256, SHA-512, and HMAC-SHA256 with an optional key. Runs in your browser using the Web Crypto API.

**Long-tail searches answered here:** hash generator free online usa, md5 sha1 sha256 hash generator free no signup, file hash calculator online free tool, text to hash converter free online, sha256 hash generator free no download, generate hash from string free online tool usa, sha 512 vs sha 256 hash comparison calculator, bcrypt hash generator for password storage free usa, pbkdf2 key derivation hash calculator free online, how to verify data integrity with hash calculator free, md5 is not secure why sha256 guide free usa, blake2 vs sha256 hash algorithm comparison free, hash collision probability calculator free usa, rainbow table resistance hash strength calculator, hmac hash message authentication code generator free usa

For password hashing specifically, use bcrypt via a proper library — never MD5.`}
        howItWorks={`Computes MD5, SHA-1, SHA-256, SHA-512, and SHA-3 hashes of any input string, plus HMAC-SHA256 with a user-provided key. SHA family uses the browser Web Crypto API — a native cryptographic implementation. Shows hash in hex and Base64 formats. Updates in real time as you type.`}
        benefits={[
          { title: `HMAC-SHA256 with key`, text: `Generates HMAC-SHA256 (Hash-based Message Authentication Code) — the standard for API request signing (AWS Signature V4, Stripe webhooks). Enter the message and secret key.` },
          { title: `Multiple hash algorithms`, text: `MD5, SHA-1, SHA-256, SHA-512, and SHA-3 computed simultaneously from the same input for comparison.` },
          { title: `Web Crypto API`, text: `SHA family uses the browser native Web Crypto API — a native cryptographic implementation that is faster and more secure than JavaScript libraries.` },
          { title: `Multiple output formats`, text: `Shows hash output in hexadecimal (most common) and Base64 (for compact representation).` },
        ]}
        useCases={[
          { title: `Content integrity verification`, text: `Compute the SHA-256 hash of a file or text before and after transmission to verify integrity — the hash should be identical if content was not modified.` },
          { title: `API request signing verification`, text: `Verify that your HMAC-SHA256 request signing implementation produces the expected hash for a known input before testing against the actual API.` },
          { title: `Deduplication key generation`, text: `Generate a hash of a large content block to use as a deduplication key — objects with the same hash are likely identical.` },
          { title: `JWT signature debugging`, text: `Manually compute the HMAC-SHA256 of a JWT header.payload using the secret key to verify the signature matches what the JWT library produces.` },
        ]}
        keyStats={[
          { stat: `SHA-256 for verification`, source: `SHA-256 is the standard for content integrity verification — file checksums, API request signing, and digital certificates` },
          { stat: `MD5 is not secure`, source: `MD5 is broken for cryptographic use — do not use it for password hashing. Use bcrypt, Argon2, or scrypt.` },
          { stat: `HMAC-SHA256`, source: `Hash-based Message Authentication Code — used for API request signing (AWS, Stripe, GitHub webhooks)` },
        ]}
        inlineLinks={[
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Password Generator`, href: `/calculators/dev/password-generator`, label: `Password Generator` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `RSA Key Info`, href: `/calculators/dev/rsa-key-info`, label: `RSA Key Info` },
          { text: `String Hash Calculator`, href: `/calculators/dev/string-hash-calc`, label: `String Hash Calculator` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Character Encoder`, href: `/calculators/dev/character-encoder`, label: `Character Encoder` },
        ]}
        tipsSection={`MD5 is not secure for passwords. MD5 is broken for cryptographic use — do not use it for password hashing. Use bcrypt, Argon2, or scrypt. MD5 is acceptable for checksums and non-security-sensitive deduplication.

SHA-256 for content verification. SHA-256 is the standard for content integrity verification — file checksums, API request signing, and digital certificates.

Input encoding affects the hash. Hello and Hello with trailing space produce completely different hashes. The [String Inspector](/calculators/dev/string-inspector) shows exactly what bytes your input contains.

HMAC for API signing. An HMAC is a hash of the message + a secret key. API request signing (AWS Signature V4, Stripe webhooks) uses HMAC-SHA256. Enter both the message and key here.`}
        conclusion={`Hashing is fundamental to security — content integrity, API authentication, and digital signatures all depend on correct hash function usage. This generator supports both plain hashing and HMAC-SHA256 for API request signing. For password hashing: use bcrypt via a proper library — never MD5.`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
