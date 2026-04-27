import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS Border Radius Generator — Rounded Corners Builder Free',
  description: 'Build CSS border-radius values visually with individual corner control. Supports elliptical corners. Runs in your browser.',
  slug: 'border-radius-gen',
  keywords: ['border radius generator online free','css border radius preview','rounded corners css builder','border radius css code free','css corner radius tool'],
})

const faqs = [
  { question: 'What does the slash syntax mean in border-radius — like 10px / 20px?', answer: "The slash syntax creates elliptical corners. border-radius: 50px / 25px means horizontal radius = 50px, vertical radius = 25px for all corners — producing oval-shaped corners rather than circular ones. Without the slash, the single value applies equally to both axes (circular corners). The full 8-value syntax controls each corner axis independently: border-radius: top-left-h top-right-h bottom-right-h bottom-left-h / top-left-v top-right-v bottom-right-v bottom-left-v. This level of control lets you create leaf shapes, speech bubbles, and organic forms." },
  { question: 'How do I make a perfect circle with border-radius?', answer: "Set border-radius: 50% on an element with equal width and height. The 50% refers to 50% of the element's dimensions on each axis, which on a square produces a circle. If width ≠ height, 50% produces an ellipse. For a circle that adapts to any square size: width: 100px; height: 100px; border-radius: 50%. For a fixed-size circle: border-radius: 50px (explicit px matching half the width/height). The percentage approach is more maintainable when dimensions change." },
  { question: 'What are the four individual border-radius properties?', answer: "Instead of the shorthand, you can set corners individually: border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius. These accept one or two values: one value for circular, two space-separated values for elliptical (horizontal then vertical). Useful when overriding a single corner in a component theme or when a design requires only some corners to be rounded. The shorthand border-radius with 1-4 values uses the same TRBL (top, right, bottom, left) pattern as margin and padding." },
  { question: 'How do I create a shape like a speech bubble with border-radius?', answer: "A rounded speech bubble combines border-radius with a CSS triangle pseudo-element. Set border-radius: 12px on the bubble container. Add ::after or ::before positioned absolutely at the speech tail location with border tricks (transparent borders on 3 sides, colored border on 1 side create a triangle). The triangle points in the direction of the transparent borders. Combine border-radius for the main bubble shape with the pseudo-element triangle for the tail. For complex organic shapes, CSS clip-path (the clip-path tool on this site) provides more control than border-radius alone." },
  { question: 'What is the difference between border-radius in pixels and percentage?', answer: "Pixel values (border-radius: 8px) give a fixed radius regardless of element size. A 8px radius looks proportional on a large button but dominant on a small icon. Percentage values (border-radius: 10%) scale with the element — 10% of a 200px wide element = 20px radius. For cards and containers that resize: percentage makes the radius proportionally consistent. For design system tokens with specific intended corner radii: pixels are more predictable and match design tool outputs exactly. The 50% value for circles is the most common percentage use." },
  { question: 'Can border-radius affect the click/touch area of an element?', answer: "No — border-radius is purely visual. The clickable area (hit test) of an element is always its rectangular bounding box, regardless of how rounded the corners appear. If a circle button (border-radius: 50%) is clicked in a corner, outside the visual circle, it still registers a click. For games or interactive UI where pixel-accurate click areas matter, use CSS pointer-events with SVG clip paths, or handle click position math in JavaScript. For typical UI buttons and cards, the rounded corners are small enough that the rectangular hit area is not perceptible." },
  { question: 'What other CSS visual tools are on this site?', answer: "The Box Shadow Generator adds depth and elevation to elements with rounded corners — common in card UI design. The CSS Gradient Generator creates gradient backgrounds for rounded containers. The CSS clip-path Generator creates non-rectangular shapes beyond what border-radius supports. The Border Radius tool pairs with the Flexbox Generator for aligning card collections. The Color Contrast Checker verifies text readability inside rounded containers. All are in the Dev Tools CSS section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS Border Radius Generator — Rounded Corners Builder Free',
    description: 'Build CSS border-radius values visually with individual corner control. Supports elliptical corners. Runs in your browser.',
    slug: 'border-radius-gen',
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
