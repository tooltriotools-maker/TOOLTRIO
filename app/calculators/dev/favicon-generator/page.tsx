import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Favicon Generator — Create Multi-Size Favicons Free Online',
  description: 'Generate favicons in all required sizes from a single image. Creates 16x16, 32x32, 180x180 (Apple Touch), and 192x192 (Android) icons with the correct HTML. Runs in your browser.',
  slug: 'favicon-generator',
  keywords: ['favicon generator online free','favicon ico png svg browser','create favicon from text free','favicon from image generator','website favicon maker online'],
})

const faqs = [
  { question: 'What favicon sizes do I actually need in 2026?', answer: "The minimum set: favicon.ico (16x16 and 32x32 combined, for classic browser tab), favicon-32x32.png (retina browser tabs), favicon-16x16.png (small contexts), apple-touch-icon.png at 180x180 (iOS home screen bookmark), and android-chrome-192x192.png + 512x512 (Android home screen, PWA). For full coverage also add: favicon.svg (modern browsers scale this perfectly — one SVG replaces most PNG sizes), og-image.png at 1200x630 (social sharing preview image), and a site.webmanifest referencing the Android icons. The .ico format is only strictly required for Internet Explorer compatibility." },
  { question: 'Should I use SVG favicons in 2026?', answer: "Yes for modern browsers — SVG favicons (link rel='icon' type='image/svg+xml') are supported by Chrome, Firefox, and Edge and render crisply at any size. Safari does not support SVG favicons for browser tabs but does for pinned tabs (rel='mask-icon'). The recommended approach: provide both SVG and fallback PNG. <link rel='icon' href='/favicon.svg' type='image/svg+xml'> plus <link rel='icon' href='/favicon.ico' sizes='any'> covers all browsers. The SVG can also include embedded CSS for dark/light mode adaptation — the favicon can change color when the OS switches between dark and light mode." },
  { question: 'What is the site.webmanifest file and do I need it?', answer: "The Web App Manifest (site.webmanifest) is a JSON file that tells browsers how to display your site as an installable PWA (Progressive Web App). It specifies: name and short_name (app title), icons (array of sizes and paths), theme_color (browser chrome color on mobile), background_color (splash screen), display (standalone removes browser UI), and start_url. Even for non-PWA sites, including a manifest is recommended — it enables the 'Add to Home Screen' prompt on Android and Chrome desktop, and is required for PWA installability criteria (Lighthouse audit). Reference it with: <link rel='manifest' href='/site.webmanifest'>." },
  { question: 'What image should I start with for the best favicon quality?', answer: "Start with a square SVG or 512x512+ PNG. Vector SVG is ideal because it scales perfectly to any size without quality loss. If using a raster image, 1024x1024 or larger gives enough resolution to downscale without visible artifacts. Key considerations: favicons are tiny — 16x16 is 256 pixels total. A complex logo with thin lines and small text becomes an illegible blob at 16x16. Good favicon design is a simplified, bold version of the brand mark — often just the logomark (symbol) without the logotype (text). Test how the favicon looks at actual browser tab size before finalizing." },
  { question: 'How do I add a dynamic favicon that changes based on application state?', answer: "Use JavaScript to swap the favicon link element: function setFavicon(href) { let link = document.querySelector('link[rel=icon]') || document.createElement('link'); link.rel = 'icon'; link.href = href; document.head.appendChild(link); }. Practical uses: notifications badge (add a dot overlay to the favicon when there are unread messages — common in chat apps), dark mode switch (swap between light and dark variants of the favicon), status indicator (green/yellow/red favicon for system health dashboards). Draw dynamic favicons using a canvas element: const canvas = document.createElement('canvas'); draw to it; convert with canvas.toDataURL()." },
  { question: 'Why does my browser show the old favicon after I update it?', answer: "Browsers aggressively cache favicons — sometimes for days. To force a refresh during development: clear browser cache (Ctrl+Shift+Delete), open the favicon URL directly in a new tab and hard refresh (Ctrl+Shift+R), or use a cache-busting query string (href='/favicon.ico?v=2'). In production, use content-hash filenames (favicon.abc123.ico) and update the HTML reference — this forces all browsers to fetch the new file. For users with cached old favicons: there is no reliable way to force a refresh; it typically clears naturally within 24-48 hours." },
  { question: 'What other image and design tools are on this site?', answer: "The Image to Base64 tool converts small icons to data URIs for embedding directly in HTML without external requests. The SVG Optimizer reduces SVG favicon file size. The Aspect Ratio Calculator ensures your source image is square before generating favicons. The Open Graph Preview shows how your og-image (related to favicon branding) appears in social link previews. The Meta Tag Generator produces the HTML for all icon link tags. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Favicon Generator — Create Multi-Size Favicons Free Online',
    description: 'Generate favicons in all required sizes from a single image. Creates 16x16, 32x32, 180x180 (Apple Touch), and 192x192 (Android) icons with the correct HTML. Runs in your browser.',
    slug: 'favicon-generator',
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
