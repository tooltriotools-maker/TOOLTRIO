import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Home Equity Loan Calculator USA 2026 | ToolTrio',
  description: 'Calculate home equity loan payments, total interest, CLTV ratio, and compare against HELOC and cash-out refinance.',
  slug: 'home-equity-loan-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['home equity loan calculator 2026', 'home equity loan payment calculator', 'CLTV calculator USA', 'home equity loan vs HELOC', 'second mortgage calculator USA'],
})
const faqs = [
  {
    question: 'What is a home equity loan vs HELOC?',
    answer: 'Home equity loan: fixed amount, fixed rate, fixed monthly payment — like a second mortgage. Best for one-time large expenses. HELOC: revolving credit line, variable rate, draw as needed during draw period. Best for ongoing or uncertain expenses. Home equity loans have higher rates than HELOCs but more payment certainty. Both require sufficient home equity (typically 15-20% remaining after the loan).',
  },
  {
    question: 'What CLTV is needed for a home equity loan?',
    answer: "Most lenders require a Combined Loan-to-Value (CLTV) of 85% or less — meaning your first mortgage plus the new home equity loan cannot exceed 85% of your home's current appraised value. With a $425,000 home, the maximum combined debt is $361,250. If your first mortgage is $220,000, you can borrow up to $141,250.",
  },
  {
    question: 'Is home equity loan interest tax deductible?',
    answer: "Home equity loan interest is deductible if (1) you itemize deductions and (2) the loan proceeds are used to 'buy, build, or substantially improve' the home securing the loan. Using a home equity loan for personal expenses, vacation, or paying off credit cards is NOT deductible under current law (TCJA, through 2025; watch for changes).",
  }
]
const relatedCalculators = [
  { name: 'HELOC Calculator', href: '/calculators/finance/heloc-credit-line-calculator', icon: '🏡', desc: 'HELOC Calculator' },
  { name: 'Cash-Out Refinance vs HELOC', href: '/calculators/finance/cash-out-refinance-vs-heloc-calculator', icon: '🔄', desc: 'Cash-Out Refinance vs HELOC' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Real Estate ROI', href: '/calculators/finance/real-estate-roi-calculator', icon: '📊', desc: 'Real Estate ROI' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
