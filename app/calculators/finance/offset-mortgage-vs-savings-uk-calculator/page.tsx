import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'UK Offset Mortgage vs Savings Calculator 2026 – Which Saves More Money?',
 description: 'Free UK offset mortgage vs savings calculator 2026. Compare putting savings in an offset mortgage account vs keeping them in a high-yield savings account. Real examples for GBP 50k-300k mortgage with GBP 20k-100k savings.',
 slug: 'offset-mortgage-vs-savings-uk-calculator',
 category: 'finance',
 region: 'uk',
 keywords: [
 'offset mortgage vs savings uk calculator 2026',
 
 'offset mortgage vs savings uk calculator',
 'free offset mortgage vs savings uk calculator',
 'offset mortgage vs savings uk calculator online',
 'best offset mortgage vs savings uk calculator 2026',
 'offset mortgage vs savings uk calculator no signup',
 'accurate offset mortgage vs savings uk calculator',
 'how to calculate offset mortgage vs savings uk',
 'how does offset mortgage vs savings uk calculator work',
 'what is offset mortgage vs savings uk calculator',
 'calculate offset mortgage vs savings uk free',
 'offset mortgage vs savings uk calculator 2026',
 'offset mortgage vs savings uk calculator 2026',
 'online offset mortgage vs savings uk tool free',
 'offset mortgage vs savings uk estimator online',
 'offset mortgage vs savings uk formula calculator',
 'use offset mortgage vs savings uk calculator now',
 'try offset mortgage vs savings uk calculator free',
 'calculate my offset mortgage vs savings uk',
 'check my offset mortgage vs savings uk online',
 'find my offset mortgage vs savings uk free',
 'instant offset mortgage vs savings uk calculator',
 'quick offset mortgage vs savings uk calculator',
 'offset mortgage vs savings uk calculator app',
 'offset mortgage vs savings uk calculator mobile',
 'offset mortgage vs savings uk tool no login',
 'how to use offset mortgage vs savings uk calculator',
 'what is a good offset mortgage vs savings uk',
 'what is the formula for offset mortgage vs savings uk',
 'how is offset mortgage vs savings uk calculated',
 'when to use offset mortgage vs savings uk calculator',
 'which offset mortgage vs savings uk calculator is best',
 'how accurate is offset mortgage vs savings uk calculator',
 'offset mortgage vs savings uk calculator USA',
 'offset mortgage vs savings uk financial calculator free',
 'offset mortgage vs savings uk investment calculator',
 'offset mortgage vs savings uk calculator with chart',
 'offset mortgage vs savings uk returns calculator',
 'offset mortgage vs savings uk calculator monthly',
 'offset mortgage vs savings uk calculator yearly',
 'US offset mortgage vs savings uk calculator',
 'American offset mortgage vs savings uk calculator',
 'offset mortgage vs savings uk calculator UK',
 'offset mortgage vs savings uk calculator India',
 'offset mortgage vs savings uk before after tax',
 'free finance calculator',
 'personal finance offset mortgage vs savings uk',
 'offset mortgage vs savings uk calculator no ads',
 'free financial calculator USA 2026',
 'investment calculator no signup',
 'retirement planning calculator free',
 'compound interest calculator USA',
 'mortgage calculator USA',
 'IRS tax calculator 2026',
 'offset mortgage vs savings uk calculator USA 2026',
 'US retirement calculator free',
 'American investment tool',
 '401k calculator 2026',
 'Roth IRA calculator free',
 'FIRE number calculator USA',
 'mortgage payment calculator USA',
 'debt payoff calculator free',
 'offset mortgage vs savings uk calculator UK 2026',
 'UK financial calculator free',
 'PAYE tax calculator UK',
 'ISA calculator UK 2026',
 'UK pension calculator free',
 'tooltrio.com',
 'free calculator no signup',
 'calculator no data stored',
 'instant calculator results',
 'free calculator USA UK India'
 ],
})

const faqs = [
 { question: 'Is the UK Offset Mortgage vs Savings Calculator free to use?', answer: 'Yes, the UK Offset Mortgage vs Savings Calculator is completely free - no account registration, subscription, or payment of any kind required. All calculations are performed locally in your browser, meaning your financial data is never transmitted or stored anywhere. We believe professional-grade financial calculators should be accessible to every American regardless of income.' },
 { question: 'How accurate are the calculations?', answer: 'This UK Offset Mortgage vs Savings Calculator uses standard financial formulas recognized by certified financial planners (CFPs), CPAs, and investment advisors across the United States. Results assume consistent inputs and standard market conditions. Actual investment returns, taxes, and financial outcomes will vary based on market performance, tax law changes, and individual circumstances. Use results for planning purposes, not as guarantees.' },
 { question: 'Should I consult a financial advisor?', answer: 'For major financial decisions (retirement planning, large investments, tax strategy, estate planning), consulting a Certified Financial Planner (CFP) or CPA is strongly recommended. This UK Offset Mortgage vs Savings Calculator provides solid educational estimates and planning scenarios, but a licensed professional can account for your complete financial picture, tax situation, and long-term goals in ways a calculator cannot.' },
 { question: 'Does this account for inflation?', answer: 'Where applicable, this UK Offset Mortgage vs Savings Calculator uses nominal values (current dollars) by default. For long-term projections, always consider that inflation historically averages 2-3% annually in the United States. To get inflation-adjusted (real) returns, subtract your expected inflation rate from your nominal return rate. For example, if your investment earns 8% and inflation is 3%, your real return is approximately 5%.' },
 { question: 'Are the calculations based on US tax law?', answer: 'This UK Offset Mortgage vs Savings Calculator uses US financial conventions and, where applicable, current US tax brackets and contribution limits. Tax law changes annually - verify current IRS limits (401k, IRA, HSA, etc.) at IRS.gov. For non-US users, contribution limits and tax treatment will differ significantly. Always verify current figures with your tax professional.' },
 { question: 'Is my financial data stored or shared?', answer: 'No. All calculations run entirely in your browser. No financial data - income, savings, investment amounts, or personal details - is ever transmitted to any server, stored in any database, or shared with any third party. When you close the tab, everything disappears. Your financial privacy is completely protected.' },
 { question: 'What are the limitations of financial calculators?', answer: 'Financial calculators, including this UK Offset Mortgage vs Savings Calculator, assume consistent contribution rates, steady returns, and static tax rates - which never perfectly match reality. Markets fluctuate, tax laws change, and life circumstances evolve. Use projections as directional guides rather than precise predictions. The most valuable insight is understanding the relationship between variables (rate, time, amount) not the exact output number.' },
 { question: 'Can I use this calculator for both US and international currencies?', answer: 'This UK Offset Mortgage vs Savings Calculator supports multiple currencies - USD ($), GBP (£), EUR (€), and INR (₹) where applicable. For global users, note that contribution limits, tax treatment, and regulatory frameworks vary significantly by country. The mathematical calculations are currency-agnostic, but country-specific planning should involve a local financial professional.' },
]

const relatedCalculators = [
 { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'Loan EMI calculator' },
 { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', desc: 'Home loan EMI' },
 { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', icon: '🚗', desc: 'Car loan calculator' },
 { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal loan' },
 { name: 'Loan Prepayment Calculator', href: '/calculators/finance/loan-prepayment-calculator', icon: '💸', desc: 'Prepayment savings' },
 { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt payoff strategy' },
]

export default function Page() {
 return (
 <CalculatorClient
 faqs={faqs}
 blogSlug="offset-mortgage-vs-savings-uk-guide-2026"
 structuredData={[generateFAQStructuredData(faqs)]}
 relatedCalculators={relatedCalculators}
 />
 )
}
