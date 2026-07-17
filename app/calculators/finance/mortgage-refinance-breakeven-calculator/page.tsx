import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Refinance Break-Even Calculator USA 2026 | ToolTrio',
  description: 'Calculate exactly how many months to break even on refinancing closing costs via monthly savings. Includes cash-out refinance analysis and net lifetime benefit.',
  slug: 'mortgage-refinance-breakeven-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage refinance break even calculator 2026', 'should I refinance calculator USA', 'refinance closing cost payback period', 'cash out refinance calculator', 'mortgage refinance calculator 2026 USA'],
})
const faqs = [
  {
    question: 'When should I refinance my mortgage in 2026?',
    answer: 'General rule: refinance when you can reduce your rate by 0.75-1.0%+ AND plan to keep the home long enough to recoup closing costs (typically 2-4 years). With rates at 6.75-7.5% in 2026, refinancing a 2020-2021 purchase at 3% makes no sense. But a 2023 purchase at 7.5%+ would benefit significantly from a rate drop to 6.75%. With $8,500 in closing costs and $200/month in savings, break-even is 42 months.',
  },
  {
    question: 'What are typical refinance closing costs?',
    answer: "Refinance closing costs: 2-3% of loan amount for traditional refinance ($7,700-$11,550 on a $385,000 loan). Breakdown: Origination fee (0.5-1%), Appraisal ($500-$700), Title insurance ($1,000-$2,500), Government recording fees ($200-$500), Prepaid interest, Tax/insurance escrow setup. 'No-cost' refinances roll fees into the rate — you pay via higher rate, not upfront. Calculate actual total interest cost both ways.",
  },
  {
    question: 'How does a cash-out refinance work?',
    answer: "Cash-out refinance: replaces your existing mortgage with a larger loan and gives you the difference in cash. On a $385,000 balance with $50,000 cash-out, you get a new $435,000 mortgage. Interest is tax-deductible only if cash is used to 'substantially improve' the home (per TCJA). The new mortgage resets your 30-year clock, increasing total interest paid — model the full cost before proceeding.",
  }
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
