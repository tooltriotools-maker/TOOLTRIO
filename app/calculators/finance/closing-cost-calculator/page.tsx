import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import ClosingCostCalculatorClient from './ClosingCostCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Closing Cost Calculator USA 2026 – Estimate All Home Buying Fees',
 description: 'Free closing cost calculator USA 2026. Estimate all closing costs including lender fees, title insurance, escrow, prepaid items, and recording fees. Real examples for $200k-$600k home purchases in all states.',
 slug: 'closing-cost-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'closing cost calculator 2026',
 
 'closing cost calculator', 'home closing cost calculator', 'mortgage closing costs estimate',
 'how much are closing costs', 'closing costs calculator USA 2026',
 'cash to close calculator', 'closing cost breakdown', 'title insurance calculator',
 'how much cash do I need to close on a house', 'closing fees calculator',
 'real estate closing costs', 'buyer closing costs calculator',
 'lender fees calculator', 'escrow calculator home purchase',
 ],
})

const faqs = [
 { question: 'How much are closing costs on a home in 2026?', answer: 'Closing costs typically range from 2% to 5% of the home purchase price. On a $400,000 home: 2-5% = $8,000-$20,000. The average American pays about 2.5-3% in closing costs. Costs vary significantly by state -- New York and Pennsylvania have some of the highest, while Missouri and Indiana have the lowest. Get a Loan Estimate from your lender within 3 days of applying for exact figures.' },
 { question: 'What is included in closing costs?', answer: 'Closing costs have four categories: (1) Lender fees -- origination fee (1%), appraisal ($400-$700), home inspection ($300-$500), credit report. (2) Title fees -- title insurance (0.5% of home price), title search, attorney fee. (3) Prepaid items -- first months of property taxes and insurance into escrow, prepaid interest. (4) Government fees -- recording fees, transfer taxes. Our calculator breaks down all 12 major fee types.' },
 { question: 'Can closing costs be included in my mortgage?', answer: 'Not directly in conventional loans, but there are ways to manage them: (1) Seller concessions -- ask seller to pay up to 3% of closing costs. (2) Lender credits -- accept a slightly higher interest rate in exchange for lender paying some closing costs. (3) Rolling into a refinance -- some closing costs can be rolled into a refinance loan. (4) Down payment assistance programs often cover closing costs for first-time buyers.' },
 { question: 'What is the difference between closing costs and down payment?', answer: 'Down payment is the portion of the home price you pay directly (e.g., 20% = $80,000 on a $400,000 home). Closing costs are separate fees paid to complete the transaction (lender, title company, government). Total cash needed to close = down payment + closing costs. On a $400,000 home with 20% down and 3% closing costs: $80,000 + $12,000 = $92,000 total cash needed.' },
]

const relatedCalculators = [
 { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Monthly PITI payment' },
 { name: 'Down Payment', href: '/calculators/finance/down-payment-calculator', icon: '💵', desc: 'Down payment comparison' },
 { name: 'Home Affordability', href: '/calculators/finance/home-affordability-calculator', icon: '💰', desc: 'How much can I afford' },
 { name: 'Rent vs Buy', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent or buy analysis' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Closing Cost Calculator -- Full 12-Item Breakdown', description: 'Estimate all closing costs including lender fees, title insurance, escrow, and cash to close.', url: 'https://tooltrio.com/calculators/finance/closing-cost-calculator' }),
]

export default function ClosingCostPage() {
 return <ClosingCostCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="down-payment-how-much-house-usa-2026" />
}
