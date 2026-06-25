import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Affordability Calculator USA 2026 — How Much House? | ToolTrio',
  description: 'Calculate maximum home price and loan amount based on income, debts, down payment, and 2026 lending standards (28/43 DTI rule).',
  slug: 'mortgage-affordability-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['mortgage affordability calculator 2026', 'how much house can I afford USA', '28 36 rule mortgage calculator', 'maximum mortgage calculator USA', 'home buying affordability 2026'],
})
const faqs = [
  {
    question: 'What is the 28/43 rule for mortgages?',
    answer: "Lenders use two debt-to-income thresholds: Front-end (28%): housing costs (mortgage + tax + insurance) should not exceed 28% of gross monthly income. Back-end (43%): total debt payments (housing + all other debt) should not exceed 43% of gross monthly income. Conventional loans require ≤43% total DTI; FHA loans allow up to 57% with compensating factors. Exceeding these limits doesn't automatically disqualify you but raises rates.",
  },
  {
    question: 'How much house can I afford in 2026?',
    answer: 'At $120,000 income, 7% rate, $60,000 down, and $500/month in other debt: the 28% front-end rule allows roughly $350,000, while the 43% back-end rule allows about $380,000. The lower of the two ($350,000) is your limit. At 2026 rates near 7%, affordability is significantly reduced from 2020-2021 levels — the same payment at 3% rate bought $500,000+.',
  },
  {
    question: 'What is a good down payment for a home?',
    answer: "20% eliminates PMI (private mortgage insurance, ~0.5-1.5% of loan annually). 10-19%: PMI required, removed when equity reaches 20%. 3-5%: FHA (3.5%) or conventional (3%) low-down-payment programs available, with higher total cost. 3.5% FHA down on a $400,000 home = $14,000 down but $3,000+/year in mortgage insurance. If you can't do 20%, consider 10% down to reduce PMI while preserving cash.",
  }
]
const relatedCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏠', desc: 'Mortgage Calculator' },
  { name: 'Down Payment Calculator', href: '/calculators/finance/down-payment-calculator', icon: '💵', desc: 'Down Payment Calculator' },
  { name: 'Rent vs Buy Calculator', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent vs Buy Calculator' },
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '📋', desc: 'Closing Cost Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
