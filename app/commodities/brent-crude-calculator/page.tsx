'use client'
import { useState } from 'react'
import { useCommodityPrices } from '@/hooks/useCommodityPrices'
import { CommodityPriceCard } from '@/components/commodities/CommodityPriceCard'
import { RefreshCw, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  const { data, loading, refresh } = useCommodityPrices(60)
  const c = data['crude_brent' as keyof typeof data]
  const [qty, setQty] = useState(1000)

  const conversions = [{label:"Per Barrel",factor:1,unit:"bbl"},{label:"Per Gallon",factor:1/42,unit:"gal"},{label:"Per Litre",factor:1/158.987,unit:"L"},{label:"Per Metric Ton",factor:1/7.5,unit:"MT"},{label:"100 barrels",factor:100,unit:"bbl"},{label:"1,000 barrels",factor:1000,unit:"bbl"}]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1">
        <Link href="/" className="hover:text-gray-600">Home</Link> /
        <Link href="/commodities" className="hover:text-gray-600">Commodities</Link> /
        <span className="text-gray-700 font-medium">Brent Crude Oil Calculator</span>
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">⛽ Brent Crude Oil Calculator</h1>
          <p className="text-gray-500 mt-1">Live Brent crude oil price - the global benchmark used for ~70% of world oil contracts.</p>
        </div>
        <button onClick={refresh} disabled={loading} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200">
          <RefreshCw className={`w-3.5 h-3.5 ${loading?'animate-spin':''}`} />Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <CommodityPriceCard commodity={c} emoji="⛽" loading={loading} />
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 text-xs text-gray-600 leading-relaxed">Brent Crude is sourced from North Sea oilfields. It is the global oil price benchmark for about 70% of internationally traded crude oil. Usually trades $2-4 above WTI.</div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h2 className="font-black text-gray-900 mb-4">Calculate barrel Cost</h2>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity (barrel): <span className="text-orange-600 font-black">{qty.toLocaleString()}</span></label>
              <input type="range" min="1" max="100000" step="100" value={qty} onChange={e=>setQty(+e.target.value)} className="w-full accent-orange-500" />
              <input type="number" value={qty} onChange={e=>setQty(+e.target.value)} className="mt-2 w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 font-bold" />
            </div>
            <div className="bg-orange-50 rounded-2xl border border-orange-200 p-5 text-center mb-4">
              <p className="text-sm text-gray-500 mb-1">Total Value ({qty.toLocaleString()} barrels)</p>
              <p className="text-4xl font-black text-orange-700">${(c.price*qty).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
              <p className="text-sm text-gray-500 mt-1">@ ${c.price.toFixed(3)} per barrel live spot</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {conversions.map((conv: {label:string;factor:number;unit:string}) => (
                <div key={conv.label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <p className="text-[10px] text-gray-400 mb-1">{qty} {conv.unit}</p>
                  <p className="font-black text-gray-900 text-sm">${(c.price*qty*conv.factor).toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{conv.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['Crude WTI','🛢️','/commodities/crude-oil-calculator'],['Brent Crude','⛽','/commodities/brent-crude-calculator'],['Natural Gas','🔥','/commodities/natural-gas-calculator'],['All Commodities','📊','/commodities']].map(([n,e,h]) => (
              <Link key={h} href={h} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-card hover:border-orange-200 transition-all text-xs font-bold text-gray-700 group">
                <span className="text-lg">{e}</span>{n}<ArrowRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-orange-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
