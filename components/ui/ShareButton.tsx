'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ─────────────────────────────────────────────────────────────────────
type ShareCategory = 'Fun' | 'ZIP'

interface ShareButtonProps {
  title: string
  description?: string
  category?: ShareCategory
  /** If omitted, uses window.location.href */
  url?: string
}

// ─── Category accent colours ───────────────────────────────────────────────────
const ACCENTS: Record<ShareCategory, { bg: string; light: string; text: string; border: string }> = {
  Fun:         { bg: '#7c3aed', light: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe' },
  ZIP:         { bg: '#0284c7', light: '#f0f9ff', text: '#0369a1', border: '#bae6fd' },
}

// ─── Share channels ────────────────────────────────────────────────────────────
function getChannels(title: string, url: string, description: string) {
  const msg = encodeURIComponent(`${title} — ${description}\nCalculate yours free on ToolTrio 👉 ${url}`)
  const urlEnc = encodeURIComponent(url)
  const titleEnc = encodeURIComponent(`${title} | ToolTrio — Free US ZIP Code Tools`)
  return [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.533 5.854L.057 23.428a.75.75 0 0 0 .916.975l5.733-1.502A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 0 1-4.964-1.355l-.356-.213-3.676.964.983-3.594-.233-.37A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
      ),
      href: `https://wa.me/?text=${msg}`,
      color: '#25D366',
      bg: '#f0fdf4',
    },
    {
      id: 'twitter',
      label: 'X / Twitter',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${msg}&url=${urlEnc}`,
      color: '#000000',
      bg: '#f8fafc',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${urlEnc}`,
      color: '#1877F2',
      bg: '#eff6ff',
    },
    {
      id: 'email',
      label: 'Email',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      href: `mailto:?subject=${titleEnc}&body=${msg}`,
      color: '#6b7280',
      bg: '#f9fafb',
    },
  ]
}

// ─── Share Icon SVG ────────────────────────────────────────────────────────────
function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function ShareButton({ title, description = '', category = 'Fun', url }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [pageUrl, setPageUrl] = useState(url || '')
  const modalRef = useRef<HTMLDivElement>(null)
  const accent = ACCENTS[category] ?? ACCENTS.Fun

  // Resolve URL client-side
  useEffect(() => {
    if (!url && typeof window !== 'undefined') {
      setPageUrl(window.location.href)
    }
  }, [url])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const handleShare = useCallback(async () => {
    // Try Web Share API first (mobile / modern browsers)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | ToolTrio`,
          text: description
            ? `${description} — Try the free ${title} on ToolTrio!`
            : `Try the free ${title} on ToolTrio!`,
          url: pageUrl,
        })
        return
      } catch {
        // User cancelled or unsupported — fall through to modal
      }
    }
    setOpen(true)
  }, [title, description, pageUrl])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = pageUrl
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }, [pageUrl])

  const channels = getChannels(title, pageUrl, description)

  return (
    <>
      {/* ── Trigger Button ── */}
      <button
        onClick={handleShare}
        title="Share this calculator"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 16px',
          fontSize: '13px',
          fontWeight: 700,
          color: accent.text,
          background: accent.light,
          border: `1.5px solid ${accent.border}`,
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.15s',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          boxShadow: `0 2px 8px ${accent.bg}22`,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = accent.bg
          el.style.color = '#fff'
          el.style.borderColor = accent.bg
          el.style.boxShadow = `0 4px 14px ${accent.bg}44`
          el.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = accent.light
          el.style.color = accent.text
          el.style.borderColor = accent.border
          el.style.boxShadow = `0 2px 8px ${accent.bg}22`
          el.style.transform = ''
        }}
      >
        <ShareIcon />
        Share
      </button>

      {/* ── Modal Backdrop ── */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50000,
            background: 'rgba(15,23,42,0.55)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '0',
            animation: 'shareBackdropIn 0.18s ease',
          }}
        >
          {/* ── Modal Panel — bottom sheet on mobile, centered card on desktop ── */}
          <div
            ref={modalRef}
            style={{
              background: '#fff',
              borderRadius: '24px 24px 0 0',
              boxShadow: '0 -8px 40px rgba(15,23,42,0.18)',
              width: '100%',
              maxWidth: '480px',
              maxHeight: '90vh',
              overflowY: 'auto',
              animation: 'shareModalIn 0.25s cubic-bezier(.34,1.56,.64,1)',
            }}
            className="share-modal-panel"
          >
            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${accent.bg}, ${accent.bg}cc)`,
              padding: '20px 24px 16px',
              position: 'relative',
            }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  position: 'absolute', top: '14px', right: '14px',
                  background: 'rgba(255,255,255,0.2)', border: 'none',
                  color: 'white', width: '28px', height: '28px',
                  borderRadius: '50%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.35)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)')}
              >
                ✕
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShareIcon />
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Share This Calculator</p>
                  <p style={{ color: '#fff', fontSize: '15px', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{title}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 20px 24px' }}>

              {/* Copy link row */}
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Copy Link
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#f8fafc', border: '1.5px solid #e2e8f0',
                borderRadius: '12px', padding: '8px 10px 8px 14px',
                marginBottom: '20px',
              }}>
                <span style={{
                  flex: 1, fontSize: '12px', color: '#475569',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  fontFamily: 'monospace',
                }}>
                  {pageUrl}
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '6px 12px', borderRadius: '8px', border: 'none',
                    background: copied ? '#10b981' : accent.bg,
                    color: '#fff', fontSize: '12px', fontWeight: 700,
                    cursor: 'pointer', flexShrink: 0,
                    transition: 'all 0.15s',
                  }}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Social channels */}
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Share via
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {channels.map(ch => (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setTimeout(() => setOpen(false), 300)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '12px 14px', borderRadius: '14px',
                      background: ch.bg, border: '1.5px solid #f1f5f9',
                      textDecoration: 'none', color: ch.color,
                      fontSize: '13px', fontWeight: 700,
                      transition: 'all 0.15s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.transform = 'translateY(-2px)'
                      el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                      el.style.borderColor = ch.color + '44'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.transform = ''
                      el.style.boxShadow = ''
                      el.style.borderColor = '#f1f5f9'
                    }}
                  >
                    <span style={{ color: ch.color, flexShrink: 0 }}>{ch.icon}</span>
                    {ch.label}
                  </a>
                ))}
              </div>

              {/* Tagline */}
              <p style={{
                textAlign: 'center', fontSize: '11px', color: '#cbd5e1',
                marginTop: '18px', marginBottom: 0,
              }}>
                🔒 ToolTrio — Free US ZIP Code Tools
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shareBackdropIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes shareModalIn { from { opacity: 0; transform: scale(0.88) translateY(16px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
    </>
  )
}
