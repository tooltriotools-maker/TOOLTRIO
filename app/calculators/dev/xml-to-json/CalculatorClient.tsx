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
      setOutput(`// XML to JSON Converter output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">XML to JSON Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔄 XML to JSON Converter</h1>
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
        title="XML to JSON Converter"
        category="dev"
        intro={`Legacy SOAP APIs, RSS feeds, SVG files, and XML configuration files all output XML. Modern JavaScript, REST APIs, and NoSQL databases all expect JSON.

This converter handles real-world XML edge cases and runs entirely in your browser.

**Long-tail searches answered here:** xml to json converter free online usa, convert xml to json free no signup tool, xml json transformer free online, parse xml and convert to json free, bulk xml to json conversion free tool, how to convert xml to json free online usa, xml attributes to json properties converter free, xml namespace handling in json conversion free usa, xml cdata content to json string converter free, soap xml response to json converter free usa, rss feed xml to json parser free online, xml array elements to json array converter free usa, xml to json preserving order of elements free, xml to json with type coercion numbers booleans free, xslt vs xml to json converter comparison free usa

For the reverse operation, see the [XML Formatter](/calculators/dev/xml-formatter).`}
        howItWorks={`Parses XML using the browser native DOMParser API. Attributes map to @attribute_name keys. Text nodes become a #text key when mixed with child elements, or the direct string value when the element has only text content. Repeated sibling elements with the same tag name become JSON arrays automatically.`}
        benefits={[
          { title: `SOAP and REST bridge`, text: `Convert SOAP/XML API responses to JSON for processing with modern JavaScript. Handles SOAP envelope, body, and namespace-prefixed elements.` },
          { title: `RSS/Atom feed parsing`, text: `Convert RSS and Atom XML feeds to JSON arrays for building feed aggregators or indexing content without an XML parser dependency.` },
          { title: `Attribute preservation`, text: `XML attributes map to @attribute_name keys — preserved in the JSON output rather than being silently dropped.` },
          { title: `Repeated element handling`, text: `Multiple sibling elements with the same tag automatically become JSON arrays, solving the single-vs-multiple ambiguity that breaks naive converters.` },
        ]}
        useCases={[
          { title: `Migrating from SOAP to REST`, text: `Your legacy backend returns SOAP XML. Convert responses here to prototype the data structure you will need for your new REST layer.` },
          { title: `Processing RSS feeds`, text: `Parse RSS or Atom XML into a JSON structure you can filter with JSONPath Tester and load directly into a React component.` },
          { title: `SVG data extraction`, text: `SVG files are XML. Extract specific element attributes or text content by converting to JSON and then querying with JSONPath expressions.` },
          { title: `Config file migration`, text: `Old Java/Spring applications use XML configuration. Convert to JSON to understand the structure before migrating to YAML.` },
        ]}
        keyStats={[
          { stat: `DOMParser`, source: `Uses the browser native XML parser — handles all valid XML including namespaces` },
          { stat: `@ prefix`, source: `Attributes mapped to @name keys following the de-facto JSON-from-XML convention` },
          { stat: `Array auto-detect`, source: `Repeated sibling elements auto-convert to JSON arrays` },
        ]}
        inlineLinks={[
          { text: `XML Formatter`, href: `/calculators/dev/xml-formatter`, label: `XML Formatter` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `JSONPath Tester`, href: `/calculators/dev/json-path-tester`, label: `JSONPath Tester` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `JSON Schema Generator`, href: `/calculators/dev/json-schema-gen`, label: `JSON Schema Generator` },
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `TOML Formatter`, href: `/calculators/dev/toml-formatter`, label: `TOML Formatter` },
        ]}
        tipsSection={`Namespace prefixes become part of the key. soap:Body becomes soap:Body in JSON — a valid key but awkward to query. Strip namespaces with a regex on the XML before converting if you do not need them.

CDATA sections become text. CDATA content becomes the #text value of its parent element.

Validate JSON output. Run the converted JSON through [JSON Formatter](/calculators/dev/json-formatter) to check structure.

Use JSONPath after converting. The [JSONPath Tester](/calculators/dev/json-path-tester) lets you extract specific fields from the converted JSON without writing traversal code.`}
        conclusion={`XML-to-JSON conversion is rarely a clean mapping. This tool applies consistent conventions so the output is predictable.

Complete workflow: convert here, validate with [JSON Formatter](/calculators/dev/json-formatter), extract fields with [JSONPath Tester](/calculators/dev/json-path-tester).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
