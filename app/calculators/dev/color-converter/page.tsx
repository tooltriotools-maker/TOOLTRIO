import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Color Converter — HEX, RGB, HSL, CMYK Free Online',
  description: 'Convert colors between HEX, RGB, HSL, HSV, and CMYK formats instantly. Live preview. Runs entirely in your browser.',
  slug: 'color-converter',
  keywords: ['color converter online free','hex to rgb hsl browser','rgb to hex free','hsl to rgb converter online','cmyk to rgb converter','css color converter browser','color format converter free'],
})

const faqs = [
  { question: "When should I use HEX vs RGB vs HSL in CSS?", answer: `HEX (#3b82f6) is the most compact and universally supported — use it when copying colors from design tools like Figma or matching existing codebase conventions. RGB (rgb(59, 130, 246)) is readable and explicit for when you need to see individual channel values. HSL (hsl(217, 91%, 60%)) is the most intuitive for humans — hue (0-360° color wheel position), saturation (0-100% vividness), lightness (0-100% brightness). HSL is best when programmatically adjusting colors: darkening = reduce lightness, creating tints = increase lightness. For design systems with light/dark mode variants, HSL is strongly preferred.` },
  { question: "Why does the same color look different on screen vs in print?", answer: `Screens use RGB (additive color model — combining light). Print uses CMYK (subtractive — ink). The gamut (range of reproducible colors) differs: screens can display vivid blues and greens that CMYK inks cannot accurately reproduce. When a design looks bright blue on screen but prints duller, this is the gamut mismatch. CMYK values this converter produces are approximate for reference — professional print work requires color-managed workflows with ICC profiles.` },
  { question: "How do I create a color palette from a single hex value using HSL?", answer: `Convert your base color to HSL. Keep the hue (H) constant and vary saturation (S) and lightness (L). For a typical design system: 95% lightness = lightest tint, 90% = very light, 80% = light, 60% = medium light, original = base, 40% = medium dark, 20% = dark, 10% = darkest. For example, hsl(217, 91%, 60%) would have a light variant at hsl(217, 91%, 90%). The Color Palette Generator on this site automates this and produces a complete 9-step scale.` },
  { question: "What is the alpha channel and how do I add transparency?", answer: `The alpha channel controls opacity (0 = fully transparent, 1 = fully opaque). In CSS: rgba(59, 130, 246, 0.5) for 50% transparent, or 8-digit hex #3b82f680 where the last two hex digits are alpha (80 hex = 128 decimal ≈ 50% opacity). HSL supports hsla(). Modern CSS accepts 8-digit hex natively. For overlay effects: use 0.04-0.08 for very subtle overlays, 0.6-0.8 for semi-transparent modals.` },
  { question: "How do I convert a color from Figma or Photoshop to CSS?", answer: `Figma: click the color value in the inspector to switch formats (HEX/RGB/HSL), then copy. The HEX copies in CSS-ready format (#3b82f6). Photoshop: shows RGB 0-255 values in the Color Picker — paste those into this converter to get HEX or HSL. If the design uses a P3 wide-color space, standard CSS HEX and RGB assume sRGB — the Color Level 4 spec adds color(display-p3 ...) syntax but support is still limited.` },
  { question: "What is the difference between HSV and HSL?", answer: `Both use Hue, but differ in the third dimension. HSL: pure white is L=100% regardless of saturation; a fully saturated pure red is at L=50%. HSV: pure white is S=0, V=100%; fully saturated pure red is S=100%, V=100%. HSV is more natural for color pickers (most digital pickers use HSV internally — moving to the top-right always gives the most vibrant hue). HSL is more useful for CSS because 'make this 20% lighter' maps intuitively to increasing L.` },
  { question: "What color tools work alongside the converter?", answer: `The Color Contrast Checker verifies WCAG accessibility requirements for text/background pairs using your converted colors. The Color Palette Generator creates a full design-system scale from your converted color. The CSS Gradient Generator uses HEX and RGB inputs to build gradient backgrounds. The Box Shadow Generator accepts color inputs for shadow tinting. All are in the Dev Tools CSS section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Color Converter — HEX, RGB, HSL, CMYK Free Online',
    description: 'Convert colors between HEX, RGB, HSL, HSV, and CMYK formats instantly. Live preview. Runs entirely in your browser.',
    slug: 'color-converter',
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
