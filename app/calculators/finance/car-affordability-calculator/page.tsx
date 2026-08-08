import { CalculatorBatch36DeepDive } from '@/components/ui/CalculatorBatch36DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Car Affordability Calculator USA 2026 — How Much Car Can I Afford? | ToolTrio',
  description: 'Calculate maximum car price, monthly payment, and total cost of ownership based on income, debts, and 15% rule for vehicle affordability.',
  slug: 'car-affordability-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['car affordability calculator 2026', 'how much car can I afford USA', 'car payment calculator', 'auto loan affordability', '20 4 10 rule car calculator'],
})
const faqs = [
 {question:'What affordability rule does this calculator use?',answer:'The model reserves 15% of gross monthly income for the vehicle payment plus a fixed $150 monthly insurance allowance. That 15% figure is a ToolTrio planning guardrail, not a lender approval rule.'},
 {question:'Does monthly debt reduce the affordable car price?',answer:'The current calculation receives the monthly-debt input but does not subtract it from the 15% vehicle budget. Treat the output as a vehicle-budget scenario, not a full debt-to-income underwriting result.'},
 {question:'How is the maximum loan calculated?',answer:'After subtracting the $150 insurance allowance from the 15% monthly budget, the calculator converts the remaining payment into a present-value loan amount using your APR and term.'},
 {question:'What does total cost of ownership include?',answer:'It includes modeled loan payments, $150 per month of insurance and an additional 1.5% of vehicle price per year. Fuel, depreciation, repairs, registration and actual insurance quotes are not separately modeled.'},
 {question:'Do down payment and trade-in increase the price ceiling?',answer:'Yes. The calculated maximum loan is increased by the entered down payment and trade-in value to produce the displayed maximum vehicle price.'}
]
const relatedCalculators = [
  { name: 'Buy vs Lease Vehicle', href: '/calculators/finance/buy-vs-lease-vehicle-calculator', icon: '🚗', desc: 'Buy vs Lease Vehicle' },
  { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', icon: '💳', desc: 'Personal Loan Calculator' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', icon: '📊', desc: 'Budget Planner Calculator' },
  { name: 'Net Salary Calculator', href: '/calculators/finance/net-salary-calculator', icon: '💰', desc: 'Net Salary Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
        <CalculatorBatch36DeepDive slug="car-affordability-calculator" />
</>
}
