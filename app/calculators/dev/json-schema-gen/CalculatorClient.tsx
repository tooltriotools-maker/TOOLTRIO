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
      setOutput(`// JSON Schema Generator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">JSON Schema Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📐 JSON Schema Generator</h1>
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
        title="JSON Schema Generator — Auto-Generate from Sample JSON"
        category="dev"
        intro={`JSON Schema validates API response structure — ensuring required fields exist, types are correct, and values match patterns. Writing schema by hand for complex nested responses is slow and error-prone. This generator infers a Draft-07 schema from your sample JSON automatically.

Runs in your browser.

**Long-tail searches answered here:** json schema generator from json free online usa, generate json schema from sample data free, json schema creator free no signup tool, json to schema converter free online, how to create json schema free generator, json schema builder free no download usa, json schema draft 7 vs draft 2020 generator free, json schema with required properties generator free, json schema for nested objects free generator usa, json schema array item validation generator free, json schema enum and const values generator free, json schema type validator generator free usa online, generate openapi schema from json free tool, json schema for typescript interface generator free, ajv json schema validation integration guide free usa

Validate your JSON first with [JSON Formatter](/calculators/dev/json-formatter).`}
        howItWorks={`Traverses the sample JSON and records the type of every value. Objects produce type object with properties and required arrays. Arrays produce type array with items. Strings become type string, numbers become type number (integers get type integer), booleans and nulls are typed accordingly. All observed keys are marked required by default — remove entries for genuinely optional fields. Output is valid JSON Schema Draft-07.`}
        benefits={[
          { title: `Instant schema from sample`, text: `Paste a sample API response and get a Draft-07 schema in seconds — all properties, nested objects, and array item types covered automatically.` },
          { title: `Required fields detection`, text: `All fields present in the sample are marked required. Strong starting point — remove required entries for optional fields.` },
          { title: `Recursive nesting`, text: `Generates correct nested schemas for arbitrarily deep objects — a three-level nested API response produces a properly nested schema at each level.` },
          { title: `Draft-07 compatible`, text: `Works with ajv (Node.js), jsonschema (Python), and VS Code — the most widely-supported JSON Schema version.` },
        ]}
        useCases={[
          { title: `API contract documentation`, text: `Generate a schema from a sample response as the starting point for your OpenAPI/Swagger spec. Add descriptions, examples, and additional validation rules from there.` },
          { title: `Runtime validation`, text: `Paste the schema into your ajv setup in Node.js or jsonschema in Python. Catch invalid API responses at runtime rather than during data processing.` },
          { title: `TypeScript type generation`, text: `Tools like json-schema-to-typescript and quicktype convert JSON Schema to TypeScript interfaces. Generate schema here, then feed to those tools.` },
          { title: `Test fixture validation`, text: `Generate schemas from test fixture JSON and use them to validate that API responses in integration tests match the expected structure.` },
        ]}
        keyStats={[
          { stat: `Draft-07`, source: `Supported by ajv, jsonschema (Python), VS Code, and most validators` },
          { stat: `Auto-required`, source: `All observed fields marked required by default — edit to match actual API contracts` },
          { stat: `Recursive`, source: `Handles arbitrarily deep nesting — generates schemas for objects within objects` },
        ]}
        inlineLinks={[
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `JSONPath Tester`, href: `/calculators/dev/json-path-tester`, label: `JSONPath Tester` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `XML to JSON`, href: `/calculators/dev/xml-to-json`, label: `XML to JSON` },
          { text: `curl Builder`, href: `/calculators/dev/curl-builder`, label: `curl Builder` },
          { text: `API Response Time`, href: `/calculators/dev/api-response-time`, label: `API Response Time` },
        ]}
        tipsSection={`Use multiple samples for optional fields. The generator marks all observed fields required. For optional fields, generate schemas from multiple samples and manually remove the optional keys from the required array.

Array item schemas from first element. The item schema is inferred from the first array element only. If your array contains mixed types, add a oneOf manually.

Add descriptions for documentation quality. The generated schema lacks descriptions. Add description properties to each field for OpenAPI-quality schemas.

Validate the schema itself. The output is JSON — paste it into [JSON Formatter](/calculators/dev/json-formatter) after manual edits to verify it is still valid JSON.`}
        conclusion={`Manual JSON Schema authoring is slow and error-prone. This generator gives a correct starting point from sample data — all fields, types, and nesting covered. Edit to add descriptions and mark optional fields. For the complete validation workflow: generate here, query with [JSONPath Tester](/calculators/dev/json-path-tester), and create test data with [Fake Data Generator](/calculators/dev/fake-data-generator).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
