import type { Metadata } from 'next'
import Link from 'next/link'
import { publicBlogPosts as blogPosts, blogCategories } from '@/lib/blog/posts'
import { generateBreadcrumbStructuredData } from '@/lib/seo/structured-data'

// Inline SVG icons — no external package needed in server components
function ArrowRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
function BookOpen({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> }
function Calculator({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="14" y1="18" x2="16" y2="18"/></svg> }
function ChevronRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="9 18 15 12 9 6"/></svg> }
function Clock({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function Home({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function TrendingUp({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> }


const CURRENT_YEAR = new Date().getFullYear()

export const metadata: Metadata = {
  title: `Free ZIP Guides & Research ${CURRENT_YEAR} | ToolTrio`,
  description: `${blogPosts.length} free ZIP Code guides and articles.`,
  keywords: [
    'ZIP code guides',
    'ZIP+4 guide',
  ],
  alternates: { canonical: 'https://tooltrio.com/blog' },
  openGraph: {
    title: `${blogPosts.length} Expert Guides & Articles ${CURRENT_YEAR} | ToolTrio`, 
    description: `${blogPosts.length} expert ZIP Code guides.`,
    url: 'https://tooltrio.com/blog',
    siteName: 'ToolTrio',
    type: 'website',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio' }],
  },
}

const CATEGORY_STYLE: Record<string, { color: string; border: string; bg: string }> = {
  'zip-codes': { color: 'text-teal-700', border: 'border-teal-200', bg: 'bg-teal-50' },
}

const CAT_CONFIG = Object.fromEntries(
  blogCategories.map(category => ({
    ...category,
    label: category.name,
    ...(CATEGORY_STYLE[category.slug] ?? CATEGORY_STYLE['zip-codes']),
  })).map(category => [category.slug, category]),
) as Record<string, (typeof blogCategories)[number] & { label: string; color: string; border: string; bg: string }>

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'tooltrio.com Blog',
  url: 'https://tooltrio.com/blog',
  description: `${blogPosts.length} expert ZIP Code guides.`,
  blogPost: blogPosts.map(p => ({
    '@type': 'BlogPosting',
    headline: p.seoTitle,
    description: p.seoDescription,
    url: `https://tooltrio.com/blog/${p.slug}`,
    datePublished: p.publishedAt,
    author: { '@type': 'Organization', name: p.author || 'ToolTrio', url: 'https://tooltrio.com/about' },
  })),
}

const blogBreadcrumbSchema = generateBreadcrumbStructuredData([
  { name: 'Home', url: 'https://tooltrio.com' },
  { name: 'Blog', url: 'https://tooltrio.com/blog' },
])

const TRENDING_KEYWORDS: string[] = []
const POPULAR_KEYWORDS: { label: string; href: string }[] = []

export default function BlogPage() {
  const featured = blogPosts[0]
  const byCategory: Record<string, typeof blogPosts> = {}
  blogPosts.forEach(p => {
    const cat = p.categorySlug || 'zip-codes'
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(p)
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbSchema) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">Blog & Guides</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="page-title text-3xl md:text-4xl font-black text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>Guides & Articles <span className="text-green-600">| ToolTrio</span></h1>
              <p className="text-green-600 font-semibold text-sm mt-0.5">{blogPosts.length} Expert Guides - Free - No Signup</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Deep, task-first ZIP Code guides with current USPS/Census context, worked examples, edge cases, and direct links to the exact ToolTrio lookup you need.
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
              <span key={kw} className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-green-300 hover:text-green-700 transition-all cursor-default">{kw}</span>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-gray-400">Popular topics:</span>
            {POPULAR_KEYWORDS.map(kw => (
              <a key={kw.href} href={kw.href} className="text-xs px-2.5 py-1 rounded-lg bg-green-50 border border-green-200 text-green-700 font-semibold hover:bg-green-100 transition-all">{kw.label}</a>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured && (
          <div className="mb-12">
            <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">⭐ Featured Guide</p>
            <Link href={`/blog/${featured.slug}`}
              className="group block from-green-50 to-emerald-50 rounded-3xl border-2 border-green-200 hover:border-green-400 p-6 md:p-8 shadow-sm hover:shadow-md transition-all" style={{background:'linear-gradient(135deg,rgba(240,253,244,0.9),rgba(236,253,245,0.9))'}}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">{CAT_CONFIG[featured.categorySlug]?.label ?? featured.category}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{featured.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-green-700 transition-all mb-3 leading-tight" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>{featured.title}</h2>
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
                    <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-all leading-snug mb-2 flex-1 line-clamp-3">{post.title}</h3>
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

        </div>
      </div>
    </>
  )
}
