import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS Specificity Calculator — Selector Specificity Score Free',
  description: 'Calculate CSS selector specificity instantly. Shows the (a,b,c) score and explains why one rule overrides another. Runs in your browser.',
  slug: 'css-specificity',
  keywords: ['css specificity calculator online free','css selector specificity checker','css priority calculator browser','css specificity score tool','css cascade calculator free'],
})

const faqs = [
  { question: "How is CSS specificity calculated?", answer: `Specificity is three numbers (a, b, c) compared left to right. (a) counts ID selectors (#id). (b) counts class selectors (.class), attribute selectors ([type='text']), and pseudo-classes (:hover, :first-child). (c) counts element selectors (div, p, span) and pseudo-elements (::before, ::after). The universal selector (*), combinators (+, >, ~), and :is() with a universal argument add nothing. Compare left to right: a higher (a) always beats a lower (a) regardless of (b) and (c) values. Example: #nav (1,0,0) beats .nav ul li.active (0,2,2) which beats div p span (0,0,3).` },
  { question: "Why does !important override specificity?", answer: `!important steps outside the normal specificity system. A declaration with !important beats all non-important declarations regardless of specificity. When two !important rules conflict, specificity breaks the tie. The intent: user accessibility stylesheets (users who need large text can override site styles), not for fixing specificity battles in application CSS. In application code, !important almost always signals a specificity problem that should be fixed at the selector level. Adding !important creates specificity debt — the next developer needs to also use !important and higher specificity to override it.` },
  { question: "How does inline style specificity compare to selector specificity?", answer: `Inline styles (style='color: red' directly on the HTML element) have specificity (1,0,0,0) — a fourth column that beats all CSS selector specificity. An inline style overrides any selector, including #id selectors, without !important. This is why overriding third-party widget styles with inline attributes is sometimes used as a last resort. CSS Custom Properties defined inline propagate through the cascade normally, but the variable definition itself has inline specificity.` },
  { question: "Does CSS nesting affect specificity?", answer: `CSS nesting follows the same specificity rules as if the nested selector were written flat. .parent .child has specificity (0,2,0) — same as writing it explicitly. The :is() pseudo-class uses the specificity of its most specific argument: :is(#id, .class) has specificity (1,0,0) because #id is most specific. :where(), on the other hand, always contributes zero specificity — extremely useful for utility and reset CSS that should be easily overridable.` },
  { question: "What is the best way to avoid specificity wars in a codebase?", answer: `Several approaches: BEM (Block Element Modifier) methodology uses only single-class selectors like .nav__item--active, keeping all specificity at (0,1,0). CSS Modules and CSS-in-JS solutions generate unique class names per component, making selector conflicts structurally impossible. Tailwind uses utility classes at (0,1,0) specificity. For traditional CSS: never use ID selectors in CSS, never nest more than two levels deep, and use :where() for any base/reset styles that must be easily overridable.` },
  { question: "How do :not(), :is(), and :has() specificity work?", answer: `:not() itself contributes zero specificity, but its argument does. :not(.active) has specificity (0,1,0). :not(#id) has specificity (1,0,0). :is() uses the specificity of its most specific argument — :is(h1, .title, #heading) has specificity (1,0,0) even though two arguments are lower. :where() always contributes zero specificity regardless of arguments — its key advantage for utility CSS. :has() uses the specificity of its most complex argument, like :is().` },
  { question: "What other CSS debugging tools are on this site?", answer: `The Color Contrast Checker verifies accessibility compliance after identifying which color rule is applying. The Flexbox Generator and Grid Generator build layout rules correctly, reducing the need to override positioning with high-specificity selectors. The CSS Animation Generator creates keyframe animations without needing to override existing transitions. The Box Shadow Generator produces clean single-class declarations. All are in the Dev Tools CSS section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS Specificity Calculator — Selector Specificity Score Free',
    description: 'Calculate CSS selector specificity instantly. Shows the (a,b,c) score and explains why one rule overrides another. Runs in your browser.',
    slug: 'css-specificity',
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
