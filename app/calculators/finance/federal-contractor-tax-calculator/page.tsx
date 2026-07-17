import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Federal Contractor Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate net take-home pay for federal contractors as W-2, 1099, or Corp-to-Corp — including self-employment tax, QBI deduction, and quarterly estimates.',
  slug: 'federal-contractor-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['federal contractor tax calculator','1099 vs W-2 vs corp-to-corp','government contractor take-home pay','self-employment tax federal contractor'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What\'s the difference between 1099, W-2, and Corp-to-Corp contracting?', answer: 'As a W-2 contractor, your agency withholds taxes and pays the employer half of FICA. As a 1099 independent contractor, you receive gross pay but owe the full 15.3% self-employment tax yourself. Corp-to-Corp means you contract through your own S-corp or LLC, which can reduce self-employment tax on distributions but adds payroll and corporate compliance overhead.' },
  { question: 'Can federal contractors take the QBI deduction?', answer: 'Many 1099 and Corp-to-Corp contractors can claim the Section 199A Qualified Business Income deduction (up to 20% of qualified business income), though it phases out for certain \'specified service\' businesses above income thresholds — check current-year IRS limits or consult a CPA.' },
  { question: 'How often do 1099 contractors need to pay estimated taxes?', answer: 'The IRS generally requires quarterly estimated tax payments (April, June, September, and January) if you expect to owe $1,000 or more for the year, to avoid an underpayment penalty — since no employer is withholding tax on your behalf.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '🧾', desc: 'Self-Employment Tax' },
  { name: 'W-2 vs 1099', href: '/calculators/finance/w2-vs-1099-calculator', icon: '⚖️', desc: 'W-2 vs 1099' },
  { name: 'Freelancer Quarterly Tax', href: '/calculators/finance/freelancer-quarterly-tax-calculator', icon: '📅', desc: 'Freelancer Quarterly Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
