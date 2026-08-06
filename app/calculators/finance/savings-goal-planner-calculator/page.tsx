import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Savings Goal Planner Calculator USA 2026 — Reach Any Financial Goal | ToolTrio',
  description: 'Calculate how long to reach any savings goal, required monthly savings, and interest earned. Works for emergency fund, down payment, vacation, or any target.',
  slug: 'savings-goal-planner-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['savings goal calculator 2026', 'how long to save money calculator USA', 'savings planner calculator', 'how much to save monthly goal', 'savings goal interest calculator USA'],
})
const faqs = [
  {
    question: 'How do I calculate how long to reach a savings goal?',
    answer: 'Months to goal = log((Goal × monthly_rate/monthly_savings + 1)) / log(1 + monthly_rate). With $8,000 saved, $800/month, at 4.85% APY, to reach $50,000: approximately 42-44 months (3.5 years). The interest compounds monthly and accelerates progress — the last year builds faster than the first year due to the growing base earning returns.',
  },
  {
    question: 'What savings account should I use for a specific goal?',
    answer: 'Match account type to timeline: Under 1 year → HYSA (currently 4.5-5.5%, full liquidity). 1-3 years → CD ladder or MMF (slightly higher yield, minimal liquidity tradeoff). 3-5 years → 60% stocks/40% bonds or balanced target-date fund. 5+ years → broadly diversified stock portfolio. The rule: the longer your horizon, the more volatility you can tolerate for higher expected returns.',
  },
  {
    question: 'Does compound interest really matter for short-term goals?',
    answer: 'For very short goals (under 2 years), compound interest has modest impact. For medium-term goals (3-5 years), it becomes meaningful — $8,000 base + $800/month at 4.85% for 5 years generates $5,200+ in interest vs $0 at 0%. For long-term goals (10+ years), compounding becomes the dominant force. Even on a 5-year emergency fund goal, choosing a 4.85% HYSA vs 0.01% traditional savings account adds $5,000+ in free interest.',
  }
]
const relatedCalculators = [
  { name: 'Emergency Fund HYSA', href: '/calculators/finance/emergency-fund-hysa-calculator', icon: '🏦', desc: 'Emergency Fund HYSA' },
  { name: 'College Savings 529', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', desc: 'College Savings 529' },
  { name: 'FIRE Number Calculator', href: '/calculators/finance/fire-number-calculator', icon: '🔥', desc: 'FIRE Number Calculator' },
  { name: 'CD vs HYSA', href: '/calculators/finance/cd-vs-hysa-vs-money-market-calculator', icon: '🏦', desc: 'CD vs HYSA' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
