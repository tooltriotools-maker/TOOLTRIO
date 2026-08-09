import { CalculatorBatch40DeepDive } from '@/components/ui/CalculatorBatch40DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
import { CalculatorDeepDive } from '@/components/ui/CalculatorDeepDive'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), { loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Qualified Dividend Tax Calculator USA 2026 | ToolTrio', description: 'Calculate tax on qualified dividends vs ordinary dividends in USA 2026. See how LTCG rates apply to qualified dividends and estimate your tax savings.', slug: 'qualified-dividend-tax-calculator', category: 'finance', region: 'usa', keywords: ['qualified dividend tax calculator 2026', 'dividend tax rate USA', 'LTCG dividend calculator', 'ordinary vs qualified dividend tax'] })
const faqs = [
  {"question": "What is the tax rate on qualified dividends?", "answer": "Qualified dividends are taxed at long-term capital gains rates: 0% if your taxable income is below $47,025 (single) or $94,050 (married) in 2026, 15% for most taxpayers, and 20% for high earners above $518,900 (single) or $583,750 (married). This is significantly lower than ordinary income rates which can reach 37%."},
  {"question": "What makes a dividend 'qualified'?", "answer": "To be qualified, dividends must be paid by a US corporation or qualified foreign corporation, and you must hold the stock for more than 60 days during the 121-day period surrounding the ex-dividend date. Most dividends from common stocks held longer than a few months qualify. REITs and money market funds typically pay non-qualified (ordinary) dividends."}
]
const relatedCalculators = [{'name': 'Dividend Calculator', 'href': '/calculators/finance/dividend-calculator', 'icon': '💰', 'desc': 'Dividend income'}, {'name': 'Capital Gains Tax', 'href': '/calculators/finance/capital-gains-tax-calculator', 'icon': '📈', 'desc': 'LTCG rates'}, {'name': 'Tax-Loss Harvesting', 'href': '/calculators/finance/tax-loss-harvesting-calculator', 'icon': '🌱', 'desc': 'Harvest losses'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} /><CalculatorDeepDive slug="qualified-dividend-tax-calculator" />      <CalculatorBatch40DeepDive slug="qualified-dividend-tax-calculator" />
</> }
