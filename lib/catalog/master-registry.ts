/**
 * Master Tool Registry
 *
 * This is the single application-facing registry for every canonical ToolTrio
 * tool. The generated route catalog remains the filesystem-backed generator
 * input, while every consumer (search, sitemap, TrioBot, counts and llms.txt)
 * reads through this stable API.
 *
 * Do not import ./tools directly from application features. If the catalog
 * shape changes, update this boundary once and keep consumers decoupled.
 */
import { TOOL_CATALOG, type ToolCategory, type ToolRecord } from './tools'
import { buildToolMetadata, type ToolMetadata } from './tool-metadata'

export type { ToolCategory, ToolRecord }
export type { ToolMetadata } from './tool-metadata'

export type MasterToolRecord = ToolRecord & {
  metadata: ToolMetadata
}

export const REDIRECTED_TOOL_HREFS = new Set<string>([
  '/calculators/health/pregnancy-due-date-calculator',
  '/calculators/fun/insult-generator',
])

export const MASTER_TOOL_REGISTRY: readonly MasterToolRecord[] = TOOL_CATALOG
  .filter(tool => !REDIRECTED_TOOL_HREFS.has(tool.href))
  .map(tool => ({ ...tool, metadata: buildToolMetadata(tool) }))

export const TOOL_COUNTS: Record<ToolCategory, number> = MASTER_TOOL_REGISTRY.reduce(
  (counts, tool) => {
    counts[tool.cat] += 1
    return counts
  },
  { finance: 0, health: 0, dev: 0, fun: 0, zip: 0, commodities: 0 } as Record<ToolCategory, number>,
)

export const CALCULATOR_COUNTS = {
  finance: TOOL_COUNTS.finance,
  health: TOOL_COUNTS.health,
  dev: TOOL_COUNTS.dev,
  fun: TOOL_COUNTS.fun,
} as const

export const TOOL_TOTAL = MASTER_TOOL_REGISTRY.length

export const TOOL_REGION_COUNTS: Record<NonNullable<ToolMetadata['region']>, number> = MASTER_TOOL_REGISTRY.reduce(
  (counts, tool) => {
    const region = tool.metadata.region ?? 'global'
    counts[region] += 1
    return counts
  },
  { usa: 0, uk: 0, europe: 0, india: 0, global: 0 } as Record<NonNullable<ToolMetadata['region']>, number>,
)

export function getToolsByRegion(region: NonNullable<ToolMetadata['region']>): readonly MasterToolRecord[] {
  return MASTER_TOOL_REGISTRY.filter(tool => (tool.metadata.region ?? 'global') === region)
}

export function getToolsByCategory(category: ToolCategory): readonly MasterToolRecord[] {
  return MASTER_TOOL_REGISTRY.filter(tool => tool.cat === category)
}

export function findToolByHref(href: string): MasterToolRecord | undefined {
  return MASTER_TOOL_REGISTRY.find(tool => tool.href === href)
}

export function getToolMetadata(href: string): ToolMetadata | undefined {
  return findToolByHref(href)?.metadata
}

export function searchMasterRegistry(query: string, limit = 20): MasterToolRecord[] {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (!words.length) return []

  return MASTER_TOOL_REGISTRY
    .map(tool => {
      const name = tool.name.toLowerCase()
      const catalogKeywords = tool.kw.toLowerCase()
      const metadata = [
        tool.metadata.seoTitle,
        tool.metadata.description,
        ...(tool.metadata.keywords ?? []),
      ].filter(Boolean).join(' ').toLowerCase()
      const href = tool.href.toLowerCase()
      let score = 0
      for (const word of words) {
        if (name === word) score += 100
        else if (name.startsWith(word)) score += 30
        else if (name.includes(word)) score += 18
        if (catalogKeywords.includes(word)) score += 8
        if (metadata.includes(word)) score += 6
        if (href.includes(word)) score += 3
      }
      return { tool, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, limit)
    .map(item => item.tool)
}

export function masterRegistryIntegrityErrors(): string[] {
  const errors: string[] = []
  const seen = new Set<string>()

  for (const tool of MASTER_TOOL_REGISTRY) {
    if (seen.has(tool.href)) errors.push(`Duplicate tool href: ${tool.href}`)
    seen.add(tool.href)
    if (!tool.name.trim()) errors.push(`Missing tool name: ${tool.href}`)
    if (!tool.href.startsWith('/')) errors.push(`Tool href must be relative: ${tool.href}`)
    if (!tool.catLabel.trim()) errors.push(`Missing category label: ${tool.href}`)
  }

  return errors
}
