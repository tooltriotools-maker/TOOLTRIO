import { CalculatorBatch44DeepDive } from '@/components/ui/CalculatorBatch44DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), { loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })
export const metadata: Metadata = generateCalculatorMetadata({ title: 'HSA Triple Tax Growth Calculator USA 2026 | ToolTrio', description: 'Calculate the triple tax advantage of your HSA account: tax-free contributions, tax-free growth, and tax-free medical withdrawals. Compare to regular taxable investing.', slug: 'hsa-triple-tax-growth-calculator', category: 'finance', region: 'usa', keywords: ['HSA triple tax calculator', 'HSA investment growth calculator 2026', 'HSA vs taxable account', 'health savings account growth USA'] })
const faqs = [
  {"question": "What is the HSA triple tax advantage?", "answer": "HSAs offer three tax benefits: (1) Contributions are pre-tax or tax-deductible, reducing your taxable income immediately. (2) Investment growth inside the HSA is completely tax-free. (3) Withdrawals for qualified medical expenses are tax-free. No other account offers all three. After age 65, HSA funds can be withdrawn for any purpose (paying regular income tax, like a traditional IRA) — making it a stealth IRA."},
  {"question": "How much can I contribute to an HSA in 2026?", "answer": "The 2026 HSA contribution limits are $4400 for self-only HDHP coverage and $8750 for family coverage. If you are age 55 or older, you can contribute an additional $1,000 catch-up contribution. To be eligible, you must be enrolled in a High-Deductible Health Plan (HDHP) — for 2026, that means a deductible of at least $1,650 (self-only) or $3,300 (family)."}
]
const relatedCalculators = [{'name': 'HSA vs FSA Calculator', 'href': '/calculators/finance/hsa-vs-fsa-calculator', 'icon': '🏥', 'desc': 'HSA vs FSA'}, {'name': 'HSA Investment Calculator', 'href': '/calculators/finance/hsa-investment-calculator', 'icon': '💰', 'desc': 'HSA investing'}, {'name': 'Roth IRA vs HSA', 'href': '/calculators/finance/roth-ira-vs-hsa-calculator', 'icon': '⚖️', 'desc': 'HSA vs Roth IRA'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch44DeepDive slug="hsa-triple-tax-growth-calculator" />
</> }
