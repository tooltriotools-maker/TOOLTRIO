import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'K-1 Passive Activity Loss Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much of your K-1 passive activity loss is deductible now vs suspended under IRS passive activity loss rules.',
  slug: 'k1-passive-loss-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['K-1 passive loss calculator','passive activity loss rules IRS','real estate professional passive loss','suspended passive losses'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What are IRS passive activity loss rules?', answer: 'Under IRC Section 469, losses from passive activities (like a rental property or limited partnership you don\'t materially participate in) generally can only offset passive income, not your wages or other active/portfolio income. Any excess loss is suspended and carried forward to future years or until you dispose of the activity.' },
  { question: 'Can I deduct rental losses against my regular income?', answer: 'Most taxpayers with rental losses can only deduct up to $25,000 against non-passive income if their modified AGI is under $100,000 (phasing out completely by $150,000), unless they qualify as a real estate professional, which removes the passive loss limitation entirely for their rental activities.' },
  { question: 'What does it mean to qualify as a real estate professional for tax purposes?', answer: 'The IRS requires more than 750 hours per year in real estate activities AND more than half of your total working hours across all jobs to be in real estate — meeting this bar (which is high for anyone with a separate full-time job) lets rental losses offset ordinary income without the passive activity limits.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Syndication K-1 Tax', href: '/calculators/finance/syndication-k1-tax-calculator', icon: '📋', desc: 'Syndication K-1 Tax' },
  { name: 'Rental Property Tax Strategy', href: '/calculators/finance/rental-property-tax-strategy-calculator', icon: '🏘️', desc: 'Rental Property Tax Strategy' },
  { name: 'Net Operating Loss', href: '/calculators/finance/net-operating-loss-calculator', icon: '📋', desc: 'Net Operating Loss' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
