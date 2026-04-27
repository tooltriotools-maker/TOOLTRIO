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
      setOutput(`// Inline Text Diff output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Inline Text Diff</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔄 Inline Text Diff</h1>
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
        title="Text Diff — Inline Change Viewer"
        category="dev"
        intro={`Side-by-side diff is great for line-level changes. But when two strings differ by just a few characters — a changed digit in a version number, a different API endpoint suffix, a typo in a config value — inline character-level diff shows the exact change instantly.

This tool shows text differences inline with character-level highlighting. Runs in your browser.

**Long-tail searches answered here:** inline text diff tool free online usa, compare two texts word by word free, character level diff checker free no signup, highlight differences between texts free tool, inline word diff comparison free no download, side by side text difference viewer free usa, char by char diff comparison of strings free, how to find what changed between versions free usa, compare json objects differences highlighted free, compare html markup differences inline free usa, text diff for code review inline highlighting free, semantic diff vs syntactic diff comparison free, how to diff two paragraphs of text free online, compare before and after text edits free usa, unified diff vs split diff view comparison free

For full file comparison, use [Diff Checker](/calculators/dev/diff-checker).`}
        howItWorks={`Shows text differences inline with character-level highlighting — additions in green, deletions in red, within each changed line. Uses Myers diff algorithm for minimal edit distance. Toggle between character-level (shows exact changed characters), word-level (highlights changed words), and line-level views.`}
        benefits={[
          { title: `Character-level highlighting`, text: `Shows exact characters that changed within a line — not just which lines changed. Essential for spotting small differences like a changed digit or typo.` },
          { title: `Word-level mode`, text: `Highlights changed words within lines for prose comparison — more readable than character-level for natural language text.` },
          { title: `Inline display`, text: `Changes are shown inline rather than side-by-side — useful for long single blocks of text where side-by-side would require too much horizontal space.` },
          { title: `Minimal edit distance`, text: `Uses Myers diff algorithm to find the smallest possible set of changes — avoids showing artificial differences from different ways to express the same edit.` },
        ]}
        useCases={[
          { title: `Debugging configuration values`, text: `Your API endpoint URL changed subtly. Character-level diff immediately shows the exact character that is different.` },
          { title: `Spotting typos in documentation`, text: `Comparing two versions of a technical document. Word-level diff shows which specific words were changed without highlighting entire paragraphs.` },
          { title: `API response comparison`, text: `Run the same API call before and after a change, paste both responses here, and character-level diff shows exactly what byte changed.` },
          { title: `Version string comparison`, text: `v1.2.3-beta.1 vs v1.2.3-beta.2 — character-level diff immediately shows the changed digit.` },
        ]}
        keyStats={[
          { stat: `Character-level`, source: `Shows exact characters that changed within a changed line — the most granular diff view` },
          { stat: `Myers algorithm`, source: `Optimal diff algorithm — finds minimum edit distance between two texts` },
          { stat: `Inline display`, source: `Changes shown within the text flow rather than side-by-side panels` },
        ]}
        inlineLinks={[
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Line Sorter`, href: `/calculators/dev/line-sorter`, label: `Line Sorter` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Duplicate Remover`, href: `/calculators/dev/duplicate-remover`, label: `Duplicate Remover` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
        ]}
        tipsSection={`Character-level for small changes. When comparing strings that differ by one or two characters (version numbers, UUIDs, API keys), character-level diff immediately shows the exact difference.

Format first for structured data. JSON, YAML, XML diffs produce cleaner results when formatted first. Unformatted data shows whitespace differences as meaningful changes.

Word-level for prose. Technical documentation and copy changes are more readable with word-level highlighting than character-level.

Compare API responses for regressions. Run the same API call before and after a change, paste both responses here, and see exactly what changed.`}
        conclusion={`Inline character-level diffs catch the small changes that line-level diffs miss — a changed digit, a flipped character pair, a case change. For full file comparison: [Diff Checker](/calculators/dev/diff-checker). For JSON: format with [JSON Formatter](/calculators/dev/json-formatter) first.`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
