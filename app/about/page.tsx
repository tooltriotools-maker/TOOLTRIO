import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'About ToolTrio | US ZIP Code Tools & Location Utilities',
  description: 'Learn how ToolTrio builds focused US ZIP code tools for lookup, distance, timezone, ZIP+4, coordinates, radius searches and practical location questions.',
  keywords: ['about tooltrio', 'tooltrio mission', 'US ZIP code tools', 'ZIP code lookup', 'ZIP code distance', 'ZIP code timezone', 'ZIP+4 tools', 'Tool Trio'],
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: { title: 'About ToolTrio | US ZIP Code Tools & Location Utilities', description: 'ToolTrio builds focused US ZIP code tools for real location, mailing and geographic lookups.', url: `${siteUrl}/about`, siteName: 'ToolTrio', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'About ToolTrio | US ZIP Code Tools', description: 'Focused US ZIP code lookup, distance, timezone, ZIP+4 and location utilities.' },
  robots: { index: true, follow: true },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About ToolTrio', url: `${siteUrl}/about`,
  description: 'About ToolTrio and its US ZIP code location tools.',
  mainEntity: { '@type': 'Organization', name: 'ToolTrio', alternateName: ['Tool Trio', 'Trio Tools'], url: siteUrl, email: contactEmail, logo: `${siteUrl}/logo.png`, description: 'ToolTrio provides focused US ZIP code and fun tools for quick, practical answers.' },
}

const tools = [
  ['ZIP Code Lookup', '/zip/zip-code-lookup', 'Find city, state, county and related ZIP information.'],
  ['ZIP Code Distance', '/zip/zip-code-distance', 'Compare the distance between two US ZIP codes.'],
  ['ZIP to Timezone', '/zip/zip-to-timezone', 'Identify the timezone associated with a US ZIP code.'],
  ['ZIP+4 Lookup', '/zip/zip-plus-4-lookup', 'Understand and look up the four-digit ZIP extension.'],
  ['ZIP to Coordinates', '/zip/zip-to-coordinates', 'Find latitude and longitude for a ZIP code.'],
  ['ZIPs Within Radius', '/zip/zips-within-radius', 'Explore ZIP codes around a selected ZIP and radius.'],
]

export default function AboutPage() {
  return <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="max-w-5xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb"><Link href="/" className="text-gray-500 hover:text-green-600">Home</Link><span className="text-gray-300">/</span><span className="font-semibold text-gray-900">About</span></nav>
      <header className="text-center mb-12">
        <p className="text-green-700 font-bold text-sm uppercase tracking-wider mb-3">📮 Built around US ZIP data</p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">About <span className="text-green-600">ToolTrio</span></h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">ToolTrio is a focused online toolkit for people who need a quick answer about a US ZIP code, its location, distance, timezone, coordinates, ZIP+4 structure or nearby ZIPs.</p>
      </header>

      <section className="grid md:grid-cols-3 gap-5 mb-10">
        {[['35+', 'US ZIP tools'], ['21', 'ZIP Code guides'], ['0', 'required signups']].map(([value,label]) => <div key={label} className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm"><div className="text-3xl font-black text-gray-900">{value}</div><div className="text-sm font-semibold text-gray-500 mt-1">{label}</div></div>)}
      </section>

      <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 mb-8">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Why ToolTrio focuses on ZIP codes</h2>
        <p className="text-gray-600 leading-relaxed mb-4">A ZIP code is more than five digits. It can connect a place to a city, county, state, timezone, coordinates, delivery region and nearby ZIP codes. ToolTrio organizes those relationships into small tools instead of forcing users through a large, generic calculator site.</p>
        <p className="text-gray-600 leading-relaxed">The goal is simple: choose the question you actually have, enter the ZIP code or location you know, and get a useful result without an account or unnecessary steps.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-6">What ToolTrio builds</h2>
        <div className="grid md:grid-cols-2 gap-4">{tools.map(([name,href,desc]) => <Link key={href} href={href} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-green-400 hover:shadow-md transition"><h3 className="font-black text-gray-900 mb-1">{name}</h3><p className="text-sm text-gray-600">{desc}</p></Link>)}</div>
      </section>

      <section className="bg-green-700 rounded-3xl p-8 md:p-10 text-white">
        <h2 className="text-2xl font-black mb-3">Practical, focused, and easy to verify</h2>
        <p className="text-green-50 leading-relaxed mb-5">ToolTrio keeps each ZIP utility narrow enough that its purpose is clear. Our guides explain ZIP concepts such as ZIP+4, distance, timezone, coordinates, boundaries and lookup methods so the result is easier to understand.</p>
        <div className="flex flex-wrap gap-3"><Link href="/zip" className="px-5 py-2.5 rounded-xl bg-white text-green-700 font-bold">Explore ZIP tools</Link><Link href="/blog/category/zip-codes" className="px-5 py-2.5 rounded-xl bg-green-800 text-white font-bold border border-green-500">Read ZIP guides</Link><Link href="/contact" className="px-5 py-2.5 rounded-xl bg-green-800 text-white font-bold border border-green-500">Contact ToolTrio</Link></div>
      </section>
    </div>
  </main>
}
