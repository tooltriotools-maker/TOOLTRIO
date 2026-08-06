'use client'
import { calculateEmergencyFundInHYSA } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [monthlyExpenses, setMonthlyExpenses] = useState(4500)
  const [monthsCoverage, setMonthsCoverage] = useState(6)
  const [currentBalance, setCurrentBalance] = useState(8000)
  const [hysa_rate, setHysa_rate] = useState(4.85)
  const [inflationRate, setInflationRate] = useState(3.0)

  const result = useMemo(()=>{
    try{return calculateEmergencyFundInHYSA(monthlyExpenses, monthsCoverage, currentBalance, hysa_rate, inflationRate)}catch(e){return null}
  },[monthlyExpenses, monthsCoverage, currentBalance, hysa_rate, inflationRate])

  return (
    <CalculatorLayout title="Emergency Fund & HYSA Calculator USA 2026" description="Calculate your ideal emergency fund size, HYSA interest earnings, real return after inflation, and optimal allocation between liquid and semi-liquid savings." icon="🏦" category="Finance" relatedCalculators={relatedCalculators} slug="emergency-fund-hysa-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyExpenses} onChange={e=>setMonthlyExpenses(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Months of Coverage</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={monthsCoverage} onChange={e=>setMonthsCoverage(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Savings ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentBalance} onChange={e=>setCurrentBalance(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">HYSA Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hysa_rate} onChange={e=>setHysa_rate(Number(e.target.value))} step={0.05} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Inflation Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={inflationRate} onChange={e=>setInflationRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Target Emergency Fund" value={result ? `${Number(result.targetFund).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Current Gap" value={result ? `${Number(result.gap).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual HYSA Interest" value={result ? `${Number(result.annualInterest).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Monthly Interest" value={result ? `${Number(result.monthlyInterest).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Real Return After Inflation" value={result ? `${Number(result.realRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Months to Fully Funded" value={result ? `${Number(result.timeToFundMonths).toLocaleString()} months` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏦 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Your emergency fund should live in a high-yield savings account earning 4.5-5.5% APY in 2026 — not a 0.01% traditional savings account. On a $27,000 emergency fund (6 months × $4,500), the difference is $1,350/year in interest. This calculator shows your target, gap, and real return after inflation.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Emergency Fund & HYSA Calculator USA 2026" category="finance"
          intro={'This emergency-fund calculator starts with your own monthly expenses and desired months of coverage, then measures the gap from your current cash balance. It separately estimates simple annual HYSA interest, a rate-minus-inflation figure, and a modeled funding timeline.'}
          howItWorks={'Target fund = monthly expenses × months of coverage. Gap = target − current balance, floored at zero. Annual interest is current balance × entered HYSA rate; the displayed real rate is simply HYSA rate − inflation rate. For an underfunded account, the code assumes future saving equal to 15% of monthly expenses plus current monthly interest. It also compares the target fund with a fixed 7% stock-return assumption to display an opportunity-cost figure.'}
          tipsSection={'Enter the APY or rate you can actually obtain and update it when the bank changes rates. The calculator’s 15%-of-expenses monthly saving assumption is not an input, so the displayed months-to-fund may not match your real contribution plan.'}
          conclusion={'Emergency-fund size is personal. The model does not account for taxes on savings interest, changing rates, irregular expenses or different job/insurance risks, and its stock-market comparison is only a hypothetical assumption.'}
          benefits={[{title:'Cash target',text:'Convert your chosen months of expenses into a specific reserve amount.'},{title:'Funding gap',text:'Measure how much additional cash is needed from the current balance.'},{title:'HYSA carrying return',text:'Estimate simple interest and compare the entered nominal rate with inflation.'}]}
          useCases={[{title:'Income uncertainty',text:'Test a larger number of coverage months when you want a bigger liquidity buffer.'},{title:'Rate change',text:'See how a lower or higher HYSA rate changes interest and the model’s opportunity-cost figure.'}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
