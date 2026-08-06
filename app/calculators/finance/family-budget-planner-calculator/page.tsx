import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Family Budget Planner Calculator USA 2026 — 50/30/20 Analysis | ToolTrio',
  description: 'Create a complete family monthly budget with 50/30/20 breakdown analysis, DTI check, emergency fund timeline, and personalized spending alerts.',
  slug: 'family-budget-planner-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['family budget calculator USA 2026', 'monthly budget planner', '50 30 20 budget calculator', 'household budget calculator', 'family finance budget USA 2026'],
})
const faqs = [
  {
    question: 'What is the 50/30/20 budgeting rule?',
    answer: 'The 50/30/20 rule: 50% of after-tax income on needs (housing, utilities, food, transportation, insurance, minimum debt payments), 30% on wants (entertainment, dining out, subscriptions, hobbies), 20% on savings and debt repayment above minimums. For a $7,500 take-home: $3,750 needs, $2,250 wants, $1,500 savings/debt. The 50% threshold for needs is the most commonly violated — especially in high cost-of-living cities where housing alone exceeds 30%.',
  },
  {
    question: 'What housing cost percentage is too high?',
    answer: "Traditional guideline: housing ≤30% of gross income. In 2026 reality: 43% of renters spend more than 30% of income on housing (cost-burdened), 23% spend more than 50% (severely cost-burdened). In cities like San Francisco, New York, Los Angeles, and Seattle, it's nearly impossible to stay under 30% at median income. The 30% guideline applies more realistically to after-tax income — if gross income is $95,000, after-tax ~$70,000, 30% = $1,750/month in housing.",
  },
  {
    question: 'How much emergency fund do I need?',
    answer: '3-6 months of essential expenses (not total spending). Essential = housing + transportation + food + minimum debt payments + insurance. On a $7,500 income with $4,550 in essentials, target emergency fund: $13,650-$27,300. Keep it in a high-yield savings account (4.5-5% in 2026), not invested. Build it before investing beyond the 401k match — the math strongly favors emergency fund first.',
  }
]
const relatedCalculators = [
  { name: 'Emergency Fund HYSA', href: '/calculators/finance/emergency-fund-hysa-calculator', icon: '🏦', desc: 'Emergency Fund HYSA' },
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Cost of Debt Calculator', href: '/calculators/finance/cost-of-debt-calculator', icon: '💳', desc: 'Cost of Debt Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
