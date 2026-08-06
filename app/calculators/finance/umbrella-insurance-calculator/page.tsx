import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Umbrella Insurance Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much umbrella liability insurance you may need based on your net worth versus your existing auto and home liability coverage limits.',
  slug: 'umbrella-insurance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['umbrella insurance calculator','how much umbrella insurance do I need','umbrella policy coverage gap calculator','personal liability umbrella insurance'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much umbrella insurance coverage do I need?', answer: 'A common guideline is to carry umbrella coverage at least equal to your net worth, since a liability judgment beyond your existing auto and homeowners policy limits could otherwise put your personal assets at risk — many people carry $1-2 million in umbrella coverage as a starting point.' },
  { question: 'Does umbrella insurance require minimum underlying auto and home coverage?', answer: 'Yes — umbrella insurers typically require you to carry specific minimum liability limits on your auto and homeowners policies (often $250,000-$300,000) before they\'ll issue an umbrella policy, since the umbrella policy only kicks in after those underlying limits are exhausted.' },
  { question: 'Is umbrella insurance expensive?', answer: 'Umbrella insurance is generally inexpensive relative to the coverage it provides — a $1 million policy often costs a few hundred dollars per year, making it one of the more cost-effective ways to protect accumulated assets from a large liability claim.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Life Insurance Needs', href: '/calculators/finance/life-insurance-needs-calculator', icon: '🛡️', desc: 'Life Insurance Needs' },
  { name: 'Insurance by Life Stage', href: '/calculators/finance/insurance-by-life-stage-calculator', icon: '🛡️', desc: 'Insurance by Life Stage' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💰', desc: 'Net Worth' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
