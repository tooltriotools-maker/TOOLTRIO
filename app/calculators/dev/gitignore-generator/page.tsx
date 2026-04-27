import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Gitignore Generator — .gitignore for Any Stack Free Online',
  description: 'Generate .gitignore files for Node.js, Python, Ruby, Go, Java, macOS, Windows, and more. Select your stack and copy ready-to-use patterns. Runs in your browser.',
  slug: 'gitignore-generator',
  keywords: ['gitignore generator online free','.gitignore file builder browser','gitignore for node python java','create gitignore free online','gitignore template generator'],
})

const faqs = [
  { question: 'What files should always be in .gitignore?', answer: "Regardless of stack: .env and .env.local (contain secrets and credentials), node_modules/ or any package dependency directory (regenerated from package.json — committing it inflates repo size enormously), build and dist directories (generated artifacts, not source), IDE configuration directories (.idea/, .vscode/settings.json — though .vscode/extensions.json can be committed), OS files (.DS_Store on Mac, Thumbs.db on Windows), log files (*.log), and test coverage reports. Never commit secrets, compiled binaries, or files that are deterministically regenerated from committed source." },
  { question: 'What is the difference between .gitignore, .git/info/exclude, and global gitignore?', answer: ".gitignore in a repository: ignores files for everyone who clones the repo — commit this for project-wide patterns (node_modules, build/). .git/info/exclude: local-only gitignore patterns in the repo — not committed, not shared. Use for personal temporary files specific to your local setup. Global gitignore (~/.gitignore_global configured with git config --global core.excludesFile): applies to every repository on your machine — ideal for OS files (.DS_Store, Thumbs.db), IDE files (.idea/, .vscode/), and any personal tooling artifacts that are not project-specific." },
  { question: 'How do I un-ignore a file that matches a gitignore pattern?', answer: "Use a negation pattern with ! to exclude specific files from an ignore rule: *.log ignores all log files; !important.log then un-ignores that one file. Important gotcha: you cannot un-ignore a file inside an ignored directory — if logs/ is ignored, !logs/important.log will not work. You must un-ignore the directory first: !logs/, then re-ignore what you do not want: logs/* !logs/important.log. Also, negation cannot override patterns from a parent .gitignore — the hierarchy makes this complex for nested directories." },
  { question: 'How do I stop tracking a file that is already committed?', answer: "Adding a file to .gitignore only prevents tracking of untracked files — it does not un-track files already in the repository. To stop tracking: git rm --cached filename (removes from index without deleting the file), then add to .gitignore, then commit. For a directory: git rm --cached -r directory/. For something like a committed .env file: immediately rotate all secrets in it, then git rm --cached .env and commit. If the secret was committed to a public repo, treat it as compromised regardless of removal — use GitHub's secret scanning and rotate the credential." },
  { question: 'What patterns should be in a .gitignore for a Docker project?', answer: "Docker-specific patterns: .env (secrets used by docker-compose), docker-compose.override.yml (local overrides to docker-compose.yml), *.log from container output, and any bind-mounted directories that contain generated data. Do not gitignore Dockerfile or docker-compose.yml — these are part of the project and should be committed. Override files (docker-compose.override.yml) are a common convention for local development settings: the base docker-compose.yml is committed, and each developer creates their own docker-compose.override.yml that stays gitignored." },
  { question: 'How do I gitignore everything except specific files?', answer: "Use a combination of a catch-all ignore and negations: * (ignore everything), then !.gitignore (un-ignore gitignore itself), !src/ (un-ignore src directory), !src/** (un-ignore contents of src), !package.json, !README.md, etc. This is an allowlist approach — useful for repositories that should contain only specific files, like a documentation-only repo or a config-only repo. The patterns must be listed in order — later negations override earlier ignores." },
  { question: 'What other project setup tools are on this site?', answer: "The Environment File Parser validates .env files that your .gitignore should exclude. The Docker Compose Generator creates docker-compose.yml files alongside your gitignore. The Package JSON Generator creates package.json for new Node projects. The Git Commit Message Generator helps format commits when you add the new .gitignore file. The Diff Checker verifies your gitignore changes produced the expected result before committing. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Gitignore Generator — .gitignore for Any Stack Free Online',
    description: 'Generate .gitignore files for Node.js, Python, Ruby, Go, Java, macOS, Windows, and more. Select your stack and copy ready-to-use patterns. Runs in your browser.',
    slug: 'gitignore-generator',
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
