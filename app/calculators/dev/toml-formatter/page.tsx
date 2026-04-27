import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'TOML Formatter — Format and Validate TOML Files Free',
  description: 'Format and validate TOML configuration files. Convert between TOML and JSON. Used for Rust Cargo.toml, Python pyproject.toml, and Hugo. Runs in your browser.',
  slug: 'toml-formatter',
  keywords: ['toml formatter online free','toml validator browser','toml lint checker online','toml beautifier free','toml to json converter browser','validate toml syntax online'],
})

const faqs = [
  { question: "What is TOML and which tools use it?", answer: `TOML (Tom's Obvious, Minimal Language) is a configuration file format designed to be minimal and readable. Major uses: Rust ecosystem (Cargo.toml for project dependencies and metadata), Python packaging (pyproject.toml replacing setup.py and setup.cfg), Hugo static site generator (config.toml), Gitea and Forgejo (app.ini is TOML-like), uv Python package manager, and various Go applications. TOML is often compared to YAML and INI — it is more readable than JSON for configuration, less whitespace-sensitive than YAML, and more structured than INI files.` },
  { question: "What is the difference between TOML, YAML, and JSON for configuration?", answer: `TOML: designed for configuration, very human-readable, strict typing (integers, floats, booleans, dates are distinct types), no ambiguity. Each type has explicit syntax. Tables and arrays of tables have unambiguous syntax. YAML: flexible but whitespace-sensitive (indentation errors cause silent failures), many implicit type coercions (yes/no become booleans, 2026-04-15 becomes a date silently). JSON: strict but verbose, no comments allowed, no trailing commas. TOML is the least surprising — its type system is explicit and its syntax is unambiguous. YAML's flexibility makes it error-prone for config files.` },
  { question: "What are the TOML data types and how are they written?", answer: `Strings: 'single quoted' (literal, no escapes) or "double quoted" (processes escape sequences). Multi-line: triple quotes. Integers: 42, -17, 0xFF (hex), 0o77 (octal), 0b1010 (binary), 1_000_000 (underscores for readability). Floats: 3.14, -0.5, 1e6, inf, nan. Booleans: true, false (lowercase only). Dates: 2026-04-15 (local date), 12:30:00 (local time), 2026-04-15T12:30:00Z (datetime with timezone). Arrays: [1, 2, 3] or multi-line. Tables: [table.name] headers. Arrays of tables: [[array.of.tables]].` },
  { question: "How do I represent nested configuration in TOML?", answer: `TOML tables use [section] syntax: [database] host = 'localhost' port = 5432. Nested tables: [database.pool] max_connections = 10. Inline tables: database = { host = 'localhost', port = 5432 } — same as the above but on one line. Arrays of tables (for lists of objects like multiple servers): [[servers]] name = 'prod' host = '10.0.0.1' [[servers]] name = 'staging' host = '10.0.0.2'. The [[double bracket]] syntax creates an array entry each time it appears.` },
  { question: "How do I convert Cargo.toml TOML to JSON for processing?", answer: `This tool converts TOML to JSON. The TOML structure maps to JSON objects (tables → objects, arrays → arrays). After conversion, use the JSON Formatter to validate and the JSONPath Tester to query specific values. For programmatic processing in Rust: serde and toml crates parse Cargo.toml natively. In Python: import tomllib (stdlib in 3.11+) or tomli library. In Node.js: @iarna/toml or smol-toml npm packages. For CI/CD that needs to read Cargo.toml values: toml-query CLI or jq after TOML-to-JSON conversion.` },
  { question: "What are common Cargo.toml configuration patterns?", answer: `Workspace definition: [workspace] members = ['crate-a', 'crate-b']. Package metadata: [package] name = 'my-crate' version = '0.1.0' edition = '2021'. Feature flags: [features] default = ['std'] async = ['tokio']. Build dependencies: [build-dependencies] cc = '1.0'. Dev dependencies: [dev-dependencies] criterion = '0.5'. Profile optimization: [profile.release] opt-level = 3 lto = true. Patch override: [patch.crates-io] serde = { path = '../serde' }.` },
  { question: "What other configuration and format tools are on this site?", answer: `The YAML Formatter handles Kubernetes, Docker Compose, and CI/CD config files. The JSON Formatter validates the JSON output from TOML conversion. The Diff Checker compares two TOML file versions before committing changes. The Environment File Parser handles .env files used alongside TOML configs. The Docker Compose Generator creates docker-compose.yml files that often pair with TOML app configs. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'TOML Formatter — Format and Validate TOML Files Free',
    description: 'Format and validate TOML configuration files. Convert between TOML and JSON. Used for Rust Cargo.toml, Python pyproject.toml, and Hugo. Runs in your browser.',
    slug: 'toml-formatter',
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
