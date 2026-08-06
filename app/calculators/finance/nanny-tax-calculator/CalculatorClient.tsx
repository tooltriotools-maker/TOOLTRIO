'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateNannyTax } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [weeklyHours, setWeeklyHours] = useState(35)
  const [hourlyRate, setHourlyRate] = useState(22)
  const [weeksPerYear, setWeeksPerYear] = useState(50)
  const result = useMemo(()=>{try{return calculateNannyTax(weeklyHours,hourlyRate,weeksPerYear,'CA')}catch(e){return null}},[weeklyHours, hourlyRate, weeksPerYear])
  return (
    <CalculatorLayout title="Nanny Tax Calculator USA 2026" description="Estimate the household-employer Social Security, Medicare, and unemployment tax you'll owe once a nanny's, housekeeper's, or caregiver's wages cross the 2026 IRS threshold." icon="👶" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="nanny-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Weekly Hours</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <input type="number" value={weeklyHours} onChange={e=>setWeeklyHours(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">hrs/wk</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hourly Rate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={hourlyRate} onChange={e=>setHourlyRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">/hr</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Weeks Worked Per Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <input type="number" value={weeksPerYear} onChange={e=>setWeeksPerYear(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">wks</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual Wages" value={result?`${Number(result.annualWages).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Employer FICA" value={result?`${Number(result.employerFICA).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="FUTA Tax" value={result?`${Number(result.futa).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="State Unemployment" value={result?`${Number(result.suta).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Employer Cost" value={result?`${Number(result.totalEmployerCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">👶 What these numbers mean</h2><p className="text-sm text-gray-600">"Employer FICA" and unemployment tax are costs you pay on top of your nanny's wages — they're not deducted from her paycheck. "Total Employer Cost" is your real all-in cost of employment, which is what to compare against an agency or daycare quote.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Nanny Tax Calculator USA 2026" category="finance"
          intro={`If you pay a nanny, housekeeper, or in-home caregiver directly rather than through an agency, the IRS treats you as their employer — with real payroll tax obligations once their wages cross a set threshold. This calculator turns your nanny's hours, hourly rate, and weeks worked into your actual annual "nanny tax" cost.

It's built for parents and families setting up in-home childcare who need to budget the true cost of employment (not just the wage), and for anyone trying to decide whether household payroll is worth the paperwork compared to a daycare or agency alternative.`}
          howItWorks={`Once you enter hours, rate, and weeks, the calculator first computes Annual Wages = Weekly Hours × Hourly Rate × Weeks Per Year.

If annual wages exceed the 2026 household-employee threshold of $3,000 (IRS Publication 926, up from $2,800 in 2025), FICA tax applies at the combined 15.3% rate — split as 7.65% you owe as the employer and 7.65% that comes from your nanny's wages (either withheld from her pay or covered by you as a benefit).

Employer FICA = Annual Wages × 7.65%

Separately, federal unemployment tax (FUTA) applies once you pay $1,000 or more in any calendar quarter, at 0.6% on the first $7,000 of wages per employee:

FUTA = min(Annual Wages, $7,000) × 0.6%

State unemployment tax (SUTA) works similarly but the rate and wage base vary by state — this calculator uses representative 2026 rates for California, New York, Texas, and Florida (3.4%, 4.1%, 2.7%, and 2.9% respectively on the first $7,000), with a 3.0% default for other states.`}
          keyStats={[
            {stat:'$3,000', source:'2026 IRS household-employee FICA threshold (Publication 926)'},
            {stat:'15.3%', source:'Combined Social Security + Medicare (FICA) tax rate'},
            {stat:'$1,000/quarter', source:'FUTA trigger — separate from, and lower than, the FICA threshold'},
          ]}
          benefits={[
            {title:'Household Payroll Cost', text:'See your true all-in cost of employing a nanny or caregiver — wages plus the taxes you owe as the employer.'},
            {title:'W-2 Threshold Check', text:'Instantly know whether your household crosses the 2026 IRS FICA threshold and needs to withhold, pay, and report payroll taxes.'},
            {title:'Quarterly Payment Estimate', text:'Get a quarterly estimated-tax figure so you can budget for Schedule H filing instead of facing a surprise bill.'},
          ]}
          strategySections={[{title:'Setting Up Legally as a Household Employer', steps:[
            'Get an Employer Identification Number (EIN) from the IRS — you generally cannot use your Social Security number for household payroll.',
            'Verify your nanny\'s eligibility to work (Form I-9) and have her complete a W-4 for federal withholding elections.',
            'Track wages and withhold the employee share of FICA each pay period if you\'re not covering it yourself.',
            'File Schedule H with your Form 1040 each year, and make quarterly estimated payments so you\'re not hit with an underpayment penalty in April.',
            'Issue a W-2 by January 31 (or the next business day) if annual wages crossed the $3,000 threshold.',
          ]}]}
          useCases={[
            {title:'Budgeting a nanny hire', text:'Compare the true all-in cost of a nanny — wages plus your employer tax share — against daycare tuition or an au pair program.'},
            {title:'Deciding whether to pay legally or "under the table"', text:'See the actual dollar cost of compliance, which is often smaller than families assume and comes with real benefits for your caregiver (unemployment eligibility, Social Security credit, verifiable income for her own future loans).',},
            {title:'Estimating quarterly tax payments', text:'Use the quarterly estimated figure to set aside funds and avoid an April surprise or underpayment penalty.'},
          ]}
          tipsSection={`The $3,000 threshold is per employee, per year — if you pay two part-time sitters $2,000 each, neither individually crosses the FICA threshold. A Dependent Care FSA (up to $7,500/year for married couples filing jointly in 2026) or the Child and Dependent Care Tax Credit can offset some of your nanny cost — check whether your employer offers a DCFSA before assuming you'll pay full price out of pocket. FUTA has its own separate $1,000-per-quarter trigger, so you can owe FUTA even in a year total wages stay under $3,000.`}
          mistakesDetailed={[
            {mistake:'Treating a nanny as a 1099 independent contractor', fix:'If you control what work is done and how (hours, tasks, supervision in your home), the IRS almost always classifies this as an employee relationship, not a contractor one — misclassifying can trigger back taxes and penalties.'},
            {mistake:'Forgetting FUTA has a lower, separate trigger than FICA', fix:'FUTA kicks in at $1,000 in wages in any single calendar quarter, well below the $3,000 annual FICA threshold — track quarterly totals, not just the yearly total.'},
            {mistake:'Missing the W-2 deadline', fix:'If wages crossed $3,000, you must issue a W-2 by January 31 (or the next business day) — filing Schedule H alone isn\'t enough.'},
          ]}
          conclusion={`This calculator estimates your household-employer tax obligation using 2026 federal thresholds and representative state unemployment rates — your actual state unemployment rate, local payroll taxes, and any state-specific household employer rules can shift the total. For your specific state's exact rate and filing requirements, check your state's Department of Labor or unemployment insurance agency, and consider a household payroll service or accountant if the paperwork feels like more than you want to manage solo.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
