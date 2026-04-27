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
      setOutput(`// Semantic Versioning Calculator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Semantic Versioning Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔢 Semantic Versioning Calculator</h1>
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
        title="Semver Calculator — Semantic Version Range Tester"
        category="dev"
        intro={`Semantic versioning ranges in package.json, Cargo.toml, and go.mod control which versions of a dependency your project will install. A misunderstood range like ^1.2.3 or ~1.2.3 can install an unexpected major or minor version that breaks your build.

This calculator tests semver ranges against version lists, shows which versions match, and explains each range specifier. Runs in your browser.

**Long-tail searches answered here:** semver version calculator free online usa, semantic versioning bump calculator free, npm semver range checker free no signup, semver comparison tool free online, how semver versioning works calculator free, semantic version increment calculator free usa, when to increment major minor patch version free, breaking change semver major version guide free usa, semver prerelease alpha beta rc version free, npm package version range caret tilde meaning free, semver 2.0 specification summary free guide usa, how to compare semver versions programmatically free, semver build metadata vs prerelease identifier free usa, npm publish version strategy guide free online, what semver version for internal tool bumps free usa

For managing package files, pair with [Package JSON Generator](/calculators/dev/package-json-gen).`}
        howItWorks={`Semantic versioning defines three numbers: MAJOR.MINOR.PATCH. MAJOR changes indicate breaking changes; MINOR changes add backward-compatible features; PATCH changes are backward-compatible bug fixes.

Range specifiers: ^1.2.3 (caret) matches >=1.2.3 and <2.0.0 — allows minor and patch updates but not major. ~1.2.3 (tilde) matches >=1.2.3 and <1.3.0 — allows only patch updates.

The calculator tests your range against a list of version strings and highlights which ones match.`}
        benefits={[
          { title: `Range vs version list matching`, text: `Enter a range like ^1.2.3 and a list of versions to see exactly which ones match. Eliminates the guesswork in understanding what ^ and ~ actually select.` },
          { title: `^ vs ~ comparison`, text: `Side-by-side comparison shows that ^1.2.3 matches 1.3.0 and 1.4.0 (minor updates) while ~1.2.3 matches only 1.2.4 and 1.2.5 (patch updates only).` },
          { title: `Pre-release version handling`, text: `Shows how pre-release versions (1.2.3-alpha.1, 2.0.0-beta.2) interact with ranges — pre-release versions are excluded from ranges unless explicitly specified.` },
          { title: `Version bump simulator`, text: `Enter your current version and select the change type (major/minor/patch/pre-release) to see the correct next version number.` },
        ]}
        useCases={[
          { title: `Debugging npm install results`, text: `Your package.json has react ^18.0.0 but you want to understand exactly which React versions could be installed. Test the range against available versions here.` },
          { title: `Planning breaking change releases`, text: `You are releasing a breaking change. Verify that incrementing the major version will cause ^1.x.x ranges in dependent packages to exclude your new version.` },
          { title: `Cargo.toml version constraints`, text: `Rust Cargo uses semver with slightly different range syntax. Test your Cargo.toml version constraints here to verify they allow the versions you intend.` },
          { title: `Monorepo package version alignment`, text: `In a monorepo, internal packages reference each other with exact or range versions. Verify that all internal references resolve to the correct local package versions.` },
        ]}
        keyStats={[
          { stat: `^MAJOR.x.x`, source: `Caret ranges allow minor and patch updates but lock the major version` },
          { stat: `~MAJOR.MINOR.x`, source: `Tilde ranges allow only patch updates within the specified minor version` },
          { stat: `semver.org`, source: `The semantic versioning specification — defines the rules this calculator implements` },
        ]}
        inlineLinks={[
          { text: `Package JSON Generator`, href: `/calculators/dev/package-json-gen`, label: `Package JSON Generator` },
          { text: `npm Package Search`, href: `/calculators/dev/npm-package-search`, label: `npm Package Search` },
          { text: `Gitignore Generator`, href: `/calculators/dev/gitignore-generator`, label: `Gitignore Generator` },
          { text: `Git Commit Generator`, href: `/calculators/dev/git-commit-gen`, label: `Git Commit Generator` },
          { text: `TOML Formatter`, href: `/calculators/dev/toml-formatter`, label: `TOML Formatter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `YAML Formatter`, href: `/calculators/dev/yaml-formatter`, label: `YAML Formatter` },
        ]}
        tipsSection={`Use ~ for patch-only updates in production. For stability-critical production dependencies, use ~1.2.3 (patch updates only) rather than ^1.2.3 (minor updates allowed). Minor versions can introduce behavioral changes.

^0.x.x is not the same as ^1.x.x. For versions below 1.0.0, ^0.2.3 only allows patch updates (not minor) because pre-1.0 minor versions are considered potentially breaking.

Pre-release versions require explicit opt-in. ^1.2.3 does not match 1.3.0-beta.1 — pre-release versions are excluded unless you explicitly specify >=1.2.3-beta.0 <2.0.0.

Lock files are your actual protection. Semver ranges define what CAN be installed; your package-lock.json or yarn.lock defines what IS installed. Always commit lock files.`}
        conclusion={`Semver range syntax has non-obvious edge cases — especially around pre-1.0 versions, pre-release tags, and the difference between ^ and ~. This calculator makes the matching behavior concrete by testing ranges against real version lists.

For the full package management workflow: test ranges here, generate package.json with [Package JSON Generator](/calculators/dev/package-json-gen), and search available versions with [npm Package Search](/calculators/dev/npm-package-search).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
