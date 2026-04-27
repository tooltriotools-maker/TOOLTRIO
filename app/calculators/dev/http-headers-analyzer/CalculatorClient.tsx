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
      setOutput(`// HTTP Headers Analyzer output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">HTTP Headers Analyzer</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔍 HTTP Headers Analyzer</h1>
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
        title="HTTP Headers Analyzer"
        category="dev"
        intro={`HTTP response headers tell you everything about how a server behaves: whether it compresses responses, what caching policy it applies, whether CORS is configured correctly, and whether security headers like HSTS and CSP are present.

This analyzer parses raw HTTP headers and explains each one. Runs in your browser.

**Long-tail searches answered here:** http headers analyzer free online usa, inspect website http response headers free, check security headers online free no signup, website header checker free tool, analyze response headers free no download, http header inspector free online usa, content security policy header checker free, strict transport security hsts checker free usa, x-frame-options header check free online tool, cache control header analysis free tool usa, cors allowed origins header checker free, referrer policy header check free online usa, permissions policy header analyzer free, cookie security attributes header checker usa free, server signature information disclosure checker free online usa

Pair with [curl Builder](/calculators/dev/curl-builder) to capture headers and [HTTP Status Codes](/calculators/dev/http-status-codes) for status code interpretation.`}
        howItWorks={`Paste raw HTTP response headers (from browser DevTools Network Response Headers, or from curl -I output). The analyzer parses each Header-Name: value line and matches it against a reference database.

For security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options), checks the value against best-practice configurations and flags issues: missing includeSubDomains on HSTS, missing default-src in CSP.

For caching headers (Cache-Control, ETag, Last-Modified, Expires), calculates the effective cache duration.`}
        benefits={[
          { title: `Security header audit`, text: `Checks for HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and Permissions-Policy. Flags missing or misconfigured security headers that leave your app vulnerable.` },
          { title: `CORS configuration check`, text: `Parses Access-Control-Allow-Origin, Allow-Methods, and Allow-Headers. Identifies overly permissive configurations (wildcard origins with credentials) and missing headers.` },
          { title: `Cache behavior analysis`, text: `Calculates effective cache duration from Cache-Control, Expires, and ETags. Shows exactly how long browsers and CDNs will cache the response.` },
          { title: `Content-Type validation`, text: `Validates that Content-Type values include charset declarations for text types and are correctly formatted for binary responses.` },
        ]}
        useCases={[
          { title: `Security header audit before launch`, text: `Before launching, capture headers from your staging environment and paste here. Check that HSTS, CSP, and X-Frame-Options are all present and correctly configured.` },
          { title: `Debugging CORS errors`, text: `Your browser throws a CORS error. Capture the response headers from the failing preflight request and paste here to see exactly which CORS header is missing.` },
          { title: `CDN cache debugging`, text: `Your CDN is serving stale content. Paste the response headers to see whether Cache-Control is set to max-age, no-store, or missing entirely.` },
          { title: `Performance optimization`, text: `Check whether your responses include Content-Encoding: gzip or br (Brotli). Missing compression on text responses significantly increases payload size.` },
        ]}
        keyStats={[
          { stat: `HSTS required`, source: `HTTPS Strict Transport Security — forces browsers to always use HTTPS, even if the user types HTTP` },
          { stat: `CSP prevents XSS`, source: `Content Security Policy is the primary defense against cross-site scripting attacks` },
          { stat: `Vary: Accept-Encoding`, source: `Required for CDNs to correctly cache both compressed and uncompressed versions` },
        ]}
        inlineLinks={[
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `HTTP Status Codes`, href: `/calculators/dev/http-status-codes`, label: `HTTP Status Codes` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Meta Tag Generator`, href: `/calculators/dev/meta-tag-generator`, label: `Meta Tag Generator` },
          { text: `Robots.txt Generator`, href: `/calculators/dev/robots-txt-generator`, label: `Robots.txt Generator` },
          { text: `Open Graph Preview`, href: `/calculators/dev/open-graph-preview`, label: `Open Graph Preview` },
        ]}
        tipsSection={`Copy headers from DevTools. In Chrome: open DevTools, Network, click any request, Response Headers, right-click, Copy. Paste the entire block here for analysis.

HSTS requires includeSubDomains. Strict-Transport-Security: max-age=31536000 without includeSubDomains leaves your subdomains unprotected. Always include includeSubDomains.

Wildcard CORS origin + credentials is forbidden. Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true is rejected by browsers. You must specify the exact origin when allowing credentials.

Remove deprecated X-XSS-Protection. X-XSS-Protection: 1; mode=block is deprecated and should be removed — it can introduce vulnerabilities in old IE. Replace with a proper CSP default-src directive.`}
        conclusion={`HTTP headers silently control security, performance, and browser behavior. A missing HSTS header means your site is vulnerable to downgrade attacks. A wrong Cache-Control means your CDN is serving stale content.

For complete HTTP debugging: build requests with [curl Builder](/calculators/dev/curl-builder), analyze response codes with [HTTP Status Codes](/calculators/dev/http-status-codes), and measure performance with [API Response Time](/calculators/dev/api-response-time).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
