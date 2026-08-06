'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateBusinessStartupCosts } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [oneTimeCosts,setOneTimeCosts]=useState(45000)
  const [monthlyOverhead,setMonthlyOverhead]=useState(8500)
  const [monthlyRevenue,setMonthlyRevenue]=useState(25000)
  const [grossMargin,setGrossMargin]=useState(55)
  const [loanAmount,setLoanAmount]=useState(100000)
  const [loanRate,setLoanRate]=useState(11)
  const result=useMemo(()=>{try{return calculateBusinessStartupCosts(oneTimeCosts,monthlyOverhead,monthlyRevenue,grossMargin,loanAmount,loanRate)}catch(e){return null}},[oneTimeCosts, monthlyOverhead, monthlyRevenue, grossMargin, loanAmount, loanRate])
  return(
    <CalculatorLayout title="Business Startup Cost & Break-Even Calculator USA 2026" description="Calculate business startup break-even timeline, monthly cash flow, and 3-year profitability — including SBA loan payments." icon="🏢" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="business-startup-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">One-Time Startup Costs ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={oneTimeCosts} onChange={e=>setOneTimeCosts(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Monthly Overhead ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyOverhead} onChange={e=>setMonthlyOverhead(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Monthly Revenue Target ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyRevenue} onChange={e=>setMonthlyRevenue(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Gross Margin (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={grossMargin} onChange={e=>setGrossMargin(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">SBA Loan Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={loanAmount} onChange={e=>setLoanAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Loan Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={loanRate} onChange={e=>setLoanRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Monthly Profit" value={result?`${Number(result.monthlyProfit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Monthly Cash Flow" value={result?`${Number(result.netMonthlyCashFlow).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Break-Even Months" value={result?`${Number(result.breakEvenMonths)} months`:"-"}/>
                <ResultCard label="Year 1 Profit" value={result?`${Number(result.year1Profit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Year 3 Profit" value={result?`${Number(result.year3Profit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="3-Year ROI" value={result?`${Number(result.roi3yr).toFixed(1)}%`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏢 Business Startup Cost & Break-Even Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate business startup break-even timeline, monthly cash flow, and 3-year profitability — including SBA loan payments.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Business Startup Cost & Break-Even Calculator USA 2026" category="finance" intro={`Estimate startup cash flow from one-time launch costs, monthly overhead, revenue, gross margin and an optional five-year loan. The calculator shows operating contribution, debt payment, modeled break-even timing and three-year profitability.`} howItWorks={`Monthly operating profit = revenue × gross margin − overhead. If a loan is entered, the payment uses a standard 60-month amortizing-loan formula. The current break-even calculation divides one-time costs plus the loan amount by monthly operating profit, while yearly profit subtracts loan payments and year one also subtracts startup costs.`} tipsSection={`Important limitation: treating borrowed loan principal as part of “startup investment” can overstate the current break-even numerator because the loan finances costs rather than necessarily adding a separate economic cost. Year three also assumes a hard-coded 20% profit increase. Use the outputs as scenarios, not accounting forecasts.`} conclusion={`Test conservative revenue and margin cases and build a separate cash-flow forecast before committing capital or debt.`}
          benefits={[{title:"Calculator-specific model",text:"Methodology is explained so you can see what the output assumes."},{title:"Scenario testing",text:"Change the inputs to compare outcomes that matter to this calculation."},{title:"Private",text:"Inputs are calculated locally in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the modeled result before taking the next planning step."},{title:"Assumption check",text:"See which inputs have the largest effect on the result."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
