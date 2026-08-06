import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Barista FIRE Calculator USA 2026 — Semi-Retirement | ToolTrio',
  description: 'Calculate how part-time work reduces your FIRE number and accelerates your retirement timeline — the Barista FIRE strategy.',
  slug: 'barista-fire-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['barista FIRE calculator','semi-retirement calculator','part-time FIRE number','coast FIRE vs barista FIRE'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is Barista FIRE?', answer: 'Barista FIRE is a semi-retirement strategy where you leave a full-time career once your portfolio can cover most — but not all — of your expenses, then work a lower-stress part-time job (the name references baristas at companies offering health benefits) to cover the remaining gap, letting your investments keep growing rather than being fully depleted.' },
  { question: 'How is Barista FIRE different from Coast FIRE?', answer: 'Coast FIRE means you stop contributing to retirement accounts but still work full-time until your portfolio compounds to your full number by traditional retirement age. Barista FIRE goes a step further — you also cut back to part-time work immediately, using part-time income plus a partial portfolio withdrawal to cover current expenses.' },
  { question: 'How much smaller is my portfolio target under Barista FIRE?', answer: 'Since part-time income covers a portion of annual expenses, you only need your portfolio to safely fund the remaining gap (typically using the 4% rule) rather than 100% of your spending — this can meaningfully reduce your required nest egg and shorten your timeline to leaving full-time work.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE' },
  { name: 'Retirement Bucket Strategy', href: '/calculators/finance/retirement-bucket-strategy-calculator', icon: '🪣', desc: 'Retirement Bucket Strategy' },
  { name: 'Side Hustle Break-Even', href: '/calculators/finance/side-hustle-breakeven-calculator', icon: '💡', desc: 'Side Hustle Break-Even' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
