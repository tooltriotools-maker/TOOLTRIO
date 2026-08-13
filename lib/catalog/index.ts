import { MASTER_TOOL_REGISTRY, TOOL_COUNTS, CALCULATOR_COUNTS, TOOL_TOTAL, findToolByHref, getToolMetadata, getToolsByCategory, searchMasterRegistry, masterRegistryIntegrityErrors } from './master-registry'
import { BLOG_CATALOG } from './blog'
import type { ToolCategory, ToolRecord } from './master-registry'

export type { MasterToolRecord, ToolMetadata } from './master-registry'
export { MASTER_TOOL_REGISTRY, BLOG_CATALOG, TOOL_COUNTS, CALCULATOR_COUNTS, TOOL_TOTAL, findToolByHref, getToolMetadata, getToolsByCategory, searchMasterRegistry, masterRegistryIntegrityErrors }

/** Public discovery catalog: only active public ToolTrio categories are registered. */
export const PUBLIC_TOOL_REGISTRY = MASTER_TOOL_REGISTRY
export type { ToolCategory, ToolRecord }

// Backward-compatible aliases. New application code should use MASTER_TOOL_REGISTRY.
export const TOOL_CATALOG = MASTER_TOOL_REGISTRY
export const ACTIVE_TOOL_CATALOG = MASTER_TOOL_REGISTRY
export const PUBLIC_ACTIVE_TOOL_CATALOG = PUBLIC_TOOL_REGISTRY
export function searchCatalog(query: string, limit = 20): ToolRecord[] {
  return searchMasterRegistry(query, limit)
}
export function catalogIntegrityErrors(): string[] {
  return masterRegistryIntegrityErrors()
}
