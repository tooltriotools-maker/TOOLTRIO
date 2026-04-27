import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import DownPaymentCalculatorClient from './DownPaymentCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Down Payment Calculator USA 2026 – How Much to Put Down on a Home',
 description: 'Free down payment calculator USA 2026. Compare 3%, 5%, 10%, and 20% down payments side by side with PMI, monthly payment, and total cost. Real examples for $250k-$600k home prices.',
 slug: 'down-payment-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'down payment calculator 2026',
 
 'down payment calculator', 'home down payment calculator', 'mortgage down payment calculator',
 'how much down payment do I need', 'down payment percentage calculator',
 'minimum down payment calculator', 'how to avoid PMI calculator',
 '20 percent down payment calculator', 'down payment vs monthly payment',
 'how much to put down on a house', 'FHA down payment calculator',
 'conventional loan down payment', 'first time home buyer down payment',
 ],
})

const faqs = [
 { question: 'How much down payment do I need to avoid PMI?', answer: 'You need at least 20% down to avoid PMI (Private Mortgage Insurance) on a conventional loan. On a $400,000 home: 20% = $80,000. PMI typically costs 0.5-1.5% of the loan annually ($167-$500/month on a $400,000 loan). The break-even calculation: if you have $80,000, it usually makes more sense to put it as 20% down than to invest it and pay PMI -- especially at current interest rates.' },
 { question: 'What is the minimum down payment for a house in 2026?', answer: 'Minimum down payments by loan type in 2026: Conventional (first-time buyer): 3% down. Conventional (repeat buyer): 5% down. FHA loan: 3.5% (credit 580+) or 10% (credit 500-579). VA loan: 0% (eligible veterans/military). USDA loan: 0% (eligible rural properties). Jumbo loan: typically 10-20%. A lower down payment means a larger loan, higher monthly payment, and usually requires PMI.' },
 { question: 'Is it better to put 10% or 20% down?', answer: 'On a $400,000 home at 7% for 30 years: 10% down ($40,000): monthly payment $2,395 + PMI $200 = $2,595. 20% down ($80,000): monthly payment $2,129, no PMI. The 20% down saves $466/month and $167,760 over 30 years. However, if that extra $40,000 invested in the S&P 500 returns 10%/year, it grows to $697,000 in 30 years. This is the core rent-vs-buy/20%-vs-less-down decision.' },
 { question: 'Can I buy a house with 3% down?', answer: 'Yes -- Fannie Mae and Freddie Mac conventional loans allow 3% down for first-time buyers (defined as not having owned a home in the last 3 years). FHA loans allow 3.5% down with a 580+ credit score. The tradeoff: a $400,000 home with 3% down ($12,000) means a $388,000 loan, a higher monthly payment, and mandatory PMI until you reach 20% equity (typically 7-10 years at 7% interest).' },
]

const relatedCalculators = [
 { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Full PITI with PMI' },
 { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', icon: '📋', desc: 'Closing costs estimate' },
 { name: 'Home Affordability', href: '/calculators/finance/home-affordability-calculator', icon: '💰', desc: 'How much can I afford' },
 { name: 'Rent vs Buy', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent or buy?' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Down Payment Calculator -- Compare 5% to 20% Down', description: 'Compare mortgage payments at different down payment amounts. See PMI costs and savings.', url: 'https://tooltrio.com/calculators/finance/down-payment-calculator' }),
]

export default function DownPaymentPage() {
 return <DownPaymentCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="down-payment-how-much-house-usa-2026" />
}
