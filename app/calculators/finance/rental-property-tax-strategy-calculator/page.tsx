import { CalculatorBatch23DeepDive } from '@/components/ui/CalculatorBatch23DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rental Property Tax Strategy Calculator USA 2026 | ToolTrio',
  description: 'Calculate after-tax rental property cash flow by combining rental income, operating expenses, mortgage interest, and depreciation deductions.',
  slug: 'rental-property-tax-strategy-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['rental property tax strategy calculator','rental property after-tax cash flow','landlord tax deduction calculator','rental income tax calculator 2026'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What expenses can landlords deduct on a rental property?', answer: 'Deductible expenses typically include mortgage interest, property taxes, insurance, maintenance and repairs, property management fees, and depreciation — depreciation is especially valuable since it\'s a non-cash deduction that reduces taxable rental income without an actual cash outlay each year.' },
  { question: 'Can rental losses offset my regular income?', answer: 'It depends — passive activity loss rules generally limit deducting rental losses against non-rental income unless you actively participate (allowing up to $25,000 if your income is under the phase-out threshold) or qualify as a real estate professional, which removes the limitation entirely.' },
  { question: 'Why can a rental property show a tax loss while generating positive cash flow?', answer: 'Depreciation is a paper deduction that doesn\'t require any actual cash outflow — a property can generate positive monthly cash flow after all real expenses and debt service, while still showing a loss on your tax return once the non-cash depreciation deduction is subtracted, effectively sheltering that cash flow from tax.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Investment Property Depreciation', href: '/calculators/finance/investment-property-depreciation-calculator', icon: '🏘️', desc: 'Investment Property Depreciation' },
  { name: 'Cost Segregation Study', href: '/calculators/finance/cost-segregation-study-calculator', icon: '🏗️', desc: 'Cost Segregation Study' },
  { name: 'K-1 Passive Loss', href: '/calculators/finance/k1-passive-loss-calculator', icon: '📋', desc: 'K-1 Passive Loss' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch23DeepDive slug="rental-property-tax-strategy-calculator" />
</>
}
