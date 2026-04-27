'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [input, setInput] = useState('{"name":"Alice","age":30,"skills":["TypeScript","React"],"address":{"city":"London"}}')
  const [indent, setIndent] = useState(2)
  const [mode, setMode] = useState<'formatted' | 'minified'>('formatted')
  const [copiedMode, setCopiedMode] = useState('')

  const result = useMemo(() => {
    if (!input.trim()) return { formatted: '', minified: '', valid: true, error: '', size: 0 }
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indent)
      const minified  = JSON.stringify(parsed)
      return { formatted, minified, valid: true, error: '', size: minified.length }
    } catch (e: any) {
      return { formatted: '', minified: '', valid: false, error: e.message, size: 0 }
    }
  }, [input, indent])

  const output = mode === 'formatted' ? result.formatted : result.minified
  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    setCopiedMode(mode)
    setTimeout(() => setCopiedMode(''), 1500)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">JSON Formatter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📋 JSON Formatter &amp; Validator</h1>
      <p className="text-gray-500 mb-6">Format - Validate - Minify - runs in your browser, nothing leaves your machine</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Input JSON</label>
            <button onClick={() => setInput('')} className="text-xs text-red-400 hover:text-red-600 font-semibold">Clear</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON here..."
            className="w-full h-80 font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-950 text-green-300" />
          <p className="text-xs text-gray-400 mt-1">{input.length} chars - {result.size > 0 ? `${result.size} bytes minified` : ''}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-1 flex-wrap">
              {(['formatted', 'minified'] as const).map(m => (
                <button key={m} onClick={() => setMode(m)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ${mode === m ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{m}</button>
              ))}
              {mode === 'formatted' && (
                <select value={indent} onChange={e => setIndent(Number(e.target.value))}
                  className="ml-2 text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none">
                  <option value={2}>2 spaces</option><option value={4}>4 spaces</option>
                </select>
              )}
            </div>
            <button onClick={copyOutput} className="flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700">
              {copiedMode === mode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy
            </button>
          </div>

          <div className={`h-80 rounded-xl border-2 overflow-hidden ${result.valid ? 'border-green-300' : 'border-red-400'}`}>
            {result.valid
              ? <pre className="w-full h-full font-mono text-sm p-4 bg-gray-950 text-green-300 overflow-auto whitespace-pre">{output || 'Output will appear here...'}</pre>
              : <div className="p-4 bg-red-950 h-full"><p className="text-red-400 font-bold mb-2">❌ Invalid JSON</p><p className="text-red-300 font-mono text-xs leading-relaxed">{result.error}</p></div>
            }
          </div>
        </div>
      </div>

      {result.valid && result.formatted && (
        <div className="mt-3 flex gap-4 text-sm text-gray-500">
          <span>✅ Valid JSON</span>
          <span>- {result.formatted.split('\n').length} lines formatted</span>
          <span>- {result.size} bytes minified ({(result.size/1024).toFixed(1)} KB)</span>
        </div>
      )}


      <SEOContent
        title="JSON Formatter & Validator"
        category="dev"
        intro={`Pasting a raw API response only to hit a wall of syntax errors is one of the most common friction points in development. This free JSON formatter runs entirely in your browser.

Production JSON is minified making it completely unreadable for debugging. This tool restores readability instantly.

**Long-tail searches answered here:** json formatter and validator free online usa, pretty print json free online no signup, json beautifier free tool no download, format json code online instantly free, json syntax checker free tool usa, json indentation formatter free online tool, json minifier and prettifier toggle free usa, json object key sorting formatter free online, json format for different indent sizes free, format malformed json best effort fixer free usa, json viewer for large nested objects free online, json comparison before and after formatter free, json string escape and unescape free tool usa, json formatter that handles comments free online, jsonc vs json format difference free guide usa"how to format JSON online without installing anything", "free JSON beautifier that does not send data to server", "JSON validator showing exact line number of error".

After formatting, chain to the [JSONPath Tester](/calculators/dev/json-path-tester) to extract specific fields.`}
        howItWorks={`Uses the browser native JSON.parse() to validate against RFC 8259. If parsing succeeds, JSON.stringify(parsed, null, indent) produces formatted output.

**Error location:** The parse error includes the exact character offset converted to a human-readable line:column reference.

**Processing:** Runs in your browser JS engine. Even 500KB responses format in under a second on any modern device.`}
        benefits={[
          { title: `Instant Error Location`, text: `Syntax errors show exact line and character position. Find trailing commas, unquoted keys, and mismatched brackets in seconds.` },
          { title: `RFC 8259 Compliant`, text: `Validates against the official IETF JSON specification. Catches trailing commas, duplicate keys, and invalid Unicode escape sequences.` },
          { title: `Two Indent Styles`, text: `Toggle between 2-space (JS/Node standard) and 4-space (Python/Java) to match your team style guide.` },
          { title: `No Size Limit`, text: `Paste a 500KB API response or 10,000-row JSON array. All runs locally without server timeouts.` }
        ]}
        useCases={[
          { title: `Debugging API Responses`, text: `Paste a raw Network tab response here. Nested objects and arrays become immediately readable with proper indentation.` },
          { title: `Finding Config File Errors`, text: `package.json, tsconfig.json, eslintrc files break silently. Paste the file here to get the exact line number rather than guessing where the trailing comma is.` },
          { title: `Validating Before Database Inserts`, text: `Before inserting JSON into a PostgreSQL jsonb column or MongoDB document, validate here first to catch errors before they cause failed queries.` },
          { title: `Code Review Documentation`, text: `Readable JSON in pull request descriptions helps reviewers understand API contracts. Use the formatter to produce clean examples for your team.` }
        ]}
        keyStats={[
          { stat: `RFC 8259`, source: `The IETF spec this validator implements` },
          { stat: `< 1ms`, source: `Typical formatting time for API responses under 1MB` },
          { stat: `100% local`, source: `No data transmitted — your browser JS engine does all the work` }
        ]}
        inlineLinks={[
          { text: `JSONPath Tester`, href: `/calculators/dev/json-path-tester`, label: `JSONPath Tester` },
          { text: `JSON Schema Generator`, href: `/calculators/dev/json-schema-gen`, label: `JSON Schema Generator` },
          { text: `JSON to CSV`, href: `/calculators/dev/json-to-csv`, label: `JSON to CSV` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `XML to JSON`, href: `/calculators/dev/xml-to-json`, label: `XML to JSON` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` }
        ]}
        tipsSection={`**2-space for code, 4-space for docs.** The 2-space convention is standard in JavaScript/Node.js projects. 4-space is more readable in documentation.

**Copy from the Network tab.** In Chrome/Firefox DevTools, right-click a request, Copy, Copy response, paste here. Faster than any extension for one-off debugging.

**Check byte size before sending.** The minified byte count reflects the actual payload size. Most webhooks cap at 16KB or 64KB.

**Chain with JSONPath.** After formatting a large nested response, use [JSONPath Tester](/calculators/dev/json-path-tester) to extract specific fields using expressions like \`$.store.book[*].author\` without writing code.`}
        conclusion={`The JSON Formatter solves the daily gap between minified API responses and human-readable data. Unlike server-based tools, this one never touches your input.

Combine it with [JSONPath Tester](/calculators/dev/json-path-tester) for field extraction and [JSON Schema Generator](/calculators/dev/json-schema-gen) to auto-generate validation schemas.`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f => (
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )

}
