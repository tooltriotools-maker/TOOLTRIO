import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Student Loan Forgiveness Calculator USA 2026 — IDR & PSLF | ToolTrio',
  description: 'Calculate payments and forgiveness amounts under SAVE, IBR, and PSLF plans. Compare total cost vs standard repayment.',
  slug: 'student-loan-forgiveness-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['student loan forgiveness calculator 2026', 'PSLF calculator', 'SAVE plan calculator', 'IBR student loan calculator USA', 'student loan repayment calculator 2026'],
})

const faqs = [
  { question: "Is SAVE still an available repayment plan in 2026?", answer: "No. A court order ended the SAVE Plan in March 2026. This calculator still contains a legacy SAVE-style formula, so that scenario is shown only for illustration and should not be treated as a currently available repayment plan." },
  { question: "Does this calculator determine PSLF eligibility?", answer: "No. PSLF depends on qualifying federal loans, qualifying employment and qualifying payments under current program rules. Balance, income and family size alone cannot establish eligibility." },
  { question: "Why can the estimated forgiven balance differ from my servicer?", answer: "The model uses a simplified payment and balance-reduction formula and does not amortize each loan with its actual interest rate, capitalization history or payment count." },
  { question: "Can forgiven student debt be taxable?", answer: "Tax treatment depends on the forgiveness program and the law in effect when forgiveness occurs. The calculator uses a simplified tax assumption for non-PSLF scenarios and should not be used to prepare a tax return." },
  { question: "Where should I verify current repayment options?", answer: "Use your StudentAid.gov account and official Federal Student Aid guidance, because available repayment plans and program rules can change." }
]

const relatedCalculators = [
  { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt Payoff Calculator' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '💰', desc: 'Income Tax Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Net Worth Calculator' }
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
