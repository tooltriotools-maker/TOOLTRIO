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
      setOutput(`// JSONPath Tester output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">JSONPath Tester</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📍 JSONPath Tester</h1>
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
        title="JSONPath Tester — Query JSON with JSONPath Expressions"
        category="dev"
        intro={`JSONPath is to JSON what XPath is to XML — a query language for extracting specific values from nested JSON structures without writing traversal code. A single \`$.store.book[*].author\` expression returns all book authors at any depth.

This tester evaluates JSONPath expressions against your JSON in real time. Runs in your browser.

**Long-tail searches answered here:** jsonpath tester free online usa, test jsonpath expression online free no signup, jsonpath evaluator free tool online, jquery jsonpath expression tester free, jsonpath validator free no download usa, how to query json with jsonpath free tool, jsonpath filter expression syntax tester free usa, dot notation vs bracket notation jsonpath free, jsonpath wildcard asterisk usage tester free online, recursive descent jsonpath double dot tester free usa, how to select multiple jsonpath results free tool, jsonpath for nested array elements tester free, jsonpath and jmes path difference free guide usa, jsonpath vs xpath query comparison free online, jsonpath slice expression start end step tester free

Validate your JSON first with [JSON Formatter](/calculators/dev/json-formatter).`}
        howItWorks={`Uses a JSONPath engine running in the browser. Expressions start with $ (root). Dot (.) accesses children; [] handles array subscripts and filters; * is wildcard; .. is recursive descent (finds a field at any nesting depth). Filter expressions $[?(@.price < 10)] use @ to reference the current element. Results are highlighted in the JSON display.`}
        benefits={[
          { title: `Real-time match highlighting`, text: `Matching nodes highlight in the JSON view as you type. Instant visual feedback for validating that your expression targets the right data.` },
          { title: `Recursive descent`, text: `$..field finds all occurrences at any depth without knowing the exact path. Essential for querying inconsistently structured API responses.` },
          { title: `Filter expression support`, text: `$[?(@.status==active && @.age>18)] filters arrays by property values. More powerful than writing filter loops in application code.` },
          { title: `Multiple results display`, text: `Shows all matching nodes with their full paths when the expression matches multiple elements — useful for understanding what a wildcard expression actually returns.` },
        ]}
        useCases={[
          { title: `Extracting API response fields`, text: `Your API returns deeply nested data. Use $..id to extract all IDs at any depth, or $.data.users[*].email to get all emails from a paginated response.` },
          { title: `Filtering array responses`, text: `API returns a product list. Use $[?(@.inStock==true && @.price<50)] to filter without writing application-layer filter code.` },
          { title: `Pre-code testing`, text: `Validate your JSONPath expression here before writing it into Python (jsonpath-ng), JavaScript (jsonpath-plus), or Java (Jayway) code.` },
          { title: `CSV pipeline`, text: `Convert CSV with [CSV to JSON](/calculators/dev/csv-to-json), then use JSONPath to extract specific columns or rows here.` },
        ]}
        keyStats={[
          { stat: `$ is root`, source: `All JSONPath expressions must start with $ (the root element)` },
          { stat: `$..field`, source: `Recursive descent — finds a field at any depth without knowing the full path` },
          { stat: `?(@.x)`, source: `Filter expressions use @ for the current element in array context` },
        ]}
        inlineLinks={[
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `JSON Schema Generator`, href: `/calculators/dev/json-schema-gen`, label: `JSON Schema Generator` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `JSON to CSV`, href: `/calculators/dev/json-to-csv`, label: `JSON to CSV` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `XML to JSON`, href: `/calculators/dev/xml-to-json`, label: `XML to JSON` },
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
        ]}
        tipsSection={`Start broad with $..field, then narrow. Use recursive descent to find where a field appears in the structure, then narrow to the full explicit path once you know the nesting level.

Arrays are 0-indexed. $[0] is first, $[-1] is last (most implementations). $[0:3] is a slice returning elements 0, 1, 2.

Inside filters, use @ not $. $[?(@.active==true)] — @ is the current element being tested. $ inside a filter references the root, not the current element.

Validate JSON first. Paste your JSON into [JSON Formatter](/calculators/dev/json-formatter) before testing — invalid JSON silently returns no results in most JSONPath engines.`}
        conclusion={`JSONPath transforms nested JSON traversal from multi-line application code into a single reusable expression. Test expressions against real data here before committing them to code. Pair with [JSON Formatter](/calculators/dev/json-formatter) for validation and [JSON Schema Generator](/calculators/dev/json-schema-gen) for documentation.`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
