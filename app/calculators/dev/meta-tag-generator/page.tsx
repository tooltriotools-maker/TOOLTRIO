import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Meta Tag Generator — SEO, Open Graph & Twitter Cards Free',
  description: 'Generate complete HTML meta tags for SEO, Open Graph (Facebook/LinkedIn), and Twitter Card previews. Copy-ready output. Runs in your browser.',
  slug: 'meta-tag-generator',
  keywords: ['meta tag generator online free','seo meta description generator','open graph meta tags builder','html head meta tags tool','twitter card generator browser'],
})

const faqs = [
  { question: "What is the difference between SEO meta tags and Open Graph tags?", answer: `SEO meta tags (title and description) control how your page appears in Google search results — title becomes the clickable blue link, meta description becomes the gray snippet below it. Open Graph (OG) tags control how your page appears when shared on social platforms — Facebook, LinkedIn, Slack, Discord, and most messaging apps use OG tags to generate link previews. Twitter Cards are Twitter's parallel system. For comprehensive coverage: set both SEO title/description and OG tags, since each serves a different display surface.` },
  { question: "What is the ideal length for a meta description?", answer: `Google typically displays 150-160 characters. Descriptions over 160 are truncated with '...' at an arbitrary word boundary. The optimal approach: write a 150-155 character description that includes your primary keyword naturally, clearly states what the page does, and gives a reason to click. Avoid keyword stuffing — Google ignores manipulative descriptions and may substitute page content instead.` },
  { question: "What size should og:image be for best social sharing?", answer: `Facebook and LinkedIn: 1200x630px, aspect ratio 1.91:1. Twitter summary card with large image: 1200x628 minimum, ratio 2:1. Discord and Slack: render up to 1200x628. Universal recommendation: 1200x630. Keep critical content (text, logos) within the center 900x500 to avoid cropping on platforms that apply their own aspect ratio constraints.` },
  { question: "Does the meta keywords tag still matter for SEO?", answer: `No. Google officially announced in 2009 that it does not use meta keywords as a ranking signal, and has not since. Bing confirmed the same. Meta keywords were trivially manipulated with keyword stuffing. Including them in 2026 has zero SEO benefit. The only meta tags that matter for SEO: title, description, robots (for indexing control), canonical (for duplicate content), and viewport (for mobile rendering).` },
  { question: "What is the canonical tag and when do I need it?", answer: `The canonical tag (<link rel='canonical' href='https://example.com/page/'>) tells search engines which URL is the authoritative version of a page. You need it when: the same content is accessible at multiple URLs (http vs https, www vs non-www, trailing slash vs no trailing slash, URL parameters like ?ref=newsletter), when you syndicate content to other sites, or when you have paginated content. Without canonical tags, search engines may split ranking signals between duplicate URLs instead of concentrating them on your preferred version.` },
  { question: "How do I verify my Open Graph tags are working?", answer: `The Open Graph Preview tool on this site shows a live preview. For platform-specific verification: Facebook Sharing Debugger (developers.facebook.com/tools/debug) fetches and renders your tags and clears the cache. LinkedIn Post Inspector (linkedin.com/post-inspector). Twitter Card Validator (cards-dev.twitter.com/validator). All these tools also have cache-clearing functions — important after updating OG tags, since platforms aggressively cache the first version they see.` },
  { question: "What other SEO and dev tools are on this site?", answer: `The Open Graph Preview tool renders your OG tags as link cards for visual verification. The robots.txt Generator creates crawl control files. The Word Counter helps optimize title and description lengths. The HTML Validator ensures your meta tag markup has no syntax errors. All are in the Dev Tools SEO section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Meta Tag Generator — SEO, Open Graph & Twitter Cards Free',
    description: 'Generate complete HTML meta tags for SEO, Open Graph (Facebook/LinkedIn), and Twitter Card previews. Copy-ready output. Runs in your browser.',
    slug: 'meta-tag-generator',
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
