import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Relocation Mortgage & Cost of Living Calculator USA 2026 | ToolTrio',
  description: 'Compare your current mortgage against a new mortgage after relocating, factoring in salary change, new interest rate, and cost of living difference.',
  slug: 'relocation-mortgage-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['relocation mortgage calculator','cost of living adjusted salary calculator','should I relocate for a job calculator','new mortgage after moving calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How do I know if a relocation salary increase is actually a raise?', answer: 'A job offer with a higher salary in a more expensive area can actually be a pay cut in real terms once cost of living is factored in — comparing your new salary against the local cost-of-living index for housing, taxes, and everyday expenses gives a more accurate picture than comparing raw salary numbers alone.' },
  { question: 'Why does a new mortgage rate matter so much when relocating?', answer: 'If you\'re selling a home with a low locked-in mortgage rate and buying in a new area at today\'s market rate, your monthly housing payment can rise substantially even on a similarly priced home — this \'rate lock-in effect\' is one of the most overlooked costs of relocating.' },
  { question: 'What relocation costs are often overlooked?', answer: 'Beyond the mortgage difference, common overlooked costs include selling costs on your current home (agent commissions, closing costs), moving expenses, temporary housing during the transition, and state/local tax differences that affect your take-home pay in the new location.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Mortgage' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', icon: '💰', desc: 'Home Affordability' },
  { name: 'Bridge Loan Calculator', href: '/calculators/finance/bridge-loan-calculator', icon: '🌉', desc: 'Bridge Loan' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
