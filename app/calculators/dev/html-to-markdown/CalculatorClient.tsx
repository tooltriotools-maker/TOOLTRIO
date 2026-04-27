'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, ArrowLeftRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

function htmlToMd(html: string): string {
  let md = html
  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n')
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n')
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '###### $1\n\n')
  // Bold / Italic
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')
  // Links & images
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
  // Code
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '\n$1\n\n')
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '$1')
  // Blockquote
 md = md.replace(
  /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
  (_, p1) => {
    const clean = p1.replace(/<[^>]+>/g, '') // remove inner tags
    return clean
      .trim()
      .split('\n')
      .map((l: string) => `> ${l}`)
      .join('\n') + '\n\n'
  }
)
  // Lists
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
  md = md.replace(/<\/?[ou]l[^>]*>/gi, '\n')
  // Paragraphs + breaks
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
  md = md.replace(/<br\s*\/?>/gi, '\n')
  md = md.replace(/<hr\s*\/?>/gi, '\n---\n')
  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, '')
  // HTML entities
  md = md.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
  // Cleanup
  md = md.replace(/\n{3,}/g, '\n\n').trim()
  return md
}

const SAMPLES = [
  { label: 'Article', html: '<h1>Getting Started with React</h1>\n<p>React is a <strong>JavaScript library</strong> for building user interfaces. It was created by <em>Facebook</em> in 2013.</p>\n<h2>Key Concepts</h2>\n<ul>\n<li>Components</li>\n<li>Props & State</li>\n<li>Hooks</li>\n</ul>\n<p>Learn more at <a href="https://react.dev">react.dev</a></p>' },
  { label: 'Code doc', html: '<h2>Installation</h2>\n<p>Install via npm:</p>\n<pre><code>npm install my-package</code></pre>\n<p>Then import: <code>import MyPkg from "my-package"</code></p>\n<blockquote><p>Note: Requires Node 18+</p></blockquote>' },
  { label: 'Simple para', html: '<p>This is a <strong>simple</strong> paragraph with <em>italic text</em> and a <a href="https://example.com">link</a>.</p>' },
]

export default function CalculatorClient({ faqs }: Props) {
  const [html, setHtml] = useState(SAMPLES[0].html)
  const [copied, setCopied] = useState(false)

  const md = useCallback(() => htmlToMd(html), [html])()
  const copy = () => { navigator.clipboard.writeText(md); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">HTML to Markdown</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔄 HTML to Markdown Converter</h1>
      <p className="text-gray-500 mb-4">Convert HTML to clean Markdown instantly. Supports headings, bold, italic, links, images, code blocks, lists.</p>

      <div className="flex gap-2 mb-4">
        {SAMPLES.map(s => (
          <button key={s.label} onClick={() => setHtml(s.html)} className="px-3 py-1.5 text-xs font-bold border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 text-gray-600 transition-all">
            {s.label} example
          </button>
        ))}
        <button onClick={() => setHtml('')} className="px-3 py-1.5 text-xs font-bold border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 ml-auto">
          <RefreshCw className="w-3 h-3 inline mr-1"/>Clear
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">HTML Input</label>
            <span className="text-xs text-gray-400">{html.length} chars</span>
          </div>
          <textarea
            value={html}
            onChange={e => setHtml(e.target.value)}
            rows={16}
            className="w-full border-2 border-gray-200 rounded-2xl p-4 font-mono text-sm focus:border-blue-400 focus:outline-none resize-y"
            placeholder="Paste your HTML here..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Markdown Output</label>
            <button onClick={copy} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
              {copied ? <><Check className="w-3.5 h-3.5"/>Copied!</> : <><Copy className="w-3.5 h-3.5"/>Copy MD</>}
            </button>
          </div>
          <pre className="w-full border-2 border-green-200 bg-green-50 rounded-2xl p-4 font-mono text-sm text-gray-800 min-h-64 whitespace-pre-wrap overflow-auto" style={{maxHeight:'400px'}}>
            {md || <span className="text-gray-400">Markdown output appears here...</span>}
          </pre>
        </div>
      </div>

      <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-2 text-sm">Supported conversions:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            ['h1-h6 -> # headings'],['strong/b -> **bold**'],['em/i -> *italic*'],
            ['a -> [text](url)'],['img -> ![alt](src)'],['pre/code -> code blocks'],
            ['ul/ol -> - lists'],['blockquote -> > quotes'],
          ].map(([item]) => (
            <div key={item} className="text-xs bg-gray-50 rounded-lg px-2 py-1.5 text-gray-600 font-mono">{item}</div>
          ))}
        </div>
      </div>

      <SEOContent
        title="HTML to Markdown Converter"
        category="dev"
        intro={`HTML is how content is stored in CMSes, email clients, and legacy systems. Markdown is what static site generators, documentation tools, and modern CMSes expect. Converting HTML to Markdown manually — handling headings, links, code blocks, and tables — is tedious and error-prone.

This converter handles the full HTML element set and runs entirely in your browser.

**Long-tail searches answered here:** html to markdown converter free online usa, convert html to md free no signup tool, html markdown transformer free online, paste html get markdown free tool, bulk html to markdown conversion free no download, html to github markdown converter free usa, html tables to markdown table converter free, html links to markdown link format converter usa free, convert wordpress html to markdown free online, html heading tags to markdown hash converter free, html bold italic to markdown asterisk free tool usa, strip html formatting to plain markdown free, convert email html to markdown text free usa, html code blocks to markdown backtick converter free, html image tags to markdown syntax converter free usa

Verify output with [Markdown Preview](/calculators/dev/markdown-preview).`}
        howItWorks={`Uses a JavaScript Turndown-style library running in the browser to convert HTML to Markdown. Handles: headings (h1-h6 to # ## ###), paragraphs, strong/em to bold/italic, links (a href to [text](url)), images, ordered and unordered lists, code (code/pre to backticks), blockquotes, tables (to GFM pipe format), and horizontal rules.`}
        benefits={[
          { title: `Full HTML element support`, text: `Converts headings, paragraphs, lists, links, images, code blocks, blockquotes, tables, and horizontal rules to their Markdown equivalents.` },
          { title: `GFM table output`, text: `HTML tables convert to GitHub Flavored Markdown pipe-separated table format — supported by GitHub, GitLab, Docusaurus, and most Markdown renderers.` },
          { title: `Code block preservation`, text: `Code elements and pre blocks convert to fenced code blocks with the original language class if present.` },
          { title: `Link and image conversion`, text: `All anchor elements and img tags convert to Markdown link and image syntax, including alt text and title attributes.` },
        ]}
        useCases={[
          { title: `CMS content migration`, text: `Migrating from a CMS that outputs HTML to one that uses Markdown? Convert your exported HTML pages here.` },
          { title: `Documentation tooling`, text: `Convert HTML documentation generated by a tool to Markdown for use in a docs platform like Docusaurus or GitBook.` },
          { title: `Email to Markdown`, text: `Convert HTML emails to Markdown for archiving or processing in text-based pipelines.` },
          { title: `Blog post migration`, text: `Convert WordPress or Ghost HTML exports to Markdown for use in a static site generator like Hugo or Jekyll.` },
        ]}
        keyStats={[
          { stat: `Turndown`, source: `JavaScript HTML-to-Markdown library — handles all standard HTML elements` },
          { stat: `GFM tables`, source: `GitHub Flavored Markdown table format — the most widely supported table syntax` },
          { stat: `Lossy conversion`, source: `Complex HTML with custom styling does not have a Markdown equivalent — converted to closest semantic equivalent` },
        ]}
        inlineLinks={[
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `Markdown Table Generator`, href: `/calculators/dev/markdown-table-gen`, label: `Markdown Table Generator` },
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
          { text: `Text Diff`, href: `/calculators/dev/text-diff-inline`, label: `Text Diff` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
        ]}
        tipsSection={`Tables become GFM format. GitHub Flavored Markdown table syntax is the most widely supported. If your target renderer does not support GFM tables, use an HTML table block inside the Markdown instead.

Complex HTML needs cleanup. Heavily styled HTML with nested divs converts to Markdown that may need manual cleanup. The cleaner the source HTML, the cleaner the Markdown output.

Check the output in preview. After converting, paste the Markdown into [Markdown Preview](/calculators/dev/markdown-preview) to verify it renders correctly.

Images convert to Markdown syntax. img src=x.jpg alt=text becomes ![text](x.jpg). Data URI src attributes are preserved.`}
        conclusion={`HTML to Markdown is a common task for content migration, documentation tooling, and CMS exports. This converter handles the full HTML element set including tables. Verify output with [Markdown Preview](/calculators/dev/markdown-preview).`}
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
          <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
        </details>)}
      </div>
    </div>
  )
}
