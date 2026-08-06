'use client'
import { calculateCollegeSavings529 } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [childAge, setChildAge] = useState(5)
  const [collegeStartAge, setCollegeStartAge] = useState(18)
  const [currentBalance, setCurrentBalance] = useState(15000)
  const [monthlyContrib, setMonthlyContrib] = useState(400)
  const [annualCost, setAnnualCost] = useState(35000)
  const [costInflation, setCostInflation] = useState(5)
  const [returnRate, setReturnRate] = useState(7)

  const result = useMemo(() => {
    try {
      return calculateCollegeSavings529(childAge, collegeStartAge, currentBalance, monthlyContrib, annualCost, costInflation, returnRate)
    } catch(e) { return null }
  }, [childAge, collegeStartAge, currentBalance, monthlyContrib, annualCost, costInflation, returnRate])

  return (
    <CalculatorLayout
      title="529 College Savings Calculator USA 2026"
      description="Calculate 529 plan growth, coverage of future college costs, required monthly contributions, and state tax deduction estimates."
      icon="🎓"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="college-savings-529-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Child's Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={childAge} onChange={e => setChildAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">College Start Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={collegeStartAge} onChange={e => setCollegeStartAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current 529 Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual College Cost ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualCost} onChange={e => setAnnualCost(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">College Cost Inflation (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={costInflation} onChange={e => setCostInflation(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Projected 529 Balance" value={result ? `${Number(result.projectedBalance).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Total 4-Year College Cost" value={result ? `${Number(result.totalCollegeCost).toLocaleString()}` : "—"} />
                <ResultCard label="Coverage %" value={result ? `${Number(result.coveragePercent).toFixed(1)}%` : "—"} />
                <ResultCard label="Funding Gap" value={result ? `${Number(result.gap).toLocaleString()}` : "—"} />
                <ResultCard label="Required Monthly (to close gap)" value={result ? `${Number(result.requiredMonthly).toLocaleString()} /mo` : "—"} />
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
                <h2 className="text-lg font-black text-gray-900 mb-3">🎓 529 College Savings Calculator USA 2026 — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">College costs are rising approximately 5% annually — a child born today will face a 4-year public university bill of $200,000+ by age 18. A 529 plan's tax-free growth over 18 years makes it the most efficient college savings vehicle for most families. This calculator shows your projected balance, funding gap, and exact monthly contribution needed to cover 4 years of college.</p>
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
        <SEOContent title="529 College Savings Calculator USA 2026" category="finance"
          intro={'This 529 planner projects an existing college account plus monthly contributions to the child’s college-start age, then compares that balance with four years of tuition-cost assumptions inflated through each college year. It is a funding-gap model, not a financial-aid or state-tax eligibility calculator.'}
          howItWorks={'The account grows annually at the entered investment return and receives 12 monthly contributions as an annual total in the model. Four college years are projected separately using the entered education-cost inflation rate. Funding gap = projected four-year cost − projected 529 balance, floored at zero. The required-monthly figure uses a monthly future-value annuity formula to estimate the additional contribution needed. The displayed state-deduction estimate assumes a 5% benefit on up to $10,000 of annual contributions and is not state-specific law.'}
          tipsSection={'Use a current all-in annual college-cost estimate rather than tuition alone if that matches your goal. Review the assumed return as college approaches because a 529 portfolio may become more conservative over time.'}
          conclusion={'529 tax benefits and state deductions vary, and qualified-expense rules matter. Treat the state-deduction output as a model assumption and verify your own state’s current rules.'}
          benefits={[{title:'Four-year cost projection',text:'Inflate the entered annual college cost through the child’s expected college years.'},{title:'529 funding coverage',text:'Compare the modeled account balance with the projected four-year cost.'},{title:'Contribution gap',text:'Estimate the monthly saving needed to close a modeled shortfall.'}]}
          useCases={[{title:'Young child',text:'Measure how a long contribution horizon changes the effect of investment growth.'},{title:'College approaching',text:'Test how higher current contributions or a lower cost target affects a near-term funding gap.'}]}
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
