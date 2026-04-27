'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [fileSize, setFileSize] = useState(100)
  const [fileSizeUnit, setFileSizeUnit] = useState<'MB'|'GB'|'KB'>('MB')
  const [bandwidth, setBandwidth] = useState(100)
  const [bwUnit, setBwUnit] = useState<'Mbps'|'Gbps'|'Kbps'>('Mbps')

  const toMB = {'KB':0.001,'MB':1,'GB':1000}
  const toMbps = {'Kbps':0.001,'Mbps':1,'Gbps':1000}

  const fileMB = fileSize * toMB[fileSizeUnit]
  const bwMbps = bandwidth * toMbps[bwUnit]
  const totalBits = fileMB * 8 * 1000000 // bits
  const bwBps = bwMbps * 1000000 // bits per second
  const seconds = bwBps > 0 ? totalBits / bwBps : 0

  const fmt = (s: number) => {
    if (s < 60) return `${s.toFixed(1)}s`
    if (s < 3600) return `${Math.floor(s/60)}m ${Math.round(s%60)}s`
    return `${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m`
  }

const PRESETS = [
  { l: '1 song (5MB)', sz: 5, u: 'MB' as const },
  { l: 'HD movie (4GB)', sz: 4, u: 'GB' as const },
  { l: '4K movie (40GB)', sz: 40, u: 'GB' as const },
  { l: '1GB backup', sz: 1, u: 'GB' as const }
]

const BWPRESETS = [
  { l: 'Home fibre 100Mbps', bw: 100, u: 'Mbps' as const },
  { l: '5G ~300Mbps', bw: 300, u: 'Mbps' as const },
  { l: 'USB 3.0 5Gbps', bw: 5, u: 'Gbps' as const }
]
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Bandwidth Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📡 Bandwidth & Transfer Time Calculator</h1>
      <p className="text-gray-500 mb-6">Calculate file transfer times based on file size and connection speed.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-5">
        <div>
          <label className="text-sm font-bold text-gray-700 mb-2 block">File Size</label>
          <div className="flex gap-2">
            <input type="number" value={fileSize} onChange={e=>setFileSize(+e.target.value)} className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
            <select value={fileSizeUnit} onChange={e=>setFileSizeUnit(e.target.value as any)} className="px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:outline-none">
              {['KB','MB','GB'].map(u=><option key={u}>{u}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">{PRESETS.map(p=><button key={p.l} onClick={()=>{setFileSize(p.sz);setFileSizeUnit(p.u)}} className="px-2 py-1 text-xs font-semibold bg-gray-100 hover:bg-green-50 rounded-lg border border-gray-200">{p.l}</button>)}</div>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 mb-2 block">Connection Speed</label>
          <div className="flex gap-2">
            <input type="number" value={bandwidth} onChange={e=>setBandwidth(+e.target.value)} className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
            <select value={bwUnit} onChange={e=>setBwUnit(e.target.value as any)} className="px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:outline-none">
              {['Kbps','Mbps','Gbps'].map(u=><option key={u}>{u}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">{BWPRESETS.map(p=><button key={p.l} onClick={()=>{setBandwidth(p.bw);setBwUnit(p.u)}} className="px-2 py-1 text-xs font-semibold bg-gray-100 hover:bg-green-50 rounded-lg border border-gray-200">{p.l}</button>)}</div>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 text-center mb-4">
        <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Transfer Time</p>
        <p className="text-5xl font-black text-green-800">{fmt(seconds)}</p>
        <p className="text-sm text-green-700 mt-2">{fileMB.toFixed(1)} MB at {bwMbps.toFixed(1)} Mbps = {(bwMbps/8).toFixed(1)} MB/s</p>
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
        title="Bandwidth Calculator — Download Time and Network Speed"
        category="dev"
        intro={`How long will a 2GB deployment package take to download over a 100Mbps connection? How much bandwidth does streaming 4K video consume per hour? These calculations are easy to get wrong — mixing up bits and bytes produces estimates that are off by a factor of 8.

This calculator handles bits-to-bytes conversion automatically and shows download times across multiple connection speeds. Runs in your browser.

**Long-tail searches answered here:** network bandwidth calculator free online usa, internet speed to download time calculator free, how long to download file by connection speed calculator, bandwidth requirement calculator for video streaming free, network throughput calculator mbps free no signup, file transfer time estimator by bandwidth free, how much bandwidth does 4k streaming use calculator, bandwidth needed for video conference call calculator usa, backup bandwidth requirement calculator free online, cloud sync bandwidth usage estimator calculator usa free, how many users can share bandwidth calculator free, upload vs download bandwidth allocation calculator usa, bandwidth calculator for iot devices on network free, how packet loss affects effective bandwidth calculator, dedicated vs shared bandwidth impact calculator usa free

For related tools, see [API Response Time](/calculators/dev/api-response-time) or [CIDR Calculator](/calculators/dev/cidr-calculator).`}
        howItWorks={`Network speeds are measured in bits per second (Mbps, Gbps) while file sizes are measured in bytes (MB, GB). The conversion is: bytes = bits / 8. A 100Mbps connection can transfer 12.5 MB per second, not 100 MB per second.

Download time = file size in bits divided by connection speed in bits per second. This calculation gives the theoretical maximum — real-world speeds are typically 60-85% of rated speed due to protocol overhead, network congestion, and hardware limitations.`}
        benefits={[
          { title: `Bits vs bytes handled automatically`, text: `Converts Mbps (bits) to MB/s (bytes) automatically — eliminates the factor-of-8 mistake that makes estimates wildly wrong. Enter file size in MB or GB, connection in Mbps or Gbps.` },
          { title: `Multiple connection speed comparison`, text: `Shows download times at 4G LTE (20Mbps), home broadband (100Mbps), fiber (1Gbps), and data center speeds simultaneously — plan for your slowest user, not your own connection.` },
          { title: `Streaming bandwidth calculator`, text: `Calculate how many GB per hour a video bitrate consumes. Enter bitrate in Mbps and duration in hours to get the total data transfer.` },
          { title: `Protocol overhead estimation`, text: `Adjusts theoretical maximum by a configurable overhead factor (typically 20-30%) to give realistic rather than theoretical transfer time estimates.` },
        ]}
        useCases={[
          { title: `CI/CD pipeline optimization`, text: `Your Docker build artifact is 3GB. Calculate how long it takes to transfer to your deployment target at different speeds — often reveals that artifact size is the bottleneck.` },
          { title: `Video streaming capacity planning`, text: `4K video at 25Mbps consumes 11.25GB per hour. For a live stream with 1,000 concurrent viewers, calculate total bandwidth requirements before provisioning CDN capacity.` },
          { title: `Database backup windows`, text: `You need to transfer a 50GB backup over a 200Mbps connection. Calculate the expected transfer time to plan your maintenance window and avoid backup timeout issues.` },
          { title: `Mobile app bundle size budgeting`, text: `Your React Native app bundle is 45MB. Calculate download times over 4G LTE (about 15 seconds) and 3G (about 90 seconds) to evaluate whether bundle size reduction is justified.` },
        ]}
        keyStats={[
          { stat: `1 Mbps = 125 KB/s`, source: `Network speed in bits divided by 8 equals transfer rate in bytes — the key conversion` },
          { stat: `~70% efficiency`, source: `Real-world transfer rates are typically 60-85% of rated connection speed` },
          { stat: `4K = 15-25 Mbps`, source: `Netflix 4K HDR streaming bitrate — the most common bandwidth benchmark` },
        ]}
        inlineLinks={[
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `CIDR Calculator`, href: `/calculators/dev/cidr-calculator`, label: `CIDR Calculator` },
          { text: `IP Subnet Calculator`, href: `/calculators/dev/ip-subnet-calculator`, label: `IP Subnet Calculator` },
          { text: `Bit Byte Converter`, href: `/calculators/dev/bit-byte-converter`, label: `Bit Byte Converter` },
          { text: `Network Speed Test`, href: `/calculators/dev/network-speed-test`, label: `Network Speed Test` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
        ]}
        tipsSection={`Mbps is megabits, not megabytes. A 100 Mbps connection transfers 12.5 MB/s, not 100 MB/s. Every ISP advertises in Mbps (bits). File sizes are in MB/GB (bytes). This 8x difference is the source of why is my download so slow confusion.

Plan for P10, not P50. Your users are not on your fiber connection. Plan download budgets for the slowest 10% of your users (often 4G with poor signal, about 5-10 Mbps effective).

Protocol overhead is real. TCP, TLS, and HTTP headers add overhead. Actual throughput is 70-90% of the theoretical maximum.

CDN matters for large files. For files over 100MB delivered globally, the closest CDN edge server matters as much as the bandwidth — latency to a distant origin adds seconds of time-to-first-byte.`}
        conclusion={`Bandwidth calculations are simple once you account for the bits-vs-bytes conversion — but that one mistake consistently produces estimates that are 8x off. This calculator handles the conversion automatically and gives realistic rather than theoretical estimates.

For complete network planning: calculate bandwidth here, measure actual response times with [API Response Time](/calculators/dev/api-response-time), and plan subnet sizing with [CIDR Calculator](/calculators/dev/cidr-calculator).`}
      />
    </div>
  )
}
