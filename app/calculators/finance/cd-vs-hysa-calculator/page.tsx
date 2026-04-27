import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'CD vs High-Yield Savings Account Calculator USA 2026 – Best Safe Investment',
 description: 'Free CD vs HYSA calculator USA 2026. Compare certificate of deposit vs high-yield savings account on interest rate, flexibility, FDIC protection, and total earnings. Real examples for $5k-$50k savings balances.',
 slug: 'cd-vs-hysa-calculator',
 category: 'finance',
 region: 'usa',
 keywords: [
 'cd vs hysa calculator 2026',
 
 'cd vs hysa calculator',
 'free cd vs hysa calculator',
 'cd vs hysa calculator online',
 'best cd vs hysa calculator 2026',
 'cd vs hysa calculator no signup',
 'accurate cd vs hysa calculator',
 'how to calculate cd vs hysa',
 'how does cd vs hysa calculator work',
 'what is cd vs hysa calculator',
 'calculate cd vs hysa free',
 'cd vs hysa calculator 2026',
 'cd vs hysa calculator 2026',
 'online cd vs hysa tool free',
 'cd vs hysa estimator online',
 'cd vs hysa formula calculator',
 'use cd vs hysa calculator now',
 'try cd vs hysa calculator free',
 'calculate my cd vs hysa',
 'check my cd vs hysa online',
 'find my cd vs hysa free',
 'instant cd vs hysa calculator',
 'quick cd vs hysa calculator',
 'cd vs hysa calculator app',
 'cd vs hysa calculator mobile',
 'cd vs hysa tool no login',
 'how to use cd vs hysa calculator',
 'what is a good cd vs hysa',
 'what is the formula for cd vs hysa',
 'how is cd vs hysa calculated',
 'when to use cd vs hysa calculator',
 'which cd vs hysa calculator is best',
 'how accurate is cd vs hysa calculator',
 'cd vs hysa calculator USA',
 'cd vs hysa financial calculator free',
 'cd vs hysa investment calculator',
 'cd vs hysa calculator with chart',
 'cd vs hysa returns calculator',
 'cd vs hysa calculator monthly',
 'cd vs hysa calculator yearly',
 'US cd vs hysa calculator',
 'American cd vs hysa calculator',
 'cd vs hysa calculator UK',
 'cd vs hysa calculator India',
 'cd vs hysa before after tax',
 'free finance calculator',
 'personal finance cd vs hysa',
 'cd vs hysa calculator no ads',
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
  { question: 'What is the actual dollar difference between a CD and HYSA on $50,000 over one year?', answer: 'In 2026, if a 12-month CD offers 5.0% and the best HYSA offers 4.5%, the difference on $50,000: CD earns $2,500; HYSA earns $2,250. Annual difference = $250. That\'s meaningful but not transformative — and you\'ve committed to the CD for the full year versus the HYSA\'s daily liquidity. The math changes for larger balances or longer CD terms. On $200,000 over 3 years with a CD at 5.0% vs HYSA averaging 4.0% over the period (HYSAs fluctuate with rate changes): CD earns approximately $31,525; HYSA earns approximately $24,973. Three-year gap = $6,552 — more significant, and you\'ve benefited from rate-lock protection if rates fell.' },
  { question: 'How often do HYSA rates change and what drives them?', answer: 'HYSA rates change with the federal funds rate and competitive bank dynamics — changes can happen weekly for some banks. When the Fed raises rates, banks typically increase HYSA rates within 1-4 weeks to attract deposits. When the Fed cuts rates, HYSA rates often fall within days (banks are faster to lower deposit costs than raise them). HYSA rates also respond to competition — when one major online bank increases rates, competitors typically follow within weeks. From 2022-2023, HYSA rates went from 0.5% to 5%+ in 18 months. From late 2024 onward, they began declining with Fed cuts. Treat today\'s HYSA rate as a snapshot, not a long-term yield commitment.' },
  { question: 'What is a no-penalty CD and is it better than a HYSA?', answer: 'A no-penalty CD is a fixed-term CD (typically 7-14 months) where you can withdraw the full balance without penalty after a short waiting period (usually 7 days). They capture the rate stability of a CD with near-HYSA liquidity. In practice, no-penalty CD rates are typically 0.1-0.3% below equivalent-term penalty CDs but 0.1-0.5% above current HYSA rates. For cash you\'re confident you won\'t need for 6-12 months but want protection if rates fall, the no-penalty CD is often the optimal vehicle — capturing more yield than a HYSA while retaining exit flexibility. Ally Bank, Marcus by Goldman Sachs, and CIT Bank have historically offered competitive no-penalty CD products.' },
  { question: 'For my emergency fund, should I use a HYSA, a CD, or split between both?', answer: 'The ideal structure: keep 2-3 months of expenses in a HYSA for instant access — this is the portion that may need to fund a car repair tomorrow. Put 3-4 additional months in a no-penalty CD or a short-term CD ladder (3-month, 6-month rungs) for slightly higher yield. The 3-6 month beyond-immediate-emergency money is unlikely to be needed on short notice but should remain accessible within weeks. This split captures the HYSA\'s total liquidity where it matters most while earning higher returns on the larger secondary reserve. Never put your entire emergency fund in a penalty CD — being forced to break it in a crisis multiplies the financial problem.' },
  { question: 'What happens to my CD if the bank fails?', answer: 'FDIC insurance covers CD deposits up to $250,000 per depositor per bank. If a bank fails, the FDIC either (1) transfers your CD to an acquiring institution, maintaining the same terms, or (2) pays you the CD balance (principal plus accrued interest to the failure date) directly. In practice, FDIC-insured depositors have never lost a penny of insured funds since 1934 through thousands of bank failures. The risk management action: spread deposits exceeding $250,000 across multiple FDIC-member banks, or use one bank per account type (individual, joint, IRA — each has separate $250,000 coverage). CDs at credit unions are covered by NCUA to the same $250,000 limit.' },
  { question: 'Is a CD or HYSA better when interest rates are expected to fall?', answer: 'When rates are falling (as they were in 2024-2025 with Fed rate cuts), locking in longer-term CDs before rates decline is valuable. A 2-year CD at 5.0% captured before a rate-cutting cycle ensures that rate for the full term, even as HYSA rates drift down to 3.5-4.0%. The HYSA loses its yield advantage as it tracks the declining rate environment in real time. Conversely, when rates are rising, the HYSA benefits from immediate rate increases while long-term CDs sit at the pre-rise rate. The classic guidance: in a rate-cutting environment, favor CDs; in a rate-rising environment, favor HYSA and short CDs.' }
]

const relatedCalculators = [
 { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k retirement balance' },
 { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', desc: 'Roth IRA growth' },
 { name: '401k vs Roth IRA', href: '/calculators/finance/401k-vs-roth-ira-calculator', icon: '🇺🇸', desc: 'Compare retirement accounts' },
 { name: 'S&amp;P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', desc: 'Stocks vs bonds' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Take-home pay' },
]

export default function Page() {
 return <CalculatorClient faqs={faqs} blogSlug="bonds-vs-cds-safe-investment-guide-usa-2026" structuredData={[generateFAQStructuredData(faqs)]} relatedCalculators={relatedCalculators} />
}
