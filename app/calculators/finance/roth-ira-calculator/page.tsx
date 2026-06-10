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
 title: 'Roth IRA Calculator USA 2026 | ToolTrio',
 description: 'Free Roth IRA calculator USA 2026. See how much your Roth IRA will be worth at retirement with tax-free compound growth and 2026 contribution limits. Real.',
 slug: 'roth-ira-calculator',
 category: 'finance',
 keywords: [
    'roth ira calculator 2026',
    'roth ira calculator',
    'free roth ira calculator',
    'roth ira calculator online',
    'best roth ira calculator 2026',
    'roth ira calculator no signup',
    'accurate roth ira calculator',
    'how to calculate roth ira',
    'tooltrio.com',
  ],
})

const faqs = [
  { question: 'What are the Roth IRA income and contribution limits for 2026?', answer: 'Contribution limits for 2026: $7,000 for individuals under 50; $8,000 for those 50 and older (catch-up contribution). Income phase-out for direct contributions: single filers phase out between $150,000-$165,000 MAGI; married filing jointly phase out between $236,000-$246,000. Above these limits, direct contributions are prohibited but the backdoor Roth (non-deductible traditional IRA contribution followed by conversion) remains available regardless of income. There is no income limit for Roth conversions from traditional IRA.' },
  { question: 'Can I withdraw my Roth IRA contributions at any time?', answer: 'Yes — you can withdraw your contribution basis (the actual dollars you put in) from a Roth IRA at any time, for any reason, without taxes or penalties. Only earnings are subject to the 5-year rule and age requirements for tax-free withdrawal. Example: you contributed $35,000 over 5 years and the account is now worth $50,000. You can withdraw $35,000 immediately tax and penalty-free — that\'s your contribution basis. The $15,000 in earnings would be taxable and penalized if withdrawn before age 59½ and before meeting the 5-year rule. This flexibility makes the Roth IRA superior to the traditional IRA as an emergency fund supplement.' },
  { question: 'What is the Roth IRA 5-year rule?', answer: 'There are actually two Roth 5-year rules. Rule 1: To withdraw earnings tax-free, the Roth IRA must have been open for at least 5 tax years AND you must be 59½ or older (or meet another qualifying exception). Rule 2: For Roth conversions, each converted amount has its own 5-year clock for penalty-free withdrawal of the converted principal (though not earnings). The first 5-year rule affects earnings withdrawals — it starts with the first Roth IRA you open (January 1 of the year of first contribution). If you opened a Roth IRA in 2024 at age 58, you cannot take tax-free earnings distributions until 2029 (meeting both the age and 5-year requirement).' },
  { question: 'How does the Roth IRA benefit heirs compared to a traditional IRA?', answer: 'Roth IRA assets pass to heirs with no income tax on withdrawals — the tax was already paid by the original account holder. Traditional IRA assets are subject to ordinary income tax on every dollar distributed by the heir. The SECURE Act (2020) requires most non-spouse beneficiaries to withdraw inherited IRA assets within 10 years. For a traditional IRA, this means inheriting a large account can push an heir into a high tax bracket for 10 years. For a Roth, those same tax-free withdrawals create no income tax. A Roth IRA passed to a child in a high income year (during peak career earnings) saves dramatically more in estate taxes than a traditional IRA of the same value.' },
  { question: 'What should I invest in inside a Roth IRA?', answer: 'The Roth IRA\'s permanent tax-free growth makes it the ideal vehicle for the highest-expected-return investments in your portfolio. Asset location guidance: Hold your most aggressive, highest-growth investments in the Roth IRA — small-cap equities, international equities, REITs. These would generate the most tax if held in taxable accounts (high dividend yield for REITs, high turnover for active strategies). Hold bonds and stable assets in traditional IRA or taxable accounts (bonds\' lower return means less value lost to future taxes; taxable bonds benefit from being in tax-deferred accounts). Index funds are appropriate everywhere, but growth-oriented index funds maximize Roth\'s advantage.' }
]

const relatedCalculators = [
 { name: '401k Calculator', href: '/calculators/finance/401k-calculator', icon: '🏦', desc: '401k retirement balance' },
 { name: 'S&P 500 vs Bonds', href: '/calculators/finance/sp500-vs-bonds-calculator', icon: '📊', desc: 'Stocks vs bonds' },
 { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', icon: '🔥', desc: 'Financial independence' },
 { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Take-home pay' },
 { name: 'HSA vs FSA', href: '/calculators/finance/hsa-vs-fsa-calculator', icon: '🏥', desc: 'Health savings accounts' },
 { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator', icon: '💰', desc: 'Compounding' },
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
 return <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug="retirement-planning-guide-how-much-do-you-need-to-retire" />
}
