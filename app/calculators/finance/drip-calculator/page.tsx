import { CalculatorBatch41DeepDive } from '@/components/ui/CalculatorBatch41DeepDive'
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
    question: 'What does DRIP mean?',
    answer: 'DRIP means dividend reinvestment plan. Instead of leaving a dividend as cash, the dividend is used to buy additional shares or fractional shares. Those additional shares can then receive future dividends, creating compounding through a growing share count.',
  },
  {
    question: 'Does this calculator use dividend yield or dividend per share?',
    answer: 'It uses the annual dividend in dollars per share. For example, a stock paying $2 per share should use 2 as the dividend input. Do not enter a 4% yield as 4 unless the annual dividend itself is $4 per share.',
  },
  {
    question: 'Does the Without DRIP result include cash dividends?',
    answer: 'No. The current comparison keeps the original share count and values those shares at the modeled final price. It does not add cash dividends received by a non-reinvesting investor, so DRIP Benefit is not a complete total-wealth comparison with a cash-dividend strategy.',
  },
  {
    question: 'Are reinvested dividends taxable in a taxable brokerage account?',
    answer: 'Reinvestment generally does not by itself prevent a dividend from being taxable. Tax treatment depends on the dividend, account, taxpayer, and jurisdiction. The calculator does not subtract dividend taxes before reinvesting and does not track tax lots or cost basis.',
  },
  {
    question: 'Can a company cut its dividend?',
    answer: 'Yes. Dividend payments and dividend growth are not guaranteed. This calculator applies the growth rate you enter every modeled year, so test conservative assumptions and remember that a real company can freeze, reduce, or suspend its dividend.',
  },
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
        <CalculatorBatch41DeepDive slug="drip-calculator" />
</>
}
