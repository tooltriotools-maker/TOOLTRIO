import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'College Savings Goal Calculator USA 2026 | ToolTrio',
  description: "Calculate exactly how much to save monthly for college given your child's age, target year, and inflation-adjusted costs.",
  slug: 'college-savings-goal-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['college savings calculator 2026','how much to save for college monthly','college cost inflation calculator','529 savings goal calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How fast does college tuition inflation typically run?', answer: 'College costs have historically risen faster than general inflation — often in the 4-6% annual range for tuition, room, and board combined, though this varies by public vs. private institutions and by year. Using an inflation-adjusted target rather than today\'s sticker price gives a far more realistic savings goal.' },
  { question: 'How much should I be saving per month for college?', answer: 'It depends on your child\'s current age, the target school cost, and your years until enrollment — the earlier you start, the more compound growth does the work. A common rule of thumb is that saving roughly one-third of projected costs, with the rest from income and financial aid/loans, is a realistic target for many families.' },
  { question: 'Is a 529 plan the best way to save for college?', answer: 'For most families, yes — 529 plans grow tax-free for qualified education expenses and many states offer a tax deduction for contributions. Just be aware of the SECURE 2.0 provision allowing up to $35,000 of unused 529 funds to roll into a Roth IRA if your child doesn\'t use it all.' },
  { question: 'What happens to my current savings?', answer: 'The calculator compounds current savings at your expected annual return until the target college year, then subtracts that projected balance from the modeled four-year cost.' },
  { question: 'Does the monthly target guarantee enough money?', answer: 'No. College inflation and investment returns can differ materially from the constant rates entered, so the target should be reviewed periodically.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'College Cost Calculator', href: '/calculators/finance/college-cost-calculator', icon: '🎓', desc: 'College Cost' },
  { name: '529 vs Roth IRA', href: '/calculators/finance/529-vs-roth-ira-education-calculator', icon: '📚', desc: '529 vs Roth IRA' },
  { name: '529 to Roth Rollover', href: '/calculators/finance/529-to-roth-rollover-calculator', icon: '🎓', desc: '529 to Roth Rollover' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
