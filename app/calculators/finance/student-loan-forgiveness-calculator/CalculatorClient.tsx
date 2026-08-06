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
      return calculateStudentLoanForgiveness(balance, 'ibr', income, familySize, yearsInProgram)
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
          intro="Estimate how this simplified model changes monthly payments, total paid, and a remaining balance that may be forgiven. The current calculator is a planning model, not an eligibility engine: federal repayment programs and forgiveness rules depend on loan type, qualifying employment, payment history, and current Department of Education rules."
          howItWorks="The calculator starts with income and family size, subtracts 150% of its embedded poverty-line amount to estimate discretionary income, then applies the selected repayment-plan percentage. It projects payments for the modeled term and estimates a remaining balance. Important: the code currently selects a SAVE-style 5% payment formula, but SAVE was ended by court order in March 2026, so this output should be treated only as a legacy scenario—not a currently available plan."
          tipsSection="Use your actual federal loan balance and income, then compare the estimate with the repayment options shown in your StudentAid.gov account. PSLF eligibility cannot be determined from balance and income alone; qualifying employer, loan type and qualifying payments matter."
          conclusion="This calculator is useful for scenario planning, but do not use its legacy SAVE output to choose a current repayment plan. Confirm available repayment and forgiveness options with Federal Student Aid or your federal loan servicer."
          benefits={[{title:"Methodology",text:"Explains the calculation actually used on this page."},{title:"Scenario planning",text:"Change inputs to see which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Worked scenario",text:"Use realistic inputs and compare the output with the methodology."},{title:"Decision support",text:"Use the result as an estimate, then verify rules, rates or product terms that apply to you."}]}
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
