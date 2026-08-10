import { CalculatorBatch37DeepDive } from '@/components/ui/CalculatorBatch37DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'House Hacking ROI Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much house hacking reduces your effective mortgage payment, net ROI, and whether FHA financing works for your multi-unit property.',
  slug: 'house-hacking-roi-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['house hacking calculator USA 2026', 'house hacking ROI', 'duplex triplex house hack', 'FHA house hacking calculator', 'live for calculator real estate'],
})
const faqs = [
  {
    question: 'What is house hacking?',
    answer: 'House hacking means buying a multi-unit property (duplex, triplex, fourplex), living in one unit, and renting the others. The rental income reduces or eliminates your mortgage payment. FHA loans allow 3.5% down on 1-4 unit properties if you owner-occupy — making this one of the most useful wealth-building strategies for first-time buyers.',
  },
  {
    question: 'How much can house hacking save?',
    answer: 'On a $425,000 duplex with a $2,350/month mortgage, renting the second unit at $1,400/month reduces your effective housing cost to $950/month — far below market rent for comparable housing. Over 5 years, the savings, equity buildup, and appreciation combine for returns that typically exceed 30-50% ROI on the down payment.',
  },
  {
    question: 'Can I use FHA loan for house hacking?',
    answer: "Yes — FHA allows 3.5% down on 1-4 unit properties as long as you live in one unit. On a $425,000 duplex, that's $14,875 down vs $85,000 for 20% conventional. The trade-off: FHA MIP (mortgage insurance premium) of 0.55% annually. Still, the low down payment makes duplex house hacking accessible to most first-time buyers with decent credit (580+ score).",
  }
]
const relatedCalculators = [
  { name: 'Rental Property Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', desc: 'Rental Property Calculator' },
  { name: 'Mortgage Affordability', href: '/calculators/finance/mortgage-affordability-calculator', icon: '🏡', desc: 'Mortgage Affordability' },
  { name: 'Cap Rate Calculator', href: '/calculators/finance/cap-rate-calculator', icon: '📈', desc: 'Cap Rate Calculator' },
  { name: 'House Flip Calculator', href: '/calculators/finance/house-flip-calculator', icon: '🏗️', desc: 'House Flip Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch37DeepDive slug="house-hacking-roi-calculator" />
</>
}
