import { CalculatorBatch37DeepDive } from '@/components/ui/CalculatorBatch37DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Backdoor Roth IRA Calculator USA 2026 | ToolTrio',
  description: 'Estimate the taxable share of a backdoor Roth conversion under a simplified pro-rata calculation and see how existing IRA basis changes the result.',
  slug: 'backdoor-roth-ira-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['backdoor roth IRA calculator', 'backdoor roth conversion 2026', 'pro rata rule calculator', 'high income roth IRA', 'roth IRA income limit 2026'],
})

const faqs = [
  {
    question: 'Who may consider a backdoor Roth contribution?',
    answer: 'A backdoor Roth is commonly considered when income limits reduce or eliminate a direct Roth IRA contribution. For 2026, the direct Roth contribution phaseout is $153,000–$168,000 for single/head-of-household filers and $242,000–$252,000 for married filing jointly.',
  },
  {
    question: 'What is the pro-rata rule?',
    answer: 'A Roth conversion is not automatically tax-free just because you made a nondeductible IRA contribution. The taxable and nontaxable portions generally depend on your IRA basis relative to aggregated IRA balances. Form 8606 is used to report nondeductible basis and conversions.',
  },
  {
    question: 'What is the 2026 IRA contribution limit?',
    answer: 'The general IRA contribution limit for 2026 is $7,500, with an additional $1,100 catch-up for people age 50 or older, making $8,600. The limit is shared across Traditional and Roth IRA contributions.',
  },
  {
    question: 'Does high income prevent a Roth conversion?',
    answer: 'No. IRS guidance notes that regardless of adjusted gross income, you may be able to convert Traditional IRA amounts to a Roth IRA. Income limits apply to direct Roth contributions, not to the ability to convert.',
  },
  {
    question: 'What does this calculator simplify?',
    answer: 'It uses one total-IRA-balance input and one nondeductible-basis input. Actual pro-rata reporting can depend on aggregated Traditional, SEP, and SIMPLE IRA balances and year-end values, so confirm the result against Form 8606 rules.',
  },
]

const relatedCalculators = [
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA Calculator' },
  { name: 'Roth Conversion Calculator', href: '/calculators/finance/roth-conversion-calculator', icon: '🔄', desc: 'Roth Conversion Calculator' },
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch37DeepDive slug="backdoor-roth-ira-calculator" />
</>
}
