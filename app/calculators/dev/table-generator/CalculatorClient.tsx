'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, Plus, Trash2, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

type Row = string[]
type OutputFormat = 'markdown' | 'html' | 'csv' | 'json'

const DEFAULT_HEADERS = ['Name', 'Age', 'City', 'Score']
const DEFAULT_ROWS: Row[] = [
  ['Alice Johnson', '28', 'New York', '95'],
  ['Bob Smith', '34', 'Los Angeles', '87'],
  ['Carol Davis', '22', 'Chicago', '91'],
]

export default function CalculatorClient({ faqs }: Props) {
  const [headers, setHeaders] = useState<string[]>(DEFAULT_HEADERS)
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS)
  const [format, setFormat] = useState<OutputFormat>('markdown')
  const [copied, setCopied] = useState(false)
  const [alignment, setAlignment] = useState<'left'|'center'|'right'>('left')

  const copy = (v: string) => { navigator.clipboard.writeText(v); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  const addRow = () => setRows(r => [...r, Array(headers.length).fill('')])
  const addCol = () => { setHeaders(h => [...h, `Col ${h.length+1}`]); setRows(r => r.map(row => [...row, ''])) }
  const removeRow = (i: number) => setRows(r => r.filter((_,j) => j !== i))
  const removeCol = (i: number) => { setHeaders(h => h.filter((_,j) => j !== i)); setRows(r => r.map(row => row.filter((_,j) => j !== i))) }
  const updateHeader = (i: number, v: string) => setHeaders(h => h.map((c,j) => j === i ? v : c))
  const updateCell = (r: number, c: number, v: string) => setRows(rows => rows.map((row,i) => i === r ? row.map((cell,j) => j === c ? v : cell) : row))

  const generate = useCallback((): string => {
    const alignChar = alignment === 'center' ? ':---:' : alignment === 'right' ? '---:' : '---'
    switch (format) {
      case 'markdown': {
        const header = `| ${headers.join(' | ')} |`
        const sep = `| ${headers.map(() => alignChar).join(' | ')} |`
        const body = rows.map(row => `| ${row.map(c => c || ' ').join(' | ')} |`).join('\n')
        return `${header}\n${sep}\n${body}`
      }
      case 'html': {
        const th = headers.map(h => `    <th>${h}</th>`).join('\n')
        const trs = rows.map(row => `  <tr>\n${row.map(c => `    <td>${c}</td>`).join('\n')}\n  </tr>`).join('\n')
        return `<table>\n  <thead>\n  <tr>\n${th}\n  </tr>\n  </thead>\n  <tbody>\n${trs}\n  </tbody>\n</table>`
      }
      case 'csv': {
        const esc = (s: string) => s.includes(',') || s.includes('"') ? `"${s.replace(/"/g,'""')}"` : s
        return [headers.map(esc).join(','), ...rows.map(row => row.map(esc).join(','))].join('\n')
      }
      case 'json': {
        return JSON.stringify(rows.map(row => Object.fromEntries(headers.map((h,i) => [h, row[i] || '']))), null, 2)
      }
    }
  }, [headers, rows, format, alignment])

  const output = generate()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Table Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📊 Table Generator</h1>
      <p className="text-gray-500 mb-6">Build tables visually and export to Markdown, HTML, CSV, or JSON. Add/remove rows and columns with one click.</p>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex rounded-xl border border-gray-200 overflow-hidden">
          {(['markdown','html','csv','json'] as OutputFormat[]).map(f => (
            <button key={f} onClick={() => setFormat(f)} className={`px-3 py-2 text-xs font-bold uppercase transition-all ${format===f?'bg-blue-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
        {format === 'markdown' && (
          <div className="flex rounded-xl border border-gray-200 overflow-hidden">
            {(['left','center','right'] as const).map(a => (
              <button key={a} onClick={() => setAlignment(a)} className={`px-3 py-2 text-xs font-bold capitalize transition-all ${alignment===a?'bg-purple-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>
                {a}
              </button>
            ))}
          </div>
        )}
        <button onClick={addRow} className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-green-600 border border-green-200 rounded-xl hover:bg-green-50">
          <Plus className="w-3.5 h-3.5"/>Row
        </button>
        <button onClick={addCol} className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50">
          <Plus className="w-3.5 h-3.5"/>Column
        </button>
        <button onClick={() => { setHeaders(DEFAULT_HEADERS); setRows(DEFAULT_ROWS) }} className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50">
          <RefreshCw className="w-3.5 h-3.5"/>Reset
        </button>
      </div>

      {/* Editable table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-x-auto mb-5">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((h, i) => (
                <th key={i} className="p-0">
                  <div className="flex items-center gap-1 px-2 py-1">
                    <input value={h} onChange={e => updateHeader(i, e.target.value)} className="flex-1 min-w-20 px-2 py-1.5 text-sm font-bold bg-transparent border border-transparent hover:border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none" />
                    {headers.length > 1 && (
                      <button onClick={() => removeCol(i)} className="p-0.5 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 flex-shrink-0">
                        <Trash2 className="w-3 h-3"/>
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="w-8"/>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50 group">
                {row.map((cell, ci) => (
                  <td key={ci} className="p-0">
                    <input value={cell} onChange={e => updateCell(ri, ci, e.target.value)} className="w-full min-w-20 px-3 py-2 text-sm bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-400 focus:outline-none rounded-lg m-1" placeholder="..." />
                  </td>
                ))}
                <td className="px-2">
                  {rows.length > 1 && (
                    <button onClick={() => removeRow(ri)} className="p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3.5 h-3.5"/>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Output */}
      <div className="bg-gray-950 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-400 uppercase">{format.toUpperCase()} Output</span>
          <button onClick={() => copy(output)} className="flex items-center gap-1.5 text-xs font-bold text-green-400 hover:text-green-300">
            {copied ? <><Check className="w-3.5 h-3.5"/>Copied!</> : <><Copy className="w-3.5 h-3.5"/>Copy</>}
          </button>
        </div>
        <pre className="font-mono text-xs text-green-300 whitespace-pre-wrap overflow-auto max-h-48">{output}</pre>
      </div>

      <SEOContent
        title="HTML Table Generator"
        category="dev"
        intro={`Semantic HTML tables require scope attributes on th elements, a caption for accessibility, and proper thead/tbody structure. Writing this markup from scratch while also filling in table data is tedious — this generator handles the markup so you focus on the data.

Runs in your browser.

**Long-tail searches answered here:** html table generator free online usa, create html table from data free no signup, html table builder with styling free tool, responsive html table generator free, how to build html table free generator, table to html code generator free usa, html table from csv data free generator online, striped table css html generator free usa, html table with sortable columns generator free, fixed header scrollable html table generator free, html table for email newsletter free generator usa, bootstrap table class html generator free, accessible html table with scope attributes free usa, html table cell merging colspan rowspan free tool, html table to excel export button code free usa

For Markdown tables, use [Markdown Table Generator](/calculators/dev/markdown-table-gen). For data conversion, use [CSV to JSON](/calculators/dev/csv-to-json).`}
        howItWorks={`Builds HTML table markup from a configurable row/column grid or CSV/TSV paste. Generates: table, thead, tbody, th (with scope attribute for accessibility), td, and optional colspan/rowspan for merged cells. Outputs clean, semantic HTML or Markdown GFM table format.`}
        benefits={[
          { title: `Accessible HTML output`, text: `Generates th scope=col and th scope=row — the scope attributes that associate header cells with data cells for screen readers.` },
          { title: `CSV to HTML table`, text: `Paste CSV data and get a properly structured HTML table with headers in thead and data in tbody. No manual markup required.` },
          { title: `Colspan and rowspan`, text: `Add merged cells with colspan and rowspan. The visual grid editor handles the span calculation automatically.` },
          { title: `Markdown GFM output`, text: `Toggle to output Markdown GFM table format for use in README files and documentation platforms.` },
        ]}
        useCases={[
          { title: `API documentation tables`, text: `Create parameter reference tables (Name, Type, Required, Description) for your API docs. Input as CSV, output as HTML or Markdown.` },
          { title: `Configuration reference tables`, text: `Document configuration options with type, default value, and description columns. Clean HTML output for web documentation.` },
          { title: `Comparison tables`, text: `Build feature comparison tables for product pages or technical comparisons. Merge cells for grouped rows.` },
          { title: `Data display in email templates`, text: `HTML tables for structured data display in email templates — email clients require explicit HTML tables for tabular layout.` },
        ]}
        keyStats={[
          { stat: `scope attribute`, source: `th scope=col and th scope=row — required for accessible tables` },
          { stat: `caption element`, source: `caption as first child of table provides a visible title and accessible name for the table` },
          { stat: `table-layout: fixed`, source: `CSS property for consistent column widths in tables with many columns` },
        ]}
        inlineLinks={[
          { text: `Markdown Table Generator`, href: `/calculators/dev/markdown-table-gen`, label: `Markdown Table Generator` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `JSON to CSV`, href: `/calculators/dev/json-to-csv`, label: `JSON to CSV` },
        ]}
        tipsSection={`Use scope on th elements. th scope=col and th scope=row associate header cells with data cells for screen readers — required for accessible tables.

caption for table context. caption as the first child of table provides a visible title and accessible name. Screen readers announce the caption before reading the table data.

CSS table-layout: fixed. For tables with many columns, table-layout: fixed with explicit col widths prevents text overflow and makes columns consistent widths.

Do not use tables for layout. HTML tables are for tabular data only. CSS Grid and Flexbox handle layout. Misusing tables breaks screen readers and responsive design.`}
        conclusion={`Semantic HTML tables require scope attributes and proper thead/tbody structure for accessibility. This generator handles the markup so you focus on the data. For Markdown tables: [Markdown Table Generator](/calculators/dev/markdown-table-gen). For data conversion: [CSV to JSON](/calculators/dev/csv-to-json).`}
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
          <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
        </details>)}
      </div>
    </div>
  )
}
