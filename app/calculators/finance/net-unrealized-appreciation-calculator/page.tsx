import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Unrealized Appreciation (NUA) Calculator USA 2026 | ToolTrio',
  description: 'Calculate tax savings from the NUA strategy for company stock in your 401k. Compare NUA treatment vs rollover to IRA.',
  slug: 'net-unrealized-appreciation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['NUA calculator USA 2026', 'net unrealized appreciation calculator', 'company stock 401k NUA strategy', 'NUA vs rollover IRA comparison', '401k company stock tax strategy'],
})
const faqs = [
  {
    question: 'What is the NUA strategy?',
    answer: 'Net Unrealized Appreciation (NUA) allows you to take company stock from a 401k as a lump-sum distribution — paying ordinary income tax only on the original cost basis, and long-term capital gains rates (15-20%) on all the appreciation (NUA). Compared to rolling to an IRA where all future withdrawals are taxed as ordinary income (up to 37%), NUA can save significantly on highly appreciated stock.',
  },
  {
    question: 'When does NUA make sense?',
    answer: "NUA is most valuable when: (1) The NUA is large relative to cost basis (stock has appreciated significantly), (2) You're in a high tax bracket, (3) You have large NUA relative to cost basis (NUA/total value ratio > 50%), (4) You don't need the money immediately (the tax savings compound over time). NUA is less valuable for modest appreciation or lower brackets where ordinary income and capital gains rates are similar.",
  },
  {
    question: 'What are the NUA eligibility requirements?',
    answer: 'NUA requires a qualifying distribution event: (1) Separation from service (leaving employer), (2) Reaching age 59½, (3) Death, or (4) Disability. The distribution must be a lump-sum distribution of the entire account balance in a single tax year. You cannot take just the company stock — the entire plan balance must be distributed. Careful coordination with your plan administrator and tax advisor is essential before executing.',
  }
]
const relatedCalculators = [
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Equity Compensation', href: '/calculators/finance/equity-compensation-calculator', icon: '📊', desc: 'Equity Compensation' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
