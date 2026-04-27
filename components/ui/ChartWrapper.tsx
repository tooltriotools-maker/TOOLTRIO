'use client'
/**
 * ChartWrapper - ensures Recharts renders correctly in Next.js 14 App Router
 * Wraps children in a div with proper dimensions for ResizeObserver
 */
import { ReactNode, useEffect, useState } from 'react'

interface ChartWrapperProps {
  height: number
  children: ReactNode
}

export function ChartWrapper({ height, children }: ChartWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ height }} className="animate-pulse bg-gray-50 rounded-lg" />
  }

  return (
    <div style={{ height, width: '100%' }}>
      {children}
    </div>
  )
}
