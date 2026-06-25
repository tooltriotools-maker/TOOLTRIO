import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Salary Calculator USA 2026 — Take-Home Pay by State | ToolTrio',
  description: 'Calculate exact take-home pay after federal income tax, FICA, and state taxes for all 50 states. Includes 401k, HSA, and FSA deductions.',
  slug: 'net-salary-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['net salary calculator USA 2026', 'take home pay calculator', 'after tax salary calculator USA', 'state income tax calculator', 'net pay calculator 2026 all states'],
})
const faqs = [
  {
    question: 'How much of my salary do I actually take home?',
    answer: 'At $95,000 with standard pre-tax deductions (401k, HSA, FSA) in California: federal tax ~$11,800, FICA ~$7,274, CA state tax ~$5,700 = total taxes ~$24,774. After $15,200 in pre-tax deductions (401k + HSA + FSA), take-home is approximately $55,000/year or $4,600/month. Effective tax rate: ~26%.',
  },
  {
    question: 'Which states have no income tax?',
    answer: 'As of 2026, these states have no state income tax: Alaska, Florida, Nevada, New Hampshire (interest/dividends only), South Dakota, Tennessee, Texas, Washington, Wyoming. This can save $3,000-$15,000+ annually on higher incomes. However, states without income tax often have higher property taxes, sales taxes, or other fees.',
  },
  {
    question: 'How do pre-tax deductions reduce my tax?',
    answer: "Pre-tax deductions (401k, HSA, FSA) reduce your federal and state taxable income dollar-for-dollar, saving you taxes at your marginal rate. Contributing $9,400 to a 401k at 22% federal + 9.3% CA state = 31.3% effective savings = $2,942 in tax savings. You're also building retirement wealth with money that would otherwise go to taxes.",
  }
]
const relatedCalculators = [
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck Calculator' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax Bracket Calculator' },
  { name: 'Salary Negotiation Calculator', href: '/calculators/finance/salary-negotiation-calculator', icon: '🤝', desc: 'Salary Negotiation Calculator' },
  { name: 'Annual Bonus Tax Calculator', href: '/calculators/finance/annual-bonus-tax-calculator', icon: '💵', desc: 'Annual Bonus Tax Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
