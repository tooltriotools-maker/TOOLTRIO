import { CalculatorBatch45DeepDive } from '@/components/ui/CalculatorBatch45DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Peer-to-Peer Lending Returns Calculator USA 2026 | ToolTrio',
  description: 'Calculate net peer-to-peer lending returns after accounting for expected borrower defaults and platform fees.',
  slug: 'peer-to-peer-lending-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['peer to peer lending calculator','P2P lending returns after default','peer to peer lending risk calculator','P2P investing net yield'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How do defaults affect peer-to-peer lending returns?', answer: 'The advertised interest rate on P2P loans is a gross rate before losses — a meaningful percentage of borrowers will default on any diversified loan portfolio, and those losses directly reduce your net return. A loan portfolio advertising 10% gross interest with a 6% default rate can net considerably less once losses are factored in.' },
  { question: 'Are peer-to-peer lending returns taxed as ordinary income?', answer: 'Yes — interest earned on P2P loans is generally taxed as ordinary income at your marginal tax rate, similar to bank interest, rather than receiving the preferential rates that apply to long-term capital gains or qualified dividends.' },
  { question: 'How can I reduce risk when investing in P2P loans?', answer: 'Diversifying across a large number of small loan positions (rather than concentrating in a few loans) is the standard risk-management approach, since it smooths out the impact of any individual borrower default — most platforms allow fractional investments specifically to enable this kind of diversification.' },
  { question: "How does the calculator turn defaults into losses?", answer: "It multiplies the entered default rate by a fixed 60% loss-given-default assumption. Actual recoveries and collection timing can be very different." },
  { question: "Does the final value include loan prepayments and cash drag?", answer: "No. It assumes a smooth annual compound net return and does not model individual loan amortization, prepayments, idle cash or reinvestment timing." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Real Estate Crowdfunding', href: '/calculators/finance/real-estate-crowdfunding-calculator', icon: '🏢', desc: 'Real Estate Crowdfunding' },
  { name: 'Dividend Growth Portfolio', href: '/calculators/finance/dividend-growth-portfolio-calculator', icon: '💰', desc: 'Dividend Growth Portfolio' },
  { name: 'Municipal Bond Ladder', href: '/calculators/finance/municipal-bond-ladder-calculator', icon: '🏛️', desc: 'Municipal Bond Ladder' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch45DeepDive slug="peer-to-peer-lending-calculator" />
</>
}
