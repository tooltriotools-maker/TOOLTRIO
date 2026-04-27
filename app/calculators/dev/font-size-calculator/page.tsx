import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Font Size Calculator — Fluid Type Scale with CSS clamp() Free',
  description: 'Calculate fluid typography scales using CSS clamp(). Set min and max font sizes across viewport breakpoints. Generates type scales and clamp() values. Runs in your browser.',
  slug: 'font-size-calculator',
  keywords: ['font size calculator online free','fluid typography calculator browser','clamp css font size generator','min max font size tool','responsive font scale calculator'],
})

const faqs = [
  { question: 'What is fluid typography and why is it better than fixed breakpoints?', answer: "Traditional responsive typography uses media queries to jump between discrete sizes: 16px on mobile, 18px on tablet, 20px on desktop. Fluid typography uses CSS clamp() to scale smoothly across all viewport widths: font-size: clamp(16px, 1rem + 1vw, 20px). Between the minimum viewport (where 16px applies) and maximum viewport (where 20px applies), the font size scales linearly. Benefits: no sudden size jumps at breakpoints, text is always proportional to the viewing context, fewer CSS rules to maintain, and better reading experience on in-between device sizes." },
  { question: 'How does CSS clamp() work for font sizing?', answer: "clamp(min, preferred, max) returns: min if preferred is smaller than min; max if preferred is larger than max; preferred otherwise. For font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem) — at small viewports, vw-based preferred value is small, clamped to 1rem. At large viewports, preferred grows with vw, clamped at 1.25rem. The middle value can be any CSS expression: a calc(), a vw unit, or a combination. The formula for linear scaling between viewport widths: preferred = valueAtMinVp + (valueAtMaxVp - valueAtMinVp) * (100vw - minVp) / (maxVp - minVp). This calculator generates the exact clamp() values for your target size range and viewport range." },
  { question: 'What is a type scale and which ratios should I use?', answer: "A type scale is a set of harmonically related font sizes, each a consistent multiple of the previous. Common ratios: Minor Third (1.2) — subtle scale for body-heavy content. Major Third (1.25) — balanced for most web apps. Perfect Fourth (1.333) — medium contrast, popular in design systems. Augmented Fourth (1.414) — moderate drama. Perfect Fifth (1.5) — significant size jumps, good for marketing sites. Golden Ratio (1.618) — dramatic scale for display typography. At base 16px with 1.25 ratio: 16, 20, 25, 31.25, 39, 48.8px. Tailwind CSS uses a custom non-geometric scale tuned for readability." },
  { question: 'How do I ensure fluid font sizes respect user browser preferences?', answer: "Use rem as the base unit for clamp() — the min and max should be in rem (relative to the user\'s root font size), not px. clamp(1rem, ..., 1.5rem) scales with user preferences. clamp(16px, ..., 24px) ignores them. The preferred/middle value can use a px-based vw calculation for the viewport scaling, but the clamps themselves should be rem. Example: clamp(1rem, 0.875rem + 0.5vw, 1.5rem) — the clamping respects user base font size, while the vw-based scaling handles viewport responsiveness." },
  { question: 'What line height should I use with different font sizes?', answer: "Line height (leading) should decrease as font size increases: body text (16-18px) needs 1.5-1.7 line height for readability. Subheadings (20-28px) work well at 1.3-1.4. Large headings (32px+) often use 1.1-1.2 or even 1.0 for tightly stacked display type. The principle: small text needs generous line height to aid eye tracking across long lines. Large display text on short lines looks better tight. In CSS, line-height: 1.5 is unitless (multiplied by the current font-size) — this is the correct way to specify it. Avoid px values for line-height as they do not scale with font size changes." },
  { question: 'How do I implement a fluid type scale in Tailwind CSS?', answer: "Tailwind v3.3+ supports arbitrary clamp values: text-[clamp(1rem,0.9rem+0.5vw,1.25rem)]. For a reusable system, extend the theme in tailwind.config.js: fontSize: { 'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)', 'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.25rem)', 'fluid-lg': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)' }. This gives you Tailwind classes like text-fluid-base that use fluid sizing. For Tailwind v4 which uses CSS config, define these as CSS custom properties." },
  { question: 'What other CSS and layout tools are on this site?', answer: "The CSS Unit Converter translates between px, rem, em, and vw values needed for clamp() calculations. The Responsive Breakpoints tool shows common viewport widths to use as min/max viewport bounds in fluid scaling. The px to REM Converter handles the rem conversion for clamp() min and max values. The Flexbox Generator and Grid Generator handle fluid layout containers that hold your fluid text. All are in the Dev Tools CSS section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Font Size Calculator — Fluid Type Scale with CSS clamp() Free',
    description: 'Calculate fluid typography scales using CSS clamp(). Set min and max font sizes across viewport breakpoints. Generates type scales and clamp() values. Runs in your browser.',
    slug: 'font-size-calculator',
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
