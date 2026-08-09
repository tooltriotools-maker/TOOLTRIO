import { FINANCE_BATCH_01 } from './finance-quality'
import { FINANCE_BATCH_02 } from './finance-batch-02'
import { FINANCE_BATCH_03 } from './finance-batch-03'
import { FINANCE_BATCH_04 } from './finance-batch-04'
import { FINANCE_BATCH_05 } from './finance-batch-05'
import { FINANCE_BATCH_06 } from './finance-batch-06'
import { FINANCE_BATCH_07 } from './finance-batch-07'
import { FINANCE_BATCH_08 } from './finance-batch-08'
import { FINANCE_BATCH_09 } from './finance-batch-09'
import { FINANCE_BATCH_10 } from './finance-batch-10'
import { FINANCE_BATCH_11 } from './finance-batch-11'
import { FINANCE_BATCH_13 } from './finance-batch-13'
import { FINANCE_BATCH_14 } from './finance-batch-14'
import { FINANCE_BATCH_15 } from './finance-batch-15'
import { FINANCE_BATCH_17 } from './finance-batch-17'
import { FINANCE_BATCH_18 } from './finance-batch-18'
import { FINANCE_BATCH_19 } from './finance-batch-19'
import type { FinanceQualityProfile } from './finance-quality'
import { FINANCE_UNREVIEWED } from './finance-unreviewed'

const batches: FinanceQualityProfile[][] = [
  FINANCE_BATCH_01, FINANCE_BATCH_02, FINANCE_BATCH_03, FINANCE_BATCH_04,
  FINANCE_BATCH_05, FINANCE_BATCH_06, FINANCE_BATCH_07, FINANCE_BATCH_08,
  FINANCE_BATCH_09, FINANCE_BATCH_10, FINANCE_BATCH_11, FINANCE_BATCH_13,
  FINANCE_BATCH_14, FINANCE_BATCH_15, FINANCE_BATCH_17, FINANCE_BATCH_18, FINANCE_BATCH_19, FINANCE_UNREVIEWED,
]

const allProfiles = batches.flat()

// A slug is the identity key for a finance quality profile. Some historical
// batches can overlap during migrations, so duplicates must not crash the
// application at runtime. Earlier/reviewed batches win deterministically;
// later duplicate records are ignored. The audit script reports duplicates
// separately so they remain visible to maintainers.
const seen = new Set<string>()
const profiles: FinanceQualityProfile[] = []
for (const profile of allProfiles) {
  if (seen.has(profile.slug)) continue
  seen.add(profile.slug)
  profiles.push(profile)
}

export const FINANCE_QUALITY_REGISTRY: FinanceQualityProfile[] = profiles
export const FINANCE_QUALITY_BY_SLUG = new Map(profiles.map(profile => [profile.slug, profile]))
