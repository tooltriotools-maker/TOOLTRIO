import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Mortgage Refinance Calculator USA 2026 – Break-Even, Monthly Savings and ROI',
 description: 'Free mortgage refinance calculator USA 2026. Calculate monthly savings, break-even month, and total interest saved from refinancing. Real examples for $200k-$500k mortgages refinancing at 2026 rates.',
 slug: 'mortgage-refinance-calculator',
 category: 'finance',
 keywords: [
 'mortgage refinance calculator 2026',
 
 'mortgage refinance calculator',
 'free mortgage refinance calculator',
 'mortgage refinance calculator online',
 'best mortgage refinance calculator 2026',
 'mortgage refinance calculator no signup',
 'accurate mortgage refinance calculator',
 'how to calculate mortgage refinance',
 'how does mortgage refinance calculator work',
 'what is mortgage refinance calculator',
 'calculate mortgage refinance free',
 'mortgage refinance calculator 2026',
 'mortgage refinance calculator 2026',
 'online mortgage refinance tool free',
 'mortgage refinance estimator online',
 'mortgage refinance formula calculator',
 'use mortgage refinance calculator now',
 'try mortgage refinance calculator free',
 'calculate my mortgage refinance',
 'check my mortgage refinance online',
 'find my mortgage refinance free',
 'instant mortgage refinance calculator',
 'quick mortgage refinance calculator',
 'mortgage refinance calculator app',
 'mortgage refinance calculator mobile',
 'mortgage refinance tool no login',
 'how to use mortgage refinance calculator',
 'what is a good mortgage refinance',
 'what is the formula for mortgage refinance',
 'how is mortgage refinance calculated',
 'when to use mortgage refinance calculator',
 'which mortgage refinance calculator is best',
 'how accurate is mortgage refinance calculator',
 'mortgage refinance calculator USA',
 'mortgage refinance financial calculator free',
 'mortgage refinance investment calculator',
 'mortgage refinance calculator with chart',
 'mortgage refinance returns calculator',
 'mortgage refinance calculator monthly',
 'mortgage refinance calculator yearly',
 'US mortgage refinance calculator',
 'American mortgage refinance calculator',
 'mortgage refinance calculator UK',
 'mortgage refinance calculator India',
 'mortgage refinance before after tax',
 'free finance calculator',
 'personal finance mortgage refinance',
 'mortgage refinance calculator no ads',
 'free financial calculator USA 2026',
 'investment calculator no signup',
 'retirement planning calculator free',
 'compound interest calculator USA',
 'mortgage calculator USA',
 'IRS tax calculator 2026',
 'mortgage refinance calculator USA 2026',
 'US retirement calculator free',
 'American investment tool',
 '401k calculator 2026',
 'Roth IRA calculator free',
 'FIRE number calculator USA',
 'mortgage payment calculator USA',
 'debt payoff calculator free',
 'tooltrio.com',
 'free calculator no signup',
 'calculator no data stored',
 'instant calculator results',
 'free calculator USA UK India'
 ],
})

const faqs = [
  { question: 'How do I calculate whether refinancing my mortgage makes financial sense?', answer: 'Break-even analysis: total refinancing closing costs ÷ monthly payment reduction = months to break even. If closing costs are $6,000 and the new payment is $250 lower, break-even = 24 months. If you\'ll stay in the home beyond 24 months, refinancing saves money. Critical nuance: restarting the amortization clock can cost more than the lower rate saves. If you have 22 years remaining on your mortgage and refinance to a new 30-year loan, you\'ve extended the payoff 8 years. The true comparison is total remaining payments on the old loan versus total new loan payments. A shorter-term refinance (15-year) often costs less total interest despite a slightly higher rate.' },
  { question: 'What closing costs should I expect when refinancing?', answer: 'Total refinancing costs typically run 2-5% of the loan amount. The main items: origination fee (0.5-1% of loan); title search and title insurance ($700-$1,500); appraisal ($400-$700); credit report fee ($25-$50); recording fees ($100-$250); prepaid interest (the odd days between closing and first payment); escrow impounds (initial property tax and insurance reserves). On a $300,000 loan: expect $6,000-$15,000 in closing costs. No-closing-cost refinances are available — the lender recoups costs through a slightly higher rate (typically 0.25-0.375% higher). For people planning to move within 3-4 years, a no-closing-cost refi may have better net economics than paying closing costs.' },
  { question: 'When is a cash-out refinance a good idea?', answer: 'Cash-out refinancing makes most financial sense when: (1) current mortgage rates are near your existing rate, so you\'re not drastically raising your rate on the full balance; (2) the purpose of the cash is a high-return use — home improvements that increase value, paying off higher-rate debt, or a business investment with clear return; (3) you have substantial equity (maintaining at least 20% equity after the cash-out avoids PMI). Cash-out refinancing is financially problematic when: rates are significantly higher than your current loan, requiring you to pay more on the full balance; the purpose is consumption spending or depreciating assets; or it significantly extends your loan term.' },
  { question: 'How does my credit score affect my refinancing rate?', answer: 'Every 20-40 point credit score band typically represents a 0.125-0.25% rate difference in mortgage pricing. The meaningful tiers: 760+: best available rates; 720-759: approximately 0.125-0.25% higher; 680-719: 0.25-0.5% higher; 640-679: 0.5-0.75% higher; below 640: limited eligibility. On a $400,000 loan: a 0.5% rate difference costs approximately $1,600/year or $48,000 over 30 years. Before refinancing, check your credit report for errors (dispute any inaccuracies), pay down revolving balances below 30% of limits, and avoid any new credit inquiries for 6+ months. Even small credit score improvements can move you to a better pricing tier.' },
  { question: 'Should I refinance to a 15-year mortgage instead of another 30-year?', answer: 'A 15-year refinance typically offers rates 0.5-0.75% lower than 30-year loans. The tradeoff: significantly higher monthly payment but dramatically lower total interest. Example: $400,000 at 7% for 30 years = $2,661/month, $558,000 total interest. Same balance at 6.25% for 15 years = $3,430/month, $217,000 total interest. The 15-year saves $341,000 in interest but requires $769 more per month. Financial planning guidance: the 15-year is better for people with stable income who can comfortably manage the higher payment and don\'t have other high-interest debt or unmet investment goals. The 30-year with voluntary extra payments gives similar results with payment flexibility as a safety valve.' }
]

const relatedCalculators = [
 { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'Loan EMI calculator' },
 { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', desc: 'Home loan EMI' },
 { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', icon: '🚗', desc: 'Car loan calculator' },
 { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal loan' },
 { name: 'Loan Prepayment Calculator', href: '/calculators/finance/loan-prepayment-calculator', icon: '💸', desc: 'Prepayment savings' },
 { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt payoff strategy' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug='mortgage-calculator-guide-how-to-buy-a-home-usa' />
}
