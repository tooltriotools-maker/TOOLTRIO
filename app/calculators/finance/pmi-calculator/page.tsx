import { CalculatorBatch13DeepDive } from '@/components/ui/CalculatorBatch13DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'PMI Calculator — Mortgage Insurance & Removal Estimate | ToolTrio',
  description: 'Estimate conventional PMI, loan-to-value, months to 80% LTV and the modeled cost of putting less than 20% down.',
  slug: 'pmi-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['PMI calculator 2026','private mortgage insurance calculator','when does PMI drop off','PMI removal 80% LTV calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'When can I request cancellation of conventional PMI?', answer: 'For many covered mortgages, CFPB says a borrower may request cancellation when the principal balance is scheduled to reach 80% of the home’s original value, subject to applicable requirements.' },
  { question: 'When is PMI automatically terminated?', answer: 'For many covered mortgages, automatic termination generally occurs when the scheduled principal balance reaches 78% of original value and the borrower is current, with additional midpoint protections.' },
  { question: 'How does this calculator estimate the PMI rate?', answer: 'It uses illustrative annual rates of 0.30%, 0.50%, 0.80%, or 1.20% based only on credit-score bands. Actual PMI quotes use more loan characteristics.' },
  { question: 'Does the months-to-removal result use home appreciation?', answer: 'No. It amortizes the entered loan against 80% of the original home value. Appreciation-based cancellation can follow different investor or servicer rules.' },
  { question: 'Is FHA mortgage insurance the same as conventional PMI?', answer: 'No. FHA mortgage insurance has separate rules. The page shows an FHA modeling branch, but conventional PMI cancellation rules should not be applied to FHA loans.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Mortgage' },
  { name: 'Down Payment Calculator', href: '/calculators/finance/down-payment-calculator', icon: '💵', desc: 'Down Payment' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', icon: '💰', desc: 'Home Affordability' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch13DeepDive slug="pmi-calculator" />
</>
}
