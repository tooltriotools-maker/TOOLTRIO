'use client'
import { calculateDCFSA } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[];
; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

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
      structuredData={}
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
          title="Dependent Care FSA Calculator USA 2026 — Childcare Tax Savings"
          category="finance"
          intro="The Dependent Care FSA allows working parents to pay up to $5,000 in childcare costs with pre-tax dollars. At the 28% tax bracket plus 7.65% FICA, every $5,000 in DC-FSA contributions saves $1,783 in taxes. Compare this against the Child and Dependent Care Credit to find your optimal childcare tax strategy."
          howItWorks="Enter your values in the input panel. Results update in real-time using US-standard formulas. All calculations run locally in your browser — no data is sent to any server."
          tipsSection="Compare multiple scenarios by adjusting individual inputs. Small changes in rate or time period often produce dramatically different outcomes due to compounding."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[
            { title: "Real-Time USA Results", text: "Instant calculations using 2026 IRS limits and US-standard formulas." },
            { title: "100% Private", text: "Everything runs in your browser. No data stored or transmitted." },
            { title: "Free Forever", text: "No signup, no paywall, no hidden costs." },
          ]}
          useCases={[
            { title: "Personal Planning", text: "Model your specific situation with real numbers before making decisions." },
            { title: "Scenario Comparison", text: "Change one variable at a time to understand the impact of each factor." },
          ]}
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
