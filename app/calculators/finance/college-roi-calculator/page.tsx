import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'College ROI Calculator USA 2026 — Is a Degree Worth It? | ToolTrio',
  description: 'Calculate the financial return on college education: net present value, payback period, lifetime salary premium, and loan vs no-degree comparison.',
  slug: 'college-roi-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['college ROI calculator', 'is college worth it calculator USA 2026', 'degree value calculator', 'college salary premium calculator', 'college NPV calculator USA'],
})
const faqs = [
 {question:'What counts as the investment in the degree?',answer:'The model adds the entered degree cost to foregone earnings during the years in school, using the salary-without-degree input as the annual opportunity cost.'},
 {question:'How is lifetime salary premium calculated?',answer:'It takes salary with the degree minus salary without the degree and multiplies that starting difference by the entered work years. It does not model raises, career changes or unemployment.'},
 {question:'How is NPV calculated?',answer:'The annual salary premium is discounted at a fixed 5% rate in the code and the entered degree cost is subtracted. The opportunity cost used elsewhere in the calculator is not separately subtracted in that NPV formula.'},
 {question:'What loan repayment term is assumed?',answer:'The loan-payment output amortizes the full degree cost over 120 months, or 10 years, at the entered interest rate. Grants, scholarships, income-driven repayment and partial cash funding are not modeled.'},
 {question:'Does a positive ROI prove a degree is worth attending?',answer:'No. The result depends heavily on the salary assumptions and ignores many nonfinancial outcomes and risks. Use program-specific net price, completion probability and realistic earnings data when comparing schools.'}
]
const relatedCalculators = [
  { name: 'Student Loan Forgiveness', href: '/calculators/finance/student-loan-forgiveness-calculator', icon: '📚', desc: 'Student Loan Forgiveness' },
  { name: 'College Savings 529', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', desc: 'College Savings 529' },
  { name: 'Scholarship & Aid', href: '/calculators/finance/scholarship-financial-aid-calculator', icon: '🏫', desc: 'Scholarship & Aid' },
  { name: 'Student Loan Calculator', href: '/calculators/finance/student-loan-calculator', icon: '💰', desc: 'Student Loan Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
