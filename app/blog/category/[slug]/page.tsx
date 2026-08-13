import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { publicBlogPosts, blogCategories } from '@/lib/blog/posts'

// Inline SVG icons — no external package needed in server components
function ArrowRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
function ChevronRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="9 18 15 12 9 6"/></svg> }
function Clock({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }


interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogCategories.map(cat => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = blogCategories.find(c => c.slug === slug)
  if (!cat) return { title: 'Category Not Found | ToolTrio' }
  const restricted = false
  if (slug === 'zip-codes') {
    return {
      title: 'ZIP Code Guides — Lookup, ZIP+4, Distance, Timezone & Coordinates | ToolTrio',
      description: 'Practical US ZIP code guides covering ZIP lookup, ZIP+4, distance between ZIP codes, time zones, coordinates, counties, formats and related location tools.',
      robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
      alternates: { canonical: 'https://tooltrio.com/blog/category/zip-codes' },
      openGraph: {
        title: 'ZIP Code Guides — Lookup, ZIP+4, Distance, Timezone & Coordinates | ToolTrio',
        description: 'Practical guides for US ZIP code lookup, ZIP+4, distance, time zones, coordinates and related ZIP tools.',
        url: 'https://tooltrio.com/blog/category/zip-codes',
        siteName: 'ToolTrio',
        type: 'website',
        images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio ZIP Code Guides' }],
      },
    }
  }
  return {
    title: `${cat.name} — Free Guides & Articles | ToolTrio`,
    description: `${cat.desc}. Free guides, tips, and calculators. No signup required.`,
    robots: restricted ? { index: false, follow: true, googleBot: { index: false, follow: true } } : { index: true, follow: true },
    alternates: { canonical: `https://tooltrio.com/blog/category/${slug}` },
    openGraph: {
      title: `${cat.name} | ToolTrio Blog`,
      description: cat.desc,
      url: `https://tooltrio.com/blog/category/${slug}`,
      siteName: 'ToolTrio',
      type: 'website',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio Blog' }],
    },
  }
}

export default async function BlogCategory({ params }: Props) {
  const { slug } = await params
  const cat = blogCategories.find(c => c.slug === slug)
  if (!cat) notFound()

  const posts = publicBlogPosts.filter(p => p.categorySlug === slug)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700">{cat.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{cat.icon}</span>
            <h1 className="text-3xl font-black text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>{cat.name}</h1>
          </div>
          <p className="text-gray-600 text-lg">{cat.desc}</p>
          <p className="text-sm text-gray-400 mt-2">{posts.length} articles</p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-green-300 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
                <h2 className="font-black text-gray-900 text-lg leading-tight mb-2 group-hover:text-green-700 transition-colors">{post.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-green-600 text-sm font-semibold">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No articles yet in this category.</p>
            <Link href="/blog" className="text-green-600 hover:underline mt-2 inline-block">Browse all articles →</Link>
          </div>
        )}

        {/* All Categories */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="font-bold text-gray-700 mb-4">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {blogCategories.filter(c => c.slug !== slug && !isRestrictedBlogCategory(c.slug)).map(c => (
              <Link key={c.slug} href={`/blog/category/${c.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-sm font-semibold text-gray-700">
                <span>{c.icon}</span> {c.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
