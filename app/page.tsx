import Link from 'next/link'
import { GlobalSearch } from '@/components/ui/GlobalSearch'
import type { Metadata } from 'next'
import { publicBlogPosts } from '@/lib/blog/posts'


export const metadata: Metadata = {
  title: {
    absolute: 'ToolTrio — US ZIP Code Cluster, Lookup, Distance & Timezone Tools',
  },
    description:
    'ToolTrio is a US ZIP Code Cluster toolkit with ZIP Code Lookup, ZIP Code Distance, ZIP Code Timezone, ZIP+4, coordinates, radius and mailing utilities. Free, focused and available without signup.',

  keywords: [
    'zip code lookup',
    'zip code finder',
    'zip code distance',
    'zip code timezone',
    'zip code coordinates',
    'zip+4 lookup',
    'zip plus 4 lookup',
    'zip code distance calculator',
    'zip to timezone',
    'zip code to city',
    'zip code to coordinates',
    'city to zip code',
    'us zip code database',
    'free zip code tool',
    'zip code validator',
    'us zip code tools',
    'free zip code tools',
    'tooltrio',
    'tool trio',
    'trio tools',
    'tools trio',
    'toolstrio',
    'tool trio online tools',
  ],
  alternates: { canonical: 'https://tooltrio.com' },
  openGraph: {
    title: 'ToolTrio — US ZIP Code Cluster, Lookup, Distance & Timezone Tools',
    description:
      'ZIP Code Lookup, ZIP Code Distance, ZIP to Timezone, ZIP to Coordinates and ZIP+4 tools for US ZIP codes. Free, fast and easy to use with no signup.',
    url: 'https://tooltrio.com',
    siteName: 'ToolTrio',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio — Free ZIP Code Lookup, ZIP+4 & ZIP Distance Tools' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
     title: 'ToolTrio — US ZIP Code Cluster, Lookup, Distance & Timezone Tools',
    description: 'US ZIP Code Cluster tools for lookup, distance, timezone, ZIP+4, coordinates and nearby ZIP searches, plus selected fun tools. No signup required.',
     images: ['/og-image.png'],
  },
}


// Homepage FAQ schema — site-level FAQ only on homepage (not on calculator pages)
const homepageFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ToolTrio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ToolTrio is a free US ZIP code tools website with fun tools. No signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I look up a ZIP code on ToolTrio?',
      acceptedAnswer: {
        '@type': 'Answer',
               text: 'Enter any 5-digit US ZIP code into the ZIP Code Lookup tool to instantly see the city, state, county, timezone and area code. ToolTrio covers every ZIP code cluster across all 50 states plus DC.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a ZIP+4 code and how do I find mine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A ZIP+4 code adds four digits to your 5-digit ZIP to identify a specific USPS delivery segment. Use the ZIP+4 Lookup tool to check your base ZIP first, then get the exact +4 suffix for your street address via the official USPS lookup.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the ZIP code distance calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter any two US ZIP codes into the ZIP Code Distance calculator to get the straight-line distance in miles and kilometers between them, calculated from each ZIP\'s coordinates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I find coordinates for a ZIP code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use ToolTrio ZIP to Coordinates to find the latitude and longitude centroid associated with a US ZIP Code Tabulation Area. For an exact street address, use a full address geocoding service.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are ToolTrio tools and calculators free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ToolTrio\'s public tools are completely free to use with no registration, no subscription and no hidden fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ToolTrio have ZIP code tools and fun tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ToolTrio includes 35+ US ZIP code tools and a Fun category with 30+ tools.',
      },
    },
  ],
}

const zipTools = [
  { name: 'ZIP Code Lookup', desc: 'Find city, state & county', href: '/zip/zip-code-lookup', icon: '📮', badge: 'Popular' },
  { name: 'ZIP Code Distance', desc: 'Distance between ZIPs', href: '/zip/zip-code-distance', icon: '📏', badge: 'Popular' },
  { name: 'ZIP+4 Lookup', desc: 'Find ZIP+4 extension', href: '/zip/zip-plus-4-lookup', icon: '➕', badge: 'Popular' },
  { name: 'ZIP Code Timezone', desc: 'Find timezone by ZIP', href: '/zip/zip-to-timezone', icon: '🕐', badge: 'Popular' },
  { name: 'ZIP to Coordinates', desc: 'Find latitude & longitude by ZIP', href: '/zip/zip-to-coordinates', icon: '🌐', badge: 'Popular' },
  { name: 'ZIP to City', desc: 'Reverse ZIP lookup', href: '/zip/zip-to-city', icon: '🏙️', badge: null },
  { name: 'City to ZIP', desc: 'Find ZIP codes by city', href: '/zip/city-to-zip', icon: '🗺️', badge: null },
  { name: 'ZIPs in Radius', desc: 'All ZIPs within miles', href: '/zip/zips-within-radius', icon: '🎯', badge: 'NEW' },
  { name: 'ZIP Code Map', desc: 'Visualize ZIP boundaries', href: '/zip/zip-code-map', icon: '🗾', badge: null },
  { name: 'ZIP Code Validator', desc: 'Check valid US ZIP', href: '/zip/zip-code-validator', icon: '✅', badge: null },
  { name: 'USPS Address Format', desc: 'Format addresses correctly', href: '/zip/usps-address-format', icon: '✉️', badge: null },
]

// The 5 hero ZIP tools — proven search-demand products, featured prominently on homepage
const heroZipTools = [
  { name: 'ZIP Code Lookup', desc: 'City, state, county & timezone for any US ZIP', href: '/zip/zip-code-lookup', icon: '📮' },
  { name: 'ZIP Code Distance', desc: 'Miles & km between any two ZIP codes', href: '/zip/zip-code-distance', icon: '📏' },
  { name: 'ZIP+4 Lookup', desc: 'Find your ZIP+4 delivery extension', href: '/zip/zip-plus-4-lookup', icon: '➕' },
  { name: 'ZIP Code Timezone', desc: 'Instant timezone lookup by ZIP code', href: '/zip/zip-to-timezone', icon: '🕐' },
  { name: 'ZIP to Coordinates', desc: 'Find latitude & longitude by ZIP', href: '/zip/zip-to-coordinates', icon: '🌐' },
]


const funTools = [
  { name: 'Pizza Calculator', desc: 'How many pizzas to order', href: '/calculators/fun/pizza-calculator', icon: '🍕', badge: 'Popular' },
  { name: 'Trivia Quiz', desc: 'Random trivia questions', href: '/calculators/fun/trivia-quiz', icon: '🧠', badge: 'Popular' },
  { name: 'Love Compatibility', desc: 'Fun name-based score', href: '/calculators/fun/love-compatibility', icon: '💘', badge: null },
  { name: 'Zodiac Calculator', desc: 'Find your star sign', href: '/calculators/fun/zodiac-calculator', icon: '♈', badge: null },
  { name: 'Birthday Countdown', desc: 'Days until your birthday', href: '/calculators/fun/birthday-countdown', icon: '🎂', badge: null },
  { name: 'Fortune Cookie', desc: 'Random fortune generator', href: '/calculators/fun/fortune-cookie', icon: '🥠', badge: null },
  { name: 'Shakespeare Insult Generator', desc: 'Funny Shakespearean roasts', href: '/calculators/fun/shakespeare-insult-generator', icon: '🎭', badge: 'Popular' },
  { name: 'Personality Quiz', desc: 'Quick personality test', href: '/calculators/fun/personality-quiz', icon: '🧬', badge: 'Popular' },
  { name: 'Coffee Calculator', desc: 'Perfect coffee ratio', href: '/calculators/fun/coffee-calculator', icon: '☕', badge: null },
  { name: 'How Rich Am I', desc: 'Global wealth percentile', href: '/calculators/fun/how-rich-am-i', icon: '💸', badge: null },
  { name: 'Would You Rather', desc: 'Random would-you-rather', href: '/calculators/fun/would-you-rather', icon: '🤔', badge: null },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFAQSchema) }}
      />
      <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="hero-glow" style={{ top: '-80px', left: '-60px' }} />
        <div className="hero-glow" style={{ bottom: '-80px', right: '-60px', background: 'rgba(16,185,129,0.1)' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }} />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', borderColor: '#d1fae5', color: '#15803d', boxShadow: '0 4px 16px rgba(22,163,74,0.1)' }}>
            <span>📮 ZIP Code Tools</span>

            <span className="w-px h-3" style={{ background: '#bbf7d0' }} />
            <span className="w-px h-3" style={{ background: '#bbf7d0' }} />
            <span>🔒 Free · No Signup</span>
          </div>

          <h1 className="font-black mb-4 leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', color: '#0f172a', fontFamily: "'Inter', system-ui, sans-serif" }}>
            US ZIP Code Cluster — Lookup, Distance, Timezone & ZIP+4{' '}
          </h1>

          <p className="text-lg md:text-xl mb-3 max-w-2xl mx-auto" style={{ color: '#475569' }}>
            Find a US ZIP code, measure distance between ZIP codes, identify a ZIP code's timezone, get ZIP coordinates, or look up ZIP+4 information. These five ZIP tools are the core of ToolTrio's location toolkit — free, fast and available without signup.
          </p>

          <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Look up city, state, county and timezone; calculate ZIP-to-ZIP distance; find ZIP+4 information; get latitude and longitude coordinates; or identify the timezone for a ZIP code. All five tools are free to use.
            <br />
            <span>Also searched as Tool Trio, Trio Tools, Tools Trio and Toolstrio.</span>
          </p>

          <div className="max-w-2xl mx-auto">
            <GlobalSearch />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { label: 'ZIP Code Lookup', href: '/zip/zip-code-lookup' },
              { label: 'ZIP Code Distance', href: '/zip/zip-code-distance' },
              { label: 'ZIP+4 Lookup', href: '/zip/zip-plus-4-lookup' },
              { label: 'ZIP Code Timezone', href: '/zip/zip-to-timezone' },
              { label: 'ZIP to Coordinates', href: '/zip/zip-to-coordinates' },
            ].map(t => (
              <Link key={t.label} href={t.href} className="tag-pill text-xs" style={{ padding: '8px 16px' }}>
                {t.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { val: '35+', label: 'ZIP Code Tools' },
              { val: '30+', label: 'Fun Tools' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ color: '#16a34a' }}>{s.val}</div>
                <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular strip */}
      <section className="border-b py-4 px-4" style={{ background: '#F0F7F0', borderColor: '#d1fae5' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-gray-500 text-center mb-3 font-semibold uppercase tracking-wider">
            Most Popular Tools & Calculators
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: 'ZIP Code Lookup', href: '/zip/zip-code-lookup' },
              { name: 'ZIP Code Distance', href: '/zip/zip-code-distance' },
              { name: 'ZIP+4 Lookup', href: '/zip/zip-plus-4-lookup' },
              { name: 'ZIP Code Timezone', href: '/zip/zip-to-timezone' },
              { name: 'ZIP to Coordinates', href: '/zip/zip-to-coordinates' },
              { name: 'Shakespeare Insult Generator', href: '/calculators/fun/shakespeare-insult-generator' },
              { name: 'Personality Quiz', href: '/calculators/fun/personality-quiz' },
            ].map(c => (
              <Link key={c.href} href={c.href} className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-green-700 hover:bg-green-50 hover:border-green-300 font-medium transition-all">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Hero ZIP Tools — highest-impression products, featured first */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <span>📮</span> Free ZIP Code Tools
            </h2>
            <Link href="/zip" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all 35+ ZIP code tools →
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-5 max-w-2xl">
                   Look up any US ZIP code, find your ZIP+4 extension, calculate the distance between ZIP codes, or convert a ZIP to its timezone — instant results for every ZIP code cluster in the US.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {heroZipTools.map(c => (
              <Link key={c.href} href={c.href} className="group p-5 border-2 rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all" style={{ background: 'rgba(255,255,255,0.9)', borderColor: 'rgba(124,58,237,0.15)', boxShadow: '0 4px 20px rgba(124,58,237,0.08)' }}>
                <span className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{c.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                    Popular
                  </span>
                </span>
                <span className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-all leading-tight mb-1">
                  {c.name}
                </span>
                <span className="text-xs text-gray-500 leading-snug">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Category overview grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-5" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Browse All Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'ZIP Tools', count: '35+ tools', href: '/zip', icon: '📮', color: '#7c3aed' },
              { name: 'Fun', count: '30+ tools', href: '/calculators/fun', icon: '😄', color: '#db2777' },
            ].map(c => (
              <Link key={c.href} href={c.href} className="group p-4 border rounded-2xl text-center hover:-translate-y-1 hover:shadow-lg transition-all" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)' }}>
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="text-sm font-bold text-gray-900">{c.name}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{c.count}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ZIP Tools Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <span>📮</span> All ZIP Code Tools
            </h2>
            <Link href="/zip" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all ZIP code tools →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {zipTools.map(c => (
              <Link key={c.href} href={c.href} className="group p-3 border rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-purple-200/50" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      {c.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-purple-700 transition-all leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ZIP Code Guides — public blog discovery */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                <span>📚</span> ZIP Code Guides
              </h2>
              <p className="text-sm text-gray-500 mt-1">Practical guides for ZIP lookup, ZIP+4, distance, timezones, coordinates and more.</p>
            </div>
            <Link href="/blog/category/zip-codes" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all ZIP guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicBlogPosts.filter(post => post.categorySlug === 'zip-codes').slice(0, 6).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group p-5 rounded-2xl border bg-white hover:border-green-300 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700">📮 ZIP Guide</span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-snug mb-2">{post.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Fun Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <span>😄</span> Fun Tools
            </h2>
            <Link href="/calculators/fun" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all fun tools →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {funTools.map(c => (
              <Link key={c.href} href={c.href} className="group p-3 border rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-pink-200/50" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                      {c.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-pink-600 transition-all leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content Block */}
        <section className="mt-8 rounded-3xl p-8 border" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.5)', boxShadow: '0 8px 30px rgba(15,23,42,0.05)' }}>
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Free ZIP Code Tools & Calculators — Built for Real Lookups
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed mb-10">
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                       <span>📮</span> ZIP Code Lookup — Every US ZIP Cluster
                </h3>
                <p>
                  Our free{' '}
                  <Link href="/zip/zip-code-lookup" className="text-green-600 hover:underline font-medium">
                    ZIP code lookup
                  </Link>{' '}
                     tool covers every ZIP code cluster across all 50 states plus DC. Enter any 5-digit ZIP to instantly see the city, state, county, population, timezone and area code.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>➕</span> ZIP+4 Lookup
                </h3>
                <p>
                  Need the exact 4-digit extension for mail delivery? Our{' '}
                  <Link href="/zip/zip-plus-4-lookup" className="text-green-600 hover:underline font-medium">
                    ZIP+4 lookup
                  </Link>{' '}
                  tool resolves your base ZIP instantly, then routes you to the official USPS lookup to confirm the exact +4 suffix for your street address.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>📏</span> ZIP Code Distance Calculator
                </h3>
                <p>
                  Compare any two US ZIP codes with our{' '}
                  <Link href="/zip/zip-code-distance" className="text-green-600 hover:underline font-medium">
                    ZIP code distance calculator
                  </Link>
                  , which returns the straight-line distance in miles and kilometers — useful for shipping, delivery radius and travel planning.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🕐</span> ZIP Code Timezone Finder
                </h3>
                <p>
                  Scheduling a call or delivery across states? Our{' '}
                  <Link href="/zip/zip-to-timezone" className="text-green-600 hover:underline font-medium">
                    ZIP to timezone
                  </Link>{' '}
                  tool instantly returns the correct US timezone for any ZIP code, including Eastern, Central, Mountain, Pacific, Alaska and Hawaii.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🆓', title: '100% Free Forever', desc: 'No signup, no credit card' },
            { icon: '🔒', title: 'Privacy-Friendly', desc: 'Calculations stay in your browser' },
            { icon: '⚡', title: 'Instant Results', desc: 'Real-time as you type' },
            { icon: '📱', title: 'Works Everywhere', desc: 'Mobile, tablet & desktop' },
          ].map(f => (
            <div key={f.title} className="text-center p-4 rounded-2xl border" style={{ background: 'rgba(240,253,244,0.8)', borderColor: 'rgba(187,247,208,0.6)', backdropFilter: 'blur(6px)' }}>
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-bold text-gray-900 text-sm">{f.title}</p>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: 'What is ToolTrio?',
                a: 'ToolTrio is a free online tools website with 35+ US ZIP code tools and fun tools. No signup required.',
              },
              {
                q: 'How do I find the city and state for a ZIP code?',
                                a: 'Enter any 5-digit US ZIP code into the ZIP Code Lookup tool to instantly see its city, state, county, population, timezone and area code — covering every ZIP code cluster in all 50 states plus DC.',
              },
              {
                q: 'What is a ZIP+4 code?',
                a: 'A ZIP+4 code adds four digits after your standard 5-digit ZIP to identify a specific USPS delivery segment such as a city block or building. Use the ZIP+4 Lookup tool to check your base ZIP, then confirm the exact +4 suffix via the official USPS address lookup.',
              },
              {
                q: 'How do I calculate the distance between two ZIP codes?',
                a: 'Enter two ZIP codes into the ZIP Code Distance calculator to get the straight-line distance in miles and kilometers, calculated from each ZIP code\'s coordinates.',
              },
              {
                q: 'How do I find the timezone for a ZIP code?',
                                a: 'Enter a ZIP code into the ZIP to Timezone tool to instantly see its US timezone — Eastern, Central, Mountain, Pacific, Alaska or Hawaii — useful for scheduling calls and deliveries across states.',
              },
              {
                q: 'What public tool categories does ToolTrio offer?',
                a: 'Yes. ToolTrio includes 35+ US ZIP code tools and a Fun category with 30+ tools.',
              },
              {
                q: 'Is ToolTrio also called Tool Trio or Trio Tools?',
                a: 'Yes. ToolTrio is also searched as Tool Trio, Trio Tools, Tools Trio, Trio Tool and Toolstrio. All of these refer to ToolTrio.com.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border p-5" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)' }}>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    </>
  )
}