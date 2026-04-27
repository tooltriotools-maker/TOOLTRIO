import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import TaxBracketCalculatorClient from './TaxBracketCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Tax Bracket Calculator USA 2026 – Federal Income Tax Brackets and Effective Rate',
 description: 'Free tax bracket calculator USA 2026. See exactly which 2026 federal tax brackets apply to your income, your marginal rate vs effective rate, and total tax owed. Real examples for $30k-$300k income levels.',
 slug: 'tax-bracket-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'tax bracket calculator 2026',
 
 'tax bracket calculator 2026', 'federal income tax calculator 2026', 'IRS tax bracket 2026',
 'what tax bracket am I in 2026', 'marginal tax rate calculator', 'effective tax rate calculator',
 'federal tax calculator 2026', 'income tax bracket calculator USA',
 'how much federal tax do I owe', 'tax bracket 2026 single', 'tax bracket 2026 married',
 'taxable income calculator', 'take home pay after tax calculator', 'AGI calculator',
 'standard deduction 2026', '2026 tax brackets IRS',
 ],
})

const faqs = [
 { question: 'What are the 2026 federal tax brackets?', answer: 'For 2026 (IRS Rev. Proc. 2026-28): Single filers: 10% on $0-$11,925 | 12% on $11,925-$48,475 | 22% on $48,475-$103,350 | 24% on $103,350-$197,300 | 32% on $197,300-$250,525 | 35% on $250,525-$626,350 | 37% above $626,350. Married filing jointly: brackets are roughly double the single thresholds. Standard deduction 2026: $15,000 single, $30,000 married.' },
 { question: 'What is the difference between marginal and effective tax rate?', answer: 'Marginal tax rate = the rate on your last dollar of income (your "top bracket"). Effective tax rate = total federal tax / gross income. Example: $85,000 income, single, no deductions beyond standard ($15,000): Taxable income = $70,000. Tax = $1,193 (10%) + $4,386 (12%) + $4,730 (22%) = $10,309. Marginal rate = 22%. Effective rate = $10,309 / $85,000 = 12.1%. You are NOT paying 22% on all your income -- only on income in the 22% bracket.' },
 { question: 'How do I lower my taxable income in 2026?', answer: 'Key above-the-line deductions (reduce AGI regardless of itemizing): 401k traditional contributions (up to $23,500), IRA contributions (up to $7,000 if eligible), HSA contributions (up to $4,300 individual), student loan interest (up to $2,500). Below-the-line: standard deduction ($15,000 single) or itemized deductions (mortgage interest + state/local taxes up to $10,000 + charitable donations). Every $1,000 in deductions saves $220-$370 in federal tax depending on your bracket.' },
 { question: 'What is the standard deduction for 2026?', answer: 'The 2026 standard deduction is: $15,000 for single filers and married filing separately. $30,000 for married filing jointly. $22,500 for head of household. This is a $400 increase from 2026 due to inflation adjustment. If your itemized deductions (mortgage interest, state taxes, charitable donations) exceed these amounts, itemize instead. About 90% of Americans use the standard deduction.' },
 { question: 'What is FICA and how is it calculated?', answer: 'FICA = Federal Insurance Contributions Act. It funds Social Security and Medicare. In 2026: Social Security tax = 6.2% on wages up to $176,100 (the "wage base"). Medicare tax = 1.45% on all wages (no limit). Additional Medicare = 0.9% on wages over $200,000 (single) or $250,000 (married). Self-employed pay both employee and employer portions = 12.4% SS + 2.9% Medicare = 15.3% (but can deduct half).' },
]

const relatedCalculators = [
 { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Exact withholding by paycheck' },
 { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '🧾', desc: 'Full income tax' },
 { name: 'Roth Conversion Calculator', href: '/calculators/finance/roth-conversion-calculator', icon: '🔄', desc: 'Roth conversion tax impact' },
 { name: 'Annual Income', href: '/calculators/finance/annual-income-calculator', icon: '💰', desc: 'Hourly to annual' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free 2026 Tax Bracket Calculator -- Marginal vs Effective Rate', description: 'Calculate 2026 federal taxes by bracket with marginal rate, effective rate, and take-home pay.', url: 'https://tooltrio.com/calculators/finance/tax-bracket-calculator' }),
]

export default function TaxBracketPage() {
 return <TaxBracketCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="tax-bracket-guide-usa-2026-marginal-vs-effective" />
}
