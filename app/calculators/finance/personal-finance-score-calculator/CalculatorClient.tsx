'use client'
import { calculatePersonalFinanceScore } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [monthlyIncome, setMonthlyIncome] = useState(7500)
  const [monthlyExpenses, setMonthlyExpenses] = useState(5800)
  const [emergencyFund, setEmergencyFund] = useState(12000)
  const [totalDebt, setTotalDebt] = useState(45000)
  const [retirementSaved, setRetirementSaved] = useState(95000)
  const [creditScore, setCreditScore] = useState(720)
  const [age, setAge] = useState(38)

  const result = useMemo(()=>{
    try{return calculatePersonalFinanceScore(monthlyIncome, monthlyExpenses, emergencyFund, totalDebt, retirementSaved, creditScore, age)}catch(e){return null}
  },[monthlyIncome, monthlyExpenses, emergencyFund, totalDebt, retirementSaved, creditScore, age])

  return (
    <CalculatorLayout title="Personal Finance Score Calculator USA 2026 — Rate Your Financial Health" description="Get a comprehensive 0-100 financial health score across savings rate, emergency fund, debt-to-income, retirement savings, and credit score." icon="📊" category="Finance" relatedCalculators={relatedCalculators} slug="personal-finance-score-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyIncome} onChange={e=>setMonthlyIncome(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyExpenses} onChange={e=>setMonthlyExpenses(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Emergency Fund ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={emergencyFund} onChange={e=>setEmergencyFund(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Debt ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalDebt} onChange={e=>setTotalDebt(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Retirement Saved ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={retirementSaved} onChange={e=>setRetirementSaved(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Credit Score</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={creditScore} onChange={e=>setCreditScore(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Overall Score" value={result ? `${Number(result.totalScore)} / 100` : "—"} highlight />
                <ResultCard label="Grade" value={result ? String(result.grade) : "—"} />
                <ResultCard label="Savings Rate Score" value={result ? `${Number(result.savingsScore)} / 20` : "—"} />
                <ResultCard label="Emergency Fund Score" value={result ? `${Number(result.emergencyScore)} / 20` : "—"} />
                <ResultCard label="Debt Score" value={result ? `${Number(result.debtScore)} / 20` : "—"} />
                <ResultCard label="Top Priority" value={result ? String(result.topPriority) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">A comprehensive personal finance score measures your financial health across the five most predictive dimensions: savings rate, emergency fund adequacy, debt-to-income ratio, retirement progress, and credit score. Understanding where you rank and what to prioritize makes the path to financial health concrete and actionable.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Personal Finance Score Calculator USA 2026 — Rate Your Financial Health" category="finance" intro="Create a five-part planning score from savings rate, emergency-fund coverage, debt relative to annual income, retirement savings relative to the calculator benchmark, and credit score. The score is a ToolTrio heuristic—not a credit score or professional financial-health standard."
          howItWorks="Each category contributes up to 20 points. Savings reaches the model maximum around a 20% savings rate; emergency reserves reach the maximum at six months of expenses; debt points fall as debt-to-income rises; retirement points compare savings with annual income × age/10; and credit points scale from 580 to 850."
          tipsSection="Use the component scores to identify which assumption drives the result instead of treating the letter grade as an objective verdict. The model does not account for assets such as home equity, pension benefits, debt interest rates, insurance needs or household-specific goals."
          conclusion="A higher score means your inputs align more closely with this calculator’s chosen benchmarks. It does not measure investment suitability, borrowing eligibility or overall net worth."
          benefits={[{title:"Methodology",text:"Explains the calculation actually used on this page."},{title:"Scenario planning",text:"Change inputs to see which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Worked scenario",text:"Use realistic inputs and compare the output with the methodology."},{title:"Decision support",text:"Use the result as an estimate, then verify rules, rates or product terms that apply to you."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
