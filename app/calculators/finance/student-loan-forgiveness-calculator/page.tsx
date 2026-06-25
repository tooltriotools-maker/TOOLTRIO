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
  title: 'Student Loan Forgiveness Calculator USA 2026 — IDR & PSLF | ToolTrio',
  description: 'Calculate payments and forgiveness amounts under SAVE, IBR, and PSLF plans. Compare total cost vs standard repayment.',
  slug: 'student-loan-forgiveness-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['student loan forgiveness calculator 2026', 'PSLF calculator', 'SAVE plan calculator', 'IBR student loan calculator USA', 'student loan repayment calculator 2026'],
})

const faqs = [
  {
    question: 'What is the SAVE plan for student loans?',
    answer: "SAVE (Saving on a Valuable Education) is the most generous IDR plan. Payments are 5% of discretionary income for undergraduate loans (10% for graduate) — the lowest of any plan. Borrowers earning under 225% of the federal poverty line ($30,885 for a single person) pay $0. SAVE also eliminates negative amortization: if your payment doesn't cover interest, the government covers the rest.",
  },
  {
    question: 'How does PSLF work in 2026?',
    answer: 'Public Service Loan Forgiveness requires 10 years (120 qualifying payments) of employment with a government or 501(c)(3) nonprofit organization while making payments under an income-driven repayment plan. After 120 payments, the remaining balance is forgiven tax-free. This is the most valuable student loan forgiveness — no tax bill on forgiven amounts, no income requirement.',
  },
  {
    question: 'Is student loan forgiveness taxable?',
    answer: 'PSLF forgiveness: federally tax-free. IDR forgiveness (SAVE, IBR, PAYE after 20–25 years): federally taxed as ordinary income in the year of forgiveness. State tax treatment varies. The American Rescue Plan exempted IDR forgiveness from federal tax through 2025; this exemption may or may not be extended. Plan for potential tax liability on large IDR forgiveness amounts.',
  }
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
