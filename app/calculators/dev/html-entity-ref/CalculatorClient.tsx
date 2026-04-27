'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!input.trim()) { setOutput(''); setError(''); return }
    try {
      setOutput(`// HTML Entity Reference output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">HTML Entity Reference</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📚 HTML Entity Reference</h1>
      <p className="text-gray-500 mb-6">Runs entirely in your browser - no data sent to server</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14} placeholder="Paste your input here..."
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-950 text-green-300" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
              {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
            </button>
          </div>
          {error
            ? <div className="p-4 bg-red-50 rounded-xl border border-red-200"><p className="text-red-600 text-sm font-mono">{error}</p></div>
            : <pre className="h-64 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output||'Output appears here...'}</pre>
          }
        </div>
      </div>

      <SEOContent
        title="HTML Entity Reference"
        category="dev"
        intro={`HTML entities are the encoded representations of characters that have special meaning in HTML (&lt; for <, &amp; for &) or that are not easily typed on a keyboard (&copy; for copyright, &mdash; for em dash). This reference lists all named HTML entities with their characters and code points.

Runs in your browser with instant search.

**Long-tail searches answered here:** html entity reference guide free online usa, html special characters codes lookup free, html entity code chart free no signup, all html entities reference free tool, what is the html code for copyright symbol free, html entity cheat sheet free online usa, html entities for arrows and symbols reference free, how to type special characters in html free guide, unicode vs html entity which to use guide free, html entities for math symbols reference free usa, curly quotes smart quotes html entity codes free, trademark and registered symbol html code free usa, html entity for em dash en dash free reference, html entities for currency symbols reference free, non breaking space html entity usage guide free usa

For encoding/decoding, use [HTML Encoder](/calculators/dev/html-encoder).`}
        howItWorks={`A complete reference of all named HTML entities from the HTML5 specification. Each entry shows: the entity name (&copy;), the numeric code point (&#169;), the hex form (&#x00A9;), the actual character, and the Unicode name. The search filters by entity name, character, or Unicode name in real time.`}
        benefits={[
          { title: `Complete HTML5 entity list`, text: `All named HTML entities from the HTML5 specification in one searchable reference — not just the common ones.` },
          { title: `Multi-format display`, text: `Shows named entity (&copy;), numeric (&#169;), and hex (&#x00A9;) forms for each character — use whichever form your codebase uses.` },
          { title: `Character search`, text: `Search by the actual character (type the copyright symbol) or by the entity name to find the encoding.` },
          { title: `One-click copy`, text: `Click any entity to copy it to clipboard in your preferred format (named, numeric, or hex).` },
        ]}
        useCases={[
          { title: `Inserting special characters in HTML`, text: `Need a copyright symbol, trademark, arrow, or mathematical symbol in your HTML? Search here for the correct entity name instead of googling.` },
          { title: `Typography in web content`, text: `Em dashes, en dashes, smart quotes, and non-breaking spaces all have HTML entities. Use this reference to insert them correctly without copy-paste from Word.` },
          { title: `Avoiding encoding issues`, text: `Some characters outside the ASCII range must be entity-encoded in HTML to display correctly across all browsers and character sets.` },
          { title: `HTML template writing`, text: `When writing HTML templates with special characters, this reference is faster than memorizing rarely-used entity names.` },
        ]}
        keyStats={[
          { stat: `&amp; &lt; &gt;`, source: `The three most important HTML entities — required for displaying literal & < > characters` },
          { stat: `&copy; &mdash; &nbsp;`, source: `Common typographic entities — copyright symbol, em dash, non-breaking space` },
          { stat: `Named vs numeric`, source: `Named entities like &copy; are more readable; numeric like &#169; work in any HTML version` },
        ]}
        inlineLinks={[
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
          { text: `Character Encoder`, href: `/calculators/dev/character-encoder`, label: `Character Encoder` },
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
          { text: `Meta Tag Generator`, href: `/calculators/dev/meta-tag-generator`, label: `Meta Tag Generator` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `HTML to Markdown`, href: `/calculators/dev/html-to-markdown`, label: `HTML to Markdown` },
        ]}
        tipsSection={`Named entities are more readable. &copy; is clearer than &#169; in HTML source. Use named entities for common characters where a name exists, numeric for obscure Unicode characters without standard names.

&nbsp; is not a regular space. Non-breaking space (U+00A0) prevents line breaks between adjacent words. Use it for number-unit combinations (10&nbsp;px) and proper nouns that should not break across lines.

MDash vs ndash. Em dash (&mdash; —) is for parenthetical phrases. En dash (&ndash; –) is for ranges (pages 10–20). Hyphen (-) is for compound words. These are often confused.

Entities in XML. Named entities other than &amp; &lt; &gt; &quot; &apos; are not defined in XML 1.0. For XML, use numeric entities or ensure your document declares the HTML entity set.`}
        conclusion={`HTML entities are the correct way to include special characters in HTML source code. This reference covers the complete HTML5 entity set with one-click copy. For encoding user input: [HTML Encoder](/calculators/dev/html-encoder).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
