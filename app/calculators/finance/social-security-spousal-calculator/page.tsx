import { CalculatorBatch26DeepDive } from '@/components/ui/CalculatorBatch26DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security Spousal Benefits Calculator USA 2026 | ToolTrio',
  description: 'Calculate spousal Social Security benefits, optimal claiming ages for couples, survivor benefits, and combined lifetime income.',
  slug: 'social-security-spousal-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['social security spousal benefit calculator', 'SS spousal benefit 2026', 'social security couples strategy', 'survivor benefit calculator USA', 'social security claiming strategy married'],
})
const faqs = [
  {
    question: 'How do spousal Social Security benefits work?',
    answer: "A spouse can claim up to 50% of their partner's Primary Insurance Amount (PIA) — the FRA benefit — if that amount exceeds their own benefit. The spousal benefit is capped at 50% of the worker's PIA regardless of how long the worker delayed. Example: Worker earns $2,500/month at FRA; spouse with own benefit of $900 can claim $1,250 (50% of $2,500) instead.",
  },
  {
    question: 'What is the survivor benefit strategy?',
    answer: "When one spouse dies, the survivor receives the higher of the two SS checks, not both. This makes the higher earner's claiming decision critically important — delaying to 70 maximizes the survivor benefit that the lower-earning spouse will eventually live on. The optimal strategy for many couples: lower earner claims at 62, higher earner delays to 70.",
  },
  {
    question: "Can both spouses claim benefits on the other's record?",
    answer: "No — each spouse receives their own benefit OR the spousal benefit (50% of the other's PIA), whichever is higher. You cannot double-dip by claiming both. 'Claim and suspend' strategies were largely eliminated in 2016. The main spousal strategy today is simply choosing the optimal claiming ages for each spouse based on health, age difference, and benefit amounts.",
  }
]
const relatedCalculators = [
  { name: 'Social Security Breakeven', href: '/calculators/finance/social-security-breakeven-calculator', icon: '🏛️', desc: 'Social Security Breakeven' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'Medicare Premium Calculator', href: '/calculators/finance/medicare-premium-calculator', icon: '💊', desc: 'Medicare Premium Calculator' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch26DeepDive slug="social-security-spousal-calculator" />
</>
}
