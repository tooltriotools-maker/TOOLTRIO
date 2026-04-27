import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Home Loan Calculator USA 2026 – Monthly Mortgage Payment and Amortization',
 description: 'Free home loan calculator USA 2026. Calculate monthly mortgage payment, total interest, and complete amortization schedule for any home loan. Real examples for $150k-$600k loan amounts at current 2026 rates.',
 slug: 'home-loan-calculator',
 category: 'finance',
 keywords: [
 'home loan calculator 2026',
 
 'home loan calculator',
 'free home loan calculator',
 'home loan calculator online',
 'best home loan calculator 2026',
 'home loan calculator no signup',
 'accurate home loan calculator',
 'how to calculate home loan',
 'how does home loan calculator work',
 'what is home loan calculator',
 'calculate home loan free',
 'home loan calculator 2026',
 'home loan calculator 2026',
 'online home loan tool free',
 'home loan estimator online',
 'home loan formula calculator',
 'use home loan calculator now',
 'try home loan calculator free',
 'calculate my home loan',
 'check my home loan online',
 'find my home loan free',
 'instant home loan calculator',
 'quick home loan calculator',
 'home loan calculator app',
 'home loan calculator mobile',
 'home loan tool no login',
 'how to use home loan calculator',
 'what is a good home loan',
 'what is the formula for home loan',
 'how is home loan calculated',
 'when to use home loan calculator',
 'which home loan calculator is best',
 'how accurate is home loan calculator',
 'home loan calculator USA',
 'home loan financial calculator free',
 'home loan investment calculator',
 'home loan calculator with chart',
 'home loan returns calculator',
 'home loan calculator monthly',
 'home loan calculator yearly',
 'US home loan calculator',
 'American home loan calculator',
 'home loan calculator UK',
 'home loan calculator India',
 'home loan before after tax',
 'free finance calculator',
 'personal finance home loan',
 'home loan calculator no ads',
 'free financial calculator USA 2026',
 'investment calculator no signup',
 'retirement planning calculator free',
 'compound interest calculator USA',
 'mortgage calculator USA',
 'IRS tax calculator 2026',
 'tooltrio.com',
 'free calculator no signup',
 'calculator no data stored',
 'instant calculator results',
 'free calculator USA UK India'
 ],
})

const relatedCalculators = [
 { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'Loan EMI calculator' },
 { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', icon: '🚗', desc: 'Car loan calculator' },
 { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal loan' },
 { name: 'Loan Prepayment Calculator', href: '/calculators/finance/loan-prepayment-calculator', icon: '💸', desc: 'Prepayment savings' },
 { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt payoff strategy' },
 { name: 'Mortgage Refinance', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', desc: 'Refinance calculator' },
]

const faqs = [
 { question: 'What is the monthly payment on a $400,000 mortgage at 7%?', answer: 'At 7% interest over 30 years, a $400,000 mortgage has a principal and interest payment of approximately $2,661/month. Adding estimated property taxes ($400/mo), homeowner\'s insurance ($120/mo), and PMI ($150/mo if less than 20% down) brings the total monthly payment to approximately $3,331. Enter your exact numbers above to get your precise PITI payment.' },
 { question: 'How do you calculate a mortgage payment?', answer: 'The standard mortgage payment formula (CFPB standard) is: M = P x [r(1+r)^n] / [(1+r)^n - 1], where P = loan amount, r = monthly interest rate (annual rate / 12), and n = number of payments (years x 12). Example: $300,000 loan, 6.75%, 30 years: r = 0.005625, n = 360. M = $1,946/month principal and interest.' },
 { question: 'Is it better to get a 15-year or 30-year mortgage?', answer: 'On a $400,000 loan at 7%: 30-year = $2,661/month, total interest $557,960. 15-year = $3,593/month, total interest $246,740. The 15-year costs $932/month more but saves $311,220 in interest. Choose 15-year if you can afford the higher payment. Choose 30-year if you need lower payments or plan to invest the difference in the market (S&P 500 averages ~10% historically).' },
 { question: 'What credit score do I need to get a mortgage in 2026?', answer: 'Most conventional mortgages require a minimum 620 credit score. FHA loans allow 580 (3.5% down) or 500 (10% down). For the best 2026 mortgage rates, aim for 740+ -- borrowers with 740+ typically receive rates 0.5-1% lower than those with 680, saving $60,000-$100,000 in total interest on a $400,000 loan.' },
 { question: 'What is PMI and when can I remove it?', answer: 'PMI (Private Mortgage Insurance) is required when your down payment is under 20%. It costs 0.5-1.5% of loan annually ($125-$375/month on a $300,000 loan). Under the Homeowners Protection Act, you can request PMI removal when your loan reaches 80% LTV (20% equity). Lenders must auto-cancel at 78% LTV. Refinancing when your home has appreciated to 80% LTV also eliminates PMI.' },
 { question: 'How much down payment do I need in 2026?', answer: 'Minimum down payments in 2026: Conventional loan -- 3% (first-time buyers) or 5% (repeat buyers). FHA loan -- 3.5% (credit 580+). VA loan -- 0% (eligible veterans). USDA loan -- 0% (eligible rural areas). However, putting 20% down eliminates PMI, saving $100-$500/month on most loans. Our calculator lets you model any down payment amount.' },
 { question: 'What is included in a mortgage payment (PITI)?', answer: 'A complete mortgage payment includes: Principal (loan repayment), Interest (lender fee -- the largest portion early on), Taxes (property taxes collected monthly into escrow -- typically 0.5-2.5% of home value annually depending on state), and Insurance (homeowner\'s insurance ~$1,400/year nationally). If down payment was under 20%, PMI is also included. Together these are called PITI.' },
 { question: 'Should I pay off my mortgage early or invest the extra money?', answer: 'If your mortgage rate is above 7%, paying off is a guaranteed return that\'s hard to beat. If below 5% (many pre-2022 mortgages), investing in index funds historically beats paying down the mortgage. At 6-7%, it\'s a close call that depends on your risk tolerance. Our pay-off-vs-invest calculator models your exact scenario with real numbers.' },
]

export default function Page() {
 return (
 <CalculatorClient
 faqs={faqs}
 structuredData={[generateFAQStructuredData(faqs)]}
 relatedCalculators={relatedCalculators}
 blogSlug='home-loan-mortgage-guide-how-to-get-best-rate'
 />
 )
}
