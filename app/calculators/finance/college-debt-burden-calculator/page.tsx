import { CalculatorBatch27DeepDive } from '@/components/ui/CalculatorBatch27DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'College Debt Burden Calculator USA 2026 — Is Your Loan Manageable? | ToolTrio',
  description: 'Model student-loan payment burden relative to expected salary using transparent amortization assumptions. It does not determine federal repayment-plan eligibility or forgiveness.',
  slug: 'college-debt-burden-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['college debt burden calculator USA 2026', 'student loan to income ratio', 'is my student loan too high', 'student debt manageable calculator', 'student loan payment to salary ratio USA'],
})
const faqs = [
  {
    question: 'What is the safe student loan-to-salary ratio?',
    answer: 'There is no universal federal rule that a student loan is safe or unsafe at a particular debt-to-salary ratio. This calculator uses its 10% payment-to-income line only as a planning heuristic; lenders and federal repayment programs use different rules.',
  },
  {
    question: 'What happened to the SAVE plan?',
    answer: "The SAVE Plan ended after a March 2026 court order. Borrowers affected by the change are being directed to choose another legal repayment plan. New federal repayment options include the Repayment Assistance Plan (RAP) and Tiered Standard Repayment Plan, effective July 1, 2026. Use StudentAid.gov's current repayment tools rather than relying on an old SAVE estimate.",
  },
  {
    question: 'At what debt-to-income ratio should I consider IDR?',
    answer: "If the modeled payment is high, compare the current federal repayment options at StudentAid.gov and with your loan servicer. Eligibility, payment formulas and forgiveness depend on the current federal rules and borrower circumstances.",
  }
]
const relatedCalculators = [
  { name: 'Student Loan Forgiveness', href: '/calculators/finance/student-loan-forgiveness-calculator', icon: '📚', desc: 'Student Loan Forgiveness' },
  { name: 'Student Loan Refinance', href: '/calculators/finance/student-loan-refinance-calculator', icon: '🎓', desc: 'Student Loan Refinance' },
  { name: 'College ROI Calculator', href: '/calculators/finance/college-roi-calculator', icon: '🎓', desc: 'College ROI Calculator' },
  { name: 'Scholarship & Aid', href: '/calculators/finance/scholarship-financial-aid-calculator', icon: '🏫', desc: 'Scholarship & Aid' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch27DeepDive slug="college-debt-burden-calculator" />
</>
}
