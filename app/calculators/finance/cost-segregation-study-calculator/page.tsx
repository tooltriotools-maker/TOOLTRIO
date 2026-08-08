import { CalculatorBatch11DeepDive } from '@/components/ui/CalculatorBatch11DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cost Segregation Study Calculator | ToolTrio',
  description: 'Screen a hypothetical cost segregation allocation and compare modeled accelerated depreciation with standard building depreciation.',
  slug: 'cost-segregation-study-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['cost segregation calculator','accelerated depreciation rental property','bonus depreciation cost segregation','cost seg study tax savings'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What percentages does this cost-segregation model reclassify?', answer: 'The code assumes 15% of building basis as 5-year property, 10% as 7-year property, and 8% as 15-year property. These are modeling assumptions, not IRS safe-harbor allocations.' },
  { question: 'How is first-year tax savings estimated?', answer: 'It compares the modeled accelerated first-year amount with normal straight-line building depreciation and multiplies the difference by the entered marginal tax rate.' },
  { question: 'Does the calculator perform an actual cost segregation study?', answer: 'No. A study identifies and documents specific building components and their tax classifications. This tool only screens a hypothetical allocation.' },
  { question: 'Does the model exactly apply 2026 bonus-depreciation law?', answer: 'No. The current function effectively treats all modeled 5-, 7-, and 15-year buckets as immediately deductible. Actual treatment depends on current law, placed-in-service date and asset eligibility.' },
  { question: 'Why does the calculator estimate a study cost?', answer: 'The code uses a simple property-size rule: $8,000 below $1 million, $15,000 below $5 million, and $25,000 above that. It is not a vendor quote.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Rental Property Depreciation', href: '/calculators/finance/rental-property-depreciation-calculator', icon: '🏘️', desc: 'Rental Property Depreciation' },
  { name: 'Investment Property Depreciation', href: '/calculators/finance/investment-property-depreciation-calculator', icon: '🏘️', desc: 'Investment Property Depreciation' },
  { name: 'Bonus Depreciation', href: '/calculators/finance/bonus-depreciation-calculator', icon: '🏗️', desc: 'Bonus Depreciation' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch11DeepDive slug="cost-segregation-study-calculator" />
</>
}
