import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'API Response Time Calculator — Latency & Performance Tool',
  description: 'Calculate API response time budgets, latency breakdowns, and throughput. Plan SLA targets. Runs entirely in your browser.',
  slug: 'api-response-time',
  keywords: ['api response time tester online free','measure api latency browser','test api endpoint speed','api performance checker free','rest api response time tool'],
})

const faqs = [
  { question: 'What is the difference between latency and throughput?', answer: 'Latency is the time for a single request to complete — from the client sending the request to receiving the full response. Throughput is the number of requests completed per unit time. A system can have high throughput but high latency (many requests processed per second, but each individual request takes a long time) or low latency but low throughput (each request is fast, but the system can only handle a few at once). For user-facing APIs, latency is the primary concern — a 2-second response feels slow regardless of how many other users are being served simultaneously.' },
  { question: 'What are realistic API latency targets for different scenarios?', answer: 'P50/P99 latency targets: User-facing read APIs (product listings, search): P50 under 100ms, P99 under 500ms. Write APIs (order placement, form submission): P50 under 200ms, P99 under 1000ms. Internal microservice calls: P50 under 20ms, P99 under 100ms. Database queries (simple): under 10ms. Database queries (complex joins): under 50ms. Third-party API calls: P50 under 500ms, P99 under 2000ms (with retry logic). Real-time features (WebSocket messages): under 100ms round-trip for good UX. P99 (the 99th percentile — 1% of requests are slower) is more important than average/P50 for user experience because slow outliers disproportionately affect perceived performance.' },
  { question: 'What causes high API latency?', answer: 'Common culprits: N+1 query problem (making one database query per item in a loop instead of one batch query). Missing database indexes (table scans instead of index lookups). Synchronous blocking calls (waiting for external services in series rather than parallel). Large response payloads (serialising unnecessary data). Network distance (geographic distance between client and server adds ~1ms per 100km). Cold starts (serverless functions that have not run recently). Garbage collection pauses (common in Java/JVM languages). The first two (N+1 queries and missing indexes) account for the majority of unexpected API latency in typical web applications.' },
  { question: 'What is the 95th vs 99th percentile and why does it matter?', answer: 'Percentile metrics measure the latency that X% of requests complete within. P95 = 95% of requests complete within this time. P99 = 99% complete within this time. The gap between P50 and P99 reveals tail latency — how badly the slowest requests perform. A P50 of 50ms and P99 of 2000ms means 1% of users wait over 2 seconds. At 1000 requests per second, that is 10 users per second experiencing 2s latency. High tail latency is often caused by garbage collection, lock contention, or resource exhaustion that affects only some requests. Optimising P99 is harder but more impactful for user experience than optimising the average.' },
  { question: 'How do I set a realistic SLA (Service Level Agreement) for an API?', answer: 'Measure current performance first — run a load test to get real P50, P95, P99 numbers at your expected traffic volume. Then set targets 20-30% better than current P99 to give yourself a buffer. Common SLA structure: Availability (uptime): 99.9% (8.7 hours downtime/year) for standard services, 99.99% (52 minutes/year) for critical services. Latency: P95 under 500ms, P99 under 1000ms for user-facing APIs. Error rate: under 0.1% for 5xx errors. Define these with your team before launch — retrofitting SLA compliance into an existing system is significantly harder.' },
  { question: 'Is my data sent to a server?', answer: 'No — all calculations happen in your browser. Nothing is transmitted.' },
  { question: 'What other API and network tools are on this site?', answer: 'The HTTP Status Codes reference explains the status codes your API returns. The Curl Builder generates test commands for your endpoints. The JSON Formatter formats API response payloads for inspection. The Bandwidth Calculator estimates data transfer requirements. All are in the Dev Tools section.' },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'API Response Time Calculator — Latency & Performance Tool',
    description: 'Calculate API response time budgets, latency breakdowns, and throughput. Plan SLA targets. Runs entirely in your browser.',
    slug: 'api-response-time',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
