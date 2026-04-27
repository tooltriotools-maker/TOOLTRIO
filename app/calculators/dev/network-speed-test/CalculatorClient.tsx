'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, Wifi, Download, Upload, Clock } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

const FILE_SIZES = [1, 5, 10, 50, 100, 500, 1000]
const SPEEDS = [
  { label: '3G Slow', mbps: 1, icon: '📶' },
  { label: '3G Fast', mbps: 5, icon: '📶' },
  { label: '4G LTE', mbps: 20, icon: '📶' },
  { label: '5G Sub-6', mbps: 100, icon: '📶' },
  { label: '5G mmWave', mbps: 1000, icon: '📶' },
  { label: 'WiFi 2.4GHz', mbps: 50, icon: '📡' },
  { label: 'WiFi 5GHz', mbps: 300, icon: '📡' },
  { label: 'WiFi 6 (AX)', mbps: 600, icon: '📡' },
  { label: 'Fiber 100M', mbps: 100, icon: '🔌' },
  { label: 'Fiber 1G', mbps: 1000, icon: '🔌' },
  { label: 'Custom', mbps: 0, icon: '⚙️' },
]

function formatTime(seconds: number): string {
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`
  if (seconds < 60) return `${seconds.toFixed(1)} sec`
  if (seconds < 3600) return `${Math.floor(seconds/60)}m ${Math.round(seconds%60)}s`
  return `${Math.floor(seconds/3600)}h ${Math.floor((seconds%3600)/60)}m`
}

export default function CalculatorClient({ faqs }: Props) {
  const [selectedSpeed, setSelectedSpeed] = useState(3) // 4G LTE
  const [customMbps, setCustomMbps] = useState(50)
  const [copied, setCopied] = useState('')
  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  const mbps = SPEEDS[selectedSpeed].mbps || customMbps
  const mbytesPerSec = mbps / 8

  const calcTime = (sizeMB: number) => formatTime(sizeMB / mbytesPerSec)

  const COMMON_FILES = [
    { label: 'Web page (avg)', mb: 2.1, icon: '🌐' },
    { label: 'Email with attachment', mb: 5, icon: '📧' },
    { label: 'MP3 song (4 min)', mb: 4, icon: '🎵' },
    { label: 'HD photo (JPEG)', mb: 8, icon: '📷' },
    { label: 'App update (mobile)', mb: 50, icon: '📱' },
    { label: 'HD video (1 min)', mb: 150, icon: '🎬' },
    { label: 'App install (PC game)', mb: 1000, icon: '🎮' },
    { label: '4K movie (2 hr)', mb: 50000, icon: '🎥' },
    { label: 'iOS backup (avg)', mb: 5000, icon: '🍎' },
    { label: 'Full HD Zoom meeting (1hr)', mb: 750, icon: '💻' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Network Speed Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📡 Network Speed & File Transfer Calculator</h1>
      <p className="text-gray-500 mb-6">Calculate file download/upload times at any connection speed. Compare 3G, 4G, 5G, WiFi, and fiber speeds for common file sizes.</p>

      {/* Speed selector */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-5">
        <h2 className="font-bold text-gray-900 mb-3">Select Connection Speed</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3">
          {SPEEDS.map((s, i) => (
            <button key={i} onClick={() => setSelectedSpeed(i)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${selectedSpeed===i?'bg-blue-600 border-blue-600 text-white':'border-gray-200 hover:border-blue-300'}`}>
              <p className="text-xs font-bold">{s.label}</p>
              <p className={`text-sm font-black ${selectedSpeed===i?'text-blue-200':'text-gray-500'}`}>
                {s.mbps ? `${s.mbps >= 1000 ? `${s.mbps/1000}Gbps` : `${s.mbps}Mbps`}` : 'Custom'}
              </p>
            </button>
          ))}
        </div>
        {selectedSpeed === SPEEDS.length - 1 && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-gray-600">Custom speed:</label>
            <input type="number" value={customMbps} min={0.1} step={0.1}
              onChange={e => setCustomMbps(parseFloat(e.target.value) || 1)}
              className="w-32 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-mono focus:border-blue-400 focus:outline-none" />
            <span className="text-sm text-gray-500">Mbps</span>
          </div>
        )}
        <div className="mt-3 p-3 bg-blue-50 rounded-xl">
          <p className="text-sm font-bold text-blue-800">
            Selected: <span className="font-black">{SPEEDS[selectedSpeed].label}</span> - {mbps >= 1000 ? `${mbps/1000} Gbps` : `${mbps} Mbps`} = {mbytesPerSec.toFixed(1)} MB/s
          </p>
        </div>
      </div>

      {/* Common file download times */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-5">
        <h2 className="font-bold text-gray-900 mb-3">Download Times for Common Files</h2>
        <div className="space-y-2">
          {COMMON_FILES.map(f => {
            const timeStr = calcTime(f.mb)
            return (
              <div key={f.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group hover:bg-blue-50 transition-colors">
                <span className="text-lg flex-shrink-0">{f.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{f.label}</p>
                  <p className="text-xs text-gray-500">{f.mb >= 1000 ? `${(f.mb/1000).toFixed(1)} GB` : `${f.mb} MB`}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-blue-700 text-sm">{timeStr}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Custom file size */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-5">
        <h2 className="font-bold text-gray-900 mb-3">Custom File Size Calculator</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[1,5,10,50,100,500,1000,5000].map(mb => (
            <div key={mb} className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-xs font-bold text-gray-500">{mb >= 1000 ? `${mb/1000} GB` : `${mb} MB`}</p>
              <p className="font-black text-blue-700 text-sm">{calcTime(mb)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Speed comparison */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Speed Reference - 100MB File</h2>
        <div className="space-y-2">
          {SPEEDS.filter(s => s.mbps > 0).map(s => {
            const t = 100 / (s.mbps / 8)
            const maxT = 100 / (1 / 8)
            const pct = Math.min(100, 100 - (t / maxT * 100))
            return (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 w-20 flex-shrink-0">{s.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.max(2, pct)}%` }} />
                </div>
                <span className="text-xs font-bold text-gray-700 w-16 text-right flex-shrink-0">{formatTime(t)}</span>
              </div>
            )
          })}
        </div>
      </div>

      <SEOContent title="Network Speed Calculator" category="dev"
        intro="The Network Speed Calculator tells you exactly how long it will take to download or upload any file size at any internet connection speed - from slow 3G mobile networks to gigabit fiber. Compare 3G, 4G LTE, 5G, WiFi 6, and fiber speeds side-by-side for common file types like videos, apps, photos, and backups.\n\nUnderstanding file transfer times is essential for web developers optimizing page load performance, mobile app developers sizing assets for cellular networks, IT administrators planning backups and deployments, and anyone making decisions about file sizes, video encoding, or data transfer strategies.

**Long-tail searches answered here:** network speed test free online usa, internet connection speed checker free no signup, download upload speed test free tool, broadband speed test no account free, how fast is my internet free speed test, ping latency test free online usa, wifi vs ethernet speed difference test free usa, what internet speed do i need for streaming calculator, upload speed slow vs download speed test usa free, jitter and latency test for gaming free online, fiber vs cable internet speed test comparison free, how to test network speed from terminal linux free, what is a good upload speed for zoom calls free usa, internet speed test for rural areas free online, bufferbloat test internet quality measurement free usa"
        howItWorks="The calculation is straightforward: Time = File Size (MB) / Speed (MB/s). Network speeds are measured in megabits per second (Mbps) while file sizes are in megabytes (MB). Since 1 byte = 8 bits, a 100 Mbps connection transfers 12.5 MB per second. This tool handles the conversion automatically, presenting results in the most human-readable time format (milliseconds, seconds, minutes, or hours)."
        benefits={[
          { title: 'All Connection Types', text: 'Covers 3G, 4G LTE, 5G Sub-6, 5G mmWave, WiFi 2.4GHz/5GHz/6 (AX), 100Mbps fiber, and 1Gbps fiber - plus custom speed input for any value.' },
          { title: 'Real-World File Examples', text: 'Pre-calculated times for 10 common real-world file types: web pages, photos, videos, mobile apps, iOS backups, and 4K movies.' },
          { title: 'Speed Comparison Chart', text: 'Visual comparison of all speeds for the same 100MB file shows the relative performance difference between network types at a glance.' },
          { title: 'Custom Speed Input', text: 'Enter any Mbps value for custom ISP speeds, dedicated leased lines, or historical connection speeds for comparison purposes.' },
          { title: 'Instant Calculation', text: 'All calculations update immediately when you change the connection speed - no button clicking, instant side-by-side comparison.' },
          { title: 'Complete Unit Handling', text: 'Automatically converts between megabits and megabytes, and formats output as milliseconds, seconds, minutes, or hours based on the magnitude.' },
        ]}
        useCases={[
          { title: 'Web Performance Optimization', text: 'Calculate how long your page will take to load on a 3G connection and set file size budgets for images, fonts, and JavaScript bundles accordingly.' },
          { title: 'Video Content Planning', text: 'Determine appropriate video bitrates and resolutions for different audiences - a 4K video file may be impractical for users on 4G networks.' },
          { title: 'App Store Asset Sizing', text: 'Apple App Store and Google Play have download size warnings at 200MB. Calculate whether your app\'s download size will hit that threshold.' },
          { title: 'Backup & Disaster Recovery Planning', text: 'Estimate how long backup jobs will take over WAN connections and plan backup windows accordingly for IT infrastructure management.' },
          { title: 'ISP Selection', text: 'Compare practical download times for your common file types between different ISP speed tiers to evaluate whether upgrading is worth the cost.' },
          { title: 'CDN & Asset Delivery', text: 'Make data-driven decisions about CDN configurations, file compression targets, and asset loading strategies for global audiences on varying connections.' },
        ]}
        tipsSection={`Real-world speeds are typically 60-80% of theoretical maximum speeds due to protocol overhead, network congestion, and hardware limitations. Use 70% of the advertised speed for realistic estimates.\n\nFor web pages, aim for a total page weight under 1MB for good mobile performance. Google recommends pages load in under 2.5 seconds on LTE - at 20 Mbps (2.5 MB/s), that's a 6MB budget including all resources.\n\nFor video streaming, Netflix recommends 25 Mbps for 4K UHD, 5 Mbps for HD 1080p, and 3 Mbps for SD 480p. Use this calculator to verify your connection can sustain these rates before setting streaming quality settings.

For developers building data-heavy applications, always test your UI at simulated 3G speeds using browser DevTools. In Chrome DevTools, open the Network tab and use the throttling dropdown to simulate Slow 3G (400ms RTT, 400Kbps) or Fast 3G (150ms RTT, 1.5Mbps). Most American users on mobile still experience these speeds in rural areas or congested environments.

When comparing ISP plans, look at both download speed AND latency (ping). A 100Mbps connection with 200ms latency will feel slower for interactive applications (video calls, online gaming, remote desktop) than a 50Mbps connection with 10ms latency. For streaming and downloading, bandwidth wins; for real-time applications, latency matters more.

Data caps are also critical for heavy users - even a fast 1Gbps connection is limited if your ISP caps you at 1TB/month. At 1Gbps full speed, you'd hit 1TB in about 2.2 hours of continuous downloading. Practical sustained usage is 10-20% of peak speed, making caps a real constraint for power users and families with multiple streaming devices.`}
        scienceSection={`Network speed is measured in bits per second (bps) rather than bytes because telecommunications infrastructure was originally designed for voice transmission, which measures signal capacity in bits. The convention persists: Internet Service Providers advertise speeds in Mbps (megabits per second), while file sizes are measured in MB (megabytes). This consistent source of confusion costs developers countless hours debugging "slow downloads" that are actually correct given the unit conversion.

The FCC defines broadband in the United States as minimum 25 Mbps download / 3 Mbps upload (2015 definition, under review for potential increase to 100/20 Mbps). The average US home internet speed in 2024 is approximately 230 Mbps download according to the FCC Broadband Report, while mobile LTE/5G averages 40-200 Mbps depending on carrier and location.

Akamai's State of the Internet reports and Ookla's Speedtest Intelligence provide the most comprehensive global network speed data. According to Ookla (2024), South Korea leads global fixed broadband at 260 Mbps median download, the US ranks approximately 12th at 200 Mbps, while median mobile speeds range from 15-50 Mbps globally.`}
        conclusion="The Network Speed Calculator makes data transfer planning quantitative and precise. Whether you're optimizing web performance, planning backups, or choosing an ISP tier, make decisions based on calculated time estimates rather than vague impressions."
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
          <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
        </details>)}
      </div>
    </div>
  )
}
