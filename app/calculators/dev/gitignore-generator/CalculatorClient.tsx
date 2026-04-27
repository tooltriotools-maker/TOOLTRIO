'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [selected, setSelected] = useState<string[]>(['Node','React','VSCode'])
  const [copied, setCopied] = useState(false)

  const TEMPLATES: Record<string, string[]> = {
    'Node': ['node_modules/','dist/','build/','.env','.env.local','.env.*.local','npm-debug.log*','yarn-debug.log*','yarn-error.log*','pnpm-debug.log*','.npm','.yarn-integrity'],
    'React': ['# React / CRA','/build','/.pnp','.pnp.js','.testing-library','coverage/'],
    'Next.js': ['# Next.js','.next/','out/','build/','*.tsbuildinfo','next-env.d.ts'],
    'Python': ['__pycache__/','*.py[cod]','*$py.class','*.so','.Python','build/','develop-eggs/','dist/','downloads/','eggs/','.eggs/','lib/','lib64/','parts/','sdist/','var/','wheels/','*.egg-info/','.installed.cfg','*.egg','MANIFEST','.env','venv/','.venv','env/','ENV/'],
    'Java': ['*.class','*.log','*.jar','*.war','*.nar','*.ear','*.zip','*.tar.gz','*.rar','hs_err_pid*','.mtj.tmp/','target/','dependency-reduced-pom.xml','buildNumber.properties','.mvn/timing.properties','.mvn/wrapper/maven-wrapper.jar'],
    'VSCode': ['.vscode/*','!.vscode/settings.json','!.vscode/tasks.json','!.vscode/launch.json','!.vscode/extensions.json','*.code-workspace','.history/'],
    'macOS': ['.DS_Store','.AppleDouble','.LSOverride','Icon','.Spotlight-V100','.Trashes','._*','.fseventsd','.TemporaryItems','.VolumeIcon.icns','.com.apple.timemachine.donotpresent'],
    'Windows': ['Thumbs.db','Thumbs.db:encryptable','ehthumbs.db','ehthumbs_vista.db','*.stackdump','[Dd]esktop.ini','$RECYCLE.BIN/','*.cab','*.msi','*.msix','*.msm','*.msp','*.lnk'],
    'Docker': ['.dockerignore','docker-compose.override.yml'],
    'Terraform': ['.terraform/','*.tfstate','*.tfstate.*','crash.log','crash.*.log','*.tfvars','*.tfvars.json','override.tf','override.tf.json','*_override.tf','*_override.tf.json','.terraformrc','terraform.rc'],
    'Go': ['*.exe','*.exe~','*.dll','*.so','*.dylib','*.test','*.out','go.work'],
    'Ruby': ['*.gem','*.rbc','/.config','/coverage/','vendor/bundle','.bundle/','db/*.sqlite3','log/*.log','tmp/','*.orig','rerun.txt','pickle-email-*.html'],
  }

  const toggle = (k: string) => setSelected(s=>s.includes(k)?s.filter(x=>x!==k):[...s,k])

  const output = useMemo(() => {
    return selected.map(s=>{
      const lines = TEMPLATES[s]||[]
      return `# ${s}\n${lines.join('\n')}`
    }).join('\n\n')
  }, [selected])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">.gitignore Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🙈 .gitignore Generator</h1>
      <p className="text-gray-500 mb-6">Generate .gitignore files for Node, Python, Java, Go, Terraform and more</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(TEMPLATES).map(k=>(
          <button key={k} onClick={()=>toggle(k)}
            className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${selected.includes(k)?'bg-green-600 text-white border-green-600':'border-gray-200 text-gray-600 hover:border-green-400'}`}>{k}</button>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-500 uppercase">.gitignore ({output.split('\n').filter(l=>l&&!l.startsWith('#')).length} rules)</label>
          <div className="flex gap-3">
            <button onClick={()=>{navigator.clipboard.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
            <button onClick={()=>{const b=new Blob([output],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='.gitignore';a.click()}} className="flex items-center gap-1 text-xs font-bold text-blue-600"><Download className="w-3.5 h-3.5"/> Download</button>
          </div>
        </div>
        <pre className="font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto max-h-96 whitespace-pre">{output||'Select at least one template above'}</pre>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the .gitignore Generator</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">A .gitignore file tells Git which files and directories to exclude from version control. Click the technology buttons to select what your project uses - you can combine multiple templates (e.g. Node + React + VSCode + macOS for a typical frontend project). The generated rules are combined into a single file. Click Download to save the .gitignore file directly, then place it in the root of your repository.</p>
        <p className="text-sm text-gray-600"><strong>Typical combos:</strong> Full-stack JS: Node + Next.js + VSCode + macOS. Python project: Python + VSCode + macOS + Windows. Infrastructure: Terraform + VSCode. Always commit your .gitignore before adding it to an existing repo with <code className="bg-gray-100 px-1 rounded">git rm -r --cached .</code> to un-track already-tracked files.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Gitignore Generator"
        category="dev"
        intro={`A .gitignore file tells Git which files and directories to ignore when tracking changes. Missing entries mean build artifacts, IDE settings, node_modules, and secrets accidentally get committed. Having too many means legitimate files get excluded.

This generator creates .gitignore files for any combination of languages, frameworks, and IDEs. Runs in your browser.

**Long-tail searches answered here:** gitignore generator free online usa, create gitignore file for project free no signup, gitignore template generator by language free tool, node python java gitignore generator free, how to create gitignore free online tool, project specific gitignore creator free usa, gitignore for react next.js project generator free, gitignore for vscode and jetbrains ide free usa, macos ds_store gitignore template free online, gitignore for monorepo project generator free, global gitignore vs project gitignore guide usa free, gitignore for docker kubernetes project free online, gitignore for data science python project free usa, gitignore template for wordpress project free, gitignore update for added dependencies free tool usa

For environment files, pair with [Env File Parser](/calculators/dev/env-file-parser). For repository setup, see [Git Commit Generator](/calculators/dev/git-commit-gen).`}
        howItWorks={`Generates .gitignore content by combining pattern templates for selected languages (JavaScript, Python, Ruby, Go, Rust, Java), frameworks (React, Next.js, Django, Rails), IDEs (VSCode, JetBrains, Vim), and operating systems (macOS, Windows, Linux). Each template includes the standard patterns used by that ecosystem.`}
        benefits={[
          { title: `Language and framework templates`, text: `Combines patterns for your specific tech stack: Node.js (node_modules/, .env), Python (.venv/, __pycache__, *.pyc), Java (target/, *.class), Go (*.exe), Rust (target/).` },
          { title: `IDE settings exclusion`, text: `Adds the correct patterns to exclude VSCode settings, JetBrains .idea directories, and editor-specific temp files while keeping shared team settings.` },
          { title: `OS-specific patterns`, text: `Adds macOS .DS_Store, Windows Thumbs.db, and Linux temp file patterns to prevent OS-specific files from polluting your repository.` },
          { title: `Custom entry addition`, text: `Add your own custom patterns alongside the generated ones — for project-specific build artifacts, generated files, or sensitive configuration.` },
        ]}
        useCases={[
          { title: `Starting a new project`, text: `Generate a comprehensive .gitignore before your first commit. Easier to start clean than to untrack files that were accidentally committed.` },
          { title: `Preventing secret commits`, text: `Explicitly ignore .env, *.pem, secrets.json, and other sensitive files to prevent accidentally committing credentials.` },
          { title: `Monorepo configuration`, text: `Generate separate .gitignore files for different packages in a monorepo, or a root-level file that covers all sub-packages.` },
          { title: `CI/CD artifact exclusion`, text: `Ignore build directories (dist/, build/, out/), coverage reports, and deployment artifacts that should not be in version control.` },
        ]}
        keyStats={[
          { stat: `node_modules`, source: `The most common missing .gitignore entry — excluding node_modules prevents committing thousands of files` },
          { stat: `.env exclusion`, source: `Environment files with secrets should always be in .gitignore — never committed to version control` },
          { stat: `OS files`, source: `macOS .DS_Store, Windows Thumbs.db — cross-platform teams need all OS patterns` },
        ]}
        inlineLinks={[
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `Git Commit Generator`, href: `/calculators/dev/git-commit-gen`, label: `Git Commit Generator` },
          { text: `Package JSON Generator`, href: `/calculators/dev/package-json-gen`, label: `Package JSON Generator` },
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
          { text: `Semver Calculator`, href: `/calculators/dev/semver-calculator`, label: `Semver Calculator` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `TOML Formatter`, href: `/calculators/dev/toml-formatter`, label: `TOML Formatter` },
          { text: `RSA Key Info`, href: `/calculators/dev/rsa-key-info`, label: `RSA Key Info` },
        ]}
        tipsSection={`Add .env before your first commit. If you accidentally commit a .env file containing secrets, they are in your Git history even after you delete the file. Add .env to .gitignore before running git init or making the first commit.

Use git rm --cached to untrack already-committed files. If a file is already tracked, adding it to .gitignore does not stop tracking it. Run git rm --cached filename to stop tracking it without deleting the file.

Commit .env.example. Add .env to .gitignore but commit .env.example with all keys and empty values. This documents what environment variables are needed without exposing the actual values.

Check with git status --short. After adding entries to .gitignore, verify with git status that the intended files are now untracked.`}
        conclusion={`A comprehensive .gitignore prevents the two most common repository hygiene mistakes: committing node_modules (thousands of files) and committing secrets (security risk). Generate the correct patterns for your stack here, then never worry about accidental commits.`}
      />
    </div>
  )
}
