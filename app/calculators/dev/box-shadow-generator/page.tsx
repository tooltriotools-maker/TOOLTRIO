import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS Box Shadow Generator — Visual Shadow Builder Free',
  description: 'Build CSS box shadows visually. Control offset, blur, spread, color, and inset. Copy ready CSS. Runs in your browser.',
  slug: 'box-shadow-generator',
  keywords: ['css box shadow generator online free','drop shadow css builder browser','box shadow preview tool','css shadow maker free','inset shadow generator online'],
})

const faqs = [
  { question: 'What are the five values in a CSS box-shadow declaration?', answer: "box-shadow: [offset-x] [offset-y] [blur-radius] [spread-radius] [color]. offset-x: horizontal offset (positive = right, negative = left). offset-y: vertical offset (positive = down, negative = up). blur-radius: how soft the shadow edge is (0 = hard edge, higher = softer). spread-radius: how much the shadow expands or contracts beyond the element (positive = larger, negative = smaller). color: any CSS color value. Example: box-shadow: 2px 4px 8px -2px rgba(0,0,0,0.2) creates a soft, slightly inset realistic shadow." },
  { question: 'What is the inset keyword and when should I use it?', answer: "Adding inset makes the shadow appear inside the element rather than outside: box-shadow: inset 0 2px 4px rgba(0,0,0,0.1). Inset shadows are used for pressed button states (makes the button look physically indented), input field focus states (inner glow effect), and sunken panel effects. Combining an outer shadow for default state and an inset shadow for the :active state creates a realistic button press animation without any transform needed. Inset shadows do not contribute to the element\'s size — they clip to the element\'s border box." },
  { question: 'How do I create layered box shadows for elevation effects like Material Design?', answer: "Multiple box-shadows are comma-separated. Material Design uses layered shadows to represent elevation: elevation 2dp = box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px rgba(0,0,0,0.12). The technique: combine a diffuse ambient shadow (large blur, low opacity) with a sharp directional shadow (small blur, moderate opacity). This mimics real-world lighting where shadows have both a hard shadow from the direct light source and a soft shadow from ambient light." },
  { question: 'Why use rgba() for shadow colors instead of hex?', answer: "Shadows look most realistic when they are semi-transparent, allowing the background color to show through. rgba(0,0,0,0.15) is a 15% opaque black — it blends with whatever color is behind it. A solid black shadow (#000000) looks harsh and flat on colored backgrounds. A shadow defined as rgba(0,0,0,0.2) looks correct on both white and colored backgrounds. For colored shadows (like a purple card casting a purple shadow), use the card\'s own color at low opacity: rgba(124,58,237,0.25)." },
  { question: 'How do I remove a box shadow that was inherited or set by a library?', answer: "Set box-shadow: none to explicitly remove all shadows. This overrides inherited shadows and resets library defaults. If you are inside a CSS framework that uses box-shadow on inputs or cards, use the component\'s modifier class if available, or add box-shadow: none with sufficient specificity. The CSS Specificity Calculator on this site helps determine what specificity level you need to override a library rule." },
  { question: 'What is the difference between box-shadow and drop-shadow filter?', answer: "box-shadow creates a shadow behind the element\'s rectangular box (ignoring transparent areas). filter: drop-shadow() creates a shadow that follows the actual rendered shape, including transparent areas in PNGs and SVGs. For a PNG with a transparent background containing a non-rectangular image (like a product photo cutout), drop-shadow follows the actual object outline. box-shadow would create a rectangle shadow behind the whole image element. Performance-wise, box-shadow is GPU-accelerated; drop-shadow filter can be more expensive for complex images." },
  { question: 'What other CSS visual tools pair with the Box Shadow Generator?', answer: "The CSS Gradient Generator adds depth to elements alongside shadows — gradients and shadows are the two primary depth cues in flat UI design. The Border Radius Generator rounds the corners that the shadow follows. The Color Converter translates Figma shadow color values to rgba() format. The CSS Specificity Calculator helps when you need to override a library\'s shadow with your own. All are in the Dev Tools CSS section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS Box Shadow Generator — Visual Shadow Builder Free',
    description: 'Build CSS box shadows visually. Control offset, blur, spread, color, and inset. Copy ready CSS. Runs in your browser.',
    slug: 'box-shadow-generator',
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
