import { CalculatorBatch9DeepDive } from '@/components/ui/CalculatorBatch9DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({ title: 'Capital Gains Harvesting Calculator USA 2026 | ToolTrio', description: 'Calculate capital gains tax harvesting opportunities. Find your 0% LTCG tax space, optimize loss harvesting, and minimize capital gains taxes in your investment portfolio.', slug: 'capital-gains-harvesting-calculator', category: 'finance', keywords: ['capital gains harvesting calculator USA', 'tax gain harvesting 2026', '0% capital gains bracket calculator', 'tax loss harvesting calculator USA'] })
const faqs = [
  { question: 'What is tax-gain harvesting?', answer: 'Tax-gain harvesting means intentionally realizing gains, often when taxable income leaves room in a lower long-term capital-gain band. This calculator estimates that room using simplified income inputs.' },
  { question: 'What are the 2026 0% long-term capital-gain thresholds?', answer: 'For 2026 the maximum 0% rate amount is $49,450 for single filers and $98,900 for married couples filing jointly. The calculation of taxable income is more detailed than the inputs on this page.' },
  { question: 'How do capital losses affect gains?', answer: 'Capital losses generally offset capital gains, with ordering and character rules. If losses exceed gains, individuals may generally deduct a limited net capital loss against other income and carry excess losses forward.' },
  { question: 'Does this calculator enforce the wash-sale rule?', answer: 'No. It does not track replacement purchases or substantially identical securities. A wash sale can defer a loss that this simplified page otherwise appears to use.' },
  { question: 'Does the estimate include NIIT or state tax?', answer: 'No. It excludes the Net Investment Income Tax, state tax and special capital-gain categories such as collectibles and unrecaptured Section 1250 gain.' }
]
const relatedCalculators = [{'name': 'Tax-Loss Harvesting', 'href': '/calculators/finance/tax-loss-harvesting-calculator', 'icon': '🌱', 'desc': 'Harvest losses'}, {'name': 'Capital Gains Tax', 'href': '/calculators/finance/capital-gains-tax-calculator', 'icon': '📈', 'desc': 'LTCG calculator'}, {'name': 'Qualified Dividend Tax', 'href': '/calculators/finance/qualified-dividend-tax-calculator', 'icon': '💰', 'desc': 'Dividend taxes'}]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() { return <>{structuredData.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}<CalculatorClient faqs={faqs} structuredData={structuredData} relatedCalculators={relatedCalculators} />      <CalculatorBatch9DeepDive slug="capital-gains-harvesting-calculator" />
</> }
