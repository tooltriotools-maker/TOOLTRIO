import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Gig Economy Tax Calculator USA 2026 — Uber Lyft DoorDash | ToolTrio',
  description: 'Calculate net take-home pay from gig work after SE tax, federal income tax, mileage deduction, and quarterly estimated payments for rideshare and delivery drivers.',
  slug: 'gig-economy-tax-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['gig economy tax calculator USA 2026', 'Uber driver tax calculator', 'DoorDash tax calculator', 'rideshare driver taxes', 'gig worker quarterly tax estimate 2026'],
})
const faqs = [
  {
    question: 'How much tax do gig workers pay?',
    answer: 'Gig workers pay self-employment tax (15.3% on 92.35% of net income) plus federal income tax. On $42,000 gross with $3,500 expenses and 18,000 business miles (×$0.67 = $12,060 deduction), net SE income is ~$25,000. SE tax: ~$3,529. After the SE deduction and QBI deduction, federal tax adds ~$2,500. Total tax: ~$6,000 on $42,000 gross — effective rate ~14%.',
  },
  {
    question: 'What can gig workers deduct?',
    answer: 'Key deductions: (1) Business mileage: $0.67/mile in 2026 — the most valuable deduction for drivers. (2) Phone: business-use percentage. (3) Vehicle expenses: actual costs (gas, insurance, repairs, depreciation) if higher than mileage method. (4) Supplies (insulated bags for delivery). (5) Platform fees and subscriptions. (6) Home office if used exclusively for managing gig work. Always use the mileage log method — track every business mile.',
  },
  {
    question: 'When are gig worker quarterly taxes due?',
    answer: '2026 quarterly due dates: April 15 (Jan–Mar income), June 16 (Apr–May), September 15 (Jun–Aug), January 15, 2027 (Sep–Dec). Estimate by: taking year-to-date net income × 0.153 (SE tax) + net × 0.22 (federal estimate) ÷ 4. Apps like QuickBooks Self-Employed, Keeper, or Everlance can auto-calculate quarterly estimates from connected gig platform income.',
  }
]
const relatedCalculators = [
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '💼', desc: 'Self-Employment Tax' },
  { name: 'Freelance Income Tax', href: '/calculators/finance/freelance-income-tax-calculator', icon: '💻', desc: 'Freelance Income Tax' },
  { name: 'Home Office Deduction', href: '/calculators/finance/home-office-deduction-calculator', icon: '🏠', desc: 'Home Office Deduction' },
  { name: 'QBI Deduction', href: '/calculators/finance/qbi-deduction-calculator', icon: '📋', desc: 'QBI Deduction' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
