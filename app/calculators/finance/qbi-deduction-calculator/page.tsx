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
  title: 'QBI Deduction Calculator USA 2026 — Section 199A | ToolTrio',
  description: 'Calculate your Section 199A Qualified Business Income deduction for sole proprietors, S-corps, partnerships, and freelancers.',
  slug: 'qbi-deduction-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['QBI deduction calculator 2026', 'Section 199A calculator', 'qualified business income deduction', 'self employed tax deduction USA', 'SSTB QBI phaseout calculator 2026'],
})

const faqs = [
  {
    question: 'What is the QBI deduction?',
    answer: "The Section 199A deduction allows pass-through business owners (sole proprietors, S-corp shareholders, partners, some trusts) to deduct up to 20% of qualified business income on their personal return. On $150,000 of QBI, that's a $30,000 deduction saving $11,100 at the 37% rate — entirely without spending money.",
  },
  {
    question: 'Who qualifies for the full QBI deduction?',
    answer: 'Below the income threshold ($197,300 single / $394,600 married in 2026), most business owners get the full 20% deduction. Above the threshold, the deduction phases out for specified service trades or businesses (SSTBs: doctors, lawyers, accountants, consultants, financial advisors) and is limited by W-2 wages paid or capital investment for non-SSTBs.',
  },
  {
    question: 'Does the QBI deduction expire?',
    answer: 'The Section 199A deduction is set to expire after 2025 unless Congress extends it. This would eliminate the 20% pass-through deduction and significantly increase taxes for self-employed individuals and small business owners. Maximizing QBI deductions before expiration is a key planning consideration.',
  }
]

const relatedCalculators = [
  { name: 'Self-Employment Tax Calculator', href: '/calculators/finance/self-employment-tax-calculator', icon: '📋', desc: 'Self-Employment Tax Calculator' },
  { name: 'SEP-IRA Calculator', href: '/calculators/finance/sep-ira-calculator', icon: '💼', desc: 'SEP-IRA Calculator' },
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
