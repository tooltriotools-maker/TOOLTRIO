'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateRealEstateTaxStrategy } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [rentalIncome, setRentalIncome] = useState(28800)
  const [mortgage, setMortgage] = useState(18000)
  const [propertyTax, setPropertyTax] = useState(4500)
  const [insurance, setInsurance] = useState(1800)
  const [maintenance, setMaintenance] = useState(3500)
  const [depreciation, setDepreciation] = useState(11600)
  const [taxRate, setTaxRate] = useState(32)
  const result=useMemo(()=>{try{return calculateRealEstateTaxStrategy(rentalIncome,mortgage,propertyTax,insurance,maintenance,depreciation,taxRate,true)}catch(e){return null}},[rentalIncome, mortgage, propertyTax, insurance, maintenance, depreciation, taxRate])
  return(
    <CalculatorLayout title="Rental Property Tax Strategy Calculator USA 2026" description="Calculate rental property tax impact including depreciation deductions, passive activity loss rules, and net tax savings." icon="🏘️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="rental-property-tax-strategy-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Rental Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={rentalIncome} onChange={e=>setRentalIncome(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Mortgage Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={mortgage} onChange={e=>setMortgage(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Property Tax ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={propertyTax} onChange={e=>setPropertyTax(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Insurance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={insurance} onChange={e=>setInsurance(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Maintenance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={maintenance} onChange={e=>setMaintenance(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Depreciation ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={depreciation} onChange={e=>setDepreciation(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Net Taxable Income" value={result?`${Number(result.netTaxableIncome).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Annual Cash Flow" value={result?`${Number(result.cashFlow).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Usable Tax Loss" value={result?`${Number(result.usableLoss).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Tax Savings from Loss" value={result?`${Number(result.actualTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Depreciation Benefit" value={result?`${Number(result.depreciationBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏘️ Rental Property Tax Strategy Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate rental property tax impact including depreciation deductions, passive activity loss rules, and net tax savings.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Rental Property Tax Strategy Calculator" category="finance"
          intro="Separates modeled rental cash flow from taxable rental income by including operating costs and depreciation, then estimates the value of a usable rental loss at the entered tax rate."
          howItWorks="Cash flow subtracts the full entered mortgage payment plus property tax, insurance and maintenance. Taxable-income modeling instead treats 70% of the mortgage field as deductible interest, then adds depreciation. A loss is capped at $25,000 when estimating usable loss."
          tipsSection="Worked example — Example: $28,800 rent can produce positive or negative cash flow independently of taxable income because depreciation reduces taxable income without being a current cash payment."
          conclusion="Important assumptions and limitations — The 70% mortgage-interest assumption is a rough shortcut, not an amortization calculation. The $25,000 special allowance depends on active participation and MAGI phaseouts, and passive-loss, basis and at-risk rules can defer deductions."
          benefits={[
            {title:"What the inputs mean",text:"Use the fields above to model the specific amounts, rates, ages or time horizon described for this calculator."},
            {title:"How to read the results",text:"Treat the outputs as scenario estimates and focus on which assumptions drive the result most strongly."},
            {title:"Decision support",text:"Compare realistic scenarios rather than treating a single result as a prediction or professional recommendation."},
          ]}
          useCases={[
            {title:"Worked scenario",text:"Start with the default example, then replace each input with values that match the situation you are evaluating."},
            {title:"Assumption check",text:"Review the methodology and limitations before relying on the result for a financial, tax, benefit or investment decision."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
