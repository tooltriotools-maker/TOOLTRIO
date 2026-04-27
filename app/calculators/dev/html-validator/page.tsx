import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'HTML Validator — Validate HTML Syntax Free Online',
  description: 'Validate HTML markup for syntax errors and best practices. Checks tag nesting, required attributes, and semantic structure. Runs in your browser.',
  slug: 'html-validator',
  keywords: ['html validator online free','validate html code browser','html syntax checker','w3c html validator alternative','html lint tool online free'],
})


const faqs = [
  { question: 'What does HTML validation actually check?', answer: "HTML validation checks conformance to the HTML specification: proper nesting (no block elements inside inline elements, no <p> inside <a>), required attributes present (img must have alt, input should have id matching a label), deprecated elements and attributes (font, center, align attribute), unclosed tags, duplicate IDs, and proper DOCTYPE. What validation does not check: visual appearance, accessibility beyond basic semantics, JavaScript behavior, link validity, or performance. Validation is the baseline — a valid HTML file can still be inaccessible, slow, and poorly structured." },
  { question: 'Does my site need to be 100% valid HTML to rank well in search engines?', answer: "No — Google and other search engines parse HTML liberally and handle many common errors. Invalid HTML that renders correctly in browsers will not be penalized in search rankings just for failing W3C validation. However, some validation errors affect search: missing or duplicate title tags, improperly nested heading structure (h1 inside h3), missing alt text, and broken meta tags. These are also accessibility issues. The practical approach: fix errors that affect rendering, accessibility, and structured data. Ignore cosmetic errors in valid-enough HTML from third-party embeds that you cannot control." },
  { question: 'What is the difference between HTML and XHTML validation?', answer: "HTML5 (served as text/html) is parsed by a lenient HTML parser that handles omitted closing tags, attribute values without quotes, and other deviations gracefully. XHTML (served as application/xhtml+xml) is parsed by a strict XML parser — any well-formedness error (missing closing tag, unquoted attribute) causes a visible parsing error in the browser. XHTML requires: all tags closed (including void elements: <br /> not <br>), lowercase tag names, quoted attributes, and explicit XML namespace declarations. Modern best practice: use HTML5 served as text/html — it has better browser support and more forgiving parsing while the HTML spec defines valid syntax." },
  { question: 'What are the most common HTML validation errors I should fix?', answer: "High-priority: missing or duplicate id attributes (breaks JavaScript and accessibility), img missing alt attribute (accessibility failure), form input without associated label (accessibility failure), missing lang attribute on html element (required for accessibility tools), improper heading hierarchy (h1 skipping to h4), and open tags never closed. Lower priority: obsolete attributes (align, bgcolor), presentational elements (font, center, b vs strong), trailing slashes on void elements (<br/> in HTML5 is valid but unnecessary). Errors from third-party embed scripts (analytics, ads) are generally acceptable to ignore." },
  { question: 'How do I validate HTML as part of my CI/CD pipeline?', answer: "Use the W3C Markup Validator API (validator.w3.org/docs/api.html) with a curl command or npm package. The htmlhint npm package is a linter (not a full validator) that runs in Node.js and integrates with most CI systems. The html-validate npm package provides more complete HTML5 validation in CI. For React/Next.js: ESLint with eslint-plugin-jsx-a11y catches accessibility-related HTML issues in JSX. Lighthouse CI (available as a GitHub Action) checks HTML quality as part of a broader audit. Run validation on rendered HTML (not JSX source) for the most accurate results." },
  { question: 'Does HTML validation check for accessibility?', answer: "Basic validation checks some structural accessibility requirements: presence of alt attributes, label associations, lang attributes, proper heading use. But full accessibility requires more: color contrast ratios (WCAG 1.4.3), keyboard navigation (focus management), ARIA roles and properties (aria-label, aria-describedby), dynamic content announcements (aria-live), sufficient link text (not just 'click here'), and logical reading order. For accessibility testing, use axe-core (browser extension or npm package), Lighthouse accessibility audit, or NVDA/VoiceOver screen reader testing in addition to HTML validation." },
  { question: 'What other HTML and markup tools are on this site?', answer: "The HTML Encoder escapes special characters to prevent XSS before insertion into HTML. The HTML Entity Reference lists all named entities. The HTML to Markdown converter transforms HTML content to Markdown format. The Meta Tag Generator produces correct HTML for SEO and social tags. The Color Contrast Checker verifies accessibility for colors used in your HTML. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'HTML Validator — Validate HTML Syntax Free Online',
    description: 'Validate HTML markup for syntax errors and best practices. Checks tag nesting, required attributes, and semantic structure. Runs in your browser.',
    slug: 'html-validator',
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
