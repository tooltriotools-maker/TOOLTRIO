'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Calc {
  name: string
  desc: string
  href: string
  icon: string
  tag: string
  popular?: boolean
}

interface Props {
  calculators: Calc[]
  tagColors: Record<string, string>
}

const FILTER_TABS = [
  { label: 'All', value: 'All' },
  { label: '⭐ Popular', value: 'popular' },
  { label: '🇮🇳 India', value: 'India' },
  { label: '🇺🇸 USA', value: 'USA' },
  { label: '🇬🇧 UK/EU', value: 'UK_EU' },
  { label: '⚖️ VS', value: 'VS' },
  { label: '🌐 Global', value: 'Global' },
  { label: '💰 Investment', value: 'Investment' },
  { label: '🏦 Loans', value: 'Loans' },
  { label: '🌅 Retirement', value: 'Retirement' },
  { label: '📋 Tax', value: 'Tax' },
]

export default function CalcFilterBar({ calculators, tagColors }: Props) {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let calcs = calculators

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase()
      calcs = calcs.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q)
      )
    }

    // Filter by tab
    if (active === 'All') return calcs
    if (active === 'popular') return calcs.filter(c => c.popular)
    if (active === 'UK_EU') return calcs.filter(c => ['UK', 'Europe', 'EU'].some(t => c.tag.includes(t)))
    return calcs.filter(c => c.tag === active)
  }, [calculators, active, search])

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search calculators..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => { setActive(tab.value); setSearch('') }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              active === tab.value
                ? 'bg-green-600 text-white border-green-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400 mb-4 font-medium">
        Showing {filtered.length} of {calculators.length} calculators
        {active !== 'All' && ` - ${FILTER_TABS.find(t => t.value === active)?.label}`}
        {search && ` - matching "${search}"`}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(calc => (
          <Link key={calc.href} href={calc.href}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-green-400 hover:shadow-xl transition-all duration-200 p-5 flex flex-col shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-2xl group-hover:bg-green-100 transition-colors">{calc.icon}</div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${tagColors[calc.tag] || 'bg-gray-100 text-gray-600'}`}>{calc.tag}</span>
            </div>
            <h2 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-1.5">{calc.name}</h2>
            <p className="text-xs text-gray-500 flex-1 leading-relaxed">{calc.desc}</p>
            <div className="flex items-center gap-1 mt-4 text-xs font-bold text-green-600 group-hover:gap-2 transition-all">
              Open Calculator <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold">No calculators found for "{search}"</p>
          <button onClick={() => { setSearch(''); setActive('All') }}
            className="mt-3 text-sm text-green-600 underline">Clear filters</button>
        </div>
      )}
    </div>
  )
}
