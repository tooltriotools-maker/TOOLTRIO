import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Z-Index Manager — Visualize CSS Stacking Contexts Free',
  description: 'Understand and debug CSS z-index issues. Visualize stacking contexts, explain why z-index is not working, and build a z-index scale. Runs in your browser.',
  slug: 'z-index-manager',
  keywords: ['z-index manager online free','css z-index stacking tool','manage z-index layers browser','css stacking context visualizer','z-index calculator free'],
})

const faqs = [
  { question: "Why is my z-index not working even with a very high value?", answer: `Z-index only works on positioned elements (position: relative, absolute, fixed, or sticky). An element with position: static ignores z-index entirely — add position: relative to enable it. The other reason z-index fails: stacking contexts. An element cannot stack above the parent element's stacking context boundary. If a parent has opacity less than 1, transform, filter, will-change, or isolation: isolate, it creates a new stacking context. Its children are stacked relative to each other within that context, not globally. A z-index: 9999 child of an opacity: 0.99 parent may still appear behind an element outside that parent with z-index: 1.` },
  { question: "What creates a new CSS stacking context?", answer: `A stacking context is created by: position: fixed or sticky (always). position: relative or absolute with z-index not auto. opacity less than 1 (even 0.99 creates a context). transform (any value including transform: translateZ(0)). filter (any value). will-change (transform, opacity, or most properties). isolation: isolate (explicitly creates a context). mix-blend-mode (other than normal). contain: layout or paint. The CSS properties backdrop-filter, perspective, and clip-path also create stacking contexts. This is why applying transform: translateZ(0) as a performance hack can unexpectedly break z-index layering.` },
  { question: "What is the recommended approach for managing z-index in a design system?", answer: `Define a z-index scale as CSS custom properties: --z-base: 0; --z-raised: 10; --z-dropdown: 100; --z-sticky: 200; --z-overlay: 300; --z-modal: 400; --z-toast: 500; --z-tooltip: 600. Use these named values in components instead of arbitrary numbers (z-index: 9999 is a smell — it means someone lost track of the scale). Document which layer each component belongs to. Tailwind CSS uses z-0, z-10, z-20, z-30, z-40, z-50 as defaults. The key insight: leave large gaps between values to allow insertion without renumbering the entire scale.` },
  { question: "How do I debug which stacking context an element belongs to?", answer: `Browser DevTools: in Chrome, the Elements panel shows computed styles. Look for any of the stacking context triggers in the parent hierarchy: transform, opacity, filter. Firefox has a 3D view (toggle with the cube icon) that visualizes stacking order. Programmatically: use window.getComputedStyle(element) to check all parent elements for context-creating properties. A useful debugging technique: temporarily set outline: 2px solid red on the problematic element and its stacking context parents to visualize their boundaries.` },
  { question: "Why does position: fixed not work as expected inside certain containers?", answer: `position: fixed positions an element relative to the viewport — but this breaks inside any parent that creates a stacking context via transform, filter, or will-change. A fixed sidebar inside a container with transform: translateX(0) (a common off-canvas menu technique) is positioned relative to the transformed container, not the viewport. The fix: move fixed elements outside the transformed container, up to the document root level. This is a frequent source of modal and dropdown positioning bugs in web applications.` },
  { question: "What is the difference between z-index and elevation in design systems?", answer: `Z-index is a CSS implementation detail — an integer controlling stacking order. Elevation is a design concept from Material Design representing how far above the surface a component appears, using shadows to communicate height. In Material Design: elevation 0dp = flat surface (no shadow), elevation 8dp = card hover state, elevation 24dp = dialog. Each elevation level maps to a specific box-shadow value. The CSS z-index is usually correlated with elevation but is a separate concern. A tooltip (high z-index to appear above everything) may have low elevation (minimal shadow) while a raised card has high elevation but lower z-index than the tooltip.` },
  { question: "What other CSS debugging tools are on this site?", answer: `The CSS Specificity Calculator explains why certain CSS rules override others — a related debugging challenge. The Box Shadow Generator builds the elevation shadows used alongside z-index. The Flexbox Generator and Grid Generator create layouts without needing z-index for most positioning. The Color Contrast Checker verifies readability for elements at different z-index layers. The CSS Filter Generator explains how filter creates stacking contexts. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Z-Index Manager — Visualize CSS Stacking Contexts Free',
    description: 'Understand and debug CSS z-index issues. Visualize stacking contexts, explain why z-index is not working, and build a z-index scale. Runs in your browser.',
    slug: 'z-index-manager',
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
