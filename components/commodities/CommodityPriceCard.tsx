'use client'
import type { CommodityPrice } from '@/hooks/useCommodityPrices'
import { TrendingUp, TrendingDown, Minus, Wifi, WifiOff } from 'lucide-react'

interface Props {
  commodity: CommodityPrice
  emoji: string
  href?: string
  currency?: string
  fxRate?: number
  currencySymbol?: string
  loading?: boolean
}

function formatPrice(price: number, fxRate = 1, currencySymbol = '$') {
  const p = price * fxRate
  if (p >= 1000) return `${currencySymbol}${p.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`
  if (p >= 10)   return `${currencySymbol}${p.toFixed(2)}`
  return `${currencySymbol}${p.toFixed(4)}`
}

function formatChange(chg: number, pct: number, fxRate = 1, sym = '$') {
  const c = chg * fxRate
  const sign = c >= 0 ? '+' : ''
  return `${sign}${sym}${Math.abs(c).toFixed(c >= 10 ? 2 : 3)} (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)`
}

export function CommodityPriceCard({ commodity, emoji, href, currency = 'USD', fxRate = 1, currencySymbol = '$' }: Props) {
  const up = commodity.changePct >= 0
  const flat = commodity.changePct === 0

  const card = (
    <div className={`relative p-4 rounded-2xl border bg-gradient-to-br transition-all duration-300
      ${up ? 'from-green-50/80 border-green-200' : 'from-red-50/80 border-red-200'}
      ${href ? 'hover:shadow-md hover:scale-[1.01] cursor-pointer' : ''}
    `}>

      {/* Live / Stale badge - top right */}
      <div className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border
        ${commodity.live
          ? 'bg-green-100 text-green-700 border-green-200'
          : 'bg-gray-100 text-gray-500 border-gray-200'
        }`}>
        {commodity.live
          ? <><Wifi className="w-2.5 h-2.5" /> LIVE</>
          : <><WifiOff className="w-2.5 h-2.5" /> CACHED</>
        }
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-2 pr-16">
        <span className="text-2xl">{emoji}</span>
        <div>
          <p className="font-black text-gray-900 text-sm leading-tight">{commodity.name}</p>
          <p className="text-[10px] text-gray-400 font-mono">{commodity.symbol} - per {commodity.unit}</p>
        </div>
      </div>

      {/* Price */}
      <p className="text-2xl font-black text-gray-900 leading-none mb-1">
        {formatPrice(commodity.price, fxRate, currencySymbol)}
      </p>

      {/* Change */}
      <div className={`flex items-center gap-1 text-xs font-bold ${up ? 'text-green-600' : flat ? 'text-gray-500' : 'text-red-500'}`}>
        {flat ? <Minus className="w-3.5 h-3.5" /> : up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        {formatChange(commodity.change, commodity.changePct, fxRate, currencySymbol)}
      </div>

      {/* Source + timestamp */}
      <p className="text-[9px] text-gray-400 mt-2 font-mono truncate">
        {commodity.live && commodity.lastUpdated
          ? `Updated ${commodity.lastUpdated.toLocaleTimeString()} - ${commodity.source}`
          : commodity.source === 'loading...'
          ? 'Fetching live price...'
          : `Last: ${commodity.source}`
        }
      </p>
    </div>
  )

  if (href) {
    return <a href={href}>{card}</a>
  }
  return card
}

// -- Compact ticker row variant ----------------------------------------------
export function CommodityRow({ commodity, emoji, fxRate = 1, currencySymbol = '$' }: Omit<Props,'href'>) {
  const up = commodity.changePct >= 0
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-base">{emoji}</span>
        <span className="text-sm font-semibold text-gray-800">{commodity.name}</span>
        {commodity.live && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" title="Live" />}
      </div>
      <div className="text-right">
        <p className="text-sm font-black text-gray-900">{formatPrice(commodity.price, fxRate, currencySymbol)}</p>
        <p className={`text-[11px] font-bold ${up ? 'text-green-600' : 'text-red-500'}`}>
          {up ? '+' : ''}{commodity.changePct.toFixed(2)}%
        </p>
      </div>
    </div>
  )
}
