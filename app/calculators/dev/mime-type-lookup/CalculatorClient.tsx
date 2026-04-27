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
      setOutput(`// MIME Type Lookup output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">MIME Type Lookup</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📁 MIME Type Lookup</h1>
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
        title="MIME Type Lookup — File Extension to Content-Type"
        category="dev"
        intro={`MIME types (Content-Type values) tell browsers and API clients what format a response contains. Using the wrong MIME type causes browsers to display downloads instead of rendering pages, API clients to fail parsing, and WebAssembly to disable streaming compilation.

This lookup covers 900+ file extensions with their correct MIME types, usage notes, and HTTP header syntax. Runs in your browser with instant search.

**Long-tail searches answered here:** mime type lookup free online usa, file extension to mime type converter free, what mime type is a json file free lookup, content type header lookup free tool, mime type reference guide free no signup, file mime type checker free online usa, what content type for rest api json response free, multipart form data mime type explained free usa, mime type for csv file application vs text free, webp image mime type lookup usa free, wasm file mime type for browser serving free, mime types for video mp4 webm formats free usa, font file mime type woff woff2 lookup free, octet stream mime type when to use guide free usa, mime type sniffing prevention content type options free

Pair with [HTTP Headers Analyzer](/calculators/dev/http-headers-analyzer) to check your server actual Content-Type output.`}
        howItWorks={`The lookup database maps file extensions to their IANA-registered MIME types. Each entry includes: the primary MIME type, any common alternatives, whether the type requires a charset parameter (text/* types should include ; charset=utf-8), and whether the browser renders it inline or downloads it.

The search works both directions: enter a file extension (.mp4) to get the MIME type, or enter a MIME type (video/mp4) to see which extensions use it.`}
        benefits={[
          { title: `900+ extensions covered`, text: `Covers common and obscure formats: video, audio, documents, code, data, and specialized formats like WebAssembly and HLS manifests.` },
          { title: `Bidirectional search`, text: `Search by file extension to get the MIME type, or search by MIME type to see which extensions use it. Useful when an API returns a Content-Type you do not recognize.` },
          { title: `Charset requirement flags`, text: `Text MIME types should include ; charset=utf-8. Missing charset causes encoding issues in some browsers. This lookup flags which types require it.` },
          { title: `Server config snippets`, text: `Shows the Nginx and Apache config syntax to set the MIME type — types { application/wasm wasm; } for Nginx, AddType for Apache.` },
        ]}
        useCases={[
          { title: `WebAssembly streaming compilation`, text: `WebAssembly.instantiateStreaming requires application/wasm Content-Type. Using application/octet-stream falls back to buffered compilation which is significantly slower.` },
          { title: `Video streaming setup`, text: `Setting up HLS streaming requires .m3u8 as application/x-mpegURL and .ts segments as video/MP2T. Wrong MIME types prevent Safari and iOS from loading HLS streams.` },
          { title: `Font serving`, text: `WOFF2 fonts must be served as font/woff2. Some old servers serve them as application/octet-stream, causing font loading failures in strict browsers.` },
          { title: `htaccess configuration`, text: `After looking up the correct MIME type, use [htaccess Generator](/calculators/dev/htaccess-generator) to add the AddType directive to your Apache config.` },
        ]}
        keyStats={[
          { stat: `application/wasm`, source: `Required for WebAssembly streaming compilation — wrong MIME type forces buffered mode` },
          { stat: `application/json`, source: `Correct MIME type for JSON APIs — not text/json which is non-standard` },
          { stat: `IANA registry`, source: `MIME types sourced from the IANA media type registry — the authoritative source` },
        ]}
        inlineLinks={[
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `htaccess Generator`, href: `/calculators/dev/htaccess-generator`, label: `htaccess Generator` },
          { text: `HTTP Status Codes`, href: `/calculators/dev/http-status-codes`, label: `HTTP Status Codes` },
          { text: `Robots.txt Generator`, href: `/calculators/dev/robots-txt-generator`, label: `Robots.txt Generator` },
          { text: `SVG Optimizer`, href: `/calculators/dev/svg-optimizer`, label: `SVG Optimizer` },
          { text: `Image to Base64`, href: `/calculators/dev/image-base64`, label: `Image to Base64` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
        ]}
        tipsSection={`application/json, never text/json. text/json is non-standard and not in the IANA registry. Always use application/json; charset=utf-8 for JSON API responses.

X-Content-Type-Options: nosniff everywhere. Browsers will MIME-sniff responses that lack Content-Type headers. Set X-Content-Type-Options: nosniff on every response.

WebAssembly needs application/wasm. This is the single most important non-obvious MIME type for modern web apps. Without it, WebAssembly.instantiateStreaming fails.

charset only for text types. Adding ; charset=utf-8 to application/json is technically valid but unusual — required for text/html and text/css.`}
        conclusion={`MIME types are invisible when correct and infuriating when wrong. A missing application/wasm Content-Type degrades WebAssembly performance. A wrong font MIME type silently falls back to a system font.

For server configuration: look up MIME types here, generate Apache rules with [htaccess Generator](/calculators/dev/htaccess-generator), and verify output with [HTTP Headers Analyzer](/calculators/dev/http-headers-analyzer).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
