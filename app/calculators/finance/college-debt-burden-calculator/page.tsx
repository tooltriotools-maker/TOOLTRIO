import { CalculatorBatch27DeepDive } from '@/components/ui/CalculatorBatch27DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'College Debt Burden Calculator USA 2026 — Is Your Loan Manageable? | ToolTrio',
  description: 'Calculate whether your student loan burden is manageable relative to expected salary, monthly payment-to-income ratio, and whether IDR forgiveness makes sense.',
  slug: 'college-debt-burden-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['college debt burden calculator USA 2026', 'student loan to income ratio', 'is my student loan too high', 'student debt manageable calculator', 'student loan payment to salary ratio USA'],
})
const faqs = [
  {
    question: 'What is the safe student loan-to-salary ratio?',
    answer: 'The commonly cited rule: borrow no more than your expected first-year salary. On $58,000 expected salary, borrow no more than $58,000. Payment at that balance: $637/month = 13.2% of monthly income — slightly above the 10% guideline. Above 15% of income is considered unmanageable without IDR. Above 20% typically means IDR is the only viable repayment path.',
  },
  {
    question: 'What happened to the SAVE plan?',
    answer: "The SAVE Plan ended after a March 2026 court order. Borrowers affected by the change are being directed to choose another legal repayment plan. New federal repayment options include the Repayment Assistance Plan (RAP) and Tiered Standard Repayment Plan, effective July 1, 2026. Use StudentAid.gov's current repayment tools rather than relying on an old SAVE estimate.",
  },
  {
    question: 'At what debt-to-income ratio should I consider IDR?',
    answer: "Consider IDR (income-driven repayment) when: (1) Debt-to-income ratio exceeds 1.0 (loans exceed annual salary), (2) Monthly payment under standard repayment exceeds 10-15% of gross income, (3) You work in public service (PSLF after 10 years), (4) You anticipate significant income growth and can pay more later. IDR is not just for struggling borrowers — it's a strategic tool, especially combined with PSLF.",
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
