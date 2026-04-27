import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Markdown Table Generator — GitHub Table Builder Free',
  description: 'Build Markdown tables visually. Add rows and columns, align cells, copy GitHub-compatible Markdown table syntax. Runs in your browser.',
  slug: 'markdown-table-gen',
  keywords: ['markdown table generator online free','markdown table builder browser','create markdown table free','md table generator tool','markdown table formatter online'],
})

const faqs = [
  { question: "What is the Markdown table syntax and its limitations?", answer: `GFM table syntax: | Column 1 | Column 2 | with separator | --- | --- |. Alignment: --- (left), :---: (center), ---: (right). Limitations: no cell spanning, no nested tables, no multiline cells, no merged headers, and no cell formatting beyond inline Markdown (bold, italic, code, links work). For complex tables, use HTML <table> directly — most Markdown renderers allow HTML passthrough.` },
  { question: "How do I include pipes or special characters inside a table cell?", answer: `Pipe (|) is the column delimiter — escape it: \\| for a literal pipe. Backticks work for inline code: | \`code\` |. Bold and italic work: | **bold** | | *italic* |. Links work: | [text](url) |. Block-level Markdown (headings, lists) cannot appear inside table cells — use HTML <table> with block-level content in cells if needed.` },
  { question: "How do I create a comparison table with visual indicators?", answer: `GFM tables support emoji: ✅ for supported, ❌ for not supported, ⚠️ for partial — common in GitHub README feature matrices. Bold the recommended option: | **Recommended** |. You cannot add background colors to individual cells in pure Markdown — that requires HTML or platform-specific CSS class extensions. For interactive sortable tables, link to a separate spreadsheet or web app.` },
  { question: "How do I generate a Markdown table from CSV data?", answer: `Convert your CSV to JSON using the CSV to JSON tool on this site, then use the table generator to build the Markdown from the data. Or in Python: import csv; rows = list(csv.reader(open('data.csv'))); header = rows[0]; print('| ' + ' | '.join(header) + ' |'); print('| ' + ' | '.join(['---']*len(header)) + ' |'); [print('| ' + ' | '.join(row) + ' |') for row in rows[1:]].` },
  { question: "How do I sort or filter a Markdown table?", answer: `Markdown tables are static — no interactive sorting. For interactive tables: export to HTML with DataTables or Tabulator. For documentation sites: some platforms (Docusaurus with plugins) support interactive table components. For GitHub, if readers need sortable data, link to a Google Sheet or Notion database instead. For development reference tables that rarely change, static Markdown is usually simpler to maintain.` },
  { question: "What is the maximum recommended width for a Markdown table?", answer: `There is no hard maximum, but tables wider than the viewport cause horizontal scrolling — problematic on mobile. For wide tables: consider reducing columns, abbreviating headers, or splitting into two narrower tables. GitHub renders tables with horizontal scroll on overflow. Documentation sites vary — some wrap cells, some overflow. Keep tables under 5-6 columns for comfortable reading on standard screens.` },
  { question: "What other documentation tools are on this site?", answer: `The Markdown Preview renders the table as HTML to verify appearance. The CSV to JSON converter transforms tabular data. The Diff Checker compares two versions of a Markdown document. The Fake Data Generator creates sample data for demonstration tables. The HTML to Markdown converter can convert existing HTML tables to Markdown format. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Markdown Table Generator — GitHub Table Builder Free',
    description: 'Build Markdown tables visually. Add rows and columns, align cells, copy GitHub-compatible Markdown table syntax. Runs in your browser.',
    slug: 'markdown-table-gen',
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
