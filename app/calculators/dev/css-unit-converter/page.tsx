import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS Unit Converter — px, rem, em, vw, vh, pt Free Online',
  description: 'Convert between CSS units: px, rem, em, vw, vh, pt, cm, mm. Set custom base font size and viewport dimensions. Runs entirely in your browser.',
  slug: 'css-unit-converter',
  keywords: ['css unit converter online free','px to rem converter browser','rem to px calculator free','em to px converter online','vw vh to px converter','css units converter tool'],
})

const faqs = [
  { question: 'What is the difference between rem and em in CSS?', answer: "rem (root em) is relative to the root element font-size — the <html> element. If the root is 16px, 1rem = 16px everywhere in the document regardless of nesting. em is relative to the current element\'s font-size (or the parent\'s font-size for non-font properties). Nested elements compound: a 1.2em text inside another 1.2em element renders at 1.44× the root size. This compounding makes em hard to reason about in deep component trees. The modern recommendation: use rem for font sizes and spacing to keep everything relative to one consistent reference point." },
  { question: 'Why should I use rem instead of px for font sizes?', answer: "rem respects the user\'s browser font size preference. If a user sets their browser to 20px base (common for low-vision users), 1rem = 20px and all your rem-based text scales accordingly. px ignores this — a 14px font stays 14px regardless of user preference. Accessibility guidelines and best practices recommend rem for font sizes. For layout spacing (margin, padding, gap), rem also works well — everything scales proportionally when the user adjusts their font size. For borders, box-shadows, and purely decorative elements that should not scale with text: px is appropriate." },
  { question: 'What are viewport units (vw, vh) and when should I use them?', answer: "vw (viewport width) and vh (viewport height) are percentages of the browser window. 1vw = 1% of viewport width, 100vw = full width. Common uses: full-height sections (height: 100vh — though on mobile, 100dvh is more reliable), fluid typography (font-size: clamp(16px, 2.5vw, 24px)), full-bleed images, and hero sections. Problems: 100vh on iOS Safari includes the browser chrome, cutting off content. The new dynamic viewport units (dvw, dvh, svw, svh) solve this — dvh is the small viewport height (excluding browser UI), svh is the large viewport (including it)." },
  { question: 'How does the px to rem calculation work?', answer: `The formula: rem = px / root-font-size. With the default browser root of 16px: 24px = 24/16 = 1.5rem. 32px = 2rem. 14px = 0.875rem. If you set html { font-size: 10px } (a common trick), 1rem = 10px and conversions are easier: 24px = 2.4rem. This is the "62.5% trick" — setting html { font-size: 62.5% } makes 1rem = 10px while still scaling with the user\'s browser preference. Many developers avoid this trick now, preferring to just use a converter and keep the default 16px root.` },
  { question: 'What is the difference between vw and % for width?', answer: "% width is relative to the element\'s containing block (parent element). vw is relative to the viewport width — the browser window. A 100% width inside a 500px container is 500px. 100vw is the full browser window width regardless of the container. This matters for full-bleed backgrounds inside centered containers: a card at max-width: 1200px has 100% = 1200px, but 100vw = the full window width. To make a background span the full window from inside a constrained container: width: 100vw; margin-left: calc((100vw - 100%) / -2) — a common technique for full-bleed sections." },
  { question: 'When should I use pt or cm in CSS?', answer: "pt (points) and cm (centimeters) are absolute units intended for print stylesheets (@media print). In a print context: 1pt = 1/72 inch, 1cm = the physical centimeter on paper. For screen: 1pt = approximately 1.33px at 96dpi (the CSS standard reference resolution), but this varies by device DPI. In practice: never use pt or cm for screen layouts. Use px for fixed screen measurements, rem/em for scalable text, and vw/vh for viewport-relative sizes. Reserve pt and cm for @media print rules where physical paper dimensions matter." },
  { question: 'What other layout and sizing tools are on this site?', answer: "The px to REM Converter is a focused tool specifically for that conversion with bulk conversion support. The Responsive Breakpoints tool shows standard screen widths for media query planning. The Aspect Ratio Calculator derives missing dimensions while maintaining proportions. The Font Size Calculator generates fluid type scales using CSS clamp(). The Flexbox Generator and Grid Generator handle layout without needing manual unit math. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS Unit Converter — px, rem, em, vw, vh, pt Free Online',
    description: 'Convert between CSS units: px, rem, em, vw, vh, pt, cm, mm. Set custom base font size and viewport dimensions. Runs entirely in your browser.',
    slug: 'css-unit-converter',
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
