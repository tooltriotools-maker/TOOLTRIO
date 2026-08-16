'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight, BadgeCheck, BookOpen, Check, Clock3, FileText, Flame, Globe2,
  Heart, Map, MapPin, Navigation, Ruler, Search, ShieldCheck, Sparkles, Zap,
  ChevronDown, Calculator, Compass, LocateFixed
} from 'lucide-react'
import { GlobalSearch } from '@/components/ui/GlobalSearch'

type Tool = {
  name: string
  desc: string
  href: string
  icon: LucideIcon
  badge?: string | null
}

const ZIP_TOOLS: Tool[] = [
  { name:'ZIP Code Lookup', desc:'City, state, county and timezone for any US ZIP.', href:'/zip/zip-code-lookup', icon:MapPin, badge:'Most searched' },
  { name:'ZIP Code Distance', desc:'Compare miles and kilometers between two ZIP codes.', href:'/zip/zip-code-distance', icon:Ruler, badge:'Popular' },
  { name:'ZIP+4 Lookup', desc:'Find the four-digit extension used for mail delivery.', href:'/zip/zip-plus-4-lookup', icon:FileText, badge:'Popular' },
  { name:'ZIP Code Timezone', desc:'Identify the US timezone for a ZIP code instantly.', href:'/zip/zip-to-timezone', icon:Clock3, badge:'Popular' },
  { name:'ZIP to Coordinates', desc:'Get latitude and longitude for a US ZIP code.', href:'/zip/zip-to-coordinates', icon:Globe2, badge:'Popular' },
  { name:'ZIP Code Map', desc:'Explore ZIP boundaries and geographic context.', href:'/zip/zip-code-map', icon:Map, badge:null },
]

const FUN_TOOLS: Tool[] = [
  { name:'Shakespeare Insult Generator', desc:'Theatrical Elizabethan-style insults, instantly generated.', href:'/fun/shakespeare-insult-generator', icon:Sparkles, badge:'Featured' },
  { name:'Insult Generator', desc:'Themed roasts, comebacks and playful burns.', href:'/fun/insult-generator', icon:Flame, badge:'Popular' },
  { name:'Trivia Quiz', desc:'Quick random trivia for solo play or groups.', href:'/fun/trivia-quiz', icon:Calculator, badge:null },
  { name:'Zodiac Calculator', desc:'Find your sign and explore fun compatibility.', href:'/fun/zodiac-calculator', icon:Compass, badge:null },
  { name:'Love Compatibility', desc:'A lighthearted name-based compatibility score.', href:'/fun/love-compatibility', icon:Heart, badge:null },
]

const GUIDE_LINKS = [
  { title:'What Is a ZIP+4 Code? The Extra 4 Digits Explained', href:'/blog/what-is-a-zip-plus-4-code', read:'5 min read' },
  { title:'How to Find a ZIP Code From an Address', href:'/blog/how-to-find-a-zip-code-from-an-address', read:'5 min read' },
  { title:'How to Find ZIP Codes Within a Radius', href:'/blog/how-to-find-zip-codes-within-a-radius', read:'6 min read' },
  { title:'How Far Apart Are Two ZIP Codes? Distance Explained', href:'/blog/how-far-apart-are-two-zip-codes', read:'5 min read' },
  { title:'How to Find the Timezone for a ZIP Code', href:'/blog/how-to-find-a-time-zone-from-a-zip-code', read:'4 min read' },
  { title:'ZIP Code vs Postal Code: What Is the Difference?', href:'/blog/zip-code-vs-postal-code', read:'4 min read' },
]

const FAQS = [
  ['What is ToolTrio?','ToolTrio is a free collection of fast US ZIP utilities, calculators and lightweight fun generators. No signup is required.'],
  ['How do I find a city and state from a ZIP code?','Enter a 5-digit US ZIP code in ZIP Code Lookup to see the city, state, county, timezone and other available location details.'],
  ['Can I calculate the distance between two ZIP codes?','Yes. ZIP Code Distance calculates the straight-line distance between two US ZIP codes in miles and kilometers.'],
  ['How do I find my ZIP+4?','Use ZIP+4 Lookup for the base ZIP and use the official USPS address lookup when you need the exact delivery-point suffix.'],
  ['Does ToolTrio have fun tools too?','Yes. The Fun category includes insult generators, trivia, zodiac and compatibility tools.'],
  ['Are ToolTrio tools free?','Yes. Public ToolTrio tools are free to use without registration or a subscription.'],
]

function IconBox({ tool, fun = false, large = false }: { tool: Tool; fun?: boolean; large?: boolean }) {
  const Icon = tool.icon
  return (
    <div className={`relative flex shrink-0 items-center justify-center rounded-2xl border ${large ? 'h-14 w-14' : 'h-11 w-11'} ${fun ? 'border-fuchsia-300/20 bg-fuchsia-500/10 text-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,.12)]' : 'border-emerald-300/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,.12)]'}`}>
      <Icon className={large ? 'h-6 w-6' : 'h-5 w-5'} strokeWidth={1.8} />
    </div>
  )
}

function PremiumToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const Icon = tool.icon
  const accents = [
    'from-emerald-400/20 via-emerald-500/5 to-transparent',
    'from-cyan-400/20 via-cyan-500/5 to-transparent',
    'from-violet-400/20 via-violet-500/5 to-transparent',
    'from-orange-400/20 via-orange-500/5 to-transparent',
    'from-sky-400/20 via-sky-500/5 to-transparent',
    'from-blue-400/20 via-blue-500/5 to-transparent',
  ]
  const iconTones = [
    'border-emerald-300/20 bg-emerald-400/10 text-emerald-300',
    'border-cyan-300/20 bg-cyan-400/10 text-cyan-300',
    'border-violet-300/20 bg-violet-400/10 text-violet-300',
    'border-orange-300/20 bg-orange-400/10 text-orange-300',
    'border-sky-300/20 bg-sky-400/10 text-sky-300',
    'border-blue-300/20 bg-blue-400/10 text-blue-300',
  ]
  return (
    <Link href={tool.href} className="group relative min-h-[205px] overflow-hidden rounded-[24px] border border-white/10 bg-[#101722] p-5 shadow-[0_14px_45px_rgba(0,0,0,.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_22px_55px_rgba(0,0,0,.32)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${accents[index % accents.length]} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.03] blur-2xl transition-transform duration-500 group-hover:scale-150" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${iconTones[index % iconTones.length]}`}>
            <Icon className="h-5.5 w-5.5" strokeWidth={1.8} />
          </div>
          {tool.badge && <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white/60">{tool.badge}</span>}
        </div>
        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-extrabold tracking-tight text-white">{tool.name}</h3>
              <p className="mt-2 max-w-[240px] text-xs leading-5 text-slate-400">{tool.desc}</p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-500 transition-all group-hover:translate-x-1 group-hover:border-white/20 group-hover:text-white">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function LightToolCard({ tool, fun = false }: { tool: Tool; fun?: boolean }) {
  const Icon = tool.icon
  return (
    <Link href={tool.href} className="group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,.05)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,.10)]">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${fun ? 'from-fuchsia-500 via-pink-400 to-orange-400' : 'from-emerald-500 via-cyan-400 to-blue-500'} opacity-0 transition-opacity group-hover:opacity-100`} />
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${fun ? 'bg-fuchsia-50 text-fuchsia-600' : 'bg-emerald-50 text-emerald-600'}`}>
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        {tool.badge && <span className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[.1em] ${fun ? 'bg-fuchsia-50 text-fuchsia-700' : 'bg-emerald-50 text-emerald-700'}`}>{tool.badge}</span>}
      </div>
      <h3 className="mt-5 text-sm font-extrabold tracking-tight text-slate-950">{tool.name}</h3>
      <p className="mt-1.5 text-xs leading-5 text-slate-500">{tool.desc}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 transition-colors group-hover:text-slate-900">Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  )
}

export function HomePageClient({ zipCount, funCount }: { zipCount: number; funCount: number }) {
  const popular = [...ZIP_TOOLS.slice(0, 5), FUN_TOOLS[0], FUN_TOOLS[1]]

  return (
    <main className="home-premium-noise min-h-screen overflow-hidden bg-[#f5f7f8] text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#060a11] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,.20),transparent_27%),radial-gradient(circle_at_88%_15%,rgba(99,102,241,.18),transparent_28%),radial-gradient(circle_at_55%_100%,rgba(217,70,239,.10),transparent_32%)]" />
        <div className="absolute left-[7%] top-28 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]" />
        <div className="absolute right-[5%] top-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[.15em] text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,.10)]">
              <BadgeCheck className="h-3.5 w-3.5" /> Free · No signup · Instant results
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl lg:text-[66px] lg:leading-[1.02]">
              Every US ZIP utility,
              <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">instant and free.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Lookup ZIP codes, compare distance, find ZIP+4, identify timezones and coordinates — with a fast collection of fun tools when you want a break.
            </p>

            <div className="mx-auto mt-8 max-w-2xl rounded-[22px] border border-white/10 bg-white/[0.06] p-1.5 shadow-[0_20px_70px_rgba(0,0,0,.35)] backdrop-blur-xl">
              <div className="rounded-[17px] bg-white/[0.97] p-1 text-slate-900">
                <GlobalSearch className="w-full" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {['ZIP Code Lookup','ZIP Distance','ZIP+4','Timezone','Coordinates'].map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold text-slate-400">{x}</span>
              ))}
            </div>
          </div>

          {/* DARK BENTO QUICK ACCESS */}
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {ZIP_TOOLS.map((tool, i) => <div key={tool.href} className={i === 0 ? 'lg:col-span-2' : 'lg:col-span-1'}><PremiumToolCard tool={tool} index={i} /></div>)}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-semibold text-slate-500">
            <span><strong className="text-white">{zipCount}</strong> ZIP tools</span>
            <span><strong className="text-white">{funCount}</strong> Fun tools</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Runs in your browser</span>
          </div>
        </div>
      </section>

      {/* POPULAR RAIL */}
      <section className="sticky top-[60px] z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:px-8">
          <span className="shrink-0 text-[9px] font-black uppercase tracking-[.18em] text-slate-400">Popular now</span>
          {popular.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-950 hover:text-white">
              <tool.icon className="h-3.5 w-3.5" /> {tool.name}
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORY DIRECTORY */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-600">Browse by category</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-slate-950 sm:text-4xl">Tools that do the work.<br className="hidden sm:block" /> Tools that make it fun.</h2>
          </div>
          <Link href="/zip" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-slate-950">Browse all ZIP tools <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,.06)] sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><LocateFixed className="h-5 w-5" /></div>
                <div><h3 className="text-base font-black">ZIP Tools</h3><p className="text-[11px] text-slate-400">Location utilities</p></div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-700">{zipCount} tools</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">{ZIP_TOOLS.map(tool => <LightToolCard key={tool.href} tool={tool} />)}</div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-[#101017] p-5 text-white shadow-[0_18px_55px_rgba(15,23,42,.18)] sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-300"><Sparkles className="h-5 w-5" /></div>
                <div><h3 className="text-base font-black">Fun & Entertainment</h3><p className="text-[11px] text-slate-500">Generators & quick games</p></div>
              </div>
              <span className="rounded-full bg-fuchsia-500/10 px-3 py-1.5 text-[10px] font-black text-fuchsia-300">{funCount} tools</span>
            </div>
            <div className="space-y-3">
              {FUN_TOOLS.map((tool, i) => (
                <Link key={tool.href} href={tool.href} className="group flex items-center gap-3 rounded-[20px] border border-white/8 bg-white/[0.04] p-3.5 transition-all hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-fuchsia-300/20">
                  <IconBox tool={tool} fun />
                  <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-extrabold text-white">{tool.name}</h3><p className="mt-0.5 truncate text-[11px] text-slate-500">{tool.desc}</p></div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-fuchsia-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMAND SEARCH */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#070b13] p-7 text-white shadow-[0_25px_70px_rgba(0,0,0,.22)] sm:p-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-[80px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.15em] text-emerald-300"><Search className="h-3.5 w-3.5" /> One search for every tool</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-4xl">Stop hunting through menus.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Search ZIP utilities, Fun tools and guides from one command bar. Press <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">⌘K</kbd> or <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">Ctrl K</kbd>.</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-1.5"><div className="rounded-[17px] bg-white/[0.96] p-1"><GlobalSearch className="w-full" /></div></div>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-blue-600">SEO & educational hub</p><h2 className="mt-2 text-3xl font-black tracking-[-.04em]">ZIP guides people actually search for</h2></div>
            <Link href="/blog/category/zip-codes" className="inline-flex items-center gap-1 text-sm font-extrabold text-blue-700">All ZIP guides <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_LINKS.map((g, i) => (
              <Link key={g.href} href={g.href} className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-blue-500/5 blur-2xl transition-transform group-hover:scale-150" />
                <div className="relative flex items-center justify-between gap-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[.1em] text-blue-700"><BookOpen className="h-3 w-3" /> ZIP Guide</span><span className="text-[10px] text-slate-400">{g.read}</span></div>
                <h3 className="relative mt-5 text-sm font-extrabold leading-5 text-slate-950">{g.title}</h3>
                <span className="relative mt-5 inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 transition-colors group-hover:text-blue-700">Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Zap,'Instant results','Built for quick lookups','bg-emerald-50 text-emerald-600'],
            [ShieldCheck,'No signup','No account required','bg-blue-50 text-blue-600'],
            [Check,'Free to use','No subscription gate','bg-violet-50 text-violet-600'],
            [Navigation,'Works everywhere','Desktop, tablet & mobile','bg-orange-50 text-orange-600'],
          ].map(([Icon,title,desc,classes]) => { const I = Icon as typeof Zap; return <div key={title as string} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm"><div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-2xl ${classes as string}`}><I className="h-5 w-5" /></div><p className="mt-3 text-center text-sm font-black">{title as string}</p><p className="mt-1 text-center text-[11px] text-slate-400">{desc as string}</p></div> })}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-[#f8fafb]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 text-center"><p className="text-[10px] font-black uppercase tracking-[.22em] text-slate-400">FAQ</p><h2 className="mt-2 text-3xl font-black tracking-[-.04em]">Frequently asked questions</h2></div>
          <div className="grid gap-3 md:grid-cols-2">
            {FAQS.map(([q,a]) => <details key={q} className="group rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition-all open:shadow-md"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold"><span>{q}</span><ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" /></summary><p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-6 text-slate-500">{a}</p></details>)}
          </div>
        </div>
      </section>
    </main>
  )
}
