'use client'
import { calculateNetInvestmentIncomeTax } from '@/lib/calculations/finance'
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
  const [wages, setWages] = useState(180000)
  const [investmentIncome, setInvestmentIncome] = useState(50000)

  const result = useMemo(() => {
    try {
      return calculateNetInvestmentIncomeTax(wages, investmentIncome, 'single')
    } catch(e) { return null }
  }, [wages, investmentIncome])

  return (
    <CalculatorLayout
      title="Net Investment Income Tax (NIIT) Calculator USA 2026"
      description="Calculate the 3.8% Net Investment Income Tax on dividends, capital gains, and rental income above the $200K/$250K threshold."
      icon="💹"
      category="Finance"
      structuredData={}
      relatedCalculators={relatedCalculators}
      slug="net-investment-income-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">W-2 / Ordinary Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={wages} onChange={e => setWages(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investmentIncome} onChange={e => setInvestmentIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Income" value={result ? `${Number(result.totalIncome).toLocaleString()}` : "—"} highlight />
                <ResultCard label="NIIT Base" value={result ? `${Number(result.niitBase).toLocaleString()}` : "—"} />
                <ResultCard label="NIIT Owed (3.8%)" value={result ? `${Number(result.niitOwed).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💹 Net Investment Income Tax (NIIT) Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The 3.8% Net Investment Income Tax is an add-on tax on investment income for higher earners — effectively raising the capital gains rate to 18.8% or 23.8% for those above the threshold. On $50,000 of capital gains above the $200,000 threshold, NIIT adds $1,900. Tax-loss harvesting and retirement account contributions are the primary tools for reducing NIIT exposure.</p>
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
          title="Net Investment Income Tax (NIIT) Calculator USA 2026"
          category="finance"
          intro="The 3.8% Net Investment Income Tax is an add-on tax on investment income for higher earners — effectively raising the capital gains rate to 18.8% or 23.8% for those above the threshold. On $50,000 of capital gains above the $200,000 threshold, NIIT adds $1,900. Tax-loss harvesting and retirement account contributions are the primary tools for reducing NIIT exposure."
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
