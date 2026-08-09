import { MASTER_TOOL_REGISTRY, TOOL_COUNTS, CALCULATOR_COUNTS, TOOL_TOTAL, REDIRECTED_TOOL_HREFS, findToolByHref, getToolMetadata, getToolsByCategory, searchMasterRegistry, masterRegistryIntegrityErrors } from './master-registry'
import { BLOG_CATALOG } from './blog'
import type { ToolCategory, ToolRecord } from './master-registry'

export type { MasterToolRecord, ToolMetadata } from './master-registry'
export { MASTER_TOOL_REGISTRY, BLOG_CATALOG, REDIRECTED_TOOL_HREFS, TOOL_COUNTS, CALCULATOR_COUNTS, TOOL_TOTAL, findToolByHref, getToolMetadata, getToolsByCategory, searchMasterRegistry, masterRegistryIntegrityErrors }
export type { ToolCategory, ToolRecord }

// Backward-compatible aliases. New application code should use MASTER_TOOL_REGISTRY.
export const TOOL_CATALOG = MASTER_TOOL_REGISTRY
export const ACTIVE_TOOL_CATALOG = MASTER_TOOL_REGISTRY
export function searchCatalog(query: string, limit = 20): ToolRecord[] {
  return searchMasterRegistry(query, limit)
}
export function catalogIntegrityErrors(): string[] {
  return masterRegistryIntegrityErrors()
}
