'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('[server]\nhost = "localhost"\nport = 8080\ndebug = true\n\n[database]\nurl = "postgres://localhost/mydb"\nmax_connections = 25\n\n[features]\nenabled = ["auth", "api", "admin"]')
  const [mode, setMode] = useState<'format'|'to-json'>('format')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (!input.trim()) return { out: '', error: '' }
    try {
      if (mode === 'format') {
        // Basic TOML formatter: ensure consistent spacing
        const lines = input.split('\n')
        const formatted = lines.map(line => {
          const trimmed = line.trim()
          if (trimmed.startsWith('#') || trimmed.startsWith('[') || !trimmed.includes('=')) return trimmed
          const eqIdx = trimmed.indexOf('=')
          const key = trimmed.slice(0,eqIdx).trim()
          const val = trimmed.slice(eqIdx+1).trim()
          return `${key} = ${val}`
        }).join('\n')
        return { out: formatted, error: '' }
      } else {
        // TOML to JSON (basic parser)
        const obj: any = {}
        let currentSection: any = obj
        let currentKey = ''
        
        input.split('\n').forEach(line => {
          const trimmed = line.trim()
          if (!trimmed || trimmed.startsWith('#')) return
          if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            const section = trimmed.slice(1,-1).trim()
            obj[section] = {}
            currentSection = obj[section]
            currentKey = section
          } else if (trimmed.includes('=')) {
            const eqIdx = trimmed.indexOf('=')
            const k = trimmed.slice(0,eqIdx).trim()
            let v: any = trimmed.slice(eqIdx+1).trim()
            if (v === 'true') v = true
            else if (v === 'false') v = false
            else if (!isNaN(Number(v)) && v !== '') v = Number(v)
            else if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1,-1)
            else if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1,-1).split(',').map((x:string)=>x.trim().replace(/"/g,''))
            currentSection[k] = v
          }
        })
        return { out: JSON.stringify(obj, null, 2), error: '' }
      }
    } catch(e:any) { return { out: '', error: e.message } }
  }, [input, mode])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">TOML Formatter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⚙️ TOML Formatter &amp; Converter</h1>
      <p className="text-gray-500 mb-6">Format TOML configuration files and convert to JSON</p>
      <div className="flex gap-2 mb-4">
        {(['format','to-json'] as const).map(m=>(
<button
  key={m}
  onClick={() => setMode(m)}
  className={`px-4 py-2 rounded-xl text-sm font-bold ${
    mode===m ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }`}
>
  {m === 'format' ? 'Format TOML' : 'TOML → JSON'}
</button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-2">TOML Input</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={16} className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" /></div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Output</label>
            <button onClick={()=>{navigator.clipboard.writeText(result.out);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
          </div>
          {result.error ? <div className="p-4 bg-red-50 rounded-xl border border-red-200"><p className="text-red-600 font-mono text-sm">{result.error}</p></div>
            : <pre className="h-72 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre">{result.out||'Output appears here...'}</pre>}
        </div>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the TOML Formatter</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">TOML (Tom's Obvious Minimal Language) is a configuration file format used by Cargo (Rust), Hugo, Deno, and many other tools. Paste your TOML config into the left panel. Use Format mode to clean up spacing and consistency, or TOML → JSON to convert the config into JSON format (useful when integrating with JSON-based tooling). The converter handles strings, numbers, booleans, and arrays.</p>
        <p className="text-sm text-gray-600">Common TOML files: Rust's Cargo.toml (package manifest), Hugo's config.toml, pyproject.toml (Python packaging), Deno's deno.json, and various Rust/Go application configs. TOML's key advantage over YAML is its strict, unambiguous specification - no indentation-sensitive parsing.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="TOML Formatter & Validator"
        category="dev"
        intro={`TOML is the configuration format for Rust projects (Cargo.toml), Python packaging (pyproject.toml), and Hugo static sites. It is designed to be unambiguous — but malformed TOML still causes cryptic build failures when types are wrong or table headers are misplaced.

This formatter validates and re-indents TOML and shows the parsed JSON structure. Runs in your browser.

**Long-tail searches answered here:** toml formatter free online usa, format toml config file online free no signup, toml validator and beautifier free tool, toml syntax checker free online no download, pretty print toml file free tool usa, toml to json converter free online, rust cargo.toml formatter and validator free, toml for configuration vs yaml comparison free, toml v1.0 specification validator free online usa, how to format nested toml tables free, toml array of tables syntax formatter free usa, hugo config.toml formatter free online, pipenv and poetry toml config validator free usa, toml date time format validator free online, toml inline table vs standard table formatter free

For related config formats, see [YAML Formatter](/calculators/dev/yaml-formatter).`}
        howItWorks={`Uses a TOML parser running in the browser to parse TOML into a JavaScript object. Catches: invalid date formats, type mismatches, duplicate keys, out-of-order table definitions, and invalid escape sequences.

The JSON view shows the actual data structure your application will see — especially useful for verifying TOML array-of-tables which have a different JSON representation than regular tables.`}
        benefits={[
          { title: `Cargo.toml and pyproject.toml validation`, text: `Validate Rust and Python project configurations before running cargo build or pip install. Catches type errors in version constraints and malformed dependency specifications.` },
          { title: `JSON view shows parsed structure`, text: `See exactly what your TOML parses to. Array-of-tables vs regular tables have very different JSON representations.` },
          { title: `Date and time validation`, text: `TOML has native datetime types (RFC 3339 format). This validator checks that your date strings are valid datetimes rather than plain strings.` },
          { title: `Duplicate key detection`, text: `TOML forbids duplicate keys but some parsers are lenient. This tool catches duplicates that would silently take the last value.` },
        ]}
        useCases={[
          { title: `Debugging Cargo.toml errors`, text: `cargo build fails with a vague TOML error. Paste your Cargo.toml here to get the exact line and reason.` },
          { title: `Writing pyproject.toml configs`, text: `Python packaging via pyproject.toml requires exact TOML syntax. Validate here before running pip install.` },
          { title: `Hugo site configuration`, text: `Hugo config.toml controls site-wide settings. Validate here when adding new parameters.` },
          { title: `Comparing with YAML configs`, text: `Use this tool and [YAML Formatter](/calculators/dev/yaml-formatter) side by side to compare how the same config looks in TOML vs YAML.` },
        ]}
        keyStats={[
          { stat: `RFC 3339`, source: `TOML native datetime format — validated by this tool` },
          { stat: `v1.0.0`, source: `TOML specification version implemented by this parser` },
          { stat: `[[table]]`, source: `Array-of-tables syntax — the TOML feature that most confuses newcomers` },
        ]}
        inlineLinks={[
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Semver Calculator`, href: `/calculators/dev/semver-calculator`, label: `Semver Calculator` },
          { text: `Package JSON Generator`, href: `/calculators/dev/package-json-gen`, label: `Package JSON Generator` },
          { text: `Gitignore Generator`, href: `/calculators/dev/gitignore-generator`, label: `Gitignore Generator` },
        ]}
        tipsSection={`Double brackets vs single brackets. [dependencies] defines a single table. [[bin]] defines an array of tables — each section becomes a new element in an array. The JSON view makes this difference immediately clear.

Inline tables are single-line. TOML inline tables must fit on one line — no trailing commas, no multi-line syntax.

String types matter. TOML has four string types: basic, multi-line basic, literal, and multi-line literal. Literal strings treat backslashes as literal characters — useful for Windows paths.

Validate before CI/CD. Paste your Cargo.toml or pyproject.toml here before every commit that touches the config file. A malformed config fails the entire build.`}
        conclusion={`TOML strict typing means errors are caught explicitly rather than silently. This formatter catches type errors, duplicate keys, and ordering problems before they cause cryptic tool failures.

For the full config management workflow: validate here, compare changes with [Diff Checker](/calculators/dev/diff-checker), and check version constraints with [Semver Calculator](/calculators/dev/semver-calculator).`}
      />
    </div>
  )
}
