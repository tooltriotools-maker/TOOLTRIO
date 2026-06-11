import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'PPF Calculator India 2026 | ToolTrio',
 description: 'Free PPF calculator India 2026. Calculate PPF maturity value, year-by-year growth, and tax-free returns at 7.1% current rate. Includes partial withdrawal.',
 slug: 'ppf-calculator',
 category: 'finance',
 keywords: [
    'ppf calculator 2026',
    'ppf calculator',
    'free ppf calculator',
    'ppf calculator online',
    'best ppf calculator 2026',
    'ppf calculator no signup',
    'accurate ppf calculator',
    'how to calculate ppf',
    'tooltrio.com',
  ],
})

const faqs = [
  { question: 'What is the current PPF interest rate and is it guaranteed?', answer: 'The Public Provident Fund rate is declared quarterly by the Government of India\'s Ministry of Finance. The current rate (2026) is 7.1% per annum, compounded annually and credited on March 31 each year. The rate is not fixed in perpetuity — it fluctuates with the government\'s fiscal policy and market interest rates. Historical range: PPF has paid between 7.1% and 12% over the past three decades, with higher rates in the 1990s and gradual decline since. The key distinction: the rate is fixed for each quarter you\'re in, not for the life of the account. Compare this to bank FDs, where the rate is locked for the deposit tenure.' },
  { question: 'How does the PPF maturity extension work?', answer: 'After the initial 15-year maturity, PPF accounts can be extended in 5-year blocks indefinitely. You must notify your bank or post office branch within 1 year of maturity if you want to extend with contributions. If you don\'t notify, the account continues earning PPF rate on the existing balance for 5 years with no new contributions (called silent extension). In extended periods with contributions: same Rs 500 minimum, Rs 1.5 lakh maximum annually, same tax benefits. The same Section 80C deduction and tax-free interest continue. Many disciplined investors extend PPF well past 15 years, treating it as a long-term tax-free compounding vehicle alongside equity investments.' },
  { question: 'What is the penalty for partial withdrawal from PPF?', answer: 'PPF allows partial withdrawal from the 7th financial year onward (so after 6 complete years). You can withdraw up to 50% of the balance at the end of the 4th year preceding the withdrawal year, or the balance at the end of the previous year, whichever is lower. There is no penalty in the traditional sense — but withdrawals reduce the compounding base. Critically: there is no option to re-invest withdrawn amounts above the annual Rs 1.5 lakh limit. Partial withdrawal is an irrevocable reduction of your PPF corpus. PPF loans (available from 3rd to 6th year) are better than partial withdrawals for short-term needs — they don\'t reduce the principal and must be repaid within 36 months.' },
  { question: 'How should I invest Rs 1.5 lakh per year in PPF versus ELSS versus NPS for Section 80C?', answer: 'Optimal Section 80C allocation for a salaried professional in 30% tax bracket: Maximize PPF (Rs 1.5 lakh) for guaranteed tax-free returns — this is your fixed income allocation with government backing and EEE tax status. Additionally invest Rs 50,000 in NPS Tier I to capture the unique Section 80CCD(1B) deduction beyond the 80C limit — saving Rs 15,000 additional tax. For equity growth beyond these amounts: ELSS funds offer equity returns with 80C benefit and only 3-year lock-in (shortest among 80C instruments). The strategy: PPF as fixed income foundation, NPS for additional tax deduction, ELSS or direct equity mutual funds for growth.' },
  { question: 'Is PPF better than National Savings Certificate for long-term savings?', answer: 'PPF wins in the EEE (Exempt-Exempt-Exempt) tax comparison. NSC interest, while technically reinvested and somewhat deductible under 80C, ultimately faces taxation at maturity to the extent it exceeds your annual 80C capacity. PPF interest is completely tax-free with no ceiling. PPF also offers greater liquidity through loans and partial withdrawals, which NSC doesn\'t. NSC\'s advantages: slightly higher rate historically (varies; NSC rate has been 7.7% in 2026), guaranteed rate for the full 5-year tenure (PPF rate can change quarterly), and no annual investment limit beyond the individual NSC investment. For most long-term savers with adequate 80C capacity, PPF is superior to NSC.' }
]

const relatedCalculators = [
 { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Monthly SIP returns' },
 { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'One-time investment returns' },
 { name: 'FD Calculator', href: '/calculators/finance/fd-calculator', icon: '🏦', desc: 'Fixed deposit returns' },
 { name: 'NPS Calculator', href: '/calculators/finance/nps-calculator', icon: '🎯', desc: 'NPS pension corpus' },
 { name: 'Income Tax India', href: '/calculators/finance/income-tax-calculator', icon: '📋', desc: 'New vs old tax regime' },
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Power of compounding' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return (
 <>
      {structuredData.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CalculatorClient
 faqs={faqs}
 structuredData={structuredData}
 relatedCalculators={relatedCalculators}
 blogSlug="sip-calculator-guide-how-to-grow-wealth-with-systematic-investment"
 />
    </>)
}
