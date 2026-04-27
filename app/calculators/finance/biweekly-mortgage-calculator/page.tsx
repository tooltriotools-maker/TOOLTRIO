import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import BiweeklyMortgageClient from './BiweeklyMortgageClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Biweekly Mortgage Calculator USA 2026 – Pay Off Faster and Save on Interest',
 description: 'Free biweekly mortgage calculator USA 2026. See how switching to biweekly payments cuts years off your mortgage and saves thousands in interest. Real examples for $200k-$500k loans at 6-8% interest rates.',
 slug: 'biweekly-mortgage-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'biweekly mortgage calculator 2026',
 
 'biweekly mortgage calculator', 'bi-weekly mortgage payment calculator',
 'biweekly mortgage savings calculator', 'pay mortgage biweekly calculator',
 'how much do I save paying mortgage biweekly', 'biweekly vs monthly mortgage',
 'biweekly mortgage payoff calculator', 'extra mortgage payment calculator',
 'mortgage interest savings calculator', 'pay off mortgage early calculator',
 'biweekly mortgage 2026', 'accelerated mortgage payment calculator',
 ],
})

const faqs = [
 { question: 'How much does biweekly mortgage payment save?', answer: 'On a $350,000 mortgage at 7% for 30 years: monthly payments total $836,920 in interest. Biweekly payments total $704,850 in interest -- saving $132,070 and paying off the loan 4.5 years early. The savings come from making 26 half-payments per year, which equals 13 full payments -- one extra payment annually that reduces principal faster.' },
 { question: 'How does biweekly mortgage payment work?', answer: 'Instead of one full monthly payment (12/year), you make a half-payment every two weeks (26/year). Since there are 52 weeks in a year, 26 biweekly payments equal 13 monthly payments -- one extra per year. That extra payment goes entirely to principal, reducing your balance faster and cutting years off your loan.' },
 { question: 'Does my lender have to accept biweekly payments?', answer: 'Not automatically. Some lenders offer biweekly programs (sometimes with a fee). The simplest approach: divide your monthly payment by 12 and add that amount to each payment as "extra principal." This achieves the same result without a formal biweekly program and is free. Always specify "apply to principal" when making extra payments.' },
 { question: 'Is biweekly mortgage worth it?', answer: 'Yes, for most homeowners. On a $350,000 loan at 7%, the math works out to: saving ~$132,000 in interest and paying off 4-5 years early. There\'s no downside except reduced cash flow flexibility. Biweekly is especially powerful in the first decade of a mortgage when most of each payment is interest.' },
]

const relatedCalculators = [
 { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Full PITI payment' },
 { name: 'Mortgage Refinance', href: '/calculators/finance/mortgage-refinance-calculator', icon: '🔄', desc: 'Refinance savings' },
 { name: 'Loan Prepayment', href: '/calculators/finance/loan-prepayment-calculator', icon: '💸', desc: 'Prepayment savings' },
 { name: 'Payoff Date', href: '/calculators/finance/payoff-date-calculator', icon: '📅', desc: 'Debt-free date' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Biweekly Mortgage Calculator -- Save Years & Thousands', description: 'Calculate interest savings and years saved by switching to biweekly mortgage payments.', url: 'https://tooltrio.com/calculators/finance/biweekly-mortgage-calculator' }),
]

export default function BiweeklyMortgagePage() {
 return <BiweeklyMortgageClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="how-to-pay-off-mortgage-early-usa-2026" />
}
