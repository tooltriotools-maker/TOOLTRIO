import { CalculatorBatch44DeepDive } from '@/components/ui/CalculatorBatch44DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Tax-Exempt vs Taxable Bond Comparison Calculator USA 2026 | ToolTrio',
  description: 'Compare after-tax yields on municipal bonds vs corporate bonds vs US Treasuries. Calculate the estimated tax-equivalent yield for any tax bracket and state.',
  slug: 'tax-exempt-bond-comparison-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['tax exempt bond calculator USA 2026', 'muni vs corporate bond after tax yield', 'treasury vs municipal bond calculator', 'bond after tax yield comparison', 'which bond is better tax bracket USA'],
})
const faqs = [
  {
    question: 'When do municipal bonds beat corporate bonds after tax?',
    answer: 'Municipal bond TEY formula: muni yield / (1 - combined tax rate). At 32% federal + 9.3% CA state (41.3% combined): a 4.2% muni has TEY = 4.2% / (1-0.413) = 7.16%. If corporate bonds yield less than 7.16%, the muni wins after tax. In high-tax states like CA and NY, even 3.5-4% munis can outperform 6-7% corporate bonds for investors in the top brackets.',
  },
  {
    question: 'Are US Treasuries tax-exempt at the state level?',
    answer: 'Yes — US Treasury interest is exempt from state and local income taxes (but not federal). This makes Treasuries more attractive than they appear in high-tax states. In California at 9.3% state rate: a 4.8% Treasury yields the equivalent of 5.29% corporate bond on an after-state-tax basis. Always compare bonds after both federal AND state tax for an accurate comparison.',
  },
  {
    question: 'What are the risks of municipal bonds?',
    answer: "Credit risk: municipal defaults are rare but real (Detroit 2013, Puerto Rico 2016). Always check credit rating (Moody's/S&P). Liquidity risk: munis are less liquid than Treasuries — bid-ask spreads can be 0.5-1%. Call risk: many munis are callable after 10 years, limiting upside if rates fall. AMT risk: some 'private activity bonds' are subject to AMT — avoid if you're in AMT territory. Interest rate risk: same as all fixed income.",
  }
]
const relatedCalculators = [
  { name: 'Municipal Bond Tax Calculator', href: '/calculators/finance/municipal-bond-tax-calculator', icon: '🏛️', desc: 'Municipal Bond Tax Calculator' },
  { name: 'I-Bonds Calculator', href: '/calculators/finance/i-bonds-calculator', icon: '🏛️', desc: 'I-Bonds Calculator' },
  { name: 'Bond Ladder Calculator', href: '/calculators/finance/bond-ladder-calculator', icon: '📊', desc: 'Bond Ladder Calculator' },
  { name: 'Tax-Loss Harvesting', href: '/calculators/finance/tax-loss-harvesting-calculator', icon: '🌿', desc: 'Tax-Loss Harvesting' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />
        <CalculatorBatch44DeepDive slug="tax-exempt-bond-comparison-calculator" />
</>
}
