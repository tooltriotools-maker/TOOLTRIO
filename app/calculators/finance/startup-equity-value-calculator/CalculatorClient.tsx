'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateStartupEquityValue } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [equityPercent, setEquityPercent] = useState(0.5)
  const [currentValuation, setCurrentValuation] = useState(25000000)
  const [exitValuation, setExitValuation] = useState(250000000)
  const [dilutionPerRound, setDilutionPerRound] = useState(15)
  const [roundsToExit, setRoundsToExit] = useState(3)
  const [exitProbability, setExitProbability] = useState(15)
  const result = useMemo(()=>{try{return calculateStartupEquityValue(equityPercent,currentValuation,exitValuation,dilutionPerRound,roundsToExit,exitProbability)}catch(e){return null}},[equityPercent, currentValuation, exitValuation, dilutionPerRound, roundsToExit, exitProbability])
  return (
    <CalculatorLayout title="Startup Equity Value Calculator USA 2026" description="Model startup equity value after future financing dilution, a hypothetical exit valuation and an assumed probability of exit." icon="🚀" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="startup-equity-value-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Equity (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={equityPercent} onChange={e=>setEquityPercent(Number(e.target.value))} step={0.05} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Company Valuation ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={currentValuation} onChange={e=>setCurrentValuation(Number(e.target.value))} step={500000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hypothetical Exit Valuation ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={exitValuation} onChange={e=>setExitValuation(Number(e.target.value))} step={5000000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Dilution per Round (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dilutionPerRound} onChange={e=>setDilutionPerRound(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Funding Rounds to Exit</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={roundsToExit} onChange={e=>setRoundsToExit(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Assumed Exit Probability (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={exitProbability} onChange={e=>setExitProbability(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Current Value (paper)" value={result?`${Number(result.currentValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Exit Ownership Value" value={result?`${Number(result.exitOwnershipValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Expected Value" value={result?`${Number(result.expectedValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Investment Multiple" value={result?`${Number(result.multiple).toFixed(2)}x`:"-"} />
                <ResultCard label="Net After-Tax Exit" value={result?`${Number(result.netExitValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🚀 Startup Equity Value Calculator USA 2026</h2><p className="text-sm text-gray-600">Model startup equity value after future financing dilution, a hypothetical exit valuation and an assumed probability of exit.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Startup Equity Value Calculator USA 2026" category="finance"
          intro={'Startup equity is usually quoted as a percentage today, but its future economic value depends on dilution and the company’s eventual outcome. This calculator starts with your current ownership percentage and company valuation, compounds a chosen dilution percentage across future rounds, values the diluted stake at a hypothetical exit, and probability-weights that exit value. It helps founders and employees separate headline ownership from scenario-adjusted value.'}
          howItWorks={'Current paper value equals current ownership percentage × current company valuation. Future ownership equals current ownership × (1 − dilution per round)^number of rounds. Exit ownership value equals future ownership × hypothetical exit valuation. Expected value equals exit ownership value × the probability of exit entered by the user. The tool also reports an investment multiple relative to current paper value and applies its own simplified after-tax exit assumption. These are scenario calculations, not a valuation of private-company securities.'}
          tipsSection={'Enter ownership on a fully diluted basis when possible; option grants may be quoted against a capitalization table that changes as new options or preferred shares are issued. Dilution should represent the percentage reduction in your ownership per modeled round, not the amount of new capital raised. Exit probability is subjective, so test a wide range instead of treating one probability as a forecast. The model also does not capture liquidation preferences, strike price, vesting, exercise costs or different tax treatment of ISOs, NSOs and RSUs.'}
          conclusion={'Use the calculator to understand sensitivity, not to predict what private-company equity will pay. The most informative exercise is to compare several dilution and exit scenarios and then layer in grant-specific terms such as vesting, strike price, preferred-stock preferences and taxes.'}
          caseStudy={{title:'Employee option-value scenario',scenario:'An employee models 0.5% current ownership at a $25 million company valuation, a $250 million exit, 15% dilution in each of three future rounds and a 15% exit probability.',result:'The ownership percentage is reduced by 0.85 three times before being applied to the $250 million exit value; that exit value is then multiplied by 15% for the probability-weighted result.',takeaway:'A large headline exit can still translate into a much smaller expected value once dilution and outcome uncertainty are included.'}}
          scienceSection={'Methodology is derived directly from the ToolTrio calculation function: multiplicative dilution across rounds, exit-value multiplication and user-entered probability weighting. No external market-return or startup-success statistic is assumed. Private-company securities can be illiquid and their rights depend on the company’s capitalization and security terms.'}
          benefits={[{title:'Dilution modeling',text:'Compounds ownership dilution across multiple financing rounds instead of subtracting one percentage once.'},{title:'Exit sensitivity',text:'Shows how a different exit valuation changes the value of the diluted stake.'},{title:'Probability weighting',text:'Separates a best-case exit value from the user’s own probability-adjusted scenario.'}]}
          useCases={[{title:'Offer evaluation',text:'Stress-test an equity grant under different dilution and exit assumptions before comparing it with cash compensation.'},{title:'Founder planning',text:'See how repeated financing rounds can reduce ownership even as the company’s total valuation grows.'}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
