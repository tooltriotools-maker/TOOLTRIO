'use client'
import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Calc {
  name: string
  desc: string
  href: string
  icon: string
  badge?: string | null
  tag?: string
}

interface Props {
  title: string
  subtitle: string
  icon: ReactNode
  calcs: Calc[]
  viewAllHref: string
  viewAllLabel: string
  accentColor: 'green' | 'red' | 'blue' | 'purple'
  initialCount?: number
}

const COLOR = {
  green:  { btn: 'bg-green-600 hover:bg-green-700', link: 'text-green-600 hover:text-green-700', hover: 'hover:border-green-200 hover:shadow-card-hover', icon: 'w-6 h-6 text-green-600', badge: 'bg-green-100 text-green-700 border-green-200' },
  red:    { btn: 'bg-red-500 hover:bg-red-600',     link: 'text-red-500 hover:text-red-600',     hover: 'hover:border-red-200 hover:shadow-card-hover',   icon: 'w-6 h-6 text-red-500',   badge: 'bg-red-100 text-red-700 border-red-200' },
  blue:   { btn: 'bg-blue-600 hover:bg-blue-700',   link: 'text-blue-600 hover:text-blue-700',   hover: 'hover:border-blue-200 hover:shadow-card-hover',  icon: 'w-6 h-6 text-blue-600',  badge: 'bg-blue-100 text-blue-700 border-blue-200' },
  purple: { btn: 'bg-purple-600 hover:bg-purple-700', link: 'text-purple-600 hover:text-purple-700', hover: 'hover:border-purple-200', icon: 'w-6 h-6 text-purple-600', badge: 'bg-purple-100 text-purple-700 border-purple-200' },
}

const BADGE_COLORS: Record<string, string> = {
  UK: 'bg-red-50 text-red-700 border-red-200',
  USA: 'bg-blue-50 text-blue-700 border-blue-200',
  EU: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  VS: 'bg-rose-50 text-rose-700 border-rose-200',
  Popular: 'bg-green-100 text-green-700 border-green-200',
  India: 'bg-orange-50 text-orange-700 border-orange-200',
}

export default function HomeCategorySection({
  title, subtitle, icon, calcs, viewAllHref, viewAllLabel, accentColor, initialCount = 10
}: Props) {
  const c = COLOR[accentColor]
  const displayed = calcs.slice(0, initialCount)

  return (
    <section className="max-w-6xl mx-auto px-4 mb-14" aria-label={title}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-black font-display text-gray-900 flex items-center gap-2">
            <span className={c.icon}>{icon}</span> {title}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
        </div>
        <Link href={viewAllHref} className={`text-sm ${c.link} flex items-center gap-1 font-bold hidden sm:flex`}>
          {viewAllLabel} <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {displayed.map(calc => (
          <Link key={calc.href} href={calc.href}
            className={`group relative p-4 rounded-2xl bg-white border border-gray-100 shadow-card ${c.hover} transition-all duration-200`}>
            {(calc.badge || calc.tag) && (() => {
              const b = calc.badge || calc.tag || ''
              const bc = BADGE_COLORS[b] || c.badge
              return <span className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${bc}`}>{b}</span>
            })()}
            <span className="text-2xl mb-2 block">{calc.icon}</span>
            <p className={`font-bold text-gray-900 text-sm transition-colors leading-tight group-hover:${accentColor === 'green' ? 'text-green-700' : accentColor === 'red' ? 'text-red-600' : accentColor === 'blue' ? 'text-blue-700' : 'text-purple-700'}`}>{calc.name}</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{calc.desc}</p>
          </Link>
        ))}
      </div>
      {/* View All */}
      <div className="mt-5 text-center">
        <Link href={viewAllHref}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold border-2 ${
            accentColor === 'green' ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white' :
            accentColor === 'red' ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white' :
            accentColor === 'blue' ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' :
            'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
          } transition-all`}>
          {viewAllLabel}
        </Link>
      </div>
    </section>
  )
}
