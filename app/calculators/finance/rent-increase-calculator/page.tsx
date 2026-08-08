import { CalculatorBatch25DeepDive } from '@/components/ui/CalculatorBatch25DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rent Increase Calculator USA 2026 — Stay or Move? | ToolTrio',
  description: 'Calculate whether to accept a rent increase or move. Compare total cost of staying vs moving, break-even months, and market rent comparison.',
  slug: 'rent-increase-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['rent increase calculator', 'should I move or stay rent increase', 'rent increase vs moving costs calculator', 'rent vs market rate comparison', 'lease renewal calculator USA 2026'],
})
const faqs = [
 {question:'How is the new rent calculated?',answer:'The calculator multiplies current monthly rent by one plus the entered annual increase percentage. It then compares that new rent with the entered market rent and alternative apartment rent.'},
 {question:'How does it decide whether staying or moving is cheaper?',answer:'It compares 12 months of the increased rent with 12 months of the new-place rent plus the entered one-time moving costs.'},
 {question:'What does months to break even mean?',answer:'It divides moving costs by the absolute monthly rent difference between staying and the alternative. If the two rents are equal, there is no meaningful finite break-even period.'},
 {question:'Does the lease-month input affect the result?',answer:'The current calculation receives lease months but compares annual costs using 12 months. Therefore changing lease months does not currently change the displayed stay-versus-move result.'},
 {question:'Does the calculator determine whether a rent increase is legal?',answer:'No. Rent-control, notice, lease and tenant-protection rules vary by jurisdiction. This page compares costs only and does not provide legal advice.'}
]
const relatedCalculators = [
  { name: 'Rent vs Buy Calculator', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent vs Buy Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', icon: '🏡', desc: 'Home Affordability Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch25DeepDive slug="rent-increase-calculator" />
</>
}
