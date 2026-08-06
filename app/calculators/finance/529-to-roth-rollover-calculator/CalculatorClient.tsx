'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculate529RolloverToRoth } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [rollover529Balance, setRollover529Balance] = useState(45000)
  const [accountAgeYears, setAccountAgeYears] = useState(18)
  const [beneficiaryAge, setBeneficiaryAge] = useState(22)
  const result = useMemo(()=>{try{return calculate529RolloverToRoth(rollover529Balance,accountAgeYears,7500,35000,beneficiaryAge)}catch(e){return null}},[rollover529Balance, accountAgeYears, beneficiaryAge])
  return (
    <CalculatorLayout title="529 to Roth IRA Rollover Calculator USA 2026" description="529 to Roth IRA Rollover Calculator USA 2026" icon="🎓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="529-to-roth-rollover-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Unused 529 Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={rollover529Balance} onChange={e=>setRollover529Balance(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Account Age (Years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={accountAgeYears} onChange={e=>setAccountAgeYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Beneficiary's Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={beneficiaryAge} onChange={e=>setBeneficiaryAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Eligible" value={result?String(result.eligible ? 'Yes' : 'No — account too new'):"-"} highlight />
                <ResultCard label="Max Annual Rollover" value={result?`${Number(result.maxAnnualRollover).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Years to Complete" value={result?`${Number(result.yearsToCompleteRollover)} yrs`:"-"} />
                <ResultCard label="Total Rollover Possible" value={result?`${Number(result.totalRolloverPossible).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Growth to Age 65" value={result?`${Number(result.projectedGrowthAt65).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card><h3 className="text-sm font-semibold text-gray-700 mb-3">Projection</h3>
                  <div style={{height:200}}><ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                      <defs><linearGradient id="cg6b" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                      <XAxis dataKey={result.yearData[0]?.age!==undefined?"age":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={60} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                      <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                      <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age'].includes(k))[0]||'balance'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cg6b)"/>
                    </AreaChart>
                  </ResponsiveContainer></div>
                </Card>
              )}
            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🎓 Rollover Timeline</h2><p className="text-sm text-gray-600">{result?.eligible?`At $7,500/year, it would take about ${result.yearsToCompleteRollover} year${result.yearsToCompleteRollover===1?'':'s'} to move the full eligible balance into a Roth IRA.`:'This account needs to be open 15+ years before any 529-to-Roth rollover is allowed.'}</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="529 to Roth IRA Rollover Calculator USA 2026"
          category="finance"
          intro={`This calculator estimates how many years it would take to move an unused 529 college savings balance into the beneficiary's Roth IRA under the SECURE 2.0 rollover provision, and what that money could grow to by retirement.\n\nIt's built for parents or grandparents whose 529 beneficiary didn't use all the funds — because a scholarship covered tuition, they chose a cheaper school, or they skipped college altogether — and who want an alternative to a non-qualified withdrawal, which would trigger income tax plus a 10% penalty on the earnings portion.\n\nThe three inputs that matter most are your 529 balance, how long the account has been open (there's a 15-year minimum), and the beneficiary's current age, which determines how long any rolled-over funds have to compound before a typical retirement age.`}
          howItWorks={`Under the SECURE 2.0 Act, a 529 account beneficiary can roll over up to $35,000 total (a lifetime cap, not annual) into their own Roth IRA — but only in amounts up to the beneficiary's regular annual Roth IRA contribution limit each year, which is $7,500 for 2026 for beneficiaries under 50.\n\nYears to Complete Rollover = ceil($35,000 / $7,500) = 5 years\n\nBecause the annual rollover amount counts toward — not in addition to — the beneficiary's normal Roth IRA limit, moving the full $35,000 takes multiple years even if the 529 balance is larger. The beneficiary must also have earned income at least equal to the amount rolled over in any given year, since Roth IRA contributions (including rollover amounts) can't exceed earned income.\n\nProjected Growth = Total Rollover Possible x (1.07 ^ Years Until Age 65)\n\nThe growth projection assumes a 7% average annual return compounded until age 65, which approximates a long-run stock-heavy portfolio average before inflation — actual returns will vary year to year and this is not a guarantee.\n\nEligibility also depends on the 529 account being open at least 15 years, and contributions (plus their earnings) made within the last 5 years are not eligible for rollover — only older contributions and their growth qualify.`}
          benefits={[
            {title:"Eligibility Check", text:"See at a glance whether your account meets the 15-year minimum age requirement for any rollover at all."},
            {title:"Rollover Timeline", text:"See how many years it will realistically take to move the full eligible balance, given the annual Roth IRA contribution limit."},
            {title:"Total Amount Eligible", text:"See how much of your 529 balance is eligible to move, capped at the $35,000 lifetime limit."},
            {title:"Long-Term Growth Projection", text:"See what the rolled-over amount could grow to by age 65 if invested and left to compound inside the Roth IRA."},
          ]}
          useCases={[
            {title:"A child who earned a full scholarship", text:"Parents who saved diligently for tuition suddenly have a mostly-unused 529 balance because their child received a full academic scholarship, and want an alternative to paying tax and penalty on a non-qualified withdrawal."},
            {title:"A beneficiary who chose a trade instead of a 4-year degree", text:"A family's 529 plan has leftover funds after their child pursued an apprenticeship or trade school program that cost far less than a traditional college, and they want to give those savings a head start on retirement instead."},
            {title:"Grandparent-owned 529 with a young adult beneficiary", text:"A grandparent who opened a 529 account 16+ years ago for a grandchild now in their early 20s wants to understand the multi-year timeline for moving the balance into the grandchild's own Roth IRA."},
          ]}
          caseStudy={{
            title: "A $45,000 balance after a scholarship",
            scenario: "A 529 account has been open 18 years and holds $45,000. The beneficiary, now 22, received a partial scholarship and only used part of the 529 funds for tuition and books.",
            result: "The account clears the 15-year eligibility test. Of the $45,000 balance, $35,000 is eligible under the lifetime cap. At $7,500 per year, moving the full amount takes 5 years, assuming the beneficiary has at least $7,500 of earned income each of those years. Left to grow at an assumed 7% annual return until age 65, that $35,000 could grow to roughly $370,000 over 43 years.",
            takeaway: "The remaining $10,000 above the $35,000 cap stays in the 529 — it can be used for another beneficiary, other qualified education expenses (including K-12 tuition or apprenticeship costs), or withdrawn non-qualified with tax and penalty only on the earnings.",
          }}
          mistakesDetailed={[
            {mistake: "Assuming the full 529 balance can move in one year", fix: "The rollover is capped by the beneficiary's annual Roth IRA contribution limit each year ($7,500 for 2026), so a large balance takes multiple years to fully transfer even if you're under the $35,000 lifetime cap."},
            {mistake: "Overlooking the 5-year contribution lookback", fix: "Contributions made to the 529 (and the earnings on them) within the last 5 years are not eligible to roll over — only older money and its growth qualify, which matters if you added a large lump sum recently."},
            {mistake: "Not checking the beneficiary's earned income", fix: "Like any Roth IRA contribution, the rollover amount can't exceed the beneficiary's earned income for that year — a beneficiary with little or no income can't use the full annual rollover allowance."},
          ]}
          tipsSection={`The 529-to-Roth rollover must go to the account beneficiary's own Roth IRA, not the account owner's — if you're the 529 owner and a different person is the beneficiary, the funds move into that beneficiary's retirement account, not yours.\n\nIf you're not in a rush, changing the beneficiary to a sibling or other qualifying family member and letting them use the 529 for its original purpose may be simpler than a multi-year Roth rollover, especially if the current beneficiary is early in their career and doesn't have much earned income yet.`}
          conclusion={`The SECURE 2.0 rollover option turns what used to be a difficult choice — pay tax and penalty on unused 529 funds, or leave them parked indefinitely — into a way to give a young adult a meaningful, penalty-free head start on retirement savings. The tradeoff is patience: because the annual limit applies, moving a large balance takes years, and the beneficiary needs qualifying earned income along the way.\n\nRules around 529 plans and Roth IRA rollovers can change with new tax legislation, so confirm current limits at [IRS.gov](https://www.irs.gov/retirement-plans) or with a financial advisor before initiating a rollover with your 529 plan administrator.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
