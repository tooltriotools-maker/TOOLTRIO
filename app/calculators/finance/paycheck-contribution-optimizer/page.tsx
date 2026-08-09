import { CalculatorBatch43DeepDive } from '@/components/ui/CalculatorBatch43DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Paycheck Contribution Optimizer 2026 — Maximize Take-Home & Tax Savings | ToolTrio',
  description: 'Find the optimal 401k, HSA, and FSA contributions per paycheck to maximize tax savings while maintaining target take-home pay.',
  slug: 'paycheck-contribution-optimizer',
  category: 'finance',
  region: 'usa',
  keywords: [' paycheck contribution optimizer', '401k HSA FSA optimizer USA 2026', 'maximize tax savings per paycheck', 'pre-tax contribution calculator', 'optimal 401k contribution per paycheck'],
})
const faqs = [
  {
    question: 'What are the 2026 contribution limits per paycheck?',
    answer: 'For biweekly pay (26 periods), divide the applicable annual limits by 26 as a planning shortcut. For 2026, the employee 401(k) limit is $24,500, the self-only HSA limit is $4,400, and the health FSA salary-reduction limit is $3,400. Employer contributions, catch-ups and plan rules can change the usable amount.',
  },
  {
    question: 'How much does maxing your 401k actually reduce take-home?',
    answer: 'The take-home impact depends on your marginal tax rate, payroll taxes, pay frequency, employer plan and other pre-tax benefits. This calculator models the effect using the assumptions you enter; it does not reproduce payroll withholding.'
  },

  {
    question: 'Should I contribute to 401k or HSA first?',
    answer: 'Order of operations: (1) Contribute enough 401k to get full employer match (immediate 50-100% return). (2) Max HSA — triple tax advantage is the best return available. (3) Max 401k to the applicable 2026 limit. (4) Consider an IRA if eligible. (5) Max FSA. (6) Taxable investing. HSA gets priority over maxing 401k because its triple tax advantage (deductible + tax-free growth + tax-free withdrawal for medical) mathematically outperforms 401k.',
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
        <CalculatorBatch43DeepDive slug="paycheck-contribution-optimizer" />
</>
}
