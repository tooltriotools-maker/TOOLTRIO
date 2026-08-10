'use client'
import { calculateFSA } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [annualContrib, setAnnualContrib] = useState(2600)
  const [marginalRate, setMarginalRate] = useState(24)
  const [expectedMedical, setExpectedMedical] = useState(2000)

  const result = useMemo(() => {
    try {
      return calculateFSA(annualContrib, marginalRate, 7.65, expectedMedical, true)
    } catch(e) { return null }
  }, [annualContrib, marginalRate, expectedMedical])

  return (
    <CalculatorLayout
      title="FSA Calculator USA 2026 — Flexible Spending Account"
      description="Calculate FSA tax savings, effective discount on medical expenses, and optimal contribution to avoid forfeiture."
      icon="🏥"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="fsa-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual FSA Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualContrib} onChange={e => setAnnualContrib(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Marginal Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={marginalRate} onChange={e => setMarginalRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Medical Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={expectedMedical} onChange={e => setExpectedMedical(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="FSA Contribution (capped)" value={result ? `${Number(result.contribCapped).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Tax Savings" value={result ? `${Number(result.taxSavings).toLocaleString()}` : "—"} />
                <ResultCard label="Effective Discount" value={result ? `${Number(result.effectiveDiscount).toFixed(1)}%` : "—"} />
                <ResultCard label="Forfeiture Risk" value={result ? `${Number(result.forfeitRisk).toLocaleString()}` : "—"} />
                <ResultCard label="Recommended Contribution" value={result ? `${Number(result.recommended).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏥 FSA Calculator USA 2026 — Flexible Spending Account — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Use this Health FSA calculator to balance payroll tax savings against the risk of electing more than you expect to spend on eligible medical expenses. For 2026, the calculator caps the modeled salary-reduction election at $3,400 and uses a $680 carryover assumption when estimating potential forfeiture.</p>
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
          title="FSA Calculator USA 2026 — Flexible Spending Account"
          category="finance"
          intro="Use this Health FSA calculator to balance payroll tax savings against the risk of electing more than you expect to spend on eligible medical expenses. For 2026, the calculator caps the modeled salary-reduction election at $3,400 and uses a $680 carryover assumption when estimating potential forfeiture."
          howItWorks="The tool caps your election at $3,400, then estimates tax savings as contribution × (your marginal rate + 7.65% FICA). Net cost equals the capped election minus estimated tax savings. Forfeiture risk is the amount remaining after expected medical spending and the modeled $680 carryover."
          tipsSection="Base the election on expenses you can reasonably predict, such as recurring prescriptions, copays, dental work and vision costs. Employer plans may offer either a carryover or grace period under plan rules; verify your own plan instead of assuming every unused dollar can roll forward."
          conclusion="The result estimates tax savings and spending risk; it does not determine whether a particular purchase is FSA-eligible or override your employer plan document."
          benefits={[
            { title: "Calculator results", text: "Instant calculations from the inputs and assumptions shown on this page." },
            { title: "100% Private", text: "Everything runs in your browser. No data stored or transmitted." },
            { title: "Available without a paid plan", text: "No account is required to run the calculation." },
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
