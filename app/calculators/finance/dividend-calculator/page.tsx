import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
 title: 'Dividend Income Calculator USA 2026 – Yield, Growth and Annual Income',
 description: 'Free dividend income calculator USA 2026. Calculate annual dividend income, yield on cost, dividend growth projections, and DRIP compounding. Real examples for $10k-$500k dividend portfolios.',
 slug: 'dividend-calculator',
 category: 'finance',
 keywords: [
 'dividend calculator 2026',
 
 'dividend calculator',
 'free dividend calculator',
 'dividend calculator online',
 'best dividend calculator 2026',
 'dividend calculator no signup',
 'accurate dividend calculator',
 'how to calculate dividend',
 'how does dividend calculator work',
 'what is dividend calculator',
 'calculate dividend free',
 'dividend calculator 2026',
 'dividend calculator 2026',
 'online dividend tool free',
 'dividend estimator online',
 'dividend formula calculator',
 'use dividend calculator now',
 'try dividend calculator free',
 'calculate my dividend',
 'check my dividend online',
 'find my dividend free',
 'instant dividend calculator',
 'quick dividend calculator',
 'dividend calculator app',
 'dividend calculator mobile',
 'dividend tool no login',
 'how to use dividend calculator',
 'what is a good dividend',
 'what is the formula for dividend',
 'how is dividend calculated',
 'when to use dividend calculator',
 'which dividend calculator is best',
 'how accurate is dividend calculator',
 'dividend calculator USA',
 'dividend financial calculator free',
 'dividend investment calculator',
 'dividend calculator with chart',
 'dividend returns calculator',
 'dividend calculator monthly',
 'dividend calculator yearly',
 'US dividend calculator',
 'American dividend calculator',
 'dividend calculator UK',
 'dividend calculator India',
 'dividend before after tax',
 'free finance calculator',
 'personal finance dividend',
 'dividend calculator no ads',
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
  { question: 'What dividend yield should I target for income investing?', answer: 'Dividend yield = annual dividend per share ÷ current stock price. A \'good\' yield depends entirely on context. In 2026, 10-year Treasury bonds yield approximately 4-5% risk-free. To justify the additional risk of stock ownership, dividend stocks should offer some yield premium plus growth potential. Reasonable target range for sustainable high-yield dividend investing: 3-5% yield with 5-8% annual dividend growth. Yields above 7-8% often signal financial stress — the market is pricing in dividend cut risk. The classic trap: buying the highest yield (\'yield chasing\') without evaluating sustainability. A 10% yield from a company with declining earnings is worth less than a 3% yield from a company growing dividends 12% annually.' },
  { question: 'How do qualified vs ordinary dividends differ for tax purposes?', answer: 'Qualified dividends are taxed at the preferential long-term capital gains rate (0%, 15%, or 20% depending on income). To qualify: the dividend must be from a US corporation or qualifying foreign corporation, and you must have held the stock for more than 60 days during the 121-day period around the ex-dividend date. Ordinary (non-qualified) dividends are taxed at your marginal ordinary income tax rate (up to 37%). Most dividends from common US stocks are qualified. Important exceptions that pay ordinary dividends: REITs (real estate investment trusts), master limited partnerships (MLPs), money market funds, and some foreign stocks. Hold REITs and MLPs in tax-deferred accounts (IRA, 401k) to avoid ordinary income treatment.' },
  { question: 'What is a dividend reinvestment plan (DRIP) and should I use one?', answer: 'A DRIP automatically reinvests your dividend cash payments into additional shares (or fractional shares) of the same company or fund. The compounding effect is significant over time: an investment with 3% dividend yield growing at 7% price appreciation compounded with reinvested dividends over 30 years delivers dramatically more total wealth than the same investment with dividends taken as cash. Most brokerages offer automatic DRIP at no cost. The tax consideration: reinvested dividends are still taxable income in the year received, even though you didn\'t receive cash. You must track the cost basis of each DRIP reinvestment for future capital gains calculation — this creates administrative complexity for large taxable DRIP accounts.' },
  { question: 'How do I evaluate whether a dividend is safe and sustainable?', answer: 'Three key metrics: (1) Payout ratio = dividends paid ÷ earnings per share. Below 50%: very safe. 50-70%: generally sustainable. Above 80%: elevated risk. Above 100%: dividend exceeds earnings — not sustainable without debt or asset sales. (2) Free cash flow payout ratio = dividends paid ÷ free cash flow (better than earnings for capital-intensive businesses). (3) Dividend growth history — 10+ consecutive years of dividend growth signals financial discipline and earnings strength. Dividend Aristocrats (S&P 500 companies with 25+ years of consecutive increases) and Dividend Kings (50+ years) have demonstrated the most durable track records. Falling earnings, debt accumulation, or industry disruption are warning signs before a cut.' },
  { question: 'What is the dividend discount model for stock valuation?', answer: 'The dividend discount model (DDM) values a stock by discounting all future expected dividends back to present value. Simple version: Stock Price = Next Year Dividend ÷ (Required Return - Dividend Growth Rate). For a stock paying $2.00/year, growing dividends at 6%, when you require 9% return: $2.00 ÷ (0.09 - 0.06) = $2.00 ÷ 0.03 = $66.67. If the stock currently trades at $50, it may be undervalued at your required return assumptions. DDM\'s limitation: extremely sensitive to growth rate assumptions — changing the growth rate assumption from 6% to 7% with a 9% required return changes the value from $66.67 to $100. Small changes in inputs produce large price differences, which is why DDM is most reliable for mature, stable-growth dividend payers.' }
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
 return <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug="investment-return-guide-cagr-roi-roi-calculator-usa" />
}
