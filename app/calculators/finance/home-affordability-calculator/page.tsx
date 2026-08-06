import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Home Affordability Calculator USA 2026 | ToolTrio',
 description: 'Free home affordability calculator USA 2026. Calculate your maximum home purchase price using the 28/36 rule with your income, debts, and down payment.',
 slug: 'home-affordability-calculator',
 category: 'finance',
 keywords: [
    'home affordability calculator 2026',
    'home affordability calculator',
    'free home affordability calculator',
    'home affordability calculator online',
    'best home affordability calculator 2026',
    'home affordability calculator no signup',
    'accurate home affordability calculator',
    'how to calculate home affordability',
    'tooltrio.com',
  ],
})

const faqs = [
  { question: 'What percentage of my income should go toward a mortgage payment?', answer: 'Traditional guidelines: mortgage payment (PITI — principal, interest, taxes, insurance) should be under 28% of gross monthly income. All debt payments combined (DTI ratio) should be under 43% for most conventional loans. These are lender ceilings, not financial planning targets. A more conservative personal finance target: housing under 25% of net take-home pay. On $8,000/month take-home, that\'s $2,000/month maximum housing. In high cost-of-living cities this is nearly impossible for median earners — which is why housing affordability is a genuine structural problem rather than a budgeting discipline problem in markets like San Francisco, New York, and Seattle.' },
  { question: 'How much of a down payment do I actually need to buy a house?', answer: 'FHA loans require only 3.5% down for borrowers with 580+ credit scores (10% for 500-579). Conventional loans allow as little as 3% down through certain programs. VA loans (veterans/active military) and USDA loans (rural areas) allow 0% down. The practical consideration: down payments under 20% typically require Private Mortgage Insurance (PMI), adding approximately 0.5-1.5% of the loan amount annually to your payment. On a $400,000 loan, PMI could add $2,000-$6,000/year until you reach 20% equity. A larger down payment eliminates PMI, reduces your monthly payment, and reduces total interest paid — but tying up cash in home equity reduces liquidity.' },
  { question: 'What are the hidden costs of buying a home beyond the down payment?', answer: 'Closing costs: 2-5% of purchase price ($8,000-$20,000 on a $400,000 home). Moving expenses: $1,000-$5,000 depending on distance. Immediate repairs and improvements: the average buyer spends $10,000-$25,000 in the first year. Furnishings if upgrading space. Utility setup (deposits, connection fees). Home inspection (~$400-$600) before purchase. HOA initiation fees if applicable. Emergency reserve — budget at minimum 1% of home value annually for ongoing maintenance ($4,000 on a $400,000 home). Most first-time buyers budget only for the down payment and closing costs, then face financial stress from the actual cost of homeownership within the first 12 months.' },
  { question: 'How does the mortgage interest deduction affect the true cost of a home loan?', answer: 'The mortgage interest deduction allows itemizers to deduct home loan interest from federal taxable income — but after the 2017 Tax Cuts and Jobs Act doubled the standard deduction, only about 12% of taxpayers now itemize. For most middle-income homeowners, the standard deduction ($29,200 for married couples in 2026) exceeds their itemized deductions including mortgage interest. The deduction primarily benefits high earners with large mortgages in high-tax states who can itemize above the standard deduction threshold. Before assuming your mortgage is tax-advantaged, calculate your actual itemized deductions to determine if you\'d itemize at all.' },
  { question: 'What do lenders look at beyond credit score when approving a mortgage?', answer: 'Lenders evaluate five factors: (1) Credit score — affects rate and program eligibility. (2) Debt-to-income ratio — your total monthly debt payments divided by gross monthly income; most conventional loans require under 43%, some up to 50% with compensating factors. (3) Employment and income stability — 2 years of W-2 employment history is standard; self-employed borrowers need 2 years of tax returns showing adequate income. (4) Assets and reserves — lenders want 2-6 months of mortgage payments in accessible savings after down payment and closing costs. (5) Property appraisal — the home must appraise at or above the purchase price for the loan to fund.' }
]

const relatedCalculators = [
 { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', icon: '🏦', desc: 'Loan EMI calculator' },
 { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', icon: '🏠', desc: 'Home loan EMI' },
 { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', icon: '🚗', desc: 'Car loan calculator' },
 { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal loan' },
 { name: 'Loan Prepayment Calculator', href: '/calculators/finance/loan-prepayment-calculator', icon: '💸', desc: 'Prepayment savings' },
 { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', desc: 'Debt payoff strategy' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <>
      {structuredData.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} blogSlug="home-loan-mortgage-guide-how-to-get-best-rate" />
    </>
}
