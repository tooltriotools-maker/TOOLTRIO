import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'QSBS Section 1202 Calculator USA 2026 | ToolTrio',
  description: 'Calculate the potential federal capital gains tax exclusion on Qualified Small Business Stock under IRC Section 1202.',
  slug: 'qsbs-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['QSBS calculator','Section 1202 exclusion calculator','qualified small business stock tax','QSBS 5 year holding requirement'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What is the QSBS tax exclusion?', answer: 'IRC Section 1202 allows eligible investors in Qualified Small Business Stock to exclude a significant portion — potentially up to 100% for stock acquired after September 27, 2010 — of capital gains from federal tax, up to the greater of $10 million or 10x their basis in the stock, when specific requirements are met.' },
  { question: 'What are the QSBS eligibility requirements?', answer: 'Generally, the stock must be from a domestic C-corporation with gross assets under $50 million at issuance, acquired directly from the company (not on the secondary market), held for at least 5 years, and the company must be engaged in a qualified active trade or business (certain service businesses like law, accounting, and finance are excluded).' },
  { question: 'What happens if I sell QSBS before the 5-year holding period?', answer: 'You lose the Section 1202 exclusion entirely if you sell before meeting the 5-year holding requirement, and the gain is taxed as an ordinary long or short-term capital gain instead — though a Section 1045 rollover may let you defer gain by reinvesting in replacement QSBS within 60 days.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Startup Equity Value', href: '/calculators/finance/startup-equity-value-calculator', icon: '🚀', desc: 'Startup Equity Value' },
  { name: 'Stock Option Tax', href: '/calculators/finance/stock-option-tax-calculator', icon: '💎', desc: 'Stock Option Tax' },
  { name: 'Opportunity Zone', href: '/calculators/finance/opportunity-zone-calculator', icon: '🏙️', desc: 'Opportunity Zone' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
