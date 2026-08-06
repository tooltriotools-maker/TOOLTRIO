import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Real Estate Cost Basis & Capital Gains Calculator | ToolTrio',
  description: 'Estimate adjusted real estate basis and gain after selling costs. Model the ToolTrio home-sale exclusion and depreciation-tax assumptions, with limitations explained.',
  slug: 'real-estate-cost-basis-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['real estate cost basis calculator', 'home sale capital gains calculator 2026', 'section 121 exclusion calculator', 'depreciation recapture calculator', 'adjusted cost basis real estate USA'],
})

const faqs = [
  {
    question: 'How does adjusted basis affect gain on a real estate sale?',
    answer: 'The calculator starts with purchase price, adds entered purchase closing costs and capital improvements, then subtracts depreciation. It compares that adjusted basis with sale proceeds after selling costs. IRS guidance likewise uses amount realized and adjusted basis to determine gain, but the tax basis treatment of individual closing costs can vary by item.',
  },
  {
    question: 'Does this calculator determine whether I qualify for the Section 121 exclusion?',
    answer: 'No. The current ToolTrio formula automatically applies up to $250,000 of exclusion to positive gain and does not ask about filing status, ownership, use, prior exclusions, or rental/nonqualified use. IRS rules generally require ownership and use tests, and up to $500,000 may be available on many joint returns when the requirements are met.',
  },
  {
    question: 'How does depreciation change real estate basis?',
    answer: 'The entered depreciation amount reduces adjusted basis in this model, which can increase realized gain. For property converted to rental or business use, actual depreciation rules can be more complicated than one cumulative input.',
  },
  {
    question: 'Is depreciation recapture always taxed at exactly 25%?',
    answer: 'No. This calculator uses 25% as a simplified tax-rate assumption for the depreciation-related portion. Federal tax treatment depends on the property and the taxpayer, and the applicable unrecaptured Section 1250 gain rate is a maximum rate rather than a universal flat tax.',
  },
  {
    question: 'Which improvements should I enter?',
    answer: 'Enter capital improvements that are properly added to basis, not ordinary maintenance merely because money was spent on the property. Keep records supporting purchase costs, improvements, depreciation and selling expenses because those details can materially change the tax calculation.',
  },
  {
    question: 'Can I use this result as my tax return calculation?',
    answer: 'No. This is a planning estimate. The current model uses a $250,000 exclusion, a 15% capital-gain rate and a 25% depreciation-related rate and does not model filing status, income-based capital-gain brackets, NIIT, state tax, partial exclusions, nonqualified use, 1031 exchanges or every basis adjustment.',
  },
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
