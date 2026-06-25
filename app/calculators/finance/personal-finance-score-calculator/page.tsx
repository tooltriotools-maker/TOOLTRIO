import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Personal Finance Score Calculator USA 2026 — Rate Your Financial Health | ToolTrio',
  description: 'Get a comprehensive 0-100 financial health score across savings rate, emergency fund, debt-to-income, retirement savings, and credit score.',
  slug: 'personal-finance-score-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['personal finance score calculator USA 2026', 'financial health score calculator', 'money management score', 'financial wellness calculator', 'how financially healthy am I USA'],
})
const faqs = [
  {
    question: 'How is the personal finance score calculated?',
    answer: 'The score (0-100) measures five equally-weighted areas worth 20 points each: Savings Rate (target 15-20%+), Emergency Fund (target 3-6 months), Debt-to-Income Ratio (target under 20% non-mortgage), Retirement Savings (benchmark: 10x income × age/40), and Credit Score (target 750+). Each category is scored independently, then summed for a comprehensive financial health picture.',
  },
  {
    question: 'What is a good personal finance score?',
    answer: '85-100 (A): Excellent financial health — keep optimizing. 70-84 (B): Good health with specific areas to improve. 55-69 (C): Average — several meaningful gaps to address. 40-54 (D): Below average — requires focused attention on multiple fronts. Below 40 (F): Significant financial challenges — consider professional financial counseling. Most Americans score in the C-B range, with retirement savings and emergency fund being the most common weak points.',
  },
  {
    question: 'What is the most important financial metric?',
    answer: "Savings rate is the single most predictive metric for long-term financial outcomes — it determines both how fast you build wealth and how much you'll need at retirement. A 20% savings rate produces financial independence in roughly 37 years from a zero start (at 7% returns). A 50% savings rate achieves it in 17 years. No other single metric has as much leverage over your financial destiny.",
  }
]
const relatedCalculators = [
  { name: 'FIRE Number Calculator', href: '/calculators/finance/fire-number-calculator', icon: '🔥', desc: 'FIRE Number Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' },
  { name: 'Savings Rate FIRE', href: '/calculators/finance/savings-rate-fire-calculator', icon: '💹', desc: 'Savings Rate FIRE' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
