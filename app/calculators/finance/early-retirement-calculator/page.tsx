import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Early Retirement Calculator USA 2026 — Retire Before 60 | ToolTrio',
  description: 'Calculate your FIRE number, portfolio sustainability, safe withdrawal rate, and years to early retirement with real investment return modeling.',
  slug: 'early-retirement-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['early retirement calculator', 'retire early calculator USA 2026', 'FIRE number calculator', 'retire before 60 calculator', 'portfolio sustainability calculator'],
})
const faqs = [
  { question: "How is the early-retirement target calculated?", answer: "Future annual expenses are inflated to the target date and divided by the calculator’s assumed withdrawal rate." },
  { question: "Why is the withdrawal rate lower for very early retirement?", answer: "The model uses 3.5% before age 50 and 3.8% at ages 50–54 to reflect a longer modeled retirement horizon. These are assumptions, not guarantees." },
  { question: "Does the projection use real or nominal returns?", answer: "Portfolio accumulation uses your nominal return input; the calculator separately computes a real return from the return and inflation assumptions." },
  { question: "Does it include Social Security or a pension?", answer: "Not directly. The FI target is based on the entered annual expenses and portfolio withdrawal assumption." },
  { question: "What risks are not captured by smooth annual returns?", answer: "Sequence-of-returns risk, taxes, healthcare shocks, changing spending and irregular market returns can materially change outcomes." }
]
const relatedCalculators = [
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' },
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' },
  { name: 'Retirement Withdrawal Calculator', href: '/calculators/finance/retirement-withdrawal-calculator', icon: '💰', desc: 'Retirement Withdrawal Calculator' },
  { name: 'Savings Rate Calculator', href: '/calculators/finance/savings-rate-calculator', icon: '💹', desc: 'Savings Rate Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
