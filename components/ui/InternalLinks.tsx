'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedLink {
  name: string
  href: string
  icon: string
  desc: string
  tag?: string
}

interface InternalLinksProps {
  links: RelatedLink[]
  title?: string
  variant?: 'inline' | 'grid' | 'compact'
}

export function InternalLinks({ links, title = 'Related Calculators', variant = 'grid' }: InternalLinksProps) {
  if (!links || links.length === 0) return null

  if (variant === 'compact') {
    return (
      <div className="my-6 p-4 bg-green-50 border border-green-200 rounded-xl">
        <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-3">
          📊 {title}
        </p>
        <div className="flex flex-wrap gap-2">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-200 rounded-lg text-sm font-semibold text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
            >
              <span>{link.icon}</span>
              {link.name}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="my-5 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
          💡 You might also need
        </p>
        <div className="space-y-2">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xl flex-shrink-0">{link.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{link.name}</p>
                <p className="text-xs text-gray-500 truncate">{link.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Default: grid
  return (
    <div className="my-6">
      <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
        🔗 <span>{title}</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-start gap-3 p-3.5 bg-white border border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 hover:shadow-sm transition-all group"
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 leading-tight">{link.name}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{link.desc}</p>
              {link.tag && (
                <span className="inline-block mt-1 text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                  {link.tag}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
