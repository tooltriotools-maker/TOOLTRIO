import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Retirement Withdrawal Calculator USA 2026 — Portfolio Sustainability | ToolTrio',
  description: 'Calculate how long your retirement portfolio will last based on withdrawal amount, investment return, inflation, and spending. Tests the 4% rule for your numbers.',
  slug: 'retirement-withdrawal-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['retirement withdrawal calculator', '4% rule calculator USA 2026', 'how long will retirement money last', 'portfolio depletion calculator', 'sustainable withdrawal rate calculator'],
})
const faqs = [
  {
    question: 'What is the 4% safe withdrawal rate?',
    answer: 'The 4% rule (Bengen, 1994) states that withdrawing 4% of your portfolio in year one, then adjusting for inflation annually, historically sustained a portfolio for 30+ years across all market conditions including the Great Depression and 1970s stagflation. At $1.2M portfolio, 4% = $48,000/year. Note: 4% was designed for 30-year retirements — longer retirements should use 3-3.5%.',
  },
  {
    question: 'What investment return should I assume in retirement?',
    answer: 'Conservative: 5-6% (balanced 60/40 portfolio). Moderate: 6.5-7.5% (70/30 equity/bond). Aggressive: 8-10% (80-90% equity). In retirement, lower equity allocation reduces sequence-of-returns risk (bad early returns + withdrawals can permanently damage a portfolio) at the cost of lower long-term returns. A bucket strategy (1-2 years cash, 3-5 years bonds, rest in equities) provides stability.',
  },
  {
    question: 'What is sequence-of-returns risk?',
    answer: 'Sequence risk is the danger that poor early returns in retirement permanently reduce your portfolio, even if average returns are fine over the full period. Withdrawing $50,000/year from a portfolio that drops 40% in year 1 is far more damaging than the same drop in year 20. Mitigation: cash buffer (1-2 years expenses), flexible spending (reduce withdrawals in down years), bond tent (higher bonds near retirement, then decrease).',
  }
]
const relatedCalculators = [
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'RMD Calculator', href: '/calculators/finance/required-minimum-distribution-calculator', icon: '📋', desc: 'RMD Calculator' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' },
  { name: 'Annuity Income Calculator', href: '/calculators/finance/annuity-income-calculator', icon: '📅', desc: 'Annuity Income Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
