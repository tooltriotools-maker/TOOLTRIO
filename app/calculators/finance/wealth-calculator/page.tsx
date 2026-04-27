import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import WealthCalculatorClient from './WealthCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Wealth Calculator USA 2026 – Total Net Worth from Assets and Liabilities',
 description: 'Free wealth calculator USA 2026. Calculate total net worth by tracking all assets and liabilities, compare to US wealth percentiles, and see your wealth trajectory. Real examples for every wealth level.',
 slug: 'wealth-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'wealth calculator 2026',
 
 'wealth calculator', 'net worth wealth calculator', 'how to build wealth calculator',
 'wealth growth calculator', 'how wealthy am I calculator', 'wealth projection calculator',
 'personal wealth calculator', 'wealth by age calculator', 'am I wealthy calculator',
 'wealth accumulation calculator', 'total wealth calculator', 'net worth calculator USA',
 'how much wealth do I need to retire', 'wealth comparison calculator',
 ],
})

const faqs = [
 { question: 'What is considered wealthy in America?', answer: 'Net worth thresholds in the US (Federal Reserve 2024): Top 10%: $1.9M+. Top 5%: $3.8M+. Top 1%: $11M+. Median net worth: $193,000 (all ages). By age 40: median is $236,000, mean is $736,000. These figures are skewed by the ultra-wealthy. Most financial planners define "wealthy" as having enough invested assets (typically 25x annual expenses) to never need to work again.' },
 { question: 'How do you calculate net worth?', answer: 'Net Worth = Total Assets - Total Liabilities. Assets include: home value, investment accounts, retirement accounts (401k, IRA), savings, vehicles, and other property. Liabilities include: mortgage balance (not monthly payment), auto loans, student loans, credit card balances, and other debts. Important: use the current market value of your home, not what you paid for it. Update calculations every 6-12 months.' },
 { question: 'What is a good net worth at 40?', answer: 'According to the Federal Reserve 2024 Survey of Consumer Finances: Median net worth at 40: ~$236,000. Mean net worth at 40: ~$736,000 (skewed by very wealthy). Fidelity guideline: 3x your annual salary by 40. On a $80,000 salary: $240,000 target. If you\'re behind: focus on maxing retirement contributions, paying down high-interest debt, and increasing your savings rate. Time is still on your side at 40.' },
 { question: 'How long does it take to build $1 million in net worth?', answer: 'Starting from $0, investing $2,000/month at 7% annual return: ~20 years to reach $1M. At $3,000/month: ~16 years. At $5,000/month: ~12 years. At $10,000/month: ~8 years. Starting with a base (say, $100,000), the timeline shortens significantly. The key variable is savings rate -- saving 30% of a $100,000 income ($2,500/month) reaches $1M in about 17 years at 7%. Our wealth projection models your specific situation.' },
]

const relatedCalculators = [
 { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '⚖️', desc: 'Standard net worth' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', icon: '🌅', desc: 'Retirement projection' },
 { name: 'Savings Rate', href: '/calculators/finance/savings-rate-calculator', icon: '💰', desc: 'Years to FI' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Wealth Calculator -- Net Worth, Benchmarks & Growth Projection', description: 'Calculate net worth, compare to US benchmarks, and project wealth growth.', url: 'https://tooltrio.com/calculators/finance/wealth-calculator' }),
]

export default function WealthCalculatorPage() {
 return <WealthCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="wealth-building-guide-usa-2026-net-worth-by-age" />
}
