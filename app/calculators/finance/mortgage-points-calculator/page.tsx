import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Points Calculator USA 2026 — Buy Down Rate | ToolTrio',
  description: 'Calculate whether buying down your mortgage rate with discount points saves money. Find exact break-even month and lifetime savings.',
  slug: 'mortgage-points-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage points calculator 2026', 'discount points calculator USA', 'buy down mortgage rate calculator', 'should I pay points mortgage', 'points break-even calculator'],
})
const faqs = [
  {
    question: 'Should I buy mortgage discount points?',
    answer: 'Points make sense if you plan to keep the loan long enough to recoup the upfront cost through lower payments. With a 24-36 month break-even and plans to stay 7+ years, buying points is usually worthwhile. But if you might refinance or move within 5 years, paying points is often a loss. The break-even calculation is straightforward: upfront cost ÷ monthly savings = months to break even.',
  },
  {
    question: 'How much does 1 mortgage point cost?',
    answer: 'One discount point costs 1% of the loan amount ($4,000 on a $400,000 loan) and typically reduces the rate by 0.25%. However, this varies by lender and market conditions — sometimes a point buys only 0.125% rate reduction. Always compare points to APR across lenders rather than assuming a fixed conversion rate.',
  },
  {
    question: 'Are mortgage points tax deductible?',
    answer: 'Yes — discount points paid on a home purchase mortgage are generally fully deductible in the year paid (if you itemize deductions). Points paid on a refinance must be amortized (deducted over the life of the loan). The deduction is only valuable if you itemize — in 2026, about 15% of filers do. Run the numbers both ways.',
  }
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Mortgage Refinance Calculator', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', desc: 'Mortgage Refinance Calculator' },
  { name: 'Biweekly Mortgage Calculator', href: '/calculators/finance/biweekly-mortgage-calculator', icon: '📅', desc: 'Biweekly Mortgage Calculator' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', icon: '🏡', desc: 'Home Affordability Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
