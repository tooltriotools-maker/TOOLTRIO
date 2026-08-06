import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Leveraged ETF Volatility Decay Calculator USA 2026 | ToolTrio',
  description: 'Model how volatility decay erodes leveraged ETF returns over time — showing why 3x ETFs dramatically underperform 3x the underlying in volatile markets.',
  slug: 'leveraged-etf-decay-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['leveraged ETF decay calculator','volatility decay 3x ETF','leveraged ETF long term risk','daily reset ETF compounding'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why do leveraged ETFs underperform their stated multiple over time?', answer: 'Leveraged ETFs reset their leverage daily, so returns compound daily rather than over the full holding period. In a volatile, sideways market, this daily compounding causes \'volatility decay\' — a stock that goes up then down back to its starting price can leave a 3x leveraged ETF meaningfully below its starting value, even though the underlying index is flat.' },
  { question: 'Are leveraged ETFs meant to be held long-term?', answer: 'No — issuers explicitly design and market leveraged ETFs as short-term trading tools (often for holding periods of days, not months or years) precisely because of daily-reset compounding effects. Holding them through volatile periods can produce dramatically worse results than the underlying index\'s actual performance.' },
  { question: 'Does volatility decay always work against the investor?', answer: 'Volatility decay hurts leveraged ETF holders in choppy, sideways, or declining markets, but in a strongly and steadily trending market, daily compounding can actually make a leveraged ETF outperform the simple multiple of the underlying\'s total return — it cuts both ways depending on the path prices take, not just the endpoint.' },
  { question: "Why is a 3x ETF not always three times the index return?", answer: "Most leveraged ETFs target a multiple of daily performance. Daily resetting and compounding mean multi-day returns can diverge substantially from a simple multiple of the benchmark's cumulative return." },
  { question: "Does volatility always cause the same amount of decay?", answer: "No. Actual outcomes depend on the sequence and magnitude of daily returns, leverage, fees and tracking. This calculator uses a simplified volatility-drag approximation." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Options Greeks Calculator', href: '/calculators/finance/options-greeks-calculator', icon: '📈', desc: 'Options Greeks' },
  { name: 'Margin Trading Calculator', href: '/calculators/finance/margin-trading-calculator', icon: '📉', desc: 'Margin Trading' },
  { name: 'Stock Option Tax', href: '/calculators/finance/stock-option-tax-calculator', icon: '💎', desc: 'Stock Option Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
