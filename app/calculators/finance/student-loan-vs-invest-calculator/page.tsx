import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Pay Off Student Loans vs Invest Calculator USA 2026 | ToolTrio',
  description: 'Calculate whether extra money should pay down student loans or go into investments — comparing interest saved vs investment growth.',
  slug: 'student-loan-vs-invest-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['pay off student loans vs invest', 'student loan payoff vs investing calculator', 'extra payment student loan or invest', 'student loan interest vs market return', 'debt vs invest calculator USA'],
})
const faqs = [
  {
    question: 'Should I pay off student loans or invest?',
    answer: 'The mathematical answer: if your expected investment return exceeds your loan interest rate (after tax), invest. With a 6.5% student loan rate and expected 8% market return, investing wins — but by a smaller margin than most people expect after risk-adjustment. If your loans are above 7%, paying them off is a guaranteed risk-free return at that rate.',
  },
  {
    question: 'Does student loan interest deduction change the math?',
    answer: 'Yes — the student loan interest deduction (up to $2,500/year) effectively reduces your loan rate by your marginal tax rate. On a 6.5% loan at 22% marginal rate: effective rate = 6.5% × (1-0.22) = 5.07%. This makes the invest-vs-payoff comparison lean more toward investing. However, the deduction phases out above $75,000 AGI (single) in 2026.',
  },
  {
    question: 'What about PSLF or IDR forgiveness?',
    answer: "If you qualify for PSLF (Public Service Loan Forgiveness) or income-driven repayment forgiveness, the calculus changes completely. Paying extra on loans you'll have forgiven is suboptimal — instead, make minimum IDR payments and invest the difference. This calculator assumes no forgiveness; use our Student Loan Forgiveness Calculator if forgiveness applies to you.",
  }
]
const relatedCalculators = [
  { name: 'Student Loan Forgiveness Calculator', href: '/calculators/finance/student-loan-forgiveness-calculator', icon: '🎓', desc: 'Student Loan Forgiveness Calculator' },
  { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt Payoff Calculator' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' },
  { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', icon: '📈', desc: 'Compound Interest Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
