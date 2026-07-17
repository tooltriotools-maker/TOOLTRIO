import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Municipal Bond Ladder Calculator USA 2026 | ToolTrio',
  description: "Build a staggered municipal bond ladder for tax-free income with regular liquidity events at each rung's maturity.",
  slug: 'municipal-bond-ladder-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['municipal bond ladder calculator','muni bond ladder tax-free income','bond ladder strategy calculator','tax equivalent yield municipal bonds'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is a bond ladder and why use one?', answer: 'A bond ladder splits your investment across bonds with staggered maturity dates (the \'rungs\') instead of one single maturity — this provides regular liquidity as each rung matures, reduces reinvestment risk from interest rate swings, and smooths out your average yield across different rate environments.' },
  { question: 'Why are municipal bonds attractive for a bond ladder?', answer: 'Interest from most municipal bonds is exempt from federal income tax, and often state income tax too if you buy bonds issued by your home state — for investors in higher tax brackets, this can make a muni bond\'s after-tax yield significantly more attractive than a comparable taxable bond\'s stated yield.' },
  { question: 'What is \'tax-equivalent yield\' for municipal bonds?', answer: 'Tax-equivalent yield converts a muni bond\'s tax-free yield into the yield a taxable bond would need to match it after taxes, calculated by dividing the muni yield by (1 minus your combined marginal tax rate) — this lets you fairly compare muni bonds against taxable bonds or CDs.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Treasury Bill Calculator', href: '/calculators/finance/treasury-bill-calculator', icon: '🏦', desc: 'Treasury Bill' },
  { name: 'TIPS vs Nominal Bonds', href: '/calculators/finance/tips-vs-nominal-bonds-calculator', icon: '📊', desc: 'TIPS vs Nominal Bonds' },
  { name: 'CD Ladder Calculator', href: '/calculators/finance/cd-ladder-calculator', icon: '🏦', desc: 'CD Ladder' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
