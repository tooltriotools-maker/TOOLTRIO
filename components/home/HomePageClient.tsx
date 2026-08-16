'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight, BookOpen, Check, ChevronDown, Clock3, FileText, Flame, Globe2,
  Heart, Map, MapPin, Navigation, Ruler, ShieldCheck, Sparkles,
  Zap, LocateFixed, Route, Crosshair, BadgeCheck
} from 'lucide-react'
import { GlobalSearch } from '@/components/ui/GlobalSearch'

type Tool = {
  name: string
  desc: string
  href: string
  icon: LucideIcon
  badge?: string
}

const FEATURED_ZIP: Tool[] = [
  { name: 'ZIP Code Lookup', desc: 'City, state, county and timezone for any US ZIP.', href: '/zip/zip-code-lookup', icon: MapPin, badge: 'Most searched' },
  { name: 'ZIP+4 Lookup', desc: 'Find the 9-digit ZIP extension used for precise mail routing.', href: '/zip/zip-plus-4-lookup', icon: FileText, badge: 'Popular' },
  { name: 'ZIP Code Distance', desc: 'Compare straight-line distance between two ZIP codes.', href: '/zip/zip-code-distance', icon: Ruler, badge: 'Popular' },
  { name: 'ZIP Code Timezone', desc: 'Identify the US timezone for a ZIP code instantly.', href: '/zip/zip-to-timezone', icon: Clock3, badge: 'Popular' },
  { name: 'ZIP to Coordinates & Map', desc: 'Find latitude, longitude and geographic context.', href: '/zip/zip-to-coordinates', icon: Globe2, badge: 'Popular' },
]

const FEATURED_FUN: Tool[] = [
  { name: 'Shakespeare Insult Generator', desc: 'Instant Elizabethan-style creative insults.', href: '/fun/shakespeare-insult-generator', icon: Sparkles, badge: 'Featured' },
  { name: 'Insult Generator', desc: 'Playful roasts, comebacks and themed burns.', href: '/fun/insult-generator', icon: Flame, badge: 'Fun' },
]

const DIRECTORY_ZIP: Tool[] = [
  ...FEATURED_ZIP,
  { name: 'ZIP Code Map', desc: 'Explore ZIP boundaries and geographic context.', href: '/zip/zip-code-map', icon: Map },
  { name: 'ZIPs Within Radius', desc: 'Find ZIP codes around a location.', href: '/zip/zips-within-radius', icon: Crosshair },
  { name: 'ZIP Validator', desc: 'Check whether a ZIP code is valid.', href: '/zip/zip-code-validator', icon: BadgeCheck },
  { name: 'Drive Time by ZIP', desc: 'Estimate drive time between ZIP locations.', href: '/zip/drive-time-by-zip', icon: Route },
]

const DIRECTORY_FUN: Tool[] = [
  ...FEATURED_FUN,
  { name: 'Trivia Quiz', desc: 'Quick random trivia for solo play or groups.', href: '/fun/trivia-quiz', icon: Check },
  { name: 'Love Compatibility', desc: 'A lighthearted name-based compatibility tool.', href: '/fun/love-compatibility', icon: Heart },
  { name: 'Zodiac Calculator', desc: 'Find your sign and explore zodiac details.', href: '/fun/zodiac-calculator', icon: Sparkles },
]

const QUICK_FILTERS = [
  ['All Tools', '#all-tools'],
  ['ZIP Lookup', '/zip/zip-code-lookup'],
  ['ZIP+4', '/zip/zip-plus-4-lookup'],
  ['Distance', '/zip/zip-code-distance'],
  ['Timezone', '/zip/zip-to-timezone'],
  ['Fun Generators', '/fun'],
]

const GUIDES = [
  ['What Is a ZIP+4 Code? The Extra 4 Digits Explained', '/blog/what-is-a-zip-plus-4-code', '5 min'],
  ['How to Find a ZIP Code From an Address', '/blog/how-to-find-a-zip-code-from-an-address', '5 min'],
  ['How to Find ZIP Codes Within a Radius', '/blog/how-to-find-zip-codes-within-a-radius', '6 min'],
  ['How Far Apart Are Two ZIP Codes? Distance Explained', '/blog/how-far-apart-are-two-zip-codes', '5 min'],
  ['How to Find the Timezone for a ZIP Code', '/blog/how-to-find-a-time-zone-from-a-zip-code', '4 min'],
  ['ZIP Code vs Postal Code: What Is the Difference?', '/blog/zip-code-vs-postal-code', '4 min'],
]

const FAQS = [
  ['What is ToolTrio?', 'ToolTrio is a focused collection of free ZIP code utilities and lightweight fun generators. The tools are designed for quick, everyday lookups without an account.'],
  ['How do I find a city and state from a ZIP code?', 'Open ZIP Code Lookup and enter a 5-digit US ZIP code. The tool returns available city, state, county and timezone information.'],
  ['Can I calculate the distance between two ZIP codes?', 'Yes. ZIP Code Distance compares two ZIP codes and gives their straight-line distance in miles and kilometers.'],
  ['How do I find my ZIP+4?', 'Use ZIP+4 Lookup for the 9-digit extension. For exact delivery-point information tied to a street address, use the official USPS lookup.'],
  ['Does ToolTrio have fun generators?', 'Yes. ToolTrio also includes creative generators such as Shakespearean and general insult generators, plus quizzes and other light entertainment tools.'],
  ['Are ToolTrio tools free?', 'Yes. The public tools are free to use and do not require a subscription or account.'],
]

function IconBadge({ icon: Icon, tone = 'neutral', large = false }: { icon: LucideIcon; tone?: 'neutral' | 'indigo' | 'fun'; large?: boolean }) {
  const toneClass = tone === 'indigo'
    ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100'
    : tone === 'fun'
      ? 'bg-zinc-100 text-zinc-900 ring-1 ring-zinc-200'
      : 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200'
  return <span className={`inline-flex shrink-0 items-center justify-center rounded-xl ${large ? 'h-12 w-12' : 'h-10 w-10'} ${toneClass}`}><Icon className={large ? 'h-5.5 w-5.5' : 'h-4.5 w-4.5'} strokeWidth={1.7} /></span>
}

function FeaturedCard({ tool, variant = 'normal', className = '' }: { tool: Tool; variant?: 'normal' | 'large' | 'fun'; className?: string }) {
  const Icon = tool.icon
  const fun = variant === 'fun'
  return (
    <Link
      href={tool.href}
      className={`group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        fun
          ? 'border-zinc-800 bg-zinc-950 text-white hover:border-zinc-700'
          : 'border-zinc-200/80 bg-white text-zinc-900 hover:border-zinc-300'
      } ${variant === 'large' ? 'min-h-[260px] sm:p-6' : ''} ${className}`}
    >
      <div className={`absolute -right-14 -top-14 h-32 w-32 rounded-full blur-3xl transition-transform duration-300 group-hover:scale-125 ${fun ? 'bg-indigo-500/15' : 'bg-indigo-500/5'}`} />
      <div className="relative flex items-start justify-between gap-4">
        <IconBadge icon={Icon} tone={fun ? 'fun' : 'indigo'} large={variant === 'large'} />
        {tool.badge && <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${fun ? 'border-zinc-700 bg-zinc-900 text-zinc-400' : 'border-zinc-200 bg-zinc-50 text-zinc-500'}`}>{tool.badge}</span>}
      </div>
      <div className="relative mt-auto pt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className={`font-semibold tracking-tight ${variant === 'large' ? 'text-lg sm:text-xl' : 'text-[15px]'} ${fun ? 'text-white' : 'text-zinc-900'}`}>{tool.name}</h3>
            <p className={`mt-2 max-w-lg text-xs leading-5 ${fun ? 'text-zinc-500' : 'text-zinc-500'}`}>{tool.desc}</p>
          </div>
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 group-hover:translate-x-1 ${fun ? 'border-zinc-700 text-zinc-500 group-hover:border-zinc-500 group-hover:text-white' : 'border-zinc-200 text-zinc-400 group-hover:border-indigo-200 group-hover:text-indigo-600'}`}>
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function DirectoryCard({ tool, fun = false }: { tool: Tool; fun?: boolean }) {
  const Icon = tool.icon
  return (
    <Link href={tool.href} className="group flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
      <IconBadge icon={Icon} tone={fun ? 'fun' : 'neutral'} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-zinc-900">{tool.name}</span>
        <span className="mt-0.5 block truncate text-[11px] text-zinc-500">{tool.desc}</span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-600" />
    </Link>
  )
}

export function HomePageClient({ zipCount, funCount }: { zipCount: number; funCount: number }) {
  const total = zipCount + funCount
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-200/70 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(79,70,229,.10),transparent_34%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-500 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Free · No signup · Instant results
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-.045em] text-zinc-950 sm:text-5xl lg:text-6xl">Fast, accurate tools for everyday lookups.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">Find ZIP details, compare distances, locate ZIP+4 information, check timezones and coordinates — then jump into a fun generator when you need a little chaos.</p>
            <div className="mx-auto mt-8 max-w-2xl">
              <GlobalSearch className="w-full" />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {QUICK_FILTERS.map(([label, href]) => (
                <Link key={label} href={href} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section id="all-tools" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-indigo-600">Featured utilities</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] text-zinc-950 sm:text-3xl">Start with the tools people use most.</h2>
          </div>
          <Link href="/zip" className="hidden items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-indigo-600 sm:inline-flex">View all ZIP tools <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <FeaturedCard tool={FEATURED_ZIP[0]} variant="large" className="lg:row-span-2" />
          <FeaturedCard tool={FEATURED_ZIP[1]} />
          <FeaturedCard tool={FEATURED_ZIP[2]} />
          <FeaturedCard tool={FEATURED_ZIP[3]} />
          <FeaturedCard tool={FEATURED_ZIP[4]} variant="large" />
          <FeaturedCard tool={FEATURED_FUN[0]} variant="fun" />
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="border-y border-zinc-200/70 bg-zinc-50/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 text-xs text-zinc-500 sm:px-6 lg:px-8">
          <span><strong className="font-semibold text-zinc-900">{zipCount}</strong> ZIP tools</span>
          <span><strong className="font-semibold text-zinc-900">{funCount}</strong> Fun tools</span>
          <span><strong className="font-semibold text-zinc-900">{total}</strong> public utilities</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Browser-friendly</span>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-400">Tool directory</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] text-zinc-950 sm:text-3xl">Everything organized by purpose.</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><IconBadge icon={LocateFixed} /><div><h3 className="text-sm font-semibold">ZIP & Postal Tools</h3><p className="text-[11px] text-zinc-500">Lookups, distance, routing and location data</p></div></div><span className="text-[11px] font-medium text-zinc-400">{zipCount} tools</span></div>
            <div className="grid gap-2">{DIRECTORY_ZIP.map(tool => <DirectoryCard key={tool.href} tool={tool} />)}</div>
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><IconBadge icon={Sparkles} tone="fun" /><div><h3 className="text-sm font-semibold">Creative & Fun Tools</h3><p className="text-[11px] text-zinc-500">Generators, games and lightweight entertainment</p></div></div><span className="text-[11px] font-medium text-zinc-400">{funCount} tools</span></div>
            <div className="grid gap-2">{DIRECTORY_FUN.map(tool => <DirectoryCard key={tool.href} tool={tool} fun />)}</div>
          </div>
        </div>
      </section>

      {/* COMMAND CTA */}
      <section className="border-y border-zinc-200/70 bg-zinc-50/50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-zinc-950 p-7 text-white shadow-xl sm:p-10">
            <div className="grid gap-7 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-indigo-300">One command bar</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-.03em] sm:text-3xl">Stop hunting through menus.</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">Search every ZIP utility, generator and guide from one place. Use <kbd className="rounded-md border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">⌘K</kbd> or <kbd className="rounded-md border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">Ctrl K</kbd>.</p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-1.5"><GlobalSearch className="w-full" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-indigo-600">Guides</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.03em]">Answers behind the tools.</h2></div>
          <Link href="/blog/category/zip-codes" className="hidden items-center gap-1 text-xs font-medium text-zinc-500 hover:text-indigo-600 sm:inline-flex">Browse guides <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="grid gap-x-10 divide-y divide-zinc-200/70 border-y border-zinc-200/70 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3">
          {GUIDES.map(([title, href, read], index) => (
            <Link key={href} href={href} className="group px-1 py-5 sm:px-5 lg:px-6 first:pt-5 sm:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n+1)]:pl-0">
              <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-zinc-400"><BookOpen className="h-3.5 w-3.5" /> ZIP Guide</span><span className="text-[10px] text-zinc-400">{read}</span></div>
              <h3 className="mt-4 text-sm font-medium leading-5 text-zinc-900 group-hover:text-indigo-600">{title}</h3>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 group-hover:text-indigo-600">Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-zinc-200/70 bg-zinc-50/50">
        <div className="mx-auto grid max-w-6xl gap-px bg-zinc-200/70 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Zap, 'Instant results', 'Built for quick lookups'],
            [ShieldCheck, 'No signup', 'No account required'],
            [Check, 'Free to use', 'No subscription gate'],
            [Navigation, 'Works everywhere', 'Desktop, tablet and mobile'],
          ].map(([Icon, title, desc]) => { const I = Icon as LucideIcon; return <div key={title as string} className="bg-zinc-50/80 px-5 py-7 text-center"><I className="mx-auto h-5 w-5 text-zinc-700" strokeWidth={1.6} /><p className="mt-3 text-sm font-medium text-zinc-900">{title as string}</p><p className="mt-1 text-[11px] text-zinc-500">{desc as string}</p></div> })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 text-center"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-400">FAQ</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] sm:text-3xl">Common questions.</h2></div>
        <div className="divide-y divide-zinc-200 border-y border-zinc-200">
          {FAQS.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-medium text-zinc-900 focus-visible:outline-none"><span>{q}</span><ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180" /></summary>
              <p className="max-w-3xl pr-10 pt-3 text-sm leading-6 text-zinc-500">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}
