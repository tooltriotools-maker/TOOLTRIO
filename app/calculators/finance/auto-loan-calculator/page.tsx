import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import AutoLoanCalculatorClient from './AutoLoanCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Auto Loan Calculator USA 2026 – Monthly Car Payment & Total Interest Cost',
 description: 'Free auto loan calculator USA 2026. Calculate your exact monthly car payment, total interest cost, and amortization schedule. Real examples for $20k–$60k vehicle prices at 4–12% APR.',
 slug: 'auto-loan-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'auto loan calculator 2026',
 
 'auto loan calculator', 'car loan calculator', 'auto loan payment calculator',
 'car payment calculator', 'auto loan calculator with tax and fees',
 'used car loan calculator', 'new car loan calculator', 'vehicle loan calculator',
 'auto loan monthly payment', 'car loan amortization calculator',
 'auto loan calculator 2026', 'best auto loan rates 2026',
 'auto loan calculator with trade in', 'how much car can I afford',
 'car loan interest calculator', 'auto loan payoff calculator',
 ],
})

const faqs = [
 { question: 'What is the monthly payment on a $35,000 car at 7% for 60 months?', answer: 'On a $35,000 car with $7,000 down (20%), $28,000 financed at 7% APR for 60 months: monthly payment = $554. Total interest = $5,240. Total cost = $33,240 (financed portion). Add sales tax and fees to get the full picture -- our calculator includes all of these.' },
 { question: 'What is a good auto loan interest rate in 2026?', answer: 'In 2026, good auto loan rates are: New car with 720+ credit score: 5-7% APR. New car with 660-719: 7-10%. Used car with 720+: 7-10%. Used car with 620-659: 12-17%. Below 620: 18-25%+. Credit unions typically offer 1-2% lower rates than dealership financing. Getting pre-approved before visiting a dealership gives you negotiating power.' },
 { question: 'Should I put more money down on a car?', answer: 'A larger down payment reduces your loan amount, monthly payment, total interest, and risk of being "underwater" (owing more than the car is worth). Cars depreciate 15-25% in the first year. Putting less than 20% down often means you owe more than the car is worth within a year. Most financial advisors recommend at least 10-20% down on a car.' },
 { question: 'Is it better to get a 36-month or 60-month auto loan?', answer: 'On a $25,000 loan at 7%: 36 months = $772/mo, total interest $2,799. 60 months = $495/mo, total interest $4,700. The 60-month saves $277/month but costs $1,901 more in interest. Choose 36-month if you can afford it to pay less overall. Choose 60-month if you need lower payments -- but avoid 72 or 84-month loans, which often leave you owing more than the car is worth.' },
 { question: 'What fees are included in an auto loan?', answer: 'Common auto loan fees include: Documentation fee ($100-$400), Title and registration ($50-$300), Dealer prep fee ($100-$500), GAP insurance ($200-$700), Extended warranty (varies). Always ask the dealer for a complete out-the-door price and compare the full cost, not just the monthly payment. Our calculator lets you add these fees to see the real total.' },
]

const relatedCalculators = [
 { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', icon: '🚙', desc: 'Standard car loan' },
 { name: 'Loan Comparison', href: '/calculators/finance/loan-comparison-calculator', icon: '⚖️', desc: 'Compare loan offers' },
 { name: 'Lease vs Buy', href: '/calculators/finance/lease-vs-buy-calculator', icon: '🔄', desc: 'Lease or buy?' },
 { name: 'Personal Loan', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal loan payment' },
 { name: 'Payoff Date', href: '/calculators/finance/payoff-date-calculator', icon: '📅', desc: 'When will it be paid off' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Auto Loan Calculator -- With Tax, Trade-In & Fees', description: 'Calculate exact car loan payment including sales tax, trade-in, and fees.', url: 'https://tooltrio.com/calculators/finance/auto-loan-calculator' }),
]

export default function AutoLoanPage() {
 return <AutoLoanCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="car-loan-calculator-usa-2026-rates-by-state" />
}
