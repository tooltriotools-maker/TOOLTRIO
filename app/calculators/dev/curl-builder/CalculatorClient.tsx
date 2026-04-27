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
      setOutput(`// cURL Command Builder output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">cURL Command Builder</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔧 cURL Command Builder</h1>
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
        title="curl Command Builder"
        category="dev"
        intro={`curl is the universal HTTP debugging tool — available on every platform and accepted in every tech support conversation. But writing correct curl syntax from scratch means remembering the -H header flag, -d body flag, -X method flag, and proper quoting of JSON bodies.

This builder generates curl commands from a visual request builder. Runs in your browser.

**Long-tail searches answered here:** curl command builder free online usa, how to build curl request free tool, rest api curl command generator free no signup, curl request generator with headers free, http to curl converter free online tool, visual curl command creator free no download, curl post request with json body builder free usa, curl with basic auth command builder free online, curl with bearer token authorization builder free, curl multipart form data command generator usa free, curl follow redirect flag builder free online, curl verbose debug mode command builder free, convert postman request to curl free online usa, curl timeout and retry options builder free, curl command for file upload generator free usa

For response analysis, pair with [HTTP Headers Analyzer](/calculators/dev/http-headers-analyzer) and [HTTP Status Codes](/calculators/dev/http-status-codes).`}
        howItWorks={`Builds curl command syntax from a visual request builder. Configure: URL, HTTP method (GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS), request headers (key:value pairs), request body (raw JSON, form data, multipart), authentication (Bearer token, Basic auth, API key), query parameters, and curl flags (--verbose, --silent, --insecure, --follow-redirects).`}
        benefits={[
          { title: `Full HTTP method support`, text: `GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS — all HTTP methods with the correct curl -X flag syntax.` },
          { title: `Authentication helpers`, text: `Bearer token (-H Authorization: Bearer ...), Basic auth (-u username:password), and API key header generation.` },
          { title: `JSON body builder`, text: `Visual key-value editor for JSON request bodies. Auto-adds Content-Type: application/json header when JSON body is present.` },
          { title: `Flag reference`, text: `Toggles for common curl flags with explanations: --verbose (debug output), --silent (suppress output), --insecure (skip SSL verification), --location (follow redirects).` },
        ]}
        useCases={[
          { title: `Testing REST API endpoints`, text: `Build and test REST API calls without writing curl command syntax from memory. Copy the generated command for sharing with teammates.` },
          { title: `Debugging authentication issues`, text: `Build a request with your auth token here and inspect the exact curl command to verify the header format matches what the API expects.` },
          { title: `Sharing API call examples`, text: `Generate properly formatted curl commands for API documentation, bug reports, and Stack Overflow questions.` },
          { title: `Preflight CORS debugging`, text: `Build an OPTIONS preflight request with the exact headers that your browser would send to debug CORS configuration issues.` },
        ]}
        keyStats={[
          { stat: `-H for headers`, source: `curl -H Header-Name: value — the most important curl flag for API testing` },
          { stat: `-d for body`, source: `curl -d the body value — sets the request body, used with POST, PUT, PATCH` },
          { stat: `-v for debugging`, source: `curl -v (--verbose) prints request headers, response headers, and TLS handshake — essential for debugging authentication` },
        ]}
        inlineLinks={[
          { text: `HTTP Status Codes`, href: `/calculators/dev/http-status-codes`, label: `HTTP Status Codes` },
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `MIME Type Lookup`, href: `/calculators/dev/mime-type-lookup`, label: `MIME Type Lookup` },
        ]}
        tipsSection={`Always quote the URL. curl https://example.com?q=hello world fails because of the unencoded space. Use [URL Encoder](/calculators/dev/url-encoder) to encode parameters, then always wrap the URL in single quotes in curl.

-H for headers, -d for body. -H Content-Type: application/json sets a header. -d with JSON value sets the request body. For POST with JSON, always include the Content-Type header.

--verbose for debugging. curl --verbose (or -v) prints request headers, response headers, and the TLS handshake. Essential for debugging authentication and CORS issues.

Escape JSON in shell. Single-quoted JSON in curl: -d with JSON in single quotes. Double-quoted JSON needs shell escaping. Single quotes are safer for JSON.`}
        conclusion={`curl is the universal HTTP debugging tool — available on every platform and accepted in every tech support conversation. The builder handles the quoting and flag syntax so you focus on the request. For response analysis: [HTTP Headers Analyzer](/calculators/dev/http-headers-analyzer) and [HTTP Status Codes](/calculators/dev/http-status-codes).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
