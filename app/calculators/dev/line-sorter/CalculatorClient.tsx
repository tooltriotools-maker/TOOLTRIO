'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('banana\napple\ncherry\ndate\napple\nfig')
  const [mode, setMode] = useState<'az'|'za'|'len-asc'|'len-desc'|'reverse'|'shuffle'|'unique'>('az')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => {
    const lines = input.split('\n')
    const compare = (a: string, b: string) => {
      const x = caseSensitive ? a : a.toLowerCase()
      const y = caseSensitive ? b : b.toLowerCase()
      return x < y ? -1 : x > y ? 1 : 0
    }
    switch(mode) {
      case 'az': return [...lines].sort(compare).join('\n')
      case 'za': return [...lines].sort((a,b) => compare(b,a)).join('\n')
      case 'len-asc': return [...lines].sort((a,b) => a.length - b.length).join('\n')
      case 'len-desc': return [...lines].sort((a,b) => b.length - a.length).join('\n')
      case 'reverse': return [...lines].reverse().join('\n')
      case 'shuffle': return [...lines].sort(() => Math.random()-0.5).join('\n')
      case 'unique': return Array.from(new Set(lines.map(l => caseSensitive ? l : l.toLowerCase()))).join('\n')
      default: return input
    }
  }, [input, mode, caseSensitive])

  const stats = useMemo(() => {
    const lines = input.split('\n')
    return { total: lines.length, unique: new Set(lines.map(l=>l.toLowerCase())).size, empty: lines.filter(l=>!l.trim()).length }
  }, [input])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Line Sorter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">^v️ Line Sorter</h1>
      <p className="text-gray-500 mb-6">Sort, reverse, shuffle or deduplicate lines - all in your browser</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {[{v:'az',l:'A -> Z'},{v:'za',l:'Z -> A'},{v:'len-asc',l:'Shortest first'},{v:'len-desc',l:'Longest first'},{v:'reverse',l:'Reverse'},{v:'shuffle',l:'Shuffle'},{v:'unique',l:'Unique only'}].map(m=>(
          <button key={m.v} onClick={()=>setMode(m.v as any)} className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 transition-all ${mode===m.v?'bg-green-600 text-white border-green-600':'border-gray-200 text-gray-600 hover:border-green-400'}`}>{m.l}</button>
        ))}
        <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200 text-xs cursor-pointer">
          <input type="checkbox" checked={caseSensitive} onChange={e=>setCaseSensitive(e.target.checked)} className="rounded" />
          Case sensitive
        </label>
      </div>
      <div className="text-xs text-gray-400 mb-3">{stats.total} lines - {stats.unique} unique - {stats.empty} empty</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Input (one item per line)</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14}
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Output</label>
            <button onClick={()=>{navigator.clipboard.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">
              {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
            </button>
          </div>
          <pre className="h-72 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre">{output}</pre>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Line Sorter</h2>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">The Line Sorter instantly organises multi-line text in any order you need - alphabetically, by length, reversed, shuffled, or deduplicated. Perfect for developers sorting lists of names, file paths, CSS classes, JSON keys, or any newline-separated data. Everything runs in your browser - nothing is sent to any server.</p>
        <h3 className="font-bold text-gray-900 mb-3">Step-by-Step Guide</h3>
        <ol className="space-y-3 mb-6">
          {['Paste your list into the left panel - one item per line. You can paste from Excel, a CSV column, code, or any text source.',
            'Select a sort mode: A->Z for alphabetical, Z->A for reverse alpha, Shortest/Longest for length-based, Reverse to flip order, Shuffle to randomise, or Unique to remove duplicates.',
            'Toggle Case Sensitive if you need capital letters to sort before lowercase (default is case-insensitive).',
            'The sorted output appears instantly on the right. Click Copy to copy the entire sorted list to your clipboard.',
            'Paste the result back into your code, spreadsheet, or document.'
          ].map((s,i)=>(
            <li key={i} className="flex items-start gap-3"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-600 text-white text-xs font-black flex items-center justify-center">{i+1}</span><span className="text-gray-700 text-sm leading-relaxed">{s}</span></li>
          ))}
        </ol>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs font-bold text-blue-600 uppercase mb-2">Example Input</p>
            <code className="text-sm font-mono text-blue-800">banana<br/>apple<br/>cherry<br/>apple<br/>date</code>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="text-xs font-bold text-green-600 uppercase mb-2">A→Z + Unique Output</p>
            <code className="text-sm font-mono text-green-800">apple<br/>banana<br/>cherry<br/>date</code>
          </div>
        </div>
        <h3 className="font-bold text-gray-900 mb-3">Pro Tips</h3>
        <div className="space-y-2">
          {['Use Unique mode to clean up CSS class lists or deduplicate email lists before importing into a CRM.',
            'Sort by Length (Shortest first) to quickly spot the shortest/longest variable names or SQL column values.',
            'Shuffle is useful for randomising test data, creating random assignment lists, or shuffling quiz questions.',
            'Paste a list of npm package names, sort A->Z, and use the output directly in your package.json or import statements.',
            'Combine with the Duplicate Remover tool for more control over deduplication options.'
          ].map((t,i)=>(<div key={i} className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">v</span><span className="text-sm text-gray-700">{t}</span></div>))}
        </div>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Line Sorter — Sort and Deduplicate Text Lines"
        category="dev"
        intro={`Sorting and deduplicating lines of text is a constant task in development — organizing import statements, cleaning up lists, preparing data for comparison. Doing this in a text editor requires manual work; this tool handles it instantly.

This sorter handles alphabetical, numeric, length-based, and natural sort. Runs in your browser.

**Long-tail searches answered here:** line sorter free online usa, sort text lines alphabetically free no signup, text line alphabetizer free tool online, sort list of items online free no download, reverse sort text lines free tool, bulk text line sorter free online usa, sort lines by line length ascending descending free, sort csv rows by column value free online usa, natural sort order vs alphabetical sort tool free, sort lines and remove duplicates combined tool free usa, shuffle randomize lines order free online tool, sort ip addresses numerically free tool usa, sort lines case insensitive free online tool, sort numbered list by number value free usa, sort lines by word count free online tool usa

For deduplication, pair with [Duplicate Remover](/calculators/dev/duplicate-remover). For comparison, use [Diff Checker](/calculators/dev/diff-checker).`}
        howItWorks={`Sorts lines alphabetically (A-Z or Z-A), numerically, or by line length. Natural sort option handles numbered lists correctly: item 10 sorts after item 9 not after item 1. Case-sensitive and case-insensitive modes. Remove duplicates toggle. Trim whitespace option normalizes leading/trailing spaces before sorting.`}
        benefits={[
          { title: `Multiple sort modes`, text: `Alphabetical, reverse alphabetical, numeric, by line length, and natural sort — covering the most common text sorting needs.` },
          { title: `Natural sort for filenames`, text: `Natural sort handles item 10 after item 9 rather than after item 1 — standard alphabetical sort breaks filename and version number ordering.` },
          { title: `Case-insensitive option`, text: `Sort case-insensitively so Apple, banana, and Cherry sort as if they were the same case.` },
          { title: `Deduplication built-in`, text: `Remove duplicate lines toggle works alongside sorting — sort first, then remove adjacent duplicates.` },
        ]}
        useCases={[
          { title: `Organize import statements`, text: `Paste your JavaScript import block here, sort alphabetically, and paste back. Sorted imports are easier to diff and review in PRs.` },
          { title: `Deduplicate lists`, text: `Sort an email list or tag list here to bring duplicates together, then remove them with the deduplication toggle.` },
          { title: `Process log files`, text: `Sort log lines by timestamp or severity, deduplicate repeated error messages, and paste back for analysis.` },
          { title: `Compare sorted lists`, text: `Sort two different lists here then compare with [Diff Checker](/calculators/dev/diff-checker) to find what is present in one but missing in the other.` },
        ]}
        keyStats={[
          { stat: `Natural sort`, source: `Handles item 10 after item 9 — required for filenames, versions, and numbered lists` },
          { stat: `Trim whitespace`, source: `Normalizes leading/trailing spaces before sorting — ensures two spaces before item and item sort together` },
          { stat: `Deduplicate`, source: `Remove duplicate lines — combined with sort brings all duplicates adjacent for efficient removal` },
        ]}
        inlineLinks={[
          { text: `Duplicate Remover`, href: `/calculators/dev/duplicate-remover`, label: `Duplicate Remover` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Markdown Table Generator`, href: `/calculators/dev/markdown-table-gen`, label: `Markdown Table Generator` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
        ]}
        tipsSection={`Natural sort for version lists. 1.9.0 sorts before 1.10.0 with natural sort. Standard alphabetical sort places 1.10.0 before 1.9.0 (because 1 is less than 9 alphabetically). Use natural sort for version numbers, filenames, and IDs.

Sort before deduplicating. When using Remove Duplicates, sort first — duplicates are detected by adjacent line comparison, so unsorted duplicates separated by other lines are not removed.

Organize import statements. Paste your JavaScript import block here, sort alphabetically, and paste back. Sorted imports are easier to diff and review in PRs.

Combine with Diff Checker. Sort two different lists here then compare with [Diff Checker](/calculators/dev/diff-checker) to find what is present in one but missing in the other.`}
        conclusion={`Sorting and deduplicating text lines is a repetitive task that comes up constantly in development — organizing imports, cleaning up lists, preparing data. For full text processing: [Duplicate Remover](/calculators/dev/duplicate-remover) and [Diff Checker](/calculators/dev/diff-checker).`}
      />
    </div>
  )
}
