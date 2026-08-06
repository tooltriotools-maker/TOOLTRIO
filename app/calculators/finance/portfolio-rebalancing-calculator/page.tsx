import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Portfolio Rebalancing Calculator USA 2026 | ToolTrio',
  description: 'Calculate exactly what to buy and sell to rebalance your portfolio to target allocation, with tax impact, drift score, and tax-efficient strategy.',
  slug: 'portfolio-rebalancing-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['portfolio rebalancing calculator USA 2026', 'asset allocation rebalancing calculator', 'how to rebalance portfolio', 'portfolio drift calculator', 'tax efficient rebalancing calculator'],
})
const faqs = [
  {
    question: 'How often should I rebalance my portfolio?',
    answer: 'Two common approaches: (1) Calendar rebalancing: annually or semi-annually. (2) Threshold rebalancing: when any asset class drifts 5%+ from target. Research shows threshold rebalancing slightly outperforms calendar rebalancing. Most studies find annual rebalancing is sufficient — rebalancing too frequently increases transaction costs and taxes without meaningfully improving outcomes.',
  },
  {
    question: 'How do I rebalance without triggering taxes?',
    answer: 'Tax-efficient rebalancing order: (1) Rebalance first within tax-advantaged accounts (IRA, 401k) — no tax consequences. (2) Direct new contributions to underweight asset classes instead of selling. (3) Use dividends and distributions to buy underweight assets. (4) If selling in taxable accounts is necessary, consider tax-loss harvesting to offset gains. Never pay unnecessary taxes to rebalance — use all tax-free options first.',
  },
  {
    question: 'What is an acceptable drift tolerance?',
    answer: "Most financial advisors use a 5% drift threshold — if any asset class moves more than 5 percentage points from its target, rebalance. Vanguard research found that 5% threshold rebalancing produces similar returns to more frequent rebalancing with lower turnover. A portfolio that started at 70/30 stocks/bonds that's drifted to 80/20 has meaningfully higher risk than intended — rebalancing restores the risk profile.",
  }
]
const relatedCalculators = [
  { name: 'Index Fund Fee Calculator', href: '/calculators/finance/index-fund-fee-calculator', icon: '📉', desc: 'Index Fund Fee Calculator' },
  { name: 'Tax-Loss Harvesting', href: '/calculators/finance/tax-loss-harvesting-calculator', icon: '🌿', desc: 'Tax-Loss Harvesting' },
  { name: 'Taxable vs Roth vs Traditional', href: '/calculators/finance/taxable-vs-roth-vs-traditional-calculator', icon: '📊', desc: 'Taxable vs Roth vs Traditional' },
  { name: 'Wealth Building Comparison', href: '/calculators/finance/wealth-building-comparison-calculator', icon: '💎', desc: 'Wealth Building Comparison' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
