import { CalculatorBatch25DeepDive } from '@/components/ui/CalculatorBatch25DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Points Calculator USA 2026 — Buy Down Rate | ToolTrio',
  description: 'Calculate whether buying down your mortgage rate with discount points saves money. Find exact break-even month and lifetime savings.',
  slug: 'mortgage-points-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage points calculator 2026', 'discount points calculator USA', 'buy down mortgage rate calculator', 'should I pay points mortgage', 'points break-even calculator'],
})
const faqs = [
 {question:'How much does one mortgage point cost in this calculator?',answer:'One point is modeled as 1% of the loan amount. Two points on a $400,000 loan therefore cost $8,000 upfront.'},
 {question:'How is the break-even month calculated?',answer:'The calculator amortizes the original loan and the reduced-rate loan, subtracts the two monthly principal-and-interest payments, then divides the points cost by that monthly savings.'},
 {question:'Does one point always reduce the rate by the same amount?',answer:'No. The rate-reduction input is separate because lender pricing changes with market conditions, loan characteristics and the day the rate is locked.'},
 {question:'What happens if I sell or refinance before break even?',answer:'If you stop using the loan before cumulative payment savings recover the upfront points, the modeled points purchase has not paid for itself. Tax effects and closing-cost differences are not included.'},
 {question:'Are mortgage points always tax deductible?',answer:'No. Federal tax treatment depends on the transaction and applicable IRS requirements. This calculator does not include a tax deduction in its break-even calculation.'}
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
        <CalculatorBatch25DeepDive slug="mortgage-points-calculator" />
</>
}
