import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'NPS Calculator India 2026 – National Pension System Corpus and Monthly Pension',
 description: 'Free NPS calculator India 2026. Calculate your NPS retirement corpus, monthly pension from annuity, and lump sum withdrawal at 60. Includes Tier 1 and Tier 2 account projections. Real examples for INR 5k-50k monthly contributions.',
 slug: 'nps-calculator',
 category: 'finance',
 keywords: [
 'nps calculator 2026',
 
 'nps calculator',
 'free nps calculator',
 'nps calculator online',
 'best nps calculator 2026',
 'nps calculator no signup',
 'accurate nps calculator',
 'how to calculate nps',
 'how does nps calculator work',
 'what is nps calculator',
 'calculate nps free',
 'nps calculator 2026',
 'nps calculator 2026',
 'online nps tool free',
 'nps estimator online',
 'nps formula calculator',
 'use nps calculator now',
 'try nps calculator free',
 'calculate my nps',
 'check my nps online',
 'find my nps free',
 'instant nps calculator',
 'quick nps calculator',
 'nps calculator app',
 'nps calculator mobile',
 'nps tool no login',
 'how to use nps calculator',
 'what is a good nps',
 'what is the formula for nps',
 'how is nps calculated',
 'when to use nps calculator',
 'which nps calculator is best',
 'how accurate is nps calculator',
 'nps calculator USA',
 'nps financial calculator free',
 'nps investment calculator',
 'nps calculator with chart',
 'nps returns calculator',
 'nps calculator monthly',
 'nps calculator yearly',
 'US nps calculator',
 'American nps calculator',
 'nps calculator UK',
 'nps calculator India',
 'nps before after tax',
 'free finance calculator',
 'personal finance nps',
 'nps calculator no ads',
 'free financial calculator USA 2026',
 'investment calculator no signup',
 'retirement planning calculator free',
 'compound interest calculator USA',
 'mortgage calculator USA',
 'IRS tax calculator 2026',
 'nps calculator India 2026',
 'SIP calculator India free',
 'EMI calculator India',
 'PPF calculator 2026',
 'mutual fund calculator India',
 'income tax calculator India 2026',
 'tooltrio.com',
 'free calculator no signup',
 'calculator no data stored',
 'instant calculator results',
 'free calculator USA UK India'
 ],
})

const faqs = [
  { question: 'What is the mandatory annuity requirement in NPS and is it a problem?', answer: 'At NPS Tier I maturity (age 60), 40% of the corpus must be used to purchase an annuity from an NPS-empaneled life insurer. Only 60% is available as a tax-free lump sum. The annuity generates a monthly pension. Current annuity rates from NPS insurers range from approximately 5.5-7% per annum on the annuity corpus, depending on the annuity type (life annuity, joint life with return of purchase price, etc.). This is lower than NPS equity returns but provides guaranteed lifetime income. The problem: for investors who would rather manage their own withdrawals, the mandatory 40% annuitization is constraining. On a Rs 1 crore NPS corpus, Rs 40 lakh buys approximately Rs 18,000-24,000/month in pension — meaningful but not transformative income.' },
  { question: 'How does NPS compare to EPF for retirement savings?', answer: 'EPF: government-guaranteed 8.15% rate (2024-2025), fully tax-free (EEE), mandatory for salaried employees in formal sector, employer contributes an equal 12% of basic salary. NPS: market-linked returns (historically 10-12% for equity allocation), partially taxable at maturity (annuity portion), voluntary beyond mandatory corporate contribution, additional Rs 50,000 deduction under 80CCD(1B). EPF is the more reliable base with guaranteed returns and full tax exemption. NPS adds the possibility of higher equity-linked returns and the unique additional tax deduction. The optimal strategy: maximize EPF (mandatory and inherently optimized), then contribute Rs 50,000/year to NPS Tier I specifically to capture the 80CCD(1B) benefit.' },
  { question: 'What is the best asset allocation in NPS for someone aged 35?', answer: 'At 35, with 25 years until retirement: the Active Choice (you select allocation) allows up to 75% in the E (equity) fund, with the remainder in C (corporate bonds) and G (government securities). For a 35-year-old with moderate to high risk tolerance: 75% E, 15% C, 10% G is an aggressive allocation appropriate for the long horizon. The E fund tracks the Nifty 50 index in most fund managers — broad market exposure with low cost. The Auto Choice (lifecycle fund) automatically reduces equity from 75% to 25% as you age — conservative for someone 25 years from retirement but requires no active management. For DIY investors comfortable monitoring allocation: Active Choice with maximum equity provides better expected returns.' },
  { question: 'Is NPS Tier II worth using as a savings vehicle?', answer: 'NPS Tier II has no lock-in, no tax benefits on contribution (for non-government employees), and allows withdrawals at any time. The advantages: access to NPS fund managers (among the lowest expense ratio options in India, as low as 0.01%), ability to invest in same E/C/G allocation as Tier I, and simple administration through the same NPS account. The disadvantages: no LTCG or indexation benefits — gains are taxed as short-term or long-term capital gains at your slab rate. For investors seeking the lowest-cost passive investment in India, NPS Tier II E fund is among the cheapest ways to access equity markets. For most investors, direct mutual funds through platforms like Coin offer better tax efficiency (LTCG at 10%) and more flexibility.' },
  { question: 'Can I exit NPS before age 60?', answer: 'Premature exit from NPS Tier I is allowed after 10 years of contributions, subject to significant restrictions: only 20% of the corpus can be taken as a lump sum; the remaining 80% must be annuitized (versus only 40% at normal retirement). This effectively makes premature exit very unfavorable except for compelling financial necessity. There are partial withdrawal exceptions for specific purposes (serious illness, children\'s education or marriage, home purchase) up to 25% of the employee\'s own contributions after 3 years. For financial planning purposes, treat NPS Tier I contributions as completely illiquid until age 60 — it is a true retirement savings vehicle, not accessible capital.' }
]

const relatedCalculators = [
 { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', icon: '📈', desc: 'Monthly SIP returns' },
 { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', icon: '💼', desc: 'One-time investment returns' },
 { name: 'PPF Calculator', href: '/calculators/finance/ppf-calculator', icon: '🏛️', desc: 'PPF maturity calculator' },
 { name: 'FD Calculator', href: '/calculators/finance/fd-calculator', icon: '🏦', desc: 'Fixed deposit returns' },
 { name: 'ELSS vs PPF', href: '/calculators/finance/elss-vs-ppf-calculator', icon: '⚖️', desc: 'ELSS vs PPF comparison' },
 { name: 'Income Tax India', href: '/calculators/finance/income-tax-calculator', icon: '📋', desc: 'New vs old tax regime' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return (
 <CalculatorClient
 faqs={faqs}
 structuredData={structuredData}
 relatedCalculators={relatedCalculators}
 blogSlug="swp-vs-annuity-best-retirement-income-strategy"
 />
 )
}
