'use client'
import { calculateCapitalGainsTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [purchasePrice, setPurchasePrice] = useState(50000)
  const [salePrice, setSalePrice] = useState(150000)
  const [yearsHeld, setYearsHeld] = useState(2)
  const [income, setIncome] = useState(100000)

  const result = useMemo(() => {
    try {
      return calculateCapitalGainsTax(purchasePrice, salePrice, yearsHeld, 'single', income, false)
    } catch(e) { return null }
  }, [purchasePrice, salePrice, yearsHeld, income])

  return (
    <CalculatorLayout
      title="Capital Gains Tax Calculator USA 2026"
      description="Calculate federal capital gains tax, NIIT, and effective rate on stocks, real estate, crypto, and other assets."
      icon="📈"
      category="Finance"
      structuredData={}
      relatedCalculators={relatedCalculators}
      slug="capital-gains-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Purchase Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Sale Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={salePrice} onChange={e => setSalePrice(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years Held</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={yearsHeld} onChange={e => setYearsHeld(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Capital Gain" value={result ? `${Number(result.gain).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Tax Rate" value={result ? `${Number(result.rate * 100).toFixed(1)}%` : "—"} />
                <ResultCard label="Federal Tax" value={result ? `${Number(result.federalTax).toLocaleString()}` : "—"} />
                <ResultCard label="NIIT (3.8%)" value={result ? `${Number(result.niit).toLocaleString()}` : "—"} />
                <ResultCard label="Total Tax" value={result ? `${Number(result.totalTax).toLocaleString()}` : "—"} />
                <ResultCard label="Net Proceeds" value={result ? `${Number(result.netProceeds).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📈 Capital Gains Tax Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Capital gains tax depends on two things: how long you held the asset and your total taxable income. Long-term gains (1+ year) are taxed at 0%, 15%, or 20%. Short-term gains are taxed as ordinary income (up to 37%). High earners also face the 3.8% Net Investment Income Tax. This calculator shows your exact federal tax on any sale.</p>
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
          title="Capital Gains Tax Calculator USA 2026"
          category="finance"
          intro="Capital gains tax depends on two things: how long you held the asset and your total taxable income. Long-term gains (1+ year) are taxed at 0%, 15%, or 20%. Short-term gains are taxed as ordinary income (up to 37%). High earners also face the 3.8% Net Investment Income Tax. This calculator shows your exact federal tax on any sale."
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
