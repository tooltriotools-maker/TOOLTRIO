import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Open Graph Preview — Social Link Card Previewer Free',
  description: 'Preview how your Open Graph tags appear as link cards on Facebook, LinkedIn, Twitter, Slack, and Discord. Validate og:image dimensions. Runs in your browser.',
  slug: 'open-graph-preview',
  keywords: ['open graph preview tool online free','og tags preview browser','facebook link preview checker','og image preview tool','social share preview online'],
})

const faqs = [
  { question: "What is the Open Graph protocol?", answer: `Open Graph is a metadata protocol created by Facebook (now Meta) that controls how web pages appear when shared as links on social platforms. The key tags: og:title (card headline), og:description (card subtitle), og:image (preview image — most visually impactful), og:url (canonical URL), og:type (website, article, product). When you share a link on Facebook, LinkedIn, Slack, Discord, or most messaging apps, those platforms fetch and parse the OG tags to generate the link preview card.` },
  { question: "What og:image dimensions work best across platforms?", answer: `Universal recommendation: 1200x630px, aspect ratio 1.91:1. Facebook: minimum 600x315, optimal 1200x630. Twitter/X summary card with large image: minimum 300x157, recommended 1200x628. LinkedIn: 1200x627. Discord and Slack: use OG tags and render up to 1200x628. Keep critical content (text, logos) within the center 900x500 to avoid cropping on platforms that apply their own aspect ratio constraints. Use exactly 1200x630 as your standard — it covers all platforms.` },
  { question: "How do I force social platforms to refresh their cached OG data?", answer: `Social platforms aggressively cache OG tags after first fetch. To force refresh: Facebook Sharing Debugger (developers.facebook.com/tools/debug) — paste URL and click 'Scrape Again'. LinkedIn Post Inspector (linkedin.com/post-inspector) — enter URL to force cache refresh. Twitter Card Validator (cards-dev.twitter.com/validator). Discord: no direct refresh tool — it re-fetches when the cache expires (usually 24-48 hours) or when a new link is pasted in a channel for the first time.` },
  { question: "What is the difference between og:title and the HTML <title> tag?", answer: `The HTML <title> tag controls the browser tab title and the blue headline in Google search results. og:title controls the headline in social link preview cards. They are often the same but can differ: a page title might be 'Product Name | Company Name' (includes brand) while og:title might be 'Product Name — Short Compelling Description' (more marketing-oriented without the brand suffix). If og:title is not specified, most platforms fall back to the <title> tag.` },
  { question: "How do I test OG tags without deploying to production?", answer: `Tools: ngrok exposes your local dev server to the internet (ngrok http 3000), then paste the ngrok URL into the Facebook Debugger. Many meta tag generators (including this site's) provide a preview based on the values you enter without needing a live URL. For staging environments: ensure the staging URL is accessible publicly (not IP-restricted) and that OG tags reference the staging domain correctly — og:image URLs must be absolute and publicly accessible for social platforms to fetch them.` },
  { question: "What is Twitter Card vs Open Graph for Twitter?", answer: `Twitter uses its own card system with twitter: prefixed tags: twitter:card (summary, summary_large_image, player, app), twitter:title, twitter:description, twitter:image. However, Twitter also falls back to og: tags if twitter: tags are absent. Best practice: set both. Twitter's 'summary_large_image' card type shows a large image above the title — the most visually impactful format, similar to og:image on Facebook. The twitter:card type tag determines the card layout; without it, Twitter defaults to 'summary' (small image).` },
  { question: "What other SEO and social tools are on this site?", answer: `The Meta Tag Generator produces complete HTML including both SEO and OG tags. The robots.txt Generator creates crawl control files. The Word Counter verifies og:description stays within the 200-character recommended limit. The Favicon Generator creates the site icon that appears alongside OG cards in some contexts. All are in the Dev Tools SEO section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Open Graph Preview — Social Link Card Previewer Free',
    description: 'Preview how your Open Graph tags appear as link cards on Facebook, LinkedIn, Twitter, Slack, and Discord. Validate og:image dimensions. Runs in your browser.',
    slug: 'open-graph-preview',
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
