import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Estate Liquidity Needs Calculator USA 2026 | ToolTrio',
  description: 'Calculate whether an estate has sufficient liquid assets to pay taxes, debts, and administration costs without forcing heirs to sell property.',
  slug: 'estate-liquidity-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['estate liquidity calculator','estate tax liquidity planning','life insurance for estate taxes','illiquid estate assets'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why does estate liquidity matter if the estate is large enough?', answer: 'A large net worth doesn\'t guarantee cash on hand — many estates are heavily weighted toward illiquid assets like real estate, a family business, or retirement accounts. If federal and state estate taxes plus administration costs come due before the estate can be settled, heirs may be forced into a rushed, below-market sale of assets.' },
  { question: 'How is a life insurance policy used to solve an estate liquidity gap?', answer: 'A life insurance policy — often held in an irrevocable life insurance trust (ILIT) to keep the proceeds out of the taxable estate — can provide immediate cash to pay estate taxes and expenses, letting heirs keep the underlying property, business, or investments intact instead of selling under pressure.' },
  { question: 'What estate expenses need to be covered besides estate tax?', answer: 'Beyond federal (and possibly state) estate tax, an estate typically needs cash for probate and attorney fees, executor fees, outstanding debts and final medical bills, and ongoing carrying costs (mortgage, taxes, insurance) on real estate until it can be sold or transferred.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Estate Tax Calculator', href: '/calculators/finance/estate-tax-calculator', icon: '⚖️', desc: 'Estate Tax' },
  { name: 'State Estate Tax', href: '/calculators/finance/state-estate-tax-calculator', icon: '⚖️', desc: 'State Estate Tax' },
  { name: 'Trust Fund Growth', href: '/calculators/finance/trust-fund-growth-calculator', icon: '💰', desc: 'Trust Fund Growth' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
