import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Retirement Healthcare Bridge Calculator USA 2026 — Before Medicare | ToolTrio',
  description: 'Calculate the total cost of healthcare coverage between early retirement and Medicare at 65, including COBRA, ACA marketplace plans, and HSA offsets.',
  slug: 'retirement-healthcare-bridge-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['early retirement health insurance calculator USA', 'pre-Medicare health coverage cost', 'COBRA vs ACA marketplace retirement', 'healthcare bridge retirement calculator 2026', 'retire before 65 health insurance cost'],
})
const faqs = [
  {
    question: 'How long can I keep COBRA after retirement?',
    answer: "COBRA continues your employer's group health coverage for up to 18 months after leaving employment (36 months in certain qualifying events). Cost: you pay the full premium (employee + employer share) plus 2% administrative fee. For a plan where you paid $300/month and employer paid $600, COBRA costs $918/month. COBRA is most valuable when: you have ongoing medical needs, ongoing claims toward deductible, or limited alternatives.",
  },
  {
    question: 'Is ACA marketplace better than COBRA?',
    answer: 'Often yes, especially if your retirement income qualifies for ACA subsidies. ACA income-based subsidies (Advanced Premium Tax Credits) are available for income 100-400% of Federal Poverty Level. A couple at $65,000 income in early retirement may qualify for $500-$800/month in subsidies, making ACA far cheaper than COBRA. Compare: ACA plans on healthcare.gov (open enrollment Nov 1 - Dec 15, or special enrollment within 60 days of losing employer coverage).',
  },
  {
    question: 'How does early retirement affect ACA subsidies?',
    answer: 'ACA subsidies are based on your MAGI (Modified Adjusted Gross Income) for the coverage year — not prior year income. In early retirement, you control your income: IRA withdrawals, Roth conversions, capital gains realizations, Social Security timing. Keeping MAGI under 400% FPL (~$60,240 for single in 2026) ensures subsidy eligibility. Strategic Roth conversions before claiming SS can permanently lower retirement MAGI, maximizing lifetime ACA benefits.',
  }
]
const relatedCalculators = [
  { name: 'Retirement Healthcare Cost', href: '/calculators/finance/retirement-healthcare-cost-calculator', icon: '🏥', desc: 'Retirement Healthcare Cost' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', desc: 'Medicare Premium Calculator' },
  { name: 'HDHP vs Traditional Insurance', href: '/calculators/finance/hdhp-vs-traditional-insurance-calculator', icon: '⚕️', desc: 'HDHP vs Traditional Insurance' },
  { name: 'Early Retirement Calculator', href: '/calculators/finance/early-retirement-calculator', icon: '🌅', desc: 'Early Retirement Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
