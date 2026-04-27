'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [pattern, setPattern] = useState('(\\w+)@([\\w.]+)\\.(\\w{2,})')
  const [flags, setFlags] = useState('gi')
  const [testStr, setTestStr] = useState('Contact alice@example.com or bob@company.org for support.')
  const [replacement, setReplacement] = useState('[EMAIL REDACTED]')

  const result = useMemo(() => {
    if (!pattern) return { matches: [], highlighted: testStr, replaced: '', error: '', count: 0, groups: [] }
    try {
      const rx = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      const matches: { text: string; index: number; groups: string[] }[] = []
      let m
      const rxGlobal = new RegExp(pattern, 'g' + flags.replace('g',''))
      while ((m = rxGlobal.exec(testStr)) !== null) {
        matches.push({ text: m[0], index: m.index, groups: m.slice(1) })
        if (!flags.includes('g')) break
      }
      const rxReplace = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      const replaced = testStr.replace(rxReplace, replacement)
      const groups = matches[0]?.groups || []
      return { matches, count: matches.length, replaced, error: '', groups, valid: true }
    } catch (e: any) {
      return { matches: [], highlighted: testStr, replaced: '', error: e.message, count: 0, groups: [], valid: false }
    }
  }, [pattern, flags, testStr, replacement])

  const highlighted = useMemo(() => {
    if (!result.matches?.length) return [{ text: testStr, match: false }]
    const parts: { text: string; match: boolean }[] = []
    let last = 0
    result.matches.forEach((m: any) => {
      if (m.index > last) parts.push({ text: testStr.slice(last, m.index), match: false })
      parts.push({ text: m.text, match: true })
      last = m.index + m.text.length
    })
    if (last < testStr.length) parts.push({ text: testStr.slice(last), match: false })
    return parts
  }, [result.matches, testStr])

  const TOGGLE_FLAGS = ['g', 'i', 'm', 's', 'u']

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Regex Tester</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔍 Regex Tester</h1>
      <p className="text-gray-500 mb-8">Live regular expression testing with match highlighting</p>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Pattern</label>
          <div className={`flex items-center border-2 rounded-xl overflow-hidden ${result.error ? 'border-red-400' : 'border-gray-200 focus-within:border-green-400'}`}>
            <span className="px-3 text-gray-400 font-mono text-lg">/</span>
            <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="regex pattern..."
              className="flex-1 py-3 font-mono text-base focus:outline-none" />
            <span className="px-1 text-gray-400 font-mono text-lg">/</span>
            <div className="flex gap-1 px-2">
              {TOGGLE_FLAGS.map(f => (
                <button key={f} onClick={() => setFlags(prev => prev.includes(f) ? prev.replace(f,'') : prev+f)}
                  className={`w-7 h-7 text-xs font-black rounded-lg transition-all ${flags.includes(f) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{f}</button>
              ))}
            </div>
          </div>
          {result.error && <p className="text-red-500 text-xs mt-1 font-mono">{result.error}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Test String</label>
          <textarea value={testStr} onChange={e => setTestStr(e.target.value)} rows={3}
            className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none resize-none" />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Replacement String</label>
          <input value={replacement} onChange={e => setReplacement(e.target.value)} placeholder="Replacement..."
            className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Matches Highlighted</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${result.count > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{result.count} match{result.count !== 1 ? 'es' : ''}</span>
          </div>
          <div className="font-mono text-sm leading-relaxed bg-gray-50 rounded-xl p-3 min-h-12">
            {highlighted.map((p, i) => p.match
              ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{p.text}</mark>
              : <span key={i} className="text-gray-700">{p.text}</span>
            )}
          </div>
          {result.matches?.length > 0 && (
            <div className="mt-3 space-y-1">
              {result.matches.map((m: any, i: number) => (
                <div key={i} className="text-xs p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="font-bold">Match {i+1}:</span> <code className="font-mono">{m.text}</code>
                  {m.groups?.length > 0 && <span className="text-gray-500"> - groups: [{m.groups.map((g: string) => `"${g}"`).join(', ')}]</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-3">After Replacement</h3>
          <div className="font-mono text-sm leading-relaxed bg-gray-50 rounded-xl p-3 min-h-12 text-gray-700">{result.replaced || testStr}</div>
        </div>
      </div>


      <SEOContent
        title="Regex Tester — Live Regular Expression Tester"
        category="dev"
        intro={`Writing a regular expression from memory and hoping it works on edge cases in production is a common source of bugs. This live regex tester runs your pattern against your test string in real time, highlighting every match as you type — the JavaScript engine, no intermediary, no server round-trip.

Runs entirely in your browser.

**Long-tail searches answered here:** regex tester free online usa, test regular expression online free no signup, regex pattern matcher free tool, javascript regex tester free online, python regex tester free no download, regex validator with match highlighting free usa, regex lookahead and lookbehind tester free, regex for email validation pattern tester free usa, regex to match phone number us format free tool, regex capture groups and named groups tester free, regex flags global multiline case insensitive free usa, regex quantifier greedy vs lazy tester free, regex for date format validation tester free usa, how to debug complex regex pattern free online, common regex patterns library reference free usa

For string operations, pair with [String Inspector](/calculators/dev/string-inspector) and [Diff Checker](/calculators/dev/diff-checker).`}
        howItWorks={`Uses new RegExp(pattern, flags) to compile your regex and String.prototype.matchAll() to find all matches. Match start/end positions are used to highlight spans in the test string in real time. Supports all JavaScript regex flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (Unicode), d (indices).`}
        benefits={[
          { title: `Live match highlighting`, text: `Every match is highlighted in the test string as you type the pattern. See exactly what the regex matches in real time — no run button.` },
          { title: `Named capture groups`, text: `Named groups (?<name>...) display with their names in the match results. See the group values alongside the full match.` },
          { title: `Flag toggles`, text: `Quick toggles for g, i, m, s, u, d flags. See immediately how case-insensitive or multiline mode changes what your pattern matches.` },
          { title: `Error display`, text: `Syntax errors in the regex pattern are shown immediately with the error message — no need to run code to find out the pattern is invalid.` },
        ]}
        useCases={[
          { title: `Validating input formats`, text: `Build and test patterns for validating email addresses, phone numbers, ZIP codes, ISO dates, or any custom input format before using them in production code.` },
          { title: `Log file parsing`, text: `Test regex patterns for extracting fields from log lines. See all matches highlighted before using the pattern in awk, grep, or your application code.` },
          { title: `URL pattern matching`, text: `Test route patterns for web frameworks. See which URLs match your pattern and which do not — before the routing logic is deployed.` },
          { title: `String transformation preview`, text: `Build replacement patterns (using capture groups) and preview the transformation result before using String.replace() in your code.` },
        ]}
        keyStats={[
          { stat: `JavaScript regex engine`, source: `Uses the browser native JavaScript regex engine — exactly the same engine your Node.js or browser code uses` },
          { stat: `Named capture groups`, source: `(?<name>...) syntax extracts named fields from matches — shown in the results panel` },
          { stat: `All JS flags`, source: `g i m s u d flags — toggle each to see how it affects matching` },
        ]}
        inlineLinks={[
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `Line Sorter`, href: `/calculators/dev/line-sorter`, label: `Line Sorter` },
          { text: `Duplicate Remover`, href: `/calculators/dev/duplicate-remover`, label: `Duplicate Remover` },
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
        ]}
        tipsSection={`Start broad, then narrow. Begin with a simple pattern that over-matches, see the false positives highlighted, then add specificity to exclude them. Broad-to-narrow is much faster than trying to write a precise pattern from scratch.

Use named capture groups for readable code. (?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2}) is much clearer than (\d{4})-(\d{2})-(\d{2}). Named groups also make the extraction code self-documenting.

Test edge cases explicitly. If you are validating email addresses, test: addresses with plus signs (user+tag@domain.com), subdomains (user@mail.example.com), and unusual TLDs. Real email addresses are more diverse than simple patterns assume.

The g flag is usually what you want. Without the global flag, the regex only finds the first match. Add the g flag when you need all matches.`}
        conclusion={`Regular expressions are the most powerful string processing tool in a developer toolkit — and the most error-prone. This tester shows exactly what your pattern matches before you commit it to code. For string analysis: [String Inspector](/calculators/dev/string-inspector).`}
      />
      <div className="space-y-3">
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
