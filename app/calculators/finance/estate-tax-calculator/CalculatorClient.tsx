'use client'
import { calculateEstateTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [grossEstate, setGrossEstate] = useState(15000000)
  const [debts, setDebts] = useState(500000)
  const [charitableDeductions, setCharitableDeductions] = useState(0)
  const [spouseTransfer, setSpouseTransfer] = useState(0)

  const result = useMemo(() => {
    try {
      return calculateEstateTax(grossEstate, debts, charitableDeductions, spouseTransfer, 'single')
    } catch(e) { return null }
  }, [grossEstate, debts, charitableDeductions, spouseTransfer])

  return (
    <CalculatorLayout
      title="Federal Estate Tax Calculator USA 2026"
      description="Calculate federal estate tax liability, exemption amounts, and marital deduction. Plan for the the 2026 basic exclusion and entered deductions."
      icon="⚖️"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="estate-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Gross Estate Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={grossEstate} onChange={e => setGrossEstate(Number(e.target.value))} step={100000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Debts and Liabilities ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={debts} onChange={e => setDebts(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Charitable Deductions ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={charitableDeductions} onChange={e => setCharitableDeductions(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Transfer to Spouse ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={spouseTransfer} onChange={e => setSpouseTransfer(Number(e.target.value))} step={100000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Taxable Estate" value={result ? `${Number(result.taxableEstate).toLocaleString()}` : "—"} highlight />
                <ResultCard label="2026 Exemption" value={result ? `${Number(result.exemption).toLocaleString()}` : "—"} />
                <ResultCard label="Federal Estate Tax" value={result ? `${Number(result.federalEstateTax).toLocaleString()}` : "—"} />
                <ResultCard label="Effective Rate" value={result ? `${Number(result.effectiveRate).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">⚖️ Federal Estate Tax Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This federal estate-tax calculator starts with gross estate value, subtracts entered debts, charitable deductions and spouse transfers, then compares the remainder with the 2026 federal basic exclusion. The 2026 basic exclusion is $15 million per individual.</p>
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
          title="Federal Estate Tax Calculator USA 2026"
          category="finance"
          intro="This federal estate-tax calculator starts with gross estate value, subtracts entered debts, charitable deductions and spouse transfers, then compares the remainder with the 2026 federal basic exclusion. The 2026 basic exclusion is $15 million per individual."
          howItWorks="Adjusted estate = gross estate − debts − charitable deductions − spouse transfer. Taxable estate = max(0, adjusted estate − modeled exclusion). The function then applies its estate-tax rate schedule. The UI currently runs the single-estate scenario; portability and marital-deduction rules require additional facts and elections."
          tipsSection="Use date-of-death values and do not treat every liability or transfer as automatically deductible. Adjusted taxable gifts, valuation rules, portability elections and state estate/inheritance taxes are outside this simplified input set."
          conclusion="Federal estate tax is highly fact-specific. This calculator provides a rough federal estimate and does not prepare Form 706, value assets or determine state death taxes."
          benefits={[
            { title: "Real-Time USA Results", text: "Instant calculations from the inputs and assumptions shown on this page." },
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
