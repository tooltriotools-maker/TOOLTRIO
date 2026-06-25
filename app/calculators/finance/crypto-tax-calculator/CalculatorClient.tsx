'use client'
import { calculateCryptoTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [saleAmount, setSaleAmount] = useState(50000)
  const [costBasis, setCostBasis] = useState(20000)
  const [yearsHeld, setYearsHeld] = useState(1.5)
  const [otherIncome, setOtherIncome] = useState(90000)

  const result = useMemo(() => {
    try {
      return calculateCryptoTax(saleAmount, costBasis, yearsHeld, otherIncome, 'single')
    } catch(e) { return null }
  }, [saleAmount, costBasis, yearsHeld, otherIncome])

  return (
    <CalculatorLayout
      title="Crypto Tax Calculator USA 2026 — Bitcoin, Ethereum & Altcoins"
      description="Calculate federal capital gains tax on cryptocurrency sales, short vs long-term rates, NIIT, and tax-saving strategies."
      icon="₿"
      category="Finance"
      structuredData={}
      relatedCalculators={relatedCalculators}
      slug="crypto-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Sale Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={saleAmount} onChange={e => setSaleAmount(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Cost Basis ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={costBasis} onChange={e => setCostBasis(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years Held</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={yearsHeld} onChange={e => setYearsHeld(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Capital Gain" value={result ? `${Number(result.gain).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Tax Type" value={result ? String(result.isLongTerm ? 'Long-Term' : 'Short-Term') : "—"} />
                <ResultCard label="Tax Rate" value={result ? `${Number(result.taxRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Federal Tax" value={result ? `${Number(result.federalTax).toLocaleString()}` : "—"} />
                <ResultCard label="NIIT" value={result ? `${Number(result.niit).toLocaleString()}` : "—"} />
                <ResultCard label="Net Proceeds" value={result ? `${Number(result.netProceeds).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">₿ Crypto Tax Calculator USA 2026 — Bitcoin, Ethereum & Altcoins — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Cryptocurrency is taxed as property by the IRS, making every trade, sale, and swap a taxable event. Bitcoin held 366 days and sold is a long-term capital gain (0–20%); held 364 days and sold is a short-term ordinary income tax (up to 37%). The difference can be tens of thousands of dollars on large gains — timing matters enormously.</p>
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
          title="Crypto Tax Calculator USA 2026 — Bitcoin, Ethereum & Altcoins"
          category="finance"
          intro="Cryptocurrency is taxed as property by the IRS, making every trade, sale, and swap a taxable event. Bitcoin held 366 days and sold is a long-term capital gain (0–20%); held 364 days and sold is a short-term ordinary income tax (up to 37%). The difference can be tens of thousands of dollars on large gains — timing matters enormously."
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
