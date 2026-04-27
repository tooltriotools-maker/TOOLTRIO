import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateCalculatorRatingSchema } from '@/lib/seo/metadata'
import LoanComparisonCalculatorClient from './LoanComparisonCalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Loan Comparison Calculator USA 2026 – Compare Up to 4 Loan Offers Side by Side',
 description: 'Free loan comparison calculator USA 2026. Compare up to 4 loan offers simultaneously on monthly payment, total interest, and APR. Real examples for $50k–$500k loan amounts.',
 slug: 'loan-comparison-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'loan comparison calculator 2026',
 
 'loan comparison calculator', 'compare loan offers calculator', 'loan comparison tool',
 'best loan calculator', 'compare mortgage rates calculator', 'loan offer comparison',
 'APR comparison calculator', 'which loan is better calculator',
 'compare personal loan rates', 'mortgage comparison calculator 2026',
 'loan cost comparison', 'total interest comparison calculator',
 ],
})

const faqs = [
 { question: 'How do I compare loan offers?', answer: 'Always compare APR (Annual Percentage Rate), not just the interest rate. APR includes origination fees and better reflects the true cost. Also compare total interest paid over the life of the loan -- a lower monthly payment over a longer term may cost more overall. Our loan comparison calculator shows monthly payment, total interest, effective APR (including fees), and total cost for up to 3 offers side-by-side.' },
 { question: 'What is the difference between interest rate and APR?', answer: 'Interest rate is the base cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus lender fees (origination fee, broker fee, closing costs) expressed as a yearly rate. Federal law (Truth in Lending Act) requires lenders to disclose APR. Always compare APRs across lenders -- a loan with a lower interest rate but high fees may have a higher APR than one with a higher rate and no fees.' },
 { question: 'Is a lower monthly payment always better?', answer: 'No. A lower monthly payment usually means a longer loan term, which results in more total interest paid. Example: $25,000 loan at 7%: 48-month term = $598/month, total interest = $3,702. 72-month term = $428/month, total interest = $5,826. The 72-month saves $170/month but costs $2,124 more overall. Our comparison calculator shows the full picture so you can make the right choice for your situation.' },
]

const relatedCalculators = [
 { name: 'Personal Loan', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal loan payment' },
 { name: 'Auto Loan', href: '/calculators/finance/auto-loan-calculator', icon: '🚗', desc: 'Car loan with tax & fees' },
 { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', icon: '🏡', desc: 'Home loan PITI' },
 { name: 'Interest Rate Calculator', href: '/calculators/finance/interest-rate-calculator', icon: '📈', desc: 'Find your APR' },
]

const structuredData = [
 generateFAQStructuredData(faqs),
 generateCalculatorRatingSchema({ name: 'Free Loan Comparison Calculator -- Compare 3 Offers', description: 'Compare up to 3 loan offers side-by-side by monthly payment, total interest, and APR.', url: 'https://tooltrio.com/calculators/finance/loan-comparison-calculator' }),
]

export default function LoanComparisonPage() {
 return <LoanComparisonCalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators}
 blogSlug="car-loan-calculator-usa-2026-rates-by-state" />
}
