import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'RSU Vesting Schedule Calculator USA 2026 — Equity Value Over Time | ToolTrio',
  description: 'Calculate the value of your RSU or stock option vesting schedule year by year, including taxes at each vest event and cumulative wealth building.',
  slug: 'vesting-schedule-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['RSU vesting calculator 2026', 'equity vesting schedule calculator USA', 'stock vesting calculator', 'RSU tax at vest calculator', 'equity compensation timeline USA'],
})
const faqs = [
  { question: "What does vesting mean?", answer: "Vesting is the process by which rights to an equity award become nonforfeitable under the grant terms." },
  { question: "Does this calculator predict the stock price?", answer: "No. The projected growth rate is a user assumption applied to the current price." },
  { question: "Does vesting mean I can immediately sell the shares?", answer: "Not necessarily. Private-company liquidity, blackout periods, lockups and plan rules can restrict sales." },
  { question: "Are RSUs, ISOs and NSOs taxed the same way?", answer: "No. Their tax timing and character can differ substantially. This page uses a simplified entered tax rate rather than reproducing each tax regime." },
  { question: "How is a three-year schedule handled?", answer: "The calculator now uses the three-year monthly schedule when three years is selected and the four-year monthly schedule otherwise." }
]
const relatedCalculators = [
  { name: 'Equity Compensation Calculator', href: '/calculators/finance/equity-compensation-calculator', icon: '📊', desc: 'Equity Compensation Calculator' },
  { name: 'Alternative Minimum Tax', href: '/calculators/finance/alternative-minimum-tax-calculator', icon: '⚠️', desc: 'Alternative Minimum Tax' },
  { name: 'Salary Negotiation Calculator', href: '/calculators/finance/salary-negotiation-calculator', icon: '🤝', desc: 'Salary Negotiation Calculator' },
  { name: 'Net Unrealized Appreciation', href: '/calculators/finance/net-unrealized-appreciation-calculator', icon: '📈', desc: 'Net Unrealized Appreciation' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
