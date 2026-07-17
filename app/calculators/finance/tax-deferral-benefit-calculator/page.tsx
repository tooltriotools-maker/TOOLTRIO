import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax Deferral Benefit Calculator USA 2026 | ToolTrio',
  description: 'Compare after-tax wealth accumulation from a Traditional IRA, Roth IRA, and a regular taxable account over any time horizon.',
  slug: 'tax-deferral-benefit-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['tax deferral benefit calculator','traditional vs Roth vs taxable account','tax deferred growth calculator','compound growth tax comparison'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How much does tax deferral actually add to long-term growth?', answer: 'Because a taxable account loses a portion of its return to taxes on dividends, interest, and realized gains each year, its effective compounding rate is lower than a tax-deferred or tax-free account earning the identical gross return — over 20-30 years, this annual tax drag compounds into a substantial difference in final balance.' },
  { question: 'Is a Traditional IRA or a taxable brokerage account better for long-term savings?', answer: 'A Traditional IRA\'s upfront tax deduction plus tax-deferred growth generally outperforms an equivalent taxable account over long horizons, assuming similar future tax rates — the tradeoff is that Traditional IRA withdrawals are fully taxed as ordinary income later, while a taxable account only pays capital gains tax on the growth portion when sold.' },
  { question: 'Why might I still want a taxable account despite the tax drag?', answer: 'Taxable accounts offer full liquidity with no early withdrawal penalties, no contribution limits, and access to tax-loss harvesting — for money you may need before retirement age, or once you\'ve maxed out available tax-advantaged accounts, a taxable account remains an important part of a complete savings strategy.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Roth vs Traditional 401k', href: '/calculators/finance/roth-vs-traditional-401k-calculator', icon: '🔄', desc: 'Roth vs Traditional 401k' },
  { name: '401k vs Taxable Account', href: '/calculators/finance/401k-vs-taxable-account-calculator', icon: '💰', desc: '401k vs Taxable Account' },
  { name: 'Tax-Efficient Withdrawal', href: '/calculators/finance/tax-efficient-withdrawal-calculator', icon: '💰', desc: 'Tax-Efficient Withdrawal' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
