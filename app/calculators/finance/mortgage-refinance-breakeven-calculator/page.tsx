import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Refinance Break-Even Calculator USA 2026 | ToolTrio',
  description: 'Calculate exactly how many months to break even on refinancing closing costs via monthly savings. Includes cash-out refinance analysis and net lifetime benefit.',
  slug: 'mortgage-refinance-breakeven-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage refinance break even calculator 2026', 'should I refinance calculator USA', 'refinance closing cost payback period', 'cash out refinance calculator', 'mortgage refinance calculator 2026 USA'],
})
const faqs = [
  { question: "What is refinance break-even?", answer: "It is the time needed for modeled monthly payment savings to recover the upfront closing costs." },
  { question: "Why can a lower payment still cost more overall?", answer: "A refinance can reset the loan to a new 30-year term, increasing the number of interest-paying months even when the rate is lower." },
  { question: "How does cash-out affect the comparison?", answer: "Cash-out increases the new loan balance, which can raise the new payment and lifetime interest." },
  { question: "Does this include taxes and insurance?", answer: "No. The payment comparison is principal and interest; escrowed property taxes, insurance and mortgage insurance are not modeled." },
  { question: "Should points be included in closing costs?", answer: "Yes, if you pay discount points or other upfront lender charges, include them when estimating the economic break-even period." }
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Early Mortgage Payoff', href: '/calculators/finance/early-mortgage-payoff-calculator', icon: '🏡', desc: 'Early Mortgage Payoff' },
  { name: 'Mortgage Recast Calculator', href: '/calculators/finance/mortgage-recast-calculator', icon: '🏠', desc: 'Mortgage Recast Calculator' },
  { name: 'Mortgage Points Calculator', href: '/calculators/finance/mortgage-points-calculator', icon: '📐', desc: 'Mortgage Points Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
