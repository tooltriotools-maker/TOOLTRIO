import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { publishedBlogPosts } from '@/lib/blog/posts'
import { MarkdownContent } from '@/lib/blog/markdown'

// Inline SVG icons — no external package needed in server components
function ArrowRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
function Calculator({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="14" y1="18" x2="16" y2="18"/></svg> }
function ChevronRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="9 18 15 12 9 6"/></svg> }
function Clock({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }


interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return publishedBlogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = publishedBlogPosts.find(p => p.slug === slug)
  if (!post) return { title: 'Post Not Found | ToolTrio' }
  return {
    title: post.seoTitle ,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: { canonical: `https://tooltrio.com/blog/${slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://tooltrio.com/blog/${slug}`,
      siteName: 'ToolTrio',
      type: 'article',
      images: [{ url: `https://tooltrio.com/blog/${slug}/opengraph-image`, width: 1200, height: 630, alt: post.seoTitle }],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = publishedBlogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle,
    description: post.seoDescription,
    image: {
      '@type': 'ImageObject',
      url: `https://tooltrio.com/blog/${post.slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://tooltrio.com/about',
      worksFor: { '@type': 'Organization', name: 'ToolTrio', url: 'https://tooltrio.com' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'ToolTrio',
      url: 'https://tooltrio.com',
      logo: { '@type': 'ImageObject', url: 'https://tooltrio.com/logo.png' },
    },
    datePublished: post.publishedAt,
    // updatedAt falls back to publishedAt if the post hasn't been revised
    dateModified: post.updatedAt ?? post.publishedAt,
    url: `https://tooltrio.com/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://tooltrio.com/blog/${post.slug}` },
    keywords: post.keywords.join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tooltrio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://tooltrio.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.category, item: `https://tooltrio.com/blog/category/${post.categorySlug}` },
      { '@type': 'ListItem', position: 4, name: post.seoTitle, item: `https://tooltrio.com/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20">
        <div className="max-w-4xl mx-auto px-4 py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/blog/category/${post.categorySlug}`} className="hover:text-green-600 transition-colors">{post.category}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-700 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">{post.category}</span>
              <span className="flex items-center gap-1 text-gray-500 text-sm"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
              <span className="text-gray-400 text-sm">{post.publishedAt}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
          </header>

          {/* Related Calculator CTA */}
          {post.relatedCalc && (
            <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <p className="text-sm font-semibold text-green-700 mb-2">📊 Use the Calculator</p>
              <Link href={post.relatedCalc.href}
                className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors">
                {post.relatedCalc.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Article Content */}
          <article className="prose-green max-w-none">
            <MarkdownContent content={post.content} />
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{tag}</span>
              ))}
            </div>
          )}

          {/* Related Calculators */}
          {post.relatedCalcs && post.relatedCalcs.length > 0 && (
            <div className="mt-10 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">🔧 Related Calculators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {post.relatedCalcs.map(calc => (
                  <Link key={calc.href} href={calc.href}
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 transition-colors">
                    <span className="text-2xl">{calc.icon}</span>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{calc.name}</p>
                      <p className="text-xs text-gray-500">{calc.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Blog Posts */}
          {post.relatedBlogs && post.relatedBlogs.length > 0 && (
            <div className="mt-8">
              <h3 className="font-black text-gray-900 mb-4">📚 Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.relatedBlogs.map(blog => (
                  <Link key={blog.slug} href={`/blog/${blog.slug}`}
                    className="p-4 rounded-xl bg-white border border-gray-100 hover:border-green-300 hover:shadow-md transition-all">
                    <p className="font-bold text-gray-900 text-sm mb-1">{blog.title}</p>
                    <p className="text-xs text-gray-500">{blog.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <Link href="/blog" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors">
              ← Back to all articles
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
