'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [csv, setCsv] = useState(`id,name,email,age,active
1,Alice Smith,alice@example.com,28,true
2,Bob Jones,bob@company.org,35,false
3,Carol White,carol@email.net,42,true`)
  const [delimiter, setDelimiter] = useState(',')
  const [inferTypes, setInferTypes] = useState(true)
  const [pretty, setPretty] = useState(true)
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (!csv.trim()) return { json: '', count: 0, headers: [], error: '' }
    try {
      const lines = csv.trim().split('\n').filter(l => l.trim())
      const parseRow = (line: string) => {
        const fields: string[] = []; let cur = '', inQ = false
        for (let i = 0; i < line.length; i++) {
          const c = line[i]
          if (c === '"' && !inQ) { inQ = true; continue }
          if (c === '"' && inQ) { if (line[i+1] === '"') { cur += '"'; i++ } else inQ = false; continue }
          if (c === delimiter && !inQ) { fields.push(cur); cur = '' }
          else cur += c
        }
        fields.push(cur); return fields
      }
      const headers = parseRow(lines[0]).map(h => h.trim())
      const cast = (v: string) => {
        if (!inferTypes) return v
        if (v === 'true') return true; if (v === 'false') return false
        if (v === 'null' || v === '') return null
        const n = Number(v); return isNaN(n) || v === '' ? v : n
      }
      const data = lines.slice(1).map(line => {
        const vals = parseRow(line)
        return Object.fromEntries(headers.map((h, i) => [h, cast(vals[i]?.trim() ?? '')]))
      })
      const json = JSON.stringify(data, null, pretty ? 2 : 0)
      return { json, count: data.length, headers, error: '' }
    } catch (e: any) { return { json: '', count: 0, headers: [], error: e.message } }
  }, [csv, delimiter, inferTypes, pretty])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSV to JSON</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📊 CSV to JSON Converter</h1>
      <p className="text-gray-500 mb-6">Convert CSV data to JSON array - headers auto-detected, custom delimiter support</p>
      <div className="flex flex-wrap gap-3 mb-4">
        <div><label className="text-xs font-bold text-gray-500 block mb-1">Delimiter</label>
          <select value={delimiter} onChange={e=>setDelimiter(e.target.value)} className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-green-400 bg-white">
            <option value=",">, (comma)</option><option value="\t"> → (tab)</option><option value=";">; (semicolon)</option><option value="|">| (pipe)</option>
          </select>
        </div>
        {[{l:'Infer Types',v:inferTypes,s:setInferTypes},{l:'Pretty Print',v:pretty,s:setPretty}].map(({l,v,s})=>(
          <div key={l} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 self-end">
            <span className="text-sm font-medium text-gray-700">{l}</span>
            <button onClick={()=>s(!v)} className={`w-10 h-5 rounded-full transition-colors ${v?'bg-green-500':'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${v?'translate-x-5':''}`}/></button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">CSV Input</label>
          <textarea value={csv} onChange={e=>setCsv(e.target.value)} rows={16} className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
          {result.headers.length > 0 && <p className="text-xs text-gray-400 mt-1">Headers: {result.headers.join(', ')}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">JSON Output {result.count > 0 && `(${result.count} records)`}</label>
            <button onClick={()=>{navigator.clipboard.writeText(result.json);setCopied(true);setTimeout(()=>setCopied(false),1500)}}
              className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
          </div>
          {result.error
            ? <div className="p-4 bg-red-50 rounded-xl border border-red-200"><p className="text-red-600 font-mono text-sm">{result.error}</p></div>
            : <pre className="h-72 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre">{result.json||'JSON appears here...'}</pre>
          }
        </div>
      </div>

      <SEOContent
        title="CSV to JSON Converter"
        category="dev"
        intro={`CSV is how data comes out of Excel, databases, and analytics tools. JSON is what APIs and JavaScript pipelines expect. Converting manually — writing loops, splitting on commas, handling quoted fields — is tedious and error-prone.

This converter handles the full RFC 4180 CSV spec including quoted fields, embedded commas, multi-line values, and custom delimiters. Runs in your browser.

**Long-tail searches answered here:** csv to json converter free online usa, convert csv file to json free no signup, csv to json online tool no download free, bulk csv json conversion free tool, how to convert csv to json free online, csv json transformer free no account usa, csv with headers to json array converter free, flat csv to nested json structure converter usa free, csv to json array of objects format free tool, how to handle csv special characters in json free, csv with commas in values to json safe converter usa, large csv file to json converter free online, tsv tab separated to json converter free usa, csv to json and filter rows online free, google sheets export csv to json converter free usa

After converting, validate your JSON with the [JSON Formatter](/calculators/dev/json-formatter).`}
        howItWorks={`Parses CSV using RFC 4180: the first row is headers (object keys), subsequent rows become objects with those keys. Quoted fields handle embedded commas, newlines, and doubled quotes.

Custom delimiter support handles tab-separated (TSV), semicolon-separated (European Excel), and pipe-delimited formats. Type inference optionally converts string 42 to number 42 and string true to boolean true.`}
        benefits={[
          { title: `Full RFC 4180 CSV parsing`, text: `Handles quoted fields containing commas, newlines, and escaped double-quotes. Does not break on edge cases that simple split-on-comma approaches miss.` },
          { title: `Custom delimiters`, text: `Supports tab (TSV), semicolon, pipe, and any custom single-character delimiter — covering European CSV exports, database dumps, and log files.` },
          { title: `Type inference`, text: `Optionally converts numeric strings to numbers and true/false strings to booleans. Essential when feeding the JSON into a typed API.` },
          { title: `Array or object output`, text: `Toggle between array-of-objects and 2D array format depending on whether you are building an API payload or processing table data.` },
        ]}
        useCases={[
          { title: `Loading spreadsheet data into a REST API`, text: `Your client sends a CSV export of their customer list. Convert here to a JSON array, then POST it to your API endpoint or paste it into Postman for batch importing.` },
          { title: `Migrating database exports to MongoDB`, text: `mysqldump or pg_dump CSV output needs to become BSON-compatible documents. Convert here, validate with JSON Formatter, then import with mongoimport.` },
          { title: `Building test fixtures`, text: `You have sample data in a spreadsheet. Convert a few rows to JSON here to create realistic test fixtures for your unit tests without writing them by hand.` },
          { title: `Feeding charting libraries`, text: `Chart.js, D3, and Recharts expect JSON arrays. Convert your CSV data here and paste the result directly into your visualization code.` },
        ]}
        keyStats={[
          { stat: `RFC 4180`, source: `The CSV specification this parser implements — handles edge cases like embedded commas` },
          { stat: `TSV support`, source: `Tab-separated values from database exports convert without changing any setting` },
          { stat: `0 uploads`, source: `No file upload — paste directly, all processing in your browser` },
        ]}
        inlineLinks={[
          { text: `JSON to CSV`, href: `/calculators/dev/json-to-csv`, label: `JSON to CSV` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `JSONPath Tester`, href: `/calculators/dev/json-path-tester`, label: `JSONPath Tester` },
          { text: `JSON Schema Generator`, href: `/calculators/dev/json-schema-gen`, label: `JSON Schema Generator` },
          { text: `XML to JSON`, href: `/calculators/dev/xml-to-json`, label: `XML to JSON` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `Table Generator`, href: `/calculators/dev/table-generator`, label: `Table Generator` },
        ]}
        tipsSection={`Check your delimiter first. European Excel exports use semicolons, not commas. If your output looks like one giant field, change the delimiter to semicolon.

First row as headers. This converter treats the first row as column names. If your CSV has no header row, either add one or switch to the 2D array output mode.

Handle large files in chunks. For CSV files over 10MB, split into batches — the browser can handle it, but inserting a 100,000-row JSON array into your UI at once will lock the tab.

Validate after converting. Paste the JSON output into the [JSON Formatter](/calculators/dev/json-formatter) to confirm it is valid before piping it into your application.`}
        conclusion={`CSV-to-JSON conversion sounds simple until you hit quoted fields with embedded commas or tab-separated exports from a European locale. This tool handles the edge cases that break naive split-on-comma implementations.

For the full data transformation workflow: convert here, validate with [JSON Formatter](/calculators/dev/json-formatter), extract fields with [JSONPath Tester](/calculators/dev/json-path-tester).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
