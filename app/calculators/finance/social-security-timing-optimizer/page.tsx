import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security Timing Optimizer USA 2026 — Best Age to Claim | ToolTrio',
  description: 'Find your optimal Social Security claiming age based on health, life expectancy, and lifetime benefit maximization at ages 62 through 70.',
  slug: 'social-security-timing-optimizer',
  category: 'finance',
  region: 'usa',
  keywords: ['social security timing calculator', 'best age to claim social security 2026', 'social security 62 vs 70 optimizer', 'SS claiming strategy calculator', 'social security lifetime benefits maximizer'],
})
const faqs = [
  {
    question: 'Is it worth waiting until 70 to claim Social Security?',
    answer: "Delaying from 62 to 70 increases your monthly benefit by approximately 76-77%. The 'ROI' of waiting is 8% per year guaranteed by the government — better than most risk-free alternatives. Break-even vs claiming at 62: approximately age 78-79. If you expect to live past 80, delaying is almost certainly the right financial decision. Health is the critical variable: poor health favors early claiming.",
  },
  {
    question: 'What happens to Social Security if I claim at 62?',
    answer: 'Claiming at 62 permanently reduces your benefit by up to 30% compared to your Full Retirement Age (FRA) benefit. This reduction is: 5/9 of 1% per month for the first 36 months before FRA, plus 5/12 of 1% per month for additional months. On a $2,400 FRA benefit, claiming at 62 gives approximately $1,680/month — a permanent $720/month reduction for life.',
  },
  {
    question: 'Does delaying SS affect survivor benefits?',
    answer: "Yes — significantly. Your spouse's survivor benefit equals the higher of your two SS checks at death. If you delay to 70 and receive $3,100/month vs $1,680 at 62, your surviving spouse will receive $3,100 (or their own benefit if higher) for the rest of their life. For couples where one partner has a much higher benefit, maximizing that higher earner's delay is often the most important financial planning decision they make.",
  },
  { question: 'Why does the calculator compare ages 85 and 90?', answer: 'Those are fixed longevity endpoints used to compare undiscounted cumulative benefits. They are scenarios, not life-expectancy predictions.' },
  { question: 'Does delaying Social Security guarantee an 8% investment return?', answer: 'No. Delayed retirement credits increase the Social Security benefit formula after full retirement age through age 70; they are not an invested account or market return.' },
]
const relatedCalculators = [
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Social Security Spousal', href: '/calculators/finance/social-security-spousal-calculator', icon: '👫', desc: 'Social Security Spousal' },
  { name: 'Social Security Tax', href: '/calculators/finance/social-security-tax-calculator', icon: '💰', desc: 'Social Security Tax' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', desc: 'Medicare Premium Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
