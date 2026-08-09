import { CalculatorBatch44DeepDive } from '@/components/ui/CalculatorBatch44DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), { loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Series EE Savings Bond Calculator USA 2026 | ToolTrio', description: 'Calculate Series EE savings bond current value, guaranteed doubling at 20 years, interest earned, and effective return rate. Compare EE bonds vs other safe investments.', slug: 'series-ee-bond-calculator', category: 'finance', region: 'usa', keywords: ['series EE bond calculator', 'EE savings bond value 2026', 'EE bond doubling calculator', 'US savings bond return calculator'] })
const faqs = [
  {"question": "Do Series EE Bonds really double in 20 years?", "answer": "Yes — EE bonds carry a guaranteed doubling of face value after 20 years. Since EE bonds are purchased at face value (unlike older bonds purchased at 50%), this doubling represents a fixed compound return of approximately 3.53% annually. If you redeem before 20 years, you only earn the stated interest rate (2.6% in 2026), which is lower. Holding to exactly 20 years maximizes the guaranteed return."},
  {"question": "Can I exclude EE bond interest for education expenses?", "answer": "Yes — if you use EE (and I Bond) interest to pay qualified higher education expenses (tuition and fees at accredited schools), you can exclude that interest from federal income tax. This exclusion phases out for higher incomes: $100,800-$130,800 (single) and $150,800-$180,800 (married filing jointly) in 2026 approximate limits. EE bonds are already state and local tax-exempt, so they're especially valuable in high-tax states."}
]
const relatedCalculators = [{'name': 'I-Bonds Calculator', 'href': '/calculators/finance/i-bonds-calculator', 'icon': '🏛️', 'desc': 'I-Bond returns'}, {'name': 'I-Bonds vs TIPS', 'href': '/calculators/finance/i-bonds-vs-tips-calculator', 'icon': '⚖️', 'desc': 'Inflation bonds'}, {'name': 'Treasury Bill Calculator', 'href': '/calculators/finance/treasury-bill-calculator', 'icon': '🏦', 'desc': 'T-Bill returns'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch44DeepDive slug="series-ee-bond-calculator" />
</> }
