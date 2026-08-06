'use client'
import { calculateHealthSavingsAccountHDHP } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [hdhdpPremium, setHdhdpPremium] = useState(280)
  const [traditionalPremium, setTraditionalPremium] = useState(520)
  const [hdhpDeductible, setHdhpDeductible] = useState(1700)
  const [tradDeductible, setTradDeductible] = useState(500)
  const [expectedMedical, setExpectedMedical] = useState(3000)
  const [hsaContrib, setHsaContrib] = useState(4400)
  const [taxRate, setTaxRate] = useState(24)

  const result = useMemo(()=>{
    try{return calculateHealthSavingsAccountHDHP(hdhdpPremium, traditionalPremium, hdhpDeductible, tradDeductible, expectedMedical, hsaContrib, taxRate)}catch(e){return null}
  },[hdhdpPremium, traditionalPremium, hdhpDeductible, tradDeductible, expectedMedical, hsaContrib, taxRate])

  return (
    <CalculatorLayout title="HDHP vs Traditional Health Insurance Calculator USA 2026" description="Compare total annual cost of High-Deductible Health Plan + HSA vs traditional PPO/HMO including premiums, out-of-pocket, and HSA tax savings." icon="⚕️" category="Finance" relatedCalculators={relatedCalculators} slug="hdhp-vs-traditional-insurance-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">HDHP Monthly Premium ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={hdhdpPremium} onChange={e=>setHdhdpPremium(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Traditional Monthly Premium ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={traditionalPremium} onChange={e=>setTraditionalPremium(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">HDHP Deductible ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={hdhpDeductible} onChange={e=>setHdhpDeductible(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Traditional Deductible ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={tradDeductible} onChange={e=>setTradDeductible(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Medical Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={expectedMedical} onChange={e=>setExpectedMedical(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual HSA Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={hsaContrib} onChange={e=>setHsaContrib(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="HDHP Total Annual Cost" value={result ? `${Number(result.hdhdpTotalCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Traditional Total Annual Cost" value={result ? `${Number(result.tradTotalCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="HSA Tax Savings" value={result ? `${Number(result.hsaTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="HDHP Savings vs Traditional" value={result ? `${Number(result.hdhpSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Better Plan" value={result ? String(result.betterPlan) : "—"} />
                <ResultCard label="Recommendation" value={result ? String(result.recommendation) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">⚕️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The HDHP vs traditional insurance decision is purely mathematical: which plan has lower total annual cost including premiums, expected out-of-pocket costs, and HSA tax savings? In 2026, a healthy individual saving $240/month in premiums and contributing $4,300 to an HSA at the 24% bracket saves $1,033 in taxes alone — often making HDHP the clear winner.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="HDHP vs Traditional Health Insurance Calculator USA 2026" category="finance"
          intro={'This calculator compares two health-plan cost scenarios using premiums, deductibles, expected medical spending and an HSA contribution. It is most useful when you already have the actual plan premiums and deductibles from an employer or Marketplace comparison.'}
          howItWorks={'Annual premiums equal monthly premium × 12. For each plan, the code charges medical spending up to the deductible and then applies a flat 20% coinsurance rate to all spending above the deductible; it does not model an out-of-pocket maximum, copays or network pricing. HSA tax savings = HSA contribution × (entered tax rate + 7.65%). That payroll-tax addition assumes contributions receive that treatment, which may not apply to every contribution method or taxpayer. HDHP modeled cost = premium + modeled out-of-pocket cost − modeled HSA tax savings.'}
          tipsSection={'Use the plan’s actual deductible and premium, but remember that coinsurance, copays, employer HSA contributions, prescription tiers and out-of-pocket maximums can dominate the real comparison. Confirm that the HDHP is HSA-eligible before counting HSA tax benefits.'}
          conclusion={'For 2026, HSA eligibility has statutory HDHP deductible/out-of-pocket requirements and HSA contribution limits. The calculator does not enforce all of them, so validate the plan and contribution amount separately before making an election.'}
          benefits={[{title:'Annual premium comparison',text:'Convert both monthly premiums into annual cost.'},{title:'Modeled medical cost',text:'Apply the calculator’s deductible-plus-20%-coinsurance assumption to expected spending.'},{title:'HSA tax effect',text:'Estimate the tax offset the current code subtracts from the HDHP scenario.'}]}
          useCases={[{title:'Low expected utilization',text:'Compare premium savings with the deductible risk when expected medical spending is modest.'},{title:'Higher utilization',text:'Raise expected medical expenses to see when the traditional plan becomes cheaper under the model.'}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
