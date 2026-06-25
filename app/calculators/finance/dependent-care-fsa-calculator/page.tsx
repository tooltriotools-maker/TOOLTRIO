import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
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
  {
    question: 'What is the DC-FSA limit for 2026?',
    answer: "The 2026 Dependent Care FSA limit is $5,000 per household ($2,500 if married filing separately). This covers childcare for children under 13, before/after-school programs, summer day camps, and adult/elder care for dependents who cannot care for themselves. Overnight camps and private school tuition don't qualify.",
  },
  {
    question: 'DC-FSA vs Child and Dependent Care Credit — which is better?',
    answer: 'DC-FSA saves more for higher earners (24%+ bracket) because the savings rate equals your marginal rate plus FICA. The Child Care Credit is non-refundable and maxes at 20-35% of $3,000 (one child) or $6,000 (two+). Rule of thumb: DC-FSA wins above 20% marginal rate; credit wins at lower incomes. You can use both — contribute $5,000 to DC-FSA and claim the credit on remaining expenses up to the limit.',
  },
  {
    question: 'Can I use DC-FSA for preschool?',
    answer: 'Yes — full-day preschool qualifies as dependent care for a child under 13. Half-day preschool qualifies only for the hours the child is in care (not nap time or other non-care periods). The facility must provide care while you work or look for work. Kindergarten and above is considered education, not dependent care.',
  }
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
  </>
}
