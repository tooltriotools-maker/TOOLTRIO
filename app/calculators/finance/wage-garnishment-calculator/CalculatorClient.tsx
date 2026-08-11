'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateWageGarnishment } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [disposableWeeklyPay, setDisposableWeeklyPay] = useState(936)
  const result = useMemo(()=>{try{return calculateWageGarnishment(disposableWeeklyPay,'creditCard')}catch(e){return null}},[disposableWeeklyPay])
  return (
    <CalculatorLayout title="Wage Garnishment Calculator USA 2026" description="Estimate the federal CCPA ceiling for an ordinary consumer-debt wage garnishment from disposable weekly earnings." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="wage-garnishment-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Disposable Weekly Earnings</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={disposableWeeklyPay} onChange={e=>setDisposableWeeklyPay(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">/wk</span>
            </div>
            <p className="text-[11px] text-gray-400">Enter the disposable earnings used for the federal garnishment calculation. This page models the federal baseline for ordinary consumer debt; state law and other debt types can change the result.</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Disposable Income" value={result?`${Number(result.disposableIncome).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Weekly Garnishment" value={result?`${Number(result.weeklyGarnish).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Annual Garnishment" value={result?`${Number(result.annualGarnish).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Net Weekly Pay" value={result?`${Number(result.netWeeklyPay).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 What these numbers mean</h2><p className="text-sm text-gray-600">"Disposable income" is your pay after taxes and legally required deductions — it's the base the garnishment percentage applies to, not your gross paycheck. The weekly garnishment shown is the federal 25%-of-disposable-income cap under the CCPA; your state may cap it lower.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Wage Garnishment Calculator USA 2026" category="finance"
          intro={`When a creditor wins a court judgment against you — or the IRS, a student loan servicer, or a family court issues a garnishment order — your employer can be legally required to hold back part of every paycheck. This calculator shows the maximum a creditor can take under the federal Consumer Credit Protection Act (CCPA), the baseline that applies in every state.

It's built for anyone who's received (or is worried about receiving) a garnishment notice and wants to know how much of their paycheck is actually protected before talking to a creditor, a credit counselor, or an attorney. The key input is disposable weekly earnings. Gross pay is not the same as disposable earnings for CCPA purposes.`}
          howItWorks={`The CCPA protects wage earners with a two-part test, and the garnishment is capped at whichever amount is *lower*:

Test 1 — 25% of disposable earnings: Weekly Garnishment ≤ Disposable Income × 0.25

Test 2 — Income above 30× minimum wage: Weekly Garnishment ≤ Disposable Income − (30 × Federal Minimum Wage)

"Disposable income" isn't your gross pay — it's what's left after legally required deductions (federal/state/local tax, Social Security, Medicare, and mandatory retirement contributions in some states). The calculator does not invent disposable income from gross pay. Enter the disposable earnings figure applicable to the pay period; required deductions and legal definitions determine that amount.

At the 2026 federal minimum wage of $7.25/hour, 30 times that is $217.50 — the amount of weekly income that's fully shielded from creditor garnishment no matter how high your disposable income climbs.`}
          keyStats={[
            {stat:'25%', source:'Max creditor garnishment as a share of disposable income (CCPA)'},
            {stat:'$217.50/wk', source:'Income shielded from creditor garnishment (30× $7.25 federal minimum wage)'},
            {stat:'15.3%', source:'Combined household-employer payroll tax rate — see our Nanny Tax Calculator'},
          ]}
          comparisonTable={[
            {label:'Credit card / consumer debt', value:'25% of disposable income', note:'Federal CCPA cap — the scenario this calculator models'},
            {label:'Federal student loan default', value:'Up to 15% of disposable income', note:'Administrative wage garnishment, no court order needed'},
            {label:'Child support (no other dependents)', value:'Up to 50–60% of disposable income', note:'Higher if payer is behind more than 12 weeks'},
            {label:'Federal tax levy (IRS)', value:'Varies by IRS exemption table', note:'Based on filing status and dependents, not a flat %'},
          ]}
          mistakesDetailed={[
            {mistake:'Assuming garnishment applies to gross pay', fix:'The 25% cap applies to disposable income (after-tax pay), which is meaningfully lower than your gross salary — always check your pay stub, not your offer letter.'},
            {mistake:'Ignoring that multiple garnishments can stack', fix:'If you already have a garnishment for one debt, a second creditor generally cannot push your total garnishment above the same 25% cap — but child support and tax levies can take priority and push consumer-debt garnishments out entirely.'},
            {mistake:'Not checking state-specific protections', fix:'Several states (including Texas, Pennsylvania, North Carolina, and South Carolina) prohibit or sharply limit wage garnishment for ordinary consumer debt — the federal cap shown here may not apply to you at all if you live in one of these states.'},
          ]}
          benefits={[
            {title:'Federal CCPA Cap', text:'See the maximum a creditor can take under the federal 25%-of-disposable-income rule, before any state-specific limit applies.'},
            {title:'Disposable Income Estimate', text:'Understand the difference between gross pay and the disposable-income base garnishment percentages actually apply to.'},
            {title:'Take-Home Impact', text:'See your estimated net weekly pay if a garnishment order takes effect, for budgeting purposes.'},
          ]}
          useCases={[
            {title:'Responding to a garnishment notice', text:'Before contacting the creditor or a credit counselor, know the legal ceiling on what can be taken so you can spot an over-collection.'},
            {title:'Budgeting around an active garnishment', text:'Estimate your net take-home pay once a garnishment order is in effect, to plan rent, utilities, and other fixed costs.'},
            {title:'Comparing debt-settlement vs. letting it proceed', text:'Weigh a lump-sum settlement offer against the annualized cost of an ongoing garnishment order.'},
          ]}
          tipsSection={`Check your state's rules before assuming the federal 25% cap applies — several states cap creditor garnishment lower than the federal maximum, and a few (like Texas) block it almost entirely for ordinary debt. Bank account funds and Social Security, disability, and most retirement benefits are separately protected from most creditor garnishment even after they hit your bank account. If you're facing multiple garnishment orders, child support and IRS tax levies generally take priority over ordinary creditor debt.`}
          caseStudy={{
            title:'A single credit-card judgment in Texas',
            scenario:'Jordan earns $1,200/week gross and lost a small-claims judgment to a credit card company. Using this calculator, disposable income comes to roughly $936/week (about 78% of gross).',
            result:'The federal 25% cap allows up to $234/week to be garnished — but Texas is one of the states that generally prohibits wage garnishment for ordinary consumer debt, so in practice the creditor cannot garnish Jordan\'s paycheck at all and must pursue other collection methods.',
            takeaway:'The federal number is a ceiling, not a guarantee — state law can make the real-world answer $0.'
          }}
          conclusion={`This calculator shows the federal ceiling on creditor wage garnishment, not a guaranteed outcome — the actual amount withheld from any specific paycheck depends on your state's garnishment laws, the type of debt, and any competing garnishment orders. If you've received a garnishment notice, verify the amount against your actual pay stub and consider speaking with a consumer-law attorney or a nonprofit credit counselor (many offer free initial consultations) before assuming the notice is correct.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
