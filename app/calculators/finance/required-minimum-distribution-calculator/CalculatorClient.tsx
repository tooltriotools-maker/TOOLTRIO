'use client'
import { calculateRMD } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [accountBalance, setAccountBalance] = useState(750000)
  const [age, setAge] = useState(73)

  const result = useMemo(() => {
    try {
      return calculateRMD(accountBalance, age, 'traditional-ira')
    } catch(e) { return null }
  }, [accountBalance, age])

  return (
    <CalculatorLayout
      title="Required Minimum Distribution (RMD) Calculator USA 2026"
      description="Calculate your IRS Required Minimum Distribution from Traditional IRA, 401k, or inherited accounts using 2026 IRS Uniform Lifetime Tables."
      icon="📋"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="required-minimum-distribution-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Account Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={accountBalance} onChange={e => setAccountBalance(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="This Year's RMD" value={result ? `${Number(result.rmd).toLocaleString()}` : "—"} highlight />
                <ResultCard label="IRS Distribution Factor" value={result ? String(result.factor) : "—"} />
                <ResultCard label="Penalty If Missed (25%)" value={result ? `${Number(result.penaltyIfMissed).toLocaleString()}` : "—"} />
              </div>
              {result?.yearlyProjection && result.yearlyProjection.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearlyProjection} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
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
                <h2 className="text-lg font-black text-gray-900 mb-3">📋 Required Minimum Distribution (RMD) Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Required Minimum Distributions force taxable withdrawals from pre-tax retirement accounts starting at age 73. The IRS Uniform Lifetime Table (Publication 590-B) sets the distribution factor based on your age — your balance divided by this factor equals your RMD. Missing your RMD triggers a 25% excise tax penalty.</p>
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
          title="Required Minimum Distribution (RMD) Calculator USA 2026"
          category="finance"
          intro="Required Minimum Distributions force taxable withdrawals from pre-tax retirement accounts starting at age 73. The IRS Uniform Lifetime Table (Publication 590-B) sets the distribution factor based on your age — your balance divided by this factor equals your RMD. Missing your RMD triggers a 25% excise tax penalty."
          howItWorks="The calculator divides the prior year-end retirement-account balance you enter by the Uniform Lifetime Table factor for your age. For example, age 73 uses a 26.5 divisor in the code, so a $750,000 balance produces an RMD of about $28,302."
          tipsSection="The projection is only a scenario: it assumes the account balance declines 5% per year before applying later age factors. That is not an IRS forecast and is not an investment-return assumption you should rely on."
          conclusion="This implementation supports Uniform Lifetime factors from ages 73–100 and is not suitable for every inherited-account or spouse-more-than-10-years-younger situation. Verify the applicable IRS table and beginning age for your circumstances."
          benefits={[
            { title: "Real-Time USA Results", text: "Calculator-specific scenario outputs based on the inputs and assumptions described above." },
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
