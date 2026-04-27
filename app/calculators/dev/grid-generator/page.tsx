import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS Grid Generator — Visual Grid Layout Builder Free Online',
  description: 'Build CSS Grid layouts visually. Configure columns, rows, gaps, and areas. Live preview with copy-ready CSS. Runs entirely in your browser.',
  slug: 'grid-generator',
  keywords: ['css grid generator online free','grid layout builder browser','css grid template generator','visual grid tool free','grid-template-columns generator'],
})

const faqs = [
  { question: 'When should I use CSS Grid versus Flexbox?', answer: "CSS Grid is for two-dimensional layouts — controlling both rows and columns simultaneously. Flexbox is for one-dimensional layouts — a single row or single column. Use Grid when: laying out the overall page structure (header, sidebar, main, footer), creating card grids, dashboard widgets, or any layout where items need to align on both axes. Use Flexbox when: distributing items in a navigation bar, centering elements, creating a single row of buttons, or handling flexible content that wraps to new lines. The most common pattern: Grid for the page macro layout, Flexbox for component micro layout." },
  { question: 'What is the fr unit in CSS Grid?', answer: "fr (fractional unit) represents a fraction of the available free space in the grid container. display: grid; grid-template-columns: 1fr 2fr 1fr creates three columns — the middle takes twice as much space as each side column. They divide the container after any fixed sizes are subtracted. grid-template-columns: 200px 1fr allocates 200px to the first column, and all remaining space to the second. Multiple fr values divide proportionally: 1fr 1fr 1fr = three equal columns. fr is the most important CSS Grid unit to understand — it enables responsive column layouts without media queries." },
  { question: 'What does grid-template-areas allow me to do?', answer: "grid-template-areas lets you name grid regions and place elements by name instead of by line numbers. Define the layout: grid-template-areas: 'header header' 'sidebar main' 'footer footer'. Then assign elements: header { grid-area: header; } main { grid-area: main; } sidebar { grid-area: sidebar; }. The layout can be redefined at breakpoints by reassigning the template-areas string. This is the most readable way to define complex layouts — the ASCII art area definition visually represents the actual page layout." },
  { question: 'How does auto-fill vs auto-fit differ in repeat()?', answer: "Both create as many columns as fit, but they differ when there is extra space. repeat(auto-fill, minmax(200px, 1fr)): creates as many 200px columns as fit, and if there is leftover space, it creates empty tracks. repeat(auto-fit, minmax(200px, 1fr)): creates only as many columns as there are items, and empty tracks collapse — the existing items grow to fill all space. For a card grid where you always want cards to fill the row: auto-fit. For a grid where you want consistent column counts regardless of item count: auto-fill." },
  { question: 'How do I make a grid item span multiple columns or rows?', answer: "grid-column: span 2 makes an item span 2 columns. grid-column: 1 / 3 places the item from column line 1 to line 3 (spanning 2 columns). grid-row: span 2 spans 2 rows. grid-column: 1 / -1 spans from the first to the last line (full width). Negative line numbers count from the end. For a featured card in a grid that should span the full width: .featured { grid-column: 1 / -1; } — this works regardless of how many columns the grid has." },
  { question: 'What is the difference between justify and align in Grid?', answer: "Justify controls the inline axis (horizontal by default). Align controls the block axis (vertical by default). justify-content distributes grid columns within the container. align-content distributes grid rows within the container. justify-items positions items within their cell horizontally. align-items positions items within their cell vertically. justify-self and align-self override per individual grid item. This is identical to Flexbox semantics — the same axis naming system. The mnemonic: justify = horizontal (like left-justified text), align = vertical." },
  { question: 'What other layout tools are on this site?', answer: "The Flexbox Generator handles one-dimensional layouts that complement Grid structure. The Responsive Breakpoints tool provides standard viewport widths for grid breakpoint planning. The CSS Unit Converter handles the px-to-rem conversions common in gap and padding values. The Aspect Ratio Calculator helps maintain proportional card dimensions in grid layouts. The Box Shadow Generator styles individual grid cells and cards. All are in the Dev Tools CSS section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS Grid Generator — Visual Grid Layout Builder Free Online',
    description: 'Build CSS Grid layouts visually. Configure columns, rows, gaps, and areas. Live preview with copy-ready CSS. Runs entirely in your browser.',
    slug: 'grid-generator',
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
