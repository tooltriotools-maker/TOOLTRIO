import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Git Commit Message Generator — Conventional Commits Free',
  description: 'Generate well-formatted git commit messages following Conventional Commits spec. Supports feat, fix, chore, docs, refactor types. Runs in your browser.',
  slug: 'git-commit-gen',
  keywords: ['git commit message generator online free','conventional commits builder browser','semantic commit generator','git commit template free','commit message formatter online'],
})

const faqs = [
  { question: 'What is the Conventional Commits specification?', answer: "Conventional Commits is a commit message format that enables automated tooling: <type>[optional scope]: <description>. Types: feat (new feature), fix (bug fix), docs (documentation), style (formatting), refactor (code restructuring without feature change), test (adding tests), chore (build process, dependencies), perf (performance improvements), ci (CI configuration). A breaking change is indicated by ! after the type: feat!: change API response format, or with a BREAKING CHANGE: footer. This format enables automatic changelog generation, semantic versioning, and release automation with tools like semantic-release." },
  { question: 'How should I write a good commit message description?', answer: `The description (the part after the colon) should: use imperative mood ("add user authentication" not "added" or "adds"), be under 72 characters for the first line, not end with a period, describe what the change does — not how or why. Good: feat(auth): add JWT refresh token rotation. Bad: fix: fixed the thing that was broken. The body (separated by blank line) explains why the change was made and what alternatives were considered. The footer cites issue numbers: Closes #234, Fixes #678. Refs #90.` },
  { question: 'What is the difference between fix, refactor, and chore?', answer: "fix: corrects a bug — something that was broken is now working correctly. This type triggers a PATCH version bump in semantic versioning. refactor: changes code structure or implementation without changing external behavior or fixing a bug — no user-visible difference, just cleaner/faster/clearer code. chore: maintenance tasks that do not affect the application code or tests: updating dependencies, configuring build tools, adding .gitignore rules, updating package.json scripts. Neither refactor nor chore typically triggers a version bump in automated release tools." },
  { question: 'How do commit message conventions enable automated versioning?', answer: "Tools like semantic-release and standard-version read commit history and determine the next semantic version automatically. fix: commits increment the PATCH version (1.2.3 → 1.2.4). feat: commits increment MINOR (1.2.3 → 1.3.0). feat!: or any commit with BREAKING CHANGE: increments MAJOR (1.2.3 → 2.0.0). The tool also generates a CHANGELOG.md by grouping commits by type. This eliminates manual version number decisions and changelog writing — the commit history becomes the source of truth for releases." },
  { question: 'How do I enforce commit message format in a team?', answer: `Use commitlint (npm install --save-dev @commitlint/cli @commitlint/config-conventional) with a Husky git hook that runs commitlint on every commit. Add a commit-msg hook: npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'. Non-conforming commits are rejected before they enter the repository. For interactive guided commit creation, use Commitizen (git cz instead of git commit) — it prompts for type, scope, description, and breaking changes. Both tools use the same @commitlint/config-conventional configuration.` },
  { question: 'Should I include the scope in every commit?', answer: "Scope is optional but useful in monorepos or large codebases: feat(payment): add Stripe webhook handling. Scopes typically correspond to packages, modules, or system areas: feat(auth), fix(api), docs(readme), chore(deps). In small repositories, scope adds noise without much value. In monorepos with multiple packages, scope is essential to understand which package a commit affects. Consistent scope names also enable changelog filtering: show me only commits affecting the auth module this release." },
  { question: 'What other developer workflow tools are on this site?', answer: "The Gitignore Generator creates .gitignore files with patterns for your tech stack. The Diff Checker compares code changes before committing. The Semver Calculator helps understand version number implications of your change type. The Package JSON Generator creates package.json files for new projects. The Markdown Preview lets you preview README and documentation changes. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Git Commit Message Generator — Conventional Commits Free',
    description: 'Generate well-formatted git commit messages following Conventional Commits spec. Supports feat, fix, chore, docs, refactor types. Runs in your browser.',
    slug: 'git-commit-gen',
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
