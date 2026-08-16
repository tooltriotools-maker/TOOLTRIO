'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, X, Smile, BookOpen, MapPin } from 'lucide-react'
import { PUBLIC_TOOL_REGISTRY, BLOG_CATALOG, TOOL_COUNTS } from '@/lib/catalog'

const META: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Fun: { color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <Smile className="h-3 w-3" /> },
  Blog: { color: 'text-zinc-600', bg: 'bg-zinc-100', icon: <BookOpen className="h-3 w-3" /> },
  ZIP: { color: 'text-zinc-700', bg: 'bg-zinc-100', icon: <MapPin className="h-3 w-3" /> },
}

const ITEMS = [
  ...PUBLIC_TOOL_REGISTRY.map(item => ({ name: item.name, href: item.href, cat: item.catLabel })),
  ...BLOG_CATALOG.map(item => ({ name: item.name, href: item.href, cat: item.cat })),
]
const TOTAL = PUBLIC_TOOL_REGISTRY.length + BLOG_CATALOG.length

export function GlobalSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('All')
  const inputRef = useRef<HTMLInputElement>(null)
  const ref = useRef<HTMLDivElement>(null)

  const openSearch = useCallback(() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 40) }, [])
  const closeSearch = useCallback(() => { setOpen(false); setQuery(''); setTab('All') }, [])

  useEffect(() => {
    const click = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) closeSearch() }
    document.addEventListener('mousedown', click)
    return () => document.removeEventListener('mousedown', click)
  }, [closeSearch])

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open ? closeSearch() : openSearch() } if (e.key === 'Escape') closeSearch() }
    document.addEventListener('keydown', key)
    return () => document.removeEventListener('keydown', key)
  }, [open, openSearch, closeSearch])

  const filtered = query.trim() ? ITEMS.filter(item => {
    const q = query.toLowerCase()
    return (tab === 'All' || item.cat === tab) && (item.name.toLowerCase().includes(q) || item.href.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q))
  }).slice(0, 18) : []

  return <div ref={ref} className={`relative ${className || ''}`}>
    <button onClick={openSearch} aria-label="Search ToolTrio" className="group flex min-h-11 w-full items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-500 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md">
      <Search className="h-4 w-4 text-zinc-400 group-hover:text-indigo-600" />
      <span className="flex-1 text-left text-xs sm:text-sm">Search {TOTAL}+ ZIP and web tools...</span>
      <kbd className="hidden rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400 sm:inline-flex">⌘K</kbd>
    </button>

    {open && <div className="absolute right-0 top-full z-[9999] mt-2 w-[min(520px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10">
      <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3"><Search className="h-4 w-4 text-indigo-600" /><input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search ZIP, distance, timezone, generators..." className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400" autoComplete="off" /><button onClick={query ? () => setQuery('') : closeSearch} className="rounded-md p-1.5 hover:bg-zinc-100"><X className="h-4 w-4 text-zinc-400" /></button></div>
      {query && <div className="flex gap-1 border-b border-zinc-100 px-3 py-2">{['All','ZIP','Fun','Blog'].map(t => <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-2.5 py-1 text-[11px] font-medium ${tab === t ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>{t}</button>)}</div>}
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {query ? (filtered.length ? filtered.map(item => { const meta = META[item.cat] || META.ZIP; return <Link key={item.href} href={item.href} onClick={closeSearch} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-zinc-50"><span className={`flex h-7 w-7 items-center justify-center rounded-lg ${meta.bg} ${meta.color}`}>{meta.icon}</span><span className="min-w-0 flex-1 truncate text-sm text-zinc-700">{item.name}</span><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${meta.bg} ${meta.color}`}>{item.cat}</span></Link> }) : <div className="px-6 py-10 text-center"><Search className="mx-auto h-7 w-7 text-zinc-300" /><p className="mt-3 text-sm font-medium text-zinc-700">No results found</p><p className="mt-1 text-xs text-zinc-400">Try a ZIP tool, guide or generator.</p></div>) : <div className="p-3"><p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[.15em] text-zinc-400">Browse</p><div className="grid grid-cols-3 gap-2">{[['ZIP', TOOL_COUNTS.zip], ['Fun', TOOL_COUNTS.fun], ['Blog', BLOG_CATALOG.length]].map(([label,count]) => <button key={label as string} onClick={() => { setQuery(label as string); setTab(label as string === 'ZIP' || label as string === 'Fun' || label as string === 'Blog' ? label as string : 'All') }} className="rounded-xl border border-zinc-200 p-3 text-left hover:border-indigo-200 hover:bg-indigo-50"><p className="text-sm font-semibold text-zinc-900">{count as number}</p><p className="text-[10px] text-zinc-500">{label as string}</p></button>)}</div></div>}
      </div>
    </div>}
  </div>
}
