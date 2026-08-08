import { CalculatorBatch47DeepDive } from '@/components/ui/CalculatorBatch47DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax-Efficient Retirement Withdrawal Calculator USA 2026 | ToolTrio',
  description: 'Optimize which retirement accounts to withdraw from first — minimizing taxes by sequencing Traditional IRA, Roth IRA, and taxable account withdrawals.',
  slug: 'tax-efficient-withdrawal-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['tax efficient withdrawal calculator','retirement withdrawal order calculator','which account to withdraw from first retirement','retirement account sequencing strategy'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What\'s the traditional recommended retirement withdrawal order?', answer: 'A commonly cited default order is: taxable accounts first (lowest tax cost since only gains are taxed, often at favorable capital gains rates), then Traditional/tax-deferred accounts, and Roth accounts last (since they\'re tax-free and you want to maximize their tax-free compounding time) — though the optimal order can vary based on your specific tax situation each year.' },
  { question: 'Why isn\'t the simple withdrawal order always the best strategy?', answer: 'A more sophisticated approach considers filling up lower tax brackets each year with Traditional IRA withdrawals (rather than avoiding them entirely until required), which can reduce your total lifetime tax bill and the impact of Required Minimum Distributions later, compared to rigidly following taxable-then-traditional-then-Roth in sequence.' },
  { question: 'How do Required Minimum Distributions affect withdrawal strategy?', answer: 'Once RMDs begin (age 73 under SECURE 2.0), you\'re forced to withdraw a minimum amount from Traditional retirement accounts regardless of your spending needs — proactively withdrawing from or converting Traditional accounts in earlier, lower-income retirement years can reduce the size of future RMDs and their tax impact.' },
  { question: "Is the displayed RMD my official required minimum distribution?", answer: "No. The code uses a single 26.5 divisor for everyone age 73 or older. Actual RMDs require the applicable IRS table, age, year-end balance and account-specific rules." },
  { question: "Why does the calculator withdraw from Roth before taxable funds?", answer: "That is the current ToolTrio sequencing rule after any modelled RMD. It is not universally tax-optimal; basis, gains, brackets, Medicare premiums and estate goals can change the preferred order." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Retirement Bucket Strategy', href: '/calculators/finance/retirement-bucket-strategy-calculator', icon: '🪣', desc: 'Retirement Bucket Strategy' },
  { name: 'Roth vs Traditional 401k', href: '/calculators/finance/roth-vs-traditional-401k-calculator', icon: '🔄', desc: 'Roth vs Traditional 401k' },
  { name: 'Tax Deferral Benefit', href: '/calculators/finance/tax-deferral-benefit-calculator', icon: '📊', desc: 'Tax Deferral Benefit' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch47DeepDive slug="tax-efficient-withdrawal-calculator" />
</>
}
