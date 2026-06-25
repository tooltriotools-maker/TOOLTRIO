import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Taxable vs Roth vs Traditional IRA Calculator USA 2026 | ToolTrio',
  description: 'Compare after-tax wealth across taxable brokerage, Roth IRA, and Traditional IRA over any time horizon. Find the best account for your tax situation.',
  slug: 'taxable-vs-roth-vs-traditional-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['taxable vs roth vs traditional calculator', 'best account type calculator USA 2026', 'roth vs traditional IRA comparison', 'after-tax wealth calculator', 'investment account comparison USA'],
})
const faqs = [
  {
    question: 'Roth vs Traditional IRA — which is better?',
    answer: 'It depends on whether your tax rate is higher now (use Traditional, deduct now) or higher in retirement (use Roth, pay now). Rule of thumb: early career (low income) → Roth. Peak earning years → Traditional. Near retirement with high income → Traditional or maxed Roth via backdoor. But the comparison is rarely clean — RMDs, Social Security taxability, and estate planning goals all affect the optimal choice.',
  },
  {
    question: 'Why choose a taxable brokerage over IRA?',
    answer: 'Taxable accounts have no contribution limits, no withdrawal restrictions, and more flexibility. Capital gains receive preferential rates (0-20% vs ordinary income in Traditional). Tax-loss harvesting is available. Stepped-up cost basis at death eliminates embedded gains. Downsides: no upfront deduction (vs Traditional), no tax-free growth (vs Roth), annual tax drag on dividends and realized gains.',
  },
  {
    question: 'Should I use all three account types?',
    answer: 'Many financial advisors recommend a tax diversification strategy: contribute to all three types. Reason: future tax rates are uncertain. Having Traditional IRA (taxable in retirement), Roth IRA (tax-free in retirement), and taxable accounts (flexible) gives you the ability to manage your annual retirement tax liability by drawing from the most favorable source in any given year — especially valuable for managing Social Security taxability and Medicare IRMAA thresholds.',
  }
]
const relatedCalculators = [
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA Calculator' },
  { name: 'Backdoor Roth IRA', href: '/calculators/finance/backdoor-roth-ira-calculator', icon: '🚪', desc: 'Backdoor Roth IRA' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Roth Conversion Ladder', href: '/calculators/finance/roth-conversion-ladder-calculator', icon: '🪜', desc: 'Roth Conversion Ladder' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
