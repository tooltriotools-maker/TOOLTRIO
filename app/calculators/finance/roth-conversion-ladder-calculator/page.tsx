import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Roth Conversion Ladder Calculator USA 2026 | ToolTrio',
  description: 'Plan systematic Roth IRA conversions to minimize lifetime taxes, model the 5-year ladder for early retirement, and compare vs no conversion.',
  slug: 'roth-conversion-ladder-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['roth conversion ladder calculator', 'roth IRA conversion strategy 2026', 'roth ladder early retirement', 'systematic roth conversion tax savings', 'FIRE roth ladder calculator'],
})
const faqs = [
  {
    question: 'What is a Roth conversion ladder?',
    answer: "A Roth conversion ladder involves systematically converting Traditional IRA funds to Roth IRA over several years — paying taxes now at potentially lower rates to avoid higher taxes in retirement. For early retirees (FIRE), it's also the mechanism to access Roth funds penalty-free before 59½: each conversion becomes available 5 years later.",
  },
  {
    question: 'When does Roth conversion make sense?',
    answer: "Roth conversion is most valuable when: (1) your current tax rate is lower than expected future rate, (2) you're in a low-income year (early retirement, job loss, sabbatical), (3) you want to reduce future RMDs, (4) you have time for tax-free growth, or (5) you're doing early retirement FIRE planning. It's generally NOT worth it if converting pushes you into a much higher bracket.",
  },
  {
    question: 'What is the 5-year Roth conversion rule?',
    answer: 'Each Roth conversion has its own 5-year clock. Earnings from conversions made before age 59½ are subject to the 10% penalty if withdrawn within 5 years of conversion. However, the original converted amount (not earnings) can be withdrawn after 5 years without penalty. This is the basis of the FIRE Roth ladder strategy.',
  }
]
const relatedCalculators = [
  { name: 'Roth Conversion Calculator', href: '/calculators/finance/roth-conversion-calculator', icon: '🔄', desc: 'Roth Conversion Calculator' },
  { name: 'Backdoor Roth IRA Calculator', href: '/calculators/finance/backdoor-roth-ira-calculator', icon: '🚪', desc: 'Backdoor Roth IRA Calculator' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'FIRE Calculator' },
  { name: 'RMD Calculator', href: '/calculators/finance/required-minimum-distribution-calculator', icon: '📋', desc: 'RMD Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
