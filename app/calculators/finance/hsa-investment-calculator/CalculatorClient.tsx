'use client'
import { calculateHSAGrowth } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [annualContrib, setAnnualContrib] = useState(4400)
  const [age, setAge] = useState(35)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentBalance, setCurrentBalance] = useState(8000)
  const [growthRate, setGrowthRate] = useState(7)
  const [taxRate, setTaxRate] = useState(24)

  const result = useMemo(() => {
    try {
      return calculateHSAGrowth(annualContrib, age, retirementAge, currentBalance, growthRate, taxRate, false)
    } catch(e) { return null }
  }, [annualContrib, age, retirementAge, currentBalance, growthRate, taxRate])

  return (
    <CalculatorLayout
      title="HSA Investment Calculator USA 2026 — Triple Tax Advantage"
      description="Calculate HSA balance at retirement using the triple tax advantage. Compare investing vs spending HSA funds."
      icon="🏥"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="hsa-investment-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualContrib} onChange={e => setAnnualContrib(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Retirement Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current HSA Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Projected Balance at Retirement" value={result ? `${Number(result.finalBalance).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Tax-Equivalent Value" value={result ? `${Number(result.taxEquivalentValue).toLocaleString()}` : "—"} />
                <ResultCard label="Years of Medical Coverage" value={result ? String(result.medicalCoverageYears) : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `$${v >= 1000000 ? (v/1000000).toFixed(1)+'M' : (v/1000).toFixed(0)+'k'}`} />
                        <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']} />
                        <Area type="monotone" dataKey="balance" name="Balance" stroke="#22c55e" strokeWidth={2.5} fill="url(#colorVal)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏥 HSA Investment Calculator USA 2026 — Triple Tax Advantage — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The HSA is arguably the most powerful tax-advantaged account in the US tax code — contributions reduce taxable income, growth is tax-free, and qualified medical withdrawals are never taxed. Investing your HSA rather than spending it immediately creates a powerful medical expense reserve that grows tax-free for decades.</p>
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
          title="HSA Investment Calculator USA 2026 — Triple Tax Advantage"
          category="finance"
          intro="This calculator projects an HSA balance from current balance, annual contribution, age, retirement age and assumed return. It also estimates a tax-equivalent value and a simple medical-spending coverage metric."
          howItWorks="The function caps annual contributions at the applicable 2026 HSA limit plus a $1,000 age-55 catch-up when eligible, compounds annually and adds contributions until retirement. Tax-equivalent value = projected balance ÷ (1 − entered tax rate)."
          tipsSection="For 2026 the federal HSA contribution limits are $4,400 self-only and $8,750 family. This UI models self-only coverage. Eligibility depends on qualifying coverage and other rules; returns and medical costs can differ."
          conclusion="The projection assumes no HSA withdrawals before retirement and a constant return. It is not a forecast of investment performance or future healthcare costs."
          benefits={[
            { title: "Methodology-specific results", text: "Outputs follow the formulas and assumptions described on this page." },
            { title: "100% Private", text: "Everything runs in your browser. No data stored or transmitted." },
            { title: "Free Forever", text: "No signup, no paywall, no hidden costs." },
          ]}
          useCases={[
            { title: "Decision support", text: "Use your own inputs to evaluate the specific calculation shown here." },
            { title: "Assumption testing", text: "Change the inputs that materially drive this calculator and compare the result." },
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
