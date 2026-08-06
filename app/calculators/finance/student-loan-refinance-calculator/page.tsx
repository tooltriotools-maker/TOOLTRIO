import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Student Loan Refinance Calculator USA 2026 | ToolTrio',
  description: 'Compare current and proposed student-loan payments and total interest under fixed-rate amortization, with a warning about federal benefits lost in private refinancing.',
  slug: 'student-loan-refinance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['student loan refinance calculator 2026', 'refinance student loans savings calculator', 'student loan refi break even USA', 'private student loan refinance calculator', 'student loan interest savings'],
})
const faqs = [
  {
    question: 'What does refinancing change in this calculator?',
    answer: 'It replaces the current interest rate and remaining term with the proposed rate and term, then recalculates the fixed monthly payment and total scheduled interest.',
  },
  {
    question: 'Can a lower monthly payment still cost more overall?',
    answer: 'Yes. Extending the repayment term can lower the monthly payment while increasing total interest. Compare both monthly savings and total interest saved rather than using payment alone.',
  },
  {
    question: 'What happens if I refinance federal loans privately?',
    answer: 'Federal Student Aid warns that moving federal loans to a private lender takes them out of the federal student-aid system and can result in loss of federal benefits, including income-driven repayment and certain forgiveness, deferment, forbearance, and discharge protections.',
  },
  {
    question: 'Is federal consolidation the same as private refinancing?',
    answer: 'No. A Direct Consolidation Loan remains within the federal student-loan system. Private refinancing replaces the federal debt with a private loan and has different terms and protections.',
  },
  {
    question: 'Does this calculator include refinance fees?',
    answer: 'No fee input is used. The code currently reports a three-month break-even placeholder, so review the lender’s APR and any origination or other fees separately.',
  },
]
const relatedCalculators = [
  { name: 'Student Loan Forgiveness', href: '/calculators/finance/student-loan-forgiveness-calculator', icon: '📚', desc: 'Student Loan Forgiveness' },
  { name: 'Student Loan vs Invest', href: '/calculators/finance/student-loan-vs-invest-calculator', icon: '⚖️', desc: 'Student Loan vs Invest' },
  { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt Payoff Calculator' },
  { name: 'College ROI Calculator', href: '/calculators/finance/college-roi-calculator', icon: '🎓', desc: 'College ROI Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
