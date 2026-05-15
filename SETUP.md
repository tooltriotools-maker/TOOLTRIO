# TOOLTRIO — Setup Instructions

## 1. Extract the ZIP
Unzip this file — you will get a folder called `tooltrio-premium/`

## 2. Navigate into the folder
```bash
cd tooltrio-premium
```

> ⚠️ IMPORTANT: You must run all commands from INSIDE `tooltrio-premium/`, not from the parent folder.

## 3. Install dependencies
```bash
npm install
```

## 4. Run development server
```bash
npm run dev
```

## 5. Build for production
```bash
npm run build
npm start
```

## Folder Structure (required files)
```
tooltrio-premium/
├── context/
│   └── CurrencyContext.tsx   ← Required
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── ZipToolLayout.tsx
│       └── ZipQuickFill.tsx
├── lib/
│   └── data/
│       └── us-zip-data.ts    ← 41,689 ZIP codes
├── app/
│   ├── zip/                  ← 35 ZIP tools
│   └── calculators/          ← 400+ calculators
└── tsconfig.json
```

## Troubleshooting

**Error: Can't resolve '@/context/CurrencyContext'**
- Make sure you are running `npm run dev` from INSIDE the `tooltrio-premium/` folder
- The `context/` folder must be at `tooltrio-premium/context/CurrencyContext.tsx`

**Error: Module not found**  
- Run `npm install` again from inside `tooltrio-premium/`
