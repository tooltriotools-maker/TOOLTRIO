'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronDown, MapPin, Menu, Search, Sparkles, X } from 'lucide-react'
import { GlobalSearch } from '@/components/ui/GlobalSearch'
import { TOOL_COUNTS } from '@/lib/catalog'

const NAV = [
  { key: 'zip', label: 'ZIP Tools', href: '/zip', icon: MapPin, items: [
    ['ZIP Code Lookup', '/zip/zip-code-lookup'], ['ZIP+4 Lookup', '/zip/zip-plus-4-lookup'], ['ZIP Code Distance', '/zip/zip-code-distance'], ['ZIP Code Timezone', '/zip/zip-to-timezone'], ['ZIP to Coordinates', '/zip/zip-to-coordinates'], ['ZIP Code Map', '/zip/zip-code-map'],
  ] },
  { key: 'fun', label: 'Generators', href: '/fun', icon: Sparkles, items: [
    ['Shakespeare Insult Generator', '/fun/shakespeare-insult-generator'], ['Insult Generator', '/fun/insult-generator'], ['Trivia Quiz', '/fun/trivia-quiz'], ['Zodiac Calculator', '/fun/zodiac-calculator'],
  ] },
  { key: 'guides', label: 'Guides', href: '/blog/category/zip-codes', icon: BookOpen, items: [
    ['ZIP+4 Guide', '/blog/what-is-a-zip-plus-4-code'], ['ZIP Code Lookup Guide', '/blog/how-to-find-a-zip-code-from-an-address'], ['ZIP Distance Guide', '/blog/how-far-apart-are-two-zip-codes'], ['ZIP Timezone Guide', '/blog/how-to-find-a-time-zone-from-a-zip-code'],
  ] },
]

export function Header() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header ref={ref} className="sticky top-0 z-[9990] border-b border-zinc-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-3 flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
          <img src="/tooltrio-header.png" alt="ToolTrio" className="h-8 w-auto object-contain" />
          <span className="text-[15px] font-semibold tracking-[-.02em] text-zinc-950">ToolTrio</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {NAV.map(item => {
            const Icon = item.icon
            const isOpen = open === item.key
            return (
              <div key={item.key} className="relative">
                <button onClick={() => setOpen(isOpen ? null : item.key)} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isOpen ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`} aria-expanded={isOpen}>
                  <Icon className="h-4 w-4" strokeWidth={1.7} />{item.label}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-900/10">
                  <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[.15em] text-zinc-400">{item.label}</div>
                  {item.items.map(([name, href]) => <Link key={href} href={href} onClick={() => setOpen(null)} className="block rounded-xl px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950">{name}</Link>)}
                  <Link href={item.href} onClick={() => setOpen(null)} className="mt-1 block rounded-xl border border-zinc-200 px-3 py-2.5 text-center text-xs font-semibold text-zinc-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">View all {item.key === 'zip' ? TOOL_COUNTS.zip : item.key === 'fun' ? TOOL_COUNTS.fun : 'guides'} →</Link>
                </div>}
              </div>
            )
          })}
        </nav>

        <div className="ml-auto hidden w-64 sm:w-72 lg:block"><GlobalSearch /></div>
        <Link href="/about" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 xl:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Status</Link>
        <button onClick={() => setMobile(v => !v)} className="ml-auto rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden" aria-label={mobile ? 'Close menu' : 'Open menu'}>{mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>

      {mobile && <div className="border-t border-zinc-200/70 bg-white px-4 py-3 lg:hidden">
        <div className="mb-3"><GlobalSearch className="w-full" /></div>
        <div className="space-y-1">
          {NAV.map(item => { const Icon = item.icon; return <div key={item.key} className="rounded-xl border border-zinc-200/70">
            <Link href={item.href} onClick={() => setMobile(false)} className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-zinc-800"><Icon className="h-4 w-4 text-zinc-500" />{item.label}<span className="ml-auto text-[10px] text-zinc-400">{item.key === 'zip' ? `${TOOL_COUNTS.zip} tools` : item.key === 'fun' ? `${TOOL_COUNTS.fun} tools` : 'Guides'}</span></Link>
            <div className="border-t border-zinc-100 px-2 py-1.5">{item.items.map(([name, href]) => <Link key={href} href={href} onClick={() => setMobile(false)} className="block rounded-lg px-2 py-2 text-xs text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900">{name}</Link>)}</div>
          </div> })}
        </div>
      </div>}
    </header>
  )
}
