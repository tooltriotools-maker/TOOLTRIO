'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateFamilyBudget } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [monthlyIncome, setMonthlyIncome] = useState(7500)
  const [housing, setHousing] = useState(2200)
  const [transportation, setTransportation] = useState(650)
  const [food, setFood] = useState(900)
  const [childcare, setChildcare] = useState(800)
  const [savings, setSavings] = useState(750)

  const result = useMemo(()=>{
    try{return calculateFamilyBudget(monthlyIncome,housing,transportation,food,childcare,600,400,savings,300)}catch(e){return null}
  },[monthlyIncome, housing, transportation, food, childcare, savings])

  return (
    <CalculatorLayout title="Family Budget Planner Calculator USA 2026 — 50/30/20 Analysis" description="Create a complete family monthly budget with 50/30/20 breakdown analysis, DTI check, emergency fund timeline, and personalized spending alerts." icon="👨‍👩‍👧" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="family-budget-planner-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Take-Home Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyIncome} onChange={e=>setMonthlyIncome(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Housing (rent/mortgage $)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={housing} onChange={e=>setHousing(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Transportation ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={transportation} onChange={e=>setTransportation(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Food & Groceries ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={food} onChange={e=>setFood(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Childcare ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={childcare} onChange={e=>setChildcare(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Savings ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={savings} onChange={e=>setSavings(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Expenses" value={result ? `${Number(result.totalExpenses).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Monthly Surplus" value={result ? `${Number(result.surplus).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Savings Rate" value={result ? `${Number(result.savingsRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Housing Ratio" value={result ? `${Number(result.housingRatio).toFixed(1)}%` : "—"} />
                <ResultCard label="Emergency Fund Goal" value={result ? `${Number(result.emergencyFundGoal).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Months to Emergency Fund" value={result ? `${Number(result.monthsToEmergencyFund).toLocaleString()} mo` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">👨‍👩‍👧 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">A complete family budget analysis goes beyond listing expenses — it benchmarks your spending ratios against guidelines (housing under 30%, savings above 20%), identifies warning signs (negative surplus, below-10% savings rate), and quantifies your emergency fund timeline. This calculator gives you a full financial health snapshot with personalized alerts for your specific budget.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Family Budget Planner Calculator USA 2026 — 50/30/20 Analysis" category="finance"
          intro={'This family budget tool converts monthly take-home income and six visible spending inputs into a cash surplus, savings rate, housing ratio and a simplified 50/30/20-style breakdown. The current calculation also includes fixed hidden assumptions of $600 insurance, $400 entertainment and $300 debt payments each month.'}
          howItWorks={'Total expenses add housing, transportation, food, childcare, the three fixed categories, and entered savings. Surplus = take-home income − total expenses. Needs include housing, transportation, food, insurance and childcare; wants include the fixed $400 entertainment amount; savings/debt combines entered savings with the fixed $300 debt amount. The emergency-fund goal is six months of housing + food + transportation, and the timeline divides that target by surplus + savings. These are planning heuristics, not underwriting standards.'}
          tipsSection={'Because insurance, entertainment and debt are currently fixed in the code, check those assumptions before relying on the ratios. A budget with materially different costs can be misrepresented until those categories become editable.'}
          conclusion={'Use the alerts as prompts to inspect your cash flow, not as pass/fail financial rules. The 30% housing, 15% debt and 10% savings alert thresholds are ToolTrio heuristics.'}
          benefits={[{title:'Monthly surplus',text:'See whether the modeled household budget ends the month above or below zero.'},{title:'Spending ratios',text:'Compare housing, debt and savings with the calculator’s planning thresholds.'},{title:'Emergency-fund timeline',text:'Estimate a six-month core-expense target using the model’s selected categories.'}]}
          useCases={[{title:'Childcare change',text:'See how a new daycare expense affects surplus and the needs share of the budget.'},{title:'Housing decision',text:'Test the effect of a higher rent or mortgage on the modeled housing ratio and monthly surplus.'}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
