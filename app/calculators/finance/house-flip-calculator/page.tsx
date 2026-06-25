import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'House Flip Calculator USA 2026 — Fix & Flip ROI | ToolTrio',
  description: 'Calculate gross profit, ROI, annualized return, and 70% rule compliance on any house flip project including financing, holding, and selling costs.',
  slug: 'house-flip-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['house flip calculator 2026', 'fix and flip calculator USA', '70 percent rule calculator real estate', 'house flipping ROI calculator', 'real estate flip profit calculator'],
})
const faqs = [
  {
    question: 'What is the 70% rule for house flipping?',
    answer: 'The 70% rule: Maximum Purchase Price = (ARV × 70%) - Repair Costs. It ensures enough margin to cover financing, holding costs, closing costs (both buy and sell ~8%), and still make a profit. On a $295,000 ARV with $45,000 rehab: max offer = ($295,000 × 0.70) - $45,000 = $161,500. This is a quick screening tool — actual profitability requires the full calculation.',
  },
  {
    question: 'What is a good ROI for house flipping?',
    answer: 'Experienced flippers target 15-20%+ ROI per flip, or 30-50% annualized (since most flips complete in 4-8 months). Hard money lenders typically require 20%+ equity after ARV. With holding costs, financing, and unexpected repairs, margins compress quickly. Average flippers net $60,000-$70,000 on flips in the $200,000-$350,000 range — but that requires discipline on the purchase price.',
  },
  {
    question: 'What are the biggest costs in house flipping?',
    answer: 'Financing (hard money loans at 10-15% APR + 2-3 points), holding costs (property tax, utilities, insurance: ~1.5% of value per year), selling costs (agent commission 5-6% + closing costs ~2%), and unexpected rehab overruns (budget 10-20% contingency on all rehab projects). Many beginners underestimate financing costs — 6 months of hard money on a $150,000 loan at 12% = $9,000 in interest alone.',
  }
]
const relatedCalculators = [
  { name: 'Rental Property Calculator', href: '/calculators/finance/rental-property-investment-calculator', icon: '🏘️', desc: 'Rental Property Calculator' },
  { name: 'Real Estate ROI', href: '/calculators/finance/real-estate-roi-calculator', icon: '📊', desc: 'Real Estate ROI' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
