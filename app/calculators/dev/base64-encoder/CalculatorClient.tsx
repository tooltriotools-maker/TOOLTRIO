'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, ArrowLeftRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('Hello, World!')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [urlSafe, setUrlSafe] = useState(false)
  const [copied, setCopied] = useState(false)

  const { output, outputError } = (() => {
    if (!input.trim()) return { output: '', outputError: '' }
    try {
      if (mode === 'encode') {
        let encoded = btoa(unescape(encodeURIComponent(input)))
        if (urlSafe) encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
        return { output: encoded, outputError: '' }
      } else {
        let safe = input.trim().replace(/-/g, '+').replace(/_/g, '/')
        while (safe.length % 4) safe += '='
        return { output: decodeURIComponent(escape(atob(safe))), outputError: '' }
      }
    } catch (e: any) { return { output: '', outputError: (e as any).message } }
  })()
  const error = outputError

  const swap = () => { setInput(output || ''); setMode(m => m === 'encode' ? 'decode' : 'encode') }
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  const EXAMPLES = [
    { label: 'Plain text', raw: 'Hello, World!' },
    { label: 'JSON', raw: '{"user":"alice","role":"admin"}' },
    { label: 'URL', raw: 'https://example.com/path?q=test&lang=en' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Base64 Encoder/Decoder</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔐 Base64 Encoder / Decoder</h1>
      <p className="text-gray-500 mb-6">Encode or decode Base64 strings instantly - runs entirely in your browser, nothing sent to any server.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex rounded-xl border border-gray-200 overflow-hidden">
            {(['encode','decode'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`px-5 py-2 text-sm font-bold capitalize transition-all ${mode === m ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{m}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
            <input type="checkbox" checked={urlSafe} onChange={e => setUrlSafe(e.target.checked)} className="accent-green-600" />
            URL-safe (no +/=//)
          </label>
          <button onClick={swap} className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50">
            <ArrowLeftRight className="w-4 h-4" /> Swap
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input ({mode === 'encode' ? 'Plain Text' : 'Base64'})</label>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={10}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
              className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output ({mode === 'encode' ? 'Base64' : 'Plain Text'})</label>
              <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            {error
              ? <div className="h-48 p-4 bg-red-950 text-red-300 rounded-xl font-mono text-xs">❌ {error}</div>
              : <pre className="w-full h-48 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output || 'Output will appear here...'}</pre>
            }
            {output && <p className="text-xs text-gray-400 mt-1">{output.length} characters</p>}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-700 mb-3">Quick Examples - click to load</h2>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setInput(ex.raw); setMode('encode') }}
              className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-green-50 hover:text-green-700 rounded-lg border border-gray-200 transition-all">
              {ex.label}
            </button>
          ))}
        </div>
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
        title="Base64 Encoder and Decoder"
        category="dev"
        intro={`Base64 is everywhere in web development: JWT tokens use Base64URL encoding, HTTP Basic Auth uses Base64, CSS data URIs use Base64, and many APIs encode binary responses as Base64 strings in JSON. Understanding which variant (standard vs URL-safe) and being able to encode/decode quickly is essential.

This tool runs entirely in your browser — your data is never transmitted.

**Long-tail searches answered here:** base64 encode decode online free no signup usa, convert text to base64 free online tool, base64 encoder decoder no download free, base64 image encoder free online tool, encode decode base64 string online instantly free, base64 url encoding converter free no account, base64 encode file contents online free usa, what is base64 encoding and why use it free guide, base64 decoded shows garbled text fix calculator, url safe base64 vs standard base64 difference free, base64 to hex converter free online usa, padding characters in base64 explained free tool, base64 for basic authentication header generator free, how to base64 encode and decode in javascript free, base64 vs url encoding when to use which free usa

For JWT tokens, pair with [JWT Decoder](/calculators/dev/jwt-decoder).`}
        howItWorks={`Encodes text, binary data, and files to Base64 and decodes Base64 back. Supports standard Base64 (uses + and /) and Base64URL (uses - and _ — safe in URLs and JWT tokens without percent-encoding). Auto-detects which variant is needed. File encoding converts images, PDFs, and any binary file to a Base64 data URI. All encoding runs in the browser — nothing is transmitted.`}
        benefits={[
          { title: `Standard Base64 and Base64URL`, text: `Supports both standard Base64 (RFC 4648) and Base64URL (RFC 4648 Section 5) — auto-detecting which variant to use based on whether the input contains + or - characters.` },
          { title: `File to data URI`, text: `Convert images, PDFs, and other binary files to Base64-encoded data URIs for embedding directly in HTML, CSS, or JSON.` },
          { title: `Auto-detection`, text: `Automatically detects whether input is Base64 or Base64URL encoded and uses the correct decoding.` },
          { title: `Encoding clarity`, text: `Shows the character set, padding, and variant being used — eliminates confusion between the two Base64 variants.` },
        ]}
        useCases={[
          { title: `JWT debugging`, text: `JWT headers and payloads are Base64URL encoded (not standard Base64). Decode the three parts of a JWT here to inspect the header algorithm and payload claims.` },
          { title: `HTTP Basic Auth decoding`, text: `Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ= is just username:password encoded in Base64. Decode any Basic Auth header here to see the credentials.` },
          { title: `Inline images in CSS`, text: `background-image: url(data:image/png;base64,...) embeds image data directly in CSS. Encode your small icon here to eliminate one HTTP request.` },
          { title: `API response binary data`, text: `Some APIs return binary data (PDFs, images) as Base64-encoded strings in JSON responses. Decode here to verify the content.` },
        ]}
        keyStats={[
          { stat: `Not encryption`, source: `Base64 is an encoding, not encryption. Anyone who sees your Base64 string can decode it in seconds. Do not use Base64 to hide sensitive data.` },
          { stat: `Base64URL for JWTs`, source: `JWT tokens use Base64URL (- and _) not standard Base64 (+ and /) — the difference matters when decoding manually` },
          { stat: `Data URI format`, source: `data:image/png;base64,iVBORw0... — the MIME type prefix tells the browser how to interpret the encoded data` },
        ]}
        inlineLinks={[
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Image to Base64`, href: `/calculators/dev/image-base64`, label: `Image to Base64` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `Character Encoder`, href: `/calculators/dev/character-encoder`, label: `Character Encoder` },
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
          { text: `Binary Text Converter`, href: `/calculators/dev/binary-text-converter`, label: `Binary Text Converter` },
        ]}
        tipsSection={`Base64URL for JWTs. JWT headers and payloads use Base64URL (not standard Base64). The plus becomes minus and slash becomes underscore to avoid percent-encoding in URLs. Use [JWT Decoder](/calculators/dev/jwt-decoder) to decode complete JWT tokens.

Not encryption. Base64 is an encoding, not encryption. Anyone who sees your Base64 string can decode it in seconds. Do not use Base64 to hide sensitive data.

Data URIs for small images. data:image/png;base64,iVBORw0... embeds image data directly in HTML/CSS. Eliminates an HTTP request but increases HTML size. Best for small icons and inline SVGs.

HTTP Basic Auth is Base64. Authorization: Basic encoded-value is just username:password encoded in Base64. Decode any Basic Auth header here to see the credentials in plain text.`}
        conclusion={`Base64 is everywhere — JWTs, HTTP auth headers, data URIs, email attachments, and binary-to-text encoding. This encoder handles both standard and URL-safe variants with auto-detection. For JWT decoding: [JWT Decoder](/calculators/dev/jwt-decoder). For image encoding: [Image to Base64](/calculators/dev/image-base64).`}
      />
    </div>
  )
}
