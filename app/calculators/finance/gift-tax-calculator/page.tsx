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
  title: 'Gift Tax Calculator USA 2026 — Annual Exclusion & Lifetime Exemption | ToolTrio',
  description: 'Calculate taxable gifts, annual exclusion used, remaining lifetime exemption, and Form 709 filing requirements.',
  slug: 'gift-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['gift tax calculator 2026', 'annual gift tax exclusion 2026', 'lifetime gift tax exemption USA', 'IRS gift tax Form 709', 'how much can I gift tax free 2026'],
})

const faqs = [
  {
    question: 'How much can I give tax-free in 2026?',
    answer: "The 2026 annual gift tax exclusion is $18,000 per recipient. You can give $18,000 to as many people as you want with no gift tax and no Form 709 filing. Married couples can combine exclusions to give $36,000 per recipient. Gifts above $18,000 per person reduce your lifetime exemption ($13,610,000 in 2026) but don't trigger actual gift tax until you exhaust the lifetime exemption.",
  },
  {
    question: 'Do I need to file Form 709 for gifts?',
    answer: "Form 709 (US Gift Tax Return) is required if you give more than $18,000 to any single person in 2026, even if no tax is owed. The form tracks cumulative taxable gifts against your lifetime exemption. Gifts to spouses (unlimited marital deduction), charities, or directly to educational/medical institutions don't require Form 709.",
  },
  {
    question: 'What is 529 superfunding?',
    answer: 'You can front-load 5 years of annual exclusion gifts into a 529 college savings account — $90,000 per beneficiary ($180,000 married) in a single year, without gift tax. This removes the money from your estate immediately while allowing tax-free growth for education. No additional gifts to that beneficiary are allowed for 5 years without gift tax implications.',
  }
]

const relatedCalculators = [
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax Calculator' },
  { name: 'College Savings 529', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', desc: 'College Savings 529' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💰', desc: 'Net Worth Calculator' },
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
