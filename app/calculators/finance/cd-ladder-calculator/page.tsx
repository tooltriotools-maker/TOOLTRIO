import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'CD Ladder Calculator USA 2026 – Maximize FDIC-Insured Returns with CD Laddering',
 description: 'Free CD ladder calculator USA 2026. Build a certificate of deposit laddering strategy to maximize FDIC-insured yield while maintaining annual liquidity. Real examples for $10k-$100k investments at 2026 CD rates.',
 slug: 'cd-ladder-calculator',
 category: 'finance',
 keywords: [
 'cd ladder calculator 2026',
 
 'cd ladder calculator',
 'free cd ladder calculator',
 'cd ladder calculator online',
 'best cd ladder calculator 2026',
 'cd ladder calculator no signup',
 'accurate cd ladder calculator',
 'how to calculate cd ladder',
 'how does cd ladder calculator work',
 'what is cd ladder calculator',
 'calculate cd ladder free',
 'cd ladder calculator 2026',
 'cd ladder calculator 2026',
 'online cd ladder tool free',
 'cd ladder estimator online',
 'cd ladder formula calculator',
 'use cd ladder calculator now',
 'try cd ladder calculator free',
 'calculate my cd ladder',
 'check my cd ladder online',
 'find my cd ladder free',
 'instant cd ladder calculator',
 'quick cd ladder calculator',
 'cd ladder calculator app',
 'cd ladder calculator mobile',
 'cd ladder tool no login',
 'how to use cd ladder calculator',
 'what is a good cd ladder',
 'what is the formula for cd ladder',
 'how is cd ladder calculated',
 'when to use cd ladder calculator',
 'which cd ladder calculator is best',
 'how accurate is cd ladder calculator',
 'cd ladder calculator USA',
 'cd ladder financial calculator free',
 'cd ladder investment calculator',
 'cd ladder calculator with chart',
 'cd ladder returns calculator',
 'cd ladder calculator monthly',
 'cd ladder calculator yearly',
 'US cd ladder calculator',
 'American cd ladder calculator',
 'cd ladder calculator UK',
 'cd ladder calculator India',
 'cd ladder before after tax',
 'free finance calculator',
 'personal finance cd ladder',
 'cd ladder calculator no ads',
 'free financial calculator USA 2026',
 'investment calculator no signup',
 'retirement planning calculator free',
 'compound interest calculator USA',
 'mortgage calculator USA',
 'IRS tax calculator 2026',
 'tooltrio.com',
 'free calculator no signup',
 'calculator no data stored',
 'instant calculator results',
 'free calculator USA UK India'
 ],
})

const faqs = [
  { question: 'What is a CD ladder and how does it work step by step?', answer: 'A CD ladder divides your total savings equally across CDs maturing at different intervals. For a 5-rung ladder with $50,000: invest $10,000 each in 1-year, 2-year, 3-year, 4-year, and 5-year CDs. When the 1-year CD matures, reinvest it in a new 5-year CD. The following year, the original 2-year matures; reinvest that in a new 5-year. After 5 years, every rung is a 5-year CD and one matures every 12 months — giving you annual access to $10,000 while earning 5-year rates on your entire portfolio. The result: you capture higher long-term rates without locking up your entire savings for 5 years.' },
  { question: 'How does a CD ladder protect against changing interest rates?', answer: 'A ladder hedges both directions of rate movement. If rates rise: your short-term CDs mature quickly, letting you reinvest at the new higher rates. If rates fall: your long-term CDs lock in the higher rates before they disappear. You\'re never fully exposed to any single rate environment. Compare this to putting all $50,000 in a 5-year CD: if rates spike 2 years in, you\'re locked in at the lower rate until maturity (or face an early withdrawal penalty to exit). The ladder gives you a rolling reinvestment opportunity every year — a natural rate-adjustment mechanism.' },
  { question: 'What are the current best CD rates and which banks offer them?', answer: 'In 2026, online banks and credit unions consistently offer the highest CD rates. Check Bankrate, DepositAccounts.com, or NerdWallet for current rankings — rates change weekly. Historically, direct banks (Ally, Marcus, Synchrony, Bread Savings, LendingClub Bank) offer 0.5-1.5% more than traditional brick-and-mortar banks. Credit unions (Pentagon Federal, Navy Federal for eligible members) also offer competitive rates. The difference matters: on $100,000 ladder, 0.75% higher rate = $750 more per year in interest. All deposits at FDIC-member banks are insured up to $250,000 per depositor per bank — use multiple banks for balances above that threshold.' },
  { question: 'Can a CD ladder replace a bond fund in a retirement portfolio?', answer: 'For conservative investors seeking predictable income with capital protection, a CD ladder is often superior to a short-to-intermediate bond fund. CDs have no price volatility — they won\'t fall 15% when interest rates rise the way a bond fund will. CD yields in 2024-2025 rivaled investment-grade corporate bond yields for the first time in years, without the credit or duration risk. The limitation: a CD ladder lacks diversification into corporate bonds, municipal bonds, or international bonds that a bond fund provides. For someone purely seeking yield and stability with FDIC insurance and no price fluctuation, a CD ladder beats a bond fund for the cash/conservative allocation.' },
  { question: 'What is the early withdrawal penalty on a CD and how does it affect total return?', answer: 'Penalties vary by bank and CD term: typical penalties are 30-60 days interest for short CDs (under 12 months) and 90-180 days interest for longer CDs (12-60 months). Some banks charge up to 12 months of interest on 5-year CDs. Example: a 3-year CD at 5% with a 180-day penalty, broken at month 6: you earned 6 months of interest but forfeit 6 months, netting zero interest for 6 months. Breaking it at month 18 (halfway through): you\'ve earned 18 months but forfeit 6 months, netting 12 months of interest — still positive, but equivalent to only 12 months of 5% return on a 3-year commitment. No-penalty CDs (available from several online banks) eliminate this concern entirely.' },
  { question: 'Is a CD ladder better than a high-yield savings account for emergency funds?', answer: 'For your full emergency fund, a HYSA wins on pure accessibility — no waiting for maturity, no penalties, withdraw any amount any day. For a larger cash reserve beyond 2-3 months of immediate emergency funds, a CD ladder makes sense. A pragmatic approach: keep 2-3 months of expenses in a HYSA for truly immediate access, and put 3-6 additional months in a short CD ladder (6-month, 12-month, 18-month rungs). The CD portion earns slightly more than the HYSA, and the 6-month maturity timeline is fast enough for most non-emergency needs. You\'re not sacrificing meaningful liquidity for emergencies while capturing the yield advantage on money you\'re unlikely to need immediately.' }
]

const relatedCalculators = [
 { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k retirement balance' },
 { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA growth' },
 { name: '401k vs Roth IRA', href: '/calculators/finance/401k-vs-roth-ira-calculator', icon: '🇺🇸', desc: 'Compare retirement accounts' },
 { name: 'S&amp;P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', desc: 'Stocks vs bonds' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Take-home pay' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug="fd-vs-rd-vs-sip-best-investment-for-2026" />
}
