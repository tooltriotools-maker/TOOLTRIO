import { CalculatorBatch36DeepDive } from '@/components/ui/CalculatorBatch36DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Conforming vs Jumbo Loan Calculator USA 2026 | ToolTrio',
  description: 'Calculate whether your mortgage is conforming or jumbo, PMI cost, and comparison across conventional, FHA, VA, and USDA loan types.',
  slug: 'conforming-loan-limit-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['conforming loan limit 2026', 'jumbo loan calculator USA', 'FHA vs conventional loan calculator', 'VA loan calculator 2026', 'PMI calculator USA'],
})
const faqs = [
  {
    question: 'What is the 2026 conforming loan limit?',
    answer: "The 2026 baseline conforming loan limit for a one-unit property is $832,750 in most U.S. counties. Qualifying high-cost areas can have higher limits, up to $1,249,125 for one-unit properties in most high-cost jurisdictions. Loans above these limits are 'jumbo loans' — they cannot be sold to Fannie Mae/Freddie Mac and typically carry higher rates (0.25-0.75% above conforming) and stricter qualification requirements (usually 20%+ down, 700+ credit score, 6-12 months reserves).",
  },
  {
    question: 'What is PMI and when can it be removed?',
    answer: 'Private Mortgage Insurance (PMI) protects the lender if you default and costs 0.3-1.5% of the loan amount annually depending on credit score and down payment. PMI is required on conventional loans with less than 20% down. You can request cancellation when: equity reaches 20% via payments or appreciation, or it automatically cancels at 22% equity (78% LTV). FHA loans have MIP (mortgage insurance premium) which is harder to remove — requires refinancing to conventional.',
  },
  {
    question: 'VA vs FHA vs Conventional — which is best?',
    answer: 'VA loan (eligible veterans/service members): 0% down, no PMI, competitive rates, VA funding fee (waived for disabled veterans). Best for eligible veterans — no better deal exists in mortgage lending. FHA loan: 3.5% down with 580+ credit, MIP for life of loan (usually). Best for buyers with lower credit scores (580-659). Conventional: 3-20%+ down, lower total cost for strong credit, PMI removable. Best for buyers with 620+ credit who can put 20% down.',
  }
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Mortgage Affordability', href: '/calculators/finance/mortgage-affordability-calculator', icon: '🏡', desc: 'Mortgage Affordability' },
  { name: 'Down Payment Calculator', href: '/calculators/finance/down-payment-calculator', icon: '💵', desc: 'Down Payment Calculator' },
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '📋', desc: 'Closing Cost Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch36DeepDive slug="conforming-loan-limit-calculator" />
</>
}
