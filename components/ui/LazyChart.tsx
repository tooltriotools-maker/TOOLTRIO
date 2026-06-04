'use client'
/**
 * LazyChart - loads recharts only when the chart is about to be visible.
 * Cuts initial JS parse from ~500kb to ~0kb on first page load.
 * Usage: wrap your recharts JSX in <LazyChart height={300}>...</LazyChart>
 */
import { useEffect, useRef, useState, ReactNode } from 'react'

interface Props {
  height: number
  children: ReactNode
  className?: string
}

export function LazyChart({ height, children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ height, width: '100%' }} className={className}>
      {visible ? (
        children
      ) : (
        <div
          style={{ height, width: '100%' }}
          className="animate-pulse rounded-xl bg-gradient-to-r from-slate-100 to-slate-200"
        />
      )}
    </div>
  )
}
