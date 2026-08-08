import { CalculatorBatch8DeepDive } from '@/components/ui/CalculatorBatch8DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Gold vs Stocks Portfolio Calculator USA 2026 | ToolTrio',
  description: 'Compare a blended gold and stock portfolio against all-stock and all-gold strategies. Calculate diversification benefit and crash protection value.',
  slug: 'gold-vs-stocks-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['gold vs stocks calculator USA 2026', 'gold allocation portfolio calculator', 'gold hedge stocks calculator', 'should I buy gold 2026', 'gold stocks bonds portfolio comparison'],
})
const faqs = [
  {
    question: 'Should I add gold to my portfolio?',
    answer: "Gold serves as a portfolio hedge rather than a growth driver. Historical gold returns average 5-7% annually since 1971 (Nixon shock) vs 10% for US stocks. However, gold has near-zero correlation with stocks — during the 2008 crash when stocks fell 55%, gold rose 5%. A 5-10% gold allocation in a diversified portfolio reduces volatility without dramatically reducing expected returns. Ray Dalio's All Weather Portfolio allocates 7.5% to gold.",
  },
  {
    question: 'Gold ETF vs physical gold vs gold stocks?',
    answer: 'Gold ETFs (GLD, IAU): easiest to buy/sell, 0.25% expense ratio, tracks spot gold price, no storage cost. Physical gold (coins/bars): no counterparty risk, numismatic premium on coins, storage and insurance costs (0.5-1.5% annually), liquidity premium. Gold mining stocks (GDX, GDXJ): leveraged to gold price (gold miners amplify gold moves 2-3x), additional company/operational risk. For portfolio diversification, gold ETFs offer the cleanest gold exposure.',
  },
  {
    question: 'Is gold a good hedge against inflation?',
    answer: "Over very long periods (50+ years), gold has roughly maintained purchasing power — but it's an imperfect inflation hedge over shorter periods. In the 1970s stagflation, gold was excellent. In the 1980s-2000s high-inflation periods, gold significantly underperformed. TIPS (Treasury Inflation-Protected Securities) provide more reliable short-term inflation protection. Gold is better understood as a crisis hedge and currency debasement hedge than a pure inflation tool.",
  }
]
const relatedCalculators = [
  { name: 'Index Fund Fee Calculator', href: '/calculators/finance/index-fund-fee-calculator', icon: '📉', desc: 'Index Fund Fee Calculator' },
  { name: 'S&P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', desc: 'S&P 500 vs Bonds' },
  { name: 'Wealth Building Comparison', href: '/calculators/finance/wealth-building-comparison-calculator', icon: '💎', desc: 'Wealth Building Comparison' },
  { name: 'DRIP Calculator', href: '/calculators/finance/drip-calculator', icon: '💧', desc: 'DRIP Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch8DeepDive slug="gold-vs-stocks-calculator" />
</>
}
