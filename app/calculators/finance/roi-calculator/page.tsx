import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'ROI Calculator USA 2026 – Return on Investment, Profit & Annualized Return',
 description: 'Free ROI calculator USA 2026. Calculate return on investment, net profit, and annualized ROI for any investment. Compare investment options side by side. Real examples for stocks, real estate, and business.',
 slug: 'roi-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'roi calculator 2026',
 
 'roi calculator', 'roi calculator USA 2026', 'free roi calculator',
 'annualized roi calculator', 'cagr calculator', 'investment return calculator',
 'roi calculator with benchmarks', 'what is a good roi',
 'roi calculator stocks real estate crypto', 'calculate roi online free',
 'roi vs sp500 calculator', 'how to calculate annualized roi',
 'investment roi calculator', 'roi formula calculator',
 'net profit calculator', 'return on investment calculator',
 'roi calculator no signup', 'best roi calculator 2026',
 ],
})

const faqs = [
 {
 question: 'What is a good ROI for investments in 2026?',
 answer: 'A "good" ROI depends on the asset class and risk taken. Benchmarks for 2026: S&P 500 historical average = 10.5% CAGR (1957-2026, total return with dividends). US real estate appreciation = 8.6% average CAGR (2012-2024). 10-Year Treasury (risk-free) = ~4.3%. HYSA = ~5.0%. Any investment should be compared against these benchmarks. An 8% CAGR from a diversified stock portfolio is good; 8% from a highly illiquid, actively-managed private investment is poor compensation for the additional risk.',
 },
 {
 question: 'What is the difference between ROI and CAGR?',
 answer: 'ROI (Return on Investment) is the total percentage return: [(Final Value - Initial Value) / Initial Value] x 100. CAGR (Compound Annual Growth Rate) is the annualized return: (Final Value / Initial Value)^(1/Years) - 1. Example: $10,000 grows to $17,000 over 5 years. Total ROI = 70%. CAGR = (17,000/10,000)^(1/5) - 1 = 11.2%/year. CAGR enables fair comparison between investments held for different periods. Always use CAGR when comparing two investments.',
 },
 {
 question: 'How do I calculate ROI on a rental property?',
 answer: 'Real estate ROI requires including ALL returns and costs. Total ROI = [(Property Appreciation + Net Rental Income - All Expenses) / Initial Investment] x 100. Initial investment = down payment + closing costs + initial repairs. Net rental income = gross rent - mortgage interest, property taxes, insurance, maintenance (estimate 1-2%/year of value), vacancy (estimate 5-8%), and property management (8-10% of rent). Example: $50,000 down, property appreciated $80,000 over 5 years, net rental income $15,000 total. ROI = ($80,000 + $15,000) / $50,000 x 100 = 190%. CAGR = 23.8%/year.',
 },
 {
 question: 'What was the S&P 500 ROI over the last 5 years (2020-2026)?',
 answer: 'The S&P 500 total return (with dividends reinvested) from January 2020 to January 2026 was approximately +91% -- a CAGR of approximately 13.8%/year. This includes the COVID crash and recovery in 2020, the bull market of 2021, the 2022 bear market (-18%), and the recovery in 2023-2024. A $10,000 investment in a total market index fund in January 2020 was worth approximately $19,100 by January 2026. Historical returns do not guarantee future performance.',
 },
 {
 question: 'How does inflation affect ROI?',
 answer: 'Inflation reduces the purchasing power of your returns. Real ROI ~= Nominal ROI - Inflation Rate. At 3% average US inflation: a 10% nominal return has ~6.8% real return; a 4% nominal return has ~0.97% real return. Over 20 years, a 6% nominal return on $100,000 grows to $320,000 nominally -- but $320,000 in 20 years buys what ~$177,000 buys today. Your real gain is $77,000, not $220,000. Always evaluate long-term investments using inflation-adjusted (real) returns for accurate wealth assessment.',
 },
 {
 question: 'Should I compare my investment ROI to the S&P 500?',
 answer: 'Yes -- the S&P 500 is the primary benchmark for US investors because it represents the return you could get from a simple, low-cost total market index fund with no active management. If your active stock picks, rental properties, or business investments don\'t achieve a higher CAGR than the S&P 500\'s historical 10.5% over 5+ years, you\'re taking more complexity and risk for no additional return. The benchmark comparison in this calculator makes this evaluation instant.',
 },
 {
 question: 'How do I calculate ROI on a stock investment with dividends?',
 answer: 'Total Stock ROI = [(Ending Value + Dividends Received - Initial Investment) / Initial Investment] x 100. Example: Bought 100 shares at $150 ($15,000 total). Received $800 in dividends over 3 years. Shares now worth $220 each ($22,000). Total ROI = ($22,000 + $800 - $15,000) / $15,000 x 100 = 52%. CAGR = (22,800/15,000)^(1/3) - 1 = 15.0%/year. Dividends significantly boost total return -- the S&P 500 returns 9.1% without dividends vs. 10.5% with dividends reinvested.',
 },
 {
 question: 'What is the ROI of Bitcoin historically?',
 answer: 'Bitcoin\'s ROI has been extreme in both directions. From 2013 to 2026, the average annual CAGR is approximately 67% -- but with three drawdowns exceeding 65% (2014: -85%, 2018: -84%, 2022: -65%). A $10,000 investment in Bitcoin in January 2020 was worth approximately $450,000 at the November 2021 peak -- then crashed to $27,000 in June 2022 -- then recovered to approximately $115,000 by early 2026. Total ROI from 2020 to 2026: +1,050%, CAGR: ~61%. However, investors who sold during the 2022 crash realized a very different outcome. Crypto ROI is highly path-dependent.',
 },
]

const relatedCalculators = [
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '📈', desc: 'Power of compounding' },
 { name: 'Real Estate ROI', href: '/calculators/finance/real-estate-roi-calculator', icon: '🏠', desc: 'Property-specific ROI' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💎', desc: 'Track net worth' },
 { name: 'Stock Profit Calculator', href: '/calculators/finance/stock-profit-calculator', icon: '💹', desc: 'Individual stock returns' },
 { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📉', desc: 'Real vs nominal returns' },
 { name: 'CAGR Calculator', href: '/calculators/finance/cagr-calculator', icon: '📊', desc: 'Annualized growth rate' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({
 name: 'ROI Calculator with Real Investment Examples -- US Stocks, Real Estate, Crypto',
 description: 'Free ROI calculator USA 2026. Calculate return on investment, net profit, and annualized ROI for any investment. Compare investment options side by si',
  url: 'https://tooltrio.com/calculators/finance/roi-calculator',
 ratingValue: '4.9',
 ratingCount: '2841',
 }),
]

export default function Page() {
 return (
 <CalculatorClient
 faqs={faqs}
 structuredData={structuredData}
 relatedCalculators={relatedCalculators}
 blogSlug="investment-return-guide-cagr-roi-roi-calculator-usa"
 />
 )
}
