import { FINANCE_QUALITY_BY_SLUG } from '@/lib/content/finance-quality-registry'
import { HEALTH_QUALITY_REGISTRY, type HealthEvidenceStatus } from '@/lib/content/health-quality'
import { HEALTH_SOURCE_PROFILES } from '@/lib/content/health-sources'
import { HEALTH_YMYL_PUBLICATION_GATES, isHealthYMYLPublicationReady } from '@/lib/content/health-ymyl-publication'
import type { FinanceQualityProfile } from '@/lib/content/finance-quality'
import { getFinanceYMYLSourceDefaults } from '@/lib/content/finance-source-defaults'
import { getHealthYMYLSourceDefaults } from '@/lib/content/health-source-defaults'
import { getHealthAuditProfile, getHealthMethodologyFallback, getHealthLimitationsFallback, getHealthAuditSources } from '@/lib/content/health-audit-resolver'

export type YMYLCategory = 'finance' | 'health'

export type YMYLQuality = {
  category: YMYLCategory
  slug: string
  status: string
  title?: string
  methodology?: string
  limitations: string[]
  sources: Array<{ title?: string; label?: string; url: string; accessed?: string; sourceDate?: string; sourceDateType?: 'published' | 'updated' }>
  sourceReferencesPending: boolean
  currentYear?: number
  requiresManualReview: boolean
  indexable: boolean
  indexabilityReason: string
  pageQualityGatePassed: boolean
  pageQualityChecks: { methodology: boolean; limitations: boolean; sources: boolean; safety: boolean; publisher: boolean }
}

// Batch 01 policy: remove noindex from review-pending routes when a route-level
// source profile exists. Only health routes with a critical logic issue remain
// blocked until the calculation itself is corrected. Finance review-pending
// routes may be indexed when their methodology/source profile is present, with
// the page clearly disclosing that review is still pending.
const NON_INDEXABLE_HEALTH: Set<HealthEvidenceStatus> = new Set(['critical_logic_issue', 'redirect_only'])
const NON_INDEXABLE_FINANCE = new Set<string>()

export function getYMYLQuality(category: YMYLCategory, slug: string): YMYLQuality {
  if (category === 'health') {
    const profile = HEALTH_QUALITY_REGISTRY[slug]
    if (!profile) {
      return {
        category,
        slug,
        status: 'unreviewed',
        limitations: ['This health calculator does not yet have a route-level quality profile.', 'It should not be treated as clinically validated until its methodology and evidence are documented.'],
        sources: [],
        sourceReferencesPending: true,
        requiresManualReview: true,
        indexable: false,
        indexabilityReason: 'Missing quality profile',
        pageQualityGatePassed: false,
        pageQualityChecks: { methodology: false, limitations: false, sources: false, safety: true, publisher: true },
      }
    }
    const source = HEALTH_SOURCE_PROFILES[slug]
    const audit = getHealthAuditProfile(slug)
    const methodology = source?.methodology?.trim() || audit?.implementationNotes?.trim() || getHealthMethodologyFallback(slug)
    const limitations = source?.limitations?.length ? source.limitations : getHealthLimitationsFallback(slug)
    const auditSources = getHealthAuditSources(slug)
    const resolvedSources = source?.sources?.length ? source.sources : auditSources.length ? auditSources : getHealthYMYLSourceDefaults(slug)
    const strictGate = HEALTH_YMYL_PUBLICATION_GATES[slug]
    const checks = {
      methodology: Boolean(methodology),
      limitations: Boolean(limitations.length),
      sources: resolvedSources.length > 0,
      safety: true,
      publisher: true,
    }
    const pageQualityGatePassed = Object.values(checks).every(Boolean)
    const indexable = strictGate
      ? (isHealthYMYLPublicationReady(slug) && !NON_INDEXABLE_HEALTH.has(profile.status) && pageQualityGatePassed)
      : (!NON_INDEXABLE_HEALTH.has(profile.status) && pageQualityGatePassed)
    return {
      category,
      slug,
      status: profile.status,
      title: profile.title,
      methodology,
      limitations,
      sources: resolvedSources,
      sourceReferencesPending: !Boolean(resolvedSources.length),
      requiresManualReview: profile.requiresManualReview || !pageQualityGatePassed,
      indexable,
      indexabilityReason: indexable
        ? 'YMYL page-quality gate passed: methodology, limitations, authoritative source coverage, safety disclosure and publisher identity are present'
        : (strictGate && !isHealthYMYLPublicationReady(slug) ? 'Strict calculator publication gate not passed' : 'YMYL page-quality gate not passed'),
      pageQualityGatePassed,
      pageQualityChecks: checks,
    }
  }

  const profile = FINANCE_QUALITY_BY_SLUG.get(slug) as FinanceQualityProfile | undefined
  if (!profile) {
    return {
      category,
      slug,
      status: 'unreviewed',
      limitations: ['This finance calculator does not yet have a route-level quality profile.', 'It should not be treated as reviewed financial, tax, or investment guidance until its methodology and evidence are documented.'],
      sources: [],
      sourceReferencesPending: true,
      requiresManualReview: true,
      indexable: false,
      indexabilityReason: 'Missing quality profile',
      pageQualityGatePassed: false,
      pageQualityChecks: { methodology: false, limitations: false, sources: false, safety: true, publisher: true },
    }
  }
  const resolvedSources = profile.sources.length ? profile.sources : getFinanceYMYLSourceDefaults(slug)
  const checks = {
    methodology: Boolean(profile.methodology?.trim()),
    limitations: Boolean(profile.limitations?.length),
    sources: resolvedSources.length > 0,
    safety: true,
    publisher: true,
  }
  const pageQualityGatePassed = Object.values(checks).every(Boolean)
  const indexable = !NON_INDEXABLE_FINANCE.has(profile.status) && pageQualityGatePassed
  return {
    category,
    slug,
    status: profile.status,
    methodology: profile.methodology,
    limitations: profile.limitations,
    sources: resolvedSources,
    sourceReferencesPending: false,
    currentYear: profile.currentYear,
    requiresManualReview: profile.status === 'needs_manual_review' || profile.status === 'formula_review',
    indexable,
    indexabilityReason: indexable
      ? 'YMYL page-quality gate passed: methodology, limitations, authoritative source coverage, safety disclosure and publisher identity are present'
      : 'YMYL page-quality gate not passed',
    pageQualityGatePassed,
    pageQualityChecks: checks,
  }
}

export function getYMYLStatusLabel(status: string): string {
  switch (status) {
    case 'reviewed': return 'Reviewed methodology'
    case 'verified_formula': return 'Verified formula'
    case 'tax_rule_review': return 'Tax-rule reviewed'
    case 'custom_estimate': return 'Custom planning estimate'
    case 'formula_review': return 'Formula review required'
    case 'needs_formula_review': return 'Formula review required'
    case 'needs_manual_review': return 'Manual review required'
    case 'critical_logic_issue': return 'Critical logic review required'
    default: return 'Quality review required'
  }
}

export function getYMYLDisclaimer(category: YMYLCategory, quality: YMYLQuality): string {
  if (category === 'health') {
    if (quality.status === 'redirect_only') return 'This legacy URL redirects to the canonical pregnancy calculator. Use the canonical destination for the current calculator and methodology.'
    if (quality.status === 'critical_logic_issue') return 'This calculator is not presented as clinically validated. Do not use its result for diagnosis, treatment, medication dosing, or urgent decisions while the calculation logic is under review.'
    if (quality.status === 'needs_formula_review' || quality.status === 'needs_manual_review') return `This educational calculator has a documented methodology, but its formula/evidence review is still pending.${quality.sourceReferencesPending ? ' Source references are being expanded as part of the review process.' : ''} Do not use the result for diagnosis, treatment, medication dosing, or urgent decisions.`
    if (quality.status === 'custom_estimate') return 'This is an educational planning estimate. It is not a diagnosis, treatment recommendation, or substitute for individualized clinical advice.'
    return 'This calculator provides an educational estimate and does not diagnose, treat, or replace individualized medical advice.'
  }
  if (quality.status === 'needs_manual_review' || quality.status === 'formula_review') return `This educational calculator has a documented methodology, but formula/evidence review is still pending.${quality.sourceReferencesPending ? ' Source references are being expanded as part of the review process.' : ''} Do not rely on the result as personalized financial, tax, legal, or investment advice.`
  if (quality.status === 'custom_estimate') return 'This is an educational planning estimate based on the assumptions shown. It is not personalized financial, tax, legal, or investment advice.'
  if (quality.status === 'tax_rule_review') return `Tax treatment is time-sensitive. This page uses the ${quality.currentYear ?? 'applicable'} rules documented in its quality profile; confirm current rules and your personal circumstances before acting.`
  return 'This calculator provides an educational estimate and is not personalized financial, tax, legal, or investment advice.'
}

export function generateYMYLWebPageSchema(params: { title: string; description: string; url: string; category: YMYLCategory; quality: YMYLQuality }) {
  const { title, description, url, category, quality } = params
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    publisher: { '@type': 'Organization', name: 'ToolTrio', url: 'https://tooltrio.com' },
    about: {
      '@type': 'Thing',
      name: title.replace(/\s+\b(calculator|planner|estimator|tool)\b.*$/i, '').trim() || title,
    },
    keywords: category === 'health' ? ['health calculator', 'health estimate', 'methodology', 'limitations'] : ['financial calculator', 'financial estimate', 'methodology', 'limitations'],
    ...(quality.currentYear ? { temporalCoverage: String(quality.currentYear) } : {}),
  }
}
