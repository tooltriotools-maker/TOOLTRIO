import { CalculatorBatch35DeepDive } from '@/components/ui/CalculatorBatch35DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security vs Private Pension Calculator USA 2026 | ToolTrio',
  description: 'Compare Social Security benefits against private pension plans. Calculate lifetime value, break-even, ROI on contributions, and unique strengths of each.',
  slug: 'ss-vs-private-pension-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['social security vs private pension calculator', 'SS vs pension comparison USA 2026', 'social security ROI calculator', 'pension vs social security lifetime value', 'which is better SS or pension'],
})
const faqs = [
  {
    question: 'Is Social Security worth what you pay in?',
    answer: "For most workers, yes — the average worker receives significantly more than they contributed. Social Security's inflation adjustment (COLA) and survivor/disability benefits add enormous value beyond the raw retirement benefit. The exact ROI depends on age at death and claiming age: living to 90+ produces far higher returns than the average. Low earners receive proportionally higher benefits (progressive benefit formula) and typically get excellent returns.",
  },
  {
    question: 'Why is COLA so valuable in Social Security?',
    answer: "Social Security benefits are adjusted annually for inflation via the Consumer Price Index (CPI-W). Over a 20-year retirement, a $2,200/month benefit at 3% average COLA grows to $3,969/month by year 20 — a 80% increase. Most private pensions offer no COLA, meaning their real purchasing power erodes each year. This makes Social Security's COLA provision worth tens of thousands in present value compared to fixed pensions.",
  },
  {
    question: 'What if I have both SS and a pension?',
    answer: 'The Windfall Elimination Provision (WEP) and Government Pension Offset (GPO) can reduce Social Security benefits for those who also receive pensions from jobs not covered by Social Security (common with state/local government and some non-profits). WEP reduces your SS benefit based on your pension amount. GPO can eliminate spousal/survivor SS benefits if your government pension exceeds 2/3 of the offset. These are complex rules requiring careful analysis.',
  }
]
const relatedCalculators = [
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'TSP vs 401k', href: '/calculators/finance/tsp-vs-401k-calculator', icon: '🏛️', desc: 'TSP vs 401k' },
  { name: 'Pension vs Lump Sum', href: '/calculators/finance/pension-vs-lump-sum-calculator', icon: '📅', desc: 'Pension vs Lump Sum' },
  { name: 'Annuity Income Calculator', href: '/calculators/finance/annuity-income-calculator', icon: '📅', desc: 'Annuity Income Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch35DeepDive slug="ss-vs-private-pension-calculator" />
</>
}
