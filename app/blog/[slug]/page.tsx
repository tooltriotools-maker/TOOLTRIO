import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { publishedBlogPosts } from '@/lib/blog/posts'
import { MarkdownContent } from '@/lib/blog/markdown'
import { ShareButton } from '@/components/ui/ShareButton'
function ArrowRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12"/></svg> }
function ChevronRight({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="9 18 15 12 9 6"/></svg> }
function Clock({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function Shield({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/><path d="m9 12 2 2 4-4"/></svg> }

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() { return publishedBlogPosts.map(post => ({ slug: post.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = publishedBlogPosts.find(p => p.slug === slug)
  if (!post) return { title: 'Post Not Found | ToolTrio' }
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: `https://tooltrio.com/blog/${slug}` },
    openGraph: { title: post.seoTitle, description: post.seoDescription, url: `https://tooltrio.com/blog/${slug}`, siteName: 'ToolTrio', type: 'article', publishedTime: post.publishedAt, modifiedTime: post.updatedAt ?? post.publishedAt, images: [{ url: `https://tooltrio.com/blog/${slug}/opengraph-image`, width: 1200, height: 630, alt: post.seoTitle }] },
  }
}

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 90)
}

function getHeadings(content: string) {
  return content.split(/\r?\n/).filter(line => /^##\s+/.test(line.trim())).map(line => {
    const text = line.replace(/^##\s+/, '').trim()
    return { text, id: slugifyHeading(text) }
  }).slice(0, 14)
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = publishedBlogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const headings = getHeadings(post.content)
  const relatedTools: Array<{ href: string; icon: string; name: string; desc: string }> = []
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.seoTitle, description: post.seoDescription,
    image: { '@type': 'ImageObject', url: `https://tooltrio.com/blog/${post.slug}/opengraph-image`, width: 1200, height: 630 },
    author: { '@type': 'Organization', name: post.author || 'ToolTrio', url: 'https://tooltrio.com/about' },
    publisher: { '@type': 'Organization', name: 'ToolTrio', url: 'https://tooltrio.com', logo: { '@type': 'ImageObject', url: 'https://tooltrio.com/logo.png' } },
    datePublished: post.publishedAt, dateModified: post.updatedAt ?? post.publishedAt, url: `https://tooltrio.com/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://tooltrio.com/blog/${post.slug}` }, keywords: post.keywords.join(', '),
  }
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tooltrio.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://tooltrio.com/blog' },
    { '@type': 'ListItem', position: 3, name: post.category, item: `https://tooltrio.com/blog/category/${post.categorySlug}` },
    { '@type': 'ListItem', position: 4, name: post.seoTitle, item: `https://tooltrio.com/blog/${post.slug}` },
  ] }

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="blog-shell">
      <div className="blog-ambient blog-ambient-a" /><div className="blog-ambient blog-ambient-b" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 relative">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-emerald-600">Home</Link><ChevronRight size={13}/><Link href="/blog" className="hover:text-emerald-600">Blog</Link><ChevronRight size={13}/><Link href={`/blog/category/${post.categorySlug}`} className="hover:text-emerald-600">{post.category}</Link><ChevronRight size={13}/><span className="text-slate-700 truncate max-w-[260px]">{post.title}</span>
        </nav>

        <header className="blog-hero-card mb-8 md:mb-10">
          <div className="blog-hero-glow" />
          <div className="relative p-6 md:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="blog-pill">{post.category}</span>
              <span className="blog-meta-pill"><Clock size={14}/>{post.readTime}</span>
              <span className="blog-meta-pill">Updated {post.updatedAt ?? post.publishedAt}</span>
              <span className="blog-verified"><Shield size={14}/> Data-aware guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.04] max-w-5xl">{post.title}</h1>
            <p className="mt-5 text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {post.relatedCalc && <Link href={post.relatedCalc.href} className="blog-primary-cta">Open {post.relatedCalc.name}<ArrowRight size={17}/></Link>}
              <ShareButton title={post.title} description={post.excerpt} category="ZIP" />
            </div>
            <div className="mt-7 pt-5 border-t border-slate-200/70 flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-slate-500">
              <span>By <strong className="text-slate-700">{post.author}</strong></span><span>Published {post.publishedAt}</span><span>Refreshed {post.updatedAt ?? post.publishedAt}</span><span>21-guide ZIP knowledge cluster</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 xl:gap-10 items-start">
          <main className="min-w-0">
            <section className="blog-answer-card mb-7">
              <div><span className="blog-eyebrow">QUICK ANSWER</span><h2 className="text-xl md:text-2xl font-black text-slate-950 mt-1">What you should know before using this ZIP data</h2></div>
              <p className="text-slate-600 leading-relaxed mt-3">{post.excerpt} The detailed guide below separates USPS postal facts from Census geography, derived coordinates, crosswalks, and other secondary data so you can use the result without confusing one type of location data for another.</p>
            </section>

            {post.relatedCalc && <div className="blog-tool-banner mb-8"><div><span className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Finish the task</span><h2 className="text-xl md:text-2xl font-black text-slate-950 mt-1">Use the live ToolTrio lookup</h2><p className="text-sm text-slate-600 mt-1">Move directly from the explanation to the relevant ZIP workflow.</p></div><Link href={post.relatedCalc.href} className="blog-secondary-cta">{post.relatedCalc.name}<ArrowRight size={16}/></Link></div>}

            <article className="blog-article prose-green max-w-none"><MarkdownContent content={post.content} /></article>

            <section className="mt-10 blog-source-card">
              <div className="flex items-start gap-3"><div className="blog-source-icon"><Shield size={18}/></div><div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Sources & freshness</p><h2 className="text-xl font-black text-slate-950 mt-1">Built around current USPS + Census guidance</h2><p className="text-sm text-slate-600 leading-relaxed mt-2">The editorial refresh is dated {post.updatedAt ?? '2026-08-14'}. For operational postal decisions, verify against the latest USPS material; for population and demographic work, use the appropriate Census ZCTA dataset and vintage.</p><div className="flex flex-wrap gap-2 mt-4"><a href="https://facts.usps.com/42000-zip-codes/" target="_blank" rel="noopener noreferrer" className="blog-source-link">USPS ZIP count ↗</a><a href="https://about.usps.com/postal-bulletin/" target="_blank" rel="noopener noreferrer" className="blog-source-link">USPS Postal Bulletin ↗</a><a href="https://www.census.gov/programs-surveys/geography/guidance/geo-areas/zctas.html" target="_blank" rel="noopener noreferrer" className="blog-source-link">Census ZCTA guide ↗</a></div></div></div>
            </section>

            {post.tags?.length ? <div className="mt-7 flex flex-wrap gap-2">{post.tags.map(tag => <span key={tag} className="blog-tag">#{tag}</span>)}</div> : null}

            {post.relatedCalcs?.length ? <section className="mt-10"><div className="flex items-end justify-between mb-4"><div><p className="blog-eyebrow">TOOL CLUSTER</p><h2 className="text-2xl md:text-3xl font-black text-slate-950">Related ZIP tools</h2></div><Link href="/zip" className="text-sm font-bold text-emerald-700 hover:text-emerald-900">Browse all ZIP tools →</Link></div><div className="grid sm:grid-cols-2 gap-3">{post.relatedCalcs.map(calc => <Link key={calc.href} href={calc.href} className="blog-tool-card"><span className="blog-tool-icon">{calc.icon}</span><span><strong>{calc.name}</strong><small>{calc.desc}</small></span><ArrowRight size={16}/></Link>)}</div></section> : null}

            <section className="mt-10"><div className="flex items-end justify-between mb-4"><div><p className="blog-eyebrow">MORE WORKFLOWS</p><h2 className="text-2xl md:text-3xl font-black text-slate-950">You may also need</h2></div></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{relatedTools.slice(0,6).map(tool => <Link key={tool.href} href={tool.href} className="blog-mini-tool"><span className="text-xl">{tool.icon}</span><span className="min-w-0"><strong>{tool.name}</strong><small>{tool.desc}</small></span></Link>)}</div></section>

            {post.relatedBlogs?.length ? <section className="mt-10"><p className="blog-eyebrow">TOPIC CLUSTER</p><h2 className="text-2xl md:text-3xl font-black text-slate-950 mt-1 mb-4">Continue the ZIP guide</h2><div className="grid md:grid-cols-2 gap-4">{post.relatedBlogs.map(blog => <Link key={blog.slug} href={`/blog/${blog.slug}`} className="blog-related-card"><span className="text-xs font-bold text-emerald-700">RELATED GUIDE</span><strong>{blog.title}</strong><p>{blog.desc}</p><span className="text-sm font-bold text-emerald-700 mt-auto">Read guide →</span></Link>)}</div></section> : null}

            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4"><Link href="/blog" className="font-bold text-emerald-700 hover:text-emerald-900">← Back to all guides</Link><Link href="/zip" className="blog-primary-cta">Explore ZIP tools <ArrowRight size={16}/></Link></div>
          </main>

          <aside className="lg:sticky lg:top-24 space-y-4">
            <div className="blog-toc-card"><p className="blog-eyebrow">ON THIS PAGE</p><h2 className="font-black text-slate-950 mt-1 mb-3">Jump to a section</h2><nav>{headings.map((h,i)=><a key={`${h.id}-${i}`} href={`#${h.id}`} className="blog-toc-link"><span>{String(i+1).padStart(2,'0')}</span>{h.text}</a>)}</nav></div>
            <div className="blog-side-cta"><span className="text-2xl">📍</span><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700 mt-3">Need the result?</p><h3 className="text-lg font-black text-slate-950 mt-1">Don't stop at the article.</h3><p className="text-sm text-slate-600 leading-relaxed mt-2">Run the related ZIP lookup, then come back when you need the deeper explanation.</p>{post.relatedCalc && <Link href={post.relatedCalc.href} className="blog-primary-cta w-full mt-4 justify-center">{post.relatedCalc.name}<ArrowRight size={15}/></Link>}</div>
            <div className="blog-side-note"><Shield size={16}/><div><strong>Freshness note</strong><p>Editorial data checked for the August 14, 2026 refresh.</p></div></div>
          </aside>
        </div>
      </div>
    </div>
  </>
}
