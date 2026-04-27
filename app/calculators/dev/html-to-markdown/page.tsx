import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'HTML to Markdown Converter — Free Online',
  description: 'Convert HTML to clean Markdown. Handles headings, lists, links, images, tables, and code blocks. Runs entirely in your browser.',
  slug: 'html-to-markdown',
  keywords: ['html to markdown converter online free','convert html to md browser','html2markdown tool free','paste html get markdown','html to markdown online no install'],
})


const faqs = [
  { question: 'When would I convert HTML to Markdown?', answer: "Common scenarios: migrating content from a CMS (WordPress, Drupal) that stores HTML to a JAMstack platform (Gatsby, Next.js, Contentful) that uses Markdown. Converting email templates or web page content to documentation format. Extracting readable text from HTML emails for archiving. Reformatting API responses that return HTML as Markdown for display in a Markdown renderer. Cleaning up content from rich text editors (TinyMCE, Quill) that produce messy HTML. Preparing content for static site generators that expect Markdown input." },
  { question: 'What HTML elements convert cleanly to Markdown?', answer: "Clean conversions: <h1>-<h6> to # through ######, <p> to plain paragraphs, <strong>/<b> to **bold**, <em>/<i> to *italic*, <a href> to [text](url), <img> to ![alt](src), <ul>/<li> to - lists, <ol>/<li> to 1. numbered lists, <blockquote> to > prefixed lines, <code> to backtick inline code, <pre><code> to fenced code blocks with ```. Elements that do not convert cleanly: <table> (Markdown tables exist but are limited), inline styles (CSS is lost), <div> and <span> structure (layout is lost), and complex nested layouts." },
  { question: 'What happens to CSS styles and formatting when converting HTML to Markdown?', answer: "All CSS styling is lost. Colors, font sizes, custom fonts, margins, padding, borders — none of these have Markdown equivalents. Only semantic structure survives: bold, italic, headings, links, images, lists, code. This is by design — Markdown is a content format, not a presentation format. The rendering application (GitHub, a static site generator, a documentation tool) applies its own styling to the Markdown output. If you need to preserve styling, Markdown is not the right target format — consider HTML-in-JSX, MDX, or a CMS that stores styled HTML." },
  { question: 'How are HTML tables converted to Markdown?', answer: "HTML tables convert to GitHub Flavored Markdown (GFM) table syntax: | Column A | Column B | with pipe separators and a header separator row | --- | --- |. Limitations: Markdown tables do not support cell merging (rowspan/colspan), nested tables, or complex formatting inside cells. A table with merged cells loses that structure — merged cells are duplicated or approximated. For complex data tables, consider keeping the HTML <table> directly in Markdown files (most Markdown processors accept HTML passthrough). GFM tables are only supported in Markdown renderers that implement the GFM spec — basic CommonMark does not include tables." },
  { question: 'What is the difference between Markdown flavors and which does this converter target?', answer: "Markdown has many flavors: CommonMark is the standardized spec. GitHub Flavored Markdown (GFM) adds tables, task lists, strikethrough, and autolinks. MultiMarkdown adds footnotes, citations, and tables. Pandoc Markdown is the most feature-rich. This converter targets GFM because it is the most widely supported flavor — GitHub, GitLab, VS Code preview, many CMSs, and most documentation tools support GFM. For CommonMark-only environments, avoid GFM-specific syntax like tables and ~~strikethrough~~." },
  { question: 'How do I handle HTML with embedded JavaScript or SVG when converting to Markdown?', answer: "<script> tags are stripped entirely — inline JavaScript has no Markdown equivalent and is a security concern in Markdown renderers. SVG can be kept as inline HTML (most Markdown renderers pass through raw HTML) or converted to an image reference if the SVG is replaced with an exported PNG/JPG. HTML5 <video> and <audio> elements are dropped. <iframe> embeds (YouTube, maps) are typically converted to a link with the URL. For complex interactive content that cannot survive HTML-to-Markdown conversion, use MDX (Markdown + JSX) which allows React component embeds." },
  { question: 'What other format conversion tools are on this site?', answer: "The Markdown Preview tool renders Markdown to HTML — the reverse of this conversion. The HTML Validator checks the HTML quality before converting. The HTML Encoder/Decoder handles entity escaping in HTML content. The CSV to JSON tool converts tabular data that might accompany HTML content. The Diff Checker verifies converted Markdown against the expected output. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'HTML to Markdown Converter — Free Online',
    description: 'Convert HTML to clean Markdown. Handles headings, lists, links, images, tables, and code blocks. Runs entirely in your browser.',
    slug: 'html-to-markdown',
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
