import { CalculatorBatch22DeepDive } from '@/components/ui/CalculatorBatch22DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Salary Calculator USA 2026 — Take-Home Pay by State | ToolTrio',
  description: 'Estimate California take-home pay after simplified 2026 federal tax, FICA, modeled state tax, and entered 401(k), HSA, and FSA deductions.',
  slug: 'net-salary-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['net salary calculator USA 2026', 'take home pay calculator', 'after tax salary calculator USA', 'state income tax calculator', 'net pay calculator 2026 all states'],
})
const faqs = [
  {
    question: 'How does this net salary estimate work?',
    answer: 'It subtracts the entered pre-tax deductions, applies a simplified 2026 single federal income-tax calculation, estimates FICA, and applies the model’s California state-tax rate. It is a planning estimate rather than a payroll-withholding engine.',
  },
  {
    question: 'Does this calculator support all 50 states?',
    answer: 'No. The current interface calls the calculation with California and single filing status. The page title and explanation have been corrected so the result is not presented as an all-state quote.',
  },
  {
    question: 'Why can my actual paycheck differ?',
    answer: 'Actual payroll depends on Form W-4 elections, pay frequency, benefit treatment, bonuses, local taxes, state withholding rules, and employer payroll settings that this simplified annual model does not reproduce.',
  },
  {
    question: 'How do the entered pre-tax deductions affect the result?',
    answer: 'The model subtracts the entered 401(k), HSA, and FSA amounts before its federal taxable-income calculation. Real payroll-tax treatment differs by benefit type, so the result should be treated as an estimate.',
  },
  {
    question: 'Does this calculate my tax return?',
    answer: 'No. It does not model credits, itemized deductions, other household income, capital income, detailed California brackets, or reconciliation of withholding on a filed return.',
  },
]
const relatedCalculators = [
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Salary Negotiation Calculator', href: '/calculators/finance/salary-negotiation-calculator', icon: '🤝', desc: 'Salary Negotiation Calculator' },
  { name: 'Annual Bonus Tax Calculator', href: '/calculators/finance/annual-bonus-tax-calculator', icon: '💵', desc: 'Annual Bonus Tax Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch22DeepDive slug="net-salary-calculator" />
</>
}
