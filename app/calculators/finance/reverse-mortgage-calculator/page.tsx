import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Reverse Mortgage Calculator USA 2026 | ToolTrio',
  description: 'Estimate how much cash a reverse mortgage (HECM) could provide based on your home value, age, and existing mortgage balance.',
  slug: 'reverse-mortgage-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['reverse mortgage calculator 2026','HECM calculator','how much can I get from a reverse mortgage','reverse mortgage eligibility calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How does a reverse mortgage work?', answer: 'A reverse mortgage (most commonly a federally-insured Home Equity Conversion Mortgage, or HECM) lets homeowners age 62+ convert home equity into cash — as a lump sum, line of credit, or monthly payments — without making monthly mortgage payments. The loan balance grows over time with interest and is repaid when the borrower sells, moves out, or passes away.' },
  { question: 'How much money can I get from a reverse mortgage?', answer: 'The amount available depends primarily on your age (older borrowers can access more), current interest rates, and your home\'s appraised value up to the FHA lending limit — younger eligible borrowers and lower rates generally result in a smaller available amount relative to the same home value.' },
  { question: 'Do I still own my home with a reverse mortgage?', answer: 'Yes — you retain the title and ownership of your home. However, you\'re still responsible for property taxes, homeowners insurance, and maintenance; failing to keep up with these obligations can trigger loan default, so a reverse mortgage doesn\'t eliminate all homeownership costs.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Home Equity Loan', href: '/calculators/finance/home-equity-loan-calculator', icon: '🏠', desc: 'Home Equity Loan' },
  { name: 'Retirement Healthcare Bridge', href: '/calculators/finance/retirement-healthcare-bridge-calculator', icon: '🏥', desc: 'Retirement Healthcare Bridge' },
  { name: 'Elder Care Cost', href: '/calculators/finance/elder-care-cost-calculator', icon: '👵', desc: 'Elder Care Cost' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
