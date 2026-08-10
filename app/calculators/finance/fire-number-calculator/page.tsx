import { CalculatorBatch44DeepDive } from '@/components/ui/CalculatorBatch44DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'FIRE Number Calculator USA 2026 — Financial Independence | ToolTrio',
  description: 'Calculate your exact Financial Independence Retire Early (FIRE) number, monthly savings needed, and years to financial freedom.',
  slug: 'fire-number-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['FIRE number calculator 2026', 'financial independence calculator USA', 'retire early number calculator', 'how much do I need to retire calculator', '4% rule calculator FIRE'],
})
const faqs = [
  {
    question: 'What is the FIRE number?',
    answer: 'Your FIRE number = Annual Expenses ÷ Safe Withdrawal Rate. At $65,000/year and 4% SWR, FIRE number = $65,000 / 0.04 = $1,625,000. The 4% rule (Bengen, 1994) shows a $1M portfolio can sustain $40,000/year inflation-adjusted for 30+ years. Retiring before 50 warrants 3-3.5% SWR for a 40-50 year horizon.',
  },
  {
    question: 'What is the savings rate needed for FIRE?',
    answer: "Savings rate is the most useful lever. At 10% savings rate, retirement takes 40+ years. At 50% savings rate, roughly 17 years. At 70% savings rate, under 10 years. These assume 5% real return and match historical data from J.L. Collins' research. Increase your savings rate, not just your income, for faster FIRE.",
  },
  {
    question: 'What are the types of FIRE?',
    answer: 'Lean FIRE: below $40,000/year spending, minimal budget, highest flexibility. Regular FIRE: $40,000-$80,000/year, mainstream middle-class retirement. Fat FIRE: $100,000+/year, comfortable without significant lifestyle reduction. Barista FIRE: semi-retire with part-time work covering healthcare costs. Coast FIRE: stop contributing and let existing portfolio compound to FIRE number at traditional retirement age.',
  }
]
const relatedCalculators = [
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' },
  { name: 'Early Retirement Calculator', href: '/calculators/finance/early-retirement-calculator', icon: '🌅', desc: 'Early Retirement Calculator' },
  { name: 'Savings Rate Calculator', href: '/calculators/finance/savings-rate-calculator', icon: '💹', desc: 'Savings Rate Calculator' },
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch44DeepDive slug="fire-number-calculator" />
</>
}
