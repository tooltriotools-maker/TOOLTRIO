import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Crypto Profit Loss Tracker USA 2026 — Cost Basis & Tax | ToolTrio',
  description: 'Track cryptocurrency buy/sell transactions, calculate average cost basis, realized gains, and estimated tax owed using FIFO method.',
  slug: 'crypto-profit-loss-tracker',
  category: 'finance',
  region: 'usa',
  keywords: ['crypto profit loss calculator USA', 'bitcoin cost basis calculator', 'crypto tax basis tracker', 'cryptocurrency gain loss calculator 2026', 'crypto FIFO calculator USA'],
})
const faqs = [
  {
    question: 'How is crypto cost basis calculated?',
    answer: 'Cost basis = total amount paid to acquire the cryptocurrency. With FIFO (First In First Out), you use the oldest purchases first when calculating gains on sales. Average cost method takes the average price of all purchases. Specific identification lets you choose which lot to sell (optimizing for tax by selling highest-cost lots first). The IRS allows specific identification if you maintain adequate records.',
  },
  {
    question: "Do I owe taxes on crypto I haven't sold?",
    answer: "No — unrealized gains (appreciation in value without selling) are not taxable. Tax is only triggered by 'disposal' events: selling crypto for fiat, trading one crypto for another, using crypto to buy goods/services, receiving crypto as payment (taxed as income at fair market value on receipt), staking rewards and airdrops (taxed as income when received). Simply holding is not a taxable event.",
  },
  {
    question: 'What records do I need for crypto taxes?',
    answer: 'Keep records of: date of acquisition, amount acquired, cost basis (price paid in USD including fees), date of disposal, proceeds (price received in USD), and how you received it (purchase, mining, staking, gift, airdrop). Major exchanges provide annual tax reports, but self-custody wallets require manual tracking. Software like CoinTracker, Koinly, or TaxBit can import exchange histories and calculate gains automatically.',
  }
]
const relatedCalculators = [
  { name: 'Crypto Tax Calculator', href: '/calculators/finance/crypto-tax-calculator', icon: '₿', desc: 'Crypto Tax Calculator' },
  { name: 'Crypto DCA Calculator', href: '/calculators/finance/crypto-dca-calculator', icon: '💰', desc: 'Crypto DCA Calculator' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
  { name: 'Tax-Loss Harvesting', href: '/calculators/finance/tax-loss-harvesting-calculator', icon: '🌿', desc: 'Tax-Loss Harvesting' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
