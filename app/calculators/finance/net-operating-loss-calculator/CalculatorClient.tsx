'use client'
import {useState,useMemo} from 'react'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import { calculateNetOperatingLoss } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [businessLoss,setBusinessLoss]=useState(85000)
  const [otherIncome,setOtherIncome]=useState(45000)
  const [priorYearTax,setPriorYearTax]=useState(22000)
  const result=useMemo(()=>{try{return calculateNetOperatingLoss(businessLoss,otherIncome,'single',2,priorYearTax)}catch(e){return null}},[businessLoss, otherIncome, priorYearTax])
  return(
    <CalculatorLayout title="Net Operating Loss (NOL) Calculator USA 2026" description="Calculate your Net Operating Loss, immediate tax offset, carry-forward amount, and present value of future income shielding." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="net-operating-loss-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Business Loss ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={businessLoss} onChange={e=>setBusinessLoss(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Other Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherIncome} onChange={e=>setOtherIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Prior Year Tax Paid ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={priorYearTax} onChange={e=>setPriorYearTax(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Net Operating Loss" value={result?`${Number(result.netOperatingLoss).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Tax Savings Current Year" value={result?`${Number(result.taxSavingsCurrentYear).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Carry-Forward Amount" value={result?`${Number(result.carryForwardAmount).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Future Income Shielded" value={result?`${Number(result.futureIncomeShielded).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="PV of NOL Benefit" value={result?`${Number(result.presentValueOfNOL).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 Net Operating Loss (NOL) Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate your Net Operating Loss, immediate tax offset, carry-forward amount, and present value of future income shielding.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <div className="space-y-6 text-sm text-gray-700 leading-7">
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">How the NOL estimate works</h2><p>This simplified model starts with a business loss and subtracts positive other income to estimate the portion of the loss that remains after the current year. That remainder is shown as a potential net operating loss carryforward. Under the general post-2020 rule, most nonfarming NOLs are carried forward rather than back.</p><p className="mt-3">The 80% rule applies when a post-2017 NOL is deducted in a future year: the deduction is generally limited to 80% of taxable income computed under the statutory rules. It does <em>not</em> mean only 80% of the NOL survives. Accordingly, the calculator now carries forward the full modeled NOL and labels the 80% figure as a future-year usage limitation.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Understanding the inputs</h2><p><strong>Business loss</strong> should represent the loss you want to test, not automatically the NOL reported on a return. <strong>Other income</strong> is used only as a simplified offset in this model. Actual NOL computation modifies taxable income for items such as nonbusiness deductions and capital losses. <strong>Prior-year tax</strong> is relevant only to the calculator’s farming-loss carryback illustration; most taxpayers cannot carry a new NOL back.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Worked example</h2><p>With an $85,000 modeled business loss and $45,000 of other income, this simplified approach leaves a $40,000 potential NOL carryforward. If a later year had $50,000 of taxable income before the NOL deduction, an 80% limitation would cap the post-2017 NOL deduction at $40,000 for that year, subject to the full tax rules.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Important tax limitations</h2><p>This tool cannot reproduce Form 172 or determine an allowable NOL from return-level data. Excess business loss rules, entity type, capital gains and losses, QBI-related adjustments, pre-2018 NOLs, farming losses, and insurance-company rules can change the result. Use the estimate for planning and verify a filing position with the applicable IRS forms or a tax professional.</p><p className="mt-3"><strong>Primary source:</strong> <a className="text-green-700 underline" href="https://www.irs.gov/instructions/i172" target="_blank" rel="noreferrer">IRS Instructions for Form 172</a>.</p></Card>
        </div>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
