# ToolTrio framework upgrade

This project was upgraded from Next.js 14 / React 18 to the supported Next.js 15 maintenance line.

## Changes

- Next.js: 14.2.35 -> 15.5.22
- React: 18.3.1 -> 19.2.8
- React DOM: 18.3.1 -> 19.2.8
- React Leaflet: 4.2.1 -> 5.0.0 (required for React 19 peer dependencies)
- Recharts: 2.15.4 -> 3.10.1
- ESLint: 8 -> 9.39.5
- eslint-config-next: 14.2.35 -> 15.5.22
- React type definitions updated to React 19
- Removed the obsolete `swcMinify` Next.js config option
- Migrated the blog Open Graph image route to the async `params` API
- Replaced deprecated `next lint` script with `eslint .`
- Added flat ESLint configuration in `eslint.config.mjs`
- Removed the old package-lock.json because it must be regenerated for the upgraded dependency graph

## Required install step

Run with Node 20/22/24 and npm:

    npm install

This generates a fresh `package-lock.json` for the upgraded dependency graph.

Then run:

    npm run p0:dependency:check
    npm run typecheck
    npm run lint
    npm run build

The repository's `.npmrc` retains `legacy-peer-deps=true` from the original project.

## Why React Leaflet was upgraded

React Leaflet 5 requires React 19, while the original React Leaflet 4.2.1 package requires React 18. Keeping 4.2.1 while moving to React 19 would create a peer-dependency mismatch.
