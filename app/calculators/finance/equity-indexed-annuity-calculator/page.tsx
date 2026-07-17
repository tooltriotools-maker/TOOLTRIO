import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Equity Indexed Annuity Calculator USA 2026 — EIA Returns | ToolTrio',
  description: 'Calculate how an equity-indexed annuity performs with participation rate, cap rate, and floor protection vs a CD, stock market, or straightforward fixed annuity.',
  slug: 'equity-indexed-annuity-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['equity indexed annuity calculator USA 2026', 'EIA calculator', 'fixed indexed annuity calculator', 'participation rate cap rate annuity', 'indexed annuity vs CD vs stocks calculator'],
})
const faqs = [
  {
    question: 'How does an equity-indexed annuity work?',
    answer: "An EIA credits interest based on a stock index (usually S&P 500) performance, subject to: participation rate (you get X% of index gains), cap rate (maximum annual credit), and floor (minimum annual credit, usually 0%). Example: index up 15%, participation 80%, cap 9% → credited rate = min(9%, 15%×80%) = min(9%, 12%) = 9%. Index down 10%, floor 0% → credited 0%. You don't lose principal in down years but give up much of the upside.",
  },
  {
    question: 'EIA vs CD — which is better?',
    answer: "EIA advantages: higher potential return in bull markets, principal protection. EIA disadvantages: complex surrender charges (7-10 years), less transparent returns, insurance company credit risk, lower participation in big up years due to cap. In the 2010s strong bull market, a capped EIA at 9%/year significantly underperformed the S&P 500's 13-14% CAGR. In flat or volatile markets, the floor protection adds value. Generally best for conservative investors who can't stomach any principal loss.",
  },
  {
    question: 'What are EIA surrender charges?',
    answer: "Most EIAs have 7-10 year surrender periods with charges for early withdrawal — typically starting at 10% and declining by 1% per year. Year 1: 10% penalty, Year 7: 3% penalty, Year 10: 0%. Withdrawing your full $150,000 in Year 3 might cost $10,500. Most contracts allow 10% annual free withdrawals. EIAs are appropriate only if you genuinely won't need the money during the surrender period.",
  }
]
const relatedCalculators = [
  { name: 'Annuity Income Calculator', href: '/calculators/finance/annuity-income-calculator', icon: '📅', desc: 'Annuity Income Calculator' },
  { name: 'Pension vs Lump Sum', href: '/calculators/finance/pension-vs-lump-sum-calculator', icon: '📅', desc: 'Pension vs Lump Sum' },
  { name: 'Retirement Withdrawal', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', desc: 'Retirement Withdrawal' },
  { name: 'CD vs HYSA vs Money Market', href: '/calculators/finance/cd-vs-hysa-vs-money-market-calculator', icon: '🏦', desc: 'CD vs HYSA vs Money Market' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
