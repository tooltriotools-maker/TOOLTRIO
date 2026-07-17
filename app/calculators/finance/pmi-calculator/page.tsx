import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'PMI Calculator USA 2026 — Mortgage Insurance | ToolTrio',
  description: 'Calculate monthly PMI cost, how long until PMI is removed at 80% loan-to-value, and the total cost of putting less than 20% down.',
  slug: 'pmi-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['PMI calculator 2026','private mortgage insurance calculator','when does PMI drop off','PMI removal 80% LTV calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'When can I remove PMI from my mortgage?', answer: 'Under the federal Homeowners Protection Act, your lender must automatically cancel PMI once your loan balance reaches 78% of the home\'s original value, on schedule. You can also request cancellation earlier once you reach 80% loan-to-value, based on either the original purchase price or a new appraisal if your home has appreciated.' },
  { question: 'How much does PMI typically cost?', answer: 'PMI rates commonly range from roughly 0.3% to 1.5% of the loan amount annually, depending mainly on your credit score and down payment size — a lower credit score or smaller down payment (closer to the minimum) results in a higher PMI rate.' },
  { question: 'Is it better to put 20% down or pay PMI?', answer: 'It depends on opportunity cost — if you have less than 20% but investing the difference elsewhere would earn more than the PMI cost (and you\'re comfortable with the risk), paying PMI temporarily to buy sooner can make sense. If avoiding PMI entirely is affordable without depleting your emergency fund, a 20% down payment eliminates the extra cost outright.' },
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
  </>
}
