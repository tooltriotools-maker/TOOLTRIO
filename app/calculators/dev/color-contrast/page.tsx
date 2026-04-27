import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Color Contrast Checker — WCAG AA/AAA Accessibility Free',
  description: 'Check color contrast ratios for WCAG 2.1 AA and AAA compliance. Instant pass/fail for normal text, large text, and UI components. Runs entirely in your browser.',
  slug: 'color-contrast',
  keywords: ['wcag color contrast checker online free','color contrast ratio calculator','aa aaa contrast test browser','accessible color checker free','contrast ratio tool web'],
})

const faqs = [
  { question: "What contrast ratio do I need to pass WCAG AA?", answer: `WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text (under 18pt or 14pt bold) and 3:1 for large text (18pt+ or 14pt+ bold). UI components and graphical elements (icons, chart data markers, input borders) also require 3:1 against adjacent colors. WCAG AAA is stricter: 7:1 for normal text and 4.5:1 for large text. Most legal accessibility requirements (ADA, Section 508, EN 301 549) align with WCAG 2.1 AA. AAA is considered best practice for highly accessible experiences.` },
  { question: "How is the contrast ratio calculated?", answer: `The formula is (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter color and L2 is the luminance of the darker. Relative luminance is calculated by converting each RGB channel to a linear value (gamma-corrected), then applying weights 0.2126R + 0.7152G + 0.0722B. The weights reflect human visual perception: the eye is most sensitive to green, then red, then blue. Pure white has luminance 1.0, pure black 0.0, giving a maximum possible contrast ratio of 21:1.` },
  { question: "My design has a gradient background — which color do I test?", answer: `For gradient backgrounds under text, test the worst case — the point along the gradient where contrast is lowest. If text sits over a gradient from white to dark blue, the white end gives the lowest contrast for dark text and the dark blue end gives the lowest contrast for light text. Test both extremes and ensure both pass. If either fails, consider a semi-transparent scrim behind the text area. Never test only the average or middle color of a gradient.` },
  { question: "Does color alone determine contrast — what about font weight and size?", answer: `The contrast ratio is purely a function of the two colors. Whether you need 4.5:1 or 3:1 depends on font size and weight. 'Large text' in WCAG is 18pt+ (24px+) in normal weight, or 14pt+ (~18.67px+) in bold. If your UI uses bold text at 16px, it qualifies as large text and needs only 3:1. Decorative text, logotypes, and text in inactive UI components are exempt from contrast requirements — but any text conveying information must meet the threshold.` },
  { question: "What contrast ratio do I need for placeholder text?", answer: `Placeholder text in form inputs must meet the same 4.5:1 ratio as regular text if it conveys information the user needs to complete the field. The common pattern of very light gray placeholder text (#999 on white = about 2.85:1) fails WCAG AA. If using placeholders as the only indication of what a field requires, use dark gray like #767676 on white (exactly 4.54:1, the minimum AA pass). Better practice: use visible labels above inputs and reserve placeholder for example format hints.` },
  { question: "Why does a bright orange pass on white but fail on yellow?", answer: `Contrast depends on the relative luminance difference between two colors. White has very high luminance (1.0), so a dark-enough orange against white can achieve 4.5:1. Yellow also has very high luminance (pure #ffff00 ≈ 0.93), so two high-luminance colors together produce very low contrast — yellow on white is approximately 1.07:1, nearly invisible. Colors that appear vivid and saturated are not necessarily high-contrast — luminance and saturation are separate dimensions.` },
  { question: "What color tools on this site work with the contrast checker?", answer: `The Color Converter translates Figma HEX values to RGB or HSL for easy input. The Color Palette Generator creates full design-system scales — run each step through the contrast checker to identify which values are usable for text vs background. The CSS Gradient Generator builds gradient backgrounds; use the contrast checker on the lightest and darkest stops. All are in the Dev Tools CSS section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Color Contrast Checker — WCAG AA/AAA Accessibility Free',
    description: 'Check color contrast ratios for WCAG 2.1 AA and AAA compliance. Instant pass/fail for normal text, large text, and UI components. Runs entirely in your browser.',
    slug: 'color-contrast',
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
