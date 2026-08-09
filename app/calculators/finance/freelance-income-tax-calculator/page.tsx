import { CalculatorBatch38DeepDive } from '@/components/ui/CalculatorBatch38DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Freelance Income Tax Calculator USA 2026 — Self-Employed Net Income | ToolTrio',
  description: 'Calculate freelance take-home pay after self-employment tax, federal income tax, SE deduction, QBI deduction, and quarterly estimated payments.',
  slug: 'freelance-income-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['freelance income tax calculator 2026', 'self employed take home pay calculator USA', 'freelancer after tax income calculator', '1099 income tax calculator', 'gig worker tax calculator USA 2026'],
})
const faqs = [
  {
    question: 'How much should I charge as a freelancer to match my salary?',
    answer: 'To match a $85,000 W-2 salary as a freelancer, you need roughly $110,000-$130,000 in gross freelance revenue. The markup accounts for: self-employment tax (15.3%), no employer benefits (health insurance, 401k match), unpaid vacation/sick time, unbillable overhead time, and business expenses. Divide your target annual income by 0.65-0.70 as a quick freelance rate target.',
  },
  {
    question: 'What business expenses can I deduct as a freelancer?',
    answer: 'Common deductible freelance expenses: home office (dedicated space), computer and equipment, software subscriptions, professional development and courses, industry publications, business travel (actual expenses or mileage at $0.67/mile in 2026), business phone proportion, professional insurance (E&O, liability), accounting/legal fees, marketing costs, professional association dues. Keep receipts for everything — the IRS requires documentation for deductions above $250.',
  },
  {
    question: 'How do I pay quarterly estimated taxes?',
    answer: 'Self-employed people making $1,000+ annually owe estimated taxes quarterly. 2026 due dates: April 15 (Q1), June 15 (Q2), September 15 (Q3), January 15, 2027 (Q4). Calculate by estimating annual income, subtracting deductions, and dividing tax by 4. Safe harbor: pay 100% of prior year tax (110% if AGI >$150K). Underpayment penalty is approximately 8% annualized (2026 rate). Use EFTPS.gov or IRS Direct Pay for electronic payments.',
  }
]
const relatedCalculators = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '💼', desc: 'Self-Employment Tax' },
  { name: 'QBI Deduction', href: '/calculators/finance/qbi-deduction-calculator', icon: '📋', desc: 'QBI Deduction' },
  { name: 'Solo 401k Calculator', href: '/calculators/finance/solo-401k-calculator', icon: '💼', desc: 'Solo 401k Calculator' },
  { name: 'Home Office Deduction', href: '/calculators/finance/home-office-deduction-calculator', icon: '🏠', desc: 'Home Office Deduction' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch38DeepDive slug="freelance-income-tax-calculator" />
</>
}
