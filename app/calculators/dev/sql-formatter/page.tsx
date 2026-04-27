import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'SQL Formatter & Beautifier — Free Online, Runs in Browser',
  description: 'Format and beautify SQL queries with proper indentation and keyword casing. Supports MySQL, PostgreSQL, SQLite, and T-SQL. Runs entirely in your browser.',
  slug: 'sql-formatter',
  keywords: ['sql formatter online free','sql query beautifier','mysql formatter browser','postgresql formatter free','sql pretty printer online','format sql query indentation free','sql code formatter no install','sql syntax formatter browser'],
})

const faqs = [
  { question: "Why would I format a SQL query — does it change the behavior?", answer: `Formatting only changes whitespace — it does not affect query execution. A SQL parser treats SELECT id FROM users WHERE active=1 and the same query spread across 6 indented lines identically. The reasons to format: ORM-generated queries (Hibernate, Sequelize, ActiveRecord) produce single-line output that is nearly impossible to read and debug. Query logs from production databases are often single-line. Code reviews are much easier with consistent indentation. Debugging complex joins is dramatically faster when the structure is visually clear.` },
  { question: "Does this formatter support CTEs, window functions, and subqueries?", answer: `Yes. The formatter handles modern SQL: Common Table Expressions (WITH ... AS), window functions (OVER (PARTITION BY ... ORDER BY ...)), subqueries in SELECT and FROM clauses, CASE WHEN expressions, multiple JOINs with ON conditions, and UNION/INTERSECT/EXCEPT. Subqueries and CTEs are indented relative to their containing clause. If a complex query produces unexpected formatting, try pasting just the problematic subquery to isolate the issue.` },
  { question: "Is it safe to paste production SQL queries here?", answer: `Yes — this tool runs entirely in your browser. The SQL you paste is processed by JavaScript on your device; nothing is sent to any server. This matters because production queries often contain table names, column names, and sometimes literal data values that reveal your schema. Server-based formatters log these requests. Using a browser-based formatter is the correct choice for any query touching real data or exposing your database structure.` },
  { question: "What is the difference between uppercase and lowercase keyword formatting?", answer: `SQL keywords (SELECT, FROM, WHERE, JOIN) are case-insensitive — select and SELECT execute identically. Uppercasing SQL keywords exists to visually distinguish reserved words from identifiers (table names, column names). Most style guides and code formatters default to uppercase keywords. Some teams prefer lowercase for cleaner visual appearance. This tool defaults to uppercase but lets you choose — pick whichever matches your team's existing conventions.` },
  { question: "How should I format a SQL query longer than my screen width?", answer: `The convention: start each major clause (SELECT, FROM, JOIN, WHERE, GROUP BY, ORDER BY, HAVING, LIMIT) on a new line at the same indentation level, with continuation items indented one level further. SELECT columns should each be on their own line for queries with more than 2-3 columns. JOIN conditions go on the line after the JOIN keyword, indented. WHERE clause AND/OR conditions start each on a new line. This formatter applies these conventions automatically.` },
  { question: "Can I format a SQL query that has syntax errors?", answer: `It depends on the error. Minor issues like non-standard functions may format fine since the formatter works mostly on token boundaries. Serious errors — missing parentheses, unmatched quotes, invalid keywords — will likely cause garbled or no output. Fix obvious syntax errors first, then format. The formatter often reveals structural issues that were invisible in the single-line original. If a query formats correctly but fails in the database, use EXPLAIN or the database error output to debug the semantic issue.` },
  { question: "What other database and data tools are on this site?", answer: `The JSON Formatter is the natural companion for API development — format both the SQL query and the JSON response. The CSV to JSON tool converts database exports (typically CSV) to JSON for API use. The JSON to CSV tool converts API responses back to spreadsheet format. The Diff Checker compares two versions of a migration script before running it. The SQL JOIN Visualizer explains JOIN types with diagrams. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'SQL Formatter & Beautifier — Free Online, Runs in Browser',
    description: 'Format and beautify SQL queries with proper indentation and keyword casing. Supports MySQL, PostgreSQL, SQLite, and T-SQL. Runs entirely in your browser.',
    slug: 'sql-formatter',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
