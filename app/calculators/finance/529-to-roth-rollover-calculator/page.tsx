import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: '529 to Roth IRA Rollover Calculator USA 2026 | ToolTrio',
  description: 'Calculate how much of an unused 529 college savings balance can roll into the beneficiary\'s Roth IRA under SECURE 2.0 — subject to the $35,000 lifetime cap and annual limits.',
  slug: '529-to-roth-rollover-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['529 to Roth IRA rollover calculator','529 rollover rules 2026','unused 529 funds Roth IRA','SECURE 2.0 529 rollover'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much of a 529 plan can be rolled into a Roth IRA?', answer: 'Under SECURE 2.0, up to $35,000 per beneficiary can be rolled over during their lifetime, subject to the beneficiary\'s annual Roth IRA contribution limit each year (so it takes several years to move the full amount). The 529 account must have been open at least 15 years, and contributions/earnings from the last 5 years are not eligible.' },
  { question: 'Does the 529-to-Roth rollover count against the annual Roth IRA limit?', answer: 'Yes. Each year\'s rollover amount counts toward — not on top of — the beneficiary\'s normal annual Roth IRA contribution limit, and the beneficiary must have earned income at least equal to the amount rolled over that year.' },
  { question: 'What happens to 529 funds if my child doesn\'t need them for college?', answer: 'Besides the Roth IRA rollover option, you can change the beneficiary to another family member penalty-free, use funds for K-12 tuition or apprenticeship programs, or take a non-qualified withdrawal (earnings are taxed plus a 10% penalty).' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: '529 vs Roth IRA', href: '/calculators/finance/529-vs-roth-ira-education-calculator', icon: '📚', desc: '529 vs Roth IRA' },
  { name: 'College Savings Goal', href: '/calculators/finance/college-savings-goal-calculator', icon: '🎓', desc: 'College Savings Goal' },
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
