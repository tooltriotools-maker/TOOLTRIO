#!/usr/bin/env node
/**
 * ToolTrio build-safety guard.
 *
 * This intentionally fails if Next.js build-error suppression is reintroduced.
 * Keep this check lightweight so it can run before dependencies are installed.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const configPath = path.join(here, '..', 'next.config.mjs')
const config = fs.readFileSync(configPath, 'utf8')

const forbidden = [
  /\bignoreBuildErrors\s*:\s*true/,
  /\bignoreDuringBuilds\s*:\s*true/,
]

const violations = forbidden.filter((pattern) => pattern.test(config))

if (violations.length) {
  console.error('Build safety check failed: Next.js build-error suppression is enabled.')
  console.error('Remove ignoreBuildErrors / ignoreDuringBuilds before shipping.')
  process.exit(1)
}

console.log('Build safety check passed.')
