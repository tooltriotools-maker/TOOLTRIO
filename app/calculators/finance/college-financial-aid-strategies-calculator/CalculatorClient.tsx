'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateCollegeAidStrategies } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [parentIncome,setParentIncome]=useState(120000)
  const [parentAssets,setParentAssets]=useState(350000)
  const [studentIncome,setStudentIncome]=useState(5000)
  const [studentAssets,setStudentAssets]=useState(8000)
  const [homeEquity,setHomeEquity]=useState(180000)
  const result=useMemo(()=>{try{return calculateCollegeAidStrategies(parentIncome,parentAssets,studentIncome,studentAssets,homeEquity,0)}catch(e){return null}},[parentIncome, parentAssets, studentIncome, studentAssets, homeEquity])
  return(
    <CalculatorLayout title="College Financial Aid Strategy Calculator USA 2026" description="Calculate your FAFSA Student Aid Index and strategies to legally reduce it — maximizing need-based financial aid for college." icon="🎓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="college-financial-aid-strategies-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Parent Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={parentIncome} onChange={e=>setParentIncome(Number(e.target.value))} step={2000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Parent Assets ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={parentAssets} onChange={e=>setParentAssets(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Student Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={studentIncome} onChange={e=>setStudentIncome(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Student Assets ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={studentAssets} onChange={e=>setStudentAssets(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Home Equity ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={homeEquity} onChange={e=>setHomeEquity(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Estimated SAI" value={result?`${Number(result.estimatedSAI).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Parent Income Assessment" value={result?`${Number(result.assessedParentIncome).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Parent Asset Assessment" value={result?`${Number(result.assessedParentAssets).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Student Asset Assessment" value={result?`${Number(result.assessedStudentAssets).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Home Equity Impact" value={result?`${Number(result.homeEquityImpact).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🎓 College Financial Aid Strategy Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate your FAFSA Student Aid Index and strategies to legally reduce it — maximizing need-based financial aid for college.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How College Financial Aid Strategy Calculator Works</h2><p className="text-sm leading-6 text-gray-700">The existing model applies simplified assessment rates: parent income above a $30,000 allowance at 22%, parent assets above $10,000 at 5.6%, student income above $7,600 at 50%, and student assets at 20%. It then sums those amounts. These are modelling shortcuts, not the complete federal SAI formula.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Enter parent income/assets and student income/assets as requested. Home equity is shown as a separate hypothetical impact, even though primary-home equity is not reported as an investment asset on the FAFSA. School-specific institutional aid forms can treat assets differently.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">“Estimated SAI” is a ToolTrio scenario score generated by the simplified formula above. Do not use it as the SAI from an official FAFSA submission or to predict a specific aid package; colleges also consider cost of attendance and available aid.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: with $100,000 parent income, $50,000 parent assets, $5,000 student income and $10,000 student assets, the simplified model assesses about $15,400 of parent income, $2,240 of parent assets and $2,000 of student assets before rounding.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">Federal Student Aid uses a detailed statutory SAI formula with allowances and family information not collected here. This calculator also does not model Pell Grant eligibility, school-specific institutional methodology or professional-judgment adjustments.</p></section>
        </Card>
        <SEOContent title="College Financial Aid Strategy Calculator" category="finance" intro="Explore how income and asset categories affect ToolTrio’s simplified college-aid model. It can help users see why student assets and parent assets are treated differently in this model, but it is not an official FAFSA Student Aid Index calculator." howItWorks="The existing model applies simplified assessment rates: parent income above a $30,000 allowance at 22%, parent assets above $10,000 at 5.6%, student income above $7,600 at 50%, and student assets at 20%. It then sums those amounts. These are modelling shortcuts, not the complete federal SAI formula." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
