import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Charitable Bunching Strategy Calculator USA 2026 | ToolTrio',
  description: 'Calculate the extra tax savings from bunching several years of charitable donations into a single year to clear the standard deduction threshold.',
  slug: 'charitable-bunching-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['charitable bunching calculator','donation bunching tax strategy','itemize vs standard deduction charity','donor advised fund bunching'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is charitable bunching?', answer: 'Bunching means combining multiple years of planned charitable donations into a single tax year so your itemized deductions (charity + other itemized items) exceed the standard deduction that year, then taking the standard deduction in the \'off\' years — maximizing the tax benefit of giving you were going to do anyway.' },
  { question: 'Why does bunching only help if I\'m close to the standard deduction?', answer: 'If your normal itemized deductions are already well above the standard deduction, bunching adds little extra benefit since you\'d itemize every year regardless. Bunching creates the most value when your annual giving alone isn\'t enough to clear the standard deduction threshold on its own.' },
  { question: 'How does a donor-advised fund help with bunching?', answer: 'A donor-advised fund (DAF) lets you contribute several years\' worth of donations in one tax year (claiming the deduction immediately) while distributing the actual grants to charities over time at your own pace — combining the bunching tax benefit with steady annual giving to your favorite causes.' },
  { question: 'What is the 2026 standard deduction I should use in this calculator?', answer: 'For 2026, the IRS standard deduction is $16,100 for single filers and married filing separately, $32,200 for married filing jointly and qualifying surviving spouses, and $24,150 for head of household (IRS Revenue Procedure 2025-32). Filers 65 or older, or blind, can add an additional amount on top of these base figures.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Donor-Advised Fund', href: '/calculators/finance/donor-advised-fund-calculator', icon: '🎁', desc: 'Donor-Advised Fund' },
  { name: 'Charitable Giving Tax', href: '/calculators/finance/charitable-giving-tax-calculator', icon: '❤️', desc: 'Charitable Giving Tax' },
  { name: 'Tax-Free Savings Optimizer', href: '/calculators/finance/tax-free-savings-optimizer', icon: '💡', desc: 'Tax-Free Savings Optimizer' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
