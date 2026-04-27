import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: '.env File Parser — Validate and Inspect Environment Files Free',
  description: 'Parse and validate .env files. View key-value pairs, detect syntax errors, and convert to JSON or export format. Runs entirely in your browser — secrets stay on your device.',
  slug: 'env-file-parser',
  keywords: ['env file parser online free','.env file viewer browser','environment variables parser','dotenv file reader free','env to json converter online'],
})

const faqs = [
  { question: 'What is the .env file format and what syntax rules apply?', answer: "A .env file stores environment variables as KEY=VALUE pairs, one per line. Rules: lines starting with # are comments. Empty lines are ignored. Keys must be valid identifier characters (letters, digits, underscores; conventionally uppercase). Values can optionally be quoted with single or double quotes — quoting is required if the value contains spaces, #, or =. Quoted values support escape sequences: double-quoted values process \\n as a newline, single-quoted values treat everything literally. A common gotcha: DATABASE_URL=postgres://user:pass@host/db does not need quotes. DATABASE_URL='postgres://user:pass@host/db' also works." },
  { question: 'Is it safe to paste .env files with real secrets into this tool?', answer: "Yes — this tool runs entirely in your browser. Your .env content is never transmitted to any server; all parsing happens locally in JavaScript. You can verify this by opening DevTools > Network while using the tool — no outbound requests are made. The content exists only in your browser tab's memory and is cleared when you close it or refresh. This browser-only design is specifically why a browser-based .env parser is safer than any server-based tool for this type of sensitive content." },
  { question: 'What is the difference between .env, .env.local, .env.development, and .env.production?', answer: "Popular frameworks (Next.js, Vite, Create React App) load multiple .env files with a priority order. .env is the base — committed to version control with non-sensitive defaults. .env.local overrides .env and is gitignored — used for local developer secrets. .env.development loads only in development mode. .env.production loads only in production builds. .env.development.local and .env.production.local are local overrides for each environment. Priority (highest to lowest in Next.js): .env.local > .env.[environment].local > .env.[environment] > .env. Never commit .env.local to git." },
  { question: 'How do I check which environment variables are missing in a deployment?', answer: `Maintain a .env.example file committed to version control with all required keys but empty or example values: DATABASE_URL=postgres://localhost:5432/myapp. In CI/CD or deployment setup scripts, compare .env.example keys against the actual environment variables. A simple check: grep -o '^[^=]*' .env.example | while read key; do [ -z "\${!key}" ] && echo "Missing: $key"; done. Many deployment platforms (Railway, Render, Heroku) also have a UI for comparing required vs configured env vars. This tool can parse both files so you can visually compare key sets.` },
  { question: 'How do I use environment variables in Docker and Kubernetes?', answer: "Docker Compose: use env_file: - .env to load your .env file into container environment. Docker run: pass with -e KEY=VALUE or --env-file .env. Kubernetes: never use .env files directly — use ConfigMaps for non-sensitive values and Secrets for sensitive ones. Inject into pods via envFrom or env with valueFrom. For local development with Kubernetes (minikube, kind), you can use a tool like kubectl create secret generic app-secrets --from-env-file=.env to create Secrets from a local .env file temporarily." },
  { question: 'What common mistakes cause environment variables to not be read correctly?', answer: `The most frequent issues: (1) Spaces around the equals sign — DATABASE_URL = value fails; DATABASE_URL=value works. (2) Unquoted values with # — API_KEY=abc#def is parsed as API_KEY=abc (# starts a comment); quote it: API_KEY='abc#def'. (3) Windows CRLF line endings on Linux systems — the variable value includes a trailing \\r, causing subtle bugs. (4) Missing export statement — in shell scripts, variables need export to be visible to child processes. (5) Loading order confusion in frameworks — knowing which .env file takes priority prevents "I updated .env but it still uses the old value" bugs.` },
  { question: 'What other configuration and developer tools are on this site?', answer: "The Docker Compose Generator creates docker-compose.yml files that reference .env files. The YAML Formatter validates Kubernetes ConfigMap and Secret YAML. The JSON Formatter helps inspect JSON-encoded environment variables. The Diff Checker compares two .env files to find differences between environments. The Gitignore Generator includes .env patterns to exclude secrets from version control. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: '.env File Parser — Validate and Inspect Environment Files Free',
    description: 'Parse and validate .env files. View key-value pairs, detect syntax errors, and convert to JSON or export format. Runs entirely in your browser — secrets stay on your device.',
    slug: 'env-file-parser',
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
