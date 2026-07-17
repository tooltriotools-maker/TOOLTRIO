import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'SBA Loan Calculator USA 2026 — 7(a) and 504 Loans | ToolTrio',
  description: 'Calculate SBA loan monthly payment, DSCR eligibility, total interest cost, and maximum loan amount based on your business financials.',
  slug: 'sba-loan-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['SBA loan calculator 2026', 'SBA 7a loan calculator', 'SBA 504 loan calculator USA', 'business loan DSCR calculator', 'SBA loan eligibility calculator 2026'],
})
const faqs = [
  {
    question: 'What is the SBA 7(a) loan rate in 2026?',
    answer: 'SBA 7(a) rates are tied to the prime rate plus a lender spread. In 2026, with prime at approximately 7.5%, typical SBA 7(a) rates range from 10.5-13.5% for variable rate loans. Fixed rates are generally higher. SBA 504 loans (for real estate and equipment only) are structured differently with below-market fixed rates on the SBA debenture portion (~5.5-7%). SBA loans have rate caps set by the SBA as prime + 2.75% for loans over $50,000 with maturities over 7 years.',
  },
  {
    question: 'What is DSCR and why does it matter for SBA loans?',
    answer: 'DSCR (Debt Service Coverage Ratio) = Net Operating Income / Total Debt Service. SBA lenders require minimum DSCR of 1.25 — meaning the business generates $1.25 in cash flow for every $1.00 in debt payments. At DSCR of exactly 1.0, every dollar of profit goes to debt service with nothing left. Below 1.25, lenders view the business as unable to comfortably service the debt. Higher DSCR improves approval odds and may lower rate.',
  },
  {
    question: 'What can SBA loans be used for?',
    answer: 'SBA 7(a): Working capital, equipment, inventory, business acquisition, real estate (up to 51% owner-occupied), refinancing existing business debt. SBA 504: Real estate (minimum 51% owner-occupied) and major equipment only — NOT working capital. SBA Express: Same uses as 7(a) up to $500,000 with faster 36-hour turnaround. SBA Microloan: Up to $50,000 for small businesses and non-profits, especially minority and women-owned businesses.',
  }
]
const relatedCalculators = [
  { name: 'Business Valuation Calculator', href: '/calculators/finance/business-valuation-calculator', icon: '🏢', desc: 'Business Valuation Calculator' },
  { name: 'Break-Even Calculator', href: '/calculators/finance/break-even-calculator', icon: '📊', desc: 'Break-Even Calculator' },
  { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📈', desc: 'ROI Calculator' },
  { name: 'Business Loan Calculator', href: '/calculators/finance/business-loan-calculator', icon: '💼', desc: 'Business Loan Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
