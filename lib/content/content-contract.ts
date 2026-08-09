/**
 * Calculator content contract.
 *
 * This is intentionally small and category-neutral: page copy remains owned by
 * each calculator, while the contract defines what every long-form guide must
 * communicate before it is considered complete.
 */

export type CalculatorContentContract = {
  calculatorName: string
  category: 'health' | 'finance' | 'dev' | 'fun'
  intro: string
  howItWorks: string
  tipsSection: string
  conclusion: string
  benefits: { title: string; text: string }[]
  useCases: { title: string; text: string }[]
  methodology?: string
  limitations?: string[]
  sources?: { label: string; url: string }[]
}

const GENERIC_MARKETING_PATTERNS = [
  /the average american has only/i,
  /trusted by healthcare professionals/i,
  /validated formulas from major health organizations/i,
  /complete data privacy/i,
  /works perfectly on all devices/i,
  /no signup, no subscription/i,
  /100% free/i,
  /best calculator for/i,
]

export function validateCalculatorContent(contract: CalculatorContentContract): string[] {
  const errors: string[] = []
  const text = [
    contract.intro,
    contract.howItWorks,
    contract.tipsSection,
    contract.conclusion,
    ...contract.benefits.flatMap(x => [x.title, x.text]),
    ...contract.useCases.flatMap(x => [x.title, x.text]),
    contract.methodology ?? '',
    ...(contract.limitations ?? []),
  ].join('\n')

  if (!contract.calculatorName.trim()) errors.push('missing calculatorName')
  if (contract.intro.trim().length < 80) errors.push('intro is too short')
  if (contract.howItWorks.trim().length < 80) errors.push('howItWorks is too short')
  if (contract.tipsSection.trim().length < 60) errors.push('tipsSection is too short')
  if (contract.conclusion.trim().length < 60) errors.push('conclusion is too short')
  if (contract.benefits.length === 0) errors.push('no calculator-specific benefits')
  if (contract.useCases.length === 0) errors.push('no calculator-specific use cases')

  for (const pattern of GENERIC_MARKETING_PATTERNS) {
    if (pattern.test(text)) errors.push(`generic marketing phrase: ${pattern.source}`)
  }

  if (contract.category === 'health') {
    if (!contract.methodology?.trim()) errors.push('health calculator missing methodology')
    if (!contract.limitations?.length) errors.push('health calculator missing limitations')
    if (!contract.sources?.length) errors.push('health calculator missing authoritative sources')
  }

  return errors
}
