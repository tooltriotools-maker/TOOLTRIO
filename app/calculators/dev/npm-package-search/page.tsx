import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'npm Package Search — Find Packages with Download Stats Free',
  description: 'Search npm packages with live weekly download stats, version info, license, and GitHub links. Find the right package for your project.',
  slug: 'npm-package-search',
  keywords: ['npm package search online free','npm registry browser search','find npm packages online','npm package info lookup','node modules search tool free'],
})

const faqs = [
  { question: "What does the weekly download count indicate?", answer: `Weekly downloads are the most useful single metric for package evaluation: under 1,000/week = niche or potentially abandoned. 10,000-100,000/week = established community use. Over 1 million/week = essential ecosystem package. Downloads indicate adoption and community testing but not quality alone — high downloads can reflect a mediocre package that became entrenched. Combine with: last publish date, GitHub issue responsiveness, and npm audit results for a complete picture.` },
  { question: "How do I evaluate whether an npm package is safe to use?", answer: `Check in order: (1) Weekly downloads and trend direction. (2) Last publish date — if 4+ years old without updates, compatibility and security issues are likely. (3) GitHub: open issues vs closed, recent commits, responsiveness to security reports. (4) License — MIT, Apache 2.0, ISC are permissive. GPL is copyleft and may affect your project. (5) Run npm audit after installing. (6) npmjs.com/advisories for known vulnerabilities. (7) socket.dev for supply chain security analysis.` },
  { question: "What is the difference between @types packages and regular packages?", answer: `@types/packagename packages (from DefinitelyTyped) provide TypeScript type definitions for JavaScript packages that do not include them. Install both: npm install lodash && npm install --save-dev @types/lodash. If a package includes types (check package.json for a 'types' field), the @types package is unnecessary. Modern packages increasingly ship their own types — the need for separate @types packages is decreasing but remains common for older widely-used packages.` },
  { question: "What is the difference between dependencies and devDependencies?", answer: `dependencies: required at runtime — installed when your package is installed by others. devDependencies: only needed during development (test frameworks, bundlers, TypeScript) — not installed in production. peerDependencies: the consuming project must provide these — used for plugins that must use the host application's instance (React component libraries list react as peerDependency). optionalDependencies: installed if possible but failure is acceptable.` },
  { question: "How do I check bundle size before installing a package?", answer: `bundlephobia.com shows the minified + gzipped size for any npm package — essential for client-side packages where size affects page load. A package with 10 million weekly downloads might add 200KB to your bundle. Size check is especially important for: utility libraries (lodash 71KB vs lodash-es with tree-shaking vs individual imports), date libraries (moment.js 69KB vs date-fns with tree-shaking vs Temporal polyfill), and validation libraries.` },
  { question: "How do I find alternatives to a specific npm package?", answer: `npmcompare.com side-by-sides two packages. npmtrends.com plots download trends showing which package is gaining adoption. bundlephobia.com shows bundle size comparison. Awesome lists (github.com/sindresorhus/awesome-nodejs) curate quality packages by category. For security: snyk.io/advisor shows a package health score. For supply chain: socket.dev analyzes maintainer changes and hidden code.` },
  { question: "What other project setup tools are on this site?", answer: `The Package JSON Generator creates package.json files for new projects. The Semver Calculator explains version range specifiers like ^1.2.3. The Gitignore Generator adds node_modules to .gitignore. The Git Commit Generator follows Conventional Commits spec that integrates with npm publishing. The JSON Formatter helps read package.json and package-lock.json. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'npm Package Search — Find Packages with Download Stats Free',
    description: 'Search npm packages with live weekly download stats, version info, license, and GitHub links. Find the right package for your project.',
    slug: 'npm-package-search',
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
