'use client'
import { calculateRealEstateCostBasis } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [purchasePrice, setPurchasePrice] = useState(300000)
  const [closingCosts, setClosingCosts] = useState(9000)
  const [improvements, setImprovements] = useState(35000)
  const [depreciation, setDepreciation] = useState(0)
  const [salePrice, setSalePrice] = useState(600000)
  const [sellingCosts, setSellingCosts] = useState(36000)
  const [yearsHeld, setYearsHeld] = useState(7)

  const result = useMemo(() => {
    try {
      return calculateRealEstateCostBasis(purchasePrice, closingCosts, improvements, depreciation, salePrice, sellingCosts, yearsHeld)
    } catch(e) { return null }
  }, [purchasePrice, closingCosts, improvements, depreciation, salePrice, sellingCosts, yearsHeld])

  return (
    <CalculatorLayout
      title="Real Estate Cost Basis & Capital Gains Calculator USA 2026"
      description="Calculate adjusted cost basis, Section 121 exclusion ($250K/$500K), depreciation recapture, and total tax on home or rental sale."
      icon="🏘️"
      category="Finance"
      structuredData={}
      relatedCalculators={relatedCalculators}
      slug="real-estate-cost-basis-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Original Purchase Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Closing Costs at Purchase ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={closingCosts} onChange={e => setClosingCosts(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Capital Improvements ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={improvements} onChange={e => setImprovements(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Depreciation Taken ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={depreciation} onChange={e => setDepreciation(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Sale Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={salePrice} onChange={e => setSalePrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Selling Costs ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={sellingCosts} onChange={e => setSellingCosts(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years Held</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={yearsHeld} onChange={e => setYearsHeld(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Adjusted Cost Basis" value={result ? `${Number(result.adjustedBasis).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Realized Gain" value={result ? `${Number(result.realizedGain).toLocaleString()}` : "—"} />
                <ResultCard label="Section 121 Exclusion" value={result ? `${Number(result.section121Exclusion).toLocaleString()}` : "—"} />
                <ResultCard label="Taxable Gain" value={result ? `${Number(result.taxableGain).toLocaleString()}` : "—"} />
                <ResultCard label="Depreciation Recapture Tax" value={result ? `${Number(result.deprecRecapture).toLocaleString()}` : "—"} />
                <ResultCard label="Net Profit After Tax" value={result ? `${Number(result.netProfit).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏘️ Real Estate Cost Basis & Capital Gains Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Selling a home involves calculating your adjusted cost basis (purchase price + closing costs + improvements - depreciation), subtracting it from sale proceeds, applying any Section 121 exclusion, and determining federal tax on the remaining gain. For rental properties, depreciation recapture adds another layer at 25%. This calculator handles all of it.</p>
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
          title="Real Estate Cost Basis & Capital Gains Calculator USA 2026"
          category="finance"
          intro="Selling a home involves calculating your adjusted cost basis (purchase price + closing costs + improvements - depreciation), subtracting it from sale proceeds, applying any Section 121 exclusion, and determining federal tax on the remaining gain. For rental properties, depreciation recapture adds another layer at 25%. This calculator handles all of it."
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
