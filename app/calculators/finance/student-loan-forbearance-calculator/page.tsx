import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Student Loan Forbearance Cost Calculator USA 2026 | ToolTrio',
  description: 'Calculate the true cost of student loan forbearance — interest accrued, balance increase, and long-term payment impact vs continuing to pay.',
  slug: 'student-loan-forbearance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['student loan forbearance cost calculator', 'forbearance vs deferment student loan', 'student loan interest during forbearance', 'student loan payment pause cost USA', 'forbearance cost calculator 2026'],
})
const faqs = [
  {
    question: 'How much does student loan forbearance cost?',
    answer: "During forbearance, interest continues to accrue (except on subsidized loans during school enrollment periods). On a $45,000 loan at 6.5%, 12 months of forbearance accrues $2,925 in interest, which capitalizes onto the principal — meaning you're now paying 6.5% interest on $2,925 in additional debt for the remaining life of the loan. The total long-term cost is $3,000-$5,000+ depending on remaining term.",
  },
  {
    question: 'What is the difference between forbearance and deferment?',
    answer: 'Deferment: payments paused, interest typically does NOT accrue on subsidized federal loans (grades school deferment, economic hardship deferment). Interest DOES accrue on unsubsidized loans and PLUS loans. Forbearance: payments paused, interest ALWAYS accrues on all loan types. Federal student loan servicers often push borrowers into forbearance (easier to process) rather than deferment — always ask specifically about deferment options and whether interest will accrue.',
  },
  {
    question: 'Is income-driven repayment better than forbearance?',
    answer: 'Almost always yes. Instead of $0 payment via forbearance (with interest accruing), an income-driven plan like SAVE sets your payment at 5-10% of discretionary income. If your income is very low, the SAVE plan may set your payment at $0 — same outcome as forbearance, but the time counts toward IDR forgiveness (20-25 years) and PSLF (10 years). Time in forbearance counts toward neither. Contact your servicer and explicitly ask about SAVE plan eligibility.',
  }
]
const relatedCalculators = [
  { name: 'Student Loan Forgiveness', href: '/calculators/finance/student-loan-forgiveness-calculator', icon: '📚', desc: 'Student Loan Forgiveness' },
  { name: 'Student Loan Refinance', href: '/calculators/finance/student-loan-refinance-calculator', icon: '🎓', desc: 'Student Loan Refinance' },
  { name: 'Student Loan Calculator', href: '/calculators/finance/student-loan-calculator', icon: '💰', desc: 'Student Loan Calculator' },
  { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt Payoff Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
