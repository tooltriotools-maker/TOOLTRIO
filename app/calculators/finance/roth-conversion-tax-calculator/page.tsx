import { CalculatorBatch17DeepDive } from '@/components/ui/CalculatorBatch17DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Roth IRA Conversion Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate exact federal and state taxes on a Roth IRA conversion, find the optimal conversion amount to fill your current bracket, and model 30-year tax-free growth.',
  slug: 'roth-conversion-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['roth conversion tax calculator 2026', 'roth IRA conversion cost calculator', 'how much tax on roth conversion USA', 'roth conversion bracket filling', 'roth conversion optimal amount calculator'],
})
const faqs = [
  { question: 'Why can a Roth conversion create current income tax?', answer: 'IRS guidance says untaxed amounts converted from a traditional IRA to a Roth IRA are generally included in income. Nondeductible basis can change the taxable portion.' },
  { question: 'Does the 10% early-distribution tax apply just because I convert?', answer: 'A properly completed Roth conversion is generally not itself subject to the 10% additional tax, but amounts withheld or not rolled over can create different consequences.' },
  { question: 'What filing status and state does this page model?', answer: 'The current ToolTrio UI passes single filing status and California to the calculation. Other filing statuses and states should not rely on this result as an exact tax estimate.' },
  { question: 'Does the calculator handle nondeductible IRA basis?', answer: 'No. It does not perform the Form 8606 pro-rata calculation, so users with after-tax IRA basis need a more complete tax computation.' },
  { question: 'What assumptions drive the long-term benefit result?', answer: 'The current function assumes 7% annual growth for 30 years and values future avoided tax at 24%. Those are planning assumptions, not guaranteed returns or future tax rates.' }
]
const relatedCalculators = [
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' },
  { name: 'Backdoor Roth IRA', href: '/calculators/finance/backdoor-roth-ira-calculator', icon: '🚪', desc: 'Backdoor Roth IRA' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Taxable vs Roth vs Traditional', href: '/calculators/finance/taxable-vs-roth-vs-traditional-calculator', icon: '📊', desc: 'Taxable vs Roth vs Traditional' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch17DeepDive slug="roth-conversion-tax-calculator" />
</>
}
