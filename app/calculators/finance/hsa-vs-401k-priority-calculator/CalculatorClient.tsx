'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateHSAvs401kPriority } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [salary, setSalary] = useState(95000)
  const [employer401kMatch, setEmployer401kMatch] = useState(4)
  const [taxRate, setTaxRate] = useState(24)
  const result = useMemo(()=>{try{return calculateHSAvs401kPriority(salary,employer401kMatch,true,35,taxRate)}catch(e){return null}},[salary, employer401kMatch, taxRate])
  return (
    <CalculatorLayout title="HSA vs 401k Priority Calculator USA 2026" description="See the dollar value of your employer's 401k match and your HSA's triple tax advantage, then follow a five-step contribution order for where extra savings should go next." icon="🏥" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="hsa-vs-401k-priority-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Salary</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={salary} onChange={e=>setSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Employer 401k Match</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={employer401kMatch} onChange={e=>setEmployer401kMatch(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Marginal Tax Rate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Employer Match Value" value={result?`${Number(result.employerMatchValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="HSA Tax Savings" value={result?`${Number(result.hsaTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Tax-Advantaged Space" value={result?`${Number(result.totalTaxAdvantagedSpace).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card>
              <h2 className="text-lg font-black text-gray-900 mb-3">🏥 Your Contribution Priority Order</h2>
              <ol className="space-y-2">
                {result?.priorityOrder.map((step:any)=>(
                  <li key={step.step} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{step.step}</span>
                    <div>
                      <p className="font-semibold text-gray-800">{step.action} — ${Number(step.amount).toLocaleString(undefined,{maximumFractionDigits:0})}</p>
                      <p className="text-gray-500 text-xs">{step.reason}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="HSA vs 401k Priority Calculator USA 2026" category="finance"
          intro={`If you can't afford to max out every tax-advantaged account you're eligible for — which is most people — the order you fund them in matters. This calculator translates your salary, employer 401k match, and tax rate into a concrete dollar-by-dollar priority order, so you know exactly where your next contribution dollar should go.

It's built for anyone contributing to a 401k who is also enrolled in an HSA-eligible high-deductible health plan (HDHP), and who wants a clear answer to "HSA or 401k first?" instead of general advice.`}
          howItWorks={`The calculator applies a widely used contribution-priority framework, then converts each step into a dollar amount based on your inputs:

Step 1 — Capture the full employer 401k match: Match Value = Salary × min(Match %, 6%). This is treated as priority #1 because it's an immediate, stated return under the applicable terms — typically 50-100% — that nothing else can match.

Step 2 — Max the HSA (if HDHP-eligible): the HSA is prioritized above further 401k contributions because it's the only account offering all three tax benefits — a deduction going in, tax-free growth, and tax-free withdrawals for qualified medical expenses. Your estimated tax savings are calculated as HSA Limit × (Marginal Tax Rate + 7.65% payroll tax).

Step 3 — Return to the 401k up to the full 2026 IRS limit of $24,500.

Step 4 — Max an IRA (Traditional or Roth) up to the 2026 limit of $7,500.

Step 5 — Additional savings go to a taxable brokerage account, which has no contribution limit and full withdrawal flexibility.`}
          keyStats={[
            {stat:'$4,400', source:'2026 IRS self-only HSA contribution limit'},
            {stat:'$24,500', source:'2026 IRS 401k elective-deferral limit'},
            {stat:'$7,500', source:'2026 IRA contribution limit'},
          ]}
          benefits={[
            {title:'Dollar Value of Your Match', text:'See exactly how much your employer\'s 401k match is worth in dollars, so you know the floor you should never leave on the table.'},
            {title:'HSA Tax Savings Estimate', text:'Quantify the tax benefit of maxing an HSA at your specific marginal rate, combining income tax and payroll tax savings.'},
            {title:'A Concrete Priority Order', text:'Get a five-step, dollar-denominated contribution sequence instead of generic "save more" advice.'},
          ]}
          strategySections={[{title:'Why the HSA Ranks Above Additional 401k Contributions', steps:[
            'A traditional 401k is tax-deferred on the way in and fully taxable on withdrawal — two-thirds of the HSA\'s advantage.',
            'A Roth IRA is funded with after-tax dollars but grows and withdraws tax-free — again, two of three benefits, not three.',
            'The HSA is deductible going in, grows tax-free, and comes out tax-free for qualified medical expenses — the only account with all three.',
            'After age 65, HSA funds can be withdrawn for any purpose penalty-free (though non-medical withdrawals are taxed like a traditional IRA), making an unused HSA a backup retirement account.',
          ]}]}
          useCases={[
            {title:'New job with a 401k match', text:'Confirm you\'re capturing the full match before diverting extra savings anywhere else — skipping it is leaving guaranteed money on the table.'},
            {title:'Choosing a health plan during open enrollment', text:'Weigh whether an HDHP-plus-HSA combination is worth switching to, based on how much tax-advantaged space it unlocks.'},
            {title:'Deciding where a raise or bonus should go', text:'Use the priority order to route new savings capacity efficiently instead of splitting it evenly across accounts.'},
          ]}
          tipsSection={`You can only contribute to an HSA while enrolled in an HSA-eligible HDHP — if your plan doesn't qualify, skip straight from the employer match to maxing your 401k and IRA. HSA funds you don't spend roll over indefinitely and can be invested, so an HSA you never touch for current medical bills can compound for decades. Keep medical receipts even if you don't reimburse yourself immediately — you can reimburse yourself from HSA funds for a qualified expense from any prior year, as long as the HSA existed when the expense occurred.`}
          caseStudy={{
            title:'A $95,000 salary with a 4% match',
            scenario:'Someone earning $95,000/year gets a 4% 401k match and is in the 24% federal tax bracket, enrolled in an HDHP.',
            result:'Step 1 captures $3,800 in guaranteed match money. Step 2 directs the next $4,400 to a maxed-out HSA, saving roughly $1,393 in combined income and payroll tax. Step 3 returns to the 401k for the remaining $20,700 to reach the $24,500 IRS cap, and Step 4 allows up to $7,500 more in an IRA — a total of $36,400 in tax-advantaged contribution room for the year.',
            takeaway:'The HSA step is small in dollar terms compared to the 401k, but it carries the highest tax-efficiency per dollar contributed.'
          }}
          conclusion={`This priority order is a common financial-planning framework, not a personalized recommendation — your own priorities may shift if you have high-interest debt to pay down first, need to build an emergency fund, or have irregular income that makes maxing every account impractical in a given year. If you're weighing this alongside other goals, a fee-only financial planner can help sequence it against your full financial picture.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
