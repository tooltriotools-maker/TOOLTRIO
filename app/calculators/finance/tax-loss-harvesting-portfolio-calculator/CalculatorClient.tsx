'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateTaxLossHarvestingPortfolio } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [totalGains,setTotalGains]=useState(35000)
  const [taxRate,setTaxRate]=useState(24)
  const result=useMemo(()=>{try{return calculateTaxLossHarvestingPortfolio([{name:'Tech Stock',gain:0,loss:20000,held:300},{name:'Bond ETF',gain:35000,loss:0,held:500}],totalGains,taxRate)}catch(e){return null}},[totalGains, taxRate])
  return(
    <CalculatorLayout title="Tax-Loss Harvesting Portfolio Calculator USA 2026" description="Estimate how modeled portfolio losses can offset capital gains, create an ordinary-income capital-loss deduction and leave a carryforward for later years." icon="🌿" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="tax-loss-harvesting-portfolio-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Capital Gains to Offset ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalGains} onChange={e=>setTotalGains(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Losses Available" value={result?`${Number(result.totalLossesAvailable).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Tax Savings This Year" value={result?`${Number(result.taxSavingsThisYear).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Ordinary Income Deduction" value={result?`${Number(result.ordinaryIncomeDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Carry-Forward Loss" value={result?`${Number(result.carryForwardLoss).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Tax Benefit" value={result?`${Number(result.totalTaxBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🌿 Tax-Loss Harvesting Portfolio Calculator USA 2026</h2><p className="text-sm text-gray-600">Estimate how modeled portfolio losses can offset capital gains, create an ordinary-income capital-loss deduction and leave a carryforward for later years.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Tax-Loss Harvesting Portfolio Calculator USA 2026" category="finance"
          intro={'This calculator demonstrates the ordering behind tax-loss harvesting using a sample portfolio containing a $20,000 loss position and a $35,000 gain position. You can change the amount of capital gains to offset and the tax rate used for the estimate. The output separates losses used against gains, the capital-loss deduction against ordinary income, unused loss carryforward and modeled tax benefit.'}
          howItWorks={'The calculation totals available losses from the portfolio positions. Losses first offset the capital gains entered by the user. If losses remain after gains are offset, the model allows up to $3,000 as an ordinary-income capital-loss deduction and carries the rest forward. Tax savings are estimated by multiplying the amounts used by the entered tax rate. IRS rules distinguish short-term and long-term gains and losses and require netting steps that this simplified portfolio model does not fully reproduce.'}
          tipsSection={'Only realized losses can enter the tax calculation; a position that is merely down in market value has not yet created a deductible capital loss. Check holding periods because short- and long-term gains are taxed differently. Before repurchasing, review the wash-sale rule: buying substantially identical stock or securities within 30 days before or after a loss sale can disallow the current deduction. Also check other accounts and spouse transactions where relevant.'}
          conclusion={'Tax-loss harvesting changes the timing and use of tax losses; it does not make an investment loss economically beneficial by itself. Use the output to understand how much of a modeled loss may be absorbed by gains, the annual capital-loss deduction and carryforward, then verify transaction-specific wash-sale and basis consequences before trading.'}
          caseStudy={{title:'Harvesting a losing position against gains',scenario:'The sample portfolio has a $20,000 loss in a tech stock. If the user enters $35,000 of capital gains and a 24% tax rate, the available loss is fully absorbed by gains.',result:'The calculator applies the $20,000 loss against the entered gains, leaving no excess loss for the $3,000 ordinary-income deduction or carryforward in that scenario.',takeaway:'The tax effect depends on what kind of gains are being offset and the taxpayer’s actual rates; the 24% input is only a modeling rate.'}}
          scienceSection={'Primary reference: [IRS Publication 550](https://www.irs.gov/publications/p550) explains that net capital losses can generally offset up to $3,000 of ordinary income per year ($1,500 for married filing separately), with unused loss carried to later years. It also describes the wash-sale rule for substantially identical stock or securities acquired within the 30-day periods around a loss sale.'}
          benefits={[{title:'Gain offset',text:'Shows how much of the sample portfolio loss can be used against entered capital gains.'},{title:'Annual loss deduction',text:'Models the federal $3,000 net-capital-loss deduction when losses remain after gains.'},{title:'Carryforward',text:'Separates unused modeled losses that would remain for later tax years.'}]}
          useCases={[{title:'Year-end tax review',text:'Estimate whether realizing a loss would be absorbed by gains already realized during the year.'},{title:'Carryforward planning',text:'See whether a large harvested loss could remain after current gains and the annual ordinary-income deduction are applied.'}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
