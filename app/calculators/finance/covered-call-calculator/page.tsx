import { CalculatorBatch35DeepDive } from '@/components/ui/CalculatorBatch35DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Covered Call Calculator USA 2026 — Options Income Strategy | ToolTrio',
  description: 'Calculate covered call premium income, annualized yield, maximum profit, break-even price, and contracts available on your stock position.',
  slug: 'covered-call-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['covered call calculator', 'covered call income calculator USA', 'options wheel strategy calculator', 'call option premium calculator', 'annualized yield covered call USA'],
})
const faqs = [
  {
    question: 'What is a covered call?',
    answer: "A covered call is selling a call option on stock you already own. You receive a premium upfront and keep it regardless of what happens. The trade-off: if the stock rises above the strike price, your shares get 'called away' (sold at the strike). You cap your upside but generate consistent income. Covered calls are among the most conservative options strategies.",
  },
  {
    question: 'What is a good annualized yield for covered calls?',
    answer: 'Most covered call strategies target 12-20% annualized yield. At-the-money (ATM) options — strike = current price — generate the most premium but highest assignment risk. Out-of-the-money (OTM) options — strike above current price — generate less premium but allow more upside. Typical setup: sell a call 2-5% OTM expiring in 30 days, aiming for 1-2% monthly income.',
  },
  {
    question: 'What are the risks of covered calls?',
    answer: "Main risk: missing large upside moves. If you own 500 shares at $85 and sell a $90 call, you cap gains at $90 even if the stock hits $120. You made $2.50/share premium but 'lost' $30/share of potential gain. Also: tax implications — if shares are called away and held under a year, gains are short-term. Covered calls can inadvertently reset holding periods. Always consider tax impact on appreciated positions.",
  }
]
const relatedCalculators = [
  { name: 'Stock Profit Calculator', href: '/calculators/finance/stock-profit-calculator', icon: '📊', desc: 'Stock Profit Calculator' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', desc: 'Dividend Calculator' },
  { name: 'DRIP Calculator', href: '/calculators/finance/drip-calculator', icon: '💧', desc: 'DRIP Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch35DeepDive slug="covered-call-calculator" />
</>
}
