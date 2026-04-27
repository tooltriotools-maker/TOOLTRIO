'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [pkg, setPkg] = useState({
    name: 'my-project', version: '1.0.0', description: 'A Node.js project',
    main: 'index.js', author: '', license: 'MIT', private: false,
    keywords: '', nodeVersion: '>=18.0.0',
    scripts: { start:'node index.js', build:'', test:'jest', dev:'nodemon index.js', lint:'eslint .' },
    deps: [{ name:'express', version:'^4.18.0' }],
    devDeps: [{ name:'jest', version:'^29.0.0' }, { name:'eslint', version:'^8.0.0' }],
  })
  const [copied, setCopied] = useState(false)

  const json = useMemo(() => {
    const obj: any = {
      name: pkg.name || 'my-project',
      version: pkg.version || '1.0.0',
      description: pkg.description,
      main: pkg.main,
    }
    if (pkg.private) obj.private = true
    const scripts: any = {}
    Object.entries(pkg.scripts).forEach(([k,v]) => { if (v) scripts[k] = v })
    if (Object.keys(scripts).length) obj.scripts = scripts
    if (pkg.keywords) obj.keywords = pkg.keywords.split(',').map((k: string)=>k.trim()).filter(Boolean)
    if (pkg.author) obj.author = pkg.author
    obj.license = pkg.license
    const deps: any = {}; pkg.deps.forEach(d => { if (d.name) deps[d.name] = d.version || '*' })
    const devDeps: any = {}; pkg.devDeps.forEach(d => { if (d.name) devDeps[d.name] = d.version || '*' })
    if (Object.keys(deps).length) obj.dependencies = deps
    if (Object.keys(devDeps).length) obj.devDependencies = devDeps
    if (pkg.nodeVersion) obj.engines = { node: pkg.nodeVersion }
    return JSON.stringify(obj, null, 2)
  }, [pkg])

  const upd = (k: string, v: any) => setPkg(p => ({...p, [k]: v}))
  const updScript = (k: string, v: string) => setPkg(p=>({...p, scripts:{...p.scripts,[k]:v}}))
  const addDep = (type: 'deps'|'devDeps') => setPkg(p=>({...p,[type]:[...p[type],{name:'',version:''}]}))
  const updDep = (type: 'deps'|'devDeps', i: number, k: 'name'|'version', v: string) => setPkg(p=>({...p,[type]:p[type].map((d,j)=>j===i?{...d,[k]:v}:d)}))
  const delDep = (type: 'deps'|'devDeps', i: number) => setPkg(p=>({...p,[type]:p[type].filter((_,j)=>j!==i)}))

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">package.json Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📦 package.json Generator</h1>
      <p className="text-gray-500 mb-6">Fill the wizard on the left, get your perfect package.json on the right</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Basic Info</h3>
            {[['name','Package Name','my-project'],['version','Version','1.0.0'],['description','Description',''],['main','Entry Point','index.js'],['author','Author',''],['keywords','Keywords (comma-separated)','']].map(([k,label,ph])=>(
              <div key={k}>
                <label className="text-xs font-medium text-gray-500 block mb-0.5">{label}</label>
                <input value={(pkg as any)[k]} onChange={e=>upd(k, e.target.value)} placeholder={ph}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-green-400" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-gray-500 block mb-0.5">License</label>
                <select value={pkg.license} onChange={e=>upd('license',e.target.value)} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none bg-white">
                  {['MIT','Apache-2.0','GPL-3.0','BSD-3-Clause','ISC','UNLICENSED'].map(l=><option key={l}>{l}</option>)}
                </select>
              </div>
              <div><label className="text-xs font-medium text-gray-500 block mb-0.5">Node Version</label>
                <input value={pkg.nodeVersion} onChange={e=>upd('nodeVersion',e.target.value)} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-2">Scripts</h3>
            {Object.entries(pkg.scripts).map(([k,v])=>(
              <div key={k} className="flex gap-2 items-center">
                <span className="text-xs font-mono text-gray-500 w-14 flex-shrink-0">{k}:</span>
                <input value={v} onChange={e=>updScript(k,e.target.value)} placeholder={`command...`}
                  className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-xs font-mono focus:outline-none focus:border-green-400" />
              </div>
            ))}
          </div>
          {(['deps','devDeps'] as const).map(type=>(
            <div key={type} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{type==='deps'?'dependencies':'devDependencies'}</h3>
                <button onClick={()=>addDep(type)} className="flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700"><Plus className="w-3.5 h-3.5"/>Add</button>
              </div>
              {pkg[type].map((d,i)=>(
                <div key={i} className="flex gap-2">
                  <input value={d.name} onChange={e=>updDep(type,i,'name',e.target.value)} placeholder="package-name"
                    className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-xs font-mono focus:outline-none focus:border-green-400" />
                  <input value={d.version} onChange={e=>updDep(type,i,'version',e.target.value)} placeholder="^1.0.0"
                    className="w-24 border border-gray-200 rounded-lg px-2 py-1 text-xs font-mono focus:outline-none focus:border-green-400" />
                  <button onClick={()=>delDep(type,i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Generated package.json</label>
            <button onClick={()=>{navigator.clipboard.writeText(json);setCopied(true);setTimeout(()=>setCopied(false),1500)}}
              className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
          </div>
          <pre className="font-mono text-xs p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre min-h-96">{json}</pre>
        </div>
      </div>

      <SEOContent
        title="package.json Generator"
        category="dev"
        intro={`Every Node.js project starts with a package.json. Writing it from scratch means remembering exact field names for exports, type, engines, peerDependencies, and scripts. Errors cause import failures and npm publish issues.

This generator builds a correctly structured package.json from form inputs. Runs in your browser.

**Long-tail searches answered here:** package json generator free online usa, create package json file free no signup, npm package json builder free tool, node project package json creator free, how to write package json free generator, package json template generator free usa, package json for typescript project generator free, package json scripts section examples free usa guide, peer dependencies vs dependencies package json free, package json workspaces monorepo config generator free, package json version semver range guide free usa, package json browserslist targets config generator free, package json engines node npm version spec free, package json type module vs commonjs guide free usa, package json main vs exports field difference free

Pair with [Semver Calculator](/calculators/dev/semver-calculator) for version ranges.`}
        howItWorks={`Builds valid JSON following npm package.json spec. Required: name (kebab-case), version (semver), description. Common optional fields: main, module, exports, type, scripts, dependencies, devDependencies, peerDependencies, engines, license, keywords, repository. The exports field is generated with conditional exports for ESM, CJS, and TypeScript declarations simultaneously — the most complex and frequently misconfigured part.`}
        benefits={[
          { title: `Correct exports field`, text: `Generates modern conditional exports for ESM, CJS, and TypeScript types — the most error-prone part of package.json configuration for npm packages.` },
          { title: `ESM vs CJS configuration`, text: `Sets type: module for ESM packages and generates correct file extensions (.mjs/.cjs) for dual-module packages.` },
          { title: `engines field validation`, text: `Generates engines field with correct semver range format like node >=18.0.0 — prevents install on unsupported Node.js versions.` },
          { title: `SPDX license identifiers`, text: `Uses correct SPDX identifiers (MIT, Apache-2.0, GPL-3.0) — required for public npm packages and read by license scanning tools.` },
        ]}
        useCases={[
          { title: `Starting a new npm package`, text: `Generate a complete package.json with all standard fields. Faster than npm init -y plus 10 manual field edits.` },
          { title: `Dual ESM/CJS package setup`, text: `Publishing a package that works for both import and require? The generator creates the correct exports field structure.` },
          { title: `Private internal package`, text: `Set private: true to prevent accidental npm publish. Configure org-scoped name (@myorg/package-name).` },
          { title: `Monorepo workspace config`, text: `Generate package.json for workspace packages with correct cross-package dependency references.` },
        ]}
        keyStats={[
          { stat: `exports field`, source: `Controls what ESM/CJS is exposed — overrides main in Node.js 12.7+` },
          { stat: `SPDX identifiers`, source: `Required for npm and license scanning tools` },
          { stat: `private: true`, source: `Prevents accidental publish — essential for internal and monorepo packages` },
        ]}
        inlineLinks={[
          { text: `Semver Calculator`, href: `/calculators/dev/semver-calculator`, label: `Semver Calculator` },
          { text: `npm Package Search`, href: `/calculators/dev/npm-package-search`, label: `npm Package Search` },
          { text: `Gitignore Generator`, href: `/calculators/dev/gitignore-generator`, label: `Gitignore Generator` },
          { text: `Git Commit Generator`, href: `/calculators/dev/git-commit-gen`, label: `Git Commit Generator` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `TOML Formatter`, href: `/calculators/dev/toml-formatter`, label: `TOML Formatter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
        ]}
        tipsSection={`Package names must be lowercase kebab-case. my-package is valid; MyPackage and my_package are not — npm rejects uppercase and underscores.

exports field overrides main. In Node.js 12.7+, the exports field takes precedence. Callers can only import what you explicitly export.

peerDependencies vs dependencies. If your package requires React but does not bundle it, list it as peerDependencies — prevents version conflicts in apps that already have React installed.

Validate after editing. Paste the generated package.json into [JSON Formatter](/calculators/dev/json-formatter) to confirm valid JSON before using it.`}
        conclusion={`Getting exports, module type, and version ranges right the first time prevents hours of import failures. For the full Node.js project setup: generate package.json here, search packages with [npm Package Search](/calculators/dev/npm-package-search), and manage constraints with [Semver Calculator](/calculators/dev/semver-calculator).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
