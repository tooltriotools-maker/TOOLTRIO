import { CalculatorBatch45DeepDive } from '@/components/ui/CalculatorBatch45DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Pension vs Lump Sum Calculator USA 2026 | ToolTrio',
  description: 'Decide between taking a pension annuity or lump sum. Calculate pension present value, break-even age, and which option is worth more over your lifetime.',
  slug: 'pension-vs-lump-sum-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['pension vs lump sum calculator', 'should I take pension or lump sum USA', 'pension buyout calculator 2026', 'defined benefit pension calculator', 'pension present value calculator USA'],
})
const faqs = [
  {
    question: 'How do I decide between pension and lump sum?',
    answer: 'Key factors: (1) Life expectancy — if you expect to live 20+ years in retirement, pension often wins. (2) Health — poor health favors lump sum. (3) Investment discipline — can you invest the lump sum wisely without spending it? (4) Other income sources — if you have Social Security and other guaranteed income, lump sum flexibility matters less. (5) Survivor benefits — does the pension continue to a spouse? At what reduction? (6) COLA — an inflation-adjusted pension is worth significantly more than a fixed one.',
  },
  {
    question: 'How do I calculate pension present value?',
    answer: "PV = Sum of [Annual Payment / (1+r)^t] for each year t. For a $38,400/year pension ($3,200/month) for 23 years (age 62 to 85) at 5% discount rate: PV ≈ $525,000. Compare to the lump sum offer. The 'implied return' tells you what return you'd need to achieve from the lump sum to match the pension — if it's below your expected investment return, take the lump sum; if above, the pension may win.",
  },
  {
    question: 'Does COLA change the pension vs lump sum decision?',
    answer: 'Significantly. A 2% annual COLA doubles the real value of a pension over 35 years vs a fixed pension. On a $38,400 annual pension with 2% COLA for 23 years: total payments are $1.02M vs $883,000 without COLA. Always factor COLA into present value calculations — a COLA pension vs a lump sum is a much closer comparison than a fixed pension vs lump sum.',
  }
]
const relatedCalculators = [
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Retirement Withdrawal', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', desc: 'Retirement Withdrawal' },
  { name: 'Annuity Income Calculator', href: '/calculators/finance/annuity-income-calculator', icon: '📅', desc: 'Annuity Income Calculator' },
  { name: 'TSP vs 401k', href: '/calculators/finance/tsp-vs-401k-calculator', icon: '🏛️', desc: 'TSP vs 401k' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch45DeepDive slug="pension-vs-lump-sum-calculator" />
</>
}
