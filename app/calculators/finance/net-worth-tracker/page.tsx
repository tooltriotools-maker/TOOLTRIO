import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Worth Calculator USA 2026 — Assets, Liabilities & Percentile | ToolTrio',
  description: 'Calculate your complete net worth by entering all assets and liabilities. See your US net worth percentile, debt-to-asset ratio, and financial health snapshot.',
  slug: 'net-worth-tracker',
  category: 'finance',
  region: 'usa',
  keywords: ['net worth calculator USA 2026', 'net worth percentile calculator', 'assets liabilities net worth', 'how to calculate net worth USA', 'net worth tracker 2026'],
})
const faqs = [
  {
    question: 'What is the average net worth in the USA in 2026?',
    answer: 'Federal Reserve SCF data (most recent): Median US household net worth is approximately $192,700 (2022, inflation-adjusted to ~$205,000 in 2026). Mean (average) is much higher (~$1.06M) due to extreme wealth concentration at the top. By age: median 35-44: $91,300. Median 45-54: $168,600. Median 55-64: $212,800. Median 65-74: $266,400. These figures include home equity as a major component for most households.',
  },
  {
    question: 'What should be included in net worth?',
    answer: "Assets: checking/savings accounts, investment accounts, retirement accounts (401k, IRA at current value), real estate market value, vehicle value (Blue Book), business ownership value, life insurance cash value, valuable personal property. Liabilities: mortgage balance, home equity loans/HELOC, student loans, auto loans, credit card balances, personal loans, medical debt. Include 401k at full value — you'll owe taxes when withdrawn, but that's a future liability, not counted here.",
  },
  {
    question: 'How do I build net worth faster?',
    answer: 'Three simultaneous levers: (1) Increase savings rate — every dollar saved is a dollar of net worth. (2) Reduce high-cost debt — paying off 24% credit card is a guaranteed 24% return. (3) Invest savings in assets that appreciate — S&P 500 index funds average 10% annually. The compounding of invested savings, debt payoff savings, and asset appreciation working together produces faster net worth growth than any single strategy alone. Track your net worth monthly to stay motivated.',
  }
]
const relatedCalculators = [
  { name: 'FIRE Number Calculator', href: '/calculators/finance/fire-number-calculator', icon: '🔥', desc: 'FIRE Number Calculator' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax Calculator' },
  { name: 'Wealth Building Comparison', href: '/calculators/finance/wealth-building-comparison-calculator', icon: '💎', desc: 'Wealth Building Comparison' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
