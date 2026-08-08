import { CalculatorBatch44DeepDive } from '@/components/ui/CalculatorBatch44DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Crypto DCA vs Lump Sum Calculator USA 2026 | ToolTrio',
  description: 'Compare Dollar-Cost Averaging vs lump sum investing in Bitcoin or any crypto. Calculate average cost basis, total return, and which strategy wins.',
  slug: 'crypto-dca-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['crypto DCA calculator 2026', 'bitcoin DCA vs lump sum', 'dollar cost averaging crypto calculator USA', 'crypto investment calculator', 'BTC DCA strategy calculator'],
})
const faqs = [
  {
    question: 'Does DCA beat lump sum for crypto?',
    answer: 'Research on traditional assets shows lump sum beats DCA roughly 2/3 of the time in rising markets (because time in market matters more than timing). For volatile crypto, DCA provides psychological benefits and reduces the risk of buying at a peak — but in trending bull markets, lump sum wins. The 2022 crypto bear market showed DCA significantly outperforming lump sum for those who started buying in early 2022.',
  },
  {
    question: 'How do I calculate crypto cost basis for taxes?',
    answer: 'The IRS requires tracking cost basis for every cryptocurrency transaction. Methods: FIFO (first in, first out), LIFO (last in, first out), or Specific Identification (highest cost lot first — optimal for minimizing taxes). Most crypto exchanges provide 1099-DA forms starting 2025 reporting cost basis. Keep records of every purchase price, date, and amount — including airdrops and staking rewards (taxed as ordinary income when received).',
  },
  {
    question: 'What is the best DCA frequency for crypto?',
    answer: "Weekly DCA captures more price variability than monthly, potentially lowering average cost in volatile markets. Daily DCA maximizes variability capture but transaction fees can erode returns. Monthly DCA is the most practical for most investors. For Bitcoin specifically, studies show weekly or bi-weekly DCA has historically produced lower average cost basis than monthly over most 3-5 year periods due to Bitcoin's high volatility.",
  }
]
const relatedCalculators = [
  { name: 'Crypto Tax Calculator', href: '/calculators/finance/crypto-tax-calculator', icon: '₿', desc: 'Crypto Tax Calculator' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
  { name: 'Dollar Cost Averaging', href: '/calculators/finance/dollar-cost-averaging-vs-lumpsum-usa-calculator', icon: '📊', desc: 'Dollar Cost Averaging' },
  { name: 'Net Investment Income Tax', href: '/calculators/finance/net-investment-income-tax-calculator', icon: '💹', desc: 'Net Investment Income Tax' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch44DeepDive slug="crypto-dca-calculator" />
</>
}
