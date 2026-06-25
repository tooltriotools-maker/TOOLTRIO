import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Student Loan Refinance Calculator USA 2026 | ToolTrio',
  description: 'Calculate monthly savings, total interest saved, and break-even from refinancing student loans. Includes warning about losing federal loan benefits.',
  slug: 'student-loan-refinance-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['student loan refinance calculator 2026', 'refinance student loans savings calculator', 'student loan refi break even USA', 'private student loan refinance calculator', 'student loan interest savings'],
})
const faqs = [
  {
    question: 'When should I refinance student loans?',
    answer: "Refinance federal loans only if: you won't qualify for PSLF, IDR forgiveness, or income-driven repayment plans; you have stable income; your credit score qualifies you for a meaningfully lower rate (1.5%+ reduction); and you don't need federal protections (deferment, forbearance, IDR). Refinancing federal loans to private permanently eliminates all federal protections — this is irreversible. For private loans, refinance whenever you can get a lower rate.",
  },
  {
    question: 'What credit score do I need to refinance?',
    answer: 'Most private lenders require 660+ credit score for approval, 720+ for the best rates. Earnest, SoFi, Laurel Road, CommonBond, and ELFI are major refinancing lenders. Current 5-year fixed rates for excellent credit (760+) are approximately 4.5-5.5%; variable rates start lower. Always get quotes from 3+ lenders — a rate comparison typically takes 10 minutes and can reveal $5,000-$20,000 in savings.',
  },
  {
    question: 'Can I refinance federal loans and keep IDR or PSLF?',
    answer: "No — refinancing federal student loans to a private lender converts them to private loans, permanently eliminating eligibility for all federal programs: Income-Driven Repayment (SAVE, IBR, PAYE), Public Service Loan Forgiveness (PSLF), federal deferment and forbearance, death/disability discharge, and Teacher Loan Forgiveness. If there is any possibility you'll pursue PSLF or IDR forgiveness, do not refinance federal loans.",
  }
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
