import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'XIRR Calculator USA 2026 – True Annualized Return for Multiple Cash Flows',
 description: 'Free XIRR calculator USA 2026. Calculate the true annualized return (XIRR) for investment portfolios with multiple irregular deposits and withdrawals. Real examples for SIP investments, business cash flows, and portfolio analysis.',
 slug: 'xirr-calculator',
 category: 'finance',
 keywords: [
 'xirr calculator 2026',
 
 'xirr calculator',
 'free xirr calculator',
 'xirr calculator online',
 'best xirr calculator 2026',
 'xirr calculator no signup',
 'accurate xirr calculator',
 'how to calculate xirr',
 'how does xirr calculator work',
 'what is xirr calculator',
 'calculate xirr free',
 'xirr calculator 2026',
 'xirr calculator 2026',
 'online xirr tool free',
 'xirr estimator online',
 'xirr formula calculator',
 'use xirr calculator now',
 'try xirr calculator free',
 'calculate my xirr',
 'check my xirr online',
 'find my xirr free',
 'instant xirr calculator',
 'quick xirr calculator',
 'xirr calculator app',
 'xirr calculator mobile',
 'xirr tool no login',
 'how to use xirr calculator',
 'what is a good xirr',
 'what is the formula for xirr',
 'how is xirr calculated',
 'when to use xirr calculator',
 'which xirr calculator is best',
 'how accurate is xirr calculator',
 'xirr calculator USA',
 'xirr financial calculator free',
 'xirr investment calculator',
 'xirr calculator with chart',
 'xirr returns calculator',
 'xirr calculator monthly',
 'xirr calculator yearly',
 'US xirr calculator',
 'American xirr calculator',
 'xirr calculator UK',
 'xirr calculator India',
 'xirr before after tax',
 'free finance calculator',
 'personal finance xirr',
 'xirr calculator no ads',
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
 { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Monthly SIP returns' },
 { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'One-time investment returns' },
 { name: 'PPF Calculator', href: '/calculators/finance/ppf-calculator', icon: '🏛️', desc: 'PPF maturity calculator' },
 { name: 'FD Calculator', href: '/calculators/finance/fd-calculator', icon: '🏦', desc: 'Fixed deposit returns' },
 { name: 'NPS Calculator', href: '/calculators/finance/nps-calculator', icon: '🎯', desc: 'NPS pension corpus' },
 { name: 'ELSS vs PPF', href: '/calculators/finance/elss-vs-ppf-calculator', icon: '⚖️', desc: 'ELSS vs PPF comparison' },
]

const faqs = [
 { question: 'Is the XIRR Calculator free to use?', answer: 'Yes, the XIRR Calculator is completely free - no account registration, subscription, or payment of any kind required. All calculations are performed locally in your browser, meaning your financial data is never transmitted or stored anywhere. We believe professional-grade financial calculators should be accessible to every American regardless of income.' },
 { question: 'How accurate are the calculations?', answer: 'This XIRR Calculator uses standard financial formulas recognized by certified financial planners (CFPs), CPAs, and investment advisors across the United States. Results assume consistent inputs and standard market conditions. Actual investment returns, taxes, and financial outcomes will vary based on market performance, tax law changes, and individual circumstances. Use results for planning purposes, not as guarantees.' },
 { question: 'Should I consult a financial advisor?', answer: 'For major financial decisions (retirement planning, large investments, tax strategy, estate planning), consulting a Certified Financial Planner (CFP) or CPA is strongly recommended. This XIRR Calculator provides solid educational estimates and planning scenarios, but a licensed professional can account for your complete financial picture, tax situation, and long-term goals in ways a calculator cannot.' },
 { question: 'Does this account for inflation?', answer: 'Where applicable, this XIRR Calculator uses nominal values (current dollars) by default. For long-term projections, always consider that inflation historically averages 2-3% annually in the United States. To get inflation-adjusted (real) returns, subtract your expected inflation rate from your nominal return rate. For example, if your investment earns 8% and inflation is 3%, your real return is approximately 5%.' },
 { question: 'Are the calculations based on US tax law?', answer: 'This XIRR Calculator uses US financial conventions and, where applicable, current US tax brackets and contribution limits. Tax law changes annually - verify current IRS limits (401k, IRA, HSA, etc.) at IRS.gov. For non-US users, contribution limits and tax treatment will differ significantly. Always verify current figures with your tax professional.' },
 { question: 'Is my financial data stored or shared?', answer: 'No. All calculations run entirely in your browser. No financial data - income, savings, investment amounts, or personal details - is ever transmitted to any server, stored in any database, or shared with any third party. When you close the tab, everything disappears. Your financial privacy is completely protected.' },
 { question: 'What are the limitations of financial calculators?', answer: 'Financial calculators, including this XIRR Calculator, assume consistent contribution rates, steady returns, and static tax rates - which never perfectly match reality. Markets fluctuate, tax laws change, and life circumstances evolve. Use projections as directional guides rather than precise predictions. The most valuable insight is understanding the relationship between variables (rate, time, amount) not the exact output number.' },
 { question: 'Can I use this calculator for both US and international currencies?', answer: 'This XIRR Calculator supports multiple currencies - USD ($), GBP (£), EUR (€), and INR (₹) where applicable. For global users, note that contribution limits, tax treatment, and regulatory frameworks vary significantly by country. The mathematical calculations are currency-agnostic, but country-specific planning should involve a local financial professional.' },
]

export default function Page() {
 return (
 <CalculatorClient
 faqs={faqs}
 structuredData={[generateFAQStructuredData(faqs)]}
 relatedCalculators={relatedCalculators}
 blogSlug='sip-calculator-guide-how-to-grow-wealth-with-systematic-investment'
 />
 )
}
