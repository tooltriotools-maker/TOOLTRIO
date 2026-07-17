import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Opportunity Zone Investment Calculator USA 2026 | ToolTrio',
  description: 'Calculate tax benefits of Opportunity Zone investments — defer capital gains tax and potentially exclude appreciation if held 10+ years.',
  slug: 'opportunity-zone-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['opportunity zone calculator 2026','qualified opportunity fund tax benefits','opportunity zone 10 year exclusion','capital gains deferral opportunity zone'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How do Opportunity Zone tax benefits work?', answer: 'Investing realized capital gains into a Qualified Opportunity Fund (QOF) within 180 days lets you defer tax on the original gain until the earlier of selling the QOF investment or a statutory deadline. If you hold the QOF investment for at least 10 years, any appreciation on the new investment itself can be excluded from capital gains tax entirely.' },
  { question: 'Do I have to invest my entire capital gain into a QOF?', answer: 'No — you can choose to invest any portion of an eligible capital gain into a Qualified Opportunity Fund; only the invested amount receives deferral and potential exclusion treatment, while any gain you don\'t reinvest is taxed normally in the year it was realized.' },
  { question: 'What happens if I sell my QOF investment before 10 years?', answer: 'You still get the original deferral benefit (the deferred gain becomes taxable on the statutory recognition date regardless), but you forfeit the 10-year exclusion on the QOF investment\'s own appreciation, which is often the larger benefit for long-term Opportunity Zone investors.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Real Estate Crowdfunding', href: '/calculators/finance/real-estate-crowdfunding-calculator', icon: '🏢', desc: 'Real Estate Crowdfunding' },
  { name: 'Capital Gains Harvesting', href: '/calculators/finance/capital-gains-harvesting-calculator', icon: '🌱', desc: 'Capital Gains Harvesting' },
  { name: 'QSBS Calculator', href: '/calculators/finance/qsbs-calculator', icon: '🚀', desc: 'QSBS' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
