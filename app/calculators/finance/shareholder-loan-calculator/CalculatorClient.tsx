'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateShareholderLoan } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [loanAmount,setLoanAmount]=useState(100000)
  const [afr,setAfr]=useState(5.27)
  const [shareholderTaxRate,setShareholderTaxRate]=useState(37)
  const [corporateTaxRate,setCorporateTaxRate]=useState(21)
  const [years,setYears]=useState(5)
  const result=useMemo(()=>{try{return calculateShareholderLoan(loanAmount,afr,shareholderTaxRate,corporateTaxRate,years)}catch(e){return null}},[loanAmount, afr, shareholderTaxRate, corporateTaxRate, years])
  return(
    <CalculatorLayout title="Shareholder Loan Calculator USA 2026 — S-Corp & C-Corp" description="Calculate the tax implications of shareholder loans from closely-held S-corps and C-corps vs dividend distributions — using IRS Applicable Federal Rates." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="shareholder-loan-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Loan Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={loanAmount} onChange={e=>setLoanAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">AFR Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={afr} onChange={e=>setAfr(Number(e.target.value))} step={0.01} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Shareholder Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={shareholderTaxRate} onChange={e=>setShareholderTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Corporate Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={corporateTaxRate} onChange={e=>setCorporateTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Loan Term (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Required Annual Interest" value={result?`${Number(result.annualInterest).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Shareholder Tax on Interest" value={result?`${Number(result.taxOnImputedInterest).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Corporate Deduction Value" value={result?`${Number(result.corporateDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Net Annual Tax Cost" value={result?`${Number(result.netAnnualTaxCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="vs Dividend Distribution" value={result?`${Number(result.vsDistribution).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 Shareholder Loan Calculator USA 2026 — S-Corp & C-Corp</h2><p className="text-sm text-gray-600">Calculate the tax implications of shareholder loans from closely-held S-corps and C-corps vs dividend distributions — using IRS Applicable Federal Rates.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Shareholder Loan Calculator USA 2026 — S-Corp & C-Corp"
          category="finance"
          intro="This calculator models the annual interest and tax effects of a shareholder loan using an entered Applicable Federal Rate (AFR). It is intended to show why a bona fide corporation-shareholder loan needs a real interest rate and documentation. It does not determine whether a particular advance will be respected as debt for tax or legal purposes."
          howItWorks="Annual interest = loan amount × entered AFR. The model treats that interest as shareholder interest income taxed at the entered shareholder rate and as a corporate interest deduction valued at the entered corporate rate. Net annual tax cost = shareholder tax on interest − modeled corporate deduction benefit. Total interest simply multiplies annual interest by years; it does not amortize principal."
          tipsSection="Use the AFR for the loan's actual month and term, not a remembered rate. Real debt characterization depends on facts such as a promissory note, repayment schedule, ability and intent to repay, actual payments and corporate records. Deductibility can also be limited by tax rules not represented here."
          conclusion="Use the model to understand the interest mechanics, then have the loan terms and tax treatment reviewed for the corporation and shareholder involved."
          benefits={[
            { title: "Methodology", text: "See the exact assumptions and calculation sequence used by this ToolTrio model." },
            { title: "Result interpretation", text: "Understand what the outputs mean and which important factors the model leaves out." },
            { title: "Scenario testing", text: "Change the calculator inputs to see which assumptions materially move the result." },
          ]}
          useCases={[
            { title: "Decision comparison", text: "Compare realistic alternatives while keeping the model's assumptions visible." },
            { title: "Assumption check", text: "Use the worked example to verify how the calculator turns inputs into outputs." },
          ]}
          caseStudy={{
            title: "Five-year shareholder note",
            scenario: "A $100,000 note entered at 5% AFR produces $5,000 of modeled annual interest and $25,000 over five years before any principal repayment schedule.",
            result: "At a 32% shareholder rate, the model shows $1,600 of tax on annual interest; at a 21% corporate rate it shows a $1,050 deduction value.",
            takeaway: "Those tax effects assume the interest is recognized/deductible as modeled and the advance is respected as genuine debt."
          }}
          commonMistakes="Use the AFR for the loan's actual month and term, not a remembered rate. Real debt characterization depends on facts such as a promissory note, repayment schedule, ability and intent to repay, actual payments and corporate records. Deductibility can also be limited by tax rules not represented here."
          inlineLinks={[{ text: "IRS publishes AFRs used for various federal tax purposes each month.", href: "https://www.irs.gov/applicable-federal-rates", label: "IRS Applicable Federal Rates" }]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
