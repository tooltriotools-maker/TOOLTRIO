import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Scholarship & Financial Aid Calculator USA 2026 — College Aid | ToolTrio',
  description: 'Estimate Pell Grant eligibility, need-based aid, net college cost, and loan requirements based on Expected Family Contribution.',
  slug: 'scholarship-financial-aid-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['scholarship calculator 2026', 'financial aid calculator USA', 'pell grant eligibility calculator', 'EFC calculator', 'net college cost calculator 2026 FAFSA'],
})
const faqs = [
  {
    question: 'What is the FAFSA Expected Family Contribution?',
    answer: "EFC (now called Student Aid Index or SAI) is the amount FAFSA determines your family can contribute annually toward college costs. It's calculated from income, assets, family size, and number in college. EFC of $0 maximizes need-based aid eligibility; higher EFC reduces aid. File FAFSA as early as possible (October 1 for next school year) — many schools award aid on a first-come, first-served basis.",
  },
  {
    question: 'What is the 2026 Pell Grant maximum?',
    answer: "The 2026 maximum Pell Grant is $7,395/year for the lowest-EFC students (EFC = $0). The Pell Grant is the foundation of need-based federal aid — free money that doesn't need to be repaid. Students with EFC under approximately $5,000 typically receive partial Pell Grants. Pell is automatically processed through FAFSA.",
  },
  {
    question: 'What is the difference between subsidized and unsubsidized loans?',
    answer: "Subsidized federal loans: government pays interest while you're enrolled at least half-time; for undergrads with demonstrated need; limited to $3,500-$5,500/year by year. Unsubsidized loans: interest accrues from day one even while in school; available to all regardless of need; additional $2,000-$7,000/year. Both have 6.53% rate in 2026. Always exhaust subsidized loans before unsubsidized.",
  }
]
const relatedCalculators = [
  { name: 'College Savings 529 Calculator', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', desc: 'College Savings 529 Calculator' },
  { name: 'Student Loan Forgiveness Calculator', href: '/calculators/finance/student-loan-forgiveness-calculator', icon: '📚', desc: 'Student Loan Forgiveness Calculator' },
  { name: 'Student Loan Calculator', href: '/calculators/finance/student-loan-calculator', icon: '💰', desc: 'Student Loan Calculator' },
  { name: 'Education Goal Calculator', href: '/calculators/finance/education-goal-calculator', icon: '🏫', desc: 'Education Goal Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
