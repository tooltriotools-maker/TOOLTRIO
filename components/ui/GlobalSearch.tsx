'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, X, Smile, BookOpen, BarChart2 } from 'lucide-react'
import { PUBLIC_TOOL_REGISTRY, BLOG_CATALOG, TOOL_COUNTS } from '@/lib/catalog'

const CAT_META: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Fun:     { color: 'text-purple-600',bg: 'bg-purple-100',icon: <Smile className="w-3 h-3" /> },
  Blog:    { color: 'text-orange-600',bg: 'bg-orange-100',icon: <BookOpen className="w-3 h-3" /> },
  ZIP:     { color: 'text-cyan-600',  bg: 'bg-cyan-100',  icon: <BarChart2 className="w-3 h-3" /> },
}

const TRENDING: { name: string; href: string; cat: string }[] = [
]

const PUBLIC_BLOG_CATALOG = BLOG_CATALOG
const BLOG_COUNT = PUBLIC_BLOG_CATALOG.length
const FUN_COUNT = TOOL_COUNTS.fun
const ZIP_COUNT = TOOL_COUNTS.zip
const TOTAL = PUBLIC_TOOL_REGISTRY.length + BLOG_COUNT
const CATEGORY_ITEMS = [
  { name: 'Insult Generators', href: '/fun/insult-generator', cat: 'Fun' },
]
const ITEMS = [
  ...CATEGORY_ITEMS,
  ...PUBLIC_TOOL_REGISTRY.map(item => ({ name: item.name, href: item.href, cat: item.catLabel })),
  ...PUBLIC_BLOG_CATALOG.map(item => ({ name: item.name, href: item.href, cat: item.cat })),
]

export function GlobalSearch({ className }: { className?: string }) {
  const [open, setOpen]   = useState(false)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<string>('All')
  const inputRef          = useRef<HTMLInputElement>(null)
  const containerRef      = useRef<HTMLDivElement>(null)

  const filtered = query.trim().length >= 1
    ? ITEMS.filter(item => {
        const q = query.toLowerCase()
        const matchesText = item.name.toLowerCase().includes(q) ||
          item.cat.toLowerCase().includes(q) ||
          item.href.toLowerCase().includes(q)
        const matchesTab = activeTab === 'All' || item.cat === activeTab
        return matchesText && matchesTab
      })
      .sort((a, b) => {
        const q = query.toLowerCase()
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        // Exact match first
        if (aName === q && bName !== q) return -1
        if (bName === q && aName !== q) return 1
        // Starts with query
        if (aName.startsWith(q) && !bName.startsWith(q)) return -1
        if (bName.startsWith(q) && !aName.startsWith(q)) return 1
        // Calculator category before blog
        if (a.cat !== 'Blog' && b.cat === 'Blog') return -1
        if (b.cat !== 'Blog' && a.cat === 'Blog') return 1
        return aName.localeCompare(bName)
      })
      .slice(0, 20)
    : []

  const openSearch = useCallback(() => {
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const closeSearch = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveTab('All')
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) closeSearch()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, closeSearch])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open ? closeSearch() : openSearch() }
      if (e.key === 'Escape') closeSearch()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, openSearch, closeSearch])

  const tabs = ['All', 'Fun', 'ZIP', 'Blog']

  return (
    <div ref={containerRef} className={`relative ${className || ''}`}>
      {/* Trigger */}
      <button
        onClick={openSearch}
        className="flex items-center gap-2 px-3 py-2 rounded-2xl border text-sm text-gray-500 w-full group"
        style={{background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)', borderColor:'#e2e8f0', boxShadow:'0 4px 16px rgba(0,0,0,0.06)', transition:'all 0.3s cubic-bezier(.4,0,.2,1)', minHeight:'44px'}}
        onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='#22c55e';el.style.boxShadow='0 0 0 4px rgba(34,197,94,0.1)';}}
        onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='#e2e8f0';el.style.boxShadow='0 4px 16px rgba(0,0,0,0.06)';}}
        aria-label="Search calculators and guides"
      >
        <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-green-500 flex-shrink-0" />
        <span className="flex-1 text-left text-sm">Search {TOTAL}+ tools...</span>
        <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-400 border border-gray-200 font-mono">⌘K</kbd>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-[min(480px,calc(100vw-16px))] border rounded-3xl z-[9999] overflow-hidden" style={{background:'rgba(255,255,255,0.96)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', borderColor:'rgba(255,255,255,0.6)', boxShadow:'0 20px 60px rgba(15,23,42,0.15)'}}>
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <Search className="w-4 h-4 text-green-500 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${TOTAL}+ calculators & guides...`}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            <button onClick={query ? () => setQuery('') : closeSearch} className="p-1 rounded-lg hover:bg-gray-100 transition-all">
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* Category Tabs */}
          {query.trim().length >= 1 && (
            <div className="flex gap-1 px-3 py-2 border-b border-gray-100 overflow-x-auto">
              {tabs.map(tab => {
                const meta = CAT_META[tab]
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          )}

          {/* Results */}
          <div className="max-h-[65vh] overflow-y-auto">
            {query.trim().length >= 1 ? (
              filtered.length > 0 ? (
                <div className="p-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-1.5">
                    {filtered.length} result{filtered.length !== 1 ? 's' : ''}{activeTab !== 'All' ? ` in ${activeTab}` : ''}
                  </p>
                  {filtered.map(item => {
                    const meta = CAT_META[item.cat] || CAT_META.Fun
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeSearch}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-all group"
                      >
                        <span className={`w-6 h-6 rounded-lg ${meta.bg} flex items-center justify-center flex-shrink-0 ${meta.color}`} style={{display:'inline-flex'}}>
                          {meta.icon}
                        </span>
                        <span className="flex-1 text-sm font-medium text-gray-800 group-hover:text-green-700 truncate">
                          {item.name}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${meta.bg} ${meta.color}`}>
                          {item.cat}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-gray-600 mb-1">No results for "{query}"</p>
                  <p className="text-xs text-gray-400">Try "ZIP", "Fun", or a tool name</p>
                </div>
              )
            ) : (
              <div className="p-3">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1.5">🔥 Trending</p>
                {TRENDING.map(item => {
                  const meta = CAT_META[item.cat] || CAT_META.Fun
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeSearch}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-all group"
                    >
                      <BarChart2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-gray-700 group-hover:text-green-700 font-medium">{item.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>{item.cat}</span>
                    </Link>
                  )
                })}
                <div className="mt-3 pt-2 border-t border-gray-100 grid grid-cols-4 gap-1 px-2">
                  {[
                    ['Fun', FUN_COUNT, 'text-purple-600 bg-purple-50'],
                    ['ZIP', ZIP_COUNT, 'text-cyan-600 bg-cyan-50'],
                    ['Blog', BLOG_COUNT, 'text-orange-600 bg-orange-50'],
                  ].map(([cat, count, cls]) => (
                    <button
                      key={cat as string}
                      onClick={() => { setQuery(cat as string); setActiveTab(cat as string) }}
                      className={`text-center p-2 rounded-xl ${cls} transition-all hover:opacity-80`}
                    >
                      <p className="text-sm font-black">{count}</p>
                      <p className="text-[10px] font-semibold">{cat}</p>
                    </button>
                  ))}
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-2 pb-1">
                  {TOTAL} total tools -- type to search all
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
