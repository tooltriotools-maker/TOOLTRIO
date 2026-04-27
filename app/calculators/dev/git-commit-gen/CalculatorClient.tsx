'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [ctype, setCtype] = useState('feat')
  const [scope, setScope] = useState('')
  const [desc, setDesc] = useState('')
  const [body, setBody] = useState('')
  const [breaking, setBreaking] = useState(false)
  const [footer, setFooter] = useState('')
  const [copied, setCopied] = useState(false)

  const TYPES = [
    {v:'feat',l:'✨ feat',d:'New feature'},
    {v:'fix',l:'🐛 fix',d:'Bug fix'},
    {v:'docs',l:'📝 docs',d:'Documentation'},
    {v:'style',l:'💄 style',d:'Formatting'},
    {v:'refactor',l:'♻️ refactor',d:'Code restructure'},
    {v:'test',l:'✅ test',d:'Adding tests'},
    {v:'chore',l:'🔧 chore',d:'Build/tools'},
    {v:'perf',l:'⚡ perf',d:'Performance'},
    {v:'ci',l:'👷 ci',d:'CI/CD changes'},
    {v:'revert',l:'⏪ revert',d:'Revert commit'},
  ]

  const commit = useMemo(() => {
    if (!desc.trim()) return ''
    const scopePart = scope.trim() ? `(${scope.trim()})` : ''
    const breakPart = breaking ? '!' : ''
    let msg = `${ctype}${scopePart}${breakPart}: ${desc.trim()}`
    if (body.trim()) msg += `\n\n${body.trim()}`
    if (breaking) msg += `\n\nBREAKING CHANGE: ${desc.trim()}`
    if (footer.trim()) msg += `\n\n${footer.trim()}`
    return msg
  }, [ctype, scope, desc, body, breaking, footer])

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Git Commit Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">💬 Conventional Commit Generator</h1>
      <p className="text-gray-500 mb-6">Write perfect semantic commit messages (Angular/Conventional Commits spec)</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4 space-y-5">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Type</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map(t=>(
              <button key={t.v} onClick={()=>setCtype(t.v)} title={t.d}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${ctype===t.v?'bg-gray-900 text-white border-gray-900':'border-gray-200 text-gray-600 hover:border-gray-400'}`}>{t.l}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Scope (optional)</label>
            <input value={scope} onChange={e=>setScope(e.target.value)} placeholder="auth, api, ui..." className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
          <div className="sm:col-span-2"><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Description *</label>
            <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="short description in imperative mood..." className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
        </div>
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Body (optional)</label>
          <textarea value={body} onChange={e=>setBody(e.target.value)} rows={3} placeholder="Longer explanation of what changed and why..."
            className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" /></div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
            <input type="checkbox" checked={breaking} onChange={e=>setBreaking(e.target.checked)} className="rounded" />
            Breaking change (adds !)
          </label>
        </div>
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Footer (optional - e.g. Closes #123)</label>
          <input value={footer} onChange={e=>setFooter(e.target.value)} placeholder="Closes #123, Refs #456..." className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
      </div>
      {commit && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Generated Commit Message</label>
            <button onClick={()=>{navigator.clipboard.writeText(commit);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
          </div>
          <pre className="font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl whitespace-pre-wrap">{commit}</pre>
        </div>
      )}
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Git Commit Generator</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">The Conventional Commits specification creates a consistent, machine-readable commit history that enables automatic CHANGELOG generation and semantic versioning. Select your commit type (feat for new features, fix for bug fixes, docs for documentation), optionally add a scope (the part of the codebase affected), then write a short description in imperative mood ("add login page" not "added login page"). For complex changes, use the Body to explain the "why". Tick Breaking Change if the change is not backwards-compatible (this bumps the major semver version).</p>
        <div className="p-3 bg-gray-950 rounded-xl mb-4"><code className="text-green-300 font-mono text-sm">feat(auth): add OAuth2 Google login<br/><br/>Allows users to sign in with their Google account.<br/>Implements PKCE flow for enhanced security.<br/><br/>Closes #234</code></div>
        <p className="text-sm text-gray-600">Common tools that read conventional commits: semantic-release (auto version bumping), standard-version, conventional-changelog (auto CHANGELOG). GitHub and GitLab display the type prefix prominently in their UI, making your git log much easier to scan.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Git Commit Message Generator — Conventional Commits"
        category="dev"
        intro={`A good commit message tells reviewers what changed and why — in a format that makes git log useful. Conventional Commits (feat(scope): description) enables automated changelogs and semantic versioning but the format is easy to get wrong.

This generator builds Conventional Commit messages with correct format and optional emoji. Runs in your browser.

**Long-tail searches answered here:** git commit message generator free online usa, conventional commit message builder free no signup, how to write good git commit messages free tool, semantic commit generator free online, git commit template generator free no download, ai git commit message helper free usa, feat fix chore conventional commit type guide free, git commit message best practices checklist free usa, imperative mood git commit message generator free, git commit message under 72 characters guide free usa, ticket number in git commit message format free, co-author in git commit format generator free usa, git commit for merge vs squash message guide free, breaking change commit message format free usa, past tense vs present tense in git commits guide free

For repository setup, pair with [Gitignore Generator](/calculators/dev/gitignore-generator) and [Package JSON Generator](/calculators/dev/package-json-gen).`}
        howItWorks={`Builds messages in <type>(<scope>): <description> format. Types: feat, fix, docs, style, refactor, test, chore, ci, build, perf. Validates: description starts lowercase, no trailing period, subject line under 72 characters (the Git convention for readable git log output). Breaking changes use feat!: notation or BREAKING CHANGE: footer. Optional emoji prefix for gitmoji convention.`}
        benefits={[
          { title: `Conventional Commits format`, text: `Produces correctly formatted type(scope): description messages that enable automated changelog generation with semantic-release and standard-version.` },
          { title: `72-character subject limit`, text: `Warns when the subject exceeds 72 characters — the Git convention for readable git log output.` },
          { title: `Breaking change notation`, text: `Supports feat!: notation and BREAKING CHANGE footer for major version bumps in automated release workflows.` },
          { title: `Gitmoji support`, text: `Optionally prefixes the type with emoji — a popular convention for visually scannable commit history.` },
        ]}
        useCases={[
          { title: `Setting up semantic-release`, text: `semantic-release reads Conventional Commit types to bump versions and generate changelogs. Use this generator to write commits in the correct format from day one.` },
          { title: `Team commit style consistency`, text: `Share this tool with your team as a reference for the commit format your project uses. Consistent commit history makes git log meaningful.` },
          { title: `PR commit message quality`, text: `Before pushing a PR, format commit messages here. Reviewers scanning history should understand what changed without reading the diff.` },
          { title: `Open source contribution`, text: `Many open source projects require Conventional Commits for automated releases. Generate correctly formatted messages to meet contribution guidelines.` },
        ]}
        keyStats={[
          { stat: `Conventional Commits`, source: `Specification used by Angular, Vue, Next.js, and thousands of projects` },
          { stat: `72 chars`, source: `Git subject line limit for readable git log --oneline output` },
          { stat: `semantic-release`, source: `Reads Conventional Commits to auto-bump semver and generate changelogs` },
        ]}
        inlineLinks={[
          { text: `Gitignore Generator`, href: `/calculators/dev/gitignore-generator`, label: `Gitignore Generator` },
          { text: `Package JSON Generator`, href: `/calculators/dev/package-json-gen`, label: `Package JSON Generator` },
          { text: `Semver Calculator`, href: `/calculators/dev/semver-calculator`, label: `Semver Calculator` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
        ]}
        tipsSection={`Lowercase description, no trailing period. Conventional Commits spec requires: feat: add user authentication not Feat: Add user authentication with trailing period.

Scope clarifies context. fix(auth): handle expired tokens vs fix: handle expired tokens — scope makes git log much more useful in large codebases and monorepos.

One logical change per commit. A commit titled feat: add login, fix sidebar, update deps is three commits. Atomic commits make bisect, revert, and cherry-pick practical.

BREAKING CHANGE in footer for majors. Add BREAKING CHANGE: description after a blank line for changes that warrant a major version bump in semantic-release.`}
        conclusion={`Commit messages are team documentation. A year of Conventional Commits gives you an automatically generated changelog and readable code narrative. For a complete repo setup: generate commits here, configure with [Gitignore Generator](/calculators/dev/gitignore-generator), manage dependencies with [Package JSON Generator](/calculators/dev/package-json-gen).`}
      />
    </div>
  )
}
