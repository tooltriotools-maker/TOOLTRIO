import { CalculatorBatch43DeepDive } from '@/components/ui/CalculatorBatch43DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
import { CalculatorDeepDive } from '@/components/ui/CalculatorDeepDive'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), { loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Rental Property Depreciation Calculator USA 2026 | ToolTrio', description: 'Calculate residential and commercial rental property depreciation schedules. Find annual depreciation deductions, tax savings, and cumulative depreciation over time.', slug: 'rental-property-depreciation-calculator', category: 'finance', region: 'usa', keywords: ['rental property depreciation calculator USA', 'residential depreciation 27.5 years', 'commercial depreciation 39 years', 'rental property tax deduction calculator'] })
const faqs = [
  {"question": "How is rental property depreciation calculated?", "answer": "For residential rental property, you depreciate the building (not land) over 27.5 years using the straight-line method. For commercial property, the period is 39 years. Annual depreciation = (Purchase Price - Land Value) / 27.5 years. On a $300,000 property with $50,000 land value, annual depreciation is $250,000/27.5 = $9,090/year, creating a tax deduction even if the property appreciates."},
  {"question": "What is depreciation recapture?", "answer": "When you sell a rental property, the IRS 'recaptures' the depreciation you've taken by taxing it at 25% (Section 1250 recapture rate), not the regular capital gains rate. If you've taken $100,000 in depreciation over the years, you'll owe $25,000 in recapture tax when you sell. This is a significant cost to factor into exit strategies — 1031 exchanges can defer recapture."}
]
const relatedCalculators = [{'name': 'Real Estate ROI', 'href': '/calculators/finance/real-estate-roi-calculator', 'icon': '🏠', 'desc': 'Property returns'}, {'name': 'Rental Property Investment', 'href': '/calculators/finance/rental-property-investment-calculator', 'icon': '🏘️', 'desc': 'Rental investment'}, {'name': 'Capital Gains Tax', 'href': '/calculators/finance/capital-gains-tax-calculator', 'icon': '📈', 'desc': 'Property sale tax'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} /><CalculatorDeepDive slug="rental-property-depreciation-calculator" />      <CalculatorBatch43DeepDive slug="rental-property-depreciation-calculator" />
</> }
