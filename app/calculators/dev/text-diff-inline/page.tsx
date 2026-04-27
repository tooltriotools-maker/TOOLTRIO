import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Inline Text Diff — Compare Two Texts Word by Word Free',
  description: 'Compare two text blocks with word-level and character-level inline highlighting. See exactly which words were added, removed, or changed. Runs in your browser.',
  slug: 'text-diff-inline',
  keywords: ['inline diff checker online free','side by side text diff browser','show text changes inline','text compare highlight differences','unified diff viewer online'],
})

const faqs = [
  { question: "What is the difference between inline diff and side-by-side diff?", answer: `Inline diff shows both versions in a single flow — deleted text marked in red, added text in green, all in one column. This is ideal for prose comparisons where you want to see the exact word or character changes in context without switching eyes between two panels. Side-by-side diff shows the two versions in parallel columns — better for code comparisons where line structure matters and you want to see unchanged context lines clearly. For comparing blog post revisions, API response text changes, or documentation edits: inline diff is more intuitive. For comparing code files: side-by-side is the standard (see the Diff Checker tool on this site).` },
  { question: "What is the difference between word-level and character-level diffing?", answer: `Word-level diff identifies which words were added or removed between two texts — the granularity is whole words separated by spaces. Character-level diff goes deeper, highlighting the specific characters within changed words. Example: changing 'colour' to 'color' in word-level diff shows the entire word 'colour' deleted and 'color' added. In character-level diff, only 'ou' → 'o' is highlighted as changed. Character-level is more precise and shows smaller changes clearly. Word-level is cleaner for documents with many small word substitutions.` },
  { question: "What diff algorithm does this use?", answer: `This tool uses the Myers diff algorithm (1986) — the same algorithm used by git diff, GNU diff, and most diff tools. Myers finds the shortest edit script (minimum number of insertions and deletions) to transform one text into the other. For word-level diffing, the algorithm is applied to sequences of words rather than characters. When multiple minimum-distance solutions exist (tie-breaking), different implementations may show different diffs that are equally valid — this is why the same two texts can produce visually different diffs in different tools.` },
  { question: "How do I compare two JSON responses to find what changed?", answer: `For structural JSON comparison: format both with the JSON Formatter first (ensure consistent indentation), then paste into this tool. Formatted JSON diffs show you exactly which values changed. For semantic JSON comparison (ignoring key order, which is meaningless in JSON objects): a specialized JSON diff tool is better. Diffing unformatted JSON against formatted JSON shows every character as changed — always normalize format before comparing. This inline tool is best for prose and text content; use the Diff Checker tool on this site for code and structured data comparisons.` },
  { question: "What are common use cases for inline text diffing?", answer: `Editorial review: showing an author exactly which words their editor changed in a document. Translation QA: comparing original text against back-translated text to identify semantic shifts. Content moderation: comparing submitted content against a policy document to identify differences. Version comparison: showing users what changed between two versions of a terms of service or policy document. API response monitoring: alerting when a third-party API response changes in unexpected ways. Content deduplication: verifying that similar articles are not too close to each other.` },
  { question: "How do I ignore whitespace differences when comparing text?", answer: `Whitespace-only differences (extra spaces, tabs, line endings) often produce noisy diffs that obscure real content changes. Enable 'ignore whitespace' mode to see only semantic content differences. This is especially important when comparing text from different sources: a document pasted from Word (CRLF line endings) versus text from a Unix editor (LF) appears completely different at the character level without whitespace normalization. Normalize line endings first by converting CRLF to LF before comparison.` },
  { question: "What other comparison and text tools are on this site?", answer: `The Diff Checker shows side-by-side line-level diffs — better for code comparisons. The Duplicate Remover finds repeated lines within a single document. The Word Counter measures the size of each version before comparison. The Regex Tester can find specific patterns that differ between two texts. The JSON Formatter normalizes JSON for clean diffing. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Inline Text Diff — Compare Two Texts Word by Word Free',
    description: 'Compare two text blocks with word-level and character-level inline highlighting. See exactly which words were added, removed, or changed. Runs in your browser.',
    slug: 'text-diff-inline',
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
