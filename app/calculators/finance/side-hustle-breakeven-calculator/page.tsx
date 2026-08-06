import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Side Hustle Break-Even Calculator USA 2026 | ToolTrio',
  description: 'Calculate exactly how many units or hours your side hustle needs to sell to cover startup costs, monthly expenses, and your own time value.',
  slug: 'side-hustle-breakeven-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['side hustle break-even calculator','how many sales to break even side business','side hustle profit calculator','small business break-even point'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How do I calculate my side hustle\'s break-even point?', answer: 'Break-even is the point where cumulative profit (units sold × profit per unit, minus ongoing monthly expenses) covers your initial startup costs — this calculator combines your price, cost per unit, and monthly overhead to show how many sales and months it takes to reach that point.' },
  { question: 'Should I count my own time as a cost in a side hustle?', answer: 'It\'s a good idea to at least be aware of your \'opportunity cost\' — the value of the hours you\'re putting in, valued at what you could otherwise earn — even if you don\'t pay yourself directly. A side hustle that\'s technically profitable but pays you far below minimum wage for your time may not be worth pursuing versus other options.' },
  { question: 'Is self-employment income from a side hustle taxed differently?', answer: 'Yes — net side hustle income is generally subject to self-employment tax (15.3% for Social Security and Medicare) in addition to regular income tax, on top of your primary job\'s W-2 income, once your side hustle profit exceeds $400 for the year.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '🧾', desc: 'Self-Employment Tax' },
  { name: 'Business Startup Calculator', href: '/calculators/finance/business-startup-calculator', icon: '🏢', desc: 'Business Startup' },
  { name: 'Freelancer Quarterly Tax', href: '/calculators/finance/freelancer-quarterly-tax-calculator', icon: '📅', desc: 'Freelancer Quarterly Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
