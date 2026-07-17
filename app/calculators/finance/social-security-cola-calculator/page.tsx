import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security COLA Impact Calculator USA 2026 | ToolTrio',
  description: 'Calculate how Social Security Cost of Living Adjustments compound your benefits over 20-30 years of retirement and the true lifetime value of COLA protection.',
  slug: 'social-security-cola-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['social security COLA calculator', 'SS cost of living adjustment calculator USA', 'social security inflation adjustment lifetime value', 'COLA benefit calculator 2026', 'social security lifetime benefit with COLA'],
})
const faqs = [
  {
    question: 'What is the Social Security COLA?',
    answer: 'The Cost of Living Adjustment (COLA) increases SS benefits annually based on the CPI-W (Consumer Price Index for Urban Wage Earners). The 2026 COLA is 2.5%. Historical average since 2000: approximately 2.6%/year. Benefits that started at $2,200/month in 2026 reach approximately $3,985/month by 2051 at 2.6% COLA — an 81% increase that maintains purchasing power through retirement.',
  },
  {
    question: 'How much is COLA worth over 25 years?',
    answer: 'On a $2,200/month benefit with 2.6% annual COLA over 25 years: total lifetime benefits = $784,000 vs $660,000 without COLA — a $124,000 difference. This is the enormous hidden value of Social Security that pure nominal comparison misses. No private pension or annuity at typical pricing includes this level of automatic inflation protection.',
  },
  {
    question: 'Will Social Security COLA always keep up with inflation?',
    answer: 'COLA is tied to CPI-W, which measures inflation for urban wage earners. Retirees argue CPI-W underrepresents healthcare and housing costs that consume more of retirement spending. The BLS publishes CPI-E (for elderly), which consistently runs 0.2-0.4% higher than CPI-W annually — suggesting SS COLA slightly undercompensates retirees for their actual inflation experience.',
  }
]
const relatedCalculators = [
  { name: 'Social Security Timing Optimizer', href: '/calculators/finance/social-security-timing-optimizer', icon: '🏛️', desc: 'Social Security Timing Optimizer' },
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Inflation Impact Calculator', href: '/calculators/finance/inflation-impact-calculator', icon: '📉', desc: 'Inflation Impact Calculator' },
  { name: 'Retirement Withdrawal Calculator', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', desc: 'Retirement Withdrawal Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
