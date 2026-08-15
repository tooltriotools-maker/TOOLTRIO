'use client'
/**
 * TOOLTRIO — DevToolLayout
 * Shared wrapper for Fun tool calculators.
 * Provides: breadcrumb, title, both PDF export buttons, and data-results wrapper.
 */

import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ExportButtonPair } from '@/components/ui/ExportPDFButton'
import { ShareButton } from '@/components/ui/ShareButton'
import type { ExportCategory } from '@/components/ui/ExportPDFButton'



interface DevToolLayoutProps {
  title: string
  description?: string
  icon?: string
  slug?: string
  /** Category label for colour theming — defaults to 'Fun' */
  category?: ExportCategory
  /** Breadcrumb parent path e.g. '/fun' */
  parentPath?: string
  /** Breadcrumb parent label e.g. 'Fun Tools' */
  parentLabel?: string
  children: ReactNode
}

export function DevToolLayout({
  title,
  description,
  icon = '🔧',
  slug,
  category = 'Fun',
  parentPath = '/fun',
  parentLabel = 'Fun & Entertainment',
  children,
}: DevToolLayoutProps) {

  const badgeColor = 'text-purple-700 bg-purple-100 border-purple-200'

  const iconBg = 'bg-purple-100 border-purple-200'


  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" data-noprint>
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={parentPath} className="hover:text-gray-600 transition-colors">{parentLabel}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold truncate">{title}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xl shadow-sm flex-shrink-0 ${iconBg}`}>
              {icon}
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColor}`}>
              {category}
            </span>
          </div>
          <h1
            className="calc-page-h1 text-2xl sm:text-3xl font-black text-gray-900 mb-1"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {icon} {title}
          </h1>
          {description && (
            <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">{description}</p>
          )}
        </div>

        {/* Export + Share pair */}
        <div className="flex-shrink-0">
          <div className="calc-header-buttons flex items-center gap-2 flex-wrap">
            <ShareButton title={title} description={description} category="Fun" />
            <ExportButtonPair title={title} category={category} />
          </div>
        </div>
      </div>

      {/* Main content — marked for results-only export */}
      <div data-results="true">
        {children}
      </div>
    </div>
  )
}
