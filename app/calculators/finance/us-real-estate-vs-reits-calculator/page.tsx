import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'US Real Estate vs REITs Calculator USA 2026 – Direct Property vs REIT ETF',
 description: 'Free US real estate vs REITs calculator USA 2026. Compare direct US rental property vs REIT ETF (VNQ, SCHH) on total return, income, management, and liquidity. Real examples for $100k-$500k real estate investments.',
 slug: 'us-real-estate-vs-reits-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'us real estate vs reits calculator 2026',
 
 'us real estate vs reits calculator',
 'free us real estate vs reits calculator',
 'us real estate vs reits calculator online',
 'best us real estate vs reits calculator 2026',
 'us real estate vs reits calculator no signup',
 'accurate us real estate vs reits calculator',
 'how to calculate us real estate vs reits',
 'how does us real estate vs reits calculator work',
 'what is us real estate vs reits calculator',
 'calculate us real estate vs reits free',
 'us real estate vs reits calculator 2026',
 'us real estate vs reits calculator 2026',
 'online us real estate vs reits tool free',
 'us real estate vs reits estimator online',
 'us real estate vs reits formula calculator',
 'use us real estate vs reits calculator now',
 'try us real estate vs reits calculator free',
 'calculate my us real estate vs reits',
 'check my us real estate vs reits online',
 'find my us real estate vs reits free',
 'instant us real estate vs reits calculator',
 'quick us real estate vs reits calculator',
 'us real estate vs reits calculator app',
 'us real estate vs reits calculator mobile',
 'us real estate vs reits tool no login',
 'how to use us real estate vs reits calculator',
 'what is a good us real estate vs reits',
 'what is the formula for us real estate vs reits',
 'how is us real estate vs reits calculated',
 'when to use us real estate vs reits calculator',
 'which us real estate vs reits calculator is best',
 'how accurate is us real estate vs reits calculator',
 'us real estate vs reits calculator USA',
 'us real estate vs reits financial calculator free',
 'us real estate vs reits investment calculator',
 'us real estate vs reits calculator with chart',
 'us real estate vs reits returns calculator',
 'us real estate vs reits calculator monthly',
 'us real estate vs reits calculator yearly',
 'US us real estate vs reits calculator',
 'American us real estate vs reits calculator',
 'us real estate vs reits calculator UK',
 'us real estate vs reits calculator India',
 'us real estate vs reits before after tax',
 'free finance calculator',
 'personal finance us real estate vs reits',
 'us real estate vs reits calculator no ads',
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
 { question: 'Is the US Real Estate vs REITs Calculator free to use?', answer: 'Yes, the US Real Estate vs REITs Calculator is completely free - no account registration, subscription, or payment of any kind required. All calculations are performed locally in your browser, meaning your financial data is never transmitted or stored anywhere. We believe professional-grade financial calculators should be accessible to every American regardless of income.' },
 { question: 'How accurate are the calculations?', answer: 'This US Real Estate vs REITs Calculator uses standard financial formulas recognized by certified financial planners (CFPs), CPAs, and investment advisors across the United States. Results assume consistent inputs and standard market conditions. Actual investment returns, taxes, and financial outcomes will vary based on market performance, tax law changes, and individual circumstances. Use results for planning purposes, not as guarantees.' },
 { question: 'Should I consult a financial advisor?', answer: 'For major financial decisions (retirement planning, large investments, tax strategy, estate planning), consulting a Certified Financial Planner (CFP) or CPA is strongly recommended. This US Real Estate vs REITs Calculator provides solid educational estimates and planning scenarios, but a licensed professional can account for your complete financial picture, tax situation, and long-term goals in ways a calculator cannot.' },
 { question: 'Does this account for inflation?', answer: 'Where applicable, this US Real Estate vs REITs Calculator uses nominal values (current dollars) by default. For long-term projections, always consider that inflation historically averages 2-3% annually in the United States. To get inflation-adjusted (real) returns, subtract your expected inflation rate from your nominal return rate. For example, if your investment earns 8% and inflation is 3%, your real return is approximately 5%.' },
 { question: 'Are the calculations based on US tax law?', answer: 'This US Real Estate vs REITs Calculator uses US financial conventions and, where applicable, current US tax brackets and contribution limits. Tax law changes annually - verify current IRS limits (401k, IRA, HSA, etc.) at IRS.gov. For non-US users, contribution limits and tax treatment will differ significantly. Always verify current figures with your tax professional.' },
 { question: 'Is my financial data stored or shared?', answer: 'No. All calculations run entirely in your browser. No financial data - income, savings, investment amounts, or personal details - is ever transmitted to any server, stored in any database, or shared with any third party. When you close the tab, everything disappears. Your financial privacy is completely protected.' },
 { question: 'What are the limitations of financial calculators?', answer: 'Financial calculators, including this US Real Estate vs REITs Calculator, assume consistent contribution rates, steady returns, and static tax rates - which never perfectly match reality. Markets fluctuate, tax laws change, and life circumstances evolve. Use projections as directional guides rather than precise predictions. The most valuable insight is understanding the relationship between variables (rate, time, amount) not the exact output number.' },
 { question: 'Can I use this calculator for both US and international currencies?', answer: 'This US Real Estate vs REITs Calculator supports multiple currencies - USD ($), GBP (£), EUR (€), and INR (₹) where applicable. For global users, note that contribution limits, tax treatment, and regulatory frameworks vary significantly by country. The mathematical calculations are currency-agnostic, but country-specific planning should involve a local financial professional.' },
]

const relatedCalculators = [
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Power of compounding' },
 { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Retirement planning' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Track net worth' },
 { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', icon: '🎯', desc: 'Goal-based savings' },
 { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', icon: '📐', desc: 'Return on investment' },
]

export default function Page() {
 return (
 <CalculatorClient
 faqs={faqs}
 blogSlug="us-real-estate-vs-reits-vnq-guide-2026"
 structuredData={[generateFAQStructuredData(faqs)]}
 relatedCalculators={relatedCalculators}
 />
 )
}
