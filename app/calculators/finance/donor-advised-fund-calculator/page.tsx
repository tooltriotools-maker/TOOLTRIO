import { CalculatorBatch17DeepDive } from '@/components/ui/CalculatorBatch17DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Donor-Advised Fund Calculator USA 2026 | ToolTrio',
  description: 'Calculate the tax savings from contributing appreciated stock to a donor-advised fund versus giving cash, plus your ongoing grant capacity.',
  slug: 'donor-advised-fund-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['donor advised fund calculator','DAF tax savings calculator','appreciated stock charitable donation','donor advised fund vs cash giving'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why donate appreciated stock instead of cash to a DAF?', answer: 'Donating long-term appreciated securities directly to a donor-advised fund lets you deduct the full fair market value while completely avoiding the capital gains tax you\'d owe if you sold the stock first — a double tax benefit that donating cash alone doesn\'t provide.' },
  { question: 'How much of my income can I deduct for DAF contributions?', answer: 'Cash contributions to a DAF are generally deductible up to 60% of adjusted gross income (AGI), while appreciated securities are capped at 30% of AGI. Any excess deduction can typically be carried forward for up to 5 additional tax years.' },
  { question: 'Do I have to grant DAF money to charity right away?', answer: 'No — once contributed, funds can be invested and grow tax-free inside the DAF, and you can recommend grants to your chosen charities on your own timeline, whether that\'s immediately or spread over many years, while you took the full tax deduction in the year you contributed.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Charitable Bunching', href: '/calculators/finance/charitable-bunching-calculator', icon: '🎁', desc: 'Charitable Bunching' },
  { name: 'Charitable Giving Tax', href: '/calculators/finance/charitable-giving-tax-calculator', icon: '❤️', desc: 'Charitable Giving Tax' },
  { name: 'Capital Gains Harvesting', href: '/calculators/finance/capital-gains-harvesting-calculator', icon: '🌱', desc: 'Capital Gains Harvesting' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch17DeepDive slug="donor-advised-fund-calculator" />
</>
}
