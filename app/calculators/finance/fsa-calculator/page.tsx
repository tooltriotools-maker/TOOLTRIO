import { CalculatorBatch15DeepDive } from '@/components/ui/CalculatorBatch15DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'FSA Calculator USA 2026 — Flexible Spending Account | ToolTrio',
  description: 'Calculate FSA tax savings, effective discount on medical expenses, and optimal contribution to avoid forfeiture.',
  slug: 'fsa-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['FSA calculator 2026', 'flexible spending account calculator', 'FSA tax savings calculator USA', 'FSA contribution limit 2026', 'FSA vs HSA calculator'],
})

const faqs = [
  { question: 'What is the Health FSA salary-reduction limit for 2026?', answer: 'The IRS says the 2026 limit is $3,400. An employer plan that permits carryover can allow up to $680 to carry into the following plan year.' },
  { question: 'How does this calculator estimate FSA tax savings?', answer: 'It multiplies the capped contribution by your entered marginal tax rate plus a 7.65% FICA assumption. Your actual payroll-tax savings can differ.' },
  { question: 'Why can contributing too much to an FSA be costly?', answer: 'Health FSAs are subject to plan rules on unused funds. The calculator compares the election with expected medical spending and a modeled $680 carryover to highlight possible forfeiture.' },
  { question: 'Can every employer offer the $680 carryover?', answer: 'No. Carryover depends on the employer plan. Some plans instead use a grace period, and you should check your plan document for the rule that actually applies.' },
  { question: 'Does this calculator determine whether an expense is FSA eligible?', answer: 'No. It models contribution and tax effects only. Eligibility depends on applicable tax rules and your plan administrator.' }
]

const relatedCalculators = [
  { name: 'HSA vs FSA Calculator', href: '/calculators/finance/hsa-vs-fsa-calculator', icon: '⚖️', desc: 'HSA vs FSA Calculator' },
  { name: 'HSA Investment Calculator', href: '/calculators/finance/hsa-investment-calculator', icon: '💊', desc: 'HSA Investment Calculator' },
  { name: 'Health Insurance Calculator', href: '/calculators/finance/health-insurance-deductible-calculator', icon: '🏥', desc: 'Health Insurance Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch15DeepDive slug="fsa-calculator" />
</>
}
