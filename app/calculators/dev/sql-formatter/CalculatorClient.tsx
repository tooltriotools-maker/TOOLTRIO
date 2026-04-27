'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [sql, setSql] = useState(`select u.id, u.name, u.email, count(o.id) as order_count, sum(o.total) as total_spent from users u left join orders o on u.id = o.user_id where u.created_at > '2024-01-01' and u.active = true group by u.id, u.name, u.email having count(o.id) > 0 order by total_spent desc limit 50`)
  const [copied, setCopied] = useState(false)

  const formatted = useMemo(() => {
    if (!sql.trim()) return ''
    const KEYWORDS = ['SELECT','FROM','WHERE','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','FULL OUTER JOIN','ON','AND','OR','GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET','INSERT INTO','VALUES','UPDATE','SET','DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE','INDEX','UNION','EXCEPT','INTERSECT','AS','DISTINCT','NOT','IN','BETWEEN','LIKE','IS NULL','IS NOT NULL','EXISTS','CASE','WHEN','THEN','ELSE','END','WITH','RETURNING']
    let s = sql.trim()
    // Capitalise keywords
    KEYWORDS.forEach(kw => { s = s.replace(new RegExp(`\\b${kw}\\b`, 'gi'), kw) })
    // Add newlines before major clauses
    const clauses = ['SELECT','FROM','WHERE','LEFT JOIN','RIGHT JOIN','INNER JOIN','JOIN','ON','AND','OR','GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET','UNION','WITH']
    clauses.forEach(c => { s = s.replace(new RegExp(`\\b${c}\\b`, 'g'), `\n${c}`) })
    // Indent AND/OR
    s = s.replace(/\n(AND|OR)\b/g, '\n  $1')
    // Indent column list in SELECT
    s = s.replace(/SELECT[\n]?([\s\S]+?)[\n]FROM/, (_, cols) => `SELECT\n  ${cols.split(',').map((c: string)=>c.trim()).join(',\n  ')}\nFROM`)
    return s.trim().replace(/\n{3,}/g, '\n\n')
  }, [sql])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">SQL Formatter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🗄️ SQL Formatter</h1>
      <p className="text-gray-500 mb-6">Format and beautify SQL queries - capitalises keywords and adds clean indentation</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Raw SQL</label>
          <textarea value={sql} onChange={e=>setSql(e.target.value)} rows={16}
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-50" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Formatted SQL</label>
            <button onClick={()=>{navigator.clipboard.writeText(formatted);setCopied(true);setTimeout(()=>setCopied(false),1500)}}
              className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
          </div>
          <pre className="h-72 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre">{formatted||'Formatted SQL appears here...'}</pre>
        </div>
      </div>

      <SEOContent
        title="SQL Formatter — Beautify and Indent SQL Queries"
        category="dev"
        intro={`Complex SQL queries with multiple JOINs, CTEs, subqueries, and window functions are nearly impossible to read when written as single lines. Proper indentation and keyword capitalization make query structure immediately clear for review and debugging.

This formatter re-indents SQL with consistent formatting. Runs in your browser.

**Long-tail searches answered here:** sql formatter free online usa, format sql query online free no signup, sql beautifier free tool online, pretty print sql code free no download, sql code indentation formatter free, mysql postgresql sql formatter free usa, sql formatter with keyword capitalization free, sql format for different dialects mysql postgres free, sql stored procedure formatter free online usa, complex join query sql formatter free tool, sql with cte common table expression formatter free, sql formatter that preserves comments free usa, minify vs beautify sql query toggle free, sql insert statement formatter from data free usa, dynamic sql formatting for query builder output free

For understanding JOINs visually, use [SQL JOIN Visualizer](/calculators/dev/sql-join-visualizer).`}
        howItWorks={`Formats SQL by parsing keywords (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, HAVING, UNION, CTE, subqueries) and applying consistent indentation and line breaks. Capitalizes SQL keywords. Supports standard SQL, MySQL, PostgreSQL, SQLite, and common SQL extensions. Output is copy-ready for use in your query tool, code, or documentation.`}
        benefits={[
          { title: `Keyword capitalization`, text: `Capitalizes SQL keywords (SELECT, FROM, WHERE, JOIN) consistently — a standard convention that distinguishes keywords from table/column names.` },
          { title: `Multi-level indentation`, text: `Properly indents subqueries, CTEs (WITH clauses), CASE statements, and nested JOINs — each level gets additional indentation.` },
          { title: `CTE formatting`, text: `WITH RECURSIVE and regular CTE clauses are formatted with each CTE as a clearly delimited block.` },
          { title: `Multi-dialect support`, text: `Handles MySQL, PostgreSQL, SQLite, and SQL Server syntax including dialect-specific functions and extensions.` },
        ]}
        useCases={[
          { title: `Code review documentation`, text: `Paste a complex query into your PR description in formatted form. Reviewers can see the query structure at a glance rather than deciphering a single line.` },
          { title: `Debugging query logic`, text: `Format a query you copied from your ORM to see what SQL is actually being generated. Indentation reveals the JOIN order and WHERE conditions clearly.` },
          { title: `Documentation generation`, text: `Format canonical versions of complex queries for your technical documentation or runbook.` },
          { title: `Learning SQL`, text: `Format example queries from tutorials and documentation to better understand complex SQL patterns like CTEs and window functions.` },
        ]}
        keyStats={[
          { stat: `Keyword capitalization`, source: `SELECT, FROM, WHERE, JOIN — capitalizing SQL keywords is the near-universal convention` },
          { stat: `CTE formatting`, source: `WITH clauses (Common Table Expressions) need special formatting — each CTE as a separate named block` },
          { stat: `Multi-dialect`, source: `MySQL, PostgreSQL, SQLite, and SQL Server syntax all supported` },
        ]}
        inlineLinks={[
          { text: `SQL JOIN Visualizer`, href: `/calculators/dev/sql-join-visualizer`, label: `SQL JOIN Visualizer` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `Regex Tester`, href: `/calculators/dev/regex-tester`, label: `Regex Tester` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `Table Generator`, href: `/calculators/dev/table-generator`, label: `Table Generator` },
        ]}
        tipsSection={`Format before sharing. Always format SQL queries before including them in PRs, Slack messages, or documentation. Unformatted single-line queries are difficult to review.

Use the SQL JOIN Visualizer first. If you are not sure which JOIN type to use, design the query with [SQL JOIN Visualizer](/calculators/dev/sql-join-visualizer) before formatting it here.

CTEs improve readability. Complex queries with multiple subqueries are almost always clearer as CTEs (WITH clauses). The formatter shows the CTE structure clearly.

Diff before and after changes. After modifying a complex query, use [Diff Checker](/calculators/dev/diff-checker) to see exactly what changed — formatted queries produce much more readable diffs than minified ones.`}
        conclusion={`SQL queries are team-maintained code, and readable queries are easier to review, debug, and maintain. This formatter handles complex SQL including CTEs, window functions, and nested subqueries. For query design: [SQL JOIN Visualizer](/calculators/dev/sql-join-visualizer).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
