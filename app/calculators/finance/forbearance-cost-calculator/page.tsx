import { CalculatorBatch32DeepDive } from '@/components/ui/CalculatorBatch32DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Forbearance Cost Calculator USA 2026 | ToolTrio',
  description: 'Calculate the true long-term cost of taking mortgage forbearance — interest accrued, payment increases, and total additional cost vs continuing payments.',
  slug: 'forbearance-cost-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage forbearance cost calculator', 'forbearance interest calculator USA 2026', 'mortgage payment pause cost', 'CARES Act forbearance cost', 'mortgage deferral cost calculator'],
})
const faqs = [
  {
    question: 'How does mortgage forbearance work?',
    answer: 'Mortgage forbearance pauses or reduces payments temporarily — but interest continues to accrue. When forbearance ends, borrowers must repay the paused amounts through: (1) Lump-sum repayment, (2) Repayment plan (higher payments over time), (3) Loan modification (tack missed payments onto end of loan), or (4) Deferral (payments moved to end as non-interest-bearing balloon). The CARES Act (2020) required servicers to offer forbearance to federally-backed loans — always explore all options before agreeing to a plan.',
  },
  {
    question: 'What happens to my mortgage after forbearance?',
    answer: "After forbearance, your servicer will work out a repayment plan. Deferral (moving missed payments to loan end) is the most borrower-friendly option — the missed payments are owed at sale/refinance/payoff with no interest. Repayment plans that spread payments over 3-12 months increase monthly payments. Loan modifications may extend the loan term. Credit impact: forbearance itself doesn't hurt credit if properly reported as 'in forbearance agreement.'",
  },
  {
    question: 'Is mortgage forbearance a good idea?',
    answer: "Only as a last resort when genuinely unable to make payments. The true cost of 6 months forbearance on a $325,000 mortgage at 6.5% is $9,500+ in accrued interest plus long-term payment increases. If you can pay even a partial payment, that's better than zero. Alternatives to explore first: contact servicer about hardship assistance, look into refinancing to lower payment, tap HELOC if equity available, or negotiate a temporary rate modification.",
  }
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Early Mortgage Payoff', href: '/calculators/finance/early-mortgage-payoff-calculator', icon: '🏡', desc: 'Early Mortgage Payoff' },
  { name: 'Mortgage Recast Calculator', href: '/calculators/finance/mortgage-recast-calculator', icon: '🏠', desc: 'Mortgage Recast Calculator' },
  { name: 'Refinance Calculator', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', desc: 'Refinance Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch32DeepDive slug="forbearance-cost-calculator" />
</>
}
