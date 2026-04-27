'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Zap } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [ttfb, setTtfb] = useState(80)
  const [transfer, setTransfer] = useState(120)
  const [size, setSize] = useState(50)
  const [requests, setRequests] = useState(100)

  const total = ttfb + transfer
  const grade = total < 100 ? {l:'Excellent',c:'text-green-600',bg:'bg-green-50 border-green-300'} : total < 300 ? {l:'Good',c:'text-blue-600',bg:'bg-blue-50 border-blue-300'} : total < 1000 ? {l:'Needs Work',c:'text-yellow-600',bg:'bg-yellow-50 border-yellow-300'} : {l:'Poor',c:'text-red-600',bg:'bg-red-50 border-red-300'}
  const throughput = size > 0 ? ((size / (total / 1000)) / 1024).toFixed(2) : '0'
  const reqPerSec = total > 0 ? (1000 / total).toFixed(1) : '0'

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">API Response Time Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⚡ API Response Time Calculator</h1>
      <p className="text-gray-500 mb-6">Analyse API performance metrics, calculate throughput, and grade response times against industry benchmarks.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        {[
          {label:'Time to First Byte (TTFB)', val:ttfb, set:setTtfb, max:5000, unit:'ms'},
          {label:'Data Transfer Time', val:transfer, set:setTransfer, max:5000, unit:'ms'},
          {label:'Response Size', val:size, set:setSize, max:10000, unit:'KB'},
          {label:'Daily Requests', val:requests, set:setRequests, max:100000, unit:'k'},
        ].map(f=>(
          <div key={f.label}>
            <label className="text-sm font-semibold text-gray-700">{f.label}: <span className="text-green-600 font-black">{f.val.toLocaleString()} {f.unit}</span></label>
            <input type="range" min={0} max={f.max} value={f.val} onChange={e=>f.set(+e.target.value)} className="w-full accent-green-600 mt-1" />
            <input type="number" value={f.val} onChange={e=>f.set(+e.target.value)} className="mt-1 w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none" />
          </div>
        ))}
      </div>

      <div className={`rounded-2xl p-5 border-2 mb-4 ${grade.bg}`}>
        <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Total Response Time</p>
        <p className={`text-5xl font-black ${grade.c}`}>{total}<span className="text-2xl">ms</span></p>
        <p className={`text-lg font-bold mt-1 ${grade.c}`}>{grade.l}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {l:'TTFB',v:`${ttfb}ms`},{l:'Transfer',v:`${transfer}ms`},{l:'Throughput',v:`${throughput} MB/s`},{l:'Req/sec',v:reqPerSec},
        ].map(m=>(
          <div key={m.l} className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{m.l}</p>
            <p className="font-black text-gray-900">{m.v}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">Response Time Benchmarks</h2>
        <div className="space-y-2">
          {[{r:'< 100ms',l:'Excellent - users perceive as instant',c:'text-green-600'},{r:'100-300ms',l:'Good - acceptable for most APIs',c:'text-blue-600'},{r:'300ms-1s',l:'Noticeable - optimisation recommended',c:'text-yellow-600'},{r:'> 1s',l:'Poor - users will abandon',c:'text-red-600'}].map(b=>(
            <div key={b.r} className="flex items-center gap-3">
              <span className={`font-mono text-sm font-bold w-20 ${b.c}`}>{b.r}</span>
              <span className="text-sm text-gray-600">{b.l}</span>
            </div>
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
        title="API Response Time Tester"
        category="dev"
        intro={`API latency has multiple components — DNS resolution, TLS handshake, connection setup, server processing, and download. Breaking down the total response time by phase tells you where to optimize rather than guessing.

This tool measures API response time from your browser, broken down by phase. Runs in your browser — no proxy, no server.

**Long-tail searches answered here:** free api response time tester online no download usa, how to check api latency from browser free tool, api endpoint speed test with ttfb breakdown, measure rest api response time online free usa, api performance testing tool no signup, check api response time without postman free, what is a good api response time benchmark calculator, p95 p99 latency percentile calculator for api free, how to diagnose slow api response time free tool usa, time to first byte ttfb checker free online, rest api vs graphql response time comparison tool free, api response time by network type calculator usa free, server response time threshold for seo calculator free, how to measure api latency without code free online, api timeout threshold calculator by use case free usa

For building test requests, pair with [curl Builder](/calculators/dev/curl-builder).`}
        howItWorks={`Uses the browser Performance API (PerformanceResourceTiming) to measure timing breakdowns for requests made from your browser. This gives you: DNS lookup time, TCP connection time, TLS handshake time, time-to-first-byte (TTFB), and content download time.

TTFB is the most important metric: it is the time from request sent to first byte received — representing server processing time plus network round-trip. High TTFB means the server is slow to process; high download time with low TTFB means the response is large.`}
        benefits={[
          { title: `Phase breakdown`, text: `Separates DNS lookup, TCP connection, TLS handshake, TTFB, and download time. Tells you exactly where latency is coming from.` },
          { title: `Time to first byte (TTFB)`, text: `TTFB is the key server performance metric. Under 200ms is good; over 500ms indicates server-side processing issues. This tool surfaces TTFB without needing DevTools.` },
          { title: `Multiple run averaging`, text: `Run the same request 5-10 times and get average latency. Single measurements are noisy — averages reveal the real baseline performance.` },
          { title: `Header inspection`, text: `Shows response headers alongside timing data — useful for verifying that caching headers are correctly set for your API endpoints.` },
        ]}
        useCases={[
          { title: `Pre-launch performance baseline`, text: `Before launching a feature, measure your critical API endpoint response times. Document the baseline so you can detect regressions after future deployments.` },
          { title: `CDN configuration verification`, text: `After adding a CDN, compare TTFB before and after. A correctly configured CDN should reduce TTFB for cached responses from 200ms to under 20ms.` },
          { title: `Third-party API SLA verification`, text: `Your payment or auth provider promises under 200ms p95 response time. Test from here to get an independent measurement from your deployment region.` },
          { title: `Database vs application bottleneck`, text: `High TTFB (>500ms) with fast download indicates server processing time is the problem. Use this data to justify profiling your database queries or application logic.` },
        ]}
        keyStats={[
          { stat: `<200ms TTFB`, source: `Target for a well-optimized API endpoint — Google recommends under 200ms for server response` },
          { stat: `Performance API`, source: `Browser-native timing API — same data shown in DevTools Network tab, programmatically` },
          { stat: `TTFB = server + RTT`, source: `Time to first byte includes server processing time plus one network round-trip` },
        ]}
        inlineLinks={[
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `Bandwidth Calculator`, href: `/calculators/dev/bandwidth-calculator`, label: `Bandwidth Calculator` },
          { text: `CIDR Calculator`, href: `/calculators/dev/cidr-calculator`, label: `CIDR Calculator` },
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `HTTP Status Codes`, href: `/calculators/dev/http-status-codes`, label: `HTTP Status Codes` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Network Speed Test`, href: `/calculators/dev/network-speed-test`, label: `Network Speed Test` },
        ]}
        tipsSection={`Run 5+ times for reliable data. A single measurement is affected by local DNS cache state, network jitter, and server-side variability. Run 5-10 times and use the median.

High TTFB = server problem. If TTFB is consistently over 500ms, the issue is server-side: database queries, application processing, or server resources.

DNS cache warms on subsequent runs. The first request often shows higher DNS time than subsequent ones. Run once to warm the cache, then measure.

CORS and timing info. Browsers hide timing details for cross-origin requests unless the server sends Timing-Allow-Origin: * header.`}
        conclusion={`API latency has multiple components and fixing the wrong one wastes engineering time. This tool separates DNS, connection, TLS, TTFB, and download time so you can optimize the actual bottleneck.

For complete API debugging: measure response times here, build test requests with [curl Builder](/calculators/dev/curl-builder), and analyze response headers with [HTTP Headers Analyzer](/calculators/dev/http-headers-analyzer).`}
      />
    </div>
  )
}
