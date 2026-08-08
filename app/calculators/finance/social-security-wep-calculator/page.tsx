import { CalculatorBatch39DeepDive } from '@/components/ui/CalculatorBatch39DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), { loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Social Security WEP Calculator USA 2026 | ToolTrio', description: 'Historical WEP calculator for benefits payable through December 2023. WEP was repealed for benefits payable January 2024 and later under the Social Security Fairness Act.', slug: 'social-security-wep-calculator', category: 'finance', keywords: ['WEP calculator Social Security', 'windfall elimination provision 2026', 'government pension Social Security reduction', 'WEP GPO calculator USA'] })
const faqs = [
  {"question": "What is the Windfall Elimination Provision (WEP)?", "answer": "WEP reduces the Social Security benefit formula for workers who receive a pension from a job not covered by Social Security (such as some state/local government jobs). The maximum WEP reduction in 2026 is $621/month. The reduction decreases if you have 21+ years of 'substantial earnings' under Social Security, and disappears entirely at 30 years."},
  {"question": "What is the Government Pension Offset (GPO)?", "answer": "GPO reduces spousal and survivor Social Security benefits for those receiving a government pension from non-covered work. The reduction equals 2/3 of your government pension. For example, if you receive a $1,500/month government pension, your spousal Social Security benefit is reduced by $1,000/month. In many cases, this eliminates the spousal benefit entirely."}
]
const relatedCalculators = [{'name': 'Social Security Calculator', 'href': '/calculators/finance/social-security-calculator', 'icon': '🏛️', 'desc': 'SS benefit estimate'}, {'name': 'Social Security Breakeven', 'href': '/calculators/finance/social-security-breakeven-calculator', 'icon': '⚖️', 'desc': 'Claiming age'}, {'name': 'Defined Benefit Pension', 'href': '/calculators/finance/defined-benefit-pension-calculator', 'icon': '🏛️', 'desc': 'Pension calculator'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch39DeepDive slug="social-security-wep-calculator" />
</> }
