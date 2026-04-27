'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc,oct)=>(acc<<8)+parseInt(oct),0)>>>0
}
function intToIp(n: number): string {
  return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.')
}

export default function CalculatorClient({ faqs }: Props) {
  const [ip, setIp] = useState('192.168.1.0')
  const [prefix, setPrefix] = useState(24)
  const [copied, setCopied] = useState<string|null>(null)

  const mask = prefix===0 ? 0 : (~0 << (32-prefix))>>>0
  const network = (ipToInt(ip) & mask)>>>0
  const broadcast = (network | (~mask>>>0))>>>0
  const firstHost = prefix < 31 ? (network+1)>>>0 : network
  const lastHost = prefix < 31 ? (broadcast-1)>>>0 : broadcast
  const hosts = prefix >= 31 ? Math.pow(2,32-prefix) : Math.max(0, Math.pow(2,32-prefix)-2)

  const maskIp = intToIp(mask)
  const networkIp = intToIp(network)
  const broadcastIp = intToIp(broadcast)

  const copy = (val:string,k:string)=>{navigator.clipboard.writeText(val);setCopied(k);setTimeout(()=>setCopied(null),1500)}

  const PRESETS = [
    {label:'Home LAN',ip:'192.168.1.0',prefix:24},
    {label:'Class A',ip:'10.0.0.0',prefix:8},
    {label:'Docker',ip:'172.17.0.0',prefix:16},
    {label:'Loopback',ip:'127.0.0.0',prefix:8},
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">IP Subnet Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🌐 IP Subnet Calculator</h1>
      <p className="text-gray-500 mb-6">Calculate subnet masks, network addresses, broadcast addresses, and usable host ranges for any CIDR block.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex gap-3 mb-4">
          <input value={ip} onChange={e=>setIp(e.target.value)} placeholder="192.168.1.0"
            className="flex-1 font-mono px-3 py-2.5 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-500">/</span>
            <input type="number" min={0} max={32} value={prefix} onChange={e=>setPrefix(+e.target.value)}
              className="w-16 px-2 py-2.5 border-2 border-gray-200 rounded-xl font-black text-center focus:border-green-400 focus:outline-none" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map(p=><button key={p.label} onClick={()=>{setIp(p.ip);setPrefix(p.prefix)}} className="px-3 py-1 text-xs font-bold bg-gray-100 hover:bg-green-50 rounded-lg border border-gray-200">{p.label}</button>)}
        </div>

        <div className="space-y-2">
          {[
            {l:'Network Address',v:networkIp,k:'net'},
            {l:'Subnet Mask',v:maskIp,k:'mask'},
            {l:'Broadcast Address',v:broadcastIp,k:'bc'},
            {l:'First Usable Host',v:intToIp(firstHost),k:'first'},
            {l:'Last Usable Host',v:intToIp(lastHost),k:'last'},
            {l:'Usable Hosts',v:hosts.toLocaleString(),k:'hosts'},
            {l:'CIDR Notation',v:`${networkIp}/${prefix}`,k:'cidr'},
          ].map(item=>(
            <div key={item.k} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">{item.l}</span>
              <div className="flex items-center gap-2">
                <code className="font-mono font-black text-gray-900">{item.v}</code>
                <button onClick={()=>copy(item.v,item.k)} className="p-1 hover:bg-gray-200 rounded">
                  {copied===item.k?<Check className="w-3.5 h-3.5 text-green-600"/>:<Copy className="w-3.5 h-3.5 text-gray-400"/>}
                </button>
              </div>
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
        title="IP Subnet Calculator"
        category="dev"
        intro={`Subnet calculations appear constantly in network configuration: AWS VPC planning, Kubernetes pod CIDR allocation, firewall rule writing, and server network configuration. Getting the network address, broadcast address, and usable host range wrong causes networking issues that are hard to diagnose.

This calculator shows all subnet properties from a CIDR block or IP + subnet mask. Runs in your browser.

**Long-tail searches answered here:** ip subnet calculator free online usa, cidr subnet mask calculator free no signup, network subnet range calculator free tool, how many hosts in a subnet calculator free, subnet calculator for network engineers free, ip address subnet breakdown calculator free usa, subnetting a 192.168 network calculator free, what subnet is 10.0.0.0 slash 8 calculator free, class a b c vs cidr subnetting comparison free usa, vlsm variable length subnet mask calculator free, subnet calculator for aws vpc planning free usa, private ip address ranges 192.168 10 172 free guide, how to manually subnet a network free calculator, broadcast address for subnet calculator free usa, ip subnet calculation practice problems solver free

For CIDR notation, see the [CIDR Calculator](/calculators/dev/cidr-calculator).`}
        howItWorks={`Calculates subnet properties from a CIDR block or IP address + subnet mask: network address, broadcast address, first/last usable host, subnet mask in dotted-decimal and CIDR notation, and total/usable host count. Also splits a larger network into equal subnets and calculates whether two IPs are on the same subnet.`}
        benefits={[
          { title: `Subnet properties from CIDR`, text: `Enter 192.168.10.0/24 and get: network address, broadcast address, first/last usable host, subnet mask, and 254 usable hosts — all at once.` },
          { title: `Subnet mask conversion`, text: `Converts between prefix length (/24) and dotted-decimal subnet masks (255.255.255.0) — both forms are needed depending on your router, firewall, or cloud console.` },
          { title: `Same-subnet check`, text: `Check if two IP addresses are on the same subnet. IP1 & mask == IP2 & mask — the calculator handles the bitwise arithmetic.` },
          { title: `Network subdivision`, text: `Split a larger network (e.g. a /16) into smaller equal subnets of a specified size — useful for VPC subnet planning.` },
        ]}
        useCases={[
          { title: `AWS VPC subnet planning`, text: `Calculate subnet properties before creating VPC subnets in AWS. You cannot resize a subnet after creation.` },
          { title: `Kubernetes network planning`, text: `Kubernetes needs non-overlapping CIDR blocks for pods and services. Calculate here to ensure they do not overlap with your node network.` },
          { title: `Firewall rule creation`, text: `Verifying whether a specific IP address falls within a security group rule CIDR range. Use the same-subnet check here.` },
          { title: `Network documentation`, text: `Generate accurate subnet documentation with network address, broadcast address, and usable host range for your network diagrams.` },
        ]}
        keyStats={[
          { stat: `First and last reserved`, source: `Network address and broadcast address are reserved — a /24 has 254 usable hosts, not 256` },
          { stat: `AWS adds 3 more`, source: `AWS reserves 4 addresses at the start and 1 at the end of each subnet — a /24 has 251 usable IPs in AWS` },
          { stat: `Subnet mask = bit count`, source: `255.255.255.0 = /24 because there are 24 consecutive 1-bits in the subnet mask` },
        ]}
        inlineLinks={[
          { text: `CIDR Calculator`, href: `/calculators/dev/cidr-calculator`, label: `CIDR Calculator` },
          { text: `Bandwidth Calculator`, href: `/calculators/dev/bandwidth-calculator`, label: `Bandwidth Calculator` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
          { text: `chmod Calculator`, href: `/calculators/dev/chmod-calculator`, label: `chmod Calculator` },
          { text: `Network Speed Test`, href: `/calculators/dev/network-speed-test`, label: `Network Speed Test` },
        ]}
        tipsSection={`Subnet mask to CIDR. 255.255.255.0 = /24. 255.255.0.0 = /16. The CIDR prefix length is the count of consecutive 1-bits in the subnet mask.

First and last hosts are reserved. The first address is the network address; the last is the broadcast address. Neither is assignable to a host. A /24 has 254 usable host addresses (256 - 2).

AWS adds 3 more reserved. In AWS VPCs, the first 4 addresses and the last 1 in each subnet are reserved. A /24 in AWS has 251 usable IPs.

Same subnet check. IP1 & mask == IP2 & mask determines if two IPs are on the same subnet — the calculator shows this without manual AND operations.`}
        conclusion={`Subnet calculations underpin VPC design, network configuration, and firewall rules. This calculator handles the bit arithmetic automatically. For CIDR notation: [CIDR Calculator](/calculators/dev/cidr-calculator). For network bandwidth: [Bandwidth Calculator](/calculators/dev/bandwidth-calculator).`}
      />
    </div>
  )
}
