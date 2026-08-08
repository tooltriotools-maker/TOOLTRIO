import { CalculatorBatch19DeepDive } from '@/components/ui/CalculatorBatch19DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Affordability Calculator USA 2026 — How Much House? | ToolTrio',
  description: 'Calculate maximum home price and loan amount based on income, debts, down payment, and 2026 lending standards (28/43 DTI rule).',
  slug: 'mortgage-affordability-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage affordability calculator 2026', 'how much house can I afford USA', '28 36 rule mortgage calculator', 'maximum mortgage calculator USA', 'home buying affordability 2026'],
})
const faqs = [
  { question: 'How does this calculator determine the maximum mortgage?', answer: 'It calculates a loan from a 28% gross-income housing-payment screen and another from a 43% total-debt screen, then uses the smaller loan amount.' },
  { question: 'Are 28% and 43% lender approval limits?', answer: 'No. They are planning thresholds used by this calculator. Actual underwriting depends on loan type, lender rules, credit, reserves, mortgage insurance and other factors.' },
  { question: 'What housing costs are included?', answer: 'The output adds modeled principal and interest, property tax from your entered rate, and a fixed $150 monthly homeowners-insurance assumption.' },
  { question: 'How do monthly debts affect affordability?', answer: 'Other recurring debt reduces the payment capacity under the 43% back-end screen, which can make that screen more restrictive than the 28% housing screen.' },
  { question: 'Does the result include PMI or HOA dues?', answer: 'No. PMI, HOA dues, closing costs and several other ownership expenses are not included, so the displayed maximum can be higher than a comfortable budget.' },
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Down Payment Calculator', href: '/calculators/finance/down-payment-calculator', icon: '💵', desc: 'Down Payment Calculator' },
  { name: 'Rent vs Buy Calculator', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent vs Buy Calculator' },
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '📋', desc: 'Closing Cost Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch19DeepDive slug="mortgage-affordability-calculator" />
</>
}
