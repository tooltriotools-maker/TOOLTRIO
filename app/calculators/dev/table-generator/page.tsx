import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'HTML Table Generator — Build HTML Tables Visually Free',
  description: 'Generate HTML table code visually. Add rows, columns, headers, and styling. Outputs clean, semantic HTML. Runs entirely in your browser.',
  slug: 'table-generator',
  keywords: ['html table generator online free','markdown table builder','csv to table converter browser','generate html table free','table code generator online'],
})

const faqs = [
  { question: "When should I use an HTML table versus a CSS Grid for layout?", answer: `HTML tables are for tabular data — information that has a meaningful relationship between rows and columns, like a spreadsheet: comparison matrices, pricing tables, data exports, schedules. CSS Grid and Flexbox are for page layout. Using HTML tables for layout is a serious accessibility and semantic error — screen readers announce table role and navigate by row/column, which confuses users when the 'data' is actually visual positioning. The accessibility rule: if the information makes sense as rows and columns of related data, use a table. If you are just positioning content on screen, use CSS layout.` },
  { question: "What HTML attributes make tables accessible?", answer: `Required for accessibility: <caption> as the first child of <table> (provides a heading screen readers announce). <th> with scope='col' or scope='row' (distinguishes headers from data cells). <thead>, <tbody>, and optionally <tfoot> (defines table structure). For complex tables with merged cells: headers attribute linking data cells to their headers by ID. For very complex tables: ARIA roles may be needed. The minimum accessible table: caption, proper th elements with scope, and a logical reading order (tables are read left-to-right, top-to-bottom by screen readers).` },
  { question: "How do I make a table responsive for mobile screens?", answer: `Tables are inherently wide and break on small screens. Solutions: horizontal scroll wrapper — wrap the table in a div with overflow-x: auto; this is the simplest and most universally compatible approach. Card layout transform — at a breakpoint, hide the thead and display each row as a card using CSS data-label attributes. Horizontal-to-vertical flip — rotate 90 degrees conceptually (CSS transforms). Priority columns — hide less important columns on mobile (aria-hidden or display:none with media queries). The overflow-x: auto wrapper is the most accessible — it preserves table semantics while allowing horizontal scroll on mobile.` },
  { question: "What is the difference between border-collapse and border-separate in CSS?", answer: `border-collapse: collapse merges adjacent cell borders into one — the standard table appearance where cells share borders. No double borders. border-collapse: separate (the default) renders each cell with its own borders, potentially producing double borders where cells are adjacent. border-spacing: 2px controls the gap between borders in separate mode. For most data tables: use border-collapse: collapse for a clean grid appearance. For tables with individual cell backgrounds or when you want visible spacing between cells: use separate with border-spacing.` },
  { question: "How do I alternate row colors (zebra striping) in CSS?", answer: `tbody tr:nth-child(odd) { background-color: #f9fafb; } or tbody tr:nth-child(even) { background-color: #f3f4f6; }. This is the standard pattern for improving readability in dense data tables. Add :hover for row highlighting: tbody tr:hover { background-color: #e5e7eb; }. For sticky headers: thead th { position: sticky; top: 0; background: white; z-index: 1; }. For very wide tables: also apply position: sticky to the first column for row context while horizontal scrolling.` },
  { question: "How do I sort a table by clicking column headers?", answer: `Pure HTML tables are static — JavaScript is required for sorting. The minimal approach: attach a click handler to each <th> element, read the column index, sort the table rows by that column's cell content, and re-append the sorted rows to <tbody>. For numbers: use parseFloat() comparison. For dates: use Date comparison. For strings: use localeCompare(). Libraries: DataTables (jQuery-based, full-featured), Tabulator (modern, no jQuery), or AG Grid (enterprise-grade). For React: React Table (TanStack Table) is the most popular headless table library.` },
  { question: "What other HTML and layout tools are on this site?", answer: `The Markdown Table Generator builds simpler Markdown table syntax when full HTML is not needed. The HTML Validator checks generated table HTML for semantic errors. The CSS Grid Generator creates grid layouts as an alternative to tables for non-tabular data. The Flexbox Generator handles single-row or single-column data alignment. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'HTML Table Generator — Build HTML Tables Visually Free',
    description: 'Generate HTML table code visually. Add rows, columns, headers, and styling. Outputs clean, semantic HTML. Runs entirely in your browser.',
    slug: 'table-generator',
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
