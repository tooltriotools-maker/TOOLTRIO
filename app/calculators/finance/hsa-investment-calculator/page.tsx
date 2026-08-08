import { CalculatorBatch35DeepDive } from '@/components/ui/CalculatorBatch35DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HSA Investment Calculator USA 2026 — Triple Tax Advantage | ToolTrio',
  description: 'Calculate HSA balance at retirement using the triple tax advantage. Compare investing vs spending HSA funds.',
  slug: 'hsa-investment-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['HSA investment calculator 2026', 'health savings account growth calculator', 'HSA triple tax advantage', 'HSA retirement calculator USA', 'HSA vs 401k which is better'],
})

const faqs = [
  { question: 'What are the 2026 HSA contribution limits?', answer: 'For 2026, the federal limit is $4,400 for self-only coverage and $8,750 for family coverage, before the additional $1,000 age-55 catch-up when eligible.' },
  { question: 'Does this page model family HSA coverage?', answer: 'The underlying function supports it, but this page currently passes self-only coverage, so the contribution cap used by this UI is the self-only limit.' },
  { question: 'How does the HSA balance grow in this model?', answer: 'Each modeled year applies the entered annual return to the balance and then adds the allowed annual contribution until retirement age.' },
  { question: 'What does tax-equivalent value mean here?', answer: 'The calculator divides the projected HSA balance by one minus your entered tax rate. It is a simplified comparison metric, not a tax-return calculation.' },
  { question: 'What HSA eligibility rules are not modeled?', answer: 'Eligibility depends on qualifying health coverage and other federal rules. The calculator does not determine whether you are eligible for every month or whether other coverage affects eligibility.' },
]
const relatedCalculators = [
  { name: 'HSA vs FSA Calculator', href: '/calculators/finance/hsa-vs-fsa-calculator', icon: '⚖️', desc: 'HSA vs FSA Calculator' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '🏥', desc: 'Medicare Premium Calculator' },
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🎯', desc: 'Retirement Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch35DeepDive slug="hsa-investment-calculator" />
</>
}
