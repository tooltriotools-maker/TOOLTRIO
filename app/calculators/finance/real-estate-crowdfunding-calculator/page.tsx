import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Real Estate Crowdfunding Calculator USA 2026 | ToolTrio',
  description: 'Calculate real estate crowdfunding returns including dividends, appreciation, platform fees, and preferred return structures.',
  slug: 'real-estate-crowdfunding-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['real estate crowdfunding calculator','crowdfunded real estate returns','preferred return calculator real estate','real estate crowdfunding fees'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is a \'preferred return\' in real estate crowdfunding?', answer: 'A preferred return is a minimum annual return promised to investors before the sponsor/manager takes their profit share — for example, an 8% preferred return means investors receive the first 8% of profits, with any additional gains split between investors and the sponsor according to the deal\'s structure.' },
  { question: 'How do platform fees affect real estate crowdfunding returns?', answer: 'Crowdfunding platforms typically charge annual asset management fees (often around 1-2%) on top of the sponsor\'s own profit share — these layered fees can meaningfully reduce net investor returns compared to the gross returns advertised for the underlying property.' },
  { question: 'Is real estate crowdfunding as liquid as REITs or stocks?', answer: 'No — most real estate crowdfunding investments are illiquid, typically locking up capital for the deal\'s hold period (often 3-7 years or more) with no ability to sell on a public exchange, unlike publicly traded REITs which can be bought and sold daily.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Investment Property Leverage', href: '/calculators/finance/investment-property-leverage-calculator', icon: '🏘️', desc: 'Investment Property Leverage' },
  { name: 'Peer-to-Peer Lending', href: '/calculators/finance/peer-to-peer-lending-calculator', icon: '🤝', desc: 'Peer-to-Peer Lending' },
  { name: 'Cap Rate Calculator', href: '/calculators/finance/cap-rate-calculator', icon: '🏘️', desc: 'Cap Rate' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
