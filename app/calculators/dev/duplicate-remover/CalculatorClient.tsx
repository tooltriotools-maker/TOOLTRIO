'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('apple\nbanana\napple\ncherry\nbanana\ndate\ncherry')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [keepOrder, setKeepOrder] = useState(true)
  const [copied, setCopied] = useState(false)
  const [trimLines, setTrimLines] = useState(true)

  const result = useMemo(() => {
    const lines = input.split('\n').map(l => trimLines ? l.trim() : l)
    const seen = new Set<string>()
    const unique: string[] = []
    const dupes: string[] = []
    lines.forEach(l => {
      const key = caseSensitive ? l : l.toLowerCase()
      if (seen.has(key)) { if (!dupes.includes(l)) dupes.push(l) }
      else { seen.add(key); unique.push(l) }
    })
    return { unique, dupes, total: lines.length, removed: lines.length - unique.length }
  }, [input, caseSensitive, keepOrder, trimLines])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Duplicate Remover</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">✂️ Duplicate Line Remover</h1>
      <p className="text-gray-500 mb-6">Remove duplicate lines instantly - case-insensitive option included</p>
      <div className="flex flex-wrap gap-3 mb-4">
        {[{l:'Case sensitive',v:caseSensitive,s:setCaseSensitive},{l:'Trim whitespace',v:trimLines,s:setTrimLines}].map(({l,v,s})=>(
          <label key={l} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs cursor-pointer font-medium">
            <input type="checkbox" checked={v} onChange={e=>s(e.target.checked)} className="rounded" />{l}
          </label>
        ))}
        <div className="flex items-center gap-2 text-sm font-bold text-gray-600 px-3">
          <span className="text-green-600">{result.unique.length} unique</span> - 
          <span className="text-red-500">{result.removed} removed</span> - 
          <span className="text-gray-500">{result.total} total</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Input Text</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14}
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Unique Lines</label>
              <button onClick={()=>{navigator.clipboard.writeText(result.unique.join('\n'));setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">
                {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
              </button>
            </div>
            <pre className="h-40 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre">{result.unique.join('\n')}</pre>
          </div>
          {result.dupes.length > 0 && (
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Duplicates Found</label>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                {result.dupes.map(d=><span key={d} className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-mono rounded-lg mr-1 mb-1">{d}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Duplicate Line Remover</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Remove duplicate entries from any list instantly. Paste emails, usernames, file paths, CSS classes, keywords, or any newline-separated data - the tool finds and removes exact duplicate lines, highlights what was removed, and gives you the clean unique list to copy.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><p className="text-xs font-bold text-blue-600 uppercase mb-2">Example Input</p><code className="text-sm font-mono text-blue-800">alice@mail.com<br/>bob@mail.com<br/>alice@mail.com<br/>carol@mail.com</code></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><p className="text-xs font-bold text-green-600 uppercase mb-2">Clean Output</p><code className="text-sm font-mono text-green-800">alice@mail.com<br/>bob@mail.com<br/>carol@mail.com</code></div>
        </div>
        <p className="text-sm text-gray-600">Enable <strong>Case Sensitive</strong> to treat "Apple" and "apple" as different entries. Use <strong>Trim Whitespace</strong> to normalise lines that may have leading/trailing spaces before comparison. The duplicates panel shows you exactly what was removed so you can verify the result.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Duplicate Line Remover"
        category="dev"
        intro={`Duplicate lines in text data cause problems — duplicate email addresses in marketing lists, repeated error messages obscuring unique issues in logs, duplicate import statements breaking builds. Removing them manually in a text editor is error-prone.

This tool removes duplicate lines with case-sensitive or case-insensitive matching. Runs in your browser.

**Long-tail searches answered here:** duplicate line remover free online usa, remove duplicate text lines free tool, online duplicate finder and remover free no signup, bulk duplicate text remover free no download, how to remove duplicates from list online free, deduplicate text lines free online tool usa, remove duplicate emails from list free online usa, deduplicate csv rows free online tool, remove duplicate words in text free tool usa, case insensitive duplicate removal free online, sort and deduplicate list free tool usa, find and remove duplicate urls free online, whitespace trimmed duplicate line remover free usa, remove duplicate items from bulleted list free, duplicate removal with count report free tool usa

For sorting before deduplication, pair with [Line Sorter](/calculators/dev/line-sorter).`}
        howItWorks={`Removes duplicate lines from text, preserving the first occurrence or last occurrence (configurable). Case-sensitive and case-insensitive deduplication modes. Trim whitespace before comparison (so two spaces before line and line are treated as the same). Shows count of lines removed and lines remaining. Optionally sorts after deduplication.`}
        benefits={[
          { title: `First vs last occurrence`, text: `Configure whether to keep the first or last occurrence of each duplicate line — useful when later entries contain more up-to-date values.` },
          { title: `Case-insensitive mode`, text: `Case-insensitive deduplication for email lists and tag lists where User@Example.com and user@example.com are the same value.` },
          { title: `Whitespace normalization`, text: `Trim whitespace before comparison so two spaces before item and item are treated as the same line — handles pasted data with inconsistent padding.` },
          { title: `Count of removed lines`, text: `Shows exactly how many duplicates were found and removed — useful for verifying the quality of your data source.` },
        ]}
        useCases={[
          { title: `Email list deduplication`, text: `Deduplicate an email marketing list with case-insensitive mode to remove User@Example.com and user@example.com as duplicates.` },
          { title: `Tag and category cleanup`, text: `Deduplicate tag lists from content exports where the same tag appears multiple times in different cases.` },
          { title: `Log file processing`, text: `Remove repeated identical error messages from log files to surface unique errors for analysis.` },
          { title: `Configuration file cleanup`, text: `Remove duplicate entries from .gitignore files, package.json scripts, or other config files where duplicates were added by merge conflicts.` },
        ]}
        keyStats={[
          { stat: `First occurrence`, source: `Keeps the first appearance of each duplicate line — standard deduplication behavior` },
          { stat: `Case-insensitive`, source: `Treats Email@example.com and email@example.com as the same line` },
          { stat: `Count output`, source: `Reports exactly how many lines were removed` },
        ]}
        inlineLinks={[
          { text: `Line Sorter`, href: `/calculators/dev/line-sorter`, label: `Line Sorter` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `Markdown Table Generator`, href: `/calculators/dev/markdown-table-gen`, label: `Markdown Table Generator` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
        ]}
        tipsSection={`Sort before removing. Adjacent duplicate detection only catches consecutive duplicates. Sort with [Line Sorter](/calculators/dev/line-sorter) first to bring all duplicates together, then remove.

Case-insensitive for email lists. Deduplicating an email list should be case-insensitive: User@Example.com and user@example.com are the same address. Toggle case-insensitive mode.

Whitespace normalization. Two spaces before item and item are not the same line without trimming. Enable trim whitespace when data may have inconsistent padding.

Check count. The tool shows how many lines were removed. A surprisingly high number indicates more duplicates than expected — worth investigating the data source.`}
        conclusion={`Duplicate line removal is a data cleaning staple — email lists, log file analysis, import deduplication, and configuration file cleanup. For full text processing: [Line Sorter](/calculators/dev/line-sorter) and [Diff Checker](/calculators/dev/diff-checker).`}
      />
    </div>
  )
}
