import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'State Estate Tax Calculator USA 2026 | ToolTrio',
  description: 'Calculate combined federal and state estate tax — several states plus DC have separate estate taxes with exemptions well below the federal threshold.',
  slug: 'state-estate-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['state estate tax calculator 2026','which states have estate tax','state estate tax exemption by state','combined federal and state estate tax'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Which states have their own estate tax?', answer: 'As of 2026, a number of states plus the District of Columbia levy a separate state estate tax — including states like Massachusetts, Oregon, Minnesota, Illinois, New York, Washington, Connecticut, Maine, Hawaii, Maryland, Vermont, and Rhode Island — each with its own exemption threshold and rate schedule, generally well below the federal exemption.' },
  { question: 'Why do state estate tax exemptions matter even for smaller estates?', answer: 'Because several states set their exemption thresholds far lower than the federal exemption (some under $2 million), an estate that owes zero federal estate tax can still owe a meaningful state estate tax bill if the deceased was domiciled in — or owned real estate in — one of these states.' },
  { question: 'Can I reduce state estate tax exposure by moving to a different state?', answer: 'Changing your state of domicile before death can eliminate exposure to a state estate tax, but genuinely establishing domicile elsewhere requires more than just intent — it typically involves changing your driver\'s license, voter registration, primary home, and spending the majority of your time in the new state, which some states\' tax authorities scrutinize closely.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax' },
  { name: 'Estate Liquidity', href: '/calculators/finance/estate-liquidity-calculator', icon: '⚖️', desc: 'Estate Liquidity' },
  { name: 'Trust Fund Growth', href: '/calculators/finance/trust-fund-growth-calculator', icon: '💰', desc: 'Trust Fund Growth' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
