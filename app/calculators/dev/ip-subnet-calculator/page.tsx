import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'IP Subnet Calculator — VLSM and Subnetting Free Online',
  description: 'Calculate IP subnets with VLSM (Variable Length Subnet Masking). Divide networks into subnets of different sizes. Essential for network planning. Runs in your browser.',
  slug: 'ip-subnet-calculator',
  keywords: ['ip subnet calculator online free','ipv4 subnetting tool browser','cidr to ip range calculator','subnet mask calculator free','network address calculator online'],
})

const faqs = [
  { question: 'What is VLSM and why is it more efficient than fixed-length subnetting?', answer: "Fixed-length subnetting divides a network into equal-sized subnets. VLSM (Variable Length Subnet Masking) allows different subnet sizes within the same network. Example: you have 192.168.1.0/24 and need subnets for 100 hosts, 50 hosts, and 10 hosts. Fixed /26 (62 usable hosts each): three subnets of 62 hosts each wastes IPs in the smaller subnets. VLSM: /25 (126 hosts) for the 100-host subnet, /26 (62 hosts) for the 50-host subnet, /28 (14 hosts) for the 10-host subnet. VLSM uses the address space far more efficiently. All modern routing protocols (OSPF, EIGRP, BGP) support VLSM." },
  { question: 'How many usable host addresses does a /30 network have and why is it used for point-to-point links?', answer: "A /30 has 4 total addresses: network address, 2 usable hosts, broadcast. The 2 usable addresses are exactly what a point-to-point link needs — one IP for each end of the link. Using a /30 instead of a /29 (6 usable hosts) or /28 (14 usable hosts) conserves IP space. In router-to-router links (between two routers, or router to firewall), a /30 is the standard. For very large networks or where IP space is extremely limited, /31 (2 addresses, no broadcast per RFC 3021) is used — each end takes one address with no wasted network/broadcast addresses." },
  { question: 'What is the difference between the network address and the broadcast address?', answer: "In any subnet, the first address (all host bits = 0) is the network address — it identifies the network itself and cannot be assigned to a host. The last address (all host bits = 1) is the broadcast address — packets sent to it are delivered to all hosts in the subnet. Both are reserved and cannot be used as host addresses. For a /24: 192.168.1.0 is the network address, 192.168.1.255 is broadcast, 192.168.1.1 through 192.168.1.254 are usable (254 hosts). AWS reserves 5 addresses per subnet (first 4 and last 1), further reducing usable count." },
  { question: 'What IP address ranges are reserved and cannot be used on the public internet?', answer: "RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Loopback: 127.0.0.0/8 (localhost). Link-local: 169.254.0.0/16 (APIPA — assigned when DHCP fails). Documentation/examples: 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 (TEST-NET). Multicast: 224.0.0.0/4. Broadcast: 255.255.255.255/32. Shared address space (CGNAT): 100.64.0.0/10. Future use: 240.0.0.0/4. All other ranges are potentially publicly routable. When designing internal networks, only use RFC 1918 ranges to avoid conflicts with public internet routing." },
  { question: 'How does subnetting relate to CIDR notation?', answer: "CIDR (Classless Inter-Domain Routing) is just a compact notation for expressing subnets. 192.168.1.0/24 means: IP address 192.168.1.0 with the first 24 bits being the network portion. Before CIDR (1981-1993), addresses were Class A (/8), Class B (/16), or Class C (/24) with no flexibility. CIDR allowed arbitrary prefix lengths, dramatically extending IPv4\'s lifespan. Route summarization (supernetting) works the same way: multiple /24 networks can be summarized as a /22 when advertising to external routers, reducing routing table size." },
  { question: 'How many subnets can I create from a /24 network?', answer: "Borrowing bits from the host portion creates subnets. From a /24: borrow 1 bit → 2 subnets (/25, 128 hosts each). Borrow 2 bits → 4 subnets (/26, 64 each). Borrow 3 bits → 8 subnets (/27, 32 each). Borrow 4 bits → 16 subnets (/28, 16 each). Borrow 5 bits → 32 subnets (/29, 8 each). Borrow 6 bits → 64 subnets (/30, 4 each). The general formula: number of subnets = 2^borrowed bits. Usable hosts per subnet = 2^remaining host bits - 2 (subtracting network and broadcast addresses)." },
  { question: 'What other network tools are on this site?', answer: "The CIDR Calculator is a companion tool focused on CIDR notation and address range display rather than VLSM planning. The Bandwidth Calculator estimates data transfer capacity for planned network links. The chmod Calculator handles Unix file permission calculations — another bit-math concept common in network administration. The curl Builder generates requests that exercise network endpoints. The HTTP Status Codes reference covers error codes from network services. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'IP Subnet Calculator — VLSM and Subnetting Free Online',
    description: 'Calculate IP subnets with VLSM (Variable Length Subnet Masking). Divide networks into subnets of different sizes. Essential for network planning. Runs in your browser.',
    slug: 'ip-subnet-calculator',
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
