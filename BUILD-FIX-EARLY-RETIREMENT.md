# Build Fix — Early Retirement Calculator

## Reported Vercel error
`calculateEarlyRetirement` expected 7 arguments but `CalculatorClient.tsx` supplied 8.

## Fix
Removed the extra `3.5` argument. The calculation function signature is:

`calculateEarlyRetirement(currentAge, targetRetirementAge, currentSavings, annualSavings, annualExpenses, investReturn, inflationRate)`

The page now passes the intended 3.0% inflation rate as the seventh argument.

## Additional protection
Added `scripts/audit-calculation-signatures.mjs` and `npm run formula:signature:audit`.
The new audit checks imported calculation calls against exported calculation function arity and is included in `prebuild`.

## Recheck
- 360 exported calculation functions discovered
- 0 calculation call-signature mismatches
- 360 calculation functions runtime-tested
- 720 test executions
- 0 runtime/non-finite failures
- 0 `title={undefined}` occurrences
- 0 hardcoded `/opt/nvm/.../typescript` paths
- Blog: 286/286 pass
- YMYL Finance/Health: 562/562 strict audit pass
