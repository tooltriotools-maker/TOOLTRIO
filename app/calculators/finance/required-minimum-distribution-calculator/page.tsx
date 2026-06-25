import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Required Minimum Distribution (RMD) Calculator USA 2026 | ToolTrio',
  description: 'Calculate your IRS Required Minimum Distribution from Traditional IRA, 401k, or inherited accounts using 2026 IRS Uniform Lifetime Tables.',
  slug: 'required-minimum-distribution-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['RMD calculator 2026', 'required minimum distribution calculator', 'IRA RMD calculator USA', '401k RMD age 73', 'RMD table 2026 IRS'],
})

const faqs = [
  {
    question: 'When do RMDs start?',
    answer: "Under the SECURE 2.0 Act, RMDs begin at age 73 for people born between 1951–1959, and age 75 for those born in 1960 or later. The first RMD can be delayed until April 1 of the year after you turn 73, but you'd owe two RMDs that year (potentially pushing you into a higher bracket).",
  },
  {
    question: 'What is the penalty for missing an RMD?',
    answer: 'The IRS imposes a 25% excise tax on the amount NOT withdrawn (reduced to 10% if corrected within 2 years). On a $50,000 RMD, missing it costs $12,500 in penalty alone. SECURE 2.0 reduced this from the prior 50% penalty, but it remains substantial.',
  },
  {
    question: 'Can I reinvest my RMD?',
    answer: 'Yes — RMDs must be withdrawn and are taxed as ordinary income, but you can immediately reinvest the after-tax amount in a taxable brokerage account. You cannot roll RMDs back into an IRA. Qualified Charitable Distributions (QCDs) let you send up to $108,000 directly to charity, satisfying your RMD without increasing taxable income.',
  }
]

const relatedCalculators = [
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA Calculator' },
  { name: 'Roth Conversion Calculator', href: '/calculators/finance/roth-conversion-calculator', icon: '🔄', desc: 'Roth Conversion Calculator' },
  { name: 'Traditional IRA vs Taxable', href: '/calculators/finance/traditional-ira-vs-taxable-account-calculator', icon: '📊', desc: 'Traditional IRA vs Taxable' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
