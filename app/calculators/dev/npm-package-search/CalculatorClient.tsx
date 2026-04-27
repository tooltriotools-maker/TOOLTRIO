'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, Search, Package, ExternalLink } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

// Static popular packages database (browser-based, no API calls needed)
const POPULAR_PACKAGES = [
  { name:'react', desc:'A JavaScript library for building user interfaces', weekly:25000000, version:'18.3.1', license:'MIT', tags:['ui','frontend','view'] },
  { name:'lodash', desc:'A modern JavaScript utility library delivering modularity, performance & extras', weekly:50000000, version:'4.17.21', license:'MIT', tags:['utils','array','object'] },
  { name:'axios', desc:'Promise based HTTP client for the browser and node.js', weekly:35000000, version:'1.7.7', license:'MIT', tags:['http','ajax','promise'] },
  { name:'express', desc:'Fast, unopinionated, minimalist web framework for node.', weekly:30000000, version:'4.21.0', license:'MIT', tags:['web','server','http'] },
  { name:'typescript', desc:'TypeScript is a language for application-scale JavaScript', weekly:40000000, version:'5.6.3', license:'Apache-2.0', tags:['types','compiler','javascript'] },
  { name:'next', desc:'The React Framework for the Web', weekly:7000000, version:'14.2.0', license:'MIT', tags:['react','framework','ssr'] },
  { name:'tailwindcss', desc:'A utility-first CSS framework for rapid UI development', weekly:8000000, version:'3.4.14', license:'MIT', tags:['css','utility','styling'] },
  { name:'jest', desc:'Delightful JavaScript Testing', weekly:22000000, version:'29.7.0', license:'MIT', tags:['testing','unit','mock'] },
  { name:'eslint', desc:'An AST-based pattern checker for JavaScript', weekly:30000000, version:'9.12.0', license:'MIT', tags:['linting','code-quality'] },
  { name:'prettier', desc:'Opinionated code formatter', weekly:25000000, version:'3.3.3', license:'MIT', tags:['formatting','code-style'] },
  { name:'zod', desc:'TypeScript-first schema validation with static type inference', weekly:12000000, version:'3.23.8', license:'MIT', tags:['validation','schema','types'] },
  { name:'prisma', desc:'Next-generation Node.js and TypeScript ORM', weekly:3000000, version:'5.20.0', license:'Apache-2.0', tags:['database','orm','sql'] },
  { name:'vite', desc:'Next generation frontend tooling', weekly:8000000, version:'5.4.8', license:'MIT', tags:['bundler','build','dev-server'] },
  { name:'vitest', desc:'Next generation testing framework', weekly:4000000, version:'2.1.2', license:'MIT', tags:['testing','vite','unit'] },
  { name:'react-query', desc:'Powerful asynchronous state management for TS/JS', weekly:5000000, version:'5.59.13', license:'MIT', tags:['data-fetching','state','hooks'] },
  { name:'zustand', desc:'Bear necessities for state management in React', weekly:4000000, version:'5.0.0', license:'MIT', tags:['state','react','store'] },
  { name:'framer-motion', desc:'A production-ready motion library for React', weekly:3000000, version:'11.11.1', license:'MIT', tags:['animation','react','motion'] },
  { name:'date-fns', desc:'Modern JavaScript date utility library', weekly:15000000, version:'4.1.0', license:'MIT', tags:['date','time','utilities'] },
  { name:'lucide-react', desc:'Beautiful & consistent icons', weekly:2000000, version:'0.447.0', license:'ISC', tags:['icons','react','svg'] },
  { name:'recharts', desc:'Redefined chart library built with React', weekly:2000000, version:'2.12.7', license:'MIT', tags:['charts','visualization','react'] },
  { name:'drizzle-orm', desc:'TypeScript ORM that is production ready', weekly:1000000, version:'0.36.0', license:'Apache-2.0', tags:['orm','typescript','database'] },
  { name:'clsx', desc:'A tiny utility for constructing className strings', weekly:18000000, version:'2.1.1', license:'MIT', tags:['classnames','utility','css'] },
  { name:'@tanstack/router', desc:'Fully typesafe router for React', weekly:500000, version:'1.68.0', license:'MIT', tags:['router','typescript','react'] },
  { name:'sharp', desc:'High performance Node.js image processing', weekly:6000000, version:'0.33.5', license:'Apache-2.0', tags:['image','processing','node'] },
  { name:'dotenv', desc:'Loads environment variables from .env file', weekly:30000000, version:'16.4.5', license:'BSD-2-Clause', tags:['env','configuration','node'] },
]

function fmtWeekly(n: number) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n/1000).toFixed(0)}k`
  return String(n)
}

export default function CalculatorClient({ faqs }: Props) {
  const [q, setQ] = useState('')
  const [copied, setCopied] = useState('')
  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  const filtered = q.trim()
    ? POPULAR_PACKAGES.filter(p => p.name.includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase()) || p.tags.some(t => t.includes(q.toLowerCase())))
    : POPULAR_PACKAGES

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">npm Package Search</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📦 npm Package Search & Reference</h1>
      <p className="text-gray-500 mb-6">Search popular npm packages, view versions, licenses, and weekly downloads. Copy install commands instantly.</p>

      <div className="bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3 mb-5 focus-within:border-blue-400 shadow-sm">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 text-sm outline-none bg-transparent" placeholder="Search packages - react, axios, zod, tailwind..." />
      </div>

      <div className="space-y-3">
        {filtered.map(pkg => (
          <div key={pkg.name} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Package className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-gray-900">{pkg.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">{pkg.version}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${pkg.license==='MIT'?'bg-green-100 text-green-700':pkg.license.startsWith('Apache')?'bg-blue-100 text-blue-700':'bg-gray-100 text-gray-600'}`}>{pkg.license}</span>
                    <span className="text-xs text-gray-400">v {fmtWeekly(pkg.weekly)}/wk</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{pkg.desc}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {pkg.tags.map(t => <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">{t}</span>)}
                  </div>
                </div>
              </div>
              <a href={`https://www.npmjs.com/package/${pkg.name}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 flex-shrink-0 mt-1">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {[
                { label: 'npm', cmd: `npm install ${pkg.name}` },
                { label: 'yarn', cmd: `yarn add ${pkg.name}` },
                { label: 'pnpm', cmd: `pnpm add ${pkg.name}` },
                { label: 'bun', cmd: `bun add ${pkg.name}` },
              ].map(({ label, cmd }) => (
                <button key={label} onClick={() => copy(cmd, `${pkg.name}-${label}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-950 text-green-400 text-xs font-mono rounded-xl hover:bg-gray-800 transition-colors">
                  {copied===`${pkg.name}-${label}` ? <><Check className="w-3 h-3"/>Copied</> : <><Copy className="w-3 h-3"/>{cmd}</>}
                </button>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No packages found for "{q}"</p>
            <p className="text-sm mt-1">Try a different search term</p>
            <a href={`https://www.npmjs.com/search?q=${q}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-bold mt-3 inline-flex items-center gap-1 hover:underline">
              Search on npmjs.com <ExternalLink className="w-3.5 h-3.5"/>
            </a>
          </div>
        )}
      </div>

      <SEOContent title="npm Package Search" category="dev"
        intro="The npm Package Search provides a fast, browser-based reference for the most popular JavaScript and Node.js packages - with versions, licenses, weekly download stats, and one-click install commands for npm, yarn, pnpm, and bun. No API calls, no rate limits, instant results for 25+ essential packages used in almost every modern JavaScript project.\n\nWith over 2.5 million packages on the npm registry, knowing which packages are battle-tested, well-maintained, and widely trusted is valuable. This tool focuses on the packages you'll encounter most frequently - from React and Next.js to utilities like lodash, zod, date-fns, and development tools like ESLint and Prettier.

**Long-tail searches answered here:** npm package search free online usa, find npm library by functionality free tool, npm package lookup free no signup, search npm registry free no download, discover javascript packages free online, npm module finder free tool usa, find npm equivalent to python package free usa, npm package weekly downloads trend checker free, npm package size bundle impact checker free online, find actively maintained npm packages free tool usa, npm package vulnerabilities security check free, alternative npm packages comparison tool free usa, npm package license compatibility checker free, find typescript types for npm package free usa, npm package quality score checker free online"
        howItWorks="This tool maintains a curated static database of popular npm packages with current version numbers, licenses, approximate weekly download counts, and descriptive tags. Search filters across package names, descriptions, and tags in real time. All four major package manager install commands (npm, yarn, pnpm, bun) are generated from the package name and copied with one click.\n\nFor packages not in the built-in database, the tool links directly to npmjs.com for the complete registry search."
        benefits={[
          { title: 'Four Package Manager Commands', text: 'Copy npm, yarn, pnpm, or bun install commands with one click - no typing, no remembering different command syntax for each manager.' },
          { title: 'Version & License Info', text: 'See current stable version and license type at a glance - quickly verify MIT vs. Apache-2.0 vs. GPL compliance requirements for your project.' },
          { title: 'Weekly Download Stats', text: 'Weekly download numbers indicate community adoption and maintenance activity - packages with millions of weekly downloads have proven long-term support.' },
          { title: 'Tag-Based Search', text: 'Search by technology category (react, database, testing, utils) in addition to package names - discover related packages you might not know by name.' },
          { title: 'Zero Rate Limits', text: 'Static local database means no API rate limiting, no authentication required, and instant search results regardless of network speed.' },
          { title: 'Direct npmjs.com Links', text: 'Each package links to its full npmjs.com page with complete documentation, changelog, dependencies, and contributor information.' },
        ]}
        useCases={[
          { title: 'New Project Setup', text: 'Quickly gather install commands for your project\'s initial dependencies - copy all the commands you need in one session.' },
          { title: 'License Compliance Checking', text: 'Verify package licenses before adding dependencies to commercial projects where GPL or other copyleft licenses may have implications.' },
          { title: 'Package Manager Migration', text: 'Switching from npm to pnpm or yarn? Copy the correct install command syntax for all your dependencies in the new format.' },
          { title: 'Code Reviews', text: 'Reference package versions and weekly downloads when reviewing PRs that add new dependencies - validate that proposed packages are well-maintained.' },
          { title: 'Teaching & Workshops', text: 'Demo package installation with clean, copyable commands for different package managers during workshops and code-along tutorials.' },
          { title: 'README & Documentation', text: 'Copy properly formatted install commands for inclusion in README installation instructions and documentation.' },
        ]}
        tipsSection={`Check weekly download counts before adding a new package. Under 100k weekly downloads often indicates limited community support and maintenance risk. Packages with millions of weekly downloads have battle-tested APIs and active maintenance.\n\nAlways check the license compatibility for your project type. MIT and Apache-2.0 are permissive and safe for commercial use. GPL packages require your project to also be open-source if distributed. ISC is equivalent to MIT. BSD variants are generally permissive.\n\nFor production dependencies, pin exact versions (--save-exact) or use lockfiles religiously. For dev dependencies, minor version ranges (~) are typically safe.

For project dependency management, use pnpm workspaces or Yarn Workspaces (monorepos) when managing multiple related packages. The workspace protocol (workspace:*) pins internal dependencies to workspace versions, enabling atomic versioning across packages. This architecture is used by large codebases like Next.js, Prisma, and most major open-source TypeScript projects.

package.json "exports" field (Node.js 12+ and all modern bundlers) enables subpath exports, conditional exports, and package self-referencing. Modern packages specify exports: { './utils': './dist/utils.js' } instead of exposing internal file paths. When a package doesn't work with your bundler, checking if exports is misconfigured is often the solution.

For version management in lockfiles, understand the difference: package-lock.json uses exact versions for security (repeatable installs), yarn.lock uses a different format but same principle, pnpm-lock.yaml includes content hashes for integrity verification. Never edit lockfiles manually - they're generated artifacts. When lockfile conflicts arise in git merges, delete the conflicted lockfile and run the package manager install command fresh.`}
        scienceSection={`npm (Node Package Manager) was created by Isaac Z. Schlueter in 2009 as a companion to Node.js and has grown into the largest software registry in the world. As of 2024, npmjs.com hosts over 2.5 million packages, receives approximately 100 billion monthly downloads, and is a critical piece of infrastructure for virtually every JavaScript project.

The JavaScript package management ecosystem has diversified significantly: Yarn (Facebook, 2016) introduced lockfiles and parallel installs; pnpm (2017) pioneered content-addressable storage for massive disk space savings; Bun (2022) integrated a package manager with a JavaScript runtime for maximum performance. Each manager uses the same package.json format and npmjs.com registry but with different performance and disk usage characteristics.

The concept of "dependency hell" - where conflicting transitive dependencies prevent package installation - drove development of lockfile-based reproducible installs (npm's package-lock.json, Yarn's yarn.lock, pnpm's pnpm-lock.yaml). The log4shell vulnerability (2021), which affected millions of systems through a transitive dependency in Apache Log4j, highlighted the critical importance of supply chain security in package ecosystems.`}
        conclusion="The npm Package Search makes it faster to find and install common JavaScript packages across all major package managers. Keep it open alongside your terminal for instant install commands during project setup."
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
          <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
        </details>)}
      </div>
    </div>
  )
}
