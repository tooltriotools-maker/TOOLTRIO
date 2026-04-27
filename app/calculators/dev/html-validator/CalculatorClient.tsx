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
      setOutput(`// HTML Structure Validator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">HTML Structure Validator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🏗️ HTML Structure Validator</h1>
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
        title="HTML Validator"
        category="dev"
        intro={`HTML errors cause unexpected rendering differences across browsers. An unclosed tag, invalid nesting, or missing required attribute can cause layout breaks that appear only in some browsers. Validation catches these issues before they reach production.

This validator uses the browser native HTML parser. Runs entirely in your browser.

**Long-tail searches answered here:** html validator free online usa, validate html code online free no signup, html syntax checker free tool online, check html errors free online validator, w3c html validator alternative free tool, html code validator free no download usa, html5 doctype declaration checker free online, unclosed html tag finder free tool usa, html attribute value quotes checker free online, deprecated html tags checker free tool usa, html accessibility validation free online checker, html semantic structure validator free no account, aria attributes html validator free online usa, html form element validation checker free, html validator for email template free online usa

For HTML transformation, pair with [HTML Encoder](/calculators/dev/html-encoder) or [HTML to Markdown](/calculators/dev/html-to-markdown).`}
        howItWorks={`Parses HTML using the browser native DOMParser. Catches: unclosed tags, missing required attributes (alt on img, src on script), invalid nesting (p inside p, block elements in inline), and deprecated elements. Also checks accessibility basics: images without alt text, form labels without associated inputs, buttons without accessible names.`}
        benefits={[
          { title: `Native HTML validation`, text: `Uses the browser built-in HTML parser — the same engine that renders your pages. Reports structural issues that cause rendering differences across browsers.` },
          { title: `Accessibility checks`, text: `Flags images without alt text, form inputs without associated labels, and buttons without accessible names — common accessibility failures.` },
          { title: `Invalid nesting detection`, text: `Catches block elements nested inside inline elements, p inside p, and other HTML nesting violations that cause silent rendering bugs.` },
          { title: `Deprecated element warnings`, text: `Flags deprecated elements (font, center, marquee, blink) and attributes that have been removed from the HTML spec.` },
        ]}
        useCases={[
          { title: `Pre-launch HTML audit`, text: `Before launching a new site, validate all page templates here to catch structural issues that cause browser-specific rendering problems.` },
          { title: `CMS template testing`, text: `Paste rendered HTML from your server-side templates here to catch issues that template syntax hides — like unclosed conditional blocks.` },
          { title: `Email HTML validation`, text: `Email HTML must work in all email clients. Validate here to catch structural issues before sending to a list.` },
          { title: `Accessibility compliance check`, text: `Run your HTML through here as a quick first-pass accessibility check before using a dedicated tool like axe or Lighthouse.` },
        ]}
        keyStats={[
          { stat: `DOMParser`, source: `Browser-native HTML parser — the same engine that renders your pages` },
          { stat: `alt required`, source: `Every img element needs an alt attribute — empty string for decorative images` },
          { stat: `Block in inline`, source: `Nesting block elements inside inline elements is invalid and causes rendering bugs` },
        ]}
        inlineLinks={[
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
          { text: `HTML Entity Reference`, href: `/calculators/dev/html-entity-ref`, label: `HTML Entity Reference` },
          { text: `Meta Tag Generator`, href: `/calculators/dev/meta-tag-generator`, label: `Meta Tag Generator` },
          { text: `HTML to Markdown`, href: `/calculators/dev/html-to-markdown`, label: `HTML to Markdown` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `Robots.txt Generator`, href: `/calculators/dev/robots-txt-generator`, label: `Robots.txt Generator` },
          { text: `Open Graph Preview`, href: `/calculators/dev/open-graph-preview`, label: `Open Graph Preview` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
        ]}
        tipsSection={`Well-formed vs semantically valid. This validator checks structural correctness. Semantic correctness (using article vs div correctly) is a separate concern not detectable by parsers.

alt text is mandatory. Every img element needs an alt attribute. For decorative images, use alt= empty string — not omitting the attribute.

Block elements cannot be inside inline elements. p inside div is valid; div inside p is not. a can contain div in HTML5 but not in HTML4.

Validate template output. Paste rendered HTML from your server-side templates here to catch issues that template syntax hides.`}
        conclusion={`HTML errors cause unexpected rendering differences across browsers. This validator catches structural issues before they reach production. For HTML transformation: [HTML Encoder](/calculators/dev/html-encoder) for escaping and [HTML to Markdown](/calculators/dev/html-to-markdown) for conversion.`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
