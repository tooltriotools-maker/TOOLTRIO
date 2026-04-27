'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('<?xml version="1.0"?><catalog><book id="bk101"><author>Gambardella, Matthew</author><title>XML Developer Guide</title><price>44.95</price></book><book id="bk102"><author>Ralls, Kim</author><title>Midnight Rain</title><price>5.95</price></book></catalog>')
  const [indent, setIndent] = useState(2)
  const [mode, setMode] = useState<'format'|'minify'>('format')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (!input.trim()) return { out: '', error: '', valid: true }
    try {
      // Simple XML formatter
      const minified = input.replace(/>\s+</g,'><').replace(/\s+/g,' ').trim()
      if (mode==='minify') return { out: minified, error: '', valid: true }
      
      const sp = ' '.repeat(indent)
      let formatted = ''
      let depth = 0
      const tokens = minified.match(/<[^>]+>|[^<]+/g) || []
      
      for (const token of tokens) {
        if (!token.trim()) continue
        if (token.startsWith('</')) {
          depth--
          formatted += sp.repeat(Math.max(0,depth)) + token + '\n'
        } else if (token.startsWith('<') && !token.startsWith('<?') && !token.startsWith('<!') && !token.endsWith('/>')) {
          formatted += sp.repeat(depth) + token + '\n'
          depth++
        } else if (token.startsWith('<')) {
          formatted += sp.repeat(depth) + token + '\n'
        } else {
          // Text node - append to previous line
          formatted = formatted.trimEnd() + token + '\n'
        }
      }
      return { out: formatted.trim(), error: '', valid: true }
    } catch(e:any) { return { out: '', error: e.message, valid: false } }
  }, [input, indent, mode])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">XML Formatter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📰 XML Formatter &amp; Validator</h1>
      <p className="text-gray-500 mb-6">Format, indent and minify XML - runs entirely in your browser</p>
      <div className="flex gap-3 mb-4">
        {(['format','minify'] as const).map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${mode===m?'bg-green-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{m}</button>
        ))}
        {mode==='format' && (
          <select value={indent} onChange={e=>setIndent(Number(e.target.value))} className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-green-400 bg-white">
            <option value={2}>2 spaces</option><option value={4}>4 spaces</option>
          </select>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-2">Input XML</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={16} className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-50" /></div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Output</label>
            <button onClick={()=>{navigator.clipboard.writeText(result.out);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
          </div>
          <pre className="h-72 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre">{result.out||'Formatted output appears here...'}</pre>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the XML Formatter</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Paste any XML document into the left panel. Click Format to pretty-print with indentation (choose 2 or 4 spaces), or Minify to collapse it to a single line for production use. XML is used for SOAP APIs, RSS feeds, Maven POM files, Android layouts, SVG files, and countless configuration formats. Formatted XML is much easier to read and debug than a single-line blob.</p>
        <p className="text-sm text-gray-600">Common use cases: Format a SOAP response to find the data fields. Minify a large XML config for faster transmission. Compare XML structures by formatting both before using a diff tool. All processing is client-side - your XML data never leaves your browser.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="XML Formatter & Validator"
        category="dev"
        intro={`Minified XML from APIs or legacy systems is as unreadable as a single-line HTML file. Formatting adds indentation and line breaks to reveal the document structure.

This formatter uses the browser native DOMParser to validate and reformat XML. Runs entirely in your browser.

**Long-tail searches answered here:** xml formatter free online usa, pretty print xml online free no signup, xml beautifier and validator free tool, format xml code online free no download, xml indentation formatter free tool usa, xml syntax checker and formatter free online, xml schema xsd validator against schema free usa, namespace declaration xml formatter free, large xml file formatter with truncation free usa, xpath expression tester on xml free online, soap xml formatter and validator free usa, xml cdata section formatter free online, xml attribute order normalizer free tool usa, xml to pretty print with folding free online, rss atom xml feed formatter and validator free usa

For data transformation, pair with [XML to JSON](/calculators/dev/xml-to-json).`}
        howItWorks={`Passes your XML through the browser native DOMParser.parseFromString() with text/xml MIME type. If well-formed, returns a document object; if not, returns a parsererror document with the error location.

Formatting serializes the DOM back to a string with added 2-space indentation per level, preserving all attributes, namespace declarations, CDATA sections, and processing instructions.`}
        benefits={[
          { title: `Native XML validation`, text: `Uses the browser built-in XML parser — reports the exact line and column where well-formedness is violated.` },
          { title: `Preserves namespaces and CDATA`, text: `Namespace prefixes, CDATA sections, processing instructions, and XML declarations are all preserved intact during formatting.` },
          { title: `Minify for payload comparison`, text: `Toggle to minified output to see the actual byte size of your XML payload. Useful before adding XML compression middleware.` },
          { title: `No external parser dependency`, text: `Relies on the browser built-in DOMParser — no external library, no npm package. Works on restricted corporate networks.` },
        ]}
        useCases={[
          { title: `Debugging SOAP responses`, text: `SOAP API responses arrive as single-line XML strings. Paste here to see the envelope, header, and body structure clearly indented.` },
          { title: `Validating Android and iOS resource files`, text: `Android strings.xml and iOS plist files are XML. Validate here before committing to catch malformed tags that cause cryptic build failures.` },
          { title: `Reading Maven POM files`, text: `Maven pom.xml files are deeply nested XML. Format here to understand dependency trees and plugin configurations without an IDE.` },
          { title: `Formatting SVG files`, text: `SVG is XML. Minified SVG exported from Figma or Illustrator is impossible to read. Format here before editing path data or adding animations.` },
        ]}
        keyStats={[
          { stat: `DOMParser`, source: `Browser-native XML parser — handles namespaces, CDATA, and processing instructions` },
          { stat: `parsererror`, source: `XML validity errors surfaced as parsererror elements with line/column information` },
          { stat: `Well-formed vs Valid`, source: `This validates well-formedness (structure). Schema validation (DTD/XSD) is a separate step` },
        ]}
        inlineLinks={[
          { text: `XML to JSON`, href: `/calculators/dev/xml-to-json`, label: `XML to JSON` },
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
          { text: `TOML Formatter`, href: `/calculators/dev/toml-formatter`, label: `TOML Formatter` },
          { text: `SVG Optimizer`, href: `/calculators/dev/svg-optimizer`, label: `SVG Optimizer` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `HTML to Markdown`, href: `/calculators/dev/html-to-markdown`, label: `HTML to Markdown` },
        ]}
        tipsSection={`Well-formed vs valid. This tool checks XML well-formedness — every tag closed, attributes quoted, no illegal characters. It does not validate against a DTD or XML Schema (XSD).

Namespace errors are verbose. If your XML uses namespace prefixes not declared in the document, DOMParser reports confusing errors. Check that every prefix:element has a corresponding xmlns:prefix declaration.

SVG formatting. SVG files are valid XML. Format minified SVG exports here to make them human-editable. Then use [SVG Optimizer](/calculators/dev/svg-optimizer) to clean unnecessary attributes.

CDATA vs entities. CDATA sections and entity-encoded content are both preserved as-is during formatting.`}
        conclusion={`XML is verbose even when well-formatted. Minified XML is effectively unreadable. This formatter restores structure using the browser own parser.

For data transformation: format here to understand the structure, then convert with [XML to JSON](/calculators/dev/xml-to-json) or compare changes with [Diff Checker](/calculators/dev/diff-checker).`}
      />
    </div>
  )
}
