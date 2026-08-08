import { CalculatorBatch41DeepDive } from '@/components/ui/CalculatorBatch41DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'RSU Equity Compensation Calculator USA 2026 | ToolTrio',
  description: 'Estimate RSU grant value, modeled ordinary income, vesting shares, and tax using a fair-market-value and flat-tax-rate scenario.',
  slug: 'equity-compensation-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['RSU tax calculator 2026', 'ISO NSO stock options calculator USA', 'equity compensation tax calculator', 'stock options ordinary income AMT', 'RSU vesting tax calculator USA'],
})

const faqs = [
  {
    question: 'What does this equity compensation calculator currently model?',
    answer: 'The live calculator currently runs the RSU branch only. It estimates grant value as shares multiplied by fair market value, treats that modeled value as ordinary income, applies the tax rate you enter, and divides shares evenly across the vesting period. It should not be used as an ISO or NSO exercise calculator.',
  },
  {
    question: 'How should I use the fair market value input for RSUs?',
    answer: 'Use FMV as a scenario value for the shares. Actual RSU compensation income generally depends on the value when each tranche vests, so a multi-year grant can have different taxable values at different vest dates. The calculator does not forecast future stock prices.',
  },
  {
    question: 'Does the tax result equal my actual RSU withholding or final tax bill?',
    answer: 'No. The calculator applies one flat tax percentage that you choose. Actual payroll withholding and final tax can involve federal income-tax rules, payroll taxes, state or local tax, other income, and the employer’s withholding method.',
  },
  {
    question: 'Does this calculator track capital gains after RSUs vest?',
    answer: 'No. It stops at a simplified vesting-value and tax estimate. If you keep vested shares, later price changes can create a separate capital gain or loss when you sell, and cost-basis and holding-period records become important.',
  },
  {
    question: 'Why is there a strike-price field if the calculator is in RSU mode?',
    answer: 'The interface uses a shared equity-compensation input set, but the current client always calculates type “rsu.” The RSU branch does not subtract an exercise cost, so the strike-price field does not change the live RSU result.',
  },
]

const relatedCalculators = [
  { name: 'Alternative Minimum Tax Calculator', href: '/calculators/finance/alternative-minimum-tax-calculator', icon: '⚠️', desc: 'Alternative Minimum Tax Calculator' },
  { name: 'Capital Gains Tax Calculator', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch41DeepDive slug="equity-compensation-calculator" />
</>
}
