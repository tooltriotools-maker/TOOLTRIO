/**
 * TOOLTRIO — PDF Export Utility v8
 *
 * exportResultsOnlyPDF:
 *   Reads ResultCard components (class="rounded-xl p-4 border") from
 *   [data-pdf-results], plus any tables. Builds a clean standalone HTML
 *   page opened in window.open() — correct viewport, no Recharts/iframe issues.
 *
 * exportFullPagePDF: standard window.print() for full page.
 */

export type ExportCategory = 'Finance' | 'Health' | 'Dev' | 'Fun' | string
export interface ExportPDFOptions { title: string; category?: ExportCategory }

function accentFor(category: ExportCategory) {
  if (category === 'Health') return { accent: '#ef4444', light: '#fef2f2', dark: '#b91c1c' }
  if (category === 'Dev')    return { accent: '#3b82f6', light: '#eff6ff', dark: '#1d4ed8' }
  if (category === 'Fun')    return { accent: '#8b5cf6', light: '#f5f3ff', dark: '#6d28d9' }
  return { accent: '#16a34a', light: '#f0fdf4', dark: '#166534' }
}

function dateStr() {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ─── 1. FULL PAGE EXPORT ─────────────────────────────────────────────────────
export function exportFullPagePDF({ title, category = 'Finance' }: ExportPDFOptions): void {
  const { accent, light } = accentFor(category)
  const date = dateStr()

  document.querySelectorAll<HTMLDetailsElement>('details').forEach(el => { el.open = true })

  const style = document.createElement('style')
  style.media = 'print'
  style.textContent = `
    @page { size: A4 portrait; margin: 14mm 13mm; }
    *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { background: #fff !important; font-family: 'Helvetica Neue', Arial, sans-serif !important; color: #111827 !important; font-size: 10.5pt !important; }
    nav, footer, header, aside, [data-noprint], script, button:not([data-pdf-keep]) { display: none !important; }
    input[type="range"] { display: none !important; }
    svg { overflow: visible !important; }
    [class*="text-2xl"],[class*="text-3xl"],[class*="text-4xl"],[class*="text-5xl"] { font-weight: 900 !important; color: ${accent} !important; }
    table { width: 100% !important; border-collapse: collapse !important; font-size: 9pt !important; }
    th, td { border: 0.5pt solid #d1d5db !important; padding: 4pt 6pt !important; }
    th { background: ${light} !important; font-weight: 700 !important; }
    body::after { content: "TOOLTRIO.com  •  ${date}"; display: block; font-size: 7pt; color: #9ca3af; text-align: right; border-top: 0.5pt solid #e5e7eb; padding-top: 5pt; margin-top: 16pt; }
  `
  document.head.appendChild(style)
  const prev = document.title
  document.title = `${title} — Full Report — TOOLTRIO`
  const restore = () => { style.remove(); document.title = prev; window.removeEventListener('afterprint', restore) }
  window.addEventListener('afterprint', restore)
  setTimeout(restore, 30_000)
  window.print()
}

// ─── 2. RESULTS ONLY ─────────────────────────────────────────────────────────
export function exportResultsOnlyPDF({ title, category = 'Finance' }: ExportPDFOptions): void {
  const { accent, light, dark } = accentFor(category)
  const date = dateStr()

  const resultSection = document.querySelector<HTMLElement>('[data-pdf-results]')
  if (!resultSection) { exportFullPagePDF({ title, category }); return }

  // ── Scrape ResultCards ─────────────────────────────────────────────────────
  // ResultCard renders as: <div class="rounded-xl p-4 border ...">
  //   <div class="flex items-start ...">
  //     <div class="flex-1 min-w-0">
  //       <p class="text-xs ... uppercase ...">LABEL</p>
  //       <p class="text-lg font-bold ...">VALUE</p>
  //       <p class="text-xs text-gray-400 ...">subValue</p>  (optional)
  //     </div>
  //   </div>
  // </div>

  const cards: { label: string; value: string; sub: string; highlight: boolean }[] = []

  // Target the exact grid of ResultCards — the div with grid-cols inside data-pdf-results
  const cardGrids = resultSection.querySelectorAll<HTMLElement>('[class*="grid"][class*="gap"]')

  const collectFromGrid = (grid: HTMLElement) => {
    // Direct children that are result cards (rounded-xl with p-4)
    Array.from(grid.children).forEach(child => {
      const el = child as HTMLElement
      const cls = el.className || ''
      // ResultCard has rounded-xl AND (bg-gray-50 OR from-green OR from-red OR from-blue)
      if (!cls.includes('rounded-xl')) return
      const ps = el.querySelectorAll('p')
      if (ps.length < 2) return
      const label = ps[0]?.textContent?.trim() || ''
      const value = ps[1]?.textContent?.trim() || ''
      const sub   = ps[2]?.textContent?.trim() || ''
      const highlight = cls.includes('green') || cls.includes('from-green')
      if (label && value) cards.push({ label, value, sub, highlight })
    })
  }

  // Also walk direct children of resultSection for card grids
  cardGrids.forEach(grid => collectFromGrid(grid))

  // Fallback: scan all rounded-xl direct within resultSection if no cards found
  if (cards.length === 0) {
    resultSection.querySelectorAll<HTMLElement>('[class*="rounded-xl"]').forEach(el => {
      const ps = el.querySelectorAll(':scope > div > div > p, :scope > div > p')
      if (ps.length < 2) return
      const label = ps[0]?.textContent?.trim() || ''
      const value = ps[1]?.textContent?.trim() || ''
      const sub   = ps[2]?.textContent?.trim() || ''
      const highlight = (el.className || '').includes('green')
      if (label && value && value.length < 30) cards.push({ label, value, sub, highlight })
    })
  }

  // ── Scrape tables ──────────────────────────────────────────────────────────
  let tableHTML = ''
  resultSection.querySelectorAll('table').forEach(t => { tableHTML += t.outerHTML })

  // ── Build card HTML ────────────────────────────────────────────────────────
  const cardCols = cards.length <= 2 ? 2 : cards.length === 3 ? 3 : 2
  const cardsHTML = cards.length > 0 ? `
    <div style="display:grid;grid-template-columns:repeat(${cardCols},1fr);gap:10pt;margin-bottom:16pt;">
      ${cards.map(c => `
        <div style="border:1.5pt solid ${c.highlight ? accent + '60' : '#e5e7eb'};border-radius:8pt;padding:10pt 12pt;background:${c.highlight ? light : '#f9fafb'};">
          <div style="font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6b7280;margin-bottom:3pt;">${c.label}</div>
          <div style="font-size:${c.value.length > 10 ? '16' : '20'}pt;font-weight:900;color:${accent};line-height:1.1;">${c.value}</div>
          ${c.sub ? `<div style="font-size:8pt;color:#9ca3af;margin-top:2pt;">${c.sub}</div>` : ''}
        </div>`).join('')}
    </div>` : `<p style="color:#6b7280;font-style:italic;">No result cards found. Please calculate first, then export.</p>`

  // ── Full HTML ──────────────────────────────────────────────────────────────
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title} — Results — TOOLTRIO</title>
<style>
  @page { size: A4 portrait; margin: 14mm 14mm 14mm 14mm; }
  *, *::before, *::after { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111827; background: #fff; margin: 0; padding: 28px 32px; font-size: 11pt; line-height: 1.5; }
  h1 { font-size: 20pt; font-weight: 900; color: #111827; margin: 0 0 2pt; }
  .sub { font-size: 9pt; color: #6b7280; }
  .header { border-bottom: 3pt solid ${accent}; padding-bottom: 8pt; margin-bottom: 18pt; }
  table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-top: 12pt; page-break-inside: avoid; }
  th, td { border: 0.5pt solid #d1d5db; padding: 4pt 7pt; text-align: left; }
  th { background: ${light}; font-weight: 700; color: #374151; }
  tr:nth-child(even) td { background: #f9fafb; }
  .footer { margin-top: 20pt; padding-top: 5pt; border-top: 0.5pt solid #e5e7eb; font-size: 7pt; color: #9ca3af; text-align: right; }
  @media screen { body { max-width: 800px; margin: 0 auto; padding: 40px; } }
</style>
</head>
<body>
<div class="header">
  <h1>${title}</h1>
  <div class="sub">Results &nbsp;·&nbsp; ${date}</div>
</div>
${cardsHTML}
${tableHTML ? `<div style="margin-top:8pt">${tableHTML}</div>` : ''}
<div class="footer">TOOLTRIO.com &nbsp;·&nbsp; ${date}</div>
<script>window.addEventListener('load',function(){ setTimeout(function(){ window.print(); }, 300); });<\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=900,height=700')
  if (!win) { exportFullPagePDF({ title, category }); return }
  win.document.open()
  win.document.write(html)
  win.document.close()
}
