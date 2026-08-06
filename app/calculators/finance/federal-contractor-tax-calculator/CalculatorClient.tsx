'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateFederalContractorTax } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [contractRevenue,setContractRevenue]=useState(180000)
  const [businessExpenses,setBusinessExpenses]=useState(15000)
  const [retirement,setRetirement]=useState(35000)
  const result=useMemo(()=>{try{return calculateFederalContractorTax(contractRevenue,'1099',businessExpenses,'VA',retirement)}catch(e){return null}},[contractRevenue, businessExpenses, retirement])
  return(
    <CalculatorLayout title="Federal Contractor Tax Calculator USA 2026" description="Estimate take-home pay for a 1099 federal contractor after business expenses, self-employment tax, a simplified federal income-tax estimate, Virginia tax and retirement contributions." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="federal-contractor-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Contract Revenue ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={contractRevenue} onChange={e=>setContractRevenue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Business Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={businessExpenses} onChange={e=>setBusinessExpenses(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Retirement Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={retirement} onChange={e=>setRetirement(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Gross Revenue" value={result?`${Number(result.grossRevenue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="SE Tax" value={result?`${Number(result.seTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Federal Tax" value={result?`${Number(result.federalTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="State Tax" value={result?`${Number(result.stateTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Tax" value={result?`${Number(result.totalTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Net Take-Home" value={result?`${Number(result.netTakeHome).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏛️ Federal Contractor Tax Calculator USA 2026</h2><p className="text-sm text-gray-600">Estimate take-home pay for a 1099 federal contractor after business expenses, self-employment tax, a simplified federal income-tax estimate, Virginia tax and retirement contributions.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Federal Contractor Tax Calculator USA 2026" category="finance"
          intro={'This calculator is configured for a 1099 contractor in Virginia. It starts with contract revenue, subtracts business expenses, estimates self-employment tax, models a QBI deduction and retirement contribution, then produces federal tax, Virginia tax, total tax and net take-home estimates. It is most useful for cash-flow and quarterly-tax planning when comparing gross contract revenue with spendable income.'}
          howItWorks={'For the current 1099 model, net self-employment income equals contract revenue minus business expenses. Net earnings for self-employment tax are modeled at 92.35% of that amount. The 2026 calculation applies 12.4% Social Security tax up to the $184,500 wage base plus 2.9% Medicare tax, then deducts one-half of estimated self-employment tax. The tool models QBI as 20% of net business income after that deduction, subtracts the entered retirement contribution and the 2026 single standard deduction of $16,100, and applies a simplified 22% federal income-tax rate. Virginia income tax is also simplified as 5.75% of net self-employment income. Actual income tax is progressive and QBI eligibility/limits can materially change the result.'}
          tipsSection={'Use annual contract revenue actually expected to be paid, and enter only ordinary and necessary business expenses you can substantiate. Retirement contributions should reflect the type of plan and your permitted contribution, not an arbitrary target. The quarterly figure is simply one-fourth of this model’s annual tax; IRS required installments depend on withholding, prior-year tax, current-year tax and safe-harbor rules.'}
          conclusion={'Treat the output as a budgeting estimate for a Virginia 1099 contractor. It captures the major difference between gross billings and after-tax cash, but it is not a tax return: filing status, progressive brackets, Additional Medicare Tax, credits, QBI limitations, state deductions and other income are outside this simplified model.'}
          caseStudy={{title:'Independent contractor cash-flow plan',scenario:'A Virginia 1099 contractor expects $180,000 of revenue, $15,000 of deductible business expenses and a $35,000 retirement contribution.',result:'The tool first reduces revenue to $165,000 of net self-employment income, calculates self-employment tax from 92.35% of that amount, then applies its simplified QBI, standard-deduction, federal and Virginia tax assumptions.',takeaway:'The gap between $180,000 of billings and estimated take-home demonstrates why contractors should budget for expenses, payroll-style taxes and income taxes separately.'}}
          scienceSection={'Primary references: [IRS Publication 505 (2026)](https://www.irs.gov/publications/p505) describes estimated-tax planning and the $16,100 single standard deduction; IRS 2026 payroll guidance sets the Social Security wage base at $184,500 and confirms the 6.2% employee/employer Social Security rates and 1.45% Medicare rates. This calculator still uses a simplified flat federal income-tax estimate rather than the full Form 1040 rate schedule.'}
          benefits={[{title:'Self-employment tax',text:'Separates the Social Security and Medicare burden embedded in 1099 work.'},{title:'Expense sensitivity',text:'Shows how documented business expenses reduce modeled net self-employment income.'},{title:'Quarterly reserve',text:'Provides a simple annual-tax ÷ 4 reserve figure for cash-flow planning.'}]}
          useCases={[{title:'Rate negotiation',text:'Translate a contract rate into an estimated after-expense, after-tax amount before comparing it with salaried compensation.'},{title:'Quarterly cash reserve',text:'Estimate how much cash to keep outside operating funds while checking the actual IRS safe-harbor rules separately.'}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
