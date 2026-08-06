import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'))
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Wash Sale Rule Calculator USA 2026 | ToolTrio', description: 'Calculate wash sale rule impact on your tax-loss harvesting. Determine if your trade triggers the 30-day wash sale window and how much loss is disallowed.', slug: 'wash-sale-calculator', category: 'finance', keywords: ['wash sale calculator USA', 'wash sale rule 30 days', 'tax loss harvesting wash sale', 'disallowed loss calculator'] })
const faqs = [
  {"question": "What is the wash sale rule?", "answer": "The wash sale rule disallows a tax loss if you buy substantially identical stock or securities within 30 days before or after the sale at a loss. The disallowed loss is added to the cost basis of the replacement shares, so the tax benefit is deferred, not permanently lost — it effectively rolls forward to when you eventually sell the replacement shares."},
  {"question": "How do I avoid a wash sale?", "answer": "Wait at least 31 days before repurchasing the same security, buy a similar but not substantially identical ETF/stock (e.g., switch from VOO to IVV — though this is debated), or invest in a different sector. Tax-loss harvesting software can track wash sale windows automatically. Note: the rule also applies to spouse accounts and IRAs, so be careful across all accounts."}
]
const relatedCalculators = [{'name': 'Tax-Loss Harvesting', 'href': '/calculators/finance/tax-loss-harvesting-calculator', 'icon': '🌱', 'desc': 'Harvest strategies'}, {'name': 'Capital Gains Tax', 'href': '/calculators/finance/capital-gains-tax-calculator', 'icon': '📈', 'desc': 'LTCG rates'}, {'name': 'Stock Profit Calculator', 'href': '/calculators/finance/stock-profit-calculator', 'icon': '💹', 'desc': 'Stock gains'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} /></> }
