/**
 * Calculator FAQ policy.
 *
 * FAQs should answer questions about the calculator, its methodology, inputs,
 * interpretation, assumptions, or limitations. Product-wide marketing/privacy
 * questions belong in the site's shared product/legal surfaces, not on every
 * calculator page.
 */

export type CalculatorFAQ = { question: string; answer: string }

const GENERIC_FAQ_PATTERNS = [
  /\bcompletely free\b/i,
  /\b100% free\b/i,
  /\bfree to use\b/i,
  /\bno (?:account )?registration\b/i,
  /\bno signup\b/i,
  /\bno subscription\b/i,
  /\bno ads\b/i,
  /\bdata (?:stored|shared|sold)\b/i,
  /\bprivacy\b.*\bdata\b/i,
  /\bworks (?:on|with) (?:all|any) devices\b/i,
  /\bmobile (?:devices?|friendly)\b/i,
  /\bmultiple currencies\b/i,
  /\bwhat currencies\b/i,
  /\bcan i use this calculator for both\b/i,
]

export function isGenericCalculatorFAQ(faq: CalculatorFAQ): boolean {
  const text = `${faq.question}\n${faq.answer}`
  return GENERIC_FAQ_PATTERNS.some(pattern => pattern.test(text))
}

export function filterCalculatorFAQs<T extends CalculatorFAQ>(faqs: T[]): T[] {
  return faqs.filter(faq => !isGenericCalculatorFAQ(faq))
}
