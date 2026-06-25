import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Early Mortgage Payoff Calculator USA 2026 — Extra Payment Savings | ToolTrio',
  description: 'Calculate how much interest you save and how many years you shave off by making extra monthly or annual mortgage payments.',
  slug: 'early-mortgage-payoff-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['early mortgage payoff calculator', 'extra mortgage payment calculator USA 2026', 'mortgage payoff accelerator', 'biweekly mortgage savings calculator', 'how to pay off mortgage early'],
})
const faqs = [
  {
    question: 'How much interest do extra mortgage payments save?',
    answer: 'The savings are front-loaded — extra early payments save the most because they reduce the principal on which all future interest is calculated. On a $320,000 balance at 6.75% with 27 years remaining, adding $300/month saves approximately $87,000 in interest and pays off 6-7 years earlier. Every extra dollar paid reduces the principal balance immediately, saving 6.75% in annualized interest on that dollar for the remaining loan life.',
  },
  {
    question: 'Should I pay off my mortgage early or invest?',
    answer: 'At 6.75% mortgage rate: paying off the mortgage is a guaranteed 6.75% risk-free return. The S&P 500 has averaged 10% historically, but with significant volatility. Risk-adjusted, paying off a 6.75%+ mortgage is competitive with stock market returns for many investors, especially those near retirement. Under 4%: almost certainly better to invest. 4-6%: depends on risk tolerance. Above 6%: strong case for paying down mortgage, especially for risk-averse investors.',
  },
  {
    question: 'What is the bi-weekly mortgage payment trick?',
    answer: 'Making half your monthly payment every two weeks results in 26 half-payments = 13 full payments per year instead of 12. The 13th payment goes entirely to principal, saving approximately 4-5 years on a 30-year mortgage and $20,000-$40,000 in interest on a typical loan. Many lenders offer formal bi-weekly programs; you can also replicate it by adding 1/12th of your payment to each monthly payment.',
  }
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Mortgage Recast Calculator', href: '/calculators/finance/mortgage-recast-calculator', icon: '🏠', desc: 'Mortgage Recast Calculator' },
  { name: 'Mortgage Points Calculator', href: '/calculators/finance/mortgage-points-calculator', icon: '📐', desc: 'Mortgage Points Calculator' },
  { name: 'Refinance vs Invest', href: '/calculators/finance/refinance-vs-invest-calculator', icon: '📊', desc: 'Refinance vs Invest' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
