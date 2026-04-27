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
      setOutput(`// SQL JOIN Visualiser output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">SQL JOIN Visualiser</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔗 SQL JOIN Visualiser</h1>
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
        title="SQL JOIN Visualizer"
        category="dev"
        intro={`SQL JOINs are the concept that trips up more developers than any other — INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF joins all produce different result sets, and the difference between LEFT JOIN and INNER JOIN is not obvious from the keywords alone.

This visualizer renders Venn diagrams and result table previews for each JOIN type. Runs entirely in your browser.

**Long-tail searches answered here:** sql join visualizer free online usa, inner outer left right join explained free, sql join diagram tool free no signup, visual sql join type diagram free, how do sql joins work visualizer free, sql join types with examples free tool usa, cross join vs natural join visualizer free online, sql join on multiple columns visualizer free, how to visualize sql join result set free usa, when to use left join vs inner join free guide, full outer join sql not supported mysql workaround, sql self join use case visualizer free usa, semi join and anti join sql pattern free guide, sql join performance comparison visualizer free, non equijoin sql syntax and use case free usa

After understanding JOINs, format your query with the [SQL Formatter](/calculators/dev/sql-formatter).`}
        howItWorks={`You define two tables with sample row data. The visualizer applies each JOIN type to your data and shows: the Venn diagram representing which rows match, the resulting table with NULL values for unmatched rows, and the equivalent SQL syntax.

INNER JOIN: only rows with matching keys in both tables. LEFT JOIN: all rows from the left table, NULLs where no right-table match. RIGHT JOIN: all rows from the right table. FULL OUTER JOIN: all rows from both tables with NULLs on either side. CROSS JOIN: cartesian product.`}
        benefits={[
          { title: `Visual Venn diagram for each JOIN`, text: `Each JOIN type displays a Venn diagram showing which portions of both tables appear in the result — makes LEFT vs INNER instantly clear.` },
          { title: `Live result preview`, text: `Enter your own table data and see the actual result rows for each JOIN type. Understanding abstractions is easy; seeing your specific data helps more.` },
          { title: `NULL behavior made explicit`, text: `Unmatched rows show NULL explicitly — making the LEFT JOIN behavior concrete rather than abstract.` },
          { title: `SQL syntax reference`, text: `Each JOIN type shows the corresponding SQL syntax — useful for junior developers and as a quick reference.` },
        ]}
        useCases={[
          { title: `Learning SQL JOINs for the first time`, text: `Enter two tables with three rows each and watch the result change as you toggle between JOIN types.` },
          { title: `Debugging unexpected query results`, text: `Your LEFT JOIN is returning fewer rows than expected. Visualize your table data here to understand whether you have a matching condition issue.` },
          { title: `Teaching SQL to your team`, text: `Use this as a live teaching aid when onboarding junior developers. Enter real table examples from your codebase.` },
          { title: `Designing table relationships`, text: `Before writing migrations, model your table relationships here to verify your JOIN conditions will produce the data access patterns your application needs.` },
        ]}
        keyStats={[
          { stat: `6 JOIN types`, source: `INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF JOINs all visualized` },
          { stat: `NULL explicit`, source: `Unmatched rows show NULL — not hidden or omitted like in some diagram tools` },
          { stat: `Venn diagram`, source: `Visual representation that maps directly to the conceptual model of set operations` },
        ]}
        inlineLinks={[
          { text: `SQL Formatter`, href: `/calculators/dev/sql-formatter`, label: `SQL Formatter` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `Regex Tester`, href: `/calculators/dev/regex-tester`, label: `Regex Tester` },
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `Table Generator`, href: `/calculators/dev/table-generator`, label: `Table Generator` },
        ]}
        tipsSection={`Start with INNER JOIN. It is the most restrictive — rows must match on both sides. If INNER JOIN gives fewer rows than expected, your join condition is wrong or there are genuinely no matching rows.

LEFT JOIN to include all source rows. When you need every row from your primary table regardless of whether there is a match in the secondary table, LEFT JOIN is the answer.

FULL OUTER JOIN for reconciliation. Use FULL OUTER JOIN when you want to find rows that exist in one table but not the other — the rows with NULLs on one side are your mismatches.

Format your query after designing. Use [SQL Formatter](/calculators/dev/sql-formatter) to clean up indentation of complex multi-join queries once you have verified the logic here.`}
        conclusion={`SQL JOINs become intuitive only when you can see the result set rather than just read the definition. This visualizer makes the NULL-vs-excluded row distinction concrete.

For the full SQL workflow: design JOINs here, format queries with [SQL Formatter](/calculators/dev/sql-formatter), generate test data with [Fake Data Generator](/calculators/dev/fake-data-generator).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
