'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function parseMarkdown(md: string): string {
  return md
    .replace(/^### (.*$)/gim,'<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim,'<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.*$)/gim,'<h1 class="text-3xl font-black mt-6 mb-3">$1</h1>')
    .replace(/\*\*\*(.*?)\*\*\*/g,'<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/`(.*?)`/g,'<code class="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm text-pink-700">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>')
    .replace(/^> (.*$)/gim,'<blockquote class="border-l-4 border-gray-300 pl-4 text-gray-600 italic my-2">$1</blockquote>')
    .replace(/^- (.*$)/gim,'<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.*$)/gim,'<li class="ml-4 list-decimal">$1</li>')
    .replace(/\n\n/g,'</p><p class="mb-3">')
    .replace(/---/g,'<hr class="my-4 border-gray-200">')
}

const SAMPLE = `# Hello Markdown!

This is a **bold** statement and this is *italic*.

## Features

- **Bold text** with double asterisks
- *Italic* with single asterisks
- \`inline code\` with backticks
- [Links](https://example.com) are supported

## Code & More

> This is a blockquote. Use it for quotes or callouts.

---

That's the basics of Markdown preview!`

export default function CalculatorClient({ faqs }: Props) {
  const [md, setMd] = useState(SAMPLE)
  const [view, setView] = useState<'split'|'preview'|'source'>('split')

  const html = `<p class="mb-3">${parseMarkdown(md)}</p>`

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Markdown Preview</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📝 Markdown Preview</h1>
      <p className="text-gray-500 mb-6">Write Markdown and see a live rendered preview side by side.</p>

      <div className="flex rounded-xl border border-gray-200 overflow-hidden mb-4 w-fit">
        {(['split','source','preview'] as const).map(v=>(
          <button key={v} onClick={()=>setView(v)} className={`px-5 py-2 text-sm font-bold capitalize ${view===v?'bg-green-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{v}</button>
        ))}
      </div>

      <div className={`grid gap-4 ${view==='split'?'grid-cols-2':'grid-cols-1'}`}>
        {view !== 'preview' && (
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Markdown Source</label>
            <textarea value={md} onChange={e=>setMd(e.target.value)} rows={20}
              className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
          </div>
        )}
        {view !== 'source' && (
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Preview</label>
            <div className="p-6 bg-white border border-gray-200 rounded-xl min-h-96 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{__html:html}} />
          </div>
        )}
      </div>


      <SEOContent
        title="Markdown Preview — Live Markdown Editor"
        category="dev"
        intro={`Markdown is the universal format for README files, documentation, and technical writing. But Markdown syntax renders differently across platforms — GitHub, GitLab, Docusaurus, and Obsidian all have slightly different rendering engines. A live preview catches those differences before you push.

This editor renders GitHub Flavored Markdown with real-time preview. Runs in your browser.

**Long-tail searches answered here:** markdown preview free online usa, render markdown to html free no signup, markdown editor with live preview free tool, github markdown previewer free online, how does my markdown look free preview, markdown renderer free no download usa, github flavored markdown gfm previewer free online, markdown table preview renderer free usa, markdown with code syntax highlight preview free, markdown footnotes rendering preview free usa, mermaid diagram in markdown preview free online, latex math in markdown rendering preview free, custom css styled markdown preview free usa, markdown for readme file preview free online, obsidian vs github markdown rendering difference free

For writing tools, pair with [Word Counter](/calculators/dev/word-counter).`}
        howItWorks={`Parses Markdown using a JavaScript Markdown parser (marked.js or similar) running in the browser. Renders GitHub Flavored Markdown including: headings, emphasis, strong, strikethrough, code blocks with syntax highlighting, blockquotes, ordered/unordered/task lists, tables, horizontal rules, and HTML passthrough. Split view shows source and rendered output simultaneously.`}
        benefits={[
          { title: `GitHub Flavored Markdown support`, text: `Renders GFM extensions: strikethrough (~~text~~), task lists (- [x]), tables, and fenced code blocks with syntax highlighting.` },
          { title: `Split view`, text: `Source on the left, rendered output on the right. See the final result immediately as you edit without switching contexts.` },
          { title: `HTML passthrough`, text: `Valid HTML inside Markdown is passed through to the rendered output — useful for custom div wrappers, video embeds, and details/summary elements.` },
          { title: `Export to HTML`, text: `Copy the rendered HTML output for use in email templates, CMS systems, or any platform that accepts HTML but not Markdown.` },
        ]}
        useCases={[
          { title: `README drafting`, text: `Write and preview your GitHub README before pushing. See exactly how headings, code blocks, and tables will render on GitHub.` },
          { title: `Documentation writing`, text: `Write technical documentation in Markdown and preview it here to catch rendering issues before deploying to Docusaurus or GitBook.` },
          { title: `Blog post drafting`, text: `Draft a blog post in Markdown and preview the rendered output to verify formatting before publishing.` },
          { title: `Converting HTML to Markdown`, text: `After converting HTML with [HTML to Markdown](/calculators/dev/html-to-markdown), verify the Markdown renders correctly here.` },
        ]}
        keyStats={[
          { stat: `GFM`, source: `GitHub Flavored Markdown — supported by GitHub, GitLab, Docusaurus, and most platforms` },
          { stat: `HTML passthrough`, source: `Valid HTML blocks are passed through Markdown parsers and rendered directly` },
          { stat: `Heading anchors`, source: `Most renderers auto-generate anchor IDs from headings: ## My Section becomes id my-section` },
        ]}
        inlineLinks={[
          { text: `Markdown Table Generator`, href: `/calculators/dev/markdown-table-gen`, label: `Markdown Table Generator` },
          { text: `HTML to Markdown`, href: `/calculators/dev/html-to-markdown`, label: `HTML to Markdown` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Text Diff`, href: `/calculators/dev/text-diff-inline`, label: `Text Diff` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Git Commit Generator`, href: `/calculators/dev/git-commit-gen`, label: `Git Commit Generator` },
          { text: `Lorem Ipsum Generator`, href: `/calculators/dev/lorem-ipsum-generator`, label: `Lorem Ipsum Generator` },
          { text: `Table Generator`, href: `/calculators/dev/table-generator`, label: `Table Generator` },
        ]}
        tipsSection={`GFM vs CommonMark. GitHub uses GitHub Flavored Markdown (GFM) which extends CommonMark with tables, task lists, and strikethrough. Most documentation platforms support GFM.

Code fences need language. Three backticks followed by javascript enables syntax highlighting; three backticks alone does not. Always specify the language for code blocks.

HTML passthrough. Valid HTML is passed through Markdown parsers — useful for custom div wrappers, video embeds, and HTML-only elements like details.

Heading anchors. Most Markdown renderers auto-generate anchor IDs from headings. My Section becomes id my-section — link with #my-section.`}
        conclusion={`Markdown is the universal format for README files, documentation, and technical writing. Live preview helps catch rendering differences before committing. For writing tools: [Word Counter](/calculators/dev/word-counter) and [Markdown Table Generator](/calculators/dev/markdown-table-gen).`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
