import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'YAML Formatter & Validator — Format YAML Online Free',
  description: 'Format and validate YAML files online. Convert YAML to JSON and back. Catches indentation errors and syntax issues. Runs entirely in your browser.',
  slug: 'yaml-formatter',
  keywords: ['yaml formatter online free','yaml beautifier browser','yaml lint validator online','yaml syntax checker free','yaml to json online','json to yaml converter free','yaml indentation fixer online','validate yaml online'],
})

const faqs = [
  { question: "Why is YAML so error-prone and what are the most common mistakes?", answer: `YAML's use of indentation for structure makes it visually clean but fragile. Most common mistakes: (1) Mixing tabs and spaces — YAML strictly forbids tabs for indentation; all indentation must use spaces. (2) Off-by-one indentation — a key indented one space too few or many changes the entire structure silently. (3) Unquoted special values — yes, no, true, false, null, and numbers are interpreted as booleans, nulls, and numbers in YAML 1.1; quote them if you need the literal string value. (4) Multiline strings — the literal block scalar (|) and folded scalar (>) have different behavior with trailing newlines.` },
  { question: "What is the difference between YAML block style and flow style?", answer: `Block style uses newlines and indentation: each item on its own line. Flow style uses JSON-like inline syntax with {} for mappings and [] for sequences. A YAML file can mix both: a block mapping may contain flow-style lists as values. The formatter outputs block style as the primary format since it is more readable. Flow style is useful for short inline arrays: tags: [web, api, v2] is more compact than three lines of block-style list items.` },
  { question: "How do I represent multiline strings in YAML?", answer: `Two syntaxes: the literal block scalar (|) preserves newlines exactly as written. The folded block scalar (>) converts single newlines to spaces and preserves blank lines as newlines. Example: description: | with text below produces a string with actual newlines preserved. The same with > folds single newlines to spaces. Add - (like |-) to strip the final newline. Add + (like |+) to keep all trailing newlines. Use | for SQL, shell scripts, and content where newlines matter; use > for long prose descriptions.` },
  { question: "What are YAML anchors and aliases?", answer: `Anchors (&name) mark a node for reuse. Aliases (*name) reference a previously defined anchor. This is YAML's built-in DRY mechanism: define common config once and reference it multiple times. Example in Docker Compose: x-common: &common followed by environment settings, then use <<: *common under each service to merge the common configuration. The << key is a YAML merge key. Anchors reduce duplication in large Kubernetes manifests where many jobs share identical environment variables.` },
  { question: "Why does my YAML validate here but fail in Kubernetes or Docker?", answer: `Standard YAML validation checks syntax and structure. Kubernetes and Docker Compose also validate against their specific schemas — the allowed fields, value types, and required keys for each resource kind. A valid YAML file can fail Kubernetes validation because: a field name has a typo (apiVersion: apps/v2 instead of apps/v1), a value has the wrong type (replicas: '3' is a string but Kubernetes requires an integer), or a required field is missing. Use kubectl apply --dry-run=client or docker compose config to validate against the application schema after YAML syntax validation passes.` },
  { question: "How do I convert between YAML and JSON?", answer: `YAML is a superset of JSON — any valid JSON is valid YAML. Converting JSON to YAML just means reformatting to block style. Converting YAML to JSON loses YAML-specific features like comments and anchors. This tool handles both directions. The most common real-world use: Kubernetes objects are typically written as YAML but the API accepts JSON. When you need to convert a Kubernetes manifest for an API call, convert YAML to JSON here, then use the JSON Formatter to clean it up.` },
  { question: "What other config file tools are on this site?", answer: `The JSON Formatter handles the JSON side of YAML-to-JSON conversions. The TOML Formatter covers the third major configuration format used by Cargo.toml and pyproject.toml. The Diff Checker is particularly useful for comparing two versions of a Kubernetes manifest or Docker Compose file before deploying changes. The Docker Compose Generator creates docker-compose.yml files alongside YAML app configs. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'YAML Formatter & Validator — Format YAML Online Free',
    description: 'Format and validate YAML files online. Convert YAML to JSON and back. Catches indentation errors and syntax issues. Runs entirely in your browser.',
    slug: 'yaml-formatter',
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
