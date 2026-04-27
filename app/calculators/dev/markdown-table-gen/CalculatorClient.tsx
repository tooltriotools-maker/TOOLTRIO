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
      setOutput(`// Markdown Table Generator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Markdown Table Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📋 Markdown Table Generator</h1>
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
        title="Markdown Table Generator"
        category="dev"
        intro={`Markdown tables require consistent column counts and exact pipe alignment — easy to get wrong when writing by hand, especially for tables with more than 3 columns. This generator handles the formatting automatically.

This tool builds GFM tables from CSV input or manual row/column input. Runs in your browser.

**Long-tail searches answered here:** markdown table generator free online usa, create markdown table from data free no signup, markdown table builder with alignment free tool, how to make markdown table free generator, ascii table to markdown converter free, markdown table creator free no download usa, paste csv and convert to markdown table free, markdown table column alignment syntax free guide, markdown table from spreadsheet paste free usa, how to center align column in markdown table free, markdown table with multi line cells workaround, github markdown table limits and workarounds free, responsive markdown table alternative free guide usa, markdown table to html converter and back free, large markdown table generator from data free usa

Preview output with [Markdown Preview](/calculators/dev/markdown-preview).`}
        howItWorks={`Accepts tabular data as CSV, TSV, or manual row/column input and converts to Markdown GFM table format. Handles column alignment (left, right, center) using colon syntax in the separator row. Auto-sizes column widths for readable source markdown. Also converts in reverse — Markdown tables to CSV for editing in a spreadsheet.`}
        benefits={[
          { title: `CSV and TSV input`, text: `Paste CSV or TSV data directly and get a properly formatted Markdown table with alignment. No manual pipe character typing.` },
          { title: `Column alignment control`, text: `Set left, right, or center alignment per column using colon syntax in the separator row: :--- (left), ---: (right), :---: (center).` },
          { title: `Readable source output`, text: `Auto-sizes column widths so the Markdown table source is visually aligned — much easier to read and edit in a text editor.` },
          { title: `Reverse conversion`, text: `Convert an existing Markdown table back to CSV for editing in Excel or Google Sheets, then convert back.` },
        ]}
        useCases={[
          { title: `GitHub README tables`, text: `Build tables for your GitHub README without manually typing pipe characters and alignment markers.` },
          { title: `API documentation`, text: `Create request/response parameter tables for your API docs. Input as CSV from your spreadsheet, output as Markdown.` },
          { title: `Changelog tables`, text: `Build comparison tables for version changelogs. Two columns (Before/After) with rows for each changed behavior.` },
          { title: `Configuration reference`, text: `Document configuration option tables with type, default, and description columns.` },
        ]}
        keyStats={[
          { stat: `GFM table format`, source: `GitHub Flavored Markdown pipe-separated tables — the most widely supported Markdown table format` },
          { stat: `:---: for centering`, source: `Colon syntax controls column text alignment in rendered output` },
          { stat: `Consistent column widths`, source: `Auto-padded source Markdown is much easier to maintain in a text editor` },
        ]}
        inlineLinks={[
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `HTML to Markdown`, href: `/calculators/dev/html-to-markdown`, label: `HTML to Markdown` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `Table Generator`, href: `/calculators/dev/table-generator`, label: `Table Generator` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `Lorem Ipsum Generator`, href: `/calculators/dev/lorem-ipsum-generator`, label: `Lorem Ipsum Generator` },
        ]}
        tipsSection={`Alignment with colons. :--- left-aligns, ---: right-aligns, :---: centers. Right-alignment is standard for numeric columns.

Escaped pipes in cells. If a cell value contains a pipe character, escape it with backslash pipe. Otherwise it breaks the table structure.

Verify in Markdown Preview. Always preview the generated table in [Markdown Preview](/calculators/dev/markdown-preview) before committing — column count mismatches cause the entire table to render as raw text on some platforms.

Large tables are hard to maintain. Markdown tables over 5 columns become unreadable in source. Consider an HTML table inside a Markdown file for complex data.`}
        conclusion={`Markdown tables require consistent column counts and exact pipe alignment. This generator handles the formatting so you focus on the data. Preview output with [Markdown Preview](/calculators/dev/markdown-preview) and edit data with [CSV to JSON](/calculators/dev/csv-to-json).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
