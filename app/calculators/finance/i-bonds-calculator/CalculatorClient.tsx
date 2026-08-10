'use client'
import { calculateI_Bonds } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [purchaseAmount, setPurchaseAmount] = useState(10000)
  const [months, setMonths] = useState(24)
  const [fixedRate, setFixedRate] = useState(0.90)
  const [inflationRate, setInflationRate] = useState(1.67)

  const result = useMemo(() => {
    try {
      return calculateI_Bonds(purchaseAmount, months, fixedRate, inflationRate)
    } catch(e) { return null }
  }, [purchaseAmount, months, fixedRate, inflationRate])

  return (
    <CalculatorLayout
      title="I-Bonds Calculator USA 2026 — Inflation-Protected Savings"
      description="Estimate Series I savings bond value using the Treasury composite-rate formula, holding period, and early-redemption penalty. Defaults reflect May–October 2026 rates."
      icon="🏛️"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="i-bonds-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Purchase Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={purchaseAmount} onChange={e => setPurchaseAmount(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Months Held</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={months} onChange={e => setMonths(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Fixed Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={fixedRate} onChange={e => setFixedRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Semiannual Inflation Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} step={0.01} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Composite Rate" value={result ? `${Number(result.compositeRate).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Current Value" value={result ? `${Number(result.value).toLocaleString()}` : "—"} />
                <ResultCard label="Interest Earned" value={result ? `${Number(result.interest).toLocaleString()}` : "—"} />
                <ResultCard label="Effective Annual Yield" value={result ? `${Number(result.effectiveYield).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏛️ I-Bonds Calculator USA 2026 — Inflation-Protected Savings — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator estimates the value of a Series I savings bond using the fixed rate and semiannual inflation rate you enter. The defaults now reflect I bonds issued May–October 2026: 0.90% fixed rate and 1.67% semiannual inflation rate, which combine to the published 4.26% composite rate.</p>
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
          title="I-Bonds Calculator USA 2026 — Inflation-Protected Savings"
          category="finance"
          intro="This calculator estimates the value of a Series I savings bond using the fixed rate and semiannual inflation rate you enter. The defaults now reflect I bonds issued May–October 2026: 0.90% fixed rate and 1.67% semiannual inflation rate, which combine to the published 4.26% composite rate."
          howItWorks="The Treasury composite-rate formula is fixed rate + (2 × semiannual inflation rate) + (fixed rate × semiannual inflation rate). The model compounds that annualized composite rate semiannually and subtracts three months from the earning period when the holding period is under five years. Real I-bond rates reset every six months, so projecting one current composite rate unchanged for years is only a scenario."
          tipsSection="I bonds cannot be redeemed during the first 12 months. If redeemed before five years, Treasury deducts the last three months of interest. The electronic annual purchase limit is $10,000 per Social Security number; the federal-refund paper I-bond purchase program has ended."
          conclusion="Use the projection for a current-rate scenario and verify the bond's actual issue-date rate history on TreasuryDirect before making a redemption or purchase decision."
          benefits={[
            { title: "Calculator results", text: "Results follow the calculation methodology and assumptions explained on this page." },
            { title: "100% Private", text: "Everything runs in your browser. No data stored or transmitted." },
            { title: "Available without a paid plan", text: "No account is required to run the calculation." },
          ]}
          useCases={[
            { title: "Personal Planning", text: "Use the calculator inputs to test a concrete planning scenario." },
            { title: "Scenario Comparison", text: "Compare the result after changing the input that matters to this calculation." },
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
