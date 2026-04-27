import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Color Palette Generator — Design System Colors Free Online',
  description: 'Generate harmonious color palettes and design system color scales from a base color. Complementary, triadic, analogous, and monochromatic schemes. Runs in your browser.',
  slug: 'color-palette',
  keywords: ['color palette generator online free','design color scheme browser','complementary analogous colors','color harmony generator free','css color palette builder','brand color palette generator'],
})

const faqs = [
  { question: 'What is the difference between complementary, analogous, and triadic color schemes?', answer: "These describe the relationship between colors on the color wheel. Complementary: two colors directly opposite each other (blue + orange, red + green). High contrast, vibrant, good for call-to-action buttons against a neutral background. Analogous: three or more colors adjacent on the wheel (blue, blue-green, green). Natural, harmonious, commonly seen in nature. Good for calm, cohesive UI themes. Triadic: three colors equally spaced 120° apart (red, yellow, blue). Vibrant and balanced. Split-complementary is a safer version of complementary: one base color + two colors adjacent to its complement." },
  { question: 'How do design systems like Tailwind and Material Design define color scales?', answer: "Both use a 9-step or 10-step numbered scale. Tailwind uses 50-900 (50, 100, 200, 300, 400, 500, 600, 700, 800, 900) where 500 is the base/primary shade. Material Design 3 uses 0-100 tonal palette. The pattern: low numbers are very light tints, high numbers are very dark shades. In HSL terms, hold the hue constant and vary lightness from ~95% (lightest) to ~10% (darkest), with slight saturation adjustments. This systematic approach means any number in the scale works predictably with any other: 600 is always readable text on a 100 background." },
  { question: 'How do I choose a primary brand color that works for both light and dark mode?', answer: "Choose a mid-range hue (HSL lightness around 45-55%) for your primary brand color. This gives you room to lighten for dark mode backgrounds and darken for light mode backgrounds. Avoid very light colors (pastel primary colors are nearly invisible on white backgrounds) and very dark colors (near-black primaries are invisible on dark backgrounds). Test your chosen primary at the mid-point: hsl(h, s, 50%). From there, build light variants (increase lightness to 90-95% for dark mode text) and dark variants (decrease to 20-30% for light mode text)." },
  { question: 'What is the 60-30-10 color rule?', answer: "The 60-30-10 rule is a design composition guideline: 60% dominant color (usually a neutral — white, off-white, light gray for light mode; dark gray or dark blue for dark mode), 30% secondary color (a complementary neutral or brand-adjacent color for backgrounds, cards, sidebars), 10% accent color (the primary brand color used for buttons, links, highlights, interactive elements). This prevents color overload while maintaining visual hierarchy. Apply it to your design system: define which colors are backgrounds, which are surfaces, and which are accents." },
  { question: 'How do I ensure my color palette is accessible?', answer: "Run every text-on-background combination through a contrast ratio checker. The WCAG 2.1 AA minimum is 4.5:1 for normal text, 3:1 for large text. In a typical design system: your darkest text color (gray-900) on white background should be 15:1+. Brand primary on white needs to hit 4.5:1 — this is why medium-saturation blues, greens, and purples work as link colors (dark enough) while yellows and cyans do not (too light). The Color Contrast Checker on this site tests any pair instantly." },
  { question: 'What are semantic color tokens and why do design systems use them?', answer: "Semantic tokens give colors purpose-based names instead of (or in addition to) scale numbers. Instead of referencing blue-600 directly in components, you define semantic tokens: --color-primary: blue-600; --color-text-default: gray-900; --color-background: white; --color-danger: red-600; --color-success: green-600. Components reference semantic tokens. When you swap themes (light/dark, brand A/brand B), you only change the token definitions, not every component. Tailwind 3 added semantic CSS variables (--tw-ring-color etc.). Design tokens are the formal specification for this approach, supported by Figma\'s token plugins and Style Dictionary." },
  { question: 'What other color tools are on this site?', answer: "The Color Converter translates between HEX, RGB, HSL, and CMYK for any color in your palette. The Color Contrast Checker verifies WCAG accessibility for text/background combinations. The CSS Gradient Generator creates gradients from your palette colors. The Box Shadow Generator uses palette colors for shadow tinting. All are in the Dev Tools CSS section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Color Palette Generator — Design System Colors Free Online',
    description: 'Generate harmonious color palettes and design system color scales from a base color. Complementary, triadic, analogous, and monochromatic schemes. Runs in your browser.',
    slug: 'color-palette',
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
