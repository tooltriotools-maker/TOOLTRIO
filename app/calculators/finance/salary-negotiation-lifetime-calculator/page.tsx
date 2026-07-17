import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Salary Negotiation Lifetime Impact Calculator USA 2026 | ToolTrio',
  description: 'Calculate the true lifetime financial impact of a salary negotiation — how a single negotiated increase compounds over a 30-year career.',
  slug: 'salary-negotiation-lifetime-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['salary negotiation calculator','lifetime impact of salary negotiation','how much does negotiating salary matter','compounding raises over career'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'Why does a single salary negotiation matter so much long-term?', answer: 'Because future annual raises are typically calculated as a percentage of your current salary, a higher starting number doesn\'t just add a one-time gain — it compounds every single year afterward through every subsequent raise, promotion, and job change for the rest of your career.' },
  { question: 'Does negotiating salary also affect retirement savings?', answer: 'Yes — many retirement contributions (like a 401k match or profit sharing) are calculated as a percentage of salary, so a higher base salary can also mean larger employer retirement contributions accumulating and compounding over your entire career, amplifying the negotiation\'s lifetime impact even further.' },
  { question: 'How much should I typically try to negotiate?', answer: 'There\'s no universal number — it depends on the role, industry, and how the initial offer compares to market rate for your experience level. Research typical compensation ranges for the role and location, and remember that even a modest percentage increase compounds meaningfully over a multi-decade career.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Career Lifetime Earnings', href: '/calculators/finance/career-earnings-calculator', icon: '💼', desc: 'Career Lifetime Earnings' },
  { name: 'Merit Raise vs Job Change', href: '/calculators/finance/merit-raise-vs-job-change-calculator', icon: '💼', desc: 'Merit Raise vs Job Change' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Paycheck' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
