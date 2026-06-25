'use client'
import { calculateHELOC } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [homeValue, setHomeValue] = useState(450000)
  const [mortgageBalance, setMortgageBalance] = useState(250000)
  const [creditLimit, setCreditLimit] = useState(85)
  const [drawAmount, setDrawAmount] = useState(50000)
  const [apr, setApr] = useState(8.75)
  const [drawPeriodYears, setDrawPeriodYears] = useState(10)
  const [repayPeriodYears, setRepayPeriodYears] = useState(20)

  const result = useMemo(() => {
    try {
      return calculateHELOC(homeValue, mortgageBalance, creditLimit, drawAmount, apr, drawPeriodYears, repayPeriodYears)
    } catch(e) { return null }
  }, [homeValue, mortgageBalance, creditLimit, drawAmount, apr, drawPeriodYears, repayPeriodYears])

  return (
    <CalculatorLayout
      title="HELOC Calculator USA 2026 — Home Equity Line of Credit"
      description="Calculate HELOC payments, draw period interest, repayment costs and compare against cash-out refinance."
      icon="🏡"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="heloc-credit-line-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Home Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={homeValue} onChange={e => setHomeValue(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Mortgage Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={mortgageBalance} onChange={e => setMortgageBalance(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Credit Limit (% of equity)</label>
              <span className="text-xs font-bold text-green-600">{creditLimit}%</span>
            </div>
            <input type="range" min={60} max={95} step={1} value={creditLimit} onChange={e => setCreditLimit(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400"><span>60%</span><span>95%</span></div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Draw Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={drawAmount} onChange={e => setDrawAmount(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">APR (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={apr} onChange={e => setApr(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Draw Period (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={drawPeriodYears} onChange={e => setDrawPeriodYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Repayment Period (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={repayPeriodYears} onChange={e => setRepayPeriodYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Home Equity" value={result ? `${Number(result.equity).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Max Credit Line" value={result ? `${Number(result.maxCredit).toLocaleString()}` : "—"} />
                <ResultCard label="Draw Payment (interest only)" value={result ? `${Number(result.interestOnlyPayment).toLocaleString()} /mo` : "—"} />
                <ResultCard label="Repayment Payment" value={result ? `${Number(result.repayPayment).toLocaleString()} /mo` : "—"} />
                <ResultCard label="Total Interest Cost" value={result ? `${Number(result.totalCost).toLocaleString()}` : "—"} />
                <ResultCard label="Current LTV" value={result ? `${Number(result.ltv).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏡 HELOC Calculator USA 2026 — Home Equity Line of Credit — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">A Home Equity Line of Credit (HELOC) lets you borrow against your home equity up to an approved limit, typically at a variable rate tied to the Prime Rate. With average US home equity at record highs in 2026, HELOCs are among the most cost-effective borrowing tools available — IF you understand the draw period, repayment structure, and total interest cost.</p>
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
          title="HELOC Calculator USA 2026 — Home Equity Line of Credit"
          category="finance"
          intro="A Home Equity Line of Credit (HELOC) lets you borrow against your home equity up to an approved limit, typically at a variable rate tied to the Prime Rate. With average US home equity at record highs in 2026, HELOCs are among the most cost-effective borrowing tools available — IF you understand the draw period, repayment structure, and total interest cost."
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
