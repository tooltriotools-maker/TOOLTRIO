import { CalculatorBatch12DeepDive } from '@/components/ui/CalculatorBatch12DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Collectibles Investment Return Calculator | ToolTrio',
  description: 'Model collectible appreciation, insurance, storage, selling fees, net ROI and a separate collectibles capital-gains tax estimate.',
  slug: 'collectibles-investment-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['collectibles investment calculator','collectibles capital gains tax','art wine coin investment returns','28% collectibles tax rate'],
})
const faqs: {question:string;answer:string}[] = [
  { question: 'What appreciation rates does the calculator assume?', answer: 'The code uses fixed annual assumptions by category: art 7.5%, wine 9%, watches 6%, cards 12%, and cars 8.5%. They are scenarios, not historical-return claims or forecasts.' },
  { question: 'How are selling costs modeled?', answer: 'The calculator subtracts 15% of modeled future value as a selling fee. Actual auction, dealer, platform, shipping and authentication costs can be very different.' },
  { question: 'How are insurance and storage handled?', answer: 'The entered annual insurance and storage costs are multiplied by the holding period and included in total carrying costs.' },
  { question: 'Why does the tax result use 28%?', answer: 'The model applies 28% to appreciation as a simplified maximum-rate illustration. IRS guidance says net long-term collectibles gain can be subject to a maximum 28% rate, while the taxpayer’s actual rate can be lower.' },
  { question: 'Does ROI include the estimated capital-gains tax?', answer: 'No. The ROI and annualized return are based on modeled net sale proceeds after the selling fee and carrying costs; the separate capital-gains-tax output is not subtracted from those return fields.' },
]
const relatedCalculators: {name:string;href:string;icon:string;desc:string}[] = [
  { name: 'Portfolio Rebalancing', href: '/calculators/finance/portfolio-rebalancing-calculator', icon: '🪙', desc: 'Portfolio Rebalancing' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', icon: '💰', desc: 'Net Worth' },
  { name: 'Capital Gains Tax', href: '/calculators/finance/capital-gains-tax-calculator', icon: '📈', desc: 'Capital Gains Tax' },
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch12DeepDive slug="collectibles-investment-calculator" />
</>
}
