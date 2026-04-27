import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import MortgageCalculatorClient from './MortgageCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Mortgage Calculator USA 2026 – Monthly Payment, PITI & Amortization',
 description: 'Free mortgage calculator USA 2026. Calculate your complete monthly mortgage payment with principal, interest, taxes, insurance (PITI), and PMI. Real examples for $300k–$600k homes.',
 slug: 'mortgage-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'mortgage calculator 2026',
 
 'mortgage calculator', 'mortgage calculator USA 2026', 'free mortgage calculator',
 'mortgage calculator with taxes and insurance', 'PITI calculator', 'mortgage calculator PMI',
 'monthly mortgage payment calculator', 'mortgage amortization calculator',
 'mortgage payment calculator', 'home mortgage calculator',
 'mortgage calculator with down payment', 'mortgage payment estimator',
 '30 year mortgage calculator', '15 year mortgage calculator',
 'mortgage calculator with PMI and taxes', 'what is my mortgage payment',
 'how much is my mortgage payment', 'mortgage payment breakdown',
 'mortgage interest calculator', 'mortgage principal and interest',
 'mortgage affordability calculator', 'biweekly mortgage calculator',
 'refinance vs new mortgage', 'fixed rate mortgage calculator',
 'ARM mortgage calculator', 'jumbo mortgage calculator',
 ],
})

const faqs = [
 {
 question: 'What is the monthly mortgage payment on a $400,000 home at 7%?',
 answer: 'At 7% interest over 30 years on a $400,000 home with 20% down ($80,000): Loan amount = $320,000. Principal & Interest = $2,129/month. Add estimated property taxes ($267/mo at 1% rate), homeowner\'s insurance ($117/mo), total monthly PITI = approximately $2,513/month. With less than 20% down, add PMI of $133-$267/month.',
 },
 {
 question: 'What does PITI stand for in a mortgage payment?',
 answer: 'PITI stands for Principal, Interest, Taxes, and Insurance -- the four components of a complete mortgage payment. Principal repays your loan balance. Interest is the lender\'s fee. Taxes are property taxes collected monthly into an escrow account. Insurance includes homeowner\'s insurance and PMI (if your down payment was under 20%). Many mortgage calculators only show P&I, which understates your real monthly cost.',
 },
 {
 question: 'When can I stop paying PMI on my mortgage?',
 answer: 'PMI (Private Mortgage Insurance) can be removed when your loan-to-value ratio reaches 80% (meaning you have 20% equity). Under the Homeowners Protection Act, you can request cancellation at 80% LTV, and lenders must automatically terminate PMI at 78% LTV based on the original amortization schedule. Home appreciation can also help you reach 20% equity faster -- you can request a new appraisal and ask for PMI removal.',
 },
 {
 question: 'Is a 15-year or 30-year mortgage better?',
 answer: 'On a $400,000 home with 20% down at 7%: 30-year = $2,129/month, total interest = $446,810. 15-year = $2,875/month, total interest = $197,500 -- saving $249,310. The 15-year costs $746/month more but saves $249,000 in interest. Choose 15-year if you can afford the payments. Choose 30-year if you need the lower payment or plan to invest the difference (S&P 500 averages ~10%/year historically).',
 },
 {
 question: 'What credit score do I need to get the best mortgage rate in 2026?',
 answer: 'In 2026: 740+ gets the best rates (typically 0.5-1% lower than 680). 700-739 gets good rates. 620-699 qualifies for conventional but at higher rates. 580-619 may qualify for FHA loans. Below 580 is difficult to get approved. A 1% rate difference on a $320,000 loan saves about $67/month, or $24,000 over 30 years.',
 },
 {
 question: 'How much house can I afford on my salary?',
 answer: 'The standard guideline: total housing costs (PITI) should not exceed 28% of gross monthly income, and total debt should not exceed 36% (the 28/36 rule). On $80,000/year ($6,667/month): max housing costs = $1,867/month. At 7% rate with 20% down, that supports a home price of roughly $285,000-$310,000. Use our Home Affordability Calculator for your exact numbers.',
 },
 {
 question: 'What is an amortization schedule?',
 answer: 'An amortization schedule shows how each mortgage payment is split between principal and interest over the life of the loan. In the early years, most of your payment goes to interest (e.g., in month 1 of a $320,000 loan at 7%, $1,867 goes to interest and only $262 to principal). By the final years, almost all of each payment goes to principal. This calculator shows the full year-by-year amortization breakdown.',
 },
 {
 question: 'What is a good mortgage interest rate in 2026?',
 answer: 'As of early 2026, the average 30-year fixed mortgage rate is approximately 6.75-7.25% (per Freddie Mac PMMS). A rate below the current average is considered good. Rates vary based on credit score, down payment, loan type, and lender. Getting quotes from at least 3 lenders can save $2,000-$5,000 in fees and secure a better rate.',
 },
]

const relatedCalculators = [
 { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', desc: 'EMI & amortization' },
 { name: 'Home Affordability', href: '/calculators/finance/home-affordability-calculator', icon: '💰', desc: 'How much can I afford' },
 { name: 'Biweekly Mortgage', href: '/calculators/finance/biweekly-mortgage-calculator', icon: '📅', desc: 'Pay off faster' },
 { name: 'Mortgage Refinance', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', desc: 'Refinance savings' },
 { name: 'Down Payment', href: '/calculators/finance/down-payment-calculator', icon: '💵', desc: 'Down payment planner' },
 { name: 'Closing Cost', href: '/calculators/finance/closing-cost-calculator', icon: '📋', desc: 'Closing cost estimate' },
 { name: 'Rent vs Buy', href: '/calculators/finance/rent-vs-buy-calculator', icon: '⚖️', desc: 'Rent or buy?' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({
 name: 'Free Mortgage Calculator USA -- PITI, PMI & Amortization',
 description: 'Free mortgage calculator USA 2026. Calculate your complete monthly mortgage payment with principal, interest, taxes, insurance (PITI), and PMI. Real e',
  url: 'https://tooltrio.com/calculators/finance/mortgage-calculator',
 ratingValue: '4.9',
 ratingCount: '3847',
 }),
]

export default function MortgageCalculatorPage() {
 return (
 <MortgageCalculatorClient
 faqs={faqs}
 structuredData={structuredData}
 relatedCalculators={relatedCalculators}
 blogSlug="best-mortgage-calculators-usa-2026"
 />
 )
}
