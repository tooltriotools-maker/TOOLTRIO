import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS clip-path Generator — Shape Clipping Builder Free',
  description: 'Build CSS clip-path shapes visually — polygon, circle, ellipse, and inset. Live preview with copy-ready CSS. Create diagonal sections and custom shapes. Runs in your browser.',
  slug: 'css-clip-path',
  keywords: ['css clip path generator online free','clip-path maker browser','css polygon shape builder','clip path visual editor free','css shape generator online'],
})

const faqs = [
  { question: 'What is CSS clip-path used for in web design?', answer: "clip-path masks an element to show only a specific shape — anything outside the shape is invisible. Common use cases: diagonal section breaks (a hero section that cuts diagonally instead of a straight horizontal line), custom image shapes (hexagonal profile photos, diamond-shaped cards), reveal animations (animating clip-path from a small circle to full coverage creates a circular reveal effect), sticker/badge shapes, arrow-shaped elements, and non-rectangular image cropping. Unlike border-radius (which only rounds corners), clip-path can create any polygon or curved shape." },
  { question: 'What are the different clip-path shape functions?', answer: "polygon(x1 y1, x2 y2, ...) defines any polygon with coordinate points — the most flexible. circle(radius at cx cy) clips to a circle. ellipse(rx ry at cx cy) clips to an ellipse. inset(top right bottom left round radius) clips to a rounded rectangle. path('M...' ) accepts SVG path syntax — any SVG shape. Percentages in coordinates are relative to the element's size, making responsive clip paths. 0% 0% is top-left, 100% 0% is top-right, 100% 100% is bottom-right, 0% 100% is bottom-left." },
  { question: 'How do I create a diagonal section with clip-path?', answer: "For a diagonal bottom edge on a hero section: clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%). This cuts from 85% height on the right edge to 100% height on the left edge. Adjust the percentage to control the angle. For a diagonal top edge on the next section: clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%). Stack these sections with negative margin-top to overlap them, creating a seamless diagonal flow. The key: the diagonal section and the section below it must have complementary angles." },
  { question: 'Can I animate clip-path for reveal effects?', answer: "Yes — clip-path is animatable with CSS transitions and animations when both keyframes use the same shape function with the same number of points. Circular reveal: start at clip-path: circle(0% at 50% 50%), end at circle(150% at 50% 50%). Rectangle wipe: polygon(0 0, 0 0, 0 100%, 0 100%) to polygon(0 0, 100% 0, 100% 100%, 0 100%). The polygon point count must match between keyframes — you cannot interpolate between a triangle and a pentagon. For complex shape morphing between different point counts, use the same count and position extra points along an edge." },
  { question: 'How does clip-path affect element layout and interactions?', answer: "clip-path affects visibility but not layout. An element with clip-path still occupies its full rectangular space in the document flow — adjacent elements position themselves relative to the original rectangle, not the visible shape. Similarly, click/touch events still register for the entire original bounding box, not just the visible clipped area. If you need click detection to match the visible shape, handle it in JavaScript by checking whether the click point falls within the clip-path shape mathematically, or use SVG elements with matching shapes." },
  { question: 'What is the difference between clip-path and mask-image?', answer: "clip-path uses geometric shapes (polygon, circle, SVG paths) to define what is visible. mask-image uses a grayscale image or gradient as an alpha mask — white areas are fully visible, black areas are invisible, gray areas are partially transparent. mask-image is more flexible for complex effects like feathered edges, texture-based masking, and image-based reveals, but requires a mask image resource. clip-path is defined entirely in CSS without external assets. For clean geometric shapes and diagonal sections, clip-path is simpler. For soft edges, gradient fades, or texture-based masking, mask-image is the better choice." },
  { question: 'What other CSS tools complement clip-path on this site?', answer: "The CSS Animation Generator can animate clip-path reveal effects. The CSS Gradient Generator creates gradient backgrounds for clipped sections. The Border Radius Generator handles simpler rounded shapes where clip-path is overkill. The Box Shadow Generator adds depth — note that box-shadow does not work on clipped elements (use filter: drop-shadow instead). The Flexbox Generator handles layout inside clipped containers. All are in the Dev Tools CSS section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS clip-path Generator — Shape Clipping Builder Free',
    description: 'Build CSS clip-path shapes visually — polygon, circle, ellipse, and inset. Live preview with copy-ready CSS. Create diagonal sections and custom shapes. Runs in your browser.',
    slug: 'css-clip-path',
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
