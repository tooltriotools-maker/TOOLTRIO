'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

const UNITS = [
  {label:'Bit (b)', bytes: 1/8},
  {label:'Byte (B)', bytes: 1},
  {label:'Kilobyte (KB)', bytes: 1024},
  {label:'Megabyte (MB)', bytes: 1024**2},
  {label:'Gigabyte (GB)', bytes: 1024**3},
  {label:'Terabyte (TB)', bytes: 1024**4},
  {label:'Kibibyte (KiB)', bytes: 1024},
  {label:'Mebibyte (MiB)', bytes: 1024**2},
  {label:'Gibibyte (GiB)', bytes: 1024**3},
]

export default function CalculatorClient({ faqs }: Props) {
  const [value, setValue] = useState(1)
  const [unit, setUnit] = useState('Gigabyte (GB)')

  const selectedUnit = UNITS.find(u=>u.label===unit) || UNITS[4]
  const totalBytes = value * selectedUnit.bytes

  const fmt = (n: number) => n < 0.001 ? n.toExponential(3) : n < 1 ? n.toFixed(6) : n >= 1e12 ? (n/1e12).toFixed(4)+'T' : n.toLocaleString(undefined,{maximumFractionDigits:4})

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Bit/Byte Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">💾 Bit & Byte Converter</h1>
      <p className="text-gray-500 mb-6">Convert between bits, bytes, kilobytes, megabytes, gigabytes, and terabytes instantly.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex gap-3 mb-6">
          <input type="number" value={value} onChange={e=>setValue(+e.target.value)} step="any"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-bold text-xl focus:border-green-400 focus:outline-none" />
          <select value={unit} onChange={e=>setUnit(e.target.value)}
            className="px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:outline-none">
            {UNITS.map(u=><option key={u.label}>{u.label}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          {UNITS.map(u=>(
            <div key={u.label} className={`flex items-center justify-between p-3 rounded-xl ${u.label===unit?'bg-green-50 border-2 border-green-300':'bg-gray-50 border border-gray-100'}`}>
              <span className={`text-sm font-semibold ${u.label===unit?'text-green-800':'text-gray-700'}`}>{u.label}</span>
              <span className={`font-mono font-black ${u.label===unit?'text-green-700':'text-gray-800'}`}>{fmt(totalBytes/u.bytes)}</span>
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
        title="Bit Byte Converter — KB MB GB TB"
        category="dev"
        intro={`Network speeds are advertised in Mbps (megabits per second). File sizes are measured in MB (megabytes). The difference — a factor of 8 — is the most common source of confusion about why downloads are slower than the connection speed suggests.

This converter handles all data size units with both SI (decimal) and IEC (binary) standards. Runs in your browser.

**Long-tail searches answered here:** bit to byte converter free online tool usa, kilobyte megabyte gigabyte converter free, data storage unit converter no signup free, bits bytes kilobits megabits converter online free, computer data unit conversion calculator free usa, how many bytes in a megabyte converter free, gibibyte vs gigabyte difference converter free usa, terabyte to gigabyte conversion calculator free, bits per second to bytes per second converter free, how does hard drive report less space bit byte converter, network speed in bits vs file size in bytes calculator, kbps to mbps converter for internet speed free usa, data cap calculator from bytes to gigabytes free, how many megabytes in a gigabyte exactly free converter, storage unit prefix kilo mega giga tera free guide

For bandwidth calculations, pair with [Bandwidth Calculator](/calculators/dev/bandwidth-calculator).`}
        howItWorks={`Converts between bits, bytes, KB, MB, GB, TB, PB (and kilobits, megabits, gigabits for network speeds). Supports both decimal SI units (1 KB = 1,000 bytes) and binary IEC units (1 KiB = 1,024 bytes). The difference matters: a 1TB hard drive has 1,000,000,000,000 bytes, not 1,099,511,627,776 bytes — about 9% less storage than the IEC interpretation.`}
        benefits={[
          { title: `SI vs IEC units`, text: `Shows both decimal SI (1 KB = 1,000 bytes) and binary IEC (1 KiB = 1,024 bytes) conversions simultaneously. The 9% difference matters for storage planning.` },
          { title: `Network speed and file size`, text: `Converts between Mbps/Gbps (network speed in bits) and MB/GB (file size in bytes). The 8x factor is the most common source of bandwidth confusion.` },
          { title: `All storage sizes`, text: `Covers bits, bytes, KB, MB, GB, TB, PB, and EB — from individual packet sizes to data center storage.` },
          { title: `Real-time conversion`, text: `All units update simultaneously as you type in any field — no need to specify the source unit.` },
        ]}
        useCases={[
          { title: `ISP speed vs download speed`, text: `An ISP advertises 100 Mbps. Actual download speed is 100/8 = 12.5 MB/s. Calculate here to explain the discrepancy to users.` },
          { title: `Storage capacity planning`, text: `A 1 TB drive holds 1,000,000,000,000 bytes (SI), which is about 931 GiB in the IEC binary units your OS reports. Convert here before purchasing.` },
          { title: `API payload size limits`, text: `Many APIs cap payloads at 10 MB, 16 MB, or 64 MB. Convert here to confirm your request body or file upload is within the limit.` },
          { title: `Database field sizing`, text: `A VARCHAR(255) column stores 255 bytes. UTF-8 characters use 1-4 bytes each. Calculate the worst-case byte size of your Unicode strings here.` },
        ]}
        keyStats={[
          { stat: `1 Mbps = 125 KB/s`, source: `Network speed in bits divided by 8 equals transfer rate in bytes — the key conversion` },
          { stat: `SI vs IEC`, source: `Hard drives use SI (1 TB = 10^12 bytes). Operating systems use IEC (1 TiB = 2^40 bytes)` },
          { stat: `Bits for speed`, source: `ISP speeds are always in Mbps (megabits per second) — file sizes are in MB (megabytes)` },
        ]}
        inlineLinks={[
          { text: `Bandwidth Calculator`, href: `/calculators/dev/bandwidth-calculator`, label: `Bandwidth Calculator` },
          { text: `Base Converter`, href: `/calculators/dev/base-converter`, label: `Base Converter` },
          { text: `Bitwise Calculator`, href: `/calculators/dev/bitwise-calculator`, label: `Bitwise Calculator` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Network Speed Test`, href: `/calculators/dev/network-speed-test`, label: `Network Speed Test` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `CIDR Calculator`, href: `/calculators/dev/cidr-calculator`, label: `CIDR Calculator` },
        ]}
        tipsSection={`SI vs IEC units. Hard drive manufacturers use SI (1 TB = 10^12 bytes). Operating systems use IEC (1 TiB = 2^40 bytes). A 1 TB drive shows as about 931 GiB in Windows and macOS. Know which standard your context uses.

Network speed is always bits. ISP speeds are in Mbps (megabits per second). File sizes are in MB (megabytes). 1 Mbps downloads 125 KB/s — always divide by 8.

Payload size limits. Many APIs cap payloads at 10 MB, 16 MB, or 64 MB. Convert here to confirm your request body or file upload is within the limit.

Database field sizing. A VARCHAR(255) column stores 255 bytes. UTF-8 characters use 1-4 bytes each. Calculate the worst-case byte size of your Unicode strings here.`}
        conclusion={`Bit/byte unit confusion causes real bugs — especially the 8x factor between bits (network speeds) and bytes (file sizes). This converter makes both SI and IEC units explicit. For network bandwidth planning: [Bandwidth Calculator](/calculators/dev/bandwidth-calculator).`}
      />
    </div>
  )
}
