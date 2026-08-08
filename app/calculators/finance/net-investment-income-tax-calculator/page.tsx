import { CalculatorBatch16DeepDive } from '@/components/ui/CalculatorBatch16DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Investment Income Tax (NIIT) Calculator USA 2026 | ToolTrio',
  description: 'Calculate the 3.8% Net Investment Income Tax on dividends, capital gains, and rental income above the $200K/$250K threshold.',
  slug: 'net-investment-income-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['NIIT calculator 2026', 'net investment income tax calculator USA', '3.8% surtax calculator', 'Medicare surtax investment income', 'NIIT threshold 2026 calculator'],
})

const faqs = [
  {
    question: 'What is the Net Investment Income Tax?',
    answer: 'The 3.8% NIIT applies to the lesser of: (1) net investment income, or (2) the amount by which modified AGI exceeds $200,000 (single) or $250,000 (married). Investment income includes dividends, capital gains, rental income, passive income, and interest. It does NOT include wages, active business income, or distributions from qualified retirement accounts.',
  },
  {
    question: 'How can I reduce NIIT?',
    answer: 'Strategies: (1) Max retirement account contributions (401k, IRA) to reduce MAGI. (2) Tax-loss harvesting to offset capital gains. (3) Invest in municipal bonds (interest not subject to NIIT). (4) Convert rental income to active participation. (5) Qualified Opportunity Zone investments to defer/exclude gains. (6) Accelerate deductions (charitable contributions, business expenses) to reduce MAGI.',
  },
  {
    question: 'Does NIIT apply to IRA withdrawals?',
    answer: "No — withdrawals from Traditional IRAs and 401ks are NOT subject to NIIT (they're ordinary income). Roth IRA qualified distributions are also exempt. However, IRA distributions increase your MAGI, which may push more of your other investment income above the NIIT threshold. Large IRA withdrawals combined with investment income can significantly increase NIIT exposure.",
  }
]

const relatedCalculators = [
  { name: 'Capital Gains Tax Calculator', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Crypto Tax Calculator', href: '/calculators/finance/crypto-tax-calculator', icon: '₿', desc: 'Crypto Tax Calculator' },
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', icon: '💰', desc: 'Dividend Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch16DeepDive slug="net-investment-income-tax-calculator" />
</>
}
