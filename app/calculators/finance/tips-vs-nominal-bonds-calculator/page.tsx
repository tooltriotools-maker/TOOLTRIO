import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'TIPS vs Nominal Bonds Calculator USA 2026 | ToolTrio',
  description: 'Compare TIPS (inflation-protected bonds) vs nominal bonds after tax, and find the break-even inflation rate where TIPS becomes the better choice.',
  slug: 'tips-vs-nominal-bonds-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['TIPS vs nominal bonds calculator','break-even inflation rate calculator','treasury inflation protected securities calculator','TIPS after tax return'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What\'s the difference between TIPS and regular Treasury bonds?', answer: 'TIPS (Treasury Inflation-Protected Securities) adjust their principal value with the Consumer Price Index, so both principal and interest payments rise with inflation. A nominal Treasury bond pays a fixed interest rate on a fixed principal, offering no built-in protection if inflation runs higher than expected.' },
  { question: 'What is the \'break-even inflation rate\'?', answer: 'The break-even inflation rate is the level of future inflation at which TIPS and a nominal bond of the same maturity would produce identical total returns — if actual inflation runs above the break-even rate, TIPS outperform; if it runs below, the nominal bond wins.' },
  { question: 'Are TIPS a good idea in a taxable account?', answer: 'TIPS can create a tax inefficiency in taxable accounts known as \'phantom income\' — the inflation adjustment to principal is taxed as income each year even though you don\'t receive that cash until the bond matures, which is why many advisors suggest holding TIPS in tax-advantaged accounts when possible.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Treasury Bill Calculator', href: '/calculators/finance/treasury-bill-calculator', icon: '🏦', desc: 'Treasury Bill' },
  { name: 'Municipal Bond Ladder', href: '/calculators/finance/municipal-bond-ladder-calculator', icon: '🏛️', desc: 'Municipal Bond Ladder' },
  { name: 'CD vs HYSA Calculator', href: '/calculators/finance/cd-vs-hysa-calculator', icon: '🏦', desc: 'CD vs HYSA' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
