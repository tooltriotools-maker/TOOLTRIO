import { CalculatorBatch14DeepDive } from '@/components/ui/CalculatorBatch14DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Federal Estate Tax Calculator USA 2026 | ToolTrio',
  description: 'Estimate federal estate tax after entered debts, charitable deductions and spouse transfers using the 2026 $15 million basic exclusion.',
  slug: 'estate-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['estate tax calculator 2026', 'federal estate tax exemption 2026', 'estate planning calculator USA', 'TCJA estate tax sunset', 'estate tax rate calculator'],
})

const faqs = [
  { question: 'What is the federal estate-tax basic exclusion for 2026?', answer: 'The IRS lists a $15,000,000 basic exclusion amount for estates of people who die in 2026.' },
  { question: 'How does this calculator determine the taxable estate?', answer: 'It subtracts entered debts, charitable deductions and spouse transfers from the gross estate, then subtracts the modeled 2026 exclusion. Amounts below zero are treated as zero.' },
  { question: 'Does a married couple automatically get a $30 million exemption?', answer: 'No. Portability of a deceased spouse’s unused exclusion generally requires a timely estate-tax return election, and the facts of each estate matter.' },
  { question: 'Does the calculator include state estate or inheritance tax?', answer: 'No. It estimates federal estate tax only. State death-tax rules vary and can apply at much lower estate values.' },
  { question: 'Does this replace Form 706?', answer: 'No. It does not account for all valuation rules, adjusted taxable gifts, credits, elections or filing requirements used on an actual federal estate-tax return.' }
]

const relatedCalculators = [
  { name: 'Gift Tax Calculator', href: '/calculators/finance/gift-tax-calculator', icon: '🎁', desc: 'Gift Tax Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💰', desc: 'Net Worth Calculator' },
  { name: 'College Savings 529', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', desc: 'College Savings 529' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch14DeepDive slug="estate-tax-calculator" />
</>
}
