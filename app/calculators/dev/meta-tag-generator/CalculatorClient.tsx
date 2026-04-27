'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [title, setTitle] = useState('My Awesome Page Title')
  const [desc, setDesc] = useState('A compelling description that clearly explains what this page is about and entices users to click.')
  const [url, setUrl] = useState('https://example.com/page')
  const [image, setImage] = useState('https://example.com/og-image.png')
  const [author, setAuthor] = useState('')
  const [keywords, setKeywords] = useState('keyword1, keyword2, keyword3')
  const [robot, setRobot] = useState('index, follow')
  const [type, setType] = useState<'website'|'article'|'product'>('website')
  const [twitterCard, setTwitterCard] = useState<'summary'|'summary_large_image'>('summary_large_image')
  const [copied, setCopied] = useState('')

  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  const titleLen = title.length
  const descLen = desc.length

  const metaTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${desc}" />
<meta name="keywords" content="${keywords}" />
<meta name="robots" content="${robot}" />${author ? `\n<meta name="author" content="${author}" />` : ''}

<!-- Canonical -->
<link rel="canonical" href="${url}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${type}" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />${image ? `\n<meta property="og:image" content="${image}" />` : ''}

<!-- Twitter Card -->
<meta name="twitter:card" content="${twitterCard}" />
<meta name="twitter:url" content="${url}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />${image ? `\n<meta name="twitter:image" content="${image}" />` : ''}`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Meta Tag Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🏷️ Meta Tag Generator</h1>
      <p className="text-gray-500 mb-6">Generate SEO meta tags, Open Graph tags, and Twitter Card tags for any webpage. Copy the complete &lt;head&gt; snippet instantly.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-gray-900">Page Information</h2>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Page Title</label>
                <span className={`text-xs font-bold ${titleLen > 60 ? 'text-red-500' : titleLen > 50 ? 'text-yellow-500' : 'text-green-600'}`}>{titleLen}/60</span>
              </div>
              <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm" />
              <p className="text-xs text-gray-400 mt-1">Ideal: 50-60 characters. Shows in Google search results.</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Meta Description</label>
                <span className={`text-xs font-bold ${descLen > 160 ? 'text-red-500' : descLen > 140 ? 'text-yellow-500' : 'text-green-600'}`}>{descLen}/160</span>
              </div>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={3} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm resize-none" />
              <p className="text-xs text-gray-400 mt-1">Ideal: 120-160 characters. Shows as search snippet.</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Canonical URL</label>
              <input value={url} onChange={e=>setUrl(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm font-mono" placeholder="https://example.com/page" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">OG Image URL</label>
              <input value={image} onChange={e=>setImage(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm font-mono" placeholder="https://example.com/og.png (1200x630 recommended)" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Author</label>
                <input value={author} onChange={e=>setAuthor(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm" placeholder="Optional" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Robots</label>
                <select value={robot} onChange={e=>setRobot(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm">
                  <option>index, follow</option>
                  <option>noindex, nofollow</option>
                  <option>index, nofollow</option>
                  <option>noindex, follow</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Keywords (comma separated)</label>
              <input value={keywords} onChange={e=>setKeywords(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">OG Type</label>
                <select value={type} onChange={e=>setType(e.target.value as any)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm">
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Twitter Card</label>
                <select value={twitterCard} onChange={e=>setTwitterCard(e.target.value as any)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 focus:border-blue-400 focus:outline-none text-sm">
                  <option value="summary_large_image">Large image</option>
                  <option value="summary">Summary</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Output + Preview */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3">Google Search Preview</h2>
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-blue-700 font-medium text-base truncate">{title || 'Page Title'}</p>
              <p className="text-green-700 text-xs mb-1 truncate">{url || 'https://example.com'}</p>
              <p className="text-gray-600 text-sm line-clamp-2">{desc || 'Meta description will appear here...'}</p>
            </div>
            {titleLen > 60 && <p className="text-xs text-red-500 mt-1">⚠️ Title too long - will be truncated in search results</p>}
            {descLen > 160 && <p className="text-xs text-red-500 mt-1">⚠️ Description too long - will be truncated in search results</p>}
          </div>

          <div className="bg-gray-950 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase">Generated Meta Tags</span>
              <button onClick={() => copy(metaTags, 'all')} className="flex items-center gap-1.5 text-xs font-bold text-green-400 hover:text-green-300">
                {copied==='all' ? <><Check className="w-3.5 h-3.5"/>Copied!</> : <><Copy className="w-3.5 h-3.5"/>Copy All</>}
              </button>
            </div>
            <pre className="font-mono text-xs text-green-300 whitespace-pre-wrap overflow-auto max-h-64">{metaTags}</pre>
          </div>
        </div>
      </div>

      <SEOContent title="Meta Tag Generator" category="dev"
        intro="The Meta Tag Generator creates complete, SEO-optimized HTML meta tag snippets - including primary SEO tags, Open Graph (OG) tags for Facebook/LinkedIn, and Twitter Card tags - in a single copy-paste block. Fill in your page information and get production-ready code for your website's &lt;head&gt; section in seconds.\n\nProper meta tags are foundational for SEO, social media sharing, and click-through rates. A missing og:image means no preview card on LinkedIn. A title over 60 characters gets truncated in Google. A missing canonical URL risks duplicate content penalties. This generator handles all these requirements automatically, with live validation of title and description lengths against Google's guidelines.

**Long-tail searches answered here:** meta tag generator free online usa, seo meta tags generator free no signup, open graph meta tags creator free tool, html meta description and title generator free, how to write good meta tags free generator, twitter card meta tags generator free usa, open graph image size requirements meta tags free, twitter card vs open graph difference guide free usa, meta robots noindex nofollow tag generator free, canonical url meta tag generator free usa, charset viewport meta tag generator free, meta tags for next.js react app generator free usa, structured data vs meta tags seo comparison free, meta description length checker under 160 chars free, meta tags for apple mobile web app generator free usa"
        howItWorks="The generator dynamically builds a complete &lt;head&gt; meta tag snippet from your inputs. Title length is validated against Google's recommended 50-60 character limit with color-coded feedback. Description is checked against the 120-160 character sweet spot. The canonical URL is set as both the link[rel=canonical] and the og:url to ensure consistency across SEO and social sharing signals.\n\nOpen Graph tags follow the OGP protocol (ogp.me) used by Facebook, LinkedIn, Slack, Discord, and WhatsApp for link preview cards. Twitter Card tags follow Twitter's card markup specification. Both are included in the output since different platforms use different standards."
        benefits={[
          { title: 'Real-Time Google Preview', text: 'See exactly how your page will appear in Google search results, with live title and description truncation warnings when lengths exceed Google\'s limits.' },
          { title: 'Complete SEO + Social Stack', text: 'One snippet includes primary SEO tags, Open Graph for Facebook/LinkedIn, and Twitter Cards - covering all major platforms where your links are shared.' },
          { title: 'Character Length Validation', text: 'Live color-coded feedback on title (ideal: 50-60 chars) and description (120-160 chars) prevents common mistakes that cause Google to rewrite your snippets.' },
          { title: 'Configurable Robots Directive', text: 'Set index/noindex and follow/nofollow directives with a dropdown - critical for staging environments, filtered search pages, and private content.' },
          { title: 'OG Type & Twitter Card Options', text: 'Choose between website, article, and product Open Graph types, and select the Twitter card format that best suits your content.' },
          { title: 'Copy-Ready Output', text: 'One click copies the complete, formatted snippet ready to paste into your HTML template, Next.js metadata, or CMS head injection field.' },
        ]}
        useCases={[
          { title: 'New Website Launch', text: 'Set up complete meta tags for every page before launch to ensure proper Google indexing, social sharing previews, and click-through rates from day one.' },
          { title: 'Blog & Content Sites', text: 'Each blog post needs unique title, description, and OG image meta tags. Generate the correct code quickly for each new article without memorizing the syntax.' },
          { title: 'E-commerce Product Pages', text: 'Product pages need og:type="product" and compelling descriptions to maximize click-through from Google Shopping and social media product shares.' },
          { title: 'Technical SEO Audits', text: 'Reference the correct tag syntax when auditing existing pages for missing or malformed meta tags during SEO improvement projects.' },
          { title: 'Social Media Marketing', text: 'Before sharing a page link in a campaign, verify the og:image and title are set correctly to ensure the link preview card looks compelling on Facebook and LinkedIn.' },
          { title: 'Next.js & React Projects', text: 'Reference the correct property names when implementing metadata in Next.js metadata exports, react-helmet, or head components in React frameworks.' },
        ]}
        tipsSection={`Always include an og:image with dimensions of at least 1200x630px. LinkedIn requires 1200x628px minimum; Facebook displays best at exactly 1200x630. A missing OG image means plain text link previews with no visual engagement on all social platforms.\n\nSet the canonical URL on every page - even if it\'s just the current page URL. This prevents duplicate content issues from URL parameters (?utm_source=, ?sort=, etc.) that create multiple indexable versions of the same page.\n\nGoogle will rewrite your meta description if it thinks a different text better matches the search query. This is normal and expected - your description still influences click-through rate even when it appears in search snippets.

For Next.js projects, use the metadata export instead of react-helmet or next/head. Next.js 14+ App Router has a built-in Metadata API: export const metadata = { title: 'Page Title', description: '...' }. For dynamic pages, use generateMetadata() as an async function that can fetch data. Next.js automatically handles OG, Twitter, and canonical tags from the metadata object.

For multilingual sites, add hreflang attributes alongside your canonical URL. These tell Google which language/region each URL targets: <link rel="alternate" hreflang="en-us" href="https://example.com/en/page"> and <link rel="alternate" hreflang="en-gb" href="https://example.com/uk/page">. Missing hreflang tags on international sites cause wrong-language pages to appear in search results for users in specific countries.

Google frequently rewrites page titles (up to 60% of pages according to published studies) when it determines the original title doesn't accurately represent the page content. Titles are most often rewritten when they're too short, too long, stuffed with keywords, or don't match the actual page content. The best protection against title rewriting is writing accurate, descriptive titles that genuinely represent your page's primary topic.`}
        scienceSection={`The Open Graph Protocol (OGP) was created by Facebook in 2010 and has become the de facto standard for social media link previews. OGP is now used by Facebook, LinkedIn, Slack, Discord, WhatsApp, Telegram, iMessage, and Twitter (which also developed its own Twitter Cards specification). Without OG tags, social platforms generate low-quality previews by scraping page content heuristically - often with poor results.

Google's handling of meta descriptions changed significantly in 2020 when they announced that their systems now generate approximately 62% of search result snippets from page content rather than the meta description tag - but the meta description remains the primary signal for search result text and influences click-through rate significantly. A compelling meta description that matches searcher intent improves CTR by 5-10% according to published Google Search Console case studies.

The W3C's HTML specification defines which character entities and Unicode characters are valid in meta tag content. Modern browsers support Unicode directly in meta content attributes, but legacy systems may require HTML entity encoding for non-ASCII characters.`}
        conclusion="The Meta Tag Generator eliminates the need to memorize Open Graph protocol property names, Twitter Card syntax, and SEO best practice guidelines. Generate correct, complete meta tags for every page in seconds - free, no signup, no limits."
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
