import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Markdown Preview — Live GFM Renderer Free Online',
  description: 'Preview Markdown as rendered HTML in real time. Supports GFM tables, code highlighting, task lists, and strikethrough. Runs in your browser.',
  slug: 'markdown-preview',
  keywords: ['markdown preview online free','markdown editor browser','markdown to html preview','live markdown renderer','markdown viewer online free'],
})

const faqs = [
  { question: "What Markdown syntax is supported?", answer: `This preview supports GitHub Flavored Markdown (GFM): headings, **bold**, *italic*, ~~strikethrough~~, links, images, inline code, fenced code blocks with syntax highlighting, blockquotes, ordered/unordered lists, task lists (- [x]), horizontal rules, and GFM tables with alignment. HTML passthrough works for elements without Markdown equivalents.` },
  { question: "What is the difference between GFM and CommonMark?", answer: `CommonMark is the standardized, unambiguous Markdown spec. GFM is GitHub's extension adding: tables, task list items (- [ ]), strikethrough (~~text~~), and autolinks (URLs become links automatically). Most documentation sites support GFM. Pure CommonMark does not support tables. For maximum compatibility: write CommonMark-compliant Markdown and add GFM features only when your platform explicitly supports them.` },
  { question: "How do I add syntax highlighting to code blocks?", answer: `Specify the language after the opening fence: \`\`\`javascript, \`\`\`python, \`\`\`sql, \`\`\`bash, \`\`\`yaml. The language identifier triggers syntax highlighting in renderers that support it. The actual highlighting is applied by the rendering environment — same source renders with different themes depending on the renderer. For inline code, backticks have no language specification: \`console.log()\` renders as inline code without highlighting.` },
  { question: "How do I preview Markdown that includes custom components?", answer: `Standard Markdown preview renders CommonMark + GFM. For MDX (Markdown + JSX React components), you need an MDX-aware renderer. For platform-specific extensions like Docusaurus admonitions (:::note) or GitHub wiki macros, preview in the target platform directly — those extensions are not standard Markdown and will not render correctly in a generic previewer.` },
  { question: "What is the correct way to create a table in Markdown?", answer: `| Column 1 | Column 2 | with a separator row | --- | --- |. Column alignment: --- (left, default), :---: (center), ---: (right). The separator row is required. Cell content cannot span rows or columns in GFM — use HTML table for complex layouts. The Markdown Table Generator on this site builds table syntax visually.` },
  { question: "How do I include images that are stored locally during preview?", answer: `Local image paths (./image.png, ../assets/photo.jpg) do not load in browser-based previewers because the browser cannot access your local filesystem. For preview: use absolute URLs (https://...) or paste the image as a data URI using the Image to Base64 converter on this site. For GitHub README images: use relative paths committed alongside the README — GitHub resolves them relative to the repository root.` },
  { question: "What other documentation tools are on this site?", answer: `The HTML to Markdown Converter transforms existing HTML content. The Markdown Table Generator builds table syntax visually. The Word Counter tracks document length. The Diff Checker compares two Markdown versions. The Lorem Ipsum Generator fills content areas with placeholder text. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Markdown Preview — Live GFM Renderer Free Online',
    description: 'Preview Markdown as rendered HTML in real time. Supports GFM tables, code highlighting, task lists, and strikethrough. Runs in your browser.',
    slug: 'markdown-preview',
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
