import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Package.json Generator — Node.js Project Config Builder Free',
  description: 'Generate package.json files for Node.js projects. Configure name, version, scripts, dependencies, and metadata. Runs entirely in your browser.',
  slug: 'package-json-gen',
  keywords: ['package json generator online free','npm package.json builder browser','create package json free','npm init json generator','node package json creator online'],
})

const faqs = [
  { question: "What are the required fields in a package.json?", answer: `Strictly speaking, only name and version are required for a published npm package. name must be lowercase, no spaces, under 214 characters (use hyphens: my-package). version must follow semver (1.0.0). For applications (not published to npm), no fields are strictly required — but a minimal useful package.json includes: name, version, description, main (entry point), scripts (run commands), and author. For npm publishing, add: keywords, repository, license, and homepage.` },
  { question: "What is the difference between 'main', 'module', and 'exports' in package.json?", answer: `main: the CommonJS entry point (require('package') resolves this). module: the ES Module entry point (non-standard but widely supported by bundlers). exports: the modern way to define conditional exports — different files for different conditions (import vs require, browser vs node, development vs production). Use exports for new packages: { exports: { import: './esm/index.js', require: './cjs/index.js' } }. Bundlers like webpack and Rollup respect exports. Node.js respects exports for require() and import as of v12+.` },
  { question: "What is the 'engines' field and should I include it?", answer: `engines specifies which Node.js (and npm) versions your package supports: { engines: { node: '>=18.0.0', npm: '>=9.0.0' } }. npm does not enforce this by default — it warns but does not block installation. To enforce: set engine-strict=true in .npmrc. Always specify engines when your package uses APIs only available in certain Node.js versions (fetch natively in Node 18+, crypto.webcrypto in Node 15+). For monorepos managed with pnpm or yarn workspaces, engines is enforced more strictly.` },
  { question: "What scripts should every package.json have?", answer: `Essential scripts: start (run the application: node src/index.js or nodemon), build (compile/bundle: tsc || webpack || vite build), test (run tests: jest || vitest || mocha), lint (check code quality: eslint . || biome check .), dev (development server with hot reload: nodemon || vite || next dev). Optional but recommended: typecheck (tsc --noEmit for TypeScript without building), format (prettier --write .), clean (rm -rf dist), prepare (runs before npm publish: build). Scripts prefixed with pre/post run automatically before/after the named script.` },
  { question: "What is the 'private' field and when should I set it?", answer: `private: true prevents accidental npm publish. Always set private: true for: application repositories (not libraries), internal packages in monorepos that should not be published publicly, and any project where npm publish would be a mistake. Without private: true, running npm publish in any package.json directory would attempt to publish to the npm registry. For monorepos: the root package.json should have private: true; individual publishable packages within the monorepo may not.` },
  { question: "How do version range specifiers work in package.json dependencies?", answer: `^1.2.3 (caret): accepts 1.x.x where x >= 2.3 — minor and patch updates allowed. ~1.2.3 (tilde): accepts 1.2.x where x >= 3 — only patch updates allowed. 1.2.3 (exact): only exactly that version. >=1.2.3 <2.0.0: explicit range. * or latest: any version (dangerous in production). The Semver Calculator on this site shows exactly which versions any range expression matches. For production dependencies: use ^ (caret) for flexibility while maintaining major version stability. For tooling in devDependencies: ^ is usually fine.` },
  { question: "What other project setup tools are on this site?", answer: `The npm Package Search finds the packages to add to your package.json. The Semver Calculator verifies version ranges. The Gitignore Generator creates .gitignore for Node.js projects. The Git Commit Generator follows Conventional Commits for npm package versioning. The JSON Formatter validates and reads package.json and package-lock.json. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Package.json Generator — Node.js Project Config Builder Free',
    description: 'Generate package.json files for Node.js projects. Configure name, version, scripts, dependencies, and metadata. Runs entirely in your browser.',
    slug: 'package-json-gen',
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
