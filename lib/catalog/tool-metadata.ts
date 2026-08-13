import { GENERATED_TOOL_PAGE_METADATA } from './generated-tool-metadata'
import type { ToolCategory, ToolRecord } from './tools'

export type ToolType =
  | 'calculator'
  | 'comparison'
  | 'converter'
  | 'generator'
  | 'planner'
  | 'tracker'
  | 'reference'
  | 'other'

export type ToolQualityStatus =
  | 'unreviewed'
  | 'reviewed'
  | 'formula_review'
  | 'tax_rule_review'
  | 'custom_estimate'
  | 'needs_manual_review'

export type ToolSource = {
  title: string
  url: string
  accessed?: string
}

/**
 * Registry metadata is deliberately separate from route identity.
 *
 * IMPORTANT:
 * - No `lastReviewed` date is generated here. A review date must be an explicit,
 *   evidence-backed value, never today's date by default.
 * - SEO title/description/keywords are optional until the page has calculator-
 *   specific copy. We do not manufacture generic SEO padding.
 * - Finance quality data is promoted from the Finance Quality Registry so the
 *   same evidence is not duplicated in application code.
 */
export type ToolMetadata = {
  slug: string
  canonicalUrl: string
  region?: ToolRecord['region']
  toolType: ToolType
  description?: string
  seoTitle?: string
  seoDescription?: string
  keywords?: readonly string[]
  qualityStatus: ToolQualityStatus
  methodology?: string
  limitations: readonly string[]
  sources: readonly ToolSource[]
  currentYear?: number
  lastReviewed?: string
}

function slugFromHref(href: string): string {
  return href.split('/').filter(Boolean).at(-1) ?? href
}

function inferToolType(tool: ToolRecord): ToolType {
  const text = `${tool.name} ${tool.href}`.toLowerCase()
  if (/(generator|builder|formatter|encoder|decoder|parser|preview)/.test(text)) return 'generator'
  if (/(converter|convert|to-json|to-csv|to-markdown)/.test(text)) return 'converter'
  if (/(compare|comparison|vs-| vs |versus)/.test(text)) return 'comparison'
  if (/(tracker|portfolio-tracker|net-worth-tracker)/.test(text)) return 'tracker'
  if (/(planner|planning|optimizer|budget)/.test(text)) return 'planner'
  if (/(guide|reference|http-status|http-headers|mime-type)/.test(text)) return 'reference'
  if (/(calculator|calculator)/.test(text)) return 'calculator'
  return 'other'
}

function qualityFor(_tool: ToolRecord): Pick<ToolMetadata, 'qualityStatus' | 'methodology' | 'limitations' | 'sources' | 'currentYear'> {
  return {
    qualityStatus: 'unreviewed',
    limitations: [],
    sources: [],
  }
}

/** Build non-fabricated metadata from the canonical route record. */
export function buildToolMetadata(tool: ToolRecord): ToolMetadata {
  const quality = qualityFor(tool)
  const slug = slugFromHref(tool.href)

  const page = GENERATED_TOOL_PAGE_METADATA[tool.href]

  return {
    slug,
    canonicalUrl: tool.href,
    region: tool.region,
    toolType: inferToolType(tool),
    description: page?.description,
    seoTitle: page?.title,
    seoDescription: page?.description,
    keywords: page?.keywords?.length ? page.keywords : undefined,
    qualityStatus: quality.qualityStatus,
    methodology: quality.methodology,
    limitations: quality.limitations,
    sources: quality.sources,
    currentYear: quality.currentYear,
  }
}

export function buildToolMetadataMap(tools: readonly ToolRecord[]): ReadonlyMap<string, ToolMetadata> {
  return new Map(tools.map(tool => [tool.href, buildToolMetadata(tool)]))
}

export function categoryLabel(category: ToolCategory): string {
  switch (category) {
    case 'finance': return 'Finance'
    case 'health': return 'Health'
    case 'dev': return 'Dev Tools'
    case 'fun': return 'Fun'
    case 'zip': return 'ZIP Tools'
    case 'commodities': return 'Commodities'
  }
}
