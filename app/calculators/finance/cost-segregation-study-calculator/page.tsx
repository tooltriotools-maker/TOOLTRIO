import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cost Segregation Study Calculator USA 2026 | ToolTrio',
  description: 'Calculate the first-year tax savings from a cost segregation study — accelerating depreciation on 5/7/15-year components of commercial or residential rental property.',
  slug: 'cost-segregation-study-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['cost segregation calculator','accelerated depreciation rental property','bonus depreciation cost segregation','cost seg study tax savings'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is a cost segregation study?', answer: 'A cost segregation study is an engineering-based analysis that reclassifies portions of a building (like carpeting, certain electrical, landscaping, and specialty equipment) from the standard 27.5 or 39-year depreciation schedule into 5, 7, or 15-year categories, letting owners depreciate those components — and claim bonus depreciation on them — much faster.' },
  { question: 'How much does a cost segregation study typically save?', answer: 'Savings depend heavily on property type and cost, but studies commonly reclassify 20-40% of a building\'s cost basis into shorter depreciation lives, which can generate substantial first-year deductions when combined with bonus depreciation, significantly reducing taxable income in year one.' },
  { question: 'Is cost segregation worth it for a smaller rental property?', answer: 'Studies typically cost several thousand dollars, so they tend to make the most financial sense for properties above roughly $500,000-$1,000,000 in value, or for investors in high tax brackets who can use the accelerated deductions immediately. Always weigh the study cost against the projected tax benefit and consult a CPA.' },
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
  </>
}
