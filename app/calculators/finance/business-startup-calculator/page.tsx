import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Business Startup Cost & Break-Even Calculator USA 2026 | ToolTrio',
  description: 'Calculate business startup break-even timeline, monthly cash flow, and 3-year profitability — including SBA loan payments.',
  slug: 'business-startup-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['business startup cost calculator','break-even calculator small business','startup cash flow projection','SBA loan payment calculator'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'How do I calculate my business break-even point?', answer: 'Break-even is reached when your gross profit (revenue × gross margin) covers your fixed monthly overhead plus any loan payments. This calculator projects monthly cash flow forward using your revenue, margin, and overhead assumptions to show the month you cross into profitability.' },
  { question: 'What\'s a realistic gross margin for a new business?', answer: 'It varies enormously by industry — service businesses often run 50-70% gross margins, retail/e-commerce 20-50%, and manufacturing 15-35%. Use your actual cost-of-goods-sold data if available rather than an industry average for accuracy.' },
  { question: 'Should I use an SBA loan to fund my startup?', answer: 'SBA 7(a) loans offer longer terms and lower down payments than conventional business loans, but require strong personal credit and often a personal guarantee. Compare the monthly payment against your projected cash flow to ensure you can service the debt during the ramp-up period.' },
  { question: 'How is the optional loan payment calculated?', answer: 'The loan is modeled as a 60-month amortizing loan using the entered annual interest rate.' },
  { question: 'Why can break-even be misleading when a loan is entered?', answer: 'The current formula adds loan principal to one-time costs in the break-even numerator even though borrowed funds may finance those costs. Review the cash-flow outputs separately.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'SBA Loan Calculator', href: '/calculators/finance/sba-loan-calculator', icon: '🏛️', desc: 'SBA Loan' },
  { name: 'Side Hustle Break-Even', href: '/calculators/finance/side-hustle-breakeven-calculator', icon: '💡', desc: 'Side Hustle Break-Even' },
  { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '🧾', desc: 'Self-Employment Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
  </>
}
