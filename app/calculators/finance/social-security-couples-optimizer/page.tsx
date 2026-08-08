import { CalculatorBatch46DeepDive } from '@/components/ui/CalculatorBatch46DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security Couples Optimization Calculator USA 2026 | ToolTrio',
  description: 'Find the Social Security claiming strategy that maximizes lifetime benefits for married couples across different age-combination claiming strategies.',
  slug: 'social-security-couples-optimizer',
  category: 'finance',
  region: 'usa',
  keywords: ['social security couples calculator','when should married couples claim social security','spousal social security strategy 2026','social security claiming age optimizer'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Should both spouses claim Social Security at the same age?', answer: 'Not necessarily — couples often benefit from a staggered strategy, such as the lower earner claiming earlier for income while the higher earner delays to age 70 to maximize their benefit, which also becomes the higher survivor benefit for whichever spouse lives longer.' },
  { question: 'How does delaying Social Security affect the survivor benefit?', answer: 'The surviving spouse generally inherits whichever benefit was higher between the two spouses. Since delaying claiming increases a benefit by roughly 8% per year past full retirement age (up to age 70), having the higher earner delay can meaningfully increase the amount that protects the surviving spouse for the rest of their life.' },
  { question: 'What is a spousal benefit?', answer: 'A spousal benefit allows one spouse to claim up to 50% of the other spouse\'s full retirement age benefit amount, if that\'s higher than their own earned benefit — this can be valuable for a lower-earning or non-working spouse, though claiming a spousal benefit early also permanently reduces it, similar to claiming your own benefit early.' },
  { question: "Why does the model use 70% at age 62 and 124% at age 70?", answer: "Those endpoints correspond to worker retirement-benefit factors for people with full retirement age 67, such as people born in 1960 or later. Other birth years have different factors." },
  { question: "Does the optimizer fully calculate spousal and survivor benefits?", answer: "No. It compares simplified worker-benefit combinations. A real couples claiming analysis should account for spousal and survivor rules, different life spans, earnings tests and taxes." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Social Security Calculator', href: '/calculators/finance/social-security-calculator', icon: '🏛️', desc: 'Social Security' },
  { name: 'Social Security Spousal', href: '/calculators/finance/social-security-spousal-calculator', icon: '👫', desc: 'Social Security Spousal' },
  { name: 'Social Security Timing Optimizer', href: '/calculators/finance/social-security-timing-optimizer', icon: '⏰', desc: 'Social Security Timing Optimizer' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch46DeepDive slug="social-security-couples-optimizer" />
</>
}
