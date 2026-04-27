import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Real Estate ROI Calculator USA 2026 – Cap Rate, Cash-on-Cash and Net Return',
 description: 'Free real estate ROI calculator USA 2026. Calculate cap rate, cash-on-cash return, net operating income, and total ROI for any rental property. Real examples for $150k-$800k investment properties.',
 slug: 'real-estate-roi-calculator',
 category: 'finance',
 keywords: [
 'real estate roi calculator 2026',
 
 'real estate roi calculator',
 'free real estate roi calculator',
 'real estate roi calculator online',
 'best real estate roi calculator 2026',
 'real estate roi calculator no signup',
 'accurate real estate roi calculator',
 'how to calculate real estate roi',
 'how does real estate roi calculator work',
 'what is real estate roi calculator',
 'calculate real estate roi free',
 'real estate roi calculator 2026',
 'real estate roi calculator 2026',
 'online real estate roi tool free',
 'real estate roi estimator online',
 'real estate roi formula calculator',
 'use real estate roi calculator now',
 'try real estate roi calculator free',
 'calculate my real estate roi',
 'check my real estate roi online',
 'find my real estate roi free',
 'instant real estate roi calculator',
 'quick real estate roi calculator',
 'real estate roi calculator app',
 'real estate roi calculator mobile',
 'real estate roi tool no login',
 'how to use real estate roi calculator',
 'what is a good real estate roi',
 'what is the formula for real estate roi',
 'how is real estate roi calculated',
 'when to use real estate roi calculator',
 'which real estate roi calculator is best',
 'how accurate is real estate roi calculator',
 'real estate roi calculator USA',
 'real estate roi financial calculator free',
 'real estate roi investment calculator',
 'real estate roi calculator with chart',
 'real estate roi returns calculator',
 'real estate roi calculator monthly',
 'real estate roi calculator yearly',
 'US real estate roi calculator',
 'American real estate roi calculator',
 'real estate roi calculator UK',
 'real estate roi calculator India',
 'real estate roi before after tax',
 'free finance calculator',
 'personal finance real estate roi',
 'real estate roi calculator no ads',
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

const faqs = [
 { question: 'Is the Real Estate ROI Calculator free to use?', answer: 'Yes, the Real Estate ROI Calculator is completely free - no account registration, subscription, or payment of any kind required. All calculations are performed locally in your browser, meaning your financial data is never transmitted or stored anywhere. We believe professional-grade financial calculators should be accessible to every American regardless of income.' },
 { question: 'How accurate are the calculations?', answer: 'This Real Estate ROI Calculator uses standard financial formulas recognized by certified financial planners (CFPs), CPAs, and investment advisors across the United States. Results assume consistent inputs and standard market conditions. Actual investment returns, taxes, and financial outcomes will vary based on market performance, tax law changes, and individual circumstances. Use results for planning purposes, not as guarantees.' },
 { question: 'Should I consult a financial advisor?', answer: 'For major financial decisions (retirement planning, large investments, tax strategy, estate planning), consulting a Certified Financial Planner (CFP) or CPA is strongly recommended. This Real Estate ROI Calculator provides solid educational estimates and planning scenarios, but a licensed professional can account for your complete financial picture, tax situation, and long-term goals in ways a calculator cannot.' },
 { question: 'Does this account for inflation?', answer: 'Where applicable, this Real Estate ROI Calculator uses nominal values (current dollars) by default. For long-term projections, always consider that inflation historically averages 2-3% annually in the United States. To get inflation-adjusted (real) returns, subtract your expected inflation rate from your nominal return rate. For example, if your investment earns 8% and inflation is 3%, your real return is approximately 5%.' },
 { question: 'Are the calculations based on US tax law?', answer: 'This Real Estate ROI Calculator uses US financial conventions and, where applicable, current US tax brackets and contribution limits. Tax law changes annually - verify current IRS limits (401k, IRA, HSA, etc.) at IRS.gov. For non-US users, contribution limits and tax treatment will differ significantly. Always verify current figures with your tax professional.' },
 { question: 'Is my financial data stored or shared?', answer: 'No. All calculations run entirely in your browser. No financial data - income, savings, investment amounts, or personal details - is ever transmitted to any server, stored in any database, or shared with any third party. When you close the tab, everything disappears. Your financial privacy is completely protected.' },
 { question: 'What are the limitations of financial calculators?', answer: 'Financial calculators, including this Real Estate ROI Calculator, assume consistent contribution rates, steady returns, and static tax rates - which never perfectly match reality. Markets fluctuate, tax laws change, and life circumstances evolve. Use projections as directional guides rather than precise predictions. The most valuable insight is understanding the relationship between variables (rate, time, amount) not the exact output number.' },
 { question: 'Can I use this calculator for both US and international currencies?', answer: 'This Real Estate ROI Calculator supports multiple currencies - USD ($), GBP (£), EUR (€), and INR (₹) where applicable. For global users, note that contribution limits, tax treatment, and regulatory frameworks vary significantly by country. The mathematical calculations are currency-agnostic, but country-specific planning should involve a local financial professional.' },
]

const relatedCalculators = [
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Power of compounding' },
 { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Retirement planning' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Track net worth' },
 { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Goal-based savings' },
 { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📐', desc: 'Return on investment' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug='buy-to-let-rental-yield-guide-uk-europe-2026' />
}
