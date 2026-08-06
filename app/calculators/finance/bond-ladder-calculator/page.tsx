import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Bond Ladder Calculator USA 2026 — CD and Treasury Ladder | ToolTrio',
  description: 'Build a bond or CD ladder: calculate yield at each rung, annual liquidity events, total interest earned, and reinvestment value.',
  slug: 'bond-ladder-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['bond ladder calculator 2026', 'CD ladder calculator USA', 'treasury ladder calculator', 'bond ladder yield calculator', 'CD ladder interest calculator USA'],
})
const faqs = [
  { question: "What is a bond ladder?", answer: "A ladder divides money among securities with different maturity dates so portions of principal become available at staggered intervals." },
  { question: "Why does each rung have a different yield?", answer: "This calculator increases the entered starting yield by your yield-step assumption for each later maturity. Actual market yields may be higher, lower or non-linear." },
  { question: "Is interest really simple interest to maturity?", answer: "That is the model used for each rung here. Actual bond coupon timing, price, yield-to-maturity and reinvestment can produce different results." },
  { question: "Does a ladder eliminate interest-rate risk?", answer: "No. It spreads maturity dates, but market values can still move and reinvestment rates are unknown." },
  { question: "Are CDs and Treasury bonds equivalent?", answer: "No. They differ in issuer, liquidity, tax treatment, insurance/guarantee structure and early-exit mechanics." }
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
