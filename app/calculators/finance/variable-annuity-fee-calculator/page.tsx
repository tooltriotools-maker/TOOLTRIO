import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Variable Annuity Fee Impact Calculator USA 2026 | ToolTrio',
  description: 'Calculate how mortality & expense, administration, and rider fees erode variable annuity returns over time compared to a low-cost investment account.',
  slug: 'variable-annuity-fee-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['variable annuity fee calculator','variable annuity fees explained','M&E fee calculator annuity','annuity vs investment account fees'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What fees are typically layered inside a variable annuity?', answer: 'Variable annuities commonly stack several annual fees: mortality & expense (M&E) risk charges, administrative fees, underlying subaccount (fund) expense ratios, and optional rider fees for guarantees like a lifetime income benefit — combined, these can add up to a meaningfully higher total annual cost than a comparable low-cost index fund portfolio.' },
  { question: 'What is a surrender charge on a variable annuity?', answer: 'A surrender charge is a penalty for withdrawing funds (beyond a small annual allowance, often 10%) during the surrender period — typically 5-9 years — which can range from several percent down to zero as the period elapses, discouraging early withdrawal from the contract.' },
  { question: 'Are the fees worth it for the guarantees a variable annuity provides?', answer: 'It depends entirely on your circumstances — riders like guaranteed lifetime income can provide valuable protection against outliving your savings, but the added cost is substantial, so it\'s worth comparing the guarantee\'s value against simply investing the same money in a diversified low-cost portfolio and self-managing withdrawal risk.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Equity-Indexed Annuity', href: '/calculators/finance/equity-indexed-annuity-calculator', icon: '📈', desc: 'Equity-Indexed Annuity' },
  { name: 'Period Certain vs Lifetime Annuity', href: '/calculators/finance/annuity-certain-vs-lifetime-calculator', icon: '📅', desc: 'Period Certain vs Lifetime Annuity' },
  { name: 'Investment Fee Drag', href: '/calculators/finance/investment-fee-drag-calculator', icon: '💰', desc: 'Investment Fee Drag' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
