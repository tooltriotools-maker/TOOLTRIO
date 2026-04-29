import { MetadataRoute } from 'next'
import { allBlogPosts as blogPosts, blogCategories } from '@/lib/blog/posts'

const BASE = 'https://tooltrio.com'
const now = new Date().toISOString()

// -- USA Finance calculator slugs (INDEXED) ------------------------------------
const financeCalcsUSA = [
  '401k-calculator', '401k-early-withdrawal-vs-loan-calculator', '401k-vs-pension-calculator', '401k-vs-roth-ira-calculator', '401k-vs-taxable-account-calculator',
  '529-vs-roth-ira-education-calculator', '529-vs-utma-calculator',
  'annuity-vs-lumpsum-calculator', 'bonds-vs-cds-usa-calculator', 'break-even-calculator', 'budget-calculator', 'cagr-calculator',
  'car-depreciation-calculator', 'car-loan-calculator', 'cash-out-refinance-vs-heloc-calculator', 'cd-ladder-calculator', 'cd-vs-hysa-calculator', 'college-cost-calculator',
  'compound-interest-calculator', 'credit-card-payoff-calculator', 'crypto-profit-calculator', 'currency-converter', 'currency-profit-calculator', 'debt-payoff-calculator',
  'dividend-calculator', 'dividend-growth-vs-growth-stocks-calculator', 'dollar-cost-averaging-vs-lumpsum-usa-calculator', 'education-goal-calculator',
  'emergency-fund-calculator', 'fire-calculator', 'government-bond-calculator',
  'heloc-calculator', 'home-affordability-calculator', 'hsa-vs-fsa-calculator', 'i-bonds-vs-tips-calculator', 'income-tax-calculator', 'index-fund-vs-etf-calculator',
  'inflation-calculator', 'inflation-protected-bonds-vs-stocks-calculator',
  'lease-vs-buy-calculator', 'loan-prepayment-calculator', 'medicare-vs-private-insurance-calculator', 'mortgage-refinance-calculator', 'mortgage-vs-renting-usa-calculator',
  'municipal-bonds-vs-corporate-bonds-calculator', 'net-worth-calculator',
  'pay-off-mortgage-vs-invest-calculator', 'paycheck-calculator', 'pe-ratio-calculator', 'personal-loan-calculator',
  'real-estate-roi-calculator', 'real-return-calculator', 'refinance-vs-invest-calculator', 'reit-vs-direct-property-usa-calculator', 'rent-vs-buy-calculator',
  'rental-yield-calculator', 'retirement-calculator', 'roi-calculator',
  'roth-ira-calculator', 'roth-ira-vs-401k-employer-match-calculator', 'roth-ira-vs-hsa-calculator', 'roth-ira-vs-traditional-ira-calculator',
  'salary-calculator', 'savings-goal-calculator', 'sep-ira-vs-solo-401k-calculator', 'simple-interest-calculator',
  'social-security-calculator', 'social-security-vs-private-pension-calculator', 'sp500-vs-bonds-calculator', 'sp500-vs-real-estate-usa-calculator',
  'stock-profit-calculator', 'student-loan-calculator', 'term-vs-whole-life-calculator', 'tip-calculator',
  'traditional-ira-vs-taxable-account-calculator', 'us-real-estate-vs-reits-calculator', 'vanguard-vs-fidelity-etf-calculator', 'whole-market-vs-sp500-calculator',
  'xirr-calculator',
]

// -- Non-USA Finance calculator slugs (COMMENTED OUT / noindex) ----------------
// India-specific calculators (not indexed for GSC):
// 'elss-vs-nps-calculator', 'elss-vs-ppf-calculator', 'emi-calculator', 'emi-vs-sip-calculator', 'epf-vs-nps-calculator',
// 'fd-calculator', 'fd-comparison-calculator', 'gratuity-calculator', 'gst-calculator', 'home-loan-calculator', 'hra-calculator',
// 'lumpsum-calculator', 'lumpsum-vs-gold-calculator', 'lumpsum-vs-sip-calculator',
// 'mutual-fund-calculator', 'mutual-fund-return-calculator', 'mutual-fund-vs-fd-calculator',
// 'nps-calculator', 'nsc-vs-fd-calculator', 'nsc-vs-ppf-calculator',
// 'ppf-calculator', 'ppf-vs-fd-calculator', 'ppf-vs-nps-calculator', 'rd-calculator',
// 'salary-hike-calculator', 'senior-citizen-savings-vs-fd-calculator',
// 'sip-calculator', 'sip-vs-bonds-calculator', 'sip-vs-crypto-calculator', 'sip-vs-endowment-calculator', 'sip-vs-fd-calculator', 'sip-vs-gold-calculator',
// 'sip-vs-mutual-fund-direct-plan-calculator', 'sip-vs-nps-calculator', 'sip-vs-ppf-calculator', 'sip-vs-rd-calculator', 'sip-vs-real-estate-calculator',
// 'sip-vs-savings-account-calculator', 'sip-vs-stocks-calculator', 'step-up-sip-calculator',
// 'sukanya-samriddhi-vs-ppf-calculator', 'swp-calculator', 'term-vs-ulip-calculator',
//
// UK-specific calculators (not indexed for GSC):
// 'isa-calculator', 'isa-vs-sipp-uk-calculator', 'offset-mortgage-vs-savings-uk-calculator',
// 'stocks-shares-isa-vs-cash-isa-calculator',
// 'uk-buy-to-let-vs-stocks-calculator', 'uk-fixed-rate-vs-tracker-mortgage-calculator', 'uk-help-to-buy-vs-lisa-calculator', 'uk-income-tax-calculator',
// 'uk-lifetime-isa-vs-sipp-calculator', 'uk-pension-calculator', 'uk-pension-drawdown-vs-annuity-calculator', 'uk-pension-vs-isa-calculator',
// 'uk-premium-bonds-vs-cash-isa-calculator', 'uk-remortgage-vs-invest-calculator', 'uk-stamp-duty-calculator', 'uk-stocks-vs-bonds-calculator',
//
// Europe-specific calculators (not indexed for GSC):
// 'euro-auto-loan-calculator', 'euro-bonds-vs-etf-calculator', 'europe-etf-vs-property-calculator', 'europe-growth-vs-value-etf-calculator',
// 'europe-msci-world-vs-sp500-calculator', 'europe-property-vs-reit-calculator', 'european-mortgage-calculator', 'fire-europe-calculator',
// 'france-pea-vs-assurance-vie-calculator', 'germany-etf-vs-tagesgeld-calculator', 'netherlands-aow-vs-private-pension-calculator',
// 'spain-pension-vs-etf-calculator', 'vat-calculator-europe',

// -- All 10 health calculator slugs (COMMENTED OUT - not indexed for GSC) ------
// const healthCalcs = [
//   'age-calculator', 'air-quality-health-calculator', 'alcohol-calorie-calculator', 'alcohol-metabolism-calculator', 'altitude-sickness-calculator',
//   'army-body-fat-calculator', 'athletic-performance-calculator', 'bac-calculator', 'blood-pressure-calculator', 'blue-light-exposure-calculator',
//   'bmi-calculator', 'bmi-for-children-calculator', 'bmr-calculator', 'body-age-calculator', 'body-fat-calculator', 'body-recomposition-calculator',
//   'body-surface-area-calculator', 'breastfeeding-calorie-calculator', 'breathing-exercise-calculator', 'caffeine-half-life-calculator', 'calcium-calculator',
//   'calorie-burned-walking-calculator', 'calorie-calculator', 'calorie-deficit-calculator', 'calories-burned-calculator', 'cholesterol-calculator',
//   'cold-exposure-calculator', 'cold-shower-benefits-calculator', 'cortisol-stress-calculator', 'creatine-dosage-calculator', 'creatinine-clearance-calculator',
//   'cycling-calories-calculator', 'dehydration-calculator', 'dental-health-calculator', 'diabetes-risk-calculator', 'due-date-calculator',
//   'ergonomics-score-calculator', 'eye-health-calculator', 'fasting-window-calculator', 'fat-loss-rate-calculator', 'fiber-intake-calculator',
//   'flexibility-calculator', 'glycemic-load-calculator', 'gratitude-health-calculator', 'grip-strength-calculator', 'gut-health-calculator',
//   'hangover-recovery-calculator', 'hearing-age-calculator', 'heart-age-calculator', 'heart-attack-risk-calculator', 'heart-rate-calculator',
//   'hiit-calculator', 'hydration-calculator', 'ideal-weight-calculator', 'immune-health-calculator', 'infant-weight-percentile-calculator',
//   'inflammation-risk-calculator', 'injury-recovery-calculator', 'intermittent-fasting-calculator', 'iron-intake-calculator', 'jet-lag-calculator',
//   'keto-macro-calculator', 'kidney-function-calculator', 'lean-body-mass-calculator', 'liver-health-calculator', 'loneliness-health-calculator',
//   'longevity-calculator', 'macro-calculator', 'magnesium-calculator', 'marathon-training-calculator', 'meal-timing-calculator',
//   'meditation-benefits-calculator', 'menopause-symptom-calculator', 'menstrual-cycle-calculator', 'mental-health-score-calculator', 'mold-exposure-calculator',
//   'muscle-gain-calculator', 'nicotine-withdrawal-calculator', 'omega3-calculator', 'one-rep-max-calculator', 'ovulation-calculator',
//   'pace-calculator', 'plank-time-calculator', 'posture-calculator', 'pregnancy-calculator', 'pregnancy-conception-calculator',
//   'pregnancy-due-date-calculator', 'pregnancy-nutrition-calculator', 'pregnancy-weight-gain-calculator', 'protein-intake-calculator', 'protein-per-meal-calculator',
//   'pull-up-calculator', 'pushup-calculator', 'resting-metabolic-rate-calculator', 'running-pace-calculator', 'sauna-benefits-calculator',
//   'shift-work-health-calculator', 'sit-and-reach-calculator', 'skin-health-calculator', 'sleep-cycle-calculator', 'sleep-need-calculator',
//   'sodium-intake-calculator', 'sprint-calculator', 'squat-calculator', 'standing-desk-calculator', 'steps-calculator', 'steps-to-calories-calculator',
//   'stress-level-calculator', 'stroke-risk-calculator', 'sugar-intake-calculator', 'sweat-rate-calculator', 'swimming-calories-calculator',
//   'target-weight-calculator', 'tdee-calculator', 'testosterone-age-calculator', 'thyroid-calculator', 'uv-exposure-calculator',
//   'vitamin-c-calculator', 'vitamin-d-calculator', 'vo2-max-calculator', 'waist-to-height-ratio-calculator', 'water-intake-calculator',
//   'yoga-calories-calculator', 'zinc-calculator',
// ]

// -- All commodity calculator slugs (COMMENTED OUT - not indexed for GSC) ------
// const commodityCalcs = [
//   'gold-price-calculator', 'silver-price-calculator', 'platinum-price-calculator',
//   'palladium-price-calculator', 'crude-oil-calculator', 'brent-crude-calculator',
//   'natural-gas-calculator', 'gold-loan-calculator', 'precious-metals-profit-calculator',
//   'commodity-portfolio-tracker',
// ]

// -- Dev tools (COMMENTED OUT - not indexed for GSC) ---------------------------
// const devTools = [
//   'json-formatter', 'regex-tester', 'base64-encoder', 'uuid-generator', 'hash-generator', 'color-converter',
//   'unix-timestamp', 'base-converter', 'password-generator', 'url-encoder', 'html-encoder', 'css-unit-converter',
//   'pixel-rem-converter', 'aspect-ratio-calculator', 'bandwidth-calculator', 'ip-subnet-calculator', 'bit-byte-converter',
//   'lorem-ipsum-generator', 'cron-expression', 'jwt-decoder', 'markdown-preview', 'diff-checker', 'code-minifier',
//   'text-case-converter', 'chmod-calculator', 'http-status-codes', 'svg-optimizer', 'responsive-breakpoints',
//   'api-response-time', 'color-palette', 'yaml-formatter', 'csv-to-json', 'json-to-csv', 'html-to-markdown',
//   'sql-formatter', 'xml-formatter', 'toml-formatter', 'graphql-formatter', 'string-inspector', 'word-counter',
//   'line-sorter', 'duplicate-remover', 'number-formatter', 'epoch-converter', 'timezone-converter', 'cidr-calculator',
//   'docker-compose-gen', 'gitignore-generator', 'htaccess-generator', 'robots-txt-generator', 'meta-tag-generator',
//   'open-graph-preview', 'favicon-generator', 'image-base64', 'table-generator', 'css-gradient-generator',
//   'box-shadow-generator', 'flex-generator', 'grid-generator', 'npm-package-search', 'json-path-tester',
//   'css-specificity', 'html-validator', 'markdown-table-gen', 'curl-builder', 'http-headers-analyzer',
//   'mime-type-lookup', 'semver-calculator', 'git-commit-gen', 'env-file-parser', 'css-clip-path',
//   'border-radius-gen', 'text-diff-inline', 'string-hash-calc', 'color-contrast', 'font-size-calculator',
//   'z-index-manager', 'css-animation-gen', 'json-schema-gen', 'html-entity-ref', 'sql-join-visualizer',
//   'bitwise-calculator', 'network-speed-test', 'character-encoder', 'css-filter-gen', 'fake-data-generator',
//   'xml-to-json', 'binary-text-converter', 'rsa-key-info', 'package-json-gen',
// ]

// -- Fun tools (COMMENTED OUT - not indexed for GSC) ---------------------------
// const funTools = [
//   'lucky-number', 'zodiac-calculator', 'love-compatibility', 'personality-quiz', 'random-name-generator',
//   'superhero-name', 'villain-name', 'fantasy-name-generator', 'age-in-days', 'birthday-countdown',
//   'life-expectancy-fun', 'how-rich-am-i', 'coffee-calculator', 'sleep-debt-calculator', 'social-media-addiction',
//   'screen-time-calculator', 'calories-in-beer', 'pizza-calculator', 'workout-excuse-generator', 'procrastination-score',
//   'emoji-translator', 'text-to-morse', 'pig-latin-converter', 'uwu-text-generator', 'compliment-generator',
//   'insult-generator', 'fortune-cookie', 'would-you-rather', 'trivia-quiz', 'random-fact-generator',
// ]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // -- Core finance page (indexed) --
    { url: `${BASE}/calculators/finance`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },

    // -- Non-finance core pages (COMMENTED OUT - not indexed for GSC) --
    // { url: BASE,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    // { url: `${BASE}/calculators/health`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    // { url: `${BASE}/blog`,                    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    // { url: `${BASE}/about`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // { url: `${BASE}/methodology`,             lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    // { url: `${BASE}/contact`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // { url: `${BASE}/privacy-policy`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    // { url: `${BASE}/disclaimer`,              lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },

    // -- USA Finance calculators (INDEXED) --
    ...financeCalcsUSA.map(slug => ({
      url: `${BASE}/calculators/finance/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.88,
    })),

    // -- New trending USA finance calculators (2026) (INDEXED) --
    ...[
      'mortgage-calculator', 'auto-loan-calculator', 'biweekly-mortgage-calculator',
      'down-payment-calculator', 'closing-cost-calculator', 'payoff-date-calculator',
      'budget-planner-calculator', 'savings-rate-calculator', 'loan-comparison-calculator',
      'annual-income-calculator', 'personal-loan-calculator', 'interest-rate-calculator',
      'business-loan-calculator', 'weekly-budget-calculator', 'invoice-calculator',
      'wealth-calculator', 'tax-bracket-calculator', 'roth-conversion-calculator',
    ].map(slug => ({
      url: `${BASE}/calculators/finance/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.88,
    })),

    // -- Non-USA finance trending calculators (COMMENTED OUT - not indexed for GSC) --
    // calorie-burned-walking-calculator, steps-calculator, pace-calculator (health)

    // -- USA Finance Blog Posts 2026 (COMMENTED OUT - not indexed for GSC) --
    // ...[
    //   'how-much-mortgage-can-i-afford-usa-2026', 'how-to-pay-off-mortgage-early-usa-2026',
    //   'car-loan-calculator-usa-2026-rates-by-state', 'tax-bracket-guide-usa-2026-marginal-vs-effective',
    //   'how-much-to-save-for-retirement-by-age-usa', 'budget-50-30-20-rule-usa-real-examples-2026',
    //   'annual-salary-by-hourly-rate-usa-2026', 'down-payment-how-much-house-usa-2026',
    //   'roth-ira-vs-401k-which-is-better-2026', 'wealth-building-guide-usa-2026-net-worth-by-age',
    // ].map(slug => ({ url: `${BASE}/blog/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.82 })),

    // -- USA Finance Blog Posts Batch 2 (COMMENTED OUT - not indexed for GSC) --
    // ...[
    //   'emergency-fund-calculator-usa-2026', 'compound-interest-guide-usa-how-to-grow-money-2026',
    //   'social-security-claiming-strategy-usa-2026', 'credit-card-payoff-calculator-usa-interest-guide-2026',
    //   'home-equity-heloc-vs-cashout-refinance-usa-2026', 'investment-property-calculator-usa-rental-income-2026',
    //   'student-loan-payoff-strategies-usa-2026', 'dividend-investing-guide-usa-2026-passive-income',
    //   'inflation-impact-calculator-usa-2026-purchasing-power', 'lease-vs-buy-car-calculator-usa-2026',
    //   'fire-calculator-guide-usa-retire-early-2026', 'net-worth-by-age-usa-2026-how-do-you-compare',
    //   'hsa-triple-tax-advantage-guide-usa-2026', 'real-estate-vs-stock-market-usa-2026-which-wins',
    // ].map(slug => ({ url: `${BASE}/blog/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.82 })),

    // -- Health calculators (COMMENTED OUT - not indexed for GSC) --
    // ...healthCalcs.map(slug => ({ url: `${BASE}/calculators/health/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 })),

    // -- Fun tools (COMMENTED OUT - not indexed for GSC) --
    // ...funTools.map(s => ({ url: `${BASE}/calculators/fun/${s}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 })),

    // -- Dev tools (COMMENTED OUT - not indexed for GSC) --
    // ...devTools.map(s => ({ url: `${BASE}/calculators/dev/${s}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 })),

    // -- Commodities hub (COMMENTED OUT - not indexed for GSC) --
    // { url: `${BASE}/commodities`, lastModified: now, changeFrequency: 'hourly' as const, priority: 0.97 },
    // ...commodityCalcs.map(slug => ({ url: `${BASE}/commodities/${slug}`, lastModified: now, changeFrequency: 'hourly' as const, priority: 0.92 })),

    // -- Blog posts (COMMENTED OUT - not indexed for GSC) --
    // ...blogPosts.map(p => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date(p.publishedAt).toISOString(), changeFrequency: 'monthly' as const, priority: 0.78 })),

    // -- Blog categories (COMMENTED OUT - not indexed for GSC) --
    // ...blogCategories.map(cat => ({ url: `${BASE}/blog/category/${cat.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ]
}
