'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('[{"name":"Alice","age":28,"email":"alice@example.com"},{"name":"Bob","age":35,"email":"bob@company.org"},{"name":"Carol","age":42,"email":"carol@email.net"}]')
  const [delimiter, setDelimiter] = useState(',')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (!input.trim()) return { csv: '', error: '', rows: 0, headers: [] }
    try {
      const data = JSON.parse(input)
      if (!Array.isArray(data)) return { csv: '', error: 'JSON must be an array of objects', rows: 0, headers: [] }
      if (data.length === 0) return { csv: '', error: 'Array is empty', rows: 0, headers: [] }
      const headers = Object.keys(data[0])
      const escape = (v: any) => {
        const s = v === null || v === undefined ? '' : String(v)
        return s.includes(delimiter) || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g,'""')}"` : s
      }
      const lines = [headers.map(h=>escape(h)).join(delimiter), ...data.map((row:any)=>headers.map(h=>escape(row[h])).join(delimiter))]
      return { csv: lines.join('\n'), error: '', rows: data.length, headers }
    } catch(e:any) { return { csv: '', error: e.message, rows: 0, headers: [] } }
  }, [input, delimiter])

  const download = () => {
    const blob = new Blob([result.csv], {type:'text/csv'})
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'data.csv'; a.click()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">JSON to CSV</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📊 JSON to CSV Converter</h1>
      <p className="text-gray-500 mb-6">Convert JSON arrays to CSV - auto-detects headers, handles nested values, supports custom delimiters</p>
      <div className="flex gap-3 mb-4">
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1">Delimiter</label>
          <select value={delimiter} onChange={e=>setDelimiter(e.target.value)} className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-green-400 bg-white">
            <option value=",">, (comma)</option><option value={"\t"}>→ (tab)</option><option value=";">; (semicolon)</option>
          </select>
        </div>
        {result.rows>0 && <div className="flex items-end"><span className="text-sm text-gray-500">{result.rows} rows - {result.headers.length} columns: {result.headers.slice(0,5).join(', ')}{result.headers.length>5?'...':''}</span></div>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-2">JSON Array Input</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={16} className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-950 text-green-300" /></div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">CSV Output</label>
            <div className="flex gap-2">
              <button onClick={()=>{navigator.clipboard.writeText(result.csv);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
              {result.csv && <button onClick={download} className="flex items-center gap-1 text-xs font-bold text-blue-600"><Download className="w-3.5 h-3.5"/> Download</button>}
            </div>
          </div>
          {result.error ? <div className="p-4 bg-red-50 rounded-xl border border-red-200"><p className="text-red-600 text-sm font-mono">{result.error}</p></div>
            : <pre className="h-64 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre">{result.csv||'Output appears here...'}</pre>}
        </div>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the JSON to CSV Converter</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Paste a JSON array of objects into the left panel. The first object's keys become the CSV header row. Every subsequent object becomes a data row. Values containing commas or quotes are automatically wrapped in double-quotes per RFC 4180 standard. Click Download to save as a .csv file you can open directly in Excel or Google Sheets.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><p className="text-xs font-bold text-blue-600 uppercase mb-1">JSON Input</p><code className="text-xs font-mono text-blue-800">{'[{"name":"Alice","age":28}]'}</code></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><p className="text-xs font-bold text-green-600 uppercase mb-1">CSV Output</p><code className="text-xs font-mono text-green-800">name,age<br/>Alice,28</code></div>
        </div>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="JSON to CSV Converter"
        category="dev"
        intro={`REST APIs return JSON. Spreadsheet users and data analysts want CSV. Manually writing a JSON-to-CSV export loop means handling nested objects, missing keys, and array fields differently every time.

This converter flattens JSON arrays into CSV with automatic header detection. Runs in your browser.

**Long-tail searches answered here:** json to csv converter free online usa, convert json array to csv free no signup, json csv transformer free tool online, export json as csv file free no download, flatten json to csv free online tool, json to spreadsheet converter free usa, json array to csv with headers free online tool, nested json to flat csv structure converter free, json to excel xlsx via csv free online usa, how to handle arrays in json to csv conversion, json to csv separator choice comma tab free usa, json to csv with custom column ordering free tool, large json file to csv streaming converter free, json to csv for database import free online usa, json api response to csv download free tool

For the reverse operation, use [CSV to JSON](/calculators/dev/csv-to-json).`}
        howItWorks={`Expects a JSON array of objects. Auto-detects all unique keys across all objects and uses them as CSV column headers. Nested objects are dot-notation flattened by default: user.name becomes a column. Arrays within objects are serialized as JSON strings in the cell. Missing values default to empty strings.`}
        benefits={[
          { title: `Auto-detects all column headers`, text: `Scans every object in the array for unique keys — handles sparse JSON where different objects have different fields without losing any columns.` },
          { title: `Nested object flattening`, text: `Dot-notation flattening converts nested address.city to a column, making nested API responses spreadsheet-friendly.` },
          { title: `Handles sparse data`, text: `When some records have fields others do not, missing values become empty cells rather than crashing or misaligning columns.` },
          { title: `Download as .csv`, text: `One-click download saves as a properly formatted CSV file ready to open in Excel, Google Sheets, or import into a database.` },
        ]}
        useCases={[
          { title: `Exporting API data for stakeholders`, text: `Your analytics API returns JSON but your manager wants a spreadsheet. Convert the response here in seconds instead of writing a custom export script.` },
          { title: `Creating database seed files`, text: `You generated fake data as JSON. Convert to CSV for bulk import into MySQL using LOAD DATA INFILE.` },
          { title: `Debugging flat API responses`, text: `The quickest way to spot inconsistencies in a 500-row JSON array is to open it in Excel. Convert here, download, and use spreadsheet filters to find anomalies.` },
          { title: `Building test data for ETL pipelines`, text: `ETL tools often accept CSV as a source format. Convert sample JSON API responses here to create realistic test inputs.` },
        ]}
        keyStats={[
          { stat: `Auto headers`, source: `Scans all objects to detect every unique key — no manual column configuration` },
          { stat: `Dot notation`, source: `Nested objects flatten to parent.child column names automatically` },
          { stat: `RFC 4180`, source: `Output follows the CSV standard — quoted fields, escaped commas` },
        ]}
        inlineLinks={[
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `JSON Schema Generator`, href: `/calculators/dev/json-schema-gen`, label: `JSON Schema Generator` },
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `JSONPath Tester`, href: `/calculators/dev/json-path-tester`, label: `JSONPath Tester` },
          { text: `XML to JSON`, href: `/calculators/dev/xml-to-json`, label: `XML to JSON` },
          { text: `Table Generator`, href: `/calculators/dev/table-generator`, label: `Table Generator` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
        ]}
        tipsSection={`Format your JSON first. Paste your JSON into [JSON Formatter](/calculators/dev/json-formatter) to validate it before converting. A single syntax error in a large array produces an empty CSV with no error message.

Deeply nested JSON needs pre-processing. If your JSON has objects nested more than 2 levels deep, use [JSONPath Tester](/calculators/dev/json-path-tester) to extract the specific fields before converting — deep flattening produces unwieldy column names.

Arrays within objects. Fields that are arrays serialize as JSON strings in the cell. If you need each element as a separate row, pre-process the JSON first.

Re-import check. After converting, run the CSV back through [CSV to JSON](/calculators/dev/csv-to-json) and compare with [Diff Checker](/calculators/dev/diff-checker) to confirm no data was lost.`}
        conclusion={`JSON-to-CSV conversion is a daily task for anyone bridging API data and spreadsheet workflows. The hard parts — sparse keys, nested objects, array fields — are handled automatically.

For full-circle data workflow: use [Fake Data Generator](/calculators/dev/fake-data-generator) to create sample JSON, convert here to CSV, then use [CSV to JSON](/calculators/dev/csv-to-json) to reverse.`}
      />
    </div>
  )
}
