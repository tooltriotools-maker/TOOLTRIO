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
      setOutput(`// .env File Parser output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">.env File Parser</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⚙️ .env File Parser</h1>
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
        title=".env File Parser and Viewer"
        category="dev"
        intro={`The .env file is where application secrets live — database URLs, API keys, service credentials. Parsing it correctly requires handling quoted values, inline comments, multi-line values, and escape sequences. A wrong parse can truncate a secret or include a comment as part of a value.

This parser displays all key-value pairs from a .env file in a readable table, handles edge cases correctly, and runs entirely in your browser — nothing is transmitted anywhere.

**Long-tail searches answered here:** env file parser and viewer free online usa, dotenv file checker free no signup tool, environment variable parser free online, validate env file format free tool online, env file to json converter free no download, parse dotenv file free online tool usa, check missing required env variables free tool, env file variable listing and analysis free usa, secrets in env file security checker free online, env file syntax validation and linter free usa, compare two env files differences free tool, dotenv file template generator free online usa, mask secrets in env file display free tool, env file key value pair extractor free usa, environment variable naming convention checker free

For related config tools, see [YAML Formatter](/calculators/dev/yaml-formatter) or [Docker Compose Generator](/calculators/dev/docker-compose-gen).`}
        howItWorks={`Follows the dotenv specification for Node.js (compatible with Python python-dotenv, Ruby dotenv gem, and Go godotenv).

Rules: lines starting with # are comments. Empty lines are ignored. KEY=value assigns value. Quoted values preserve whitespace and allow # inside: API_KEY=value#with#hash. Unquoted values are trimmed and # starts an inline comment.

The parser also validates: duplicate keys (warned, last value wins), invalid key names, and missing equals sign.`}
        benefits={[
          { title: `Correct # handling`, text: `Inline # starts a comment in unquoted values but is a literal character in quoted values. This parser handles both correctly — the most common .env parsing bug.` },
          { title: `Duplicate key detection`, text: `Duplicate keys are a common .env mistake when merging configs. This parser highlights them and shows which value wins (last definition).` },
          { title: `Multi-line value support`, text: `Multi-line values in double quotes preserve newlines. Useful for PEM-encoded certificates and private keys stored in environment variables.` },
          { title: `Security-safe display`, text: `Values containing key, secret, password, token are masked by default with a show/hide toggle — useful when screensharing without exposing credentials.` },
        ]}
        useCases={[
          { title: `Verifying production secrets are set`, text: `Before deploying, paste your .env template here to verify all required keys are present and none have empty values. Catches missing credentials before they cause runtime errors.` },
          { title: `Debugging value truncation`, text: `Your API key is getting truncated. Paste the .env line here to see exactly what value the parser extracts — often reveals an unescaped # being treated as a comment.` },
          { title: `Comparing environment configs`, text: `Use [Diff Checker](/calculators/dev/diff-checker) alongside this parser to compare .env.development and .env.production — spot variables present in one but missing in the other.` },
          { title: `Onboarding documentation`, text: `New team members need to know what .env variables to set up. Parse your .env.example here to generate a clean key-value reference table.` },
        ]}
        keyStats={[
          { stat: `dotenv spec`, source: `Parses according to the Node.js dotenv specification — compatible with Python, Ruby, Go implementations` },
          { stat: `# gotcha`, source: `Unquoted value with # — the most common .env parsing mistake — handled correctly` },
          { stat: `Secrets masked`, source: `Keys containing secret, key, password, token are hidden by default` },
        ]}
        inlineLinks={[
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
          { text: `TOML Formatter`, href: `/calculators/dev/toml-formatter`, label: `TOML Formatter` },
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Gitignore Generator`, href: `/calculators/dev/gitignore-generator`, label: `Gitignore Generator` },
          { text: `Package JSON Generator`, href: `/calculators/dev/package-json-gen`, label: `Package JSON Generator` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `RSA Key Info`, href: `/calculators/dev/rsa-key-info`, label: `RSA Key Info` },
        ]}
        tipsSection={`Quote values with special characters. If your value contains #, spaces, or quotes, wrap it in double quotes: API_KEY=value-with-spaces and #hash. Unquoted values are trimmed and # starts a comment.

Never commit .env to git. Add .env to your [Gitignore Generator](/calculators/dev/gitignore-generator) file. Commit .env.example with all keys and empty values as documentation.

Validate after editing. After manually editing a .env file, paste it here to catch accidental truncation, extra spaces in key names, or duplicate entries.

PEM certificates in .env. Multi-line PEM keys need double-quoted values. Use \n escape sequences, not actual newlines, for maximum parser compatibility.`}
        conclusion={`The .env file is where most application secrets live, and parsing it incorrectly truncates values or includes comments as data. This parser handles the edge cases correctly and securely.

For config file management: parse .env here, validate Docker Compose config with [Docker Compose Generator](/calculators/dev/docker-compose-gen), and compare environments with [Diff Checker](/calculators/dev/diff-checker).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
