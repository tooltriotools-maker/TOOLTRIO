import type { Metadata } from 'next'
import Link from 'next/link'
import { allBlogPosts as blogPosts, blogCategories } from '@/lib/blog/posts'
import { Clock, BookOpen, ArrowRight, ChevronRight, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: '157 Expert Finance & Health Guides 2026 - SIP, 401k, UK Tax, ISA, Retirement & More',
  description: '157 in-depth guides on SIP investing, 401k vs Roth IRA, UK income tax, ISA, compound interest, FIRE, retirement planning, BMI, TDEE and more. USA, UK, India & Europe. Free, no signup.',
  keywords: [
    'finance guides 2026', 'investment guides india usa uk', 'SIP investing guide', '401k vs Roth IRA guide',
    'UK income tax guide 2026', 'compound interest guide', 'retirement planning guide',
    'FIRE financial independence guide', 'ISA guide UK 2026', 'BMI calculator guide',
    'personal finance articles', 'free financial guides', 'financial education blog',
  ],
  alternates: { canonical: 'https://tooltrio.com/blog' },
  openGraph: {
    title: '157 Expert Finance & Health Guides 2026',
    description: '157 expert guides on SIP, 401k, UK tax, ISA, retirement, FIRE, BMI and more. USA, UK, India & Europe.',
    url: 'https://tooltrio.com/blog',
    siteName: 'tooltrio.com',
    type: 'website',
  },
}

const CAT_CONFIG: Record<string, { label: string; icon: string; color: string; border: string; bg: string; desc: string }> = {
  investment:        { label: 'Investment',       icon: '📈', color: 'text-green-700',  border: 'border-green-200',  bg: 'bg-green-50',   desc: 'SIP, mutual funds, stocks, gold, crypto - grow your wealth' },
  retirement:        { label: 'Retirement',       icon: '🌅', color: 'text-purple-700', border: 'border-purple-200', bg: 'bg-purple-50',  desc: '401k, NPS, PPF, SIPP, FIRE - plan your retirement' },
  loans:             { label: 'Loans',            icon: '🏦', color: 'text-blue-700',   border: 'border-blue-200',   bg: 'bg-blue-50',    desc: 'Mortgage, EMI, student loans, debt payoff strategies' },
  'personal-finance':{ label: 'Personal Finance', icon: '💰', color: 'text-orange-700', border: 'border-orange-200', bg: 'bg-orange-50',  desc: 'Budgeting, savings, net worth, emergency fund' },
  health:            { label: 'Health',           icon: '❤️', color: 'text-red-700',    border: 'border-red-200',    bg: 'bg-red-50',     desc: 'BMI, calories, macros, heart rate, fitness guides' },
  property:          { label: 'Property',         icon: '🏠', color: 'text-yellow-700', border: 'border-yellow-200', bg: 'bg-yellow-50',  desc: 'Buy-to-let, mortgage, rent vs buy, real estate' },
  tax:               { label: 'Tax',              icon: '📋', color: 'text-gray-700',   border: 'border-gray-200',   bg: 'bg-gray-50',    desc: 'Income tax, GST, UK PAYE, capital gains, tax planning' },
}

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'tooltrio.com Blog',
  url: 'https://tooltrio.com/blog',
  description: '157 expert finance and health guides for India, USA, UK and Europe investors.',
  blogPost: blogPosts.map(p => ({
    '@type': 'BlogPosting',
    headline: p.seoTitle,
    description: p.seoDescription,
    url: `https://tooltrio.com/blog/${p.slug}`,
    datePublished: p.publishedAt,
    author: { '@type': 'Organization', name: 'tooltrio Team' },
  })),
}

const TRENDING_KEYWORDS = [
  'SIP Calculator 2026', 'Gold Price Today', 'Brent Crude $112', 'USD to INR Live',
  'Home Loan EMI', 'Income Tax New Regime', 'FIRE Calculator India', 'Roth IRA 2026',
  '401k vs Pension', 'UK ISA Guide', 'Retirement Planning', 'Mutual Fund Returns',
  'NPS vs PPF', 'SIP vs Real Estate', 'Bitcoin Tax India', 'Compound Interest',
  'Credit Score Tips', 'Salary Hike Guide', 'Rent vs Buy 2026', 'ELSS vs PPF',
]

const POPULAR_KEYWORDS = [
  { label: 'SIP Investment',    href: '/blog/sip-calculator-guide-how-to-grow-wealth-with-systematic-investment' },
  { label: 'Gold Price Guide',  href: '/commodities/gold-price-calculator' },
  { label: 'Home Loan EMI',     href: '/blog/emi-calculator-complete-guide-understand-home-car-personal-loans' },
  { label: 'Retirement Planning', href: '/blog/retirement-planning-guide-how-much-do-you-need-to-retire' },
  { label: 'UK Tax Guide',      href: '/blog/uk-income-tax-guide-paye-national-insurance-take-home-pay-2026' },
  { label: '401k vs Roth IRA',  href: '/blog/roth-ira-vs-traditional-ira-guide-usa-2026' },
  { label: 'FIRE Movement India', href: '/blog/fire-movement-india-guide-2026' },
  { label: 'Compound Interest', href: '/blog/compound-interest-guide-eighth-wonder-of-the-world' },
  { label: 'Income Tax Regime', href: '/blog/income-tax-new-vs-old-regime-india-2026' },
  { label: 'Currency Exchange', href: '/blog/currency-exchange-guide-india-2026' },
]

export default function BlogPage() {
  const featured = blogPosts[0]
  const byCategory: Record<string, typeof blogPosts> = {}
  blogPosts.forEach(p => {
    const cat = p.categorySlug || 'investment'
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(p)
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">Blog &amp; Guides</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">Finance &amp; Health Guides</h1>
              <p className="text-green-600 font-semibold text-sm mt-0.5">{blogPosts.length} Expert Guides - Free - No Signup</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            In-depth financial guides covering <strong>SIP investing</strong>, <strong>401k &amp; Roth IRA</strong>, <strong>UK income tax</strong>, <strong>retirement planning</strong>, <strong>FIRE</strong>, <strong>BMI &amp; health</strong>, and more - written for investors in India, USA, UK and Europe.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {Object.entries(CAT_CONFIG).map(([slug, cfg]) => {
              const count = byCategory[slug]?.length ?? 0
              if (!count) return null
              return (
                <a key={slug} href={`#cat-${slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold transition-all hover:shadow-sm ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                  <span>{cfg.icon}</span> {cfg.label}
                  <span className="text-xs opacity-70">({count})</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Trending Keywords */}
        <div className="my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            🔥 Trending Now
          </p>
          <div className="flex flex-wrap gap-2">
            {TRENDING_KEYWORDS.map(kw => (
              <span key={kw} className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-green-300 hover:text-green-700 transition-colors cursor-default">{kw}</span>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-gray-400">Popular topics:</span>
            {POPULAR_KEYWORDS.map(kw => (
              <a key={kw.href} href={kw.href} className="text-xs px-2.5 py-1 rounded-lg bg-green-50 border border-green-200 text-green-700 font-semibold hover:bg-green-100 transition-colors">{kw.label}</a>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured && (
          <div className="mb-12">
            <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">⭐ Featured Guide</p>
            <Link href={`/blog/${featured.slug}`}
              className="group block bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 border-green-200 hover:border-green-400 p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">{CAT_CONFIG[featured.categorySlug]?.label ?? featured.category}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{featured.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-green-700 transition-colors mb-3 leading-tight">{featured.title}</h2>
              <p className="text-gray-600 mb-4 max-w-2xl leading-relaxed">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-green-600 font-bold text-sm group-hover:gap-3 transition-all">
                Read full guide <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        )}

        {/* By Category */}
        {Object.entries(CAT_CONFIG).map(([catSlug, cfg]) => {
          const posts = byCategory[catSlug] ?? []
          if (!posts.length) return null
          const SHOW = 6
          return (
            <section key={catSlug} id={`cat-${catSlug}`} className="mb-14">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center text-xl`}>{cfg.icon}</div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">{cfg.label} Guides</h2>
                    <p className="text-sm text-gray-500">{cfg.desc} - {posts.length} articles</p>
                  </div>
                </div>
                {posts.length > SHOW && (
                  <Link href={`/blog/category/${catSlug}`}
                    className={`text-sm font-bold ${cfg.color} flex items-center gap-1 hover:gap-2 transition-all`}>
                    All {posts.length} <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.slice(0, SHOW).map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-lg transition-all p-5 flex flex-col shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color}`}>{cfg.icon} {cfg.label}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-snug mb-2 flex-1 line-clamp-3">{post.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                    {post.relatedCalc && (
                      <div className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg ${cfg.bg} ${cfg.color} flex items-center gap-1.5`}>
                        <TrendingUp className="w-3 h-3" />
                        <span className="truncate">{post.relatedCalc.name}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
              {posts.length > SHOW && (
                <div className="mt-4 text-center">
                  <Link href={`/blog/category/${catSlug}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${cfg.color} ${cfg.border} ${cfg.bg} hover:shadow-sm`}>
                    View all {posts.length} {cfg.label} guides <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </section>
          )
        })}

        {/* Bottom CTA */}
        <div className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 text-white text-center shadow-lg">
          <h2 className="text-2xl font-black mb-2">Ready to Put Theory Into Practice?</h2>
          <p className="text-green-100 mb-5 max-w-xl mx-auto">Use our free calculators to model the exact scenarios covered in these guides - with your own numbers.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/calculators/finance" className="px-5 py-2.5 bg-white text-green-700 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors">
              Browse Finance Calculators →
            </Link>
            <Link href="/calculators/health" className="px-5 py-2.5 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-400 transition-colors border border-green-400">
              Browse Health Calculators →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
