# tooltrio.com — 400+ Free Finance & Health Calculators

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (charts)
- Vercel (deployment)

## Quick Deploy to Vercel
1. Unzip this folder
2. `npm install`
3. Push to GitHub
4. Connect to Vercel - auto-deploys

## Key Fixes Applied (March 2026)
- `transpilePackages: ['recharts', ...]` in next.config.js — fixes blank charts
- ChartWrapper component — prevents SSR hydration mismatch for charts
- suppressHydrationWarning on body and header logo
- Header changed from sticky to relative (scrolls with page)
- Favicon: app/favicon.ico, app/icon.svg, public/favicon.ico
- GlobalSearch: 113 calculators indexed with ⌘K shortcut
- 20 new calculators added (finance + health)

## After Deploying
1. Go to Vercel → your project → Deployments
2. Click "..." on latest → **Redeploy** (select "Use existing build cache: No")
3. This forces fresh JS bundles and clears the hydration error

## New Calculators Added
Finance: Mortgage, Auto Loan, Biweekly Mortgage, Down Payment, Closing Cost,
Payoff Date, Budget Planner, Savings Rate, Loan Comparison, Annual Income,
Interest Rate, Business Loan, Weekly Budget, Invoice, Wealth, Tax Bracket 2026, Roth Conversion

Health: Calories Burned Walking, Steps to Calories, Pace Calculator
