export const API_LIMITS = {
  searchLimit: 100,
  nearbyLimit: 500,
  nearbyRadiusMiles: 500,
  queryLength: 100,
  streetLength: 200,
  cityLength: 100,
  stateLength: 50,
} as const

export function clampPositiveInt(value: string | null, fallback: number, max: number): number {
  const parsed = Number.parseInt(value ?? '', 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(Math.max(parsed, 1), max)
}

export function clampPositiveNumber(value: string | null, fallback: number, max: number): number {
  const parsed = Number.parseFloat(value ?? '')
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(Math.max(parsed, 1), max)
}
