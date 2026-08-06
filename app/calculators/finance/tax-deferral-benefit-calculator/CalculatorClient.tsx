'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateTaxDeferralBenefit } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [annualContrib, setAnnualContrib] = useState(10000)
  const [taxRate, setTaxRate] = useState(24)
  const [years, setYears] = useState(30)
  const [returnRate, setReturnRate] = useState(7)
  const result=useMemo(()=>{try{return calculateTaxDeferralBenefit(annualContrib,taxRate,years,returnRate,'traditional')}catch(e){return null}},[annualContrib, taxRate, years, returnRate])
  return(
    <CalculatorLayout title="Tax Deferral Benefit Calculator USA 2026" description="Compare after-tax wealth from Traditional IRA, Roth IRA, and taxable accounts over any time horizon." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="tax-deferral-benefit-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualContrib} onChange={e=>setAnnualContrib(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Expected Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={returnRate} onChange={e=>setReturnRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Traditional IRA Final" value={result?`${Number(result.traditionalAfterTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Roth IRA Final" value={result?`${Number(result.rothFinal).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Taxable Account Final" value={result?`${Number(result.taxableFinal).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Roth vs Taxable Advantage" value={result?`${Number(result.rothAdvantageVsTaxable).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Traditional vs Taxable" value={result?`${Number(result.traditionalAdvantageVsTaxable).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>
              {result?.yearData&&result.yearData.length>0&&(
                <Card><h3 className="text-sm font-semibold text-gray-700 mb-2">Projection</h3>
                  <div style={{height:200}}><ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                      <defs><linearGradient id="cgb7" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                      <XAxis dataKey={result.yearData[0]?.age!==undefined?"age":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={60} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                      <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                      <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age'].includes(k))[0]||'balance'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cgb7)"/>
                    </AreaChart>
                  </ResponsiveContainer></div>
                </Card>)}
            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📊 Tax Deferral Benefit Calculator USA 2026</h2><p className="text-sm text-gray-600">Compare after-tax wealth from Traditional IRA, Roth IRA, and taxable accounts over any time horizon.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Tax Deferral Benefit Calculator USA 2026" category="finance" intro="Compare three simplified savings paths using the same pre-tax budget: Traditional, Roth and taxable. The model highlights the effect of paying tax before contribution, after withdrawal, or through an assumed annual tax drag." howItWorks="Traditional receives the full annual contribution, compounds tax-deferred, then applies the entered tax rate to the ending balance. Roth and taxable receive annual contribution × (1 − tax rate) because the model assumes contributions come from after-tax dollars. Roth compounds at the full return; taxable compounds at 85% of the entered return as a fixed tax-drag assumption." tipsSection="The 15% taxable-account drag is a modeling shortcut and is not a tax rate. The calculator also uses one tax rate for both current and future Traditional taxation and does not model deductions, Roth income eligibility, RMDs, capital-gain realization, dividends or account fees. For 2026, the IRA contribution limit is $7,500 ($8,600 age 50+), so inputs above the applicable limit are hypothetical unless modeling another account type." conclusion="Use the comparison to understand tax timing, not to choose an account solely from the largest displayed balance."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
