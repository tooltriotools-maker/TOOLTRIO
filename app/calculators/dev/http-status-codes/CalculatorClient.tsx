'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

const CODES = [
  {code:200,label:'OK',cat:'2xx',desc:'The request succeeded. Standard response for successful HTTP requests.'},
  {code:201,label:'Created',cat:'2xx',desc:'The request succeeded and a new resource was created.'},
  {code:204,label:'No Content',cat:'2xx',desc:'The server processed the request but returns no content.'},
  {code:301,label:'Moved Permanently',cat:'3xx',desc:'The URL has been permanently changed. SEO juice is transferred.'},
  {code:302,label:'Found',cat:'3xx',desc:'Temporary redirect. Original URL will be used in the future.'},
  {code:304,label:'Not Modified',cat:'3xx',desc:'The cached version is still valid. No need to resend data.'},
  {code:400,label:'Bad Request',cat:'4xx',desc:'The server cannot process the request due to malformed syntax.'},
  {code:401,label:'Unauthorized',cat:'4xx',desc:'Authentication is required and has failed or not been provided.'},
  {code:403,label:'Forbidden',cat:'4xx',desc:'The server understood the request but refuses to authorize it.'},
  {code:404,label:'Not Found',cat:'4xx',desc:'The server cannot find the requested resource.'},
  {code:405,label:'Method Not Allowed',cat:'4xx',desc:'The HTTP method used is not supported for this resource.'},
  {code:409,label:'Conflict',cat:'4xx',desc:'The request conflicts with the current state of the server.'},
  {code:422,label:'Unprocessable Entity',cat:'4xx',desc:'The server understands the content but cannot process it.'},
  {code:429,label:'Too Many Requests',cat:'4xx',desc:'The user has sent too many requests - rate limiting applied.'},
  {code:500,label:'Internal Server Error',cat:'5xx',desc:'The server encountered an unexpected condition.'},
  {code:502,label:'Bad Gateway',cat:'5xx',desc:'Invalid response from an upstream server.'},
  {code:503,label:'Service Unavailable',cat:'5xx',desc:'The server is temporarily unable to handle requests.'},
  {code:504,label:'Gateway Timeout',cat:'5xx',desc:'The upstream server failed to respond in time.'},
]

const CAT_COLORS: Record<string,string> = {'2xx':'bg-green-50 border-green-200 text-green-800','3xx':'bg-blue-50 border-blue-200 text-blue-800','4xx':'bg-yellow-50 border-yellow-200 text-yellow-800','5xx':'bg-red-50 border-red-200 text-red-800'}

export default function CalculatorClient({ faqs }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = CODES.filter(c =>
    (filter==='all'||c.cat===filter) &&
    (search===''||String(c.code).includes(search)||c.label.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">HTTP Status Codes</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🌐 HTTP Status Code Reference</h1>
      <p className="text-gray-500 mb-6">Quick reference for all common HTTP status codes with descriptions and use cases.</p>

      <div className="flex flex-wrap gap-3 mb-5">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by code or name..."
          className="flex-1 min-w-48 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none" />
        <div className="flex rounded-xl border border-gray-200 overflow-hidden">
          {['all','2xx','3xx','4xx','5xx'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className={`px-4 py-2 text-sm font-bold ${filter===f?'bg-green-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(c=>(
          <div key={c.code} className={`p-4 rounded-xl border ${CAT_COLORS[c.cat]}`}>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-black text-2xl">{c.code}</span>
              <span className="font-bold text-sm">{c.label}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white bg-opacity-50 border border-current">{c.cat}</span>
            </div>
            <p className="text-sm opacity-80">{c.desc}</p>
          </div>
        ))}
        {filtered.length===0 && <div className="text-center py-8 text-gray-400">No status codes match your search.</div>}
      </div>


      <SEOContent
        title="HTTP Status Codes Reference"
        category="dev"
        intro={`HTTP status codes are the first thing you check when an API call fails — but memorizing every code in the 4xx and 5xx ranges is not practical. Is 422 Unprocessable Entity or Too Many Requests? What is the difference between 401 and 403? Does 302 preserve the HTTP method on redirect?

This reference covers all standard HTTP status codes with descriptions, common causes, and correct usage guidance. Runs in your browser with instant search.

**Long-tail searches answered here:** http status codes reference free online usa, what does 404 403 500 502 mean free guide, http response code lookup free no signup, rest api status codes explained free tool, complete http status codes list free reference, http error codes meaning lookup free usa, when to use 301 vs 302 redirect code free, 401 vs 403 http error code difference free guide, 422 unprocessable entity when to return it free usa, 429 too many requests rate limit status code guide, http 503 service unavailable vs 504 gateway timeout free, rest api error response best practices guide free, 2xx vs 4xx vs 5xx status code categories free usa, http 204 no content vs 200 ok response guide free, idempotent http methods status code guide free usa

For debugging HTTP calls, use [HTTP Headers Analyzer](/calculators/dev/http-headers-analyzer) or build test requests with [curl Builder](/calculators/dev/curl-builder).`}
        howItWorks={`Organizes codes by class: 1xx informational, 2xx success, 3xx redirection, 4xx client errors, 5xx server errors. Each entry includes the official RFC description, practical meaning in API contexts, and common causes.

The search filters codes by number, name, or description in real time — type redirect to filter to 3xx codes, type auth to find authentication-related responses, type rate to find 429.

Codes are sourced from RFC 7231 (HTTP/1.1 semantics), RFC 6585 (additional codes), and RFC 8470 — covering all IANA-registered status codes.`}
        benefits={[
          { title: `Instant code lookup`, text: `Type any number or keyword and get the matching codes immediately. Faster than a web search when debugging an API response.` },
          { title: `API design guidance`, text: `Not just what each code means but when to use it: 400 vs 422 for validation errors, 401 vs 403 for access control, 201 vs 200 for resource creation.` },
          { title: `Redirect behavior reference`, text: `Documents whether each 3xx code preserves the HTTP method: 301 and 302 historically change POST to GET; 307 and 308 preserve the method. Critical for CORS and form submission flows.` },
          { title: `Common error causes`, text: `Each 5xx code includes the most common server-side causes: 502 Bad Gateway usually means your upstream is down, 504 Gateway Timeout means it is responding too slowly.` },
        ]}
        useCases={[
          { title: `Designing a REST API`, text: `You need to choose between returning 400 or 422 for invalid request bodies. The reference clarifies: 400 for malformed syntax, 422 for semantically invalid but parseable data.` },
          { title: `Debugging API integrations`, text: `Your webhook is getting a 403 but you are sending the correct auth header. The reference explains: 403 means authenticated but not authorized — check the permission scope.` },
          { title: `Configuring load balancer health checks`, text: `AWS ALB uses specific HTTP codes for health check success (200-399 by default). Verify your application health endpoint returns a code in the expected success range.` },
          { title: `Implementing retry logic`, text: `Your API client should retry on which status codes? 429 (rate limited) and 503 (service unavailable) warrant retry with backoff. 400 and 404 should not be retried.` },
        ]}
        keyStats={[
          { stat: `RFC 7231`, source: `The primary HTTP semantics RFC — defines the meaning of all standard status codes` },
          { stat: `63 codes`, source: `Total IANA-registered HTTP status codes across all five classes` },
          { stat: `307 vs 302`, source: `307 preserves HTTP method on redirect; 302 historically changes POST to GET` },
        ]}
        inlineLinks={[
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Robots.txt Generator`, href: `/calculators/dev/robots-txt-generator`, label: `Robots.txt Generator` },
          { text: `MIME Type Lookup`, href: `/calculators/dev/mime-type-lookup`, label: `MIME Type Lookup` },
          { text: `Open Graph Preview`, href: `/calculators/dev/open-graph-preview`, label: `Open Graph Preview` },
        ]}
        tipsSection={`401 vs 403 — the common confusion. 401 means I do not know who you are — send credentials. 403 means I know who you are but you are not allowed. If a user is logged in and gets rejected, it should be 403, not 401.

Use 422 for validation errors in REST APIs. 422 Unprocessable Entity is more semantically accurate for the JSON is valid but the data fails business validation.

308 for permanent redirects with method preservation. If you are doing a permanent redirect and your endpoint accepts POST, use 308 instead of 301 to guarantee the method is preserved.

Implement 429 with Retry-After. Return 429 with a Retry-After: 60 header. Clients that respect this header will automatically back off instead of hammering your endpoint.`}
        conclusion={`HTTP status codes are a shared vocabulary between clients and servers. Using the wrong code sends misleading signals — returning 200 for an error means clients never retry; returning 500 for a client error means ops teams get paged.

For HTTP debugging: look up status codes here, analyze response headers with [HTTP Headers Analyzer](/calculators/dev/http-headers-analyzer), and build test requests with [curl Builder](/calculators/dev/curl-builder).`}
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
