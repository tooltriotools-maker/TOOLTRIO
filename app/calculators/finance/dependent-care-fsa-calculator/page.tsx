import { CalculatorBatch20DeepDive } from '@/components/ui/CalculatorBatch20DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Dependent Care FSA Calculator USA 2026 — Childcare Tax Savings | ToolTrio',
  description: 'Calculate DC-FSA tax savings vs Child and Dependent Care Credit and find the optimal strategy for your childcare costs.',
  slug: 'dependent-care-fsa-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['dependent care FSA calculator', 'DC-FSA vs child care tax credit', 'childcare FSA tax savings 2026', 'dependent care flexible spending account USA', 'Form 2441 calculator'],
})

const faqs = [
  { question: "What is the 2026 Dependent Care FSA limit?", answer: "For 2026, the dependent care assistance exclusion is $7,500, or $3,750 for married filing separately. Your employer plan can impose additional administrative rules." },
  { question: "Does the FSA use the same expenses as the care credit?", answer: "You cannot use the same expense twice. Employer dependent-care benefits reduce the expenses available for the Child and Dependent Care Credit." },
  { question: "Why is this calculator’s care-credit estimate simplified?", answer: "The current function models 20% of up to $3,000 of care expense. Actual credit rules allow up to $3,000 for one qualifying person or $6,000 for two or more, and the percentage varies with income." },
  { question: "Which care expenses can qualify?", answer: "Qualifying care generally must enable you and, when applicable, your spouse to work or look for work. Day care and some before/after-school care can qualify; overnight camp and private-school tuition generally do not." },
  { question: "Does the calculator check earned-income or provider rules?", answer: "No. It does not verify earned-income limits, provider eligibility, dependent age/status, filing-status exceptions or Form 2441 requirements." },
]

const relatedCalculators = [
  { name: 'FSA Calculator', href: '/calculators/finance/fsa-calculator', icon: '🏥', desc: 'FSA Calculator' },
  { name: 'HSA vs FSA Calculator', href: '/calculators/finance/hsa-vs-fsa-calculator', icon: '⚖️', desc: 'HSA vs FSA Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch20DeepDive slug="dependent-care-fsa-calculator" />
</>
}
