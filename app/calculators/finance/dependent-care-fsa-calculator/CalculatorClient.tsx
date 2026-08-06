'use client'
import { calculateDCFSA } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [dependentCareCost, setDependentCareCost] = useState(18000)
  const [annualContrib, setAnnualContrib] = useState(5000)
  const [marginalRate, setMarginalRate] = useState(28)

  const result = useMemo(() => {
    try {
      return calculateDCFSA(annualContrib, marginalRate, 7.65, dependentCareCost, 'single')
    } catch(e) { return null }
  }, [dependentCareCost, annualContrib, marginalRate])

  return (
    <CalculatorLayout
      title="Dependent Care FSA Calculator USA 2026 — Childcare Tax Savings"
      description="Calculate DC-FSA tax savings vs Child and Dependent Care Credit and find the optimal strategy for your childcare costs."
      icon="👶"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="dependent-care-fsa-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Dependent Care Costs ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={dependentCareCost} onChange={e => setDependentCareCost(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual DC-FSA Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualContrib} onChange={e => setAnnualContrib(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Marginal Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={marginalRate} onChange={e => setMarginalRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="DC-FSA Tax Savings" value={result ? `${Number(result.taxSavings).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Child Care Credit Value" value={result ? `${Number(result.childTaxCreditValue).toLocaleString()}` : "—"} />
                <ResultCard label="Net Annual Savings" value={result ? `${Number(result.netSavings).toLocaleString()}` : "—"} />
                <ResultCard label="Recommendation" value={result ? String(result.recommendation) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">👶 Dependent Care FSA Calculator USA 2026 — Childcare Tax Savings — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The Dependent Care FSA allows working parents to pay up to $5,000 in childcare costs with pre-tax dollars. At the 28% tax bracket plus 7.65% FICA, every $5,000 in DC-FSA contributions saves $1,783 in taxes. Compare this against the Child and Dependent Care Credit to find your optimal childcare tax strategy.</p>
              </Card>
            </>
          ) : (
            <Card>
              <p className="text-gray-500 text-center py-8">Fill in your details to see results →</p>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-8">
        <SEOContent
          title="Dependent Care FSA Calculator" category="finance"
          intro="This calculator compares the payroll-tax and marginal-income-tax savings from a Dependent Care FSA with a simplified Child and Dependent Care Credit estimate."
          howItWorks="The FSA side caps the entered contribution at $7,500 for 2026 and multiplies it by the entered marginal rate plus 7.65% FICA. The credit side currently models 20% of up to $3,000 of care expense, so it represents one qualifying person at the minimum credit percentage."
          tipsSection="Worked example: Example: a $7,500 contribution at a 28% marginal rate plus 7.65% FICA produces a simplified $2,673.75 tax-saving estimate. Actual payroll-tax treatment and credit interaction can differ."
          conclusion="Important assumptions and limitations: The 2026 dependent-care assistance exclusion is $7,500 ($3,750 married filing separately). The actual Child and Dependent Care Credit can use up to $3,000 of expenses for one qualifying person or $6,000 for two or more, with a percentage based on income. This calculator does not ask number of dependents, filing status or earned income, so its credit comparison is intentionally simplified."
          benefits={[{title:"Methodology",text:"The explanation above follows the calculation actually performed by this page."},{title:"Interpret the output",text:"Treat the result as a scenario estimate and test the assumptions that matter most."},{title:"Privacy",text:"Calculator inputs are processed in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the calculator-specific trade-offs before taking the next step."},{title:"Scenario testing",text:"Change one relevant input at a time and observe which output is most sensitive."}]}
        />
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={relatedCalculators?.map(r => ({ name: r.name, href: r.href, icon: r.icon, desc: r.desc })) || []}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
