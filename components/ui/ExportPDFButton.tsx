'use client'
import { useState, useCallback } from 'react'

export type ExportCategory = 'Finance' | 'Health' | 'Dev' | 'Fun' | string

interface Props {
  title: string
  category?: ExportCategory
  compact?: boolean
}

const ACCENT: Record<string, string> = {
  Finance: '#16a34a',
  Health:  '#ef4444',
  Dev:     '#3b82f6',
  Fun:     '#8b5cf6',
}

// ── Load a script from CDN once ───────────────────────────────────────────────
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const Spinner = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round"
    style={{ animation: 'pdf-spin .8s linear infinite' }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// ── Main component ────────────────────────────────────────────────────────────
export function DownloadPDFButton({ title, category = 'Finance' }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const accent = ACCENT[category] ?? ACCENT.Finance

  const bg = state === 'done'
    ? '#10b981'
    : `linear-gradient(135deg, ${accent}, ${accent}cc)`

  const handleDownload = useCallback(async () => {
    if (state !== 'idle') return
    setState('loading')

    try {
      // Load html2canvas + jsPDF from CDN (no npm install needed)
      await Promise.all([
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
      ])

      // Access globals injected by CDN scripts
      const html2canvas = (window as any).html2canvas
      const jsPDF = (window as any).jspdf?.jsPDF || (window as any).jsPDF

      if (!html2canvas || !jsPDF) throw new Error('Libraries did not load')

      // ── Find the calculator content area ─────────────────────────────────
      // [data-pdf-results] is the OUTPUT column; its parentElement is the
      // grid that also contains the INPUT card — so parentElement captures both.
      const resultsEl = document.querySelector<HTMLElement>('[data-pdf-results]')
      const target: HTMLElement | null =
        (resultsEl?.parentElement as HTMLElement | null) ||   // grid with inputs + outputs
        document.querySelector<HTMLElement>('[data-results="true"]') ||
        document.querySelector<HTMLElement>('main > div')

      if (!target) throw new Error('No content found')

      // Expand all collapsed details/FAQ sections
      target.querySelectorAll<HTMLDetailsElement>('details').forEach(d => { d.open = true })

      // Bake current input values into the DOM so html2canvas captures them.
      // html2canvas reads the .value property but doesn't always reflect it
      // visually — setting the attribute makes it show correctly in the capture.
      target.querySelectorAll<HTMLInputElement>('input[type="number"], input[type="text"]').forEach(inp => {
        inp.setAttribute('value', inp.value)
      })
      // Range sliders: html2canvas can't render native range tracks.
      // Replace each slider with a styled text badge showing its current value.
      const sliderProxies: { parent: Node; badge: HTMLElement; slider: HTMLInputElement }[] = []
      target.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach(slider => {
        const badge = document.createElement('div')
        badge.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:13px;font-weight:700;color:#15803d;font-family:Inter,system-ui,sans-serif;'
        badge.textContent = slider.value
        slider.style.display = 'none'
        slider.parentNode?.insertBefore(badge, slider)
        sliderProxies.push({ parent: slider.parentNode!, badge, slider })
      })

      // Brief pause for DOM to settle
      await new Promise(r => setTimeout(r, 120))

      // ── Capture canvas at 2× for sharp resolution ─────────────────────
      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        ignoreElements: (el: Element) => {
          const tag = el.tagName?.toLowerCase()
          if (['nav', 'footer', 'header'].includes(tag)) return true
          const cls = (el as HTMLElement).className
          if (typeof cls === 'string') {
            if (cls.includes('calc-header-buttons')) return true
            if (cls.includes('share-modal')) return true
            if (cls.includes('breadcrumb')) return true
          }
          // Hide the download button itself from the PDF
          if ((el as HTMLElement).title === 'Download PDF report of this calculator') return true
          return false
        },
      })

      // ── Build A4 PDF ──────────────────────────────────────────────────
      const margin    = 12   // mm
      const pageW     = 210  // A4 width mm
      const pageH     = 297  // A4 height mm
      const usableW   = pageW - margin * 2
      const headerH   = 14   // top coloured bar
      const footerH   = 12
      const contentY  = headerH + 6
      const availH    = pageH - contentY - footerH

      // Convert canvas pixels → mm (2× scale at 96 dpi → 1 logical px = 0.2646 mm)
      const mmPerLogPx = 0.2646
      const scale      = 2
      const imgMmW     = (canvas.width  / scale) * mmPerLogPx
      const imgMmH     = (canvas.height / scale) * mmPerLogPx
      const ratio      = usableW / imgMmW
      const fImgW      = usableW
      const fImgH      = imgMmH * ratio

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

      const addHeaderFooter = (pageNum: number, total: number) => {
        // Header bar
        pdf.setFillColor(accent)
        pdf.rect(0, 0, pageW, headerH, 'F')
        pdf.setTextColor(255, 255, 255)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9)
        const shortTitle = title.length > 70 ? title.slice(0, 67) + '…' : title
        pdf.text(shortTitle, margin, 9)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(7.5)
        pdf.text('tooltrio.com', pageW - margin, 9, { align: 'right' })

        // Footer line + text
        pdf.setDrawColor(229, 231, 235)
        pdf.setLineWidth(0.3)
        pdf.line(margin, pageH - footerH + 2, pageW - margin, pageH - footerH + 2)
        pdf.setTextColor(156, 163, 175)
        pdf.setFontSize(7)
        pdf.text(`Generated by ToolTrio.com  •  ${date}`, margin, pageH - 4)
        pdf.text(`Page ${pageNum} of ${total}`, pageW - margin, pageH - 4, { align: 'right' })
      }

      if (fImgH <= availH) {
        // ── Single page ─────────────────────────────────────────────────
        addHeaderFooter(1, 1)
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, contentY, fImgW, fImgH)
      } else {
        // ── Multi-page: slice canvas into page-height chunks ─────────────
        const pxPerPage = Math.round((availH / ratio) / mmPerLogPx) * scale
        const totalPages = Math.ceil(canvas.height / pxPerPage)

        for (let p = 0; p < totalPages; p++) {
          if (p > 0) pdf.addPage()

          const yStart  = p * pxPerPage
          const sliceH  = Math.min(pxPerPage, canvas.height - yStart)
          const sliceMmH = (sliceH / scale) * mmPerLogPx * ratio

          // Create an off-screen canvas slice
          const slice = document.createElement('canvas')
          slice.width  = canvas.width
          slice.height = sliceH
          const ctx = slice.getContext('2d')!
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.width, sliceH)
          ctx.drawImage(canvas, 0, yStart, canvas.width, sliceH, 0, 0, canvas.width, sliceH)

          addHeaderFooter(p + 1, totalPages)
          pdf.addImage(slice.toDataURL('image/png'), 'PNG', margin, contentY, fImgW, sliceMmH)
        }
      }

      // ── Restore sliders after capture ────────────────────────────────
      sliderProxies.forEach(({ badge, slider }) => {
        badge.remove()
        slider.style.display = ''
      })

      // ── Trigger download ──────────────────────────────────────────────
      const safeName = title.replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 60)
      pdf.save(`${safeName}.pdf`)

      setState('done')
      setTimeout(() => setState('idle'), 3000)

    } catch (err) {
      console.error('[PDF]', err)
      // Restore any slider proxies that were created before the error
      try {
        document.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach(s => { s.style.display = '' })
        document.querySelectorAll('[data-slider-proxy]').forEach(b => b.remove())
      } catch {}
      // Graceful fallback: print CSS hides everything except main content
      try {
        const style = document.createElement('style')
        style.id = 'trio-print-fallback'
        style.textContent = `
          @media print {
            body > * { display: none !important; }
            body > div > div.flex.flex-col { display: block !important; }
            nav, footer, header, [class*="calc-header-buttons"], [class*="breadcrumb"] { display: none !important; }
            main { display: block !important; }
          }
        `
        document.head.appendChild(style)
        window.print()
        setTimeout(() => document.getElementById('trio-print-fallback')?.remove(), 2000)
        setState('done')
        setTimeout(() => setState('idle'), 3000)
      } catch {
        setState('idle')
      }
    }
  }, [state, title, category, accent])

  return (
    <>
      <style>{`@keyframes pdf-spin{to{transform:rotate(360deg)}}`}</style>
      <button
        onClick={handleDownload}
        disabled={state === 'loading'}
        title="Download PDF report of this calculator"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '9px 14px',
          fontSize: '12px',
          fontWeight: 700,
          color: '#fff',
          border: 'none',
          borderRadius: '11px',
          cursor: state === 'loading' ? 'not-allowed' : 'pointer',
          background: bg,
          boxShadow: `0 4px 14px ${accent}44`,
          transition: 'filter .15s, transform .1s',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          minHeight: '40px',
          flex: '1 1 auto',
          opacity: state === 'loading' ? 0.75 : 1,
        }}
        onMouseEnter={e => { if (state === 'idle') e.currentTarget.style.filter = 'brightness(1.1)' }}
        onMouseLeave={e => { e.currentTarget.style.filter = '' }}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
        onMouseUp={e => { e.currentTarget.style.transform = '' }}
      >
        {state === 'loading' ? <Spinner /> : state === 'done' ? <CheckIcon /> : <DownloadIcon />}
        {state === 'loading' ? 'Generating…' : state === 'done' ? 'Downloaded!' : 'Download PDF'}
      </button>
    </>
  )
}

// ── Legacy aliases (keep existing imports working) ────────────────────────────
export const FullReportButton   = DownloadPDFButton
export const ResultsOnlyButton  = () => null
export const ExportButtonPair   = DownloadPDFButton
export const ExportPDFButton    = DownloadPDFButton
export const ExportPDFBar       = DownloadPDFButton
