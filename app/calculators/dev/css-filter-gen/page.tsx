import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS Filter Generator — Blur, Brightness, Contrast & More Free',
  description: 'Build CSS filter effects visually — blur, brightness, contrast, grayscale, hue-rotate, saturate, sepia, and drop-shadow. Live preview with copy-ready CSS.',
  slug: 'css-filter-gen',
  keywords: ['css filter generator online free','css filter effects preview','blur brightness contrast css tool','css filter code builder free','image css filter generator'],
})

const faqs = [
  { question: 'What CSS filter functions are available?', answer: "The CSS filter property accepts: blur(px) — Gaussian blur on the element. brightness(%) — 0% is black, 100% is normal, 200% is very bright. contrast(%) — 0% is gray, 100% is normal, 200% is high contrast. grayscale(%) — 0% is color, 100% is fully grayscale. hue-rotate(deg) — rotates all colors through the color wheel. invert(%) — 100% inverts all colors. opacity(%) — like the opacity property but compositable. saturate(%) — 0% is grayscale, 100% is normal, 200% is hyper-saturated. sepia(%) — applies a sepia tone. drop-shadow(x y blur color) — shadow following the actual shape (unlike box-shadow). Multiple filters chain: filter: grayscale(50%) brightness(120%)." },
  { question: 'What is the difference between filter: drop-shadow() and box-shadow?', answer: "box-shadow creates a shadow behind the element\'s rectangular bounding box. filter: drop-shadow() creates a shadow that follows the actual rendered shape, including transparent areas. For a PNG product image with a transparent background, drop-shadow traces the product outline. box-shadow creates a rectangle shadow behind the whole transparent-background image. This makes drop-shadow essential for irregular shapes, SVGs, and PNG cutouts. Performance note: box-shadow is GPU-composited and very cheap. filter: drop-shadow() requires a paint step and is more expensive, especially on large elements or many elements." },
  { question: 'How do I use CSS filters to create hover effects on images?', answer: "Common patterns: grayscale-to-color on hover (default: filter: grayscale(100%), :hover: filter: grayscale(0%)), brightness dim for overlay text (filter: brightness(50%) when showing text overlay), blur-to-sharp (filter: blur(4px) default, blur(0) on hover — creates focus pull effect). Combine with transition for smooth interpolation: transition: filter 0.3s ease. Applying filters to entire image grids (grayscale portfolio with color on hover) creates a cohesive editorial look used widely in photography and agency sites." },
  { question: 'What is backdrop-filter and how is it different from filter?', answer: "filter applies to the element itself. backdrop-filter applies to everything behind the element — creating frosted glass effects. backdrop-filter: blur(10px) makes the content behind a semi-transparent element appear blurred, like glass. This is the technique behind macOS/iOS blur effects and modern glassmorphism UI. Browser support: Chrome 76+, Firefox 103+, Safari 9+ (with -webkit- prefix). Requirements: the element must be transparent or semi-transparent (background with alpha channel) for the backdrop to show through. backdrop-filter is GPU-accelerated and performs well on modern hardware." },
  { question: 'Can CSS filters be animated?', answer: "Yes — filter is animatable with CSS transitions and @keyframes. Smooth transitions between filter states: transition: filter 0.4s ease. Animated effects: pulsing brightness (filter: brightness(100%) to brightness(130%) and back), color shift via hue-rotate (continuous hue-rotate animation creates a rainbow color cycling effect), and blur-to-focus reveal. For performance, animate filter only on elements that are already on their own compositor layer (position: fixed, transform: translateZ(0)), or accept that filter animation may trigger paint — test on target devices." },
  { question: 'How do I create a duotone image effect with CSS?', answer: "A CSS-only duotone requires two layers. Method 1 — filter chain: apply sepia(100%) then hue-rotate(XXdeg) to shift the sepia toward your target color, then saturate(500%) to intensify. Method 2 — mix-blend-mode: place a colored element over the image with mix-blend-mode: multiply. For a true two-color duotone (shadows in one color, highlights in another), combine a multiply layer in the shadow color with a screen layer in the highlight color. The CSS Gradient Generator on this site can create the gradient overlay for this technique." },
  { question: 'What other CSS visual tools are on this site?', answer: "The CSS Gradient Generator creates background gradients that combine with filter effects. The Color Converter translates filter target colors between formats. The CSS Animation Generator animates filter properties. The Box Shadow Generator adds shadows (for elements where box-shadow is preferable to drop-shadow filter). The Color Contrast Checker verifies that filtered text remains readable. All are in the Dev Tools CSS section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS Filter Generator — Blur, Brightness, Contrast & More Free',
    description: 'Build CSS filter effects visually — blur, brightness, contrast, grayscale, hue-rotate, saturate, sepia, and drop-shadow. Live preview with copy-ready CSS.',
    slug: 'css-filter-gen',
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
