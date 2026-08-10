import { HEALTH_BATCH_03_AUDITS } from '@/lib/content/health-batch-03'
import { HEALTH_BATCH_04_AUDITS } from '@/lib/content/health-batch-04'
import { HEALTH_BATCH_05_AUDITS } from '@/lib/content/health-batch-05'
import { HEALTH_BATCH_06_AUDITS } from '@/lib/content/health-batch-06'
import { HEALTH_BATCH_07 as HEALTH_BATCH_07_AUDITS } from '@/lib/content/health-batch-07'

const AUDITS: Record<string, any> = Object.assign({}, HEALTH_BATCH_03_AUDITS, HEALTH_BATCH_04_AUDITS, HEALTH_BATCH_05_AUDITS, HEALTH_BATCH_06_AUDITS, HEALTH_BATCH_07_AUDITS)

export function getHealthAuditProfile(slug: string) {
  return AUDITS[slug] as any | undefined
}

export function getHealthMethodologyFallback(slug: string) {
  const audit = AUDITS[slug]
  if (audit?.formula) return String(audit.formula)
  return `Educational calculation based on the inputs shown on this page and the calculation method implemented by this tool. The result is an estimate or planning aid and is not, by itself, evidence of a diagnosis, treatment effect, or clinical validation.`
}

export function getHealthLimitationsFallback(slug: string) {
  const audit = AUDITS[slug]
  if (audit?.limitations?.length) return audit.limitations.map(String)
  return [
    'Inputs, assumptions and measurement conditions can materially affect the result.',
    'This tool does not replace individualized medical assessment, diagnosis or treatment.',
    'Use the result as educational context and verify material health decisions with an appropriate qualified professional.',
  ]
}

export function getHealthAuditSources(slug: string) {
  const audit = AUDITS[slug]
  if (audit?.sources?.length) return audit.sources.map((s: any) => ({ label: s.label ?? s.title ?? 'Source', url: s.url, sourceDate: s.reviewed }))
  return []
}
