import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Diff Checker — Compare Text Side by Side Free Online',
  description: 'Compare two blocks of text or code and see differences highlighted line by line. Added, removed, and changed lines clearly marked. Runs entirely in your browser.',
  slug: 'diff-checker',
  keywords: ['diff checker online free','text comparison tool browser','compare two texts online','diff files online free','text diff side by side'],
})

const faqs = [
  { question: "What is the difference between unified diff and side-by-side diff?", answer: `A unified diff shows both versions in a single column with + marking added lines, - marking removed lines, and context lines in between — the format produced by git diff and diff -u. A side-by-side diff shows the two versions in parallel columns with differences highlighted on the same row. Side-by-side diffs are easier to read for large blocks of prose or when comparing two complete files. Side-by-side uses more horizontal space, which is why terminals default to unified format while web-based tools default to side-by-side.` },
  { question: "Why does my diff show differences on lines I did not change?", answer: `The most common cause: whitespace differences. Trailing spaces, different line endings (CRLF on Windows vs LF on Unix), and mixed tab/space indentation all appear identical visually but produce diff output. A CRLF file pasted into a LF environment may show every single line as changed. Use the 'ignore whitespace' option to see semantic differences only. In git: git diff --ignore-space-at-eol or git diff -w (ignore all whitespace) helps identify real changes vs formatting noise.` },
  { question: "How do I compare two JSON objects to find what changed?", answer: `Format both JSON objects with the JSON Formatter on this site first to ensure consistent indentation — comparing minified JSON against formatted JSON shows everything as changed. After formatting both, paste here for a meaningful structural diff. For semantic JSON comparison (ignoring key order), a specialized JSON diff tool is more appropriate since key-order differences in objects are meaningless in JSON but appear as changes in text diff.` },
  { question: "Can I use this to compare two SQL migration scripts before running one?", answer: `Yes — this is a particularly good use case. SQL migrations that are almost identical (a column rename, a constraint change) are easy to misread when viewed separately. The diff highlights exactly what is different between the current migration and the target, making it much harder to accidentally run the wrong version. Paste the old migration in the left panel and the new one in the right.` },
  { question: "How should I compare environment config files (.env) safely?", answer: `Since this tool runs entirely in your browser and transmits nothing to any server, it is safe to paste .env files with real credentials for comparison. The content exists only in your browser tab and is cleared when you close it. The diff is particularly useful for comparing a .env.example file against a production .env — seeing which variables are defined in one but missing from the other. Close the tab after comparison rather than leaving sensitive credentials in browser input fields.` },
  { question: "What is the Myers diff algorithm?", answer: `The Myers diff algorithm (1986) finds the shortest edit script between two sequences — the minimum number of insertions and deletions to transform one text into the other. It is the algorithm behind git diff, GNU diff, and most diff tools. When multiple minimum-distance solutions exist, the specific diff displayed can vary between tools based on tie-breaking — this is why the same two files can produce visually different diffs in different tools even though both show the minimum number of changes.` },
  { question: "What other comparison and validation tools are on this site?", answer: `The JSON Formatter validates and formats JSON before comparison to avoid whitespace noise. The SQL Formatter does the same for SQL queries. The YAML Formatter is useful before comparing Kubernetes config files. The Text Diff Inline tool shows word-level changes merged into a single view — better for prose documents with many small edits. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Diff Checker — Compare Text Side by Side Free Online',
    description: 'Compare two blocks of text or code and see differences highlighted line by line. Added, removed, and changed lines clearly marked. Runs entirely in your browser.',
    slug: 'diff-checker',
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
