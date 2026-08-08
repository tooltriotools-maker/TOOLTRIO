import { CalculatorBatch45DeepDive } from '@/components/ui/CalculatorBatch45DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), { loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Stock Option Tax Calculator USA 2026 (ISO & NSO) | ToolTrio', description: 'Calculate taxes on ISO (Incentive Stock Options) and NSO (Non-Qualified Stock Options). Compare tax treatment, AMT exposure, and net gain after taxes.', slug: 'stock-option-tax-calculator', category: 'finance', keywords: ['stock option tax calculator USA', 'ISO vs NSO tax calculator', 'incentive stock option AMT calculator', 'NSO non-qualified option tax 2026'] })
const faqs = [
  {"question": "What is the tax difference between ISO and NSO?", "answer": "NSOs (Non-Qualified Stock Options) are taxed as ordinary income on the spread (FMV minus strike price) at exercise, plus a FICA tax. ISOs (Incentive Stock Options) avoid ordinary income tax at exercise if you hold the shares long enough, but the spread counts as an AMT preference item. Qualifying ISOs held 2+ years from grant and 1+ year from exercise are taxed at LTCG rates — potentially saving 15-20% in taxes."},
  {"question": "What is the AMT risk with ISOs?", "answer": "Exercising ISOs doesn't trigger regular income tax, but the spread (FMV minus strike price) is an AMT preference item. If you exercise a large block of ISOs in a high year, you may owe Alternative Minimum Tax. The AMT rate is 28% on the preference income. This caught many tech employees off guard in the 2000s dot-com crash when they owed AMT on worthless stock."}
]
const relatedCalculators = [{'name': 'Capital Gains Tax', 'href': '/calculators/finance/capital-gains-tax-calculator', 'icon': '📈', 'desc': 'LTCG rates'}, {'name': 'Equity Compensation', 'href': '/calculators/finance/equity-compensation-calculator', 'icon': '💎', 'desc': 'RSU & options'}, {'name': 'Alternative Minimum Tax', 'href': '/calculators/finance/alternative-minimum-tax-calculator', 'icon': '🧾', 'desc': 'AMT calculator'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch45DeepDive slug="stock-option-tax-calculator" />
</> }
