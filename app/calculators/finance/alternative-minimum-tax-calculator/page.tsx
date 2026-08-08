import { CalculatorBatch23DeepDive } from '@/components/ui/CalculatorBatch23DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Alternative Minimum Tax (AMT) Calculator USA 2026 | ToolTrio',
  description: 'Calculate your AMT exposure from ISO stock options, preference items, and high income. Find strategies to minimize AMT liability.',
  slug: 'alternative-minimum-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['AMT calculator 2026', 'alternative minimum tax calculator USA', 'ISO stock options AMT', 'AMT exemption 2026', 'Form 6251 calculator USA'],
})

const faqs = [
  {
    question: 'Who is subject to AMT in 2026?',
    answer: 'AMT primarily affects: (1) High earners with large deductions. (2) People who exercise ISO (incentive stock options) — the spread triggers AMT preference income. (3) Those with significant depreciation deductions. The 2026 AMT exemption is $90,100 for single filers and $140,200 for married filing jointly, with phaseout beginning at $500,000 and $1,000,000 respectively. This ToolTrio UI currently models single filing status.',
  },
  {
    question: 'How do ISO options trigger AMT?',
    answer: "When you exercise ISOs, the spread (fair market value minus strike price) is not regular income but IS an AMT preference item. Example: strike $10/share, FMV $50/share, 10,000 shares = $400,000 AMT preference. This can trigger massive AMT even if you don't sell the stock — which caused catastrophic losses for many dot-com employees in 2000.",
  },
  {
    question: 'How can I minimize ISO AMT?',
    answer: 'Strategies: (1) Exercise ISOs in December and sell qualifying shares in January — limit AMT preference per year. (2) Exercise only enough ISOs to stay under the AMT trigger point. (3) Consider NQ options instead of ISOs for large grants — NQ income is ordinary income, no AMT. (4) Use AMT credit in future regular-tax years when you sell ISO shares.',
  }
]

const relatedCalculators = [
  { name: 'Equity Compensation Calculator', href: '/calculators/finance/equity-compensation-calculator', icon: '📊', desc: 'Equity Compensation Calculator' },
  { name: 'Capital Gains Tax Calculator', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch23DeepDive slug="alternative-minimum-tax-calculator" />
</>
}
