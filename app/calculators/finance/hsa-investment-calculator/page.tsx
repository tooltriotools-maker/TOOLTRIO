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
  title: 'HSA Investment Calculator USA 2026 — Triple Tax Advantage | ToolTrio',
  description: 'Calculate HSA balance at retirement using the triple tax advantage. Compare investing vs spending HSA funds.',
  slug: 'hsa-investment-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['HSA investment calculator 2026', 'health savings account growth calculator', 'HSA triple tax advantage', 'HSA retirement calculator USA', 'HSA vs 401k which is better'],
})

const faqs = [
  {
    question: 'What makes the HSA triple tax advantaged?',
    answer: '1) Contributions are pre-tax (reduce taxable income now). 2) Growth is tax-free (no capital gains on investments). 3) Withdrawals are tax-free for qualified medical expenses. After age 65, HSA withdrawals for any purpose are penalty-free (taxed as ordinary income, like a Traditional IRA). This makes the HSA the most tax-efficient savings vehicle in the US tax code.',
  },
  {
    question: 'What is the 2026 HSA contribution limit?',
    answer: '$4,300 for self-only HDHP coverage; $8,550 for family coverage. Those age 55+ can contribute an additional $1,000 catch-up. To contribute, you must be enrolled in a High-Deductible Health Plan (HDHP): minimum deductible of $1,650 (self) or $3,300 (family) in 2026. You cannot contribute to an HSA if enrolled in Medicare.',
  },
  {
    question: 'Should I invest my HSA or use it for medical expenses?',
    answer: 'If you can afford to pay medical expenses out-of-pocket, invest your HSA contributions and save receipts forever — the IRS has no time limit on HSA reimbursement. This lets your HSA grow tax-free for decades while you use current income for medical bills. Reimburse yourself at any future point. This strategy maximizes the triple tax advantage.',
  }
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
  </>
}
