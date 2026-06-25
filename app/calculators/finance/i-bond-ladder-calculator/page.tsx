import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'I-Bond Ladder Calculator USA 2026 — Monthly Purchase Strategy | ToolTrio',
  description: 'Calculate total I-Bond value from monthly purchases, effective yield, and optimal ladder strategy to maximize the $10,000 annual limit.',
  slug: 'i-bond-ladder-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['I bond ladder calculator 2026', 'monthly I bond purchase strategy', 'I bond annual limit calculator', 'series I savings bond ladder', 'I bond vs HYSA 2026'],
})
const faqs = [
  {
    question: 'What is the I-Bond annual purchase limit?',
    answer: '$10,000 per person per year in electronic I-Bonds through TreasuryDirect.gov, plus $5,000 in paper bonds via tax refund. A married couple can purchase $20,000/year. Trusts, LLCs, and businesses have separate $10,000 limits. Some families use multiple entities to exceed the individual limit, but each requires genuine separate tax filing.',
  },
  {
    question: 'How does a monthly I-Bond purchase strategy work?',
    answer: "Instead of buying $10,000 on January 1, spreading purchases across the year (e.g., $833/month) creates a 'ladder' of bonds with different purchase dates — staggering the 5-year penalty-free window and providing more flexible access to funds. Each purchase is independently tracked with its own 12-month lockup and 5-year penalty window.",
  },
  {
    question: 'When is the best month to buy I-Bonds?',
    answer: 'I-Bond rates reset May 1 and November 1. Buying just before a rate reset (late April or late October) locks in 6 months of the current rate before switching. If the new rate is expected to be higher, buy just after the reset. Track CPI-U data released in April and October to forecast the upcoming rate 2-4 weeks before the official announcement.',
  }
]
const relatedCalculators = [
  { name: 'I-Bonds Calculator', href: '/calculators/finance/i-bonds-calculator', icon: '🏛️', desc: 'I-Bonds Calculator' },
  { name: 'Bond Ladder Calculator', href: '/calculators/finance/bond-ladder-calculator', icon: '📊', desc: 'Bond Ladder Calculator' },
  { name: 'Emergency Fund HYSA', href: '/calculators/finance/emergency-fund-hysa-calculator', icon: '🏦', desc: 'Emergency Fund HYSA' },
  { name: 'Municipal Bond Calculator', href: '/calculators/finance/municipal-bond-tax-calculator', icon: '🏛️', desc: 'Municipal Bond Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
