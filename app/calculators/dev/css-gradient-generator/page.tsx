import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS Gradient Generator — Linear, Radial & Conic Free',
  description: 'Build CSS gradients visually with live preview. Linear, radial, and conic gradients with multiple color stops. Copy ready-to-use CSS. Runs entirely in your browser.',
  slug: 'css-gradient-generator',
  keywords: ['css gradient generator online free','linear gradient builder browser','radial gradient css maker','gradient css code generator','background gradient tool free','css gradient preview online'],
})

const faqs = [
  { question: "What is the difference between linear, radial, and conic gradients?", answer: `A linear gradient transitions colors along a straight line at a given angle (0deg = bottom to top, 90deg = left to right, 135deg = diagonal). A radial gradient radiates outward from a center point in an elliptical or circular pattern. A conic gradient sweeps colors around a center point like a color wheel or pie chart. Linear gradients are most common for backgrounds and overlays. Radial gradients create depth and spotlight effects. Conic gradients are useful for pie chart backgrounds, color wheel selectors, and unique UI effects.` },
  { question: "How do I create a gradient with a hard edge instead of a smooth transition?", answer: `Place two color stops at the same position: background: linear-gradient(to right, blue 50%, red 50%) creates a sharp split at 50%. Combine hard stops with smooth gradients: linear-gradient(to right, blue, blue 30%, red 30%, red) creates solid blue then solid red sections. This technique creates striped backgrounds, progress bar segments, and split-screen effects.` },
  { question: "Why does my gradient look different between Chrome and Safari?", answer: `Gradient rendering is generally consistent across modern browsers. Differences arise in edge cases: very long gradients can show color banding due to limited color precision. Conic gradients have slightly different center point defaults in older Safari. The at keyword in radial-gradient (radial-gradient(circle at 20% 80%, ...)) is sometimes required for proper positioning. This tool generates standard CSS without vendor prefixes (-webkit-linear-gradient) since they are no longer needed for Chrome, Firefox, Safari 6+, or Edge.` },
  { question: "How do I layer multiple gradients on the same element?", answer: `CSS allows multiple backgrounds separated by commas: background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), linear-gradient(135deg, #667eea, #764ba2). The first gradient in the list renders on top. A common pattern: layering a semi-transparent dark overlay gradient over an image to improve text legibility: background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('photo.jpg').` },
  { question: "What is repeating-linear-gradient?", answer: `repeating-linear-gradient tiles the gradient pattern instead of stretching it. With sharp stops, this creates stripes: repeating-linear-gradient(45deg, #fff 0px, #fff 10px, #eee 10px, #eee 20px) creates diagonal stripes 10px wide. The color stop positions define the size of one repeat cycle. Diagonal stripe backgrounds, hazard tape patterns, and progress bar striping all use repeating gradients. The browser handles the tiling automatically.` },
  { question: "How do I make a gradient text effect in CSS?", answer: `Three CSS properties: background: linear-gradient(...) on the element, -webkit-background-clip: text (clips the background to the text shape), and -webkit-text-fill-color: transparent (makes the text fill transparent so the background shows through). The -webkit- prefix is still required for background-clip: text in some browsers. Generate the gradient CSS here, then add the clip and text-fill properties manually.` },
  { question: "What CSS tools complement the Gradient Generator?", answer: `The Color Converter translates Figma hex values to HSL for more intuitive color stop adjustments. The Color Contrast Checker verifies that text over your gradient background meets WCAG requirements — test against both the lightest and darkest parts of the gradient. The Box Shadow Generator adds depth to elements with gradient backgrounds. The CSS Animation Generator can animate gradient positions for flowing background effects. All are in the Dev Tools CSS section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS Gradient Generator — Linear, Radial & Conic Free',
    description: 'Build CSS gradients visually with live preview. Linear, radial, and conic gradients with multiple color stops. Copy ready-to-use CSS. Runs entirely in your browser.',
    slug: 'css-gradient-generator',
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
