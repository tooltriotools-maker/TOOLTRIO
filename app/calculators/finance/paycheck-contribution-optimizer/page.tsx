import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Paycheck Contribution Optimizer USA 2026 — Maximize Take-Home & Tax Savings | ToolTrio',
  description: 'Find the optimal 401k, HSA, and FSA contributions per paycheck to maximize tax savings while maintaining target take-home pay.',
  slug: 'paycheck-contribution-optimizer',
  category: 'finance',
  region: 'usa',
  keywords: [' paycheck contribution optimizer', '401k HSA FSA optimizer USA 2026', 'maximize tax savings per paycheck', 'pre-tax contribution calculator', 'optimal 401k contribution per paycheck'],
})
const faqs = [
  {
    question: 'What are the 2026 contribution limits per paycheck?',
    answer: 'For biweekly pay (26 periods): 401k max = $23,500 / 26 = $903.85/check. HSA max (individual) = $4,300 / 26 = $165.38/check. FSA max = $3,300 / 26 = $126.92/check. Maxing all three at the 24% federal + 7.65% FICA rate saves $7,200+ in taxes annually — without reducing take-home as much as people expect, because the tax savings offset much of the contribution.',
  },
  {
    question: 'How much does maxing your 401k actually reduce take-home?',
    answer: 'At 24% federal tax + 7.65% FICA, maxing the 401k ($23,500/year) costs $7,200 in taxes saved, meaning your take-home only drops by $23,500 - $7,200 = $16,300 annually ($627/month). The contribution is $1,958/month but actual take-home reduction is only $1,358/month — 31% of the contribution is offset by tax savings. Many people dramatically overestimate the take-home impact of maxing retirement accounts.',
  },
  {
    question: 'Should I contribute to 401k or HSA first?',
    answer: 'Order of operations: (1) Contribute enough 401k to get full employer match (immediate 50-100% return). (2) Max HSA — triple tax advantage is the best return available. (3) Max 401k to $23,500. (4) Max IRA ($7,000 Roth if eligible). (5) Max FSA. (6) Taxable investing. HSA gets priority over maxing 401k because its triple tax advantage (deductible + tax-free growth + tax-free withdrawal for medical) mathematically outperforms 401k.',
  }
]
const relatedCalculators = [
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' },
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
  { name: 'HSA Investment Calculator', href: '/calculators/finance/hsa-investment-calculator', icon: '🏥', desc: 'HSA Investment Calculator' },
  { name: 'FSA Calculator', href: '/calculators/finance/fsa-calculator', icon: '🏥', desc: 'FSA Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
