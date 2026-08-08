import { CalculatorBatch30DeepDive } from '@/components/ui/CalculatorBatch30DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Credit Card Annual Fee Calculator USA 2026 — Is It Worth It? | ToolTrio',
  description: "Calculate whether a premium credit card's annual fee is worth it based on rewards earned, spending level, and comparison to no-fee alternatives.",
  slug: 'credit-card-annual-fee-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['credit card annual fee calculator', 'is credit card annual fee worth it', 'premium credit card ROI calculator USA', 'rewards vs annual fee calculator', 'Chase Sapphire Amex annual fee calculator'],
})
const faqs = [
  { question: 'What is the annual-fee break-even point?', answer: 'It is the spending level where the extra modeled rewards from the fee card equal its annual fee relative to the entered no-fee card.' },
  { question: 'How is redemption value used?', answer: 'The fee-card reward amount is multiplied by your redemption-value input. A value above 1 assumes each unit of rewards is redeemed for more than one unit of baseline value.' },
  { question: 'Does the calculator include welcome bonuses?', answer: 'No. Sign-up bonuses, annual credits, lounge access, transfer partners, category caps and other benefits are excluded unless you reflect them indirectly in your inputs.' },
  { question: 'What if the rewards rates are equal?', answer: 'If the fee card does not earn more effective rewards than the no-fee card, the annual fee generally cannot be recovered through the modeled spending rewards alone.' },
  { question: 'Should I spend more just to reach break-even?', answer: 'No. The calculation is for evaluating spending you would make anyway. Extra spending or carrying interest-bearing debt can easily cost more than rewards are worth.' },
]
const relatedCalculators = [
  { name: 'Cost of Debt Calculator', href: '/calculators/finance/cost-of-debt-calculator', icon: '💳', desc: 'Cost of Debt Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch30DeepDive slug="credit-card-annual-fee-calculator" />
</>
}
