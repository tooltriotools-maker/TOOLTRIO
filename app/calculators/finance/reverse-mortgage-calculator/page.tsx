import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Reverse Mortgage Calculator USA 2026 | ToolTrio',
  description: 'Explore a simplified reverse-mortgage scenario using home value, age, mortgage balance and interest rate; compare modeled proceeds and 10-year equity.',
  slug: 'reverse-mortgage-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['reverse mortgage calculator 2026','HECM calculator','how much can I get from a reverse mortgage','reverse mortgage eligibility calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Is this an official FHA HECM quote?', answer: 'No. The calculator uses simplified age-band principal-limit factors. HUD publishes official HECM principal-limit factors and lender calculations also depend on expected rates, property value limits and program rules.' },
  { question: 'What 2026 HECM limit should I know about?', answer: 'HUD lists a 2026 nationwide HECM maximum claim amount of $1,249,125. A real HECM calculation uses program rules and the lesser applicable value rather than simply applying this page’s age-band factor to any home value.' },
  { question: 'Why does borrower age change the modeled principal limit?', answer: 'The page assigns a larger modeled percentage of home value to older age bands. Official HECM principal-limit factors are more detailed and also depend on expected interest rates, so the age bands here are only an illustration.' },
  { question: 'Why does the projected balance grow over time?', answer: 'Interest and financed loan costs can accrue to the reverse-mortgage balance rather than being paid as a traditional monthly principal-and-interest payment. This calculator compounds its modeled balance monthly at the entered rate.' },
  { question: 'What costs are included in this ToolTrio model?', answer: 'The current function models an origination fee, a 2% mortgage-insurance amount and $2,500 of other closing costs. Actual lender charges and FHA mortgage-insurance treatment should be confirmed in a lender quote and HUD counseling.' },
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
