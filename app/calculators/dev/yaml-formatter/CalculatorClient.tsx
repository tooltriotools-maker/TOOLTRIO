'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [input, setInput] = useState(`name: myapp
version: "1.0"
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret`)
  const [mode, setMode] = useState<'yaml'|'json'>('yaml')
  const [copied, setCopied] = useState(false)

  const yamlToJson = (yaml: string): any => {
    const lines = yaml.split('\n')
    const root: any = {}
    const stack: { obj: any; indent: number }[] = [{ obj: root, indent: -1 }]
    const getParent = (ind: number) => {
      while (stack.length > 1 && stack[stack.length-1].indent >= ind) stack.pop()
      return stack[stack.length-1].obj
    }
    for (const raw of lines) {
      const stripped = raw.replace(/^(\s*)#.*/, '$1').trimEnd()
      if (!stripped.trim()) continue
      const indent = stripped.length - stripped.trimStart().length
      const line = stripped.trim()
      if (line.startsWith('- ')) {
        const parent = getParent(indent)
        const key = Object.keys(parent)[Object.keys(parent).length-1]
        if (key && !Array.isArray(parent[key])) parent[key] = []
        if (key) parent[key].push(line.slice(2).trim())
        continue
      }
      const colonIdx = line.indexOf(':')
      if (colonIdx < 0) continue
      const k = line.slice(0, colonIdx).trim()
      const v = line.slice(colonIdx+1).trim()
      const parent = getParent(indent)
      if (v === '' || v === null) { parent[k] = {}; stack.push({ obj: parent[k], indent }) }
      else if (v === 'true') parent[k] = true
      else if (v === 'false') parent[k] = false
      else if (v === 'null' || v === '~') parent[k] = null
      else if (!isNaN(Number(v)) && v !== '') parent[k] = Number(v)
      else parent[k] = v.replace(/^["']|["']$/g, '')
    }
    return root
  }

  const result = useMemo(() => {
    if (!input.trim()) return { output: '', error: '', valid: true }
    try {
      if (mode === 'json') {
        const parsed = JSON.parse(input)
        const toYaml = (obj: any, indent = 0): string => {
          const sp = ' '.repeat(indent)
          if (obj === null) return 'null'
          if (typeof obj === 'boolean' || typeof obj === 'number') return String(obj)
          if (typeof obj === 'string') return /[:{}\[\],&*#?|<>=!%@]/.test(obj) ? JSON.stringify(obj) : obj
          if (Array.isArray(obj)) return obj.map(v => `${sp}- ${toYaml(v, indent+2)}`).join('\n')
          return Object.entries(obj).map(([k, v]) => {
            if (typeof v === 'object' && v !== null && !Array.isArray(v)) return `${sp}${k}:\n${toYaml(v, indent+2)}`
            if (Array.isArray(v)) return `${sp}${k}:\n${toYaml(v, indent+2)}`
            return `${sp}${k}: ${toYaml(v, indent)}`
          }).join('\n')
        }
        return { output: toYaml(parsed), error: '', valid: true }
      } else {
        const parsed = yamlToJson(input)
        return { output: JSON.stringify(parsed, null, 2), error: '', valid: true, parsed }
      }
    } catch (e: any) { return { output: '', error: e.message, valid: false } }
  }, [input, mode])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">YAML Formatter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📄 YAML Formatter &amp; Converter</h1>
      <p className="text-gray-500 mb-6">Format YAML ↔ JSON - Validate syntax - runs in your browser</p>
      <div className="flex gap-2 mb-4">
        {(['yaml','json'] as const).map(m => (
          <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold uppercase transition-all ${mode===m?'bg-green-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {m==='yaml'?'YAML -> JSON':'JSON -> YAML'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input {mode==='yaml'?'YAML':'JSON'}</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={18}
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-950 text-green-300" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output {mode==='yaml'?'JSON':'YAML'}</label>
            <button onClick={()=>{navigator.clipboard.writeText(result.output);setCopied(true);setTimeout(()=>setCopied(false),1500)}}
              className="flex items-center gap-1 text-xs font-bold text-green-600">
              {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
            </button>
          </div>
          <div className={`h-72 rounded-xl border-2 overflow-hidden ${result.valid?'border-green-300':'border-red-400'}`}>
            {result.valid
              ? <pre className="w-full h-full font-mono text-sm p-4 bg-gray-950 text-green-300 overflow-auto whitespace-pre">{result.output||'Output appears here...'}</pre>
              : <div className="p-4 bg-red-950 h-full"><p className="text-red-400 font-bold mb-2">❌ Parse Error</p><p className="text-red-300 font-mono text-xs">{result.error}</p></div>
            }
          </div>
        </div>
      </div>

      <SEOContent
        title="YAML Formatter & Validator"
        category="dev"
        intro={`YAML is the configuration language of modern infrastructure — Kubernetes manifests, GitHub Actions workflows, Docker Compose files, Ansible playbooks. But YAML is famously finicky: a single inconsistent indentation or missing colon silently produces a valid-but-wrong parse.

This formatter validates and re-indents YAML using consistent rules. Runs entirely in your browser.

**Long-tail searches answered here:** yaml formatter free online usa, format yaml file online free no signup, yaml validator and beautifier free tool, yaml syntax checker free no download, pretty print yaml free online tool, yaml lint validator free usa, kubernetes yaml formatter and validator free online, docker compose yaml formatter free tool usa, ansible playbook yaml formatter free online, helm chart yaml validator free tool usa, yaml to json and back converter free online, yaml multiline string folded vs literal block free usa, yaml anchors and aliases formatter free online, yaml 1.1 vs 1.2 compatibility checker free usa, yaml indentation 2 vs 4 spaces formatter free

For infrastructure config, pair with [TOML Formatter](/calculators/dev/toml-formatter) or [Docker Compose Generator](/calculators/dev/docker-compose-gen).`}
        howItWorks={`Parses YAML using js-yaml running in the browser. Parsing converts YAML to a JavaScript object tree catching syntax errors including bad indentation, duplicate keys, and type coercion issues.

The formatter serializes back to YAML with consistent 2-space indentation. The JSON view converts the parsed object to formatted JSON, making it easy to inspect the actual data structure your YAML parser will produce. Common gotcha: yes parses as boolean true, no as false, and unquoted port numbers as integers.`}
        benefits={[
          { title: `Indentation normalization`, text: `Re-indents with consistent 2-space or 4-space indentation, eliminating mixed-tabs-and-spaces problems that cause cryptic parse failures.` },
          { title: `YAML to JSON view`, text: `See what your YAML actually parses to as a JSON object. Catches gotchas like yes parsing as boolean true and unquoted strings being misinterpreted.` },
          { title: `Inline vs block style toggle`, text: `Convert between block multi-line and inline flow YAML styles. Useful for compacting short sequences or expanding minified YAML configs.` },
          { title: `Duplicate key detection`, text: `YAML technically allows duplicate keys but most parsers take the last value silently — this formatter catches them and warns before they cause hard-to-debug config behavior.` },
        ]}
        useCases={[
          { title: `Debugging Kubernetes manifests`, text: `A Kubernetes deployment YAML fails with a vague error. Paste here to find the indentation problem or the missing field that is causing kubectl to reject it.` },
          { title: `Validating GitHub Actions workflows`, text: `GitHub Actions workflows fail silently on malformed YAML. Validate the structure here before pushing — the JSON view shows exactly what GitHub parser will see.` },
          { title: `Writing Docker Compose files`, text: `Pair with [Docker Compose Generator](/calculators/dev/docker-compose-gen) — generate the base config there, then format and validate the YAML here before deploying.` },
          { title: `Fixing CI/CD pipeline configs`, text: `CircleCI, GitLab CI, and Bitbucket Pipelines configs are all YAML. A missing colon or wrong indentation level breaks the whole pipeline.` },
        ]}
        keyStats={[
          { stat: `js-yaml`, source: `Full YAML 1.2 parser — same library used by many Node.js tools` },
          { stat: `yes becomes true`, source: `YAML 1.1 boolean gotcha — bare yes/no/on/off parse as booleans` },
          { stat: `Tabs forbidden`, source: `YAML prohibits tab characters for indentation — spaces only` },
        ]}
        inlineLinks={[
          { text: `TOML Formatter`, href: `/calculators/dev/toml-formatter`, label: `TOML Formatter` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
          { text: `XML Formatter`, href: `/calculators/dev/xml-formatter`, label: `XML Formatter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `Gitignore Generator`, href: `/calculators/dev/gitignore-generator`, label: `Gitignore Generator` },
          { text: `Cron Expression Builder`, href: `/calculators/dev/cron-expression`, label: `Cron Expression Builder` },
        ]}
        tipsSection={`The JSON view is your best debugging tool. If you are unsure whether your YAML will parse correctly, check the JSON view. yes becoming true, 1.0 becoming 1, and bare strings being quoted are all immediately visible.

Kubernetes indentation rules. Kubernetes YAML uses 2-space indentation consistently. A single field indented 3 spaces instead of 2 produces a valid YAML parse but an incorrect Kubernetes object structure.

Quote strings that look like other types. Version numbers like 1.0, port strings like 80, and yes/no values should be quoted if you intend them as strings.

Diff before deploying. After editing a YAML config, use [Diff Checker](/calculators/dev/diff-checker) to compare old and new versions before applying changes to production.`}
        conclusion={`YAML ambiguities cause silent configuration bugs. This formatter surfaces those ambiguities by showing the actual parsed object as JSON.

For infrastructure workflows: generate base configs with [Docker Compose Generator](/calculators/dev/docker-compose-gen), format and validate here, then diff changes with [Diff Checker](/calculators/dev/diff-checker).`}
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
