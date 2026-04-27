import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Text Case Converter — camelCase, snake_case, PascalCase Free',
  description: 'Convert text between camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, and Title Case instantly. Runs entirely in your browser.',
  slug: 'text-case-converter',
  keywords: ['text case converter online free','camelcase to snake_case browser','upper lower case converter','kebab case converter online','title case converter free','PascalCase converter tool'],
})

const faqs = [
  { question: "What are the standard naming conventions for each case format?", answer: `camelCase: first word lowercase, subsequent words capitalized — used for JavaScript variables and functions, Java/C# methods. PascalCase (UpperCamelCase): every word capitalized — used for classes, React components, TypeScript types. snake_case: words separated by underscores, all lowercase — Python variables, functions, modules, Ruby, database column names. SCREAMING_SNAKE_CASE: all uppercase with underscores — constants in Python, Java, and C. kebab-case: lowercase words separated by hyphens — CSS class names, URL slugs, npm package names, CLI flags. Title Case: every major word capitalized — headings, article titles.` },
  { question: "Why do Python and JavaScript use different naming conventions?", answer: `Each language community developed conventions independently. Python's PEP 8 style guide specifies snake_case for functions and variables — preferred for readability. JavaScript inherited camelCase from Java, which heavily influenced early JavaScript design. CSS and HTML used kebab-case partly because underscores had special meaning in early CSS contexts. These conventions became entrenched through community adoption, linters, and official style guides. Converting between them is a constant task when writing code that bridges ecosystems.` },
  { question: "How does the converter handle abbreviations and acronyms?", answer: `Abbreviations in naming conventions are inconsistently handled even within communities. In camelCase: 'getUserID' vs 'getUserId' — both appear in real codebases. Google's Java style guide specifies treating abbreviations as words (getUserId), making casing more predictable. This converter treats abbreviations as words: XML becomes Xml in PascalCase and xml in snake_case. If your codebase already uses a different convention for abbreviations, manually adjust the output.` },
  { question: "What is the difference between camelCase and lowerCamelCase?", answer: `They are the same thing. 'lowerCamelCase' is the explicit name distinguishing from UpperCamelCase (PascalCase). When developers say 'camelCase' without a prefix qualifier, they almost always mean lowerCamelCase — first letter lowercase, each subsequent word starts uppercase. UpperCamelCase = PascalCase: every word starts uppercase. When a style guide says 'use camelCase for variables', it means lowerCamelCase (getUser, not GetUser).` },
  { question: "How do I convert database column names to JavaScript variable names?", answer: `Database columns use snake_case (user_first_name, created_at, is_active). JavaScript uses camelCase (userFirstName, createdAt, isActive). Paste the column names one per line into this converter, select snake_case as input and camelCase as output. Most ORMs (Sequelize, Prisma, TypeORM) handle this conversion automatically in their field mapping. For manual API response mapping, this converter makes the rename operation instant.` },
  { question: "What is Title Case vs Sentence case?", answer: `Title Case capitalizes the first letter of every major word: 'The Quick Brown Fox Jumps Over the Lazy Dog' (prepositions like 'over' and articles like 'the' may be lowercase depending on the style guide — AP, Chicago, and APA all have slightly different rules). Sentence case capitalizes only the first word and proper nouns: 'The quick brown fox jumps over the lazy dog'. Most modern UI design favors sentence case for buttons and labels. Blog post titles typically use Title Case.` },
  { question: "What other text manipulation tools are on this site?", answer: `The Word Counter gives length statistics for the converted text. The Duplicate Remover strips repeated lines after converting a list of identifiers. The Regex Tester can find and replace casing patterns in more complex scenarios. The Diff Checker verifies that a case conversion did not accidentally change content beyond the casing. The Line Sorter sorts converted identifiers alphabetically. All are in the Dev Tools Text section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Text Case Converter — camelCase, snake_case, PascalCase Free',
    description: 'Convert text between camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, and Title Case instantly. Runs entirely in your browser.',
    slug: 'text-case-converter',
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
