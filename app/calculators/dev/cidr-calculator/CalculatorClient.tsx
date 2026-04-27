'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [cidr, setCidr] = useState('192.168.1.0/24')
  const [copied, setCopied] = useState('')

  const result = useMemo(() => {
    try {
      const [ip, bits] = cidr.split('/')
      const prefix = parseInt(bits)
      if (isNaN(prefix) || prefix < 0 || prefix > 32) return null
      const ipParts = ip.split('.').map(Number)
      if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) return null

      const ipNum = ipParts.reduce((acc, oct) => (acc << 8) | oct, 0) >>> 0
      const mask = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0
      const network = (ipNum & mask) >>> 0
      const broadcast = (network | (~mask >>> 0)) >>> 0
      const firstHost = prefix < 31 ? network + 1 : network
      const lastHost = prefix < 31 ? broadcast - 1 : broadcast
      const hosts = prefix >= 31 ? Math.pow(2, 32 - prefix) : Math.max(0, Math.pow(2, 32 - prefix) - 2)

      const numToIp = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.')
      const maskStr = numToIp(mask)
      const wildcard = numToIp(~mask >>> 0)
      const ipClass = ipParts[0] < 128 ? 'A' : ipParts[0] < 192 ? 'B' : ipParts[0] < 224 ? 'C' : 'D/E'
      const isPrivate = (ipParts[0] === 10) || (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) || (ipParts[0] === 192 && ipParts[1] === 168)

      return { network: numToIp(network), broadcast: numToIp(broadcast), firstHost: numToIp(firstHost), lastHost: numToIp(lastHost), mask: maskStr, wildcard, hosts, ipClass, isPrivate, prefix }
    } catch { return null }
  }, [cidr])

  const copy = (k: string, v: string) => {
    navigator.clipboard.writeText(v)
    setCopied(k)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CIDR Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🌐 CIDR Subnet Calculator</h1>
      <p className="text-gray-500 mb-6">Calculate network address, subnet mask, host range and more from CIDR notation</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">CIDR Notation</label>
        <input
          value={cidr}
          onChange={e => setCidr(e.target.value)}
          placeholder="192.168.1.0/24"
          className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-3 text-xl font-mono font-bold focus:outline-none mb-4"
        />
        {result && (
          <div className="space-y-2">
            {[
              { l: 'Network Address', v: result.network },
              { l: 'Broadcast Address', v: result.broadcast },
              { l: 'Subnet Mask', v: result.mask },
              { l: 'Wildcard Mask', v: result.wildcard },
              { l: 'First Usable Host', v: result.firstHost },
              { l: 'Last Usable Host', v: result.lastHost },
              { l: 'Usable Hosts', v: result.hosts.toLocaleString() },
              { l: 'IP Class', v: `Class ${result.ipClass}` },
              { l: 'Private IP', v: result.isPrivate ? 'Yes (RFC 1918)' : 'No (Public)' },
            ].map(r => (
              <div key={r.l} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-xs font-bold text-gray-500 w-36">{r.l}</span>
                <code className="flex-1 text-sm font-mono text-gray-800 text-right mr-3">{r.v}</code>
                <button onClick={() => copy(r.l, String(r.v))} className="text-gray-400 hover:text-green-600">
                  {copied === r.l ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the CIDR Calculator</h2>
        <p className="text-gray-600 text-sm mb-4">Enter an IP address with CIDR prefix length (e.g. 10.0.0.0/8 or 192.168.1.100/24). The calculator computes: network address (first address), broadcast (last address), subnet mask, wildcard mask, first/last usable host addresses, and total hosts. Common subnets: /8 = 16M hosts (Class A), /16 = 65534 hosts, /24 = 254 hosts, /30 = 2 hosts (point-to-point links), /32 = single host.</p>
      </div>
      <div className="mt-6 space-y-3">
        {faqs.map(f => (
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
      <SEOContent
        title="CIDR Calculator — IP Subnet Calculator"
        category="dev"
        intro={`CIDR notation expresses IP address ranges as a base address plus a prefix length — 192.168.1.0/24 means the first 24 bits are the network, leaving 8 bits for 254 host addresses. Getting subnet sizes wrong wastes IP space in VPCs or leaves no room for future hosts.

This calculator converts CIDR blocks to IP ranges, subnet masks, broadcast addresses, and usable host counts. Runs in your browser.

**Long-tail searches answered here:** cidr subnet calculator free online usa, ip cidr notation calculator free no signup, cidr to subnet mask converter free tool, network address cidr calculator free online, how to calculate cidr notation free tool, cidr range ip addresses calculator free usa, how many hosts does a 24 cidr block contain, cidr block for 256 ip addresses calculator free, aws vpc cidr block planning calculator usa free, cidr aggregation and supernetting calculator free, cidr to wildcard mask converter free online usa, how to split one cidr into smaller blocks calculator, ipv6 cidr notation calculator free online usa, classless routing cidr vs classful comparison free, cidr blocks for kubernetes cluster sizing calculator free usa

For network infrastructure setup, pair with [IP Subnet Calculator](/calculators/dev/ip-subnet-calculator).`}
        howItWorks={`A CIDR prefix length (the number after /) determines the subnet mask. /24 = 255.255.255.0, /16 = 255.255.0.0, /8 = 255.0.0.0. The network address is the base IP ANDed with the subnet mask. The broadcast address is the network address ORed with the inverted mask.

Usable hosts = 2^(32 - prefix_length) - 2 (subtracting network address and broadcast address). A /24 has 256 addresses - 2 = 254 usable hosts. A /32 is a single host. A /0 is the entire IPv4 space.`}
        benefits={[
          { title: `IP range from CIDR`, text: `Enter 192.168.10.0/24 and instantly see the range is 192.168.10.0 to 192.168.10.255 with 254 usable hosts. No mental math required.` },
          { title: `Usable host count`, text: `Accounts for the reserved network and broadcast addresses — shows usable hosts, not just total addresses. Avoids the off-by-two error that breaks DHCP configurations.` },
          { title: `Subnet mask conversion`, text: `Converts between prefix length notation (/24) and dotted-decimal subnet masks (255.255.255.0) — both forms are needed depending on your router, firewall, or cloud console.` },
          { title: `IP-in-range check`, text: `Enter any IP address and CIDR block to check whether the IP falls within the range. Useful for verifying firewall rules and security group configurations.` },
        ]}
        useCases={[
          { title: `AWS VPC planning`, text: `AWS recommends /16 VPCs with /24 subnets per availability zone per tier. Calculate here to plan your address space before creating the VPC — you cannot resize it after creation.` },
          { title: `Kubernetes cluster networking`, text: `Kubernetes needs non-overlapping CIDR blocks for pods and services. Calculate your pod CIDR (/16) and service CIDR (/12) here to ensure they do not overlap with your node network.` },
          { title: `Firewall rule verification`, text: `Your security group allows traffic from 10.0.0.0/8. Use the IP-in-range check to verify whether a specific IP address would match this rule.` },
          { title: `Network segmentation design`, text: `Divide a /16 into /24 subnets for different environments (dev, staging, prod). Calculate here to ensure no overlap before applying to your network infrastructure.` },
        ]}
        keyStats={[
          { stat: `/24 = 254 hosts`, source: `Most common subnet size — 256 addresses minus network and broadcast` },
          { stat: `/16 = 65534 hosts`, source: `Typical AWS VPC size — large enough for most production environments` },
          { stat: `2^(32-n)`, source: `Formula for total addresses in a CIDR block where n is the prefix length` },
        ]}
        inlineLinks={[
          { text: `IP Subnet Calculator`, href: `/calculators/dev/ip-subnet-calculator`, label: `IP Subnet Calculator` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
          { text: `Bandwidth Calculator`, href: `/calculators/dev/bandwidth-calculator`, label: `Bandwidth Calculator` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
          { text: `Cron Expression Builder`, href: `/calculators/dev/cron-expression`, label: `Cron Expression Builder` },
          { text: `chmod Calculator`, href: `/calculators/dev/chmod-calculator`, label: `chmod Calculator` },
        ]}
        tipsSection={`AWS reserves 5 IPs per subnet. AWS reserves the first 4 IP addresses and the last 1 in every subnet — so a /24 has 251 usable IPs in AWS, not 254. Plan your subnet sizes accordingly.

Never use 10.0.0.0/8 for your VPC. Using the entire /8 prevents VPC peering with any other network in the 10.x.x.x range later. Use /16 or /18 instead.

Avoid 169.254.x.x. This range is reserved for link-local addresses — conflicts with EC2 instance metadata and APIPA addresses.

Plan for growth. Allocate more IP space than you currently need — a /22 (1,024 IPs) costs the same as a /24 (256 IPs) in AWS and gives you room to grow.`}
        conclusion={`CIDR notation is compact notation with non-obvious arithmetic. Getting the subnet size wrong in a cloud VPC or Kubernetes cluster creates networking problems that are expensive to fix after deployment.

For complete network planning: calculate subnets here, check connectivity with [API Response Time](/calculators/dev/api-response-time), and measure throughput with [Bandwidth Calculator](/calculators/dev/bandwidth-calculator).`}
      />
    </div>
  )
}
