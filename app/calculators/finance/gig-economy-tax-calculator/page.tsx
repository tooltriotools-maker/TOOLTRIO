import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
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
  { question: "What business mileage rate does this calculator use?", answer: "The calculator currently uses 76 cents per business mile, the IRS rate effective July 1, 2026. The January 1–June 30, 2026 rate was 72.5 cents, so a full-year return may require splitting mileage by date." },
  { question: "How does it estimate self-employment tax?", answer: "It applies 15.3% to 92.35% of modeled net self-employment income. This is simplified and does not coordinate the Social Security wage base with W-2 wages." },
  { question: "Does it calculate my exact federal income tax?", answer: "No. After modeled deductions it applies a flat 22% federal rate rather than the full progressive tax calculation, credits, filing status and other income." },
  { question: "How is the home-office deduction modeled?", answer: "The function applies your entered home-office percentage to an assumed $18,000 annual housing cost. It does not implement the IRS simplified or actual-expense home-office methods." },
  { question: "Should I use the result for quarterly payments?", answer: "Use it only as a planning estimate. Estimated-tax requirements depend on total household income, withholding, credits and safe-harbor rules." },
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
