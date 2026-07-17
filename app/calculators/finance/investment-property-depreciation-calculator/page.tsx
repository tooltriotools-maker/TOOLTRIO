import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Investment Property Depreciation Calculator USA 2026 | ToolTrio',
  description: 'Calculate annual depreciation deductions on a rental property using the IRS-mandated 27.5-year straight-line schedule for residential real estate.',
  slug: 'investment-property-depreciation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['rental property depreciation calculator','27.5 year depreciation schedule','investment property tax deduction','depreciation recapture calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How is rental property depreciation calculated?', answer: 'The IRS requires residential rental property to be depreciated straight-line over 27.5 years, based only on the building value (land is never depreciable). Divide the building\'s cost basis by 27.5 to find your annual depreciation deduction, which offsets rental income even though the property may be appreciating in market value.' },
  { question: 'What happens to depreciation when I sell the property?', answer: 'When you sell, the IRS \'recaptures\' the depreciation you claimed by taxing it at a maximum 25% rate (separate from your regular capital gains rate on the appreciation itself) — meaning depreciation reduces your tax bill each year you own the property but isn\'t entirely free once you sell.' },
  { question: 'Can I accelerate depreciation on a rental property?', answer: 'A cost segregation study can reclassify parts of the property (appliances, carpeting, certain fixtures) into faster 5, 7, or 15-year depreciation categories instead of the standard 27.5 years, front-loading deductions — this is generally most worthwhile on higher-value properties given the study\'s cost.' },
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
