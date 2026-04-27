import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Network Speed Test — Browser-Based Latency and Throughput',
  description: 'Test your download speed, upload speed, and latency directly in the browser. No app download required. Measures real-world throughput to nearby servers.',
  slug: 'network-speed-test',
  keywords: ['network speed test online free','internet speed check browser','ping test tool free','broadband speed checker','latency test online'],
})

const faqs = [
  { question: "How does a browser-based speed test measure speed?", answer: `A browser speed test downloads and uploads test files of known sizes and measures transfer time. Download: fetch a large file (10-100 MB from a CDN) and measure bytes received per second. Upload: POST a generated data payload and measure bytes sent per second. Latency: measure round-trip time for a small request. Results are influenced by: distance to test server, network congestion, device CPU and network adapter, browser overhead, and number of concurrent TCP connections used.` },
  { question: "Why does my measured speed differ between devices?", answer: `Browser-based tests are limited by the device's network adapter, CPU, and memory. Older devices cannot saturate a fast connection — a 1 Gbps fiber link may show 200-400 Mbps on an older laptop. The browser adds overhead compared to native speed test apps. For accurate ISP speed measurement: use wired Ethernet (Wi-Fi adds variability), test on the fastest device you have, close other applications, and run multiple times to average transient fluctuations.` },
  { question: "What upload speed is needed for video conferencing?", answer: `Upload requirements: audio-only: 100-200 Kbps. 480p video: 500 Kbps. 720p HD: 1-1.5 Mbps. 1080p HD: 2-3 Mbps. For reliability, double these as your minimum. Group calls: you upload your stream once to the conferencing server regardless of participant count — 2-3 Mbps upload is usually sufficient for being a presenter in any size meeting.` },
  { question: "What is jitter and how does it affect video calls?", answer: `Jitter is the variation in latency over time. If your connection has 20ms latency at one moment and 80ms at the next, jitter is 60ms. Low jitter means packets arrive at consistent intervals. Video conferencing is especially sensitive to jitter — inconsistent packet timing causes choppy audio and frozen video frames even when average bandwidth and latency are acceptable. Most tools use a jitter buffer to smooth variations, but jitter over 30ms overwhelms the buffer.` },
  { question: "What is the difference between bandwidth and throughput?", answer: `Bandwidth is the theoretical maximum capacity of a network link. Throughput is the actual data rate achieved in practice. Throughput is always less than bandwidth due to: protocol overhead (TCP headers, HTTPS/TLS), retransmission of lost packets, congestion control throttling, and hardware limitations. A 100 Mbps fiber connection typically achieves 80-95 Mbps effective throughput under ideal conditions.` },
  { question: "Why is my measured speed lower than my ISP's advertised speed?", answer: `Advertised speeds are theoretical maximum on the last-mile connection. Real measurements are lower because: Wi-Fi loses 30-60% vs wired Ethernet, distance from router reduces Wi-Fi speed, network congestion during peak hours, protocol overhead consumes 5-20% of bandwidth, and the test server's own capacity limits your result. If your wired-connection speed at off-peak hours is consistently under 60% of advertised, contact your ISP.` },
  { question: "What other network tools are on this site?", answer: `The Bandwidth Calculator estimates file transfer times based on your measured speed. The API Response Time Calculator models application latency. The CIDR Calculator handles IP network planning. The HTTP Headers Analyzer examines caching and compression headers that affect perceived performance. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Network Speed Test — Browser-Based Latency and Throughput',
    description: 'Test your download speed, upload speed, and latency directly in the browser. No app download required. Measures real-world throughput to nearby servers.',
    slug: 'network-speed-test',
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
