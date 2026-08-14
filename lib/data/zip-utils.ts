/**
 * Normalizes a user-entered US ZIP / ZIP+4 value to the 5-digit ZIP key
 * used by the ToolTrio data index.
 *
 * Accepted examples:
 *   76033
 *   76033-4007
 *   760334007
 *
 * ZIP+4 is intentionally reduced to its base 5-digit ZIP because the
 * timezone data is mapped at the ZIP-code level, not the ZIP+4 level.
 */
export function normalizeZipCode(value: string | null | undefined): string | null {
  const digits = String(value ?? '').replace(/\D/g, '')

  if (digits.length === 5) return digits
  if (digits.length === 9) return digits.slice(0, 5)

  return null
}

/** Digits to keep in a ZIP input before lookup (5-digit or ZIP+4). */
export function sanitizeZipInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, 9)
}
