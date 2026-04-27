import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'px to REM Converter — Pixel to Rem Bulk Converter Free',
  description: 'Convert pixels to rem and back with custom base font size. Bulk conversion for entire CSS files. Runs entirely in your browser.',
  slug: 'pixel-rem-converter',
  keywords: ['pixel to rem converter online free','rem to pixel calculator','px rem em converter browser','fluid typography converter','base font size calculator'],
})

const faqs = [
  { question: "Why convert px to rem in CSS?", answer: `rem units scale with the user's browser font size preference. If a user sets their browser to 20px base (common for low-vision users), 1rem = 20px and all rem-based text and spacing scales accordingly. px ignores this — 14px stays 14px regardless of user preference. Accessibility guidelines recommend rem for font sizes. For layout spacing (margin, padding, gap), rem also works well — everything scales proportionally when the user adjusts font size. Use px only for borders, box-shadows, and purely decorative elements that should not scale.` },
  { question: "How does the rem calculation work?", answer: `rem = px / root-font-size. With the browser default of 16px: 24px = 24/16 = 1.5rem. 32px = 2rem. 14px = 0.875rem. If your root is set to 10px (via html { font-size: 62.5% }): 24px = 2.4rem, 16px = 1.6rem. The 62.5% trick makes conversions easier but is now considered less elegant than using a converter and keeping the default 16px root. Always check what root font size your project uses before converting.` },
  { question: "What is the 62.5% root font size trick?", answer: `Setting html { font-size: 62.5% } makes 1rem = 10px (62.5% of the 16px browser default). This makes px-to-rem conversion trivial: 24px = 2.4rem, 16px = 1.6rem. Advantages: intuitive math, easy mental conversion. Disadvantages: pollutes the root font size (all rem-based third-party components now use a different base), considered a hack, and increasingly unnecessary with CSS calc() and this converter available. Modern projects often keep the default 16px root and use a converter or design token system instead.` },
  { question: "Should I convert margin and padding values to rem?", answer: `Yes for most cases — scaling spacing with text size creates a more harmonious layout when users change font size. The exception: border widths, border-radius, and decorative shadows can stay in px since they should not scale with text. For responsive spacing that should change between breakpoints but not with user font preference: use CSS clamp() or viewport-relative units (vw, dvh) rather than rem. A practical rule: any spacing that directly relates to text readability (line gap, paragraph margin) should be rem. Structural spacing (grid gaps, page margins) can be either.` },
  { question: "How do I convert an entire CSS file from px to rem?", answer: `This tool handles bulk conversion. For a terminal approach: sed 's/\\([0-9]*\\)px/calc(\\1rem\\/16)/g' styles.css (rough — needs refinement for border-radius, box-shadow, media queries). A safer approach: use postcss-pxtorem (npm package) as a PostCSS plugin that intelligently converts px to rem in your build pipeline, with a configurable root value and exclusion list for properties that should stay in px. This is the recommended approach for large codebases — add to webpack or Vite config and it handles all conversions automatically.` },
  { question: "What is the difference between rem, em, and px for media queries?", answer: `Media queries should use rem — not px, and especially not em. Reason: browser zoom (Ctrl+) scales the viewport in px-based units but not always consistently. rem-based media queries react to the user's font size preference. If the user has a 20px base font, a 48rem breakpoint triggers at 960px instead of 768px, giving wider viewports to users who need larger text — this is the correct adaptive behavior. The Responsive Breakpoints tool on this site shows standard breakpoints in both px and rem.` },
  { question: "What other CSS unit and sizing tools are on this site?", answer: `The CSS Unit Converter handles all CSS units (px, rem, em, vw, vh, pt, cm). The Font Size Calculator generates fluid type scales using CSS clamp(). The Responsive Breakpoints tool shows standard viewport widths in rem. The Flexbox Generator and Grid Generator use gap values that benefit from rem conversion. All are in the Dev Tools CSS section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'px to REM Converter — Pixel to Rem Bulk Converter Free',
    description: 'Convert pixels to rem and back with custom base font size. Bulk conversion for entire CSS files. Runs entirely in your browser.',
    slug: 'pixel-rem-converter',
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
