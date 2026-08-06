'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateStockSplitValue } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [sharesOwned, setSharesOwned] = useState(100)
  const [pricePerShare, setPricePerShare] = useState(150)
  const [splitNum, setSplitNum] = useState(2)
  const result=useMemo(()=>{try{return calculateStockSplitValue(sharesOwned,pricePerShare,splitNum+':1')}catch(e){return null}},[sharesOwned, pricePerShare, splitNum])
  return(
    <CalculatorLayout title="Stock Split Calculator USA 2026" description="Calculate shares and price after any stock split ratio. Includes reverse splits and adjusted cost basis per share." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="stock-split-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Shares Owned</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={sharesOwned} onChange={e=>setSharesOwned(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Price Per Share ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={pricePerShare} onChange={e=>setPricePerShare(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Split Ratio (2 = 2-for-1, 0.5 = 1-for-2 reverse)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={splitNum} onChange={e=>setSplitNum(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Shares After Split" value={result?String(result.sharesAfter):"-"} highlight/>
                <ResultCard label="Price After Split" value={result?`${Number(result.priceAfter).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Value (unchanged)" value={result?`${Number(result.totalValueAfter).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="New Cost Basis/Share" value={result?`${Number(result.costBasisPerShareAfter).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Split Type" value={result?String(result.splitType):"-"}/>
                <ResultCard label="Tax Note" value={result?String(result.taxNote):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📊 What Doesn't Change</h2><p className="text-sm text-gray-600">Your total position value stays ${result?Number(result.totalValueAfter).toLocaleString():'-'} before and after — a split only changes how many pieces that value is divided into.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Stock Split Calculator USA 2026"
          category="finance"
          intro={`This calculator shows exactly what happens to your share count, price per share, and cost basis when a company you own stock in announces a forward split (like 2-for-1 or 4-for-1) or a reverse split (like 1-for-10).\n\nIt's useful the moment a company you hold announces a split and you want to know your new share count without waiting for your brokerage statement to update, or when you're trying to understand why a stock's price suddenly dropped (or jumped) without any change in the company's actual value.\n\nThe result depends on two things: your current position (shares owned and price per share) and the split ratio itself, entered as a single number — 2 for a standard 2-for-1 split, or a fraction like 0.5 for a 1-for-2 reverse split.`}
          howItWorks={`A stock split multiplies your share count by the split ratio and divides your price per share by the same ratio, so your total position value is mathematically unchanged at the moment of the split.\n\nNew Shares = Shares Owned x Ratio\nNew Price = Price Per Share / Ratio\n\nFor a standard forward split like 2-for-1, enter 2 as the ratio: 100 shares at $150 becomes 200 shares at $75 — same $15,000 total value. For a reverse split like 1-for-10 (common when a company wants to boost a low share price to meet a stock exchange listing requirement), enter the ratio as a fraction: 0.1 represents "1 new share for every 10 old shares." 1,000 shares at $2 becomes 100 shares at $20.\n\nYour cost basis per share moves the same way as the price — it's divided by the ratio so your total cost basis (shares x cost basis per share) stays the same as before the split. This matters at tax time: your original purchase date and total invested amount carry forward unchanged, only the per-share figures used to calculate any future capital gain or loss are adjusted.`}
          benefits={[
            {title:"New Share Count", text:"See exactly how many shares you'll hold after the split posts to your brokerage account."},
            {title:"Adjusted Price Per Share", text:"See what the market price will look like on a split-adjusted basis, separate from any actual price movement the stock makes."},
            {title:"Cost Basis Per Share", text:"Get your new per-share cost basis so you can update your own records or double-check what your broker reports."},
            {title:"Forward vs. Reverse Detection", text:"The calculator automatically labels whether your entered ratio represents a forward split (more, cheaper shares) or reverse split (fewer, pricier shares)."},
          ]}
          useCases={[
            {title:"A popular tech stock announces a 4-for-1 split", text:"An investor holding 50 shares at $800 wants to know their new share count and price before the split takes effect, without doing the math by hand or waiting for broker confirmation."},
            {title:"A small-cap stock does a reverse split to avoid delisting", text:"A company trading under $1 announces a 1-for-20 reverse split to get back above a $1 minimum listing requirement — a shareholder wants to see their reduced share count and confirm their total position value is unaffected."},
            {title:"Reconciling a brokerage statement after a split", text:"An investor's monthly statement shows an unfamiliar share count and price after a split posts, and they want to verify the numbers independently using their pre-split holdings."},
          ]}
          mistakesDetailed={[
            {mistake: "Assuming a stock split makes a company 'cheaper' or a better value", fix: "A split doesn't change the company's market capitalization, earnings, or fundamentals — it only changes how the same value is divided among shares, so it shouldn't be read as a buy signal on its own."},
            {mistake: "Forgetting to update limit or stop orders before a split takes effect", fix: "Most brokers auto-adjust open orders for splits, but it's worth double-checking a pending limit or stop-loss order's price after a split posts, since a stale price could trigger an unintended trade."},
            {mistake: "Manually recalculating cost basis instead of checking the 1099-B", fix: "Brokers are required to track and report split-adjusted cost basis for shares purchased after 2011 — use this calculator to sanity-check the number, but rely on your official 1099-B for tax filing."},
          ]}
          tipsSection={`Enter the split ratio as it's officially announced. A "3-for-2" split means enter 1.5 (3 divided by 2), not 3 — the ratio you enter should represent new shares per one old share. Most simple splits like 2-for-1, 3-for-1, or 4-for-1 can be entered as whole numbers, but uneven ratios need the division done first.\n\nStock splits are separate from stock dividends in company announcements — a "10% stock dividend" is economically similar to a 1.1-for-1 split, and can be modeled here by entering 1.1 as the ratio.`}
          conclusion={`Stock splits and reverse splits are cosmetic changes to share structure, not changes in company value — your total position is worth the same the moment the split takes effect. What matters more than the split itself is why a company is doing it: forward splits are often a sign a company wants to make its already-rising stock more accessible to retail investors, while reverse splits are more frequently used to meet exchange listing requirements or a signal a company is trying to change how institutional investors perceive its stock.\n\nThis calculator handles the arithmetic; it does not evaluate whether the underlying stock is a good investment before or after the split.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
