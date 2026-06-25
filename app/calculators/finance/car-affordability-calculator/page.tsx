import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Car Affordability Calculator USA 2026 — How Much Car Can I Afford? | ToolTrio',
  description: 'Calculate maximum car price, monthly payment, and total cost of ownership based on income, debts, and 15% rule for vehicle affordability.',
  slug: 'car-affordability-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['car affordability calculator 2026', 'how much car can I afford USA', 'car payment calculator', 'auto loan affordability', '20 4 10 rule car calculator'],
})
const faqs = [
  {
    question: 'What is the 20/4/10 rule for car buying?',
    answer: 'Put at least 20% down, finance for no more than 4 years, and keep total vehicle expenses (payment + insurance) under 10% of gross monthly income. This is more conservative than lender guidelines but produces better financial outcomes. On $6,500/month income, 10% = $650/month maximum for car + insurance combined.',
  },
  {
    question: 'What are 2026 average car loan rates?',
    answer: '2026 average auto loan rates: New car (excellent credit 720+): 5.5-7.0%. New car (good credit 660-719): 7.5-10%. Used car (excellent credit): 7.5-9.5%. Used car (good credit): 10-14%. Credit unions typically offer 0.5-1.5% lower rates than banks. Rates from manufacturer financing promotions can be 0-2.9% on qualifying vehicles.',
  },
  {
    question: 'Should I buy new or used?',
    answer: 'New cars depreciate 15-25% in year one. A 2-3 year old certified pre-owned vehicle with 25,000-40,000 miles has taken the largest depreciation hit while still having remaining warranty coverage. For most buyers, a CPO vehicle represents the best value. New cars make financial sense when: manufacturer incentives (0% APR, cash back) close the gap, or when you plan to keep the vehicle 10+ years.',
  }
]
const relatedCalculators = [
  { name: 'Buy vs Lease Vehicle', href: '/calculators/finance/buy-vs-lease-vehicle-calculator', icon: '🚗', desc: 'Buy vs Lease Vehicle' },
  { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal Loan Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
