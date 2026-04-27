import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Student Loan Calculator USA 2026 – Monthly Payment, Payoff Date & Interest',
 description: 'Free student loan calculator USA 2026. Calculate your monthly payment, total interest paid, and payoff date for federal and private student loans. Real examples for $20k–$100k loan balances.',
 slug: 'student-loan-calculator',
 category: 'finance',
 keywords: [
 'student loan calculator 2026',
 
 'student loan calculator',
 'free student loan calculator',
 'student loan calculator online',
 'best student loan calculator 2026',
 'student loan calculator no signup',
 'accurate student loan calculator',
 'how to calculate student loan',
 'how does student loan calculator work',
 'what is student loan calculator',
 'calculate student loan free',
 'student loan calculator 2026',
 'student loan calculator 2026',
 'online student loan tool free',
 'student loan estimator online',
 'student loan formula calculator',
 'use student loan calculator now',
 'try student loan calculator free',
 'calculate my student loan',
 'check my student loan online',
 'find my student loan free',
 'instant student loan calculator',
 'quick student loan calculator',
 'student loan calculator app',
 'student loan calculator mobile',
 'student loan tool no login',
 'how to use student loan calculator',
 'what is a good student loan',
 'what is the formula for student loan',
 'how is student loan calculated',
 'when to use student loan calculator',
 'which student loan calculator is best',
 'how accurate is student loan calculator',
 'student loan calculator USA',
 'student loan financial calculator free',
 'student loan investment calculator',
 'student loan calculator with chart',
 'student loan returns calculator',
 'student loan calculator monthly',
 'student loan calculator yearly',
 'US student loan calculator',
 'American student loan calculator',
 'student loan calculator UK',
 'student loan calculator India',
 'student loan before after tax',
 'free finance calculator',
 'personal finance student loan',
 'student loan calculator no ads',
 'free financial calculator USA 2026',
 'investment calculator no signup',
 'retirement planning calculator free',
 'compound interest calculator USA',
 'mortgage calculator USA',
 'IRS tax calculator 2026',
 'student loan calculator USA 2026',
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
  { question: 'What is the current student loan interest rate in 2026?', answer: 'Federal student loan interest rates for 2026-2027 academic year: Direct Subsidized Loans (undergraduate): approximately 6.5%; Direct Unsubsidized Loans (undergraduate): approximately 6.5%; Direct Unsubsidized Loans (graduate/professional): approximately 8.0%; PLUS Loans (parents and graduate): approximately 9.0%. Rates are fixed for the life of the loan for each cohort, set annually by Congress based on the 10-year Treasury note rate plus a statutory add-on. Private student loan rates vary widely: 4-14% depending on credit score, with variable and fixed rate options. Always exhaust federal loans before private — federal loans offer income-driven repayment, forgiveness programs, and deferment options that private loans don\'t.' },
  { question: 'What is the SAVE income-driven repayment plan and how does it work?', answer: 'SAVE (Saving on A Valuable Education) is the newest federal income-driven repayment plan, launched in 2023-2024. It caps payments at 5% of discretionary income for undergraduate loans (10% for graduate) — lower than previous IDR plans. Discretionary income is defined more generously: income above 225% of the federal poverty line (previously 150%). The most significant feature: any accrued interest that isn\'t covered by your monthly payment is waived — no more growing balances while making payments. After 20 years (undergraduate) or 25 years (graduate) of qualifying payments, remaining balances are forgiven. As of 2026, SAVE has faced legal challenges — verify current status at studentaid.gov.' },
  { question: 'How does public service loan forgiveness actually work?', answer: 'PSLF cancels remaining federal Direct Loan balances after 120 qualifying monthly payments (10 years) while working full-time for a qualifying employer — federal, state, or local government, or any 501(c)(3) nonprofit. Payments must be made under an income-driven repayment plan. Key practical issues: you must submit Employment Certification Forms annually (not just at the end of 10 years) to stay on track; all loans must be Direct Loans (FFEL loans must be consolidated first); and the forgiven amount is tax-free under current law (unlike non-PSLF forgiveness after 20-25 years on IDR, which may be taxable). Historically, only 2-3% of initial applications were approved due to paperwork errors — submit certifications every year and verify them annually at studentaid.gov.' },
  { question: 'Should I refinance federal student loans into a private loan?', answer: 'Generally no — and this is one of the most consequential student loan decisions. Refinancing federal loans into a private loan permanently eliminates: income-driven repayment plans (IDR); Public Service Loan Forgiveness (PSLF); federal deferment and forbearance; death and disability discharge provisions. These protections are most valuable in uncertainty — job loss, career change, or the possibility of qualifying for forgiveness. The only case where refinancing federal loans makes sense: you have high-income certainty, stable employment, no chance of PSLF qualification, and a private loan offers a 2%+ rate reduction that saves substantial money over a short repayment timeline. Even then, maintain awareness of what you\'re forfeiting.' },
  { question: 'What is the debt-to-income ratio lenders use for student loans?', answer: 'Lenders use Debt-to-Income (DTI) ratio to assess whether a student loan borrower can afford other credit: total monthly debt payments (including student loan minimum payments on any IDR plan) divided by gross monthly income. Under 36%: excellent. 36-43%: generally acceptable for mortgage qualification. Above 43%: may struggle to qualify for mortgages or other major credit. Student loans on IDR plans count at the actual IDR payment (which may be very low or even $0 for low-income borrowers), improving DTI significantly compared to the standard 10-year repayment. For student loan borrowers seeking mortgage pre-approval, IDR payment documentation can dramatically improve their mortgage eligibility versus standard repayment amounts.' }
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
 return <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug="emi-calculator-complete-guide-understand-home-car-personal-loans" />
}
