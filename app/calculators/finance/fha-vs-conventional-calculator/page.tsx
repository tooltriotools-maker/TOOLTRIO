import { CalculatorBatch48DeepDive } from '@/components/ui/CalculatorBatch48DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({ title: 'FHA vs Conventional Mortgage Calculator USA 2026 | ToolTrio', description: 'Compare FHA loan vs conventional mortgage total costs, monthly payments, PMI vs MIP, and which is cheaper for your credit score and down payment in 2026.', slug: 'fha-vs-conventional-calculator', category: 'finance', keywords: ['FHA vs conventional calculator 2026', 'FHA loan vs conventional mortgage', 'FHA MIP vs PMI calculator', 'which mortgage is better FHA or conventional'] })
const faqs = [
  { question: 'Are the mortgage rates in this calculator live?', answer: 'No. The FHA and conventional rates are built-in ToolTrio scenario assumptions adjusted by broad credit-score bands. Obtain current Loan Estimates from lenders for a real comparison.' },
  { question: 'What are the 2026 FHA loan limits?', answer: 'For a one-unit property, the 2026 FHA floor is $541,287 and the high-cost-area ceiling is $1,249,125. The applicable limit varies by county.' },
  { question: 'Does FHA mortgage insurance always last for the life of the loan?', answer: "Duration depends on the loan's origination terms, including loan-to-value and mortgage-insurance rules. The calculator uses a simplified monthly MIP assumption and does not model cancellation schedules." },
  { question: 'Can conventional PMI be removed?', answer: 'For many covered conventional mortgages, borrower-requested cancellation and automatic termination rules can apply after sufficient principal reduction, subject to statutory and loan requirements. This model does not simulate PMI removal over time.' },
  { question: 'Which loan is better for me?', answer: 'The cheaper modeled total is not an approval recommendation. Credit profile, debt-to-income ratio, county loan limit, cash available, mortgage insurance, lender pricing and how long you expect to keep the loan all matter.' }
]
const relatedCalculators = [{'name': 'Mortgage Calculator', 'href': '/calculators/finance/mortgage-calculator', 'icon': '🏡', 'desc': 'Mortgage payments'}, {'name': 'Home Affordability', 'href': '/calculators/finance/home-affordability-calculator', 'icon': '💰', 'desc': 'How much house'}, {'name': 'Down Payment Calculator', 'href': '/calculators/finance/down-payment-calculator', 'icon': '💵', 'desc': 'Down payment needed'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch48DeepDive slug="fha-vs-conventional-calculator" />
</> }
