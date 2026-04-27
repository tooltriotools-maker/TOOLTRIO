# TOOLTRIO - Setup Instructions

## ⚠️ IMPORTANT: Fresh Install Required

If you see errors like:
- `TypeError: Cannot read properties of undefined (reading 'call')`
- `Hydration failed`

**Follow these steps exactly:**

### Step 1: Delete old folder completely
Delete your previous project folder entirely (don't copy over it).

### Step 2: Extract this zip to a NEW folder
Extract `v0-tooltrio-FINAL.zip` to a fresh location.

### Step 3: Install dependencies
```bash
cd v0-finance-calculator-website
npm install
```

### Step 4: Run dev server
```bash
npm run dev
```

### Step 5: Open browser
Go to `http://localhost:3000`

---

## If errors persist after fresh install:

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```
