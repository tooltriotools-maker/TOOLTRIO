import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Bridge Loan Calculator USA 2026 | ToolTrio',
  description: 'Calculate bridge loan interest costs and total expense for financing a new home purchase before your current home sells.',
  slug: 'bridge-loan-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['bridge loan calculator 2026','bridge loan interest cost','buy before you sell loan','home bridge financing'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How does a bridge loan work when buying a new home?', answer: 'A bridge loan lets you borrow against the equity in your current home to cover the down payment or full purchase of a new home before your old one sells. It\'s typically short-term (a few months to a year) with interest-only payments, then repaid in full when the old home sells.' },
  { question: 'Why are bridge loan interest rates so high?', answer: 'Bridge loans carry higher rates than standard mortgages (often several percentage points above conventional rates) because they\'re short-term, unsecured against a completed sale, and considered higher risk by lenders — the tradeoff is speed and flexibility to compete on a new home without a sale contingency.' },
  { question: 'What are alternatives to a bridge loan?', answer: 'Options include a HELOC on your current home (usually cheaper), a contingent offer on the new home, rent-back agreements, or simply selling first and renting temporarily. Compare total interest cost across your expected timeline before committing to a bridge loan.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Home Equity Loan', href: '/calculators/finance/home-equity-loan-calculator', icon: '🏠', desc: 'Home Equity Loan' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Mortgage' },
  { name: 'Relocation Mortgage', href: '/calculators/finance/relocation-mortgage-calculator', icon: '📦', desc: 'Relocation Mortgage' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
