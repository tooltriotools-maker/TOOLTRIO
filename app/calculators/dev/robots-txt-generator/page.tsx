import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'robots.txt Generator — SEO Crawler Control Rules Free',
  description: 'Generate robots.txt files with allow/disallow rules, crawl-delay, and sitemap declarations. Validates syntax. Runs entirely in your browser.',
  slug: 'robots-txt-generator',
  keywords: ['robots txt generator online free','robots.txt builder browser','create robots txt file free','disallow sitemap robots generator','robots txt syntax checker'],
})

const faqs = [
  { question: "What is robots.txt and how do search engines use it?", answer: `robots.txt is a text file at the root of your website (yourdomain.com/robots.txt) that tells web crawlers which parts of your site to index. It uses the Robots Exclusion Protocol — not an enforced standard but universally respected by all major search engines (Google, Bing, DuckDuckGo). It does NOT prevent pages from appearing in search results — it only tells crawlers not to visit those pages. If a page is linked from another indexed page, Google may still index it even if robots.txt disallows crawling. To prevent indexing, use the X-Robots-Tag HTTP header or meta robots noindex tag instead.` },
  { question: "What is the difference between Disallow and noindex?", answer: `Disallow in robots.txt: prevents the crawler from visiting the page. The page will not be crawled, but Google may still list it in search results if other sites link to it (without seeing the content). noindex (in meta robots tag or X-Robots-Tag header): allows the crawler to visit the page but tells it not to include the page in search results. For pages you want completely removed from search: use noindex, not Disallow. For pages with sensitive content you do not want crawled at all: use Disallow. For maximum control: use both Disallow to prevent crawling AND ensure no external links point to it.` },
  { question: "How do I block only specific bots while allowing others?", answer: `Use separate User-agent blocks: User-agent: GPTBot (OpenAI's training crawler) followed by Disallow: / blocks OpenAI while leaving Google unaffected. User-agent: CCBot (Common Crawl) followed by Disallow: / blocks data harvesting crawlers. User-agent: * is the wildcard that applies to all crawlers not explicitly named. Place specific bot rules before the wildcard rule. Common bots to consider blocking: GPTBot, Google-Extended, CCBot, anthropic-ai, FacebookBot (if you want to prevent social scraping).` },
  { question: "How do I protect admin areas and API endpoints with robots.txt?", answer: `User-agent: *
Disallow: /admin/
Disallow: /api/private/
Disallow: /wp-admin/
Disallow: /login

This prevents crawlers from following links to those paths. Important: robots.txt is publicly readable — do not list paths that reveal sensitive system information (internal admin paths, backup URLs). For actual security, implement authentication. robots.txt is a courtesy signal, not a security control — malicious bots ignore it. Use HTTP authentication, firewall rules, or rate limiting for real security.` },
  { question: "Where do I declare my sitemap in robots.txt?", answer: `Add Sitemap: https://yourdomain.com/sitemap.xml at the end of the robots.txt file. This tells all crawlers where to find your sitemap regardless of which User-agent block applies to them. You can declare multiple sitemaps: Sitemap: https://yourdomain.com/sitemap-posts.xml followed by Sitemap: https://yourdomain.com/sitemap-pages.xml. Google also accepts sitemap declarations through Google Search Console, but robots.txt declaration is universally supported and does not require verification.` },
  { question: "How do I test if my robots.txt is working correctly?", answer: `Google Search Console has a robots.txt Tester tool that shows which URLs are blocked for Googlebot. Paste your robots.txt content and test specific URLs. For other bots: use the robots.txt spec parser at robotstxt.checker.org. Fetch the file directly: curl https://yourdomain.com/robots.txt to verify it is accessible and correctly formatted. The robots.txt must be served with HTTP 200 and Content-Type: text/plain. A 404 or 500 response is interpreted as 'no restrictions' — crawlers proceed unhindered.` },
  { question: "What other SEO tools are on this site?", answer: `The Meta Tag Generator produces HTML meta tags for SEO, Open Graph, and Twitter Cards. The Open Graph Preview shows how pages appear when shared on social platforms. The sitemap generator creates XML sitemaps to submit alongside robots.txt. The HTTP Headers Analyzer verifies X-Robots-Tag headers for noindex directives. The Word Counter helps keep robots.txt comments concise. All are in the Dev Tools SEO section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'robots.txt Generator — SEO Crawler Control Rules Free',
    description: 'Generate robots.txt files with allow/disallow rules, crawl-delay, and sitemap declarations. Validates syntax. Runs entirely in your browser.',
    slug: 'robots-txt-generator',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
