import { CalculatorBatch25DeepDive } from '@/components/ui/CalculatorBatch25DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Annual Bonus Tax Calculator USA 2026 — State by State | ToolTrio',
  description: 'Calculate take-home pay after federal, state, and FICA taxes on your work bonus. Covers all 50 states with specific withholding rates.',
  slug: 'annual-bonus-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['bonus tax calculator 2026', 'how much tax on bonus USA', 'bonus withholding calculator', 'supplemental wage tax rate 2026', 'take home bonus calculator state by state'],
})

const faqs = [
  {
    question: 'How are bonuses taxed in the USA?',
    answer: "Bonuses are classified as supplemental wages. The flat withholding rate for federal taxes is 22% for amounts up to $1 million, and 37% for the portion above $1 million. Alternatively, employers can use the aggregate method (adding bonus to regular wages and using normal withholding tables), which may withhold more or less depending on total income. Note: withholding rate ≠ actual tax owed — you'll reconcile at filing.",
  },
  {
    question: 'Will I get money back if too much is withheld from my bonus?',
    answer: "Yes — bonus withholding is just an estimate. Your actual tax liability is calculated when you file Form 1040. If 22% was withheld but you're only in the 12% bracket, you'll get a refund for the difference. Conversely, if you're in the 32%+ bracket and received the 22% flat rate withholding, you may owe more at filing.",
  },
  {
    question: 'How can I reduce taxes on my bonus?',
    answer: 'Strategies: (1) Ask HR to spread across two tax years if bonus timing is flexible. (2) Maximize 401k contributions before year-end — large 401k contribution right before bonus reduces taxable income. (3) Harvest capital losses in same year to offset other income. (4) Make large charitable deductions in the same year. Note: you cannot directly put bonus money into a 401k in most plans (contributions are payroll-based).',
  }
]

const relatedCalculators = [
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' },
  { name: 'Salary Calculator', href: '/calculators/finance/salary-calculator', icon: '📋', desc: 'Salary Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch25DeepDive slug="annual-bonus-tax-calculator" />
</>
}
