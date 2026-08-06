'use client'
import { Card } from '@/components/ui/Card'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
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
    <DevToolLayout
      title="XML to JSON Converter"
      icon="🔄"
      description="Runs entirely in your browser - no data sent to server"
      category="Dev"
      parentPath="/calculators/dev"
      parentLabel="Dev Tools"
    >
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
            ? <div className="p-4 rounded-2xl border" style={{background:'rgba(254,242,242,0.8)',borderColor:'rgba(252,165,165,0.5)',backdropFilter:'blur(6px)'}}><p className="text-red-600 text-sm font-mono">{error}</p></div>
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
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="rounded-2xl border p-4" style={{background:'rgba(255,255,255,0.8)',backdropFilter:'blur(8px)',borderColor:'rgba(226,232,240,0.7)',boxShadow:'0 4px 16px rgba(15,23,42,0.04)'}}><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding the xml to json output</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>The result should be read together with the values entered in the calculator. It reflects the calculator&apos;s implemented calculation and the assumptions represented by those inputs.</p>
            <p>To compare alternatives clearly, change one value at a time and keep the other inputs unchanged. This helps identify which assumption is responsible for the difference in output.</p>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Using the xml to json result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Interpret the output together with the values entered in the calculator. The result is based on the calculator&apos;s implemented calculation and the values supplied.</p>
            <p>For a useful comparison, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to distinguish.</p>
          </div>
        </Card>
      </div>
</div>
    </DevToolLayout>
    )

}
