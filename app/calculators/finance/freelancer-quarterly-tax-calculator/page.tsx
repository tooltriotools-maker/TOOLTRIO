import { CalculatorBatch44DeepDive } from '@/components/ui/CalculatorBatch44DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), { loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" /> })
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Freelancer Quarterly Tax Calculator USA 2026 | ToolTrio', description: 'Calculate quarterly estimated tax payments for freelancers and self-employed workers. Includes SE tax, QBI deduction, safe harbor rules, and payment due dates for 2026.', slug: 'freelancer-quarterly-tax-calculator', category: 'finance', keywords: ['freelancer quarterly tax calculator', 'self employed estimated tax 2026', 'quarterly tax payment calculator USA', '1099 quarterly taxes due dates'] })
const faqs = [
  {"question": "When are quarterly estimated taxes due in 2026?", "answer": "2026 quarterly estimated tax due dates: Q1 (Jan-Mar) due April 15, Q2 (Apr-May) due June 16, Q3 (Jun-Aug) due September 15, Q4 (Sep-Dec) due January 15, 2027. You can avoid underpayment penalties by paying the lesser of 100% of prior year tax liability (110% if prior year income exceeded $150,000) or 90% of current year taxes."},
  {"question": "What is the safe harbor rule for estimated taxes?", "answer": "The safe harbor rule protects you from underpayment penalties if you pay at least 100% of last year's tax liability in equal quarterly installments (or 110% if your AGI exceeded $150,000). If your income is variable, this is the safest approach — even if your actual 2026 tax ends up higher, you won't owe a penalty. Make sure to reconcile at filing if you overpaid and request a refund or credit forward."}
]
const relatedCalculators = [{'name': 'W-2 vs 1099 Calculator', 'href': '/calculators/finance/w2-vs-1099-calculator', 'icon': '⚖️', 'desc': 'W-2 vs contractor'}, {'name': 'Self-Employment Tax', 'href': '/calculators/finance/self-employment-tax-calculator', 'icon': '💼', 'desc': 'SE tax'}, {'name': 'QBI Deduction', 'href': '/calculators/finance/qbi-deduction-calculator', 'icon': '🧾', 'desc': 'QBI deduction'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch44DeepDive slug="freelancer-quarterly-tax-calculator" />
</> }
