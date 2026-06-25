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
  title: 'FSA Calculator USA 2026 — Flexible Spending Account | ToolTrio',
  description: 'Calculate FSA tax savings, effective discount on medical expenses, and optimal contribution to avoid forfeiture.',
  slug: 'fsa-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['FSA calculator 2026', 'flexible spending account calculator', 'FSA tax savings calculator USA', 'FSA contribution limit 2026', 'FSA vs HSA calculator'],
})

const faqs = [
  {
    question: 'What is the FSA contribution limit for 2026?',
    answer: "The 2026 Health FSA contribution limit is $3,300. The grace period allows an extra 2.5 months to use FSA funds, and the rollover option lets you carry over up to $610 to the next plan year (not both — your employer chooses one). Contributing more than you'll spend risks forfeiture of unused funds.",
  },
  {
    question: 'What can I buy with my FSA?',
    answer: 'FSA-eligible expenses include: prescription medications, insulin, medical equipment (crutches, blood pressure monitors), dental care, vision care, bandages, contact lenses and solution, first aid supplies, OTC medications (since CARES Act 2020), menstrual products, and thousands of other items at FSA stores. Cosmetic expenses, gym memberships, and vitamins (without a prescription) are not eligible.',
  },
  {
    question: 'FSA vs HSA — which is better?',
    answer: "HSA (requires HDHP): no use-it-or-lose-it rule, funds roll over forever, can invest for growth, triple tax advantage. FSA (any health plan): use-it-or-lose-it (with grace period/rollover), accessible on day 1 of plan year. If eligible for HSA, it's almost always superior. FSA makes sense when you're not on an HDHP or when your employer doesn't offer an HSA.",
  }
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
  </>
}
