import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Options Pricing Calculator USA 2026 — Black-Scholes | ToolTrio',
  description: 'Calculate call and put option fair value using Black-Scholes formula, plus delta, theta, break-even price, and implied move.',
  slug: 'options-pricing-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['options pricing calculator Black-Scholes', 'call put option calculator USA 2026', 'options Greeks calculator', 'implied volatility options calculator', 'Black-Scholes calculator USA'],
})
const faqs = [
  {
    question: 'What is the Black-Scholes model?',
    answer: "Black-Scholes (1973) is the standard formula for pricing European-style options. It takes five inputs: current stock price, strike price, time to expiry, risk-free rate, and implied volatility. The formula outputs a theoretical 'fair value' for calls and puts. Real market prices deviate from B-S due to volatility skew, liquidity, and dividend adjustments, but it remains the industry standard pricing foundation.",
  },
  {
    question: 'What does delta mean in options?',
    answer: 'Delta measures how much the option price changes for each $1 move in the underlying stock. A call with delta 0.40 gains $0.40 when the stock rises $1. Delta also approximates the probability the option expires in-the-money — a 0.40 delta call has roughly 40% probability of expiring ITM. Delta ranges 0-1 for calls, 0 to -1 for puts. At-the-money options have delta ~0.50.',
  },
  {
    question: 'What is implied volatility?',
    answer: "Implied volatility (IV) is the market's forecast of how much a stock will move over a given period. Higher IV = more expensive options. IV is 'implied' because you back it out from market prices using Black-Scholes. The VIX measures average S&P 500 implied volatility over 30 days. Buying options when IV is high (expensive) and selling when IV is low (cheap) is a common volatility trading approach.",
  }
]
const relatedCalculators = [
  { name: 'Covered Call Calculator', href: '/calculators/finance/covered-call-calculator', icon: '📊', desc: 'Covered Call Calculator' },
  { name: 'Stock Profit Calculator', href: '/calculators/finance/stock-profit-calculator', icon: '📈', desc: 'Stock Profit Calculator' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '💰', desc: 'Capital Gains Tax' },
  { name: 'Equity Compensation', href: '/calculators/finance/equity-compensation-calculator', icon: '📊', desc: 'Equity Compensation' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
