import { CalculatorBatch45DeepDive } from '@/components/ui/CalculatorBatch45DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Index Fund Expense Ratio Fee Calculator | ToolTrio',
  description: 'Compare two fund expense ratios under the same assumed gross return and contributions to see how recurring fund costs can change projected long-term balances.',
  slug: 'index-fund-fee-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['index fund fee calculator', 'expense ratio impact calculator USA 2026', 'mutual fund fees vs index fund', 'low cost index fund calculator', 'expense ratio long term cost'],
})
const faqs = [
  {
    question: 'What is an expense ratio?',
    answer: 'An expense ratio is an annual fund operating expense expressed as a percentage of fund assets. Fund operating expenses are deducted from fund assets, so they reduce the return retained by investors.',
  },
  {
    question: 'How does this calculator model the fee difference?',
    answer: 'For each fund it subtracts the entered expense ratio from the same assumed gross annual return, grows the prior balance by that net rate, then adds the annual contribution. The process repeats once per year for the selected period.',
  },
  {
    question: 'Does a lower expense ratio guarantee a higher investment return?',
    answer: 'No. Lower costs leave more of a fund’s return for investors when other factors are equal, but two real funds can hold different investments, track different indexes, experience different tracking error and produce different gross returns. This calculator intentionally holds gross return equal to isolate fee drag.',
  },
  {
    question: 'Where can I find a fund’s expense ratio?',
    answer: 'Check the fund prospectus and shareholder reports. The SEC requires mutual funds and ETFs to disclose fees and expenses, including annual operating expenses, in standardized disclosures.',
  },
  {
    question: 'Does the calculator include every cost of owning a fund?',
    answer: 'No. It models only the two entered expense ratios. It does not include brokerage commissions, bid-ask spreads, loads, advisory fees, taxes, tracking differences or other transaction and account costs.',
  },
  {
    question: 'Why can a small annual fee difference become large over decades?',
    answer: 'Fees reduce the balance that remains invested. That means the investor can lose both the fee itself and the future growth that money might otherwise have earned. The effect compounds as the projection period gets longer.',
  },
]
const relatedCalculators = [
  { name: 'DRIP Calculator', href: '/calculators/finance/drip-calculator', icon: '💧', desc: 'DRIP Calculator' },
  { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '📈', desc: 'Compound Interest Calculator' },
  { name: 'S&P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', desc: 'S&P 500 vs Bonds' },
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', desc: 'Dividend Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch45DeepDive slug="index-fund-fee-calculator" />
</>
}
