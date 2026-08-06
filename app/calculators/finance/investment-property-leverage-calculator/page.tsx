import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Investment Property Leverage Calculator USA 2026 | ToolTrio',
  description: 'Compare leveraged vs unleveraged returns on investment property — showing how mortgage financing amplifies real estate ROI.',
  slug: 'investment-property-leverage-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['real estate leverage calculator','leveraged vs cash real estate return','cash on cash return calculator','mortgage leverage ROI real estate'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How does mortgage leverage amplify real estate returns?', answer: 'When you finance a property with a mortgage, you control the full asset\'s appreciation and rental income with a much smaller cash outlay (your down payment) — if the property\'s return exceeds your mortgage interest rate, leverage multiplies your return on the cash you actually invested, known as \'cash-on-cash return.\'' },
  { question: 'Does leverage increase risk as well as return?', answer: 'Yes — leverage amplifies losses just as it amplifies gains. If the property underperforms, vacancies rise, or values fall, you still owe the full mortgage payment regardless of rental income, which is why over-leveraging is one of the most common causes of real estate investor distress.' },
  { question: 'What\'s a reasonable down payment for investment property leverage?', answer: 'Investment properties typically require larger down payments than primary residences (often 20-25% minimum from most lenders), which both reduces available leverage compared to owner-occupied financing and lowers your monthly debt service relative to rental income.' },
  { question: "Why can leverage increase ROI while reducing cash flow?", answer: "Debt reduces the cash invested up front, which can magnify return on equity, but mortgage debt service also reduces annual cash flow." },
  { question: "Does NOI include the mortgage payment?", answer: "No. For this calculator, NOI should be entered before debt service. The calculator subtracts its own calculated mortgage payment from NOI." },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Cap Rate Calculator', href: '/calculators/finance/cap-rate-calculator', icon: '🏘️', desc: 'Cap Rate' },
  { name: 'Real Estate Crowdfunding', href: '/calculators/finance/real-estate-crowdfunding-calculator', icon: '🏢', desc: 'Real Estate Crowdfunding' },
  { name: 'Rental Property Tax Strategy', href: '/calculators/finance/rental-property-tax-strategy-calculator', icon: '🏘️', desc: 'Rental Property Tax Strategy' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
