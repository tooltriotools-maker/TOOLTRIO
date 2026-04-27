import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Semver Calculator — Semantic Version Range Tester Free',
  description: 'Test semantic version range specifiers. See which versions match ^1.2.3, ~1.2.3, >=1.0.0 <2.0.0, and other ranges. Runs entirely in your browser.',
  slug: 'semver-calculator',
  keywords: ['semver calculator online free','semantic versioning tool browser','npm semver range tester','semver version bump calculator','semver compatible versions checker'],
})

const faqs = [
  { question: "What does semantic versioning (semver) mean?", answer: `Semantic Versioning (semver.org) uses three numbers MAJOR.MINOR.PATCH with specific meanings: MAJOR increments on breaking changes (API incompatible with previous version). MINOR increments when new backwards-compatible features are added. PATCH increments for backwards-compatible bug fixes only. Pre-release versions: 1.0.0-alpha.1, 1.0.0-beta.2, 1.0.0-rc.1. Build metadata: 1.0.0+build.123 (ignored in comparisons). Following semver allows consumers of a library to safely specify version ranges — they know a ^1.x.x update will not break their code.` },
  { question: "What is the difference between ^ (caret) and ~ (tilde) version ranges?", answer: `Caret (^): allows changes that do not modify the leftmost non-zero number. ^1.2.3 accepts >=1.2.3 <2.0.0 (any 1.x.x at or above 1.2.3). ^0.2.3 accepts >=0.2.3 <0.3.0 (minor version is leftmost non-zero). ^0.0.3 accepts exactly 0.0.3. Tilde (~): allows patch-level changes only. ~1.2.3 accepts >=1.2.3 <1.3.0. ~1.2 accepts >=1.2.0 <1.3.0. ~1 accepts >=1.0.0 <2.0.0. Caret is more permissive — it allows minor updates. Tilde is more conservative — only patch updates. npm's default when you install a package is the caret range.` },
  { question: "Why does ^0.x.x behave differently from ^1.x.x?", answer: `Semver treats 0.x.x versions specially: the major version 0 is for initial development where anything may change at any time. Therefore, the caret restricts more aggressively: ^0.2.3 means >=0.2.3 <0.3.0 (not <1.0.0), because in a 0.x.x package, even minor version bumps may be breaking. ^0.0.3 is even stricter: exactly 0.0.3 only. This reflects reality — packages in major version zero are explicitly declaring they make no stability guarantees. Once a package reaches 1.0.0, the caret range becomes the standard >=1.x.x <2.0.0 behavior.` },
  { question: "What does 'latest' mean in package.json and why is it dangerous?", answer: `latest is a dist-tag pointing to the most recently published version. Using 'latest' as a version in package.json is not a semver range — it resolves to whatever is tagged latest at install time. This is dangerous: a major breaking update that someone publishes as latest will silently update all dependents using 'latest', breaking their applications. Always use a semver range (^1.2.3 or ~1.2.3) or exact version (1.2.3) in production package.json. 'latest' is appropriate only for global tool installs: npm install -g typescript@latest.` },
  { question: "How do pre-release versions interact with semver ranges?", answer: `By default, semver ranges do not include pre-release versions unless the range specifically mentions a pre-release. ^1.2.3 does NOT match 1.3.0-beta.1 even though beta.1 is technically between 1.2.3 and 1.3.0. To include pre-releases: ^1.2.3-0 or >=1.2.3 includes pre-releases above 1.2.3. When publishing a pre-release to npm: npm publish --tag beta prevents it from being installed as 'latest' — users must explicitly opt in with @beta tag.` },
  { question: "What is the difference between package.json version ranges and lockfile versions?", answer: `package.json specifies ranges: ^1.2.3. The lockfile (package-lock.json, yarn.lock, pnpm-lock.yaml) records the exact version resolved at install time: 1.4.7. Future installs on the same machine use the lockfile version (1.4.7), not re-resolving the range. npm install on a new machine without a lockfile resolves the range to the highest matching version available at that moment. Commit your lockfile to version control so all team members and CI use identical dependency versions.` },
  { question: "What other package tools are on this site?", answer: `The npm Package Search finds packages and shows their latest versions and weekly downloads. The Package JSON Generator creates package.json files. The Git Commit Generator follows Conventional Commits spec that drives semantic version bumps with tools like semantic-release. The JSON Formatter reads package.json and package-lock.json files. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Semver Calculator — Semantic Version Range Tester Free',
    description: 'Test semantic version range specifiers. See which versions match ^1.2.3, ~1.2.3, >=1.0.0 <2.0.0, and other ranges. Runs entirely in your browser.',
    slug: 'semver-calculator',
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
