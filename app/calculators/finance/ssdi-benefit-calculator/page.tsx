import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Social Security Disability (SSDI) Calculator USA 2026 | ToolTrio',
  description: 'Estimate your monthly SSDI benefit using the Social Security Primary Insurance Amount formula and work credit eligibility requirements.',
  slug: 'ssdi-benefit-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['SSDI calculator 2026','social security disability benefit estimate','SSDI eligibility work credits','how much does SSDI pay'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How is the SSDI monthly benefit calculated?', answer: 'SSDI uses the same Primary Insurance Amount (PIA) formula as retirement benefits, based on your Average Indexed Monthly Earnings (AIME) across your highest-earning years — unlike retirement benefits, though, there\'s no reduction for claiming \'early,\' since SSDI is meant to replace income lost due to disability regardless of your age.' },
  { question: 'How many work credits do I need to qualify for SSDI?', answer: 'Generally, you need 40 work credits (about 10 years of work), with 20 of those credits earned in the 10 years immediately before your disability began — younger workers can qualify with fewer credits under a sliding scale, since they\'ve had less time to accumulate them.' },
  { question: 'Does SSDI convert to retirement benefits at a certain age?', answer: 'Yes — once you reach full retirement age, your SSDI benefit automatically converts to a Social Security retirement benefit of the same amount, so there\'s no gap or reduction in your monthly payment at that transition.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Social Security Calculator', href: '/calculators/finance/social-security-calculator', icon: '🏛️', desc: 'Social Security' },
  { name: 'Disability Insurance', href: '/calculators/finance/disability-insurance-calculator', icon: '🦽', desc: 'Disability Insurance' },
  { name: 'Social Security WEP', href: '/calculators/finance/social-security-wep-calculator', icon: '⚖️', desc: 'Social Security WEP' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
