import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage vs Rent Calculator USA 2026 — True Cost Comparison | ToolTrio',
  description: 'Calculate the true total cost of buying vs renting over any time horizon including appreciation, equity buildup, taxes, maintenance, and opportunity cost.',
  slug: 'mortgage-vs-rent-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage vs rent calculator 2026', 'buy vs rent calculator USA', 'is it better to buy or rent 2026', 'true cost of buying a home', 'rent vs own calculator USA'],
})
const faqs = [
  { question: 'What ownership costs does this model include?', answer: 'It includes a 30-year mortgage payment plus modeled property tax at 1.1% of home value, insurance at 0.5%, and maintenance at 1% per year.' },
  { question: 'How is home equity estimated?', answer: 'The calculator projects home value using your appreciation rate and subtracts the modeled remaining mortgage balance after the selected number of years.' },
  { question: 'How does the calculator treat the mortgage-interest deduction?', answer: 'It uses a rough shortcut based on first-year interest, your entered tax rate and a 30% factor. It is not an itemized federal tax-return calculation.' },
  { question: 'What costs are missing from the buy side?', answer: 'Closing and selling costs, HOA dues, PMI, major repairs and some taxes/fees are not fully included.' },
  { question: 'Does the calculator invest the renter’s savings?', answer: 'No. It does not fully model investment returns on the down payment or monthly cost differences, which is an important limitation in long-horizon comparisons.' },
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Mortgage Affordability', href: '/calculators/finance/mortgage-affordability-calculator', icon: '🏡', desc: 'Mortgage Affordability' },
  { name: 'Rent Increase Calculator', href: '/calculators/finance/rent-increase-calculator', icon: '🏠', desc: 'Rent Increase Calculator' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', icon: '🏡', desc: 'Home Affordability Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
