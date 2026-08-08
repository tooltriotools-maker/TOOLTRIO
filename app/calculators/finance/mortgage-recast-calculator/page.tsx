import { CalculatorBatch30DeepDive } from '@/components/ui/CalculatorBatch30DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Recast Calculator USA 2026 — Lower Payment Without Refinancing | ToolTrio',
  description: 'Calculate new mortgage payment after a lump-sum principal reduction (recast). Compare recast vs extra payments vs refinancing.',
  slug: 'mortgage-recast-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage recast calculator', 'mortgage recast vs refinance USA', 'lump sum mortgage payment calculator', 'lower mortgage payment without refinancing', 'mortgage recast 2026'],
})
const faqs = [
  {
    question: 'What is a mortgage recast?',
    answer: "A mortgage recast (also called re-amortization) applies a large lump-sum principal payment and recalculates your monthly payment over the remaining loan term at the same interest rate. Unlike refinancing, there's no new loan, no credit check, no closing costs (typically $150-$500 bank fee), and your rate stays the same. The result: same payoff date but lower monthly payment.",
  },
  {
    question: 'Recast vs refinance vs extra payments — which is better?',
    answer: "Recast: Lowers monthly payment, keeps same term and rate, minimal cost ($250 fee). Best when: current rate is low, need lower monthly payment, have lump sum available. Refinance: New rate (better if rates dropped), new term, high closing costs (2-5%). Best when: rates dropped significantly since origination. Extra payments: Shortens term, doesn't lower monthly payment. Best when: flexibility matters and goal is faster payoff.",
  },
  {
    question: 'Do all lenders offer mortgage recasting?',
    answer: "Not all lenders offer recasting — it's more common with conventional loans serviced by banks and credit unions than with government-backed (FHA, VA, USDA) or jumbo loans. You typically need to make a minimum lump-sum payment ($5,000-$10,000 depending on lender), be current on payments, and have made at least 2-3 months of payments. Contact your servicer's customer service to verify eligibility and the specific fee.",
  }
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Early Mortgage Payoff', href: '/calculators/finance/early-mortgage-payoff-calculator', icon: '🏡', desc: 'Early Mortgage Payoff' },
  { name: 'Mortgage Points Calculator', href: '/calculators/finance/mortgage-points-calculator', icon: '📐', desc: 'Mortgage Points Calculator' },
  { name: 'Mortgage Refinance Calculator', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', desc: 'Mortgage Refinance Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch30DeepDive slug="mortgage-recast-calculator" />
</>
}
