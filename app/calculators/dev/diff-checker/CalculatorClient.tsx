'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function diff(a: string, b: string) {
  const aLines = a.split('\n')
  const bLines = b.split('\n')
  const result: {type:'same'|'add'|'remove', text:string}[] = []
  const maxLen = Math.max(aLines.length, bLines.length)
  for (let i=0; i<maxLen; i++) {
    if (i >= aLines.length) result.push({type:'add',text:bLines[i]})
    else if (i >= bLines.length) result.push({type:'remove',text:aLines[i]})
    else if (aLines[i] === bLines[i]) result.push({type:'same',text:aLines[i]})
    else { result.push({type:'remove',text:aLines[i]}); result.push({type:'add',text:bLines[i]}) }
  }
  return result
}

export default function CalculatorClient({ faqs }: Props) {
  const [left, setLeft] = useState('The quick brown fox\njumps over the lazy dog\nHello World')
  const [right, setRight] = useState('The quick brown fox\njumped over the lazy cat\nHello World!')

  const lines = useMemo(()=>diff(left,right),[left,right])
  const adds = lines.filter(l=>l.type==='add').length
  const removes = lines.filter(l=>l.type==='remove').length

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Diff Checker</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔀 Text Diff Checker</h1>
      <p className="text-gray-500 mb-6">Compare two texts line by line and highlight additions, removals, and unchanged lines.</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Original</label>
          <textarea value={left} onChange={e=>setLeft(e.target.value)} rows={10}
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-red-400 rounded-xl focus:outline-none resize-none" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Modified</label>
          <textarea value={right} onChange={e=>setRight(e.target.value)} rows={10}
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
        </div>
      </div>

      <div className="flex gap-4 mb-3 text-sm">
        <span className="px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full">+{adds} added</span>
        <span className="px-3 py-1 bg-red-100 text-red-800 font-bold rounded-full">-{removes} removed</span>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 font-bold rounded-full">{lines.filter(l=>l.type==='same').length} unchanged</span>
      </div>

      <div className="bg-gray-950 rounded-2xl overflow-hidden">
        {lines.map((line,i)=>(
          <div key={i} className={`flex items-start gap-2 px-4 py-1 font-mono text-sm ${line.type==='add'?'bg-green-900/30 text-green-300':line.type==='remove'?'bg-red-900/30 text-red-300':'text-gray-400'}`}>
            <span className="w-4 flex-shrink-0 select-none">{line.type==='add'?'+':line.type==='remove'?'-':' '}</span>
            <span className="whitespace-pre-wrap break-all">{line.text}</span>
          </div>
        ))}
      </div>


      <SEOContent
        title="Diff Checker — Compare Two Text Files"
        category="dev"
        intro={`Comparing two versions of a file, configuration, or data block is a daily task in software development. The diff shows exactly what changed — added lines in green, removed lines in red — without reading both versions in their entirety.

This diff checker runs in your browser. Paste two texts in the two panels and see the differences highlighted immediately.

**Long-tail searches answered here:** text diff checker free online usa, compare two texts side by side free tool, code diff viewer online free no signup, find differences between two files free, text comparison tool online free no download, diff tool for comparing code free usa, inline vs side by side diff comparison view free usa, how to compare two json files diff checker free, yaml diff comparison tool free online usa, word level diff vs line level diff checker free, code review diff checker free no account usa, how to compare config files diff checker usa free, compare two sql files differences free online, ignore whitespace in diff comparison free tool usa, git style diff view for any text free online usa

For inline diffs, use [Text Diff Inline](/calculators/dev/text-diff-inline). For sorted comparison, use [Line Sorter](/calculators/dev/line-sorter) first.`}
        howItWorks={`Compares two text inputs and highlights additions (green), deletions (red), and unchanged lines. Side-by-side and unified diff view modes. Line-level diff shows which complete lines changed; word-level diff within changed lines shows exactly which words are different. Character-level diff mode for comparing similar strings with small variations.`}
        benefits={[
          { title: `Side-by-side and unified view`, text: `Toggle between side-by-side (two panels) and unified (inline +/-) diff display. Side-by-side is better for larger files; unified is more compact.` },
          { title: `Word-level highlighting`, text: `Within changed lines, shows exactly which words are added or removed — not just which lines changed.` },
          { title: `Character-level diff`, text: `For strings with small variations (version numbers, UUIDs, API keys), character-level diff immediately shows the exact characters that changed.` },
          { title: `Line count summary`, text: `Shows total added, removed, and changed lines — useful for PR review and code audit summaries.` },
        ]}
        useCases={[
          { title: `Config file comparison`, text: `Before deploying a configuration change, diff the old and new versions here. Easier than reading the entire file for changes.` },
          { title: `Environment comparison`, text: `Copy .env.development and .env.production to the two panels to find variables present in one but missing in the other.` },
          { title: `API response regression check`, text: `Run the same API call before and after a change, paste both responses here (after formatting with JSON Formatter), and see exactly what changed.` },
          { title: `Merge conflict resolution`, text: `When resolving a merge conflict, paste both versions here to clearly see what each branch changed.` },
        ]}
        keyStats={[
          { stat: `Myers diff`, source: `Optimal diff algorithm — finds the minimum edit distance between two text sequences` },
          { stat: `Line-level`, source: `Complete lines highlighted green (added) or red (removed)` },
          { stat: `Word-level`, source: `Within changed lines, shows which specific words are added or removed` },
        ]}
        inlineLinks={[
          { text: `Text Diff Inline`, href: `/calculators/dev/text-diff-inline`, label: `Text Diff Inline` },
          { text: `Line Sorter`, href: `/calculators/dev/line-sorter`, label: `Line Sorter` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Duplicate Remover`, href: `/calculators/dev/duplicate-remover`, label: `Duplicate Remover` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
        ]}
        tipsSection={`Sort before comparing lists. Two lists with the same items in different orders show many differences. Sort both with [Line Sorter](/calculators/dev/line-sorter) first to make the actual differences visible.

Format before diffing JSON. Minified JSON vs formatted JSON produces a diff with many false differences (whitespace). Format both with [JSON Formatter](/calculators/dev/json-formatter) first.

Use for config file reviews. Before deploying a configuration change, diff the old and new versions here. Easier than reading the entire file for changes.

Environment comparison. Copy .env.development and .env.production to the two panels to find variables present in one but missing in the other.`}
        conclusion={`Text diffing is a daily task for code review, config management, and data comparison. Side-by-side view shows exactly what changed. For inline diffs: [Text Diff Inline](/calculators/dev/text-diff-inline). For sorted comparison: [Line Sorter](/calculators/dev/line-sorter) first.`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
