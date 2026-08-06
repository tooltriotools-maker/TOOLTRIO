import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'QBI Deduction Calculator USA 2026 — Section 199A | ToolTrio',
  description: 'Calculate your Section 199A Qualified Business Income deduction for sole proprietors, S-corps, partnerships, and freelancers.',
  slug: 'qbi-deduction-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['QBI deduction calculator 2026', 'Section 199A calculator', 'qualified business income deduction', 'self employed tax deduction USA', 'SSTB QBI phaseout calculator 2026'],
})

const faqs = [
  { question: 'What does this QBI calculator actually model?', answer: 'It models a single-filer, non-SSTB scenario using QBI and a combined wage/property input. It is a simplified screening calculation, not a Form 8995-A reproduction.' },
  { question: 'Is the QBI deduction always 20% of business profit?', answer: 'No. Twenty percent is a starting point. Taxable-income limits, SSTB rules and W-2 wage/qualified-property limits can reduce the deduction.' },
  { question: 'Should I enter business revenue as QBI?', answer: 'No. QBI is generally a net qualified amount from the trade or business, not gross receipts. Items excluded from QBI and entity-level details can change the tax result.' },
  { question: 'Does the Tax Rate field change this calculator?', answer: 'Not currently. The underlying ToolTrio function uses a fixed 37% rate for its displayed tax-savings estimate, so the Tax Rate input is a known limitation of this page.' },
  { question: 'Can an SSTB use this result?', answer: 'Not reliably. The current UI passes non-SSTB to the calculation. Specified service businesses can face different phase-in and phaseout treatment above applicable income thresholds.' }
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
