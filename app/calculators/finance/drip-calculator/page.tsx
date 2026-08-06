import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'DRIP Calculator USA 2026 — Dividend Reinvestment Plan | ToolTrio',
  description: 'Calculate how reinvesting dividends compounds wealth vs taking cash — share accumulation, portfolio growth, and total return over time.',
  slug: 'drip-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['DRIP calculator', 'dividend reinvestment calculator USA', 'dividend compounding calculator', 'DRIP vs cash dividends calculator', 'dividend growth calculator 2026'],
})
const faqs = [
  {
    question: 'What is a DRIP?',
    answer: 'A Dividend Reinvestment Plan (DRIP) automatically uses dividend payments to purchase additional fractional shares instead of paying cash. Over time, this compounds: more shares means more dividends means even more shares. Companies like Johnson & Johnson, Coca-Cola, and Procter & Gamble have made investors wealthy primarily through DRIP compounding over decades.',
  },
  {
    question: 'How much does DRIP add to returns?',
    answer: 'Over long periods, DRIP can contribute 40-60% of total returns in dividend-paying stocks. Morningstar data shows that reinvesting S&P 500 dividends turns a $10,000 investment from 1990 into roughly $198,000 by 2024 vs about $97,000 without reinvestment — more than doubling the wealth from the same initial investment.',
  },
  {
    question: 'Is DRIP income taxable?',
    answer: "Yes — dividends are taxable in the year received, whether you take them as cash or reinvest. Qualified dividends are taxed at 0%, 15%, or 20% depending on income. The reinvested dividends increase your cost basis, so you'll pay less capital gains tax when you eventually sell. In a tax-advantaged account (IRA, 401k), dividends reinvest completely tax-free.",
  }
]
const relatedCalculators = [
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', desc: 'Dividend Calculator' },
  { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '📈', desc: 'Compound Interest Calculator' },
  { name: 'Stock Profit Calculator', href: '/calculators/finance/stock-profit-calculator', icon: '📊', desc: 'Stock Profit Calculator' },
  { name: 'S&P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📉', desc: 'S&P 500 vs Bonds' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
