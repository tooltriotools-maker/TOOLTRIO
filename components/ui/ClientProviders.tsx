'use client'
import React, { useEffect, useState } from 'react'

// Dynamically import TrioBot only on client to avoid SSR issues
export function ClientProviders() {
  const [TrioBotComponent, setTrioBotComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Load TrioBot after hydration is complete
    import('./TrioBot').then(m => {
      setTrioBotComponent(() => m.TrioBot)
    })
  }, [])

  if (!TrioBotComponent) return null
  return <TrioBotComponent />
}
