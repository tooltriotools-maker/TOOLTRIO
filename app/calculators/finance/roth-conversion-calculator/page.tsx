import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import RothConversionCalculatorClient from './RothConversionCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Roth Conversion Calculator USA 2026 – Tax Cost and Long-Term Benefit Analysis',
 description: 'Free Roth IRA conversion calculator USA 2026. Calculate the tax cost of converting Traditional IRA to Roth, break-even age, and long-term after-tax wealth benefit. Real examples for $25k-$200k conversion amounts.',
 slug: 'roth-conversion-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'roth conversion calculator 2026',
 
 'Roth conversion calculator', 'Traditional to Roth IRA conversion calculator',
 'should I convert to Roth IRA calculator', 'Roth conversion tax calculator',
 'Roth IRA conversion calculator 2026', 'how much tax do I pay on Roth conversion',
 'Roth conversion break even calculator', 'Traditional IRA vs Roth IRA conversion',
 'backdoor Roth calculator', 'Roth conversion strategy calculator',
 'is Roth conversion worth it calculator',
 ],
})

const faqs = [
 { question: 'When should I convert Traditional IRA to Roth?', answer: 'Convert to Roth when your current tax rate is LOWER than your expected retirement tax rate. Best times: (1) Early career, low income years. (2) Years you had a job loss or took time off. (3) Before reaching age 73 when RMDs force higher income. (4) Years with large deductions. (5) Between retirement and Social Security (ages 60-70, often a low-income window). The math: if you\'re in the 22% bracket now and expect 24% in retirement, converting now saves 2% per dollar.' },
 { question: 'How much does a Roth conversion cost in taxes?', answer: 'Tax cost = Conversion Amount x Your Current Marginal Tax Rate. Example: converting $20,000 in the 22% bracket = $4,400 in federal tax. Important: the conversion amount is added to your ordinary income for that year. A $20,000 conversion could push you from 22% to 24% bracket on the top portion. Use our calculator to model the exact impact before converting.' },
 { question: 'What is a backdoor Roth IRA?', answer: 'A backdoor Roth allows high earners (above the Roth income limits: $150,000 single, $236,000 married in 2026) to contribute to a Roth IRA indirectly: (1) Make a non-deductible traditional IRA contribution ($7,000). (2) Immediately convert it to Roth. Since the contribution was after-tax, the conversion is tax-free. Caution: if you have other pre-tax IRA funds, the "pro-rata rule" applies and part of the conversion becomes taxable.' },
 { question: 'Can I undo a Roth conversion?', answer: 'No -- since the Tax Cuts and Jobs Act of 2017, Roth IRA recharacterizations (undoing a conversion) are no longer allowed. Before converting, be sure you can pay the tax bill from non-retirement funds (not from the IRA itself, which reduces the conversion benefit). Consider converting in smaller amounts over multiple years to manage the tax impact.' },
]

const relatedCalculators = [
 { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA growth' },
 { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: '2026 tax brackets' },
 { name: 'Roth vs Traditional IRA', href: '/calculators/finance/roth-ira-vs-traditional-ira-calculator', icon: '⚖️', desc: 'Which IRA is better' },
 { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏛️', desc: 'Retirement savings' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Roth Conversion Calculator -- Is It Worth It?', description: 'Calculate the tax cost of Roth conversion and whether it benefits you long-term.', url: 'https://tooltrio.com/calculators/finance/roth-conversion-calculator' }),
]

export default function RothConversionPage() {
 return <RothConversionCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="roth-ira-vs-401k-which-is-better-2026" />
}
