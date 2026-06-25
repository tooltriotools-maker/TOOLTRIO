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
  title: 'I-Bonds Calculator USA 2026 — Inflation-Protected Savings | ToolTrio',
  description: 'Calculate I-Bond value, composite rate, interest earned, and effective yield vs CDs and HYSAs. Updated for 2026 rates.',
  slug: 'i-bonds-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['I bonds calculator 2026', 'Series I savings bonds calculator', 'I bond value calculator USA', 'I bond composite rate 2026', 'I bonds vs HYSA vs CD'],
})

const faqs = [
  {
    question: 'What is the I-Bond rate for 2026?',
    answer: 'I-Bond rates reset every May and November. The composite rate has two components: a fixed rate (set at purchase, held for life of bond) and a variable inflation component (adjusted semi-annually based on CPI-U). For bonds purchased in early 2026, the composite rate is approximately 4.41% — but check TreasuryDirect.gov for the exact current rate before purchasing.',
  },
  {
    question: 'What is the I-Bond annual purchase limit?',
    answer: 'Individuals can buy up to $10,000 in electronic I-Bonds per year per Social Security number through TreasuryDirect.gov, plus up to $5,000 in paper I-Bonds using your federal tax refund. Trusts and businesses have separate $10,000 limits. A married couple can buy $20,000/year combined.',
  },
  {
    question: 'When can I cash out I-Bonds?',
    answer: 'I-Bonds must be held at least 12 months before redemption. Redeeming between 12–60 months (1–5 years) forfeits the last 3 months of interest. After 5 years, there is no penalty. I-Bonds earn interest for 30 years. Federal income tax is owed when redeemed; state and local taxes never apply.',
  }
]

const relatedCalculators = [
  { name: 'CD vs HYSA Calculator', href: '/calculators/finance/cd-vs-hysa-calculator', icon: '💰', desc: 'CD vs HYSA Calculator' },
  { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', icon: '📈', desc: 'Inflation Calculator' },
  { name: 'Bonds vs CDs USA', href: '/calculators/finance/bonds-vs-cds-usa-calculator', icon: '🏦', desc: 'Bonds vs CDs USA' },
  { name: 'I-Bonds vs TIPS', href: '/calculators/finance/i-bonds-vs-tips-calculator', icon: '⚖️', desc: 'I-Bonds vs TIPS' }
]

const structuredData = [generateFAQStructuredData(faqs)]

export default function Page() {
  return <>
    {structuredData.map((s, i) => (
      <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
    ))}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
