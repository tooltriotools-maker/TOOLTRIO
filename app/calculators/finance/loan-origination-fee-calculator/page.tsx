import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Loan Origination Fee Calculator USA 2026 — Is the Fee Worth It? | ToolTrio',
  description: 'Calculate the true cost of loan origination fees, effective APR, and break-even vs a no-fee higher-rate loan.',
  slug: 'loan-origination-fee-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['loan origination fee calculator USA 2026', 'mortgage origination fee calculator', 'is loan origination fee worth it', 'loan fee vs higher rate calculator', 'APR origination fee calculator'],
})
const faqs = [
  {
    question: 'What is a loan origination fee?',
    answer: "An origination fee is charged by lenders to process, underwrite, and fund a loan — typically 0.5-1.5% of the loan amount. On a $350,000 mortgage, a 1% origination fee = $3,500. Some lenders offer 'no-fee' loans at a higher interest rate. Whether to pay the fee depends on how long you keep the loan: the monthly savings from a lower rate must exceed the upfront fee within your expected holding period.",
  },
  {
    question: 'How do origination fees affect APR?',
    answer: 'APR (Annual Percentage Rate) includes origination fees, discount points, and other financing costs spread over the loan term — making it a better true cost measure than the interest rate alone. A 6.875% loan with 1% origination fee has an APR closer to 7.0%. Always compare APR across lenders, not just the advertised rate. The Truth in Lending Act (TILA) requires lenders to disclose APR.',
  },
  {
    question: 'Can I negotiate origination fees?',
    answer: "Yes — origination fees are negotiable, especially in a competitive mortgage market. Strategies: (1) Get multiple competing loan estimates and use them as leverage. (2) Ask specifically for a 'lender credit' to offset fees in exchange for a slightly higher rate. (3) Ask what can be waived — application fees, underwriting fees, and processing fees are often more flexible than origination points. (4) Credit unions and community banks often have lower fees than large retail banks.",
  }
]
const relatedCalculators = [
  { name: 'Mortgage Points Calculator', href: '/calculators/finance/mortgage-points-calculator', icon: '📐', desc: 'Mortgage Points Calculator' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '💵', desc: 'Closing Cost Calculator' },
  { name: 'Mortgage Refinance Calculator', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', desc: 'Mortgage Refinance Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
