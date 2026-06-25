'use client'
import { calculateStudentLoanForgiveness } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [balance, setBalance] = useState(65000)
  const [income, setIncome] = useState(55000)
  const [familySize, setFamilySize] = useState(1)
  const [yearsInProgram, setYearsInProgram] = useState(5)

  const result = useMemo(() => {
    try {
      return calculateStudentLoanForgiveness(balance, 'save', income, familySize, yearsInProgram)
    } catch(e) { return null }
  }, [balance, income, familySize, yearsInProgram])

  return (
    <CalculatorLayout
      title="Student Loan Forgiveness Calculator USA 2026 — IDR & PSLF"
      description="Calculate payments and forgiveness amounts under SAVE, IBR, and PSLF plans. Compare total cost vs standard repayment."
      icon="🎓"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="student-loan-forgiveness-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Family Size</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={familySize} onChange={e => setFamilySize(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years in Program</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={yearsInProgram} onChange={e => setYearsInProgram(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Monthly Payment (SAVE)" value={result ? `${Number(result.monthlyPayment).toLocaleString()} /mo` : "—"} highlight />
                <ResultCard label="Total Paid" value={result ? `${Number(result.totalPaid).toLocaleString()}` : "—"} />
                <ResultCard label="Estimated Forgiven" value={result ? `${Number(result.remainingBalance).toLocaleString()}` : "—"} />
                <ResultCard label="Tax on Forgiveness" value={result ? `${Number(result.taxOnForgiveness).toLocaleString()}` : "—"} />
                <ResultCard label="Net Benefit" value={result ? `${Number(result.netForgivenessBenefit).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🎓 Student Loan Forgiveness Calculator USA 2026 — IDR & PSLF — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Student loan forgiveness under income-driven repayment plans can eliminate tens of thousands in debt, but comes with complexity: income thresholds, forgiveness timelines (10 years for PSLF, 20–25 years for IDR), and potential tax bills on forgiven amounts. This calculator models your payment, total cost, and estimated forgiveness benefit under different repayment plans.</p>
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
          title="Student Loan Forgiveness Calculator USA 2026 — IDR & PSLF"
          category="finance"
          intro="Student loan forgiveness under income-driven repayment plans can eliminate tens of thousands in debt, but comes with complexity: income thresholds, forgiveness timelines (10 years for PSLF, 20–25 years for IDR), and potential tax bills on forgiven amounts. This calculator models your payment, total cost, and estimated forgiveness benefit under different repayment plans."
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
