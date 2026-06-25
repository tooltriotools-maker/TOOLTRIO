import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Real Estate Cost Basis & Capital Gains Calculator USA 2026 | ToolTrio',
  description: 'Calculate adjusted cost basis, Section 121 exclusion ($250K/$500K), depreciation recapture, and total tax on home or rental sale.',
  slug: 'real-estate-cost-basis-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['real estate cost basis calculator', 'home sale capital gains calculator 2026', 'section 121 exclusion calculator', 'depreciation recapture calculator', 'adjusted cost basis real estate USA'],
})

const faqs = [
  {
    question: 'What is the Section 121 home sale exclusion?',
    answer: 'Homeowners can exclude up to $250,000 (single) or $500,000 (married filing jointly) of capital gains from the sale of their primary residence. Requirements: owned the home for at least 2 of the past 5 years AND lived in it as your primary residence for at least 2 of the past 5 years. The exclusion can be used once every 2 years.',
  },
  {
    question: 'What is depreciation recapture on real estate?',
    answer: 'If you claimed depreciation on a rental property, the IRS recaptures that depreciation at a maximum 25% rate — separate from the regular capital gains rate. Example: $50,000 in depreciation claimed on a rental = $12,500 in depreciation recapture tax, regardless of your capital gains rate. You cannot avoid this by using Section 121 exclusion.',
  },
  {
    question: 'What counts as capital improvements (cost basis additions)?',
    answer: 'Capital improvements that increase basis include: additions (new room, garage), systems (HVAC, new roof, windows), landscaping, kitchen/bath remodels. Normal maintenance and repairs do NOT increase basis — painting, fixing appliances, routine upkeep are not improvements. Keep receipts for all improvements for at least 3 years after selling.',
  }
]

const relatedCalculators = [
  { name: 'Capital Gains Tax Calculator', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax Calculator' },
  { name: 'Real Estate ROI Calculator', href: '/calculators/finance/real-estate-roi-calculator', icon: '🏠', desc: 'Real Estate ROI Calculator' },
  { name: 'Rent vs Buy Calculator', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent vs Buy Calculator' },
  { name: 'Rental Yield Calculator', href: '/calculators/finance/rental-yield-calculator', icon: '💰', desc: 'Rental Yield Calculator' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
