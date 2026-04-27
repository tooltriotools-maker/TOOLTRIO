import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Flexbox Generator — Visual CSS Flexbox Layout Builder Free',
  description: 'Build CSS Flexbox layouts visually. Toggle justify-content, align-items, flex-direction, flex-wrap, and gap. Live preview with copy-ready CSS. Runs in your browser.',
  slug: 'flex-generator',
  keywords: ['flexbox generator online free','css flexbox builder browser','flexbox visual tool','css flex layout generator','flexbox code preview free'],
})

const faqs = [
  { question: "When should I use Flexbox versus CSS Grid?", answer: `Flexbox is a one-dimensional layout system — it handles a row or column of items. Use it for navigation bars, button groups, centering a single element, distributing items along one axis, or any layout where items flow in a single direction. CSS Grid is two-dimensional — rows and columns simultaneously. Use it for overall page layout, card grids, dashboard structures, or any layout where you need to control placement in both directions. A common pattern: Grid for the overall page structure, Flexbox for the items within each section.` },
  { question: "What is the difference between justify-content and align-items?", answer: `justify-content controls distribution along the main axis (horizontal in row direction, vertical in column direction). align-items controls alignment along the cross axis (perpendicular to the main axis). In flex-direction: row (the default): justify-content handles horizontal distribution (flex-start, center, flex-end, space-between, space-around) and align-items handles vertical alignment (stretch, center, flex-start, flex-end, baseline). In flex-direction: column the axes swap — justify-content becomes vertical and align-items becomes horizontal.` },
  { question: "What does flex: 1 mean and when should I use it?", answer: `flex: 1 is shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 0%. It tells the element to grow to fill available space proportionally. If three siblings all have flex: 1, they share the container equally. If one has flex: 2, it takes twice the space of the others. flex: 1 is the most common value for responsive layouts where you want items to fill the container and divide space evenly. flex: 0 (or flex: none) prevents an item from growing or shrinking — useful for fixed-width elements like icons.` },
  { question: "How do I center an element both horizontally and vertically with Flexbox?", answer: `The classic centering problem is now two lines: display: flex; justify-content: center; align-items: center; on the parent container. This centers a single child element both horizontally and vertically within the container. For the container to have a defined height for vertical centering: add height: 100vh for full viewport height or height: 100% if nested inside a sized container. This is one of the most used Flexbox patterns in modern web development.` },
  { question: "What is the gap property in Flexbox and is it widely supported?", answer: `The gap property adds space between flex items without affecting the outer edges of the container. gap: 16px adds 16px between each item. row-gap and column-gap set them independently. Flexbox gap support was added to all major browsers by mid-2021 (Chrome 84, Firefox 63, Safari 14.1, Edge 84) — safe for production use. Before gap, developers used margin on flex children with negative margin on the container to counteract edge margins. gap eliminates that workaround.` },
  { question: "What does flex-wrap do and when do I need it?", answer: `By default, flex items do not wrap — they squeeze or overflow if they run out of space. flex-wrap: wrap allows items to flow onto the next line when the container is too narrow. This is essential for responsive card grids: a row of cards that wraps into multiple rows on small screens. Combined with flex: 1 1 200px (grow, shrink, minimum 200px), you get a responsive grid that shows 4 items per row on wide screens and 1 per row on phones with no media queries.` },
  { question: "What other layout tools are on this site?", answer: `The CSS Grid Generator handles two-dimensional layouts — use it for page structure, then Flexbox for the items within each section. The Box Shadow Generator, Border Radius Generator, and CSS Gradient Generator style the components you position with Flexbox. The Responsive Breakpoints tool shows standard screen widths for media queries that adjust Flexbox layouts. The Color Contrast Checker ensures text within Flexbox-positioned elements meets accessibility requirements. All are in the Dev Tools CSS section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Flexbox Generator — Visual CSS Flexbox Layout Builder Free',
    description: 'Build CSS Flexbox layouts visually. Toggle justify-content, align-items, flex-direction, flex-wrap, and gap. Live preview with copy-ready CSS. Runs in your browser.',
    slug: 'flex-generator',
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
