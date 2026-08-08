import { CalculatorBatch7DeepDive } from '@/components/ui/CalculatorBatch7DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax-Free Savings Optimizer USA 2026 | ToolTrio',
  description: 'Find every tax-free and tax-deferred savings account available to you in 2026, with a suggested optimal funding order.',
  slug: 'tax-free-savings-optimizer',
  category: 'finance',
  region: 'usa',
  keywords: ['tax free savings optimizer','best order to fund retirement accounts 2026','tax advantaged account priority','HSA 401k IRA funding order'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is the general priority order for funding tax-advantaged accounts?', answer: 'A widely used guideline is: (1) 401k up to the full employer match, (2) HSA if eligible (triple tax advantage), (3) max Roth or Traditional IRA, (4) return to maxing the 401k, (5) taxable brokerage account after that — though the right order can shift based on your income, tax bracket, and access to each account type.' },
  { question: 'Why does the employer match come before everything else?', answer: 'A 401k employer match is essentially a guaranteed, immediate return on your contribution (commonly 50-100% depending on the match formula) that no other investment can reliably match — skipping it to fund other accounts first generally means leaving free money on the table.' },
  { question: 'Should high earners still prioritize a Traditional IRA if they can\'t deduct it?', answer: 'If your income is too high to deduct Traditional IRA contributions and you\'re not eligible for a Roth IRA directly, a \'backdoor Roth IRA\' (nondeductible Traditional contribution converted to Roth) is a common strategy to still access Roth-style tax-free growth despite income limits.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'HSA vs 401k Priority', href: '/calculators/finance/hsa-vs-401k-priority-calculator', icon: '🏥', desc: 'HSA vs 401k Priority' },
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '💰', desc: '401k' },
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
    <CalculatorBatch7DeepDive slug="tax-free-savings-optimizer" />
  </>
}
