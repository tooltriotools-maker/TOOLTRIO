import { CalculatorBatch38DeepDive } from '@/components/ui/CalculatorBatch38DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Retirement Withdrawal Calculator USA 2026 — Portfolio Sustainability | ToolTrio',
  description: 'Calculate how long your retirement portfolio will last based on withdrawal amount, investment return, inflation, and spending. Tests the 4% rule for your numbers.',
  slug: 'retirement-withdrawal-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['retirement withdrawal calculator', '4% rule calculator USA 2026', 'how long will retirement money last', 'portfolio depletion calculator', 'sustainable withdrawal rate calculator'],
})
const faqs = [
  { question: 'What does this retirement withdrawal calculator actually simulate?', answer: 'It applies one constant annual investment return, increases your withdrawal by the entered inflation rate each year, and subtracts that withdrawal after annual growth. It stops when the balance reaches zero or after the modeled horizon.' },
  { question: 'Is the displayed 4% amount a guarantee?', answer: 'No. The calculator simply reports 4% of the starting portfolio as a reference point. It does not simulate historical market sequences, taxes, fees, or changing spending.' },
  { question: 'Why can sequence-of-returns risk differ from this result?', answer: 'The model uses the same return every year. Real portfolios have gains and losses in different orders, and poor returns early in retirement can be more damaging when withdrawals are occurring.' },
  { question: 'How does inflation affect withdrawals?', answer: 'Each future withdrawal equals the starting withdrawal multiplied by one plus the inflation rate for each elapsed year, so higher inflation increases the dollar amount removed from the portfolio.' },
  { question: 'What important retirement income is excluded?', answer: 'Social Security, pensions, annuities, RMDs, taxes and other income are not included in this function, so incorporate them separately when evaluating a full retirement plan.' },
]
const relatedCalculators = [
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🏦', desc: 'Retirement Calculator' },
  { name: 'RMD Calculator', href: '/calculators/finance/required-minimum-distribution-calculator', icon: '📋', desc: 'RMD Calculator' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' },
  { name: 'Annuity Income Calculator', href: '/calculators/finance/annuity-income-calculator', icon: '📅', desc: 'Annuity Income Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch38DeepDive slug="retirement-withdrawal-calculator" />
</>
}
