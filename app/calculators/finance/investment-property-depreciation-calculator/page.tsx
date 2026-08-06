import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rental Property Depreciation Calculator | ToolTrio',
  description: 'Estimate straight-line depreciation for residential rental or nonresidential property using building basis and the applicable recovery period.',
  slug: 'investment-property-depreciation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['rental property depreciation calculator','27.5 year depreciation schedule','investment property tax deduction','depreciation recapture calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why is land not depreciated?', answer: 'The model uses only the building value as depreciable basis. Land is not treated as depreciable property, so a supportable allocation between land and improvements matters.' },
  { question: 'What recovery periods does the calculator use?', answer: 'It uses 27.5 years for residential rental property and 39 years for nonresidential real property under the modeled straight-line approach.' },
  { question: 'Does this calculate the exact first-year depreciation deduction?', answer: 'No. It does not implement the MACRS mid-month convention or partial-year tables, so placed-in-service timing can make the tax-return deduction different.' },
  { question: 'What is the recapture amount shown?', answer: 'It applies 25% to modeled accumulated depreciation as a simplified maximum-rate illustration. Actual unrecaptured Section 1250 gain depends on the sale and tax facts.' },
  { question: 'Is the cost-segregation opportunity a guaranteed deduction?', answer: 'No. The page simply labels 25% of building basis as a potential reclassification scenario. A real study must identify qualifying assets and apply current depreciation law.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Cost Segregation Study', href: '/calculators/finance/cost-segregation-study-calculator', icon: '🏗️', desc: 'Cost Segregation Study' },
  { name: 'Rental Property Depreciation', href: '/calculators/finance/rental-property-depreciation-calculator', icon: '🏘️', desc: 'Rental Property Depreciation' },
  { name: 'Rental Property Tax Strategy', href: '/calculators/finance/rental-property-tax-strategy-calculator', icon: '🏘️', desc: 'Rental Property Tax Strategy' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
