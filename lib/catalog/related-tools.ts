import { GENERATED_TOOL_PAGE_METADATA } from './generated-tool-metadata'
const REDIRECTED_TOOL_HREFS = new Set<string>([
  '/calculators/fun/insult-generator',
])
import { TOOL_CATALOG, type ToolCategory, type ToolRecord } from './tools'

export type RelatedTool = {
  name: string
  href: string
  icon: string
  desc: string
}

const CATEGORY_ICONS: Record<ToolCategory, string> = {
  finance: '💰',
  health: '❤️',
  dev: '🛠️',
  fun: '🎯',
  zip: '📍',
  commodities: '📈',
}

function tokens(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(/\s+/)
      .filter(token => token.length >= 3)
      .filter(token => !['calculator', 'tool', 'online', 'free', 'usa', '2026'].includes(token)),
  )
}

function overlap(a: Set<string>, b: Set<string>): number {
  let score = 0
  for (const token of a) if (b.has(token)) score += 1
  return score
}

function candidateText(tool: ToolRecord): string {
  const page = GENERATED_TOOL_PAGE_METADATA[tool.href]
  return [tool.name, tool.kw, page?.title, page?.description, ...(page?.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
}

function toRelatedTool(tool: ToolRecord): RelatedTool {
  const page = GENERATED_TOOL_PAGE_METADATA[tool.href]
  return {
    name: tool.name,
    href: tool.href,
    icon: CATEGORY_ICONS[tool.cat],
    desc: page?.description?.trim() || tool.kw,
  }
}

/**
 * Deterministically chooses related tools from the canonical catalog.
 * Explicit page-level related arrays may still override this during migration,
 * but new pages should rely on this resolver instead of duplicating arrays.
 */
export function getRelatedTools(href: string, limit = 6): RelatedTool[] {
  const current = TOOL_CATALOG.find(tool => tool.href === href)
  if (!current) return []

  const currentRegion = current.region ?? 'global'
  const currentTokens = tokens(candidateText(current))

  return TOOL_CATALOG
    .filter(tool => tool.href !== href && !REDIRECTED_TOOL_HREFS.has(tool.href))
    .map(tool => {
      const candidateRegion = tool.region ?? 'global'
      const candidateTokens = tokens(candidateText(tool))
      const sharedTokens = overlap(currentTokens, candidateTokens)

      let score = sharedTokens * 10
      if (tool.cat === current.cat) score += 35
      if (candidateRegion === currentRegion) score += 25
      if (candidateRegion === 'global' || currentRegion === 'global') score += 5

      // Prefer closely related tools but keep results deterministic.
      score += Math.max(0, 8 - Math.abs(tool.name.length - current.name.length) / 10)

      return { tool, score, sharedTokens }
    })
    .filter(item => item.sharedTokens > 0 || item.tool.cat === current.cat)
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, limit)
    .map(item => toRelatedTool(item.tool))
}
