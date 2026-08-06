import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Payroll Tax Calculator USA 2026 — Federal, State & FICA | ToolTrio',
  description: 'Calculate exact federal withholding, Social Security, Medicare, and state payroll taxes for any pay period.',
  slug: 'payroll-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['payroll tax calculator 2026', 'federal withholding calculator', 'FICA tax calculator USA', 'paycheck withholding calculator', 'W-4 payroll calculator 2026'],
})
const faqs = [
  {
    question: 'How is federal income tax withholding calculated?',
    answer: 'Federal withholding is based on your W-4 allowances, filing status, and the IRS Publication 15-T withholding tables. The 2026 standard withholding uses updated tax brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%). Supplemental wages like bonuses use a flat 22% withholding rate up to $1 million.',
  },
  {
    question: 'What is FICA tax?',
    answer: 'FICA (Federal Insurance Contributions Act) includes Social Security (6.2% up to $176,100 wage base in 2026) and Medicare (1.45% with no limit, plus 0.9% additional above $200,000 for singles). Your employer matches the 6.2% + 1.45%, for a total of 15.3% going to these programs.',
  },
  {
    question: 'How do I reduce payroll withholding?',
    answer: 'Update your W-4 form with your employer. Claiming additional allowances reduces withholding — but under-withholding by more than $1,000 triggers an underpayment penalty. Pre-tax deductions (401k, HSA, FSA) reduce your taxable wages and thus withholding. You can also request additional withholding on Line 4(c) of Form W-4 if you owe extra at tax time.',
  }
]
const relatedCalculators = [
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Self-Employment Tax Calculator', href: '/calculators/finance/self-employment-tax-calculator', icon: '💼', desc: 'Self-Employment Tax Calculator' },
  { name: 'Annual Income Calculator', href: '/calculators/finance/annual-income-calculator', icon: '📊', desc: 'Annual Income Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
