import { CalculatorBatch48DeepDive } from '@/components/ui/CalculatorBatch48DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Rule 72(t) SEPP Calculator USA 2026 | ToolTrio', description: 'Calculate Substantially Equal Periodic Payments (SEPP) for penalty-free early IRA withdrawals before age 59½ using IRS Rule 72(t).', slug: '72t-sepp-calculator', category: 'finance', region: 'usa', keywords: ['72t calculator', 'SEPP calculator USA', 'early IRA withdrawal calculator', 'substantially equal periodic payments 72t'] })
const faqs = [
  { question: 'What does this 72(t) calculator estimate?', answer: 'It compares simplified RMD, fixed-amortization and annuity-style payment estimates from the balance, age and interest-rate assumption. The ToolTrio life-expectancy shortcut is not an IRS life-expectancy table, so the displayed amounts are educational estimates rather than amounts to use to establish a SEPP.' },
  { question: 'How long must a SEPP continue?', answer: 'A substantially equal periodic payment plan generally must continue until the later of five years after the first payment or age 59½. Improper modification can trigger recapture of the additional tax on prior distributions plus interest.' },
  { question: 'What interest rate can a 72(t) plan use?', answer: 'IRS guidance limits the rate for the fixed amortization and fixed annuitization methods to no more than the greater of 5% or 120% of the federal mid-term rate for either of the two months immediately before the first distribution month.' },
  { question: 'Can I use 90 minus my age as the IRS life expectancy?', answer: 'No. That is only the shortcut used inside this ToolTrio estimator. IRS guidance specifies permitted life-expectancy tables, and the fixed-annuitization method uses prescribed mortality information.' },
  { question: 'Should I start a SEPP from this result?', answer: 'No. SEPP errors can be costly and difficult to reverse. Verify the account balance, valuation date, permitted interest rate, life-expectancy or mortality table, payment timing and modification rules with a qualified tax professional.' }
]
const relatedCalculators = [{'name': 'Retirement Withdrawal', 'href': '/calculators/finance/retirement-withdrawal-calculator', 'icon': '💰', 'desc': 'Withdrawal planning'}, {'name': 'Required Minimum Distribution', 'href': '/calculators/finance/required-minimum-distribution-calculator', 'icon': '📅', 'desc': 'RMD calculator'}, {'name': 'Early Retirement', 'href': '/calculators/finance/early-retirement-calculator', 'icon': '🔥', 'desc': 'Early retirement'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch48DeepDive slug="72t-sepp-calculator" />
</> }
