import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allBlogPosts as blogPosts } from '@/lib/blog/posts'
import { Clock, User, ArrowLeft, ArrowRight, Tag, Calculator, BookOpen } from 'lucide-react'
import { FinanceLinksGrid } from '@/components/ui/FinanceLinksGrid'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  const url = `https://tooltrio.com/blog/${post.slug}`
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    creator: 'tooltrio.com',
    publisher: 'tooltrio.com',
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      url,
      siteName: 'tooltrio.com',
      images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: post.seoTitle }],
    },
    twitter: { card: 'summary_large_image', title: post.seoTitle, description: post.seoDescription, images: ['https://tooltrio.com/og-image.png'] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
  }
}

function renderMarkdown(content: string) {
  content = content.replace(/~~~/g, '```')
  const lines = content.trim().split('\n')
  let html = ''
  let inTable = false
  let tableRows: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) { if (inTable) { html += renderTable(tableRows); inTable = false; tableRows = [] } continue }

    if (line.startsWith('|')) {
      inTable = true; tableRows.push(line); continue
    }
    if (inTable) { html += renderTable(tableRows); inTable = false; tableRows = [] }

    if (line.startsWith('## ')) html += `<h2>${inline(line.slice(3))}</h2>`
    else if (line.startsWith('### ')) html += `<h3>${inline(line.slice(4))}</h3>`
    else if (line.startsWith('#### ')) html += `<h4>${inline(line.slice(5))}</h4>`
    else if (line.startsWith('- ') || line.startsWith('* ')) html += `<li>${inline(line.slice(2))}</li>`
    else if (/^\d+\. /.test(line)) html += `<li>${inline(line.replace(/^\d+\. /, ''))}</li>`
    else if (line.startsWith('```') || line.startsWith('~~~')) html += '<pre><code>'
    else if (line === '```' || line === '~~~') html += '</code></pre>'
    else if (line.startsWith('> ')) html += `<blockquote>${inline(line.slice(2))}</blockquote>`
    else html += `<p>${inline(line)}</p>`
  }
  if (inTable && tableRows.length) html += renderTable(tableRows)

  html = html.replace(/(<li>.*?<\/li>\s*)+/g, m => `<ul>${m}</ul>`)
  html = html.replace(/<\/code><\/pre>\s*<pre><code>/g, '\n')

  return html
}

function renderTable(rows: string[]) {
  if (rows.length < 2) return ''
  const headers = rows[0].split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('')
  const body = rows.slice(2).map(row => {
    const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${inline(c.trim())}</td>`).join('')
    return `<tr>${cells}</tr>`
  }).join('')
  return `<div class="overflow-x-auto my-5"><table class="calc-table"><thead><tr>${headers}</tr></thead><tbody>${body}</tbody></table></div>`
}

function inline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-green-600 underline underline-offset-2 hover:text-green-700">$1</a>')
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const catPosts = blogPosts.filter(p => p.categorySlug === post.categorySlug && p.slug !== post.slug).slice(0, 6)
  const trendingPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 5)
  const popularPosts  = [...blogPosts]
    .filter(p => p.slug !== post.slug)
    .sort((a, b) => (b.relatedCalcs?.length ?? 0) - (a.relatedCalcs?.length ?? 0))
    .slice(0, 5)
  const idx = blogPosts.findIndex(p => p.slug === post.slug)
  const prevPost = idx > 0 ? blogPosts[idx - 1] : null
  const nextPost = idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Organization', name: 'tooltrio.com', url: 'https://tooltrio.com' },
    publisher: { '@type': 'Organization', name: 'tooltrio.com', url: 'https://tooltrio.com', logo: { '@type': 'ImageObject', url: 'https://tooltrio.com/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://tooltrio.com/blog/${post.slug}` },
    keywords: post.keywords.join(', '),
    url: `https://tooltrio.com/blog/${post.slug}`,
    image: { '@type': 'ImageObject', url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630 },
    inLanguage: 'en',
    isAccessibleForFree: true,
    about: post.tags.map(t => ({ '@type': 'Thing', name: t })),
    mentions: [{ '@type': 'WebApplication', name: post.relatedCalc.name, url: `https://tooltrio.com${post.relatedCalc.href}` }],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tooltrio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://tooltrio.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.category, item: `https://tooltrio.com/blog/category/${post.categorySlug}` },
      { '@type': 'ListItem', position: 4, name: post.title, item: `https://tooltrio.com/blog/${post.slug}` },
    ],
  }

  const faqItems: {q:string;a:string}[] = []
  const lines = post.content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^#{2,3}\s+(.+)/)
    if (h && i + 1 < lines.length) {
      const q = h[1].replace(/[*_`]/g, '')
      const aLines: string[] = []
      for (let j = i + 1; j < lines.length && j < i + 6; j++) {
        if (lines[j].match(/^#{1,3}\s/)) break
        if (lines[j].trim()) aLines.push(lines[j].trim().replace(/\*\*([^*]+)\*\*/g, '$1'))
      }
      if (aLines.length) faqItems.push({ q, a: aLines.join(' ').slice(0, 300) })
    }
  }
  const faqSchema = faqItems.length > 2 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.slice(0, 8).map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-3">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-semibold mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden mb-6">
              <div className="bg-gradient-to-br from-green-50 to-white px-8 pt-8 pb-6">
                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <Link href={`/blog/category/${post.categorySlug}`} className="badge-green hover:bg-green-200 transition-colors">{post.category}</Link>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black font-display text-gray-900 leading-tight mb-4">{post.title}</h1>
                <p className="text-gray-500 text-base leading-relaxed">{post.excerpt}</p>

                <div className="mt-5 p-4 rounded-2xl bg-green-100 border border-green-200 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-green-800">Try the Free Calculator</p>
                    <p className="text-xs text-green-700 mt-0.5">Instantly calculate with interactive charts</p>
                  </div>
                  <Link href={post.relatedCalc.href}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
                    🧮 {post.relatedCalc.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="px-8 py-6">
                <div
                  className="prose-green max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                  style={{ lineHeight: '1.8' }}
                />
                {/* All Finance Calculators - 100+ internal links */}
                <FinanceLinksGrid
                  title="📊 All Free Finance Calculators"
                  showCategories={true}
                />
              </div>

              <div className="px-8 pb-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
              {post.keywords && post.keywords.length > 0 && (
                <div className="px-8 pb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Related Topics</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.keywords.slice(0, 20).map(kw => (
                      <span key={kw} className="text-[11px] px-2 py-0.5 rounded bg-green-50 border border-green-100 text-green-700 font-medium">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {post.relatedBlogs && post.relatedBlogs.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-4">
                <div className="px-5 py-3 border-b border-gray-100 bg-blue-50 flex items-center justify-between">
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">📚 Related Guides &amp; Articles</p>
                  <Link href="/blog" className="text-xs text-blue-600 hover:underline font-medium">View all articles -{'>'}</Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {post.relatedBlogs.map(b => (
                    <Link key={b.slug} href={`/blog/${b.slug}`}
                      className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-blue-50 transition-colors group">
                      <div>
                        <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{b.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white mb-4">
              <h3 className="font-black text-xl font-display mb-2">Ready to Run the Numbers?</h3>
              <p className="text-green-100 text-sm mb-4">Apply what you just learned with our free calculator. Interactive charts, instant results, no signup.</p>
              <Link href={post.relatedCalc.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg">
                🧮 Open {post.relatedCalc.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {post.relatedCalcs && post.relatedCalcs.length > 1 && (
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-6">
                <div className="px-5 py-3 border-b border-gray-100 bg-green-50 flex items-center justify-between">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wider">🔢 More Related Calculators</p>
                  <Link href="/calculators/finance" className="text-xs text-green-600 hover:underline font-medium"> View all 151 →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                  {post.relatedCalcs.slice(1).map((calc) => (
                    <Link key={calc.href} href={calc.href}
                      className="flex items-center gap-3 px-4 py-4 hover:bg-green-50 transition-colors group border-b border-gray-100 last:border-0">
                      <span className="text-2xl flex-shrink-0">{calc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 group-hover:text-green-700 transition-colors leading-tight">{calc.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-tight">{calc.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`}
                  className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-card hover:border-green-200 transition-all">
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-2"><ArrowLeft className="w-3 h-3" />Previous</p>
                  <p className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors line-clamp-2">{prevPost.title}</p>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`}
                  className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-card hover:border-green-200 transition-all text-right ml-auto w-full">
                  <p className="text-xs text-gray-400 flex items-center gap-1 justify-end mb-2">Next <ArrowRight className="w-3 h-3" /></p>
                  <p className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors line-clamp-2">{nextPost.title}</p>
                </Link>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-5">
            <div className="sticky top-20 space-y-3">
              <div className="bg-green-600 rounded-2xl p-5 text-white">
                <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1">🧮 Free Calculator</p>
                <p className="font-black text-lg font-display mb-1">{post.relatedCalc.name}</p>
                <p className="text-green-200 text-xs mb-3">Interactive charts. Instant results. No signup.</p>
                <Link href={post.relatedCalc.href}
                  className="w-full block text-center py-2.5 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors text-sm">
               Open Calculator →
                </Link>
              </div>

              {post.relatedCalcs && post.relatedCalcs.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-green-50">
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider">🔢 Related Calculators</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {post.relatedCalcs.map((calc) => (
                      <Link key={calc.href} href={calc.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors group">
                        <span className="text-xl flex-shrink-0">{calc.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 group-hover:text-green-700 transition-colors leading-tight">{calc.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5 leading-tight line-clamp-1">{calc.desc}</p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-green-500 flex-shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                    <Link href="/calculators/finance" className="text-xs text-green-600 hover:text-green-700 font-semibold">
                    View all 151 free calculators →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-yellow-50">
                <p className="text-xs font-bold text-yellow-700 uppercase tracking-wider">🔍 Trending Topics</p>
              </div>
              <div className="p-3">
                <div className="flex flex-wrap gap-1.5">
                  {post.keywords.slice(0, 12).map(kw => (
                    <span key={kw} className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-green-100 hover:text-green-700 cursor-default transition-colors">{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-red-50">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">🔥 Trending Now</p>
              </div>
              <div className="p-2 space-y-1">
                {trendingPosts.map((p, i) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`}
                    className="flex items-start gap-2 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors group">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-600 text-[10px] font-black flex items-center justify-center mt-0.5">{i+1}</span>
                    <p className="text-xs font-semibold text-gray-700 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">{p.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-blue-50">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">⭐ Most Popular</p>
              </div>
              <div className="p-2 space-y-1">
                {popularPosts.map(p => (
                  <Link key={p.slug} href={`/blog/${p.slug}`}
                    className="flex items-start gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors group">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">{p.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            {catPosts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 bg-green-50 flex items-center justify-between">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wider">📖 Related Articles</p>
                  <Link href={`/blog/category/${post.categorySlug}`} className="text-xs text-green-600 hover:underline font-medium">All {post.category} →</Link>
                </div>
                <div className="p-3 space-y-1">
                  {catPosts.map(p => (
                    <Link key={p.slug} href={`/blog/${p.slug}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors group">
                      <div className="flex-1">
                        <p className="font-semibold text-xs text-gray-800 group-hover:text-green-700 transition-colors leading-tight line-clamp-2">{p.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                          {p.relatedCalc && <span className="text-xs text-green-600 font-medium truncate">🧮 {p.relatedCalc.name}</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <Link href="/blog" className="text-xs text-green-600 hover:text-green-700 font-semibold">
                  Browse all 157 guides →
                  </Link>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Browse Topics</p>
              </div>
              <div className="p-3 space-y-1">
                {[{ name: 'All Posts', slug: '', icon: '📚' }, ...require('@/lib/blog/posts').blogCategories.map((c: any) => ({ name: c.name, slug: c.slug, icon: c.icon }))].map(cat => (
                  <Link key={cat.slug} href={cat.slug ? `/blog/category/${cat.slug}` : '/blog'}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-green-50 text-sm text-gray-700 hover:text-green-700 font-medium transition-colors">
                    <span>{cat.icon}</span>{cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
