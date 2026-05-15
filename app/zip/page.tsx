import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free USA ZIP Code Tools 2026 — 35+ Utilities | TOOLTRIO',
  description: 'Complete suite of free USA ZIP code tools. Lookup ZIP codes, find cities, calculate distances, check timezones, area codes and more. 35+ free ZIP code utilities.',
  keywords: ['zip code lookup','zip code tools','usa zip code','zip to city','city to zip','zip code distance','zip code map'],
}

const ZIP_TOOLS = [
  {
    category: '🔍 ZIP Lookup',
    color: 'green',
    tools: [
      { name: 'ZIP Code Lookup', desc: 'Full details for any ZIP', href: '/zip/zip-code-lookup', icon: '🔍', hot: true },
      { name: 'ZIP to City', desc: 'City from ZIP code', href: '/zip/zip-to-city', icon: '🏙️' },
      { name: 'ZIP to State', desc: 'State from ZIP code', href: '/zip/zip-to-state', icon: '🗺️' },
      { name: 'ZIP to County', desc: 'County from ZIP code', href: '/zip/zip-to-county', icon: '📍' },
      { name: 'ZIP to Timezone', desc: 'Timezone from ZIP', href: '/zip/zip-to-timezone', icon: '🕐' },
      { name: 'ZIP to Area Code', desc: 'Phone area code by ZIP', href: '/zip/zip-to-area-code', icon: '📞' },
      { name: 'ZIP to Coordinates', desc: 'Lat/lng for any ZIP', href: '/zip/zip-to-coordinates', icon: '🌐' },
      { name: 'ZIP Code Type', desc: 'Standard, PO Box or Military?', href: '/zip/zip-code-type', icon: '📬' },
    ],
  },
  {
    category: '🏙️ City & State',
    color: 'blue',
    tools: [
      { name: 'City to ZIP', desc: 'All ZIPs for a city', href: '/zip/city-to-zip', icon: '🏙️', hot: true },
      { name: 'State ZIP Codes', desc: 'All ZIPs in a state', href: '/zip/state-zip-codes', icon: '🗺️' },
      { name: 'County ZIP Codes', desc: 'ZIPs in a county', href: '/zip/county-zip-codes', icon: '📋' },
      { name: 'ZIPs by City Name', desc: 'Search ZIPs by city', href: '/zip/zips-by-city-name', icon: '🔎' },
      { name: 'Multiple Cities/ZIP', desc: 'Cities sharing a ZIP', href: '/zip/multiple-cities-in-zip', icon: '🏘️' },
      { name: 'ZIP Population', desc: 'Population for ZIP', href: '/zip/zip-code-population', icon: '👥' },
      { name: 'Largest ZIP Codes', desc: 'Most populous ZIPs', href: '/zip/largest-zip-codes', icon: '📊' },
      { name: 'ZIP Elevation', desc: 'Elevation data for ZIP', href: '/zip/zip-code-elevation', icon: '⛰️' },
    ],
  },
  {
    category: '📏 Distance & Maps',
    color: 'purple',
    tools: [
      { name: 'ZIP Distance Calculator', desc: 'Distance between 2 ZIPs', href: '/zip/zip-code-distance', icon: '📏', hot: true },
      { name: 'ZIPs Within Radius', desc: 'All ZIPs within X miles', href: '/zip/zips-within-radius', icon: '🎯', hot: true },
      { name: 'Nearest ZIP Code', desc: 'Closest ZIPs to yours', href: '/zip/nearest-zip-code', icon: '📌' },
      { name: 'ZIP Code Map', desc: 'View ZIP on Google Maps', href: '/zip/zip-code-map', icon: '🗺️' },
      { name: 'Drive Time by ZIP', desc: 'Estimate drive time', href: '/zip/drive-time-by-zip', icon: '🚗' },
      { name: 'ZIP to ZIP Route', desc: 'Route between two ZIPs', href: '/zip/zip-to-zip-route', icon: '🛣️' },
      { name: 'Multi-ZIP Distance', desc: 'Distance between many ZIPs', href: '/zip/multi-zip-distance', icon: '📐' },
      { name: 'ZIP Boundary Info', desc: 'ZIP code border details', href: '/zip/zip-boundary-info', icon: '🔲' },
    ],
  },
  {
    category: '📬 USPS & Format',
    color: 'orange',
    tools: [
      { name: 'USPS Address Format', desc: 'Format addresses correctly', href: '/zip/usps-address-format', icon: '📬', hot: true },
      { name: 'ZIP+4 Lookup', desc: '9-digit ZIP code lookup', href: '/zip/zip-plus-4-lookup', icon: '🔢' },
      { name: 'ZIP Code Validator', desc: 'Validate any ZIP code', href: '/zip/zip-code-validator', icon: '✅' },
      { name: 'Address to ZIP', desc: 'ZIP from address', href: '/zip/address-to-zip', icon: '🏠' },
      { name: 'ZIP Code Generator', desc: 'Generate valid ZIPs', href: '/zip/zip-code-generator', icon: '⚡' },
      { name: 'ZIP Format Guide', desc: 'ZIP formatting rules', href: '/zip/zip-code-format-guide', icon: '📖' },
    ],
  },
  {
    category: '⏰ Time & Phone',
    color: 'teal',
    tools: [
      { name: 'ZIP Time Converter', desc: 'Convert time between ZIPs', href: '/zip/zip-time-converter', icon: '⏱️', hot: true },
      { name: 'ZIP to Timezone Map', desc: 'Visual timezone finder', href: '/zip/zip-to-timezone-map', icon: '🗺️' },
      { name: 'Same Timezone ZIPs', desc: 'ZIPs sharing a timezone', href: '/zip/same-timezone-zips', icon: '🕐' },
      { name: 'Area Code by ZIP', desc: 'Phone area code lookup', href: '/zip/area-code-by-zip', icon: '📱' },
      { name: 'ZIPs by Area Code', desc: 'Find ZIPs for area code', href: '/zip/zip-by-area-code', icon: '☎️' },
    ],
  },
]

const colorCard: Record<string, string> = {
  green:  'border-green-100 hover:border-green-300 hover:bg-green-50/50',
  blue:   'border-blue-100 hover:border-blue-300 hover:bg-blue-50/50',
  purple: 'border-purple-100 hover:border-purple-300 hover:bg-purple-50/50',
  orange: 'border-orange-100 hover:border-orange-300 hover:bg-orange-50/50',
  teal:   'border-teal-100 hover:border-teal-300 hover:bg-teal-50/50',
}
const colorHeading: Record<string, string> = {
  green: '#15803d', blue: '#1d4ed8', purple: '#7c3aed', orange: '#c2410c', teal: '#0f766e',
}

export default function ZipHubPage() {
  const total = ZIP_TOOLS.reduce((s, c) => s + c.tools.length, 0)

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4 border"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderColor: '#d1fae5', color: '#15803d' }}>
            📮 {total} Free ZIP Code Tools · No Signup · Updated 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
            USA ZIP Code Tools
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            The most complete suite of free ZIP code utilities — lookup, distance, maps, timezones, USPS formatting and more.
          </p>

          {/* Popular quick-links */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: '/zip/zip-code-lookup', label: '🔍 ZIP Lookup' },
              { href: '/zip/zip-code-distance', label: '📏 Distance Calculator' },
              { href: '/zip/city-to-zip', label: '🏙️ City to ZIP' },
              { href: '/zip/zips-within-radius', label: '🎯 ZIPs in Radius' },
              { href: '/zip/usps-address-format', label: '📬 USPS Format' },
              { href: '/zip/zip-time-converter', label: '⏱️ Time Converter' },
            ].map(t => (
              <Link key={t.href} href={t.href}
                className="tag-pill text-sm">
                {t.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Tool categories */}
        {ZIP_TOOLS.map(cat => (
          <section key={cat.category} className="mb-10">
            <h2 className="text-xl font-black mb-4" style={{ color: colorHeading[cat.color], fontFamily: "'Playfair Display',serif" }}>
              {cat.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cat.tools.map(tool => (
                <Link key={tool.href} href={tool.href}
                  className={`group p-4 rounded-2xl border bg-white transition-all hover:-translate-y-1 hover:shadow-md relative ${colorCard[cat.color]}`}>
                  {(tool as any).hot && (
                    <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">Popular</span>
                  )}
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <div className="font-semibold text-sm text-gray-800 leading-tight mb-1">{tool.name}</div>
                  <div className="text-xs text-gray-400">{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { label: 'ZIP Codes in Database', value: '41,000+' },
            { label: 'States & Territories', value: '50 + DC' },
            { label: 'Tools Available', value: `${total}` },
            { label: 'Data Updated', value: '2026' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.6)' }}>
              <div className="text-2xl font-black text-green-600">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-10 rounded-3xl border p-6"
          style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderColor: 'rgba(226,232,240,0.6)' }}>
          <h2 className="text-xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'What is a ZIP code?', a: 'ZIP code stands for Zone Improvement Plan. It\'s a 5-digit postal code used by the United States Postal Service (USPS) since 1963 to efficiently route mail to specific geographic areas.' },
              { q: 'How many ZIP codes are there in the US?', a: 'There are approximately 42,000 active ZIP codes in the United States. This includes Standard, PO Box, Unique, and Military ZIP codes across all 50 states, DC, and US territories.' },
              { q: 'What is the difference between ZIP and ZIP+4?', a: 'A standard ZIP code is 5 digits. ZIP+4 adds a hyphen and 4 extra digits to identify a specific city block or delivery point. The format is XXXXX-XXXX (e.g., 10001-0001).' },
              { q: 'Can one city have multiple ZIP codes?', a: 'Yes. Large cities like New York, Los Angeles, and Chicago have dozens of ZIP codes, each serving a specific neighborhood or district within the city.' },
              { q: 'Are ZIP codes the same as area codes?', a: 'No. ZIP codes are postal codes used for mail delivery, while area codes are 3-digit telephone prefixes. A single ZIP code area may have one or more area codes.' },
            ].map(faq => (
              <details key={faq.q} className="group rounded-xl border border-gray-100 overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer font-semibold text-gray-800 text-sm hover:bg-gray-50">
                  {faq.q}
                </summary>
                <div className="px-4 pb-3 text-sm text-gray-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
