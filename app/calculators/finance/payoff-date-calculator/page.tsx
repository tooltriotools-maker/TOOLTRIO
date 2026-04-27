import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import PayoffDateCalculatorClient from './PayoffDateCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Loan Payoff Date Calculator USA 2026 – When Will You Be Debt-Free?',
 description: 'Free loan payoff date calculator USA 2026. Find your exact debt-free date and total interest paid for any loan with fixed payments or extra contributions. Real examples for mortgages, car loans, and personal loans.',
 slug: 'payoff-date-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'payoff date calculator 2026',
 
 'loan payoff date calculator', 'debt payoff date calculator', 'when will I pay off my loan',
 'loan payoff calculator with extra payments', 'mortgage payoff date calculator',
 'how long to pay off loan calculator', 'debt free date calculator',
 'extra payment loan calculator', 'loan early payoff calculator',
 'when will I be debt free', 'loan payoff schedule', 'pay off loan faster calculator',
 'mortgage early payoff calculator', 'student loan payoff date',
 ],
})

const faqs = [
 { question: 'How much do I save by paying $100 extra on my mortgage each month?', answer: 'On a $300,000 mortgage at 7% for 30 years: making the standard payment of $1,996/month results in $418,527 in total interest. Adding $100/month ($2,096 total) saves $24,807 in interest and pays off the loan 2.5 years earlier. Adding $200/month saves $45,000 and pays off 4.5 years early. The earlier you start extra payments, the more you save.' },
 { question: 'How is a loan payoff date calculated?', answer: 'The payoff date is calculated by applying your monthly payment to the loan balance each month: interest = balance x monthly rate, principal paid = payment - interest, new balance = old balance - principal paid. This repeats until the balance reaches zero. Adding extra payments reduces the balance faster, which means less interest accumulates, accelerating the payoff.' },
 { question: 'What happens if I pay extra on my principal?', answer: 'Extra principal payments: (1) Reduce your outstanding balance immediately, (2) Reduce the interest charged in all future months (since interest is calculated on the remaining balance), (3) Shorten your loan term, and (4) Cost nothing extra -- no penalty in most loans. Always specify "apply to principal" when making extra payments, not "apply to next month\'s payment." Call your servicer to confirm.' },
 { question: 'Should I pay off my loan early or invest the extra money?', answer: 'Compare your loan interest rate to expected investment returns. If your mortgage rate is 7% and you expect the stock market to return 10%, investing likely wins mathematically. But paying off debt is a guaranteed return equal to your interest rate -- risk-free. Most financial advisors suggest: always pay off high-interest debt (credit cards, 15%+) first, then evaluate whether to pay off lower-rate debt vs invest based on your risk tolerance.' },
]

const relatedCalculators = [
 { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Avalanche vs snowball' },
 { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Mortgage payment' },
 { name: 'Biweekly Mortgage', href: '/calculators/finance/biweekly-mortgage-calculator', icon: '📅', desc: 'Pay off faster' },
 { name: 'Loan Prepayment', href: '/calculators/finance/loan-prepayment-calculator', icon: '💸', desc: 'Prepayment savings' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Loan Payoff Date Calculator -- With Extra Payment Analysis', description: 'Find your exact debt-free date and see how extra payments accelerate payoff.', url: 'https://tooltrio.com/calculators/finance/payoff-date-calculator' }),
]

export default function PayoffDatePage() {
 return <PayoffDateCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="debt-payoff-guide-usa-2026" />
}
