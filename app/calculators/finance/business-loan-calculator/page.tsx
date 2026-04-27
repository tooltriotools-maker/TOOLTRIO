import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import BusinessLoanCalculatorClient from './BusinessLoanCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Business Loan Calculator USA 2026 – Monthly Payment, Total Cost and Amortization',
 description: 'Free business loan calculator USA 2026. Calculate monthly payments, total interest, and amortization schedule for any business loan. Real examples for $50k-$500k loans at 6-20% interest rates.',
 slug: 'business-loan-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'business loan calculator 2026',
 
 'business loan calculator', 'small business loan calculator', 'SBA loan calculator',
 'business loan payment calculator', 'SBA 7a loan calculator', 'equipment loan calculator',
 'business loan interest calculator', 'debt service coverage ratio calculator',
 'DSCR calculator', 'business financing calculator', 'commercial loan calculator',
 'business loan monthly payment', 'how much business loan can I get',
 'business loan calculator 2026', 'SBA loan payment calculator',
 ],
})

const faqs = [
 { question: 'What is a DSCR (Debt Service Coverage Ratio) and why does it matter?', answer: 'DSCR = Net Operating Income / Annual Debt Service (total loan payments). Lenders require a DSCR of at least 1.25x -- meaning your business generates $1.25 in income for every $1 of debt payment. A DSCR below 1.0x means your business can\'t cover debt from operations. Most SBA lenders want 1.25x or higher. Our calculator estimates your DSCR based on revenue and payment to help you gauge lender eligibility.' },
 { question: 'What is an SBA loan and how do I qualify?', answer: 'SBA (Small Business Administration) loans are government-backed loans with favorable rates. SBA 7(a): up to $5M, terms up to 10 years (25 for real estate), rates ~8-10% in 2026. Requirements: US-based for-profit business, owner has invested equity, exhausted other financing, meets SBA size standards, good personal credit (usually 650+), 2+ years in business, and sufficient cash flow (DSCR 1.25+). Approval takes 30-90 days.' },
 { question: 'What is a good interest rate for a business loan in 2026?', answer: 'In 2026, business loan rates: SBA 7(a): 8-10.5%. SBA 504: 6-7%. Bank term loan: 7-12%. Online lenders: 10-30%. Equipment financing: 6-12%. Invoice financing: 15-30%. Merchant cash advance: 30-150% effective APR (avoid unless desperate). Your rate depends on credit score, time in business, revenue, and loan type. Banks offer the lowest rates to established businesses with strong financials.' },
 { question: 'How much can I borrow for a business loan?', answer: 'Loan amounts by type: SBA 7(a): up to $5M. SBA 504: up to $5.5M. SBA microloan: up to $50,000. Bank term loan: $25,000-$1M+. Business line of credit: $10,000-$500,000. Equipment financing: typically 80-100% of equipment value. Most lenders cap loans at 10-15% of your annual revenue. With $500,000 annual revenue: expect $50,000-$75,000 easily, up to $500,000 with strong financials.' },
]

const relatedCalculators = [
 { name: 'Loan Comparison', href: '/calculators/finance/loan-comparison-calculator', icon: '⚖️', desc: 'Compare loan offers' },
 { name: 'Personal Loan', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal loan payment' },
 { name: 'Break Even Calculator', href: '/calculators/finance/break-even-calculator', icon: '📊', desc: 'Business break-even' },
 { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📈', desc: 'Return on investment' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Business Loan Calculator -- SBA, Equipment & DSCR', description: 'Calculate business loan payments with DSCR analysis and SBA loan type comparison.', url: 'https://tooltrio.com/calculators/finance/business-loan-calculator' }),
]

export default function BusinessLoanPage() {
 return <BusinessLoanCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="small-business-finance-guide-usa-2026" />
}
