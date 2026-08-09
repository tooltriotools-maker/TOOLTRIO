// Backward-compatible facade. The canonical application-facing registry now lives in lib/catalog/master-registry.ts.
export { MASTER_TOOL_REGISTRY as TOOL_ITEMS } from '@/lib/catalog'
export type { ToolRecord as ToolItem } from '@/lib/catalog'
export { MASTER_TOOL_REGISTRY as TOOL_CATALOG } from '@/lib/catalog'
