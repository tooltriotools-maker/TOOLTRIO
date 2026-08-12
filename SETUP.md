# TOOLTRIO Setup Guide

## Quick Start (Windows)
Double-click `START_HERE.bat` — handles everything automatically.

## Quick Start (Mac/Linux)
```bash
bash start.sh
```

## Manual Setup
```bash
# 1. Clear old cache (IMPORTANT)
rm -rf .next

# 2. Install dependencies (first time only)
npm install

# 3. Start dev server
npm run dev
```

Open http://localhost:3000 in your browser.


## Why delete .next?
The `.next` folder is Next.js's build cache. If you move the project, rename it,
or upgrade Node.js, the old cache causes:
  `TypeError: Cannot read properties of undefined (reading 'call')`
Always delete `.next` before starting fresh.

## Build for production
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Push to GitHub
2. Connect repo to Vercel at vercel.com
3. Deploy automatically

## Troubleshooting

**Site not loading / blank page**
→ Delete `.next` folder and restart: `rm -rf .next && npm run dev`

**"Module not found" errors**
→ Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Port 3000 in use**
→ Use a different port: `npm run dev -- -p 3001`

**Node.js version issues**
→ Requires Node.js 18 or higher. Check with: `node --version`

**Exchange rates / commodity prices not loading**
→ These use free external APIs. If they're down, fallback rates are used automatically.

**ZIP tools not working**
→ ZIP data is bundled locally — no internet required. Check that `lib/data/zips/` exists.
