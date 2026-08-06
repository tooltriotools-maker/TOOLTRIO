'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateTaxEfficientWithdrawal } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [traditionalIRA,setTraditionalIRA]=useState(800000)
  const [rothIRA,setRothIRA]=useState(350000)
  const [taxableAccount,setTaxableAccount]=useState(200000)
  const [annualNeed,setAnnualNeed]=useState(80000)
  const [taxRate,setTaxRate]=useState(22)
  const [age,setAge]=useState(68)
  const result=useMemo(()=>{try{return calculateTaxEfficientWithdrawal(traditionalIRA,rothIRA,taxableAccount,annualNeed,taxRate,age)}catch(e){return null}},[traditionalIRA, rothIRA, taxableAccount, annualNeed, taxRate, age])
  return(
    <CalculatorLayout title="Tax-Efficient Retirement Withdrawal Calculator USA 2026" description="Optimize which retirement accounts to withdraw from first — minimizing taxes by sequencing Traditional IRA, Roth IRA, and taxable account withdrawals." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="tax-efficient-withdrawal-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Traditional IRA ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={traditionalIRA} onChange={e=>setTraditionalIRA(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Roth IRA ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={rothIRA} onChange={e=>setRothIRA(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Taxable Account ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxableAccount} onChange={e=>setTaxableAccount(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Need ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={annualNeed} onChange={e=>setAnnualNeed(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="From Traditional IRA" value={result?`${Number(result.fromTraditional).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="From Roth IRA" value={result?`${Number(result.fromRoth).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="From Taxable Account" value={result?`${Number(result.fromTaxable).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Tax" value={result?`${Number(result.totalTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Net Income After Tax" value={result?`${Number(result.netIncome).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Effective Rate" value={result?`${Number(result.effectiveRate).toFixed(1)}%`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💰 Tax-Efficient Retirement Withdrawal Calculator USA 2026</h2><p className="text-sm text-gray-600">Optimize which retirement accounts to withdraw from first — minimizing taxes by sequencing Traditional IRA, Roth IRA, and taxable account withdrawals.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How Tax-Efficient Retirement Withdrawal Calculator Works</h2><p className="text-sm leading-6 text-gray-700">At age 73+, the current code estimates an RMD as Traditional IRA ÷ 26.5. It then fills the remaining annual need from Roth, then taxable, then additional Traditional funds. Traditional withdrawals use the entered tax rate and taxable-account withdrawals use a fixed 15% tax assumption.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Enter account balances, desired annual withdrawal, assumed ordinary-income tax rate and age. The taxable-account balance is not the same as taxable gain: actual tax depends on cost basis, holding periods, dividends and realized gains.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">The allocation cards show the modelled source of the requested withdrawal and estimated tax. Net income equals requested annual need minus modelled tax, so users who need a specific after-tax spending amount may need to enter a larger gross withdrawal.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: at age 73 with a $530,000 Traditional IRA, the model’s 26.5 divisor gives a $20,000 RMD. If annual need is $60,000, the remaining $40,000 is drawn from Roth first under the current sequencing logic.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">RMD rules depend on birth year, account type and the applicable IRS life-expectancy table. The calculator hard-codes one divisor for all ages 73+, does not model progressive brackets, basis, Social Security taxation, Medicare IRMAA or state taxes, and therefore should not be used to determine an actual RMD or tax liability.</p></section>
        </Card>
        <SEOContent title="Tax-Efficient Retirement Withdrawal Calculator" category="finance" intro="Model how an annual retirement spending need could be split among Traditional IRA, Roth IRA and taxable balances under the calculator’s simplified sequencing rules. It is a scenario tool, not a tax-return or RMD calculator." howItWorks="At age 73+, the current code estimates an RMD as Traditional IRA ÷ 26.5. It then fills the remaining annual need from Roth, then taxable, then additional Traditional funds. Traditional withdrawals use the entered tax rate and taxable-account withdrawals use a fixed 15% tax assumption." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
