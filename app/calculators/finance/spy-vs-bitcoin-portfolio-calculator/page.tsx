import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'S&P 500 vs Bitcoin Portfolio Calculator USA 2026 | ToolTrio',
  description: 'Model a blended SPY + Bitcoin + cash portfolio vs all-stock benchmark. See return, diversification benefit, and worst-case scenario at any allocation.',
  slug: 'spy-vs-bitcoin-portfolio-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['SP500 vs bitcoin calculator', 'bitcoin portfolio allocation calculator USA 2026', 'crypto allocation optimal portfolio', 'BTC SPY blended portfolio calculator', 'bitcoin portfolio risk return'],
})
const faqs = [
  {
    question: 'What allocation to Bitcoin makes sense in a portfolio?',
    answer: 'Most financial advisors who accept crypto in portfolios suggest 1-5% for conservative investors, 5-10% for moderate, and up to 20% for aggressive. At 5% Bitcoin allocation, a 75% Bitcoin crash reduces the portfolio by only 3.75% — tolerable. At 20%, the same crash causes a 15% portfolio decline from the Bitcoin allocation alone. The asymmetric upside: 5% of $100K growing 10x adds $45,000 in a bull run while limiting downside exposure.',
  },
  {
    question: 'Is Bitcoin positively or negatively correlated with stocks?',
    answer: "Bitcoin's correlation with stocks has fluctuated significantly. In the 2020-2023 period, Bitcoin showed increasing correlation with tech stocks, especially during the 2022 bear market when both fell sharply. During traditional market crashes (COVID March 2020), Bitcoin initially fell alongside stocks before decoupling. The diversification case for Bitcoin is strongest when viewing it as a non-sovereign hard asset over multi-year periods, not as a short-term hedge.",
  },
  {
    question: 'What returns should I assume for Bitcoin in a model?',
    answer: "Bitcoin's historical 10-year return has been extraordinary (500,000%+) but diminishing each cycle. Reasonable projections: Bull case (10yr): 20-50% CAGR. Base case: 15-25% CAGR. Bear case: -5 to +10% CAGR or significant loss. This calculator uses 45% as a historical average, but your personal time horizon, entry point, and risk tolerance should heavily influence actual allocation. Never allocate more than you can afford to lose entirely.",
  }
]
const relatedCalculators = [
  { name: 'Crypto Tax Calculator', href: '/calculators/finance/crypto-tax-calculator', icon: '₿', desc: 'Crypto Tax Calculator' },
  { name: 'Crypto DCA Calculator', href: '/calculators/finance/crypto-dca-calculator', icon: '💰', desc: 'Crypto DCA Calculator' },
  { name: 'Index Fund Fee Calculator', href: '/calculators/finance/index-fund-fee-calculator', icon: '📉', desc: 'Index Fund Fee Calculator' },
  { name: 'Wealth Building Comparison', href: '/calculators/finance/wealth-building-comparison-calculator', icon: '💎', desc: 'Wealth Building Comparison' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
