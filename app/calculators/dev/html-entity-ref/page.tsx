import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'HTML Entity Reference — All HTML Entities Free',
  description: 'Complete reference of HTML character entities — named, numeric decimal, and hex. Search by character or entity name. Runs in your browser.',
  slug: 'html-entity-ref',
  keywords: ['html entity reference guide online','html special characters list','html entities cheat sheet free','html named entities browser','html character codes reference','&nbsp; &copy; entity lookup free'],
})


const faqs = [
  {
    question: 'What are the most commonly needed HTML entities?',
    answer: 'The must-know set: &amp; for &, &lt; for <, &gt; for >, &quot; for double-quote, &apos; for apostrophe — the five required escapes. Typographic: &mdash; for em-dash, &ndash; for en-dash, &lsquo; &rsquo; for curly single quotes, &ldquo; &rdquo; for curly double quotes, &hellip; for ellipsis, &bull; for bullet. Legal: &copy; for ©, &reg; for ®, &trade; for ™. Math: &deg; for °, &plusmn; for ±, &times; for ×, &divide; for ÷, &ne; for ≠. Non-breaking: &nbsp;. Currency: &euro; for €, &pound; for £, &yen; for ¥.',
  },
  {
    question: 'What is the difference between &ndash; and &mdash;?',
    answer: 'En dash (&ndash;, –) is used for numeric ranges like pages 10–20 or years 1990–2000. Em dash (&mdash;, —) is used for parenthetical statements—like this one—that interrupt a sentence, or abrupt changes in thought. A hyphen (-) is different from both: it joins hyphenated compound words and provides line-break hints. All three are distinct Unicode characters with different widths and typographic meanings.',
  },
  {
    question: 'Do I need HTML entities for accented characters like é and ü?',
    answer: 'No — in modern UTF-8 HTML5 you can use the actual Unicode characters directly. Just declare <meta charset="UTF-8"> in your <head> and type or paste é, ü, ñ, Japanese, Arabic, or emoji directly in your HTML. HTML entity equivalents like &eacute; are only necessary when you cannot save files in UTF-8, or when you prefer ASCII-safe source code. The entity form is always valid; direct Unicode is simpler.',
  },
  {
    question: 'What is the difference between &#160; and &nbsp;?',
    answer: 'They are identical — both represent the non-breaking space character (Unicode U+00A0). &#160; is the decimal numeric reference, &#xA0; is hexadecimal, and &nbsp; is the named entity. All three produce the same character. Named entities are more readable in source. Numeric entities work for any Unicode character regardless of whether a named entity exists.',
  },
  {
    question: 'How do I type HTML entities in my code editor efficiently?',
    answer: 'Most editors support snippets: type amp and expand to &amp; etc. VS Code has built-in HTML entity snippets in HTML mode, and Emmet handles common insertions. The practical workflow: memorise the 5 required entities (&lt; &gt; &amp; &quot; &apos;) and common typographic ones (&mdash; &ndash; &nbsp; &copy;). For infrequent characters, look them up here then copy-paste the actual Unicode character — cleaner than entity syntax in UTF-8 files.',
  },
  {
    question: 'Are HTML entities the same as XML entities?',
    answer: 'Mostly — XML supports a subset. Both share &amp; &lt; &gt; &apos; &quot; as required entities. Named entities beyond these five (&mdash; &copy; &nbsp;) are HTML-specific and not valid in bare XML. XHTML requires explicit DTD declaration of HTML entities. HTML5 supports all named entities. In XML you define custom entities in the DTD. Most developers use an XML library that handles entities automatically rather than writing them manually.',
  },
  {
    question: 'What other HTML tools are on this site?',
    answer: 'The HTML Encoder escapes individual strings into entity format. The HTML Validator checks your HTML for structural errors. The HTML to Markdown converter strips tags and converts structure to Markdown. The Character Encoder provides Unicode code point information. The Meta Tag Generator produces the HTML for SEO and social tags. All are in the Dev Tools section.',
  },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'HTML Entity Reference — All HTML Entities Free',
    description: 'Complete reference of HTML character entities — named, numeric decimal, and hex. Search by character or entity name. Runs in your browser.',
    slug: 'html-entity-ref',
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
