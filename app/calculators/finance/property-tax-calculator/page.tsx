import { CalculatorBatch33DeepDive } from '@/components/ui/CalculatorBatch33DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Property Tax Estimator — Texas Scenario | ToolTrio',
  description: 'Estimate annual property tax and monthly escrow for the calculator’s Texas scenario using home value, modeled assessed value, and an entered exemption.',
  slug: 'property-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['property tax calculator USA 2026', 'annual property tax estimator', 'property tax by state calculator', 'homestead exemption calculator', 'property tax escrow calculator USA'],
})
const faqs = [
  {
    question: 'What states have the highest and lowest property taxes?',
    answer: 'Highest effective rates (2026): New Jersey (2.47%), Illinois (2.27%), Connecticut (2.14%), Wisconsin (1.62%), Texas (1.81%). Lowest rates: Hawaii (0.32%), Alabama (0.37%), Colorado (0.51%), Nevada (0.59%), Arizona (0.63%). However, high property tax states often have no income tax (TX) or lower home values, so absolute dollar amounts vary greatly.',
  },
  {
    question: 'What is a homestead exemption?',
    answer: "A homestead exemption reduces the taxable assessed value of your primary residence, lowering property taxes. Texas exempts $100,000 of value for all homeowners (2024+). Florida exempts $50,000. California's Prop 13 limits annual increases to 2%. Many states add senior, veteran, and disability exemptions. Apply through your county tax assessor's office — many homeowners miss this free savings.",
  },
  {
    question: 'When and how can I appeal my property tax?',
    answer: "If your assessed value exceeds your home's fair market value, appeal within your county's appeal window (typically 30-90 days after assessment notice). Steps: (1) Get comparable sales data from Zillow/Redfin for similar nearby homes, (2) Submit formal appeal with your county assessor or review board, (3) Present evidence of lower market value. Success rate is typically 30-60% of appeals; average savings $1,500-$4,000.",
  },
  { question: 'Does this calculate an official Travis County tax bill?', answer: 'No. The current calculator hard-codes a Texas scenario and uses an 85% assessment ratio plus a stored effective-rate assumption. Official bills depend on local appraised value, exemptions and taxing-unit rates.' },
  { question: 'What does the appeal savings result mean?', answer: 'It is a scenario equal to 15% of the estimated tax. It does not predict an appeal outcome or prove that an assessment is excessive.' },
]
const relatedCalculators = [
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '💵', desc: 'Closing Cost Calculator' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', icon: '🏡', desc: 'Home Affordability Calculator' },
  { name: 'Rent vs Buy Calculator', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent vs Buy Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch33DeepDive slug="property-tax-calculator" />
</>
}
