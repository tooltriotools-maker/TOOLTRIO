'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateIRSInstallmentAgreement } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [taxOwed, setTaxOwed] = useState(25000)
  const [canPayMonthly, setCanPayMonthly] = useState(400)
  const result=useMemo(()=>{try{return calculateIRSInstallmentAgreement(taxOwed,canPayMonthly,true)}catch(e){return null}},[taxOwed, canPayMonthly])
  return(
    <CalculatorLayout title="IRS Installment Agreement Calculator USA 2026" description="Calculate IRS installment agreement payments, penalty and interest costs, and total amount owed under a payment plan." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="irs-installment-agreement-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Owed ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={taxOwed} onChange={e=>setTaxOwed(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Monthly Payment Possible ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={canPayMonthly} onChange={e=>setCanPayMonthly(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Owed (w/ penalty & interest)" value={result?`${Number(result.totalOwed).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Monthly Payment" value={result?`${Number(result.monthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
                <ResultCard label="Months to Pay Off" value={result?`${Number(result.monthsToPayoff)} months`:"-"}/>
                <ResultCard label="Setup Fee" value={result?`${Number(result.setupFee).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Extra Cost vs Pay Now" value={result?`${Number(result.extraCostVsPayNow).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Min Payment for 72-Mo Plan" value={result?`${Number(result.threshold72Month).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 What a Payment Plan Actually Costs</h2><p className="text-sm text-gray-600">Spreading ${taxOwed.toLocaleString()} over {result?Number(result.monthsToPayoff):'-'} months adds an estimated ${result?Number(result.extraCostVsPayNow).toLocaleString():'-'} in interest, penalties, and fees versus paying the balance today.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="IRS Installment Agreement Calculator USA 2026"
          category="finance"
          intro={`This calculator estimates the true cost of paying back federal tax debt through an IRS installment agreement (Form 9465) — including the interest and reduced penalty that keep accruing while you pay, plus the setup fee.\n\nIt's for anyone who owes the IRS more than they can pay in full right now and is deciding between an installment agreement, other financing (like a personal loan or 0% credit card offer), or an Offer in Compromise for severe hardship cases.\n\nThe two inputs are what you owe and what you can realistically afford to pay each month — the calculator uses those to estimate your total payoff timeline, the extra cost of stretching payments out, and the minimum payment that would qualify you for the IRS's streamlined 72-month plan.`}
          howItWorks={`Once an installment agreement is in place, the IRS keeps charging interest at the federal short-term rate plus 3 percentage points (adjusted quarterly, roughly 6-8% annually as of 2026) on the unpaid balance, plus a reduced failure-to-pay penalty of 0.25% per month (half the standard 0.5% rate that applies before an agreement is approved).\n\nTotal Owed = Tax Owed + Interest + Penalty\n\nMonths to Payoff = ceil(Total Owed / Monthly Payment)\n\nThe calculator also estimates your setup fee based on whether your proposed monthly payment meets the IRS's streamlined benchmark — roughly your balance divided by 72 months. Meeting that benchmark typically qualifies you for the IRS's lower online, direct-debit setup fee; falling short of it usually means a higher fee and, for larger balances, may require submitting a financial disclosure statement (Form 433-F) so the IRS can verify what you can actually afford.\n\nExtra Cost vs. Pay Now compares what you'll pay in total under the installment plan against simply paying the original balance today — this is the real price of spreading payments out, separate from the tax itself.`}
          benefits={[
            {title:"Total Cost With Interest & Penalty", text:"See your full projected balance including the interest and reduced failure-to-pay penalty that accrue during the plan."},
            {title:"Realistic Payoff Timeline", text:"See how many months it will take to clear the balance at your proposed monthly payment."},
            {title:"Estimated Setup Fee", text:"See which IRS setup fee tier your proposed payment likely falls into."},
            {title:"Extra Cost of Financing", text:"See exactly how much more you'll pay in total by spreading the balance out instead of paying it off immediately."},
          ]}
          useCases={[
            {title:"Owing more than you can pay by the filing deadline", text:"A taxpayer who owes $12,000 but can only spare $300/month wants to see their realistic payoff timeline and total cost before calling the IRS or applying online."},
            {title:"Comparing an IRS plan against a personal loan", text:"Someone with decent credit wants to compare the IRS's blended interest-and-penalty rate against a bank personal loan or 0% intro-APR credit card offer to see which is actually cheaper."},
            {title:"Deciding how much extra to pay each month", text:"A taxpayer already in a plan wants to see how increasing their monthly payment shortens the timeline and reduces the total interest paid, since IRS interest compounds daily on the remaining balance."},
          ]}
          mistakesDetailed={[
            {mistake: "Assuming interest stops once a payment plan is approved", fix: "Interest keeps accruing on the unpaid balance for the life of the agreement — a payment plan reduces the penalty rate, but it doesn't pause interest, so paying more than the minimum whenever possible reduces total cost."},
            {mistake: "Proposing a monthly payment you can't sustain", fix: "A defaulted installment agreement is treated as if it never existed, which can restart collection actions and require reapplying — propose a payment you can reliably make every month, even if it means a longer timeline."},
            {mistake: "Not exploring a short-term plan first", fix: "If you can realistically pay off the balance within 180 days, the IRS's short-term payment plan typically carries no setup fee at all — it's worth checking before committing to a longer-term agreement with fees attached."},
          ]}
          tipsSection={`Setting up direct debit (automatic payments pulled from your bank account) typically qualifies for the lowest available setup fee and lowers the risk of an accidental missed payment causing default — it's usually worth the small loss of manual control.\n\nIRS interest and penalty rates are adjusted quarterly, so the total cost estimated here is based on current approximate rates and can shift slightly over a multi-year payoff. Confirm your exact rate and current fee schedule at [IRS.gov](https://www.irs.gov/payments/payment-plans-installment-agreements) before applying, since the rate published there is updated each quarter.`}
          conclusion={`An IRS installment agreement is rarely the cheapest way to finance a tax debt on paper — the combined interest and penalty typically runs higher than a good personal loan or 0% promotional credit card offer — but it doesn't require a credit check, and it's often the only realistic option available. The real cost driver in the calculator above isn't the setup fee, it's time: the longer the payoff timeline, the more interest compounds on the outstanding balance.\n\nIf your estimated extra cost feels high relative to your balance, paying more than the calculated minimum each month — even by a modest amount — meaningfully shortens the timeline and reduces total interest paid.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
