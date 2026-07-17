import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'K-1 Income Tax Calculator USA 2026 — Partnership & S-Corp | ToolTrio',
  description: 'Calculate federal tax on Schedule K-1 income from partnerships, S-corps, and LLCs including SE tax on guaranteed payments, QBI deduction, and passive loss rules.',
  slug: 'k1-income-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['K-1 income tax calculator USA 2026', 'schedule K1 tax calculator', 'partnership income tax calculator', 'S-corp K1 calculator', 'passive loss K1 calculator'],
})
const faqs = [
  {
    question: 'What is a Schedule K-1?',
    answer: "A K-1 is a tax form issued by partnerships, S-corporations, trusts, and estates that reports each partner's/shareholder's share of income, deductions, and credits. Unlike a W-2 or 1099, K-1 income is passed through to the partner's personal return and taxed at their individual rates. K-1s are typically issued by March 15 (extended to September 15 with extension).",
  },
  {
    question: 'How is guaranteed payment income taxed differently?',
    answer: 'Guaranteed payments are payments to partners for services or capital that are determined without regard to partnership income. Unlike distributive share income, guaranteed payments are always subject to self-employment tax (15.3%) in addition to ordinary income tax. They must be reported even if the partnership has a loss. This makes the effective tax rate on guaranteed payments higher than on ordinary partnership income.',
  },
  {
    question: 'What are passive activity loss rules for K-1 income?',
    answer: 'Passive losses from K-1 partnerships can only offset passive income — not W-2 wages or ordinary income. Unused passive losses carry forward indefinitely and can only be fully deducted when you dispose of the entire interest in the passive activity. Rental real estate has special rules: if you actively participate and income is below $100,000, up to $25,000 in rental losses can offset ordinary income annually.',
  }
]
const relatedCalculators = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '💼', desc: 'Self-Employment Tax' },
  { name: 'QBI Deduction', href: '/calculators/finance/qbi-deduction-calculator', icon: '📋', desc: 'QBI Deduction' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Business Valuation', href: '/calculators/finance/business-valuation-calculator', icon: '🏢', desc: 'Business Valuation' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
