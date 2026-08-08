import { CalculatorBatch18DeepDive } from '@/components/ui/CalculatorBatch18DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Options Greeks Calculator USA 2026 — Black-Scholes | ToolTrio',
  description: 'Calculate option fair value and the Greeks (delta, gamma, theta, vega) using the Black-Scholes model for any stock option.',
  slug: 'options-greeks-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['options greeks calculator','Black-Scholes calculator','delta gamma theta calculator','options pricing model calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What does each option \'Greek\' measure?', answer: 'Delta measures how much an option\'s price moves per $1 move in the underlying stock. Gamma measures how much delta itself changes. Theta measures time decay — how much value the option loses per day. Vega measures sensitivity to changes in implied volatility. Together they describe how an option\'s price reacts to different market forces.' },
  { question: 'What does the Black-Scholes model assume?', answer: 'The Black-Scholes model assumes constant volatility, no dividends (in its basic form), European-style exercise (only at expiration), and frictionless markets with no transaction costs — real-world option prices can deviate from the model\'s output, especially for American-style options or stocks with irregular dividends.' },
  { question: 'Why does theta accelerate as expiration approaches?', answer: 'Time decay isn\'t linear — an option loses value slowly when there\'s a lot of time left, but theta decay accelerates sharply in the final weeks before expiration as the chance for the underlying to move favorably shrinks, which is why short-dated options are especially sensitive to time passing.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Margin Trading Calculator', href: '/calculators/finance/margin-trading-calculator', icon: '📉', desc: 'Margin Trading' },
  { name: 'Stock Option Tax', href: '/calculators/finance/stock-option-tax-calculator', icon: '💎', desc: 'Stock Option Tax' },
  { name: 'Leveraged ETF Decay', href: '/calculators/finance/leveraged-etf-decay-calculator', icon: '📉', desc: 'Leveraged ETF Decay' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch18DeepDive slug="options-greeks-calculator" />
</>
}
