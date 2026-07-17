import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Income Replacement Ratio Calculator USA 2026 — Retirement Readiness | ToolTrio',
  description: "Calculate your retirement income replacement ratio from all sources — Social Security, pension, portfolio withdrawals, and part-time work. See if you're on track.",
  slug: 'income-replacement-ratio-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['income replacement ratio calculator', 'retirement income calculator USA 2026', 'retirement readiness calculator', 'how much income do I need in retirement', 'social security pension portfolio income calculator'],
})
const faqs = [
  {
    question: 'What income replacement ratio do I need?',
    answer: 'Financial planners traditionally target 70-80% replacement ratio — the idea being that retirees spend less on commuting, work clothing, retirement savings contributions, and sometimes housing. However, research shows spending varies significantly: early active retirees (60-70) often spend as much or more than working years; later retirees typically spend less. Plan for 80-90% to be conservative.',
  },
  {
    question: 'How do I calculate my replacement ratio?',
    answer: 'Total projected retirement income ÷ Pre-retirement income × 100. Include: Social Security, pension, 4% safe withdrawal from portfolio, any part-time income. Example: SS $2,200 + portfolio $2,500 = $4,700/month = $56,400/year on $95,000 pre-retirement income = 59% replacement ratio. This is below the 70% target — a $10,000/year gap requiring $250,000 in additional portfolio.',
  },
  {
    question: 'What if my replacement ratio is below 70%?',
    answer: 'Options to close the gap: (1) Delay Social Security — each year from 62 to 70 increases benefit by 6-8%. (2) Increase portfolio through higher savings rate or longer working years. (3) Reduce planned retirement spending — most retirees find they naturally spend less than anticipated. (4) Plan part-time work in early retirement. (5) Consider geographic arbitrage — retiring to a lower cost-of-living area.',
  }
]
const relatedCalculators = [
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Retirement Withdrawal Calculator', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', desc: 'Retirement Withdrawal Calculator' },
  { name: 'FIRE Number Calculator', href: '/calculators/finance/fire-number-calculator', icon: '🔥', desc: 'FIRE Number Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
