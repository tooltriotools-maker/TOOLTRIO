'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, ArrowLeftRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('https://example.com/search?q=hello world&lang=en&tag=c#code')
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [component, setComponent] = useState(false)
  const [copied, setCopied] = useState(false)

  const { output, outputError } = (() => {
    if (!input.trim()) return { output: '', outputError: '' }
    try {
      const result = mode === 'encode'
        ? (component ? encodeURIComponent(input) : encodeURI(input))
        : (component ? decodeURIComponent(input) : decodeURI(input))
      return { output: result, outputError: '' }
    } catch(e: any) { return { output: '', outputError: (e as any).message } }
  })()
  const error = outputError

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }
  const swap = () => { setInput(output||''); setMode(m=>m==='encode'?'decode':'encode') }

  const EXAMPLES = [
    {label:'URL with spaces', val:'https://example.com/my page?q=hello world'},
    {label:'Special chars', val:'user@email.com&role=admin<>'},
    {label:'Unicode', val:'cafe naïve resume'},
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">URL Encoder/Decoder</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔗 URL Encoder / Decoder</h1>
      <p className="text-gray-500 mb-6">Encode special characters for URLs or decode percent-encoded strings. Runs in your browser.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex rounded-xl border border-gray-200 overflow-hidden">
            {(['encode','decode'] as const).map(m => (
              <button key={m} onClick={()=>setMode(m)} className={`px-5 py-2 text-sm font-bold capitalize ${mode===m?'bg-green-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{m}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <input type="checkbox" checked={component} onChange={e=>setComponent(e.target.checked)} className="accent-green-600" />
            Component mode (encodeURIComponent - encodes / ? # too)
          </label>
          <button onClick={swap} className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50">
            <ArrowLeftRight className="w-4 h-4" /> Swap
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input</label>
            <textarea value={input} onChange={e=>setInput(e.target.value)} rows={8}
              className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output</label>
              <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
                {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} {copied?'Copied!':'Copy'}
              </button>
            </div>
            {error
              ? <div className="p-4 bg-red-950 text-red-300 rounded-xl font-mono text-xs h-48">{error}</div>
              : <pre className="w-full h-48 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output||'Output will appear here...'}</pre>
            }
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
        <p className="text-sm font-bold text-gray-700 mb-2">Examples</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(ex=>(
            <button key={ex.label} onClick={()=>{setInput(ex.val);setMode('encode')}}
              className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-green-50 hover:text-green-700 rounded-lg border border-gray-200">
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
      <SEOContent
        title="URL Encoder / Decoder"
        category="dev"
        intro={`URLs only allow letters, digits, and a handful of symbols. Every other character must be percent-encoded as %XX hex bytes before it can be safely transmitted. Misencoded URLs cause 400 errors, broken redirects, and query parameters that silently drop data.

This tool runs in your browser. Paste any URL, query string, or parameter value and get the correctly encoded or decoded version instantly.

**Long-tail searches answered here:** url encoder decoder free online usa, url percent encode decode free no signup, encode url parameters free tool online, url encoding special characters free, decode encoded url free online tool, query string encoder decoder free usa, url encode all characters vs just special chars free, space in url plus sign vs percent 20 difference free usa, full url encode vs component encode difference free, url encoding for form submission free guide usa, how to fix malformed url encoding free tool, url encode unicode characters free online usa, percent encoding reference chart complete free, url encode for curl request parameters free usa, url encoding in rest api query string free guide

After encoding, test your full URL with the [curl Builder](/calculators/dev/curl-builder).`}
        howItWorks={`The encoder uses encodeURIComponent() for individual parameter values and encodeURI() for full URLs (preserves structural characters like /, ?, #, &, =). The decoder uses decodeURIComponent() which reverses all percent-encoding: %20 to space, %2F to /, %26 to &.

Choosing the right function: For encoding a query parameter value, use encodeURIComponent — it encodes & and = so they cannot break the query string structure.`}
        benefits={[
          { title: `Encode query parameters safely`, text: `Encode search terms, email addresses, and file paths before appending them as query parameters. Prevents & and = characters from breaking your URL structure.` },
          { title: `Decode percent-encoded strings`, text: `Reverse %2F, %20, %26, %3D back to readable form. Essential for debugging redirect URLs and OAuth callback parameters.` },
          { title: `Full URL vs component encoding`, text: `Toggle between encodeURI (preserves URL structure) and encodeURIComponent (encodes everything). Prevents the common mistake of breaking all slashes when encoding a full URL.` },
          { title: `No size limit, runs offline`, text: `Runs using native Web APIs. Once loaded, works without internet — useful when debugging API integrations on unreliable connections.` },
        ]}
        useCases={[
          { title: `Building API query strings`, text: `Pass a user-typed search query as a URL parameter. Encode it first so spaces become %20 and special characters do not break the request structure.` },
          { title: `Debugging redirect chains`, text: `OAuth flows, payment callbacks, and SSO redirects use URL-encoded redirect_uri parameters. Paste the encoded value here to see the actual destination URL.` },
          { title: `Fixing broken links`, text: `A CMS generated a URL with unencoded spaces. Encode it here to get a browser-safe version that will not 400 on most servers.` },
          { title: `Understanding third-party API calls`, text: `A third-party SDK generates a URL you want to inspect. Decode the query string here to read the actual parameter values being sent.` },
        ]}
        keyStats={[
          { stat: `RFC 3986`, source: `The URI standard defining percent-encoding — implemented by this tool` },
          { stat: `%20 vs +`, source: `Both encode a space — %20 is RFC-correct, + is form-data specific` },
          { stat: `128 ASCII`, source: `Only unreserved ASCII characters are safe unencoded in URLs` },
        ]}
        inlineLinks={[
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `HTTP Status Codes`, href: `/calculators/dev/http-status-codes`, label: `HTTP Status Codes` },
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
        ]}
        tipsSection={`encodeURIComponent for values, encodeURI for full URLs. Applying encodeURIComponent to a full URL encodes the slashes and colons, breaking the URL entirely.

Double-encoded URLs are a nightmare. If you encode an already-encoded URL, %20 becomes %2520. Always decode first to check before re-encoding.

Plus vs %20 in forms. HTML forms encode spaces as + in application/x-www-form-urlencoded. In a URL path, only %20 means space.

Chain with [curl Builder](/calculators/dev/curl-builder). Build your full request with properly encoded parameters, then copy the curl command for testing.`}
        conclusion={`URL encoding is one of those fundamentals that causes production bugs disproportionate to its apparent simplicity. A single unencoded & in a query parameter silently truncates the value. This tool handles both encoding and decoding with correct RFC 3986 semantics.

For the complete request-building workflow: encode here, build the full request with [curl Builder](/calculators/dev/curl-builder), and inspect response headers with [HTTP Headers Analyzer](/calculators/dev/http-headers-analyzer).`}
      />
    </div>
  )
}
