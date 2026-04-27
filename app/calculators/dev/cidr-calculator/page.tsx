import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CIDR Calculator — IP Subnet & Network Calculator Free',
  description: 'Calculate network address, broadcast address, subnet mask, host range, and usable IPs from any CIDR block. Essential for AWS VPC, firewall rules, and network planning.',
  slug: 'cidr-calculator',
  keywords: ['cidr calculator online free','cidr to subnet mask browser','cidr notation explained calculator','vpc cidr block calculator','aws cidr calculator free'],
})

const faqs = [
  { question: "What does the /24 mean in a CIDR block like 192.168.1.0/24?", answer: `The /24 is the prefix length — the first 24 of 32 bits are the network portion, the remaining 8 bits are for hosts. /24 leaves 8 bits for hosts: 2^8 = 256 addresses, of which 254 are usable (first is network address, last is broadcast). Common prefix lengths: /32 = single host, /30 = 2 usable hosts (point-to-point links), /29 = 6, /28 = 14, /27 = 30, /26 = 62, /25 = 126, /24 = 254, /23 = 510, /16 = 65,534.` },
  { question: "How do I choose the right CIDR block size for an AWS VPC?", answer: `AWS recommends between /16 (65,536 IPs) and /28 (16 IPs). For a typical production VPC, /16 gives most flexibility. AWS reserves the first 4 IP addresses and last 1 in every subnet, so a /24 subnet has 251 usable addresses. Standard pattern for /16 VPC: create /24 subnets per availability zone per tier. Avoid using 10.0.0.0/8 for the entire VPC — you cannot peer with networks in that same range later.` },
  { question: "What are the private IP address ranges?", answer: `RFC 1918 defines three private ranges not routable on the public internet: 10.0.0.0/8 (16.7 million addresses — preferred for large enterprise networks and VPCs), 172.16.0.0/12 (1 million — often used for Docker and container networking), 192.168.0.0/16 (65,536 — standard for home and small office networks). All cloud VPCs, office networks, and container networks should use one of these. When two networks need to communicate via VPN or peering, their CIDR blocks must not overlap.` },
  { question: "How do I split a /24 network into smaller subnets?", answer: `Each additional bit added to the prefix length halves the addresses. A /24 (256 IPs) can split into: 2x /25 (128 IPs each), 4x /26 (64 each), 8x /27 (32 each), 16x /28 (16 each). To split 192.168.1.0/24 into four /26 subnets: 192.168.1.0/26 (.0–.63), 192.168.1.64/26 (.64–.127), 192.168.1.128/26 (.128–.191), 192.168.1.192/26 (.192–.255). This calculator outputs all values automatically.` },
  { question: "What is the difference between a subnet mask and CIDR prefix length?", answer: `They represent the same information in different formats. /24 CIDR = subnet mask 255.255.255.0. /16 = 255.255.0.0. The mask ANDs with an IP address to extract the network portion: 192.168.1.100 AND 255.255.255.0 = 192.168.1.0 (the network address). CIDR notation (/24) is more compact and universally used in routing tables, firewall rules, and cloud configuration. Subnet mask notation still appears in older network device configuration interfaces.` },
  { question: "How do I check if two IP addresses are in the same subnet?", answer: `AND both IPs with the subnet mask and compare. If results are equal, both are in the same subnet. Example: Is 10.0.1.50 in the same /24 as 10.0.1.200? 10.0.1.50 AND 255.255.255.0 = 10.0.1.0. 10.0.1.200 AND 255.255.255.0 = 10.0.1.0. Same result — yes, same /24. Is 10.0.1.50 in the same /25 (mask 255.255.255.128) as 10.0.1.200? 50 AND 128 = 0, 200 AND 128 = 128 — different subnets.` },
  { question: "What other network tools are on this site?", answer: `The IP Subnet Calculator provides VLSM planning for networks requiring subnets of different sizes. The chmod Calculator handles Unix file permissions — another common infrastructure calculation involving bit operations. The Bandwidth Calculator estimates file transfer times and throughput. The HTTP Status Codes reference covers API gateway and load balancer error codes. All are in the Dev Tools Network section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CIDR Calculator — IP Subnet & Network Calculator Free',
    description: 'Calculate network address, broadcast address, subnet mask, host range, and usable IPs from any CIDR block. Essential for AWS VPC, firewall rules, and network planning.',
    slug: 'cidr-calculator',
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
