import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Bond Ladder Calculator USA 2026 — CD and Treasury Ladder | ToolTrio',
  description: 'Build a bond or CD ladder: calculate yield at each rung, annual liquidity events, total interest earned, and reinvestment value.',
  slug: 'bond-ladder-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['bond ladder calculator 2026', 'CD ladder calculator USA', 'treasury ladder calculator', 'bond ladder yield calculator', 'CD ladder interest calculator USA'],
})
const faqs = [
  {
    question: 'What is a bond ladder?',
    answer: "A bond ladder spaces maturity dates evenly — for example, buying $20,000 each in 1, 2, 3, 4, and 5-year CDs or Treasuries. Each year, one rung matures and you reinvest at current rates (or spend if needed). Benefits: liquidity (money available every year), rate risk reduction (you don't commit everything to one rate), and predictable cash flow. Widely used by retirees as a fixed-income foundation.",
  },
  {
    question: 'Treasury ladder vs CD ladder — which is better?',
    answer: 'Treasury ladder: federally backed, exempt from state income tax, available in any size via TreasuryDirect.gov or brokerage. CD ladder: FDIC insured up to $250,000/institution, may offer slightly higher rates, requires managing multiple bank accounts. For simplicity, Treasuries win. For slightly higher yield, CDs may win. In high-state-tax environments (CA, NY), the state tax exemption on Treasuries can make them the better after-tax choice even at equal nominal yields.',
  },
  {
    question: 'What yields are available for bond ladders in 2026?',
    answer: 'As of early 2026, Treasury yields: 1-year ~4.5-5.0%, 2-year ~4.3-4.8%, 3-year ~4.2-4.6%, 5-year ~4.0-4.5%, 10-year ~4.2-4.8%. CD rates at online banks typically run 0.1-0.3% above Treasuries for comparable terms. These rates represent a significant improvement over 2020-2021 near-zero rates, making bond ladders a viable income strategy for the first time in years.',
  }
]
const relatedCalculators = [
  { name: 'I-Bonds Calculator', href: '/calculators/finance/i-bonds-calculator', icon: '🏛️', desc: 'I-Bonds Calculator' },
  { name: 'CD vs HYSA', href: '/calculators/finance/cd-vs-hysa-calculator', icon: '💰', desc: 'CD vs HYSA' },
  { name: 'Municipal Bond Calculator', href: '/calculators/finance/municipal-bond-tax-calculator', icon: '🏛️', desc: 'Municipal Bond Calculator' },
  { name: 'Bond vs CD USA', href: '/calculators/finance/bonds-vs-cds-usa-calculator', icon: '📊', desc: 'Bond vs CD USA' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
