import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Bandwidth Calculator — Transfer Time & Throughput Free',
  description: 'Calculate file transfer time from bandwidth, or required bandwidth for a target transfer time. Supports bits, bytes, KB, MB, GB, TB. Runs in your browser.',
  slug: 'bandwidth-calculator',
  keywords: ['bandwidth calculator online free','download time calculator browser','internet speed calculator','data transfer time tool free','network throughput calculator'],
})

const faqs = [
  { question: 'What is the difference between Mbps and MBps?', answer: "Mbps = megabits per second (lowercase b). MBps = megabytes per second (uppercase B). 1 byte = 8 bits, so 100 Mbps = 12.5 MBps. Internet speeds are always advertised in megabits (Mbps) — a 100 Mbps connection transfers 12.5 megabytes per second. File sizes are in bytes (MB, GB). This is why downloading a 1 GB file on a 100 Mbps connection takes roughly 80 seconds (1,000 MB / 12.5 MBps = 80s), not 10 seconds (1,000 / 100). The bit/byte confusion is one of the most persistent unit misunderstandings in computing." },
  { question: 'Why is my actual download speed slower than my advertised bandwidth?', answer: "Advertised bandwidth is theoretical maximum. Real-world transfers are slower due to: TCP overhead (typically 5-10% of bandwidth used for headers and acknowledgements), protocol overhead (HTTPS, SSH, FTP each add their own overhead), network congestion on shared links, latency-bandwidth product limitations (high latency caps effective throughput even on high-bandwidth links), file system write speed on the receiving end, and distance to the server. A 1 Gbps fiber connection to a server on the other side of the world may only achieve 300-400 Mbps effective throughput due to TCP windowing constraints from high latency." },
  { question: 'How much bandwidth does a video conference call use?', answer: "Zoom, Teams, and Google Meet: 600 Kbps for 1:1 HD video calls, 1.5 Mbps for 1080p. Group calls with multiple participants: 1.5-3 Mbps downstream (receiving many feeds), 600 Kbps upstream (sending your own). For a team with 10 people all on video: plan for 3 Mbps upload per person on the sending side. Audio-only calls use roughly 50-100 Kbps. For office network planning: 5 Mbps per person doing video conferencing is a safe baseline for a shared internet connection." },
  { question: 'How do I calculate how long a database backup will take to transfer?', answer: "Transfer time (seconds) = file size in bits / bandwidth in bits per second. For a 500 GB backup over a 1 Gbps internal network: 500 * 8 * 1000 / 1,000,000,000 = 4,000 seconds = ~67 minutes. At 10 Gbps: ~6.7 minutes. Factor in real-world efficiency (70-80% of theoretical): 1 Gbps effective ≈ 80 minutes, 10 Gbps ≈ 8 minutes. For S3 or cloud storage uploads, AWS recommends S3 Transfer Acceleration and multipart uploads for files over 100 MB — multipart parallelism can approach the full bandwidth limit." },
  { question: 'What bandwidth is needed to stream 4K video?', answer: "Netflix recommends 25 Mbps for 4K Ultra HD. YouTube 4K at 60fps peaks around 20-25 Mbps. Disney+/Apple TV+ 4K Dolby Vision can reach 40-80 Mbps for their premium quality streams. For a household with two simultaneous 4K streams plus general web use, 100 Mbps is comfortable. For live streaming (uploading 4K from a studio): a minimum of 40 Mbps upload is needed, with 80-100 Mbps recommended for headroom. 1080p streaming is much more forgiving: 5-8 Mbps typically sufficient." },
  { question: 'How do I plan bandwidth for an office network?', answer: "A practical rule of thumb for office networks: 5-10 Mbps per knowledge worker for typical office use (email, web, SaaS apps, occasional video calls). For offices with heavy video conferencing: 10-15 Mbps per concurrent video user. For offices with cloud storage sync (Dropbox, OneDrive, Box): add 5-10 Mbps upload capacity per heavy user during peak sync times. Total office bandwidth: (workers * 10 Mbps) * 0.6 concurrent usage factor = baseline. Example: 50 workers = 300 Mbps, so a 500 Mbps or 1 Gbps business connection provides headroom." },
  { question: 'What other network tools are on this site?', answer: "The CIDR Calculator handles IP subnet planning for the network you are sizing bandwidth for. The API Response Time Calculator helps model how latency interacts with effective throughput on high-latency connections. The Network Speed Test measures your actual current bandwidth. The HTTP Status Codes reference is useful when debugging slow connections that are timing out (504 Gateway Timeout). All are in the Dev Tools Network section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Bandwidth Calculator — Transfer Time & Throughput Free',
    description: 'Calculate file transfer time from bandwidth, or required bandwidth for a target transfer time. Supports bits, bytes, KB, MB, GB, TB. Runs in your browser.',
    slug: 'bandwidth-calculator',
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
