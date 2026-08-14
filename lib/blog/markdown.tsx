import type { ReactNode } from 'react'
import Link from 'next/link'

function escapeText(value: string): string {
  return value
}

function safeHref(rawHref: string): string | null {
  const href = rawHref.trim()
  if (!href) return null
  if (href.startsWith('/') && !href.startsWith('//')) return href
  if (/^(https?:|mailto:)/i.test(href)) return href
  return null
}

function renderInline(source: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let buffer = ''
  let i = 0
  let key = 0

  const flush = () => {
    if (buffer) {
      nodes.push(escapeText(buffer))
      buffer = ''
    }
  }

  while (i < source.length) {
    if (source.startsWith('**', i)) {
      const end = source.indexOf('**', i + 2)
      if (end > i + 2) {
        flush()
        nodes.push(<strong key={`strong-${key++}`}>{renderInline(source.slice(i + 2, end))}</strong>)
        i = end + 2
        continue
      }
    }

    if (source[i] === '`') {
      const end = source.indexOf('`', i + 1)
      if (end > i + 1) {
        flush()
        nodes.push(<code key={`code-${key++}`} className="px-1.5 py-0.5 rounded bg-gray-100 text-sm">{source.slice(i + 1, end)}</code>)
        i = end + 1
        continue
      }
    }

    if (source[i] === '[') {
      const closeText = source.indexOf(']', i + 1)
      if (closeText > i + 1 && source[closeText + 1] === '(') {
        const closeHref = source.indexOf(')', closeText + 2)
        if (closeHref > closeText + 2) {
          const href = safeHref(source.slice(closeText + 2, closeHref))
          if (href) {
            flush()
            const external = /^(https?:|mailto:)/i.test(href)
            nodes.push(
              external ? (
                <a key={`link-${key++}`} href={href} rel="noopener noreferrer" className="text-green-700 underline underline-offset-2 hover:text-green-900">{renderInline(source.slice(i + 1, closeText))}</a>
              ) : (
                <Link key={`link-${key++}`} href={href} className="text-green-700 underline underline-offset-2 hover:text-green-900">{renderInline(source.slice(i + 1, closeText))}</Link>
              ),
            )
            i = closeHref + 1
            continue
          }
        }
      }
    }

    if (source[i] === '*' || source[i] === '_') {
      const marker = source[i]
      const end = source.indexOf(marker, i + 1)
      if (end > i + 1 && !source.startsWith(marker + marker, i)) {
        flush()
        nodes.push(<em key={`em-${key++}`}>{renderInline(source.slice(i + 1, end))}</em>)
        i = end + 1
        continue
      }
    }

    buffer += source[i]
    i += 1
  }

  flush()
  return nodes
}

function isTableDivider(line: string): boolean {
  const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|')
  return cells.length > 0 && cells.every(cell => /^\s*:?-{3,}:?\s*$/.test(cell))
}

function tableCells(line: string): string[] {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim())
}

function headingId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 90)
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n?/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i += 1
      continue
    }

    if (/^```/.test(line.trim()) || /^~~~/.test(line.trim())) {
      const fence = line.trim().slice(0, 3)
      const language = line.trim().slice(3).trim()
      i += 1
      const codeLines: string[] = []
      while (i < lines.length && !lines[i].trim().startsWith(fence)) {
        codeLines.push(lines[i])
        i += 1
      }
      if (i < lines.length) i += 1
      blocks.push(
        <pre key={`codeblock-${key++}`} className="overflow-x-auto rounded-xl bg-gray-950 text-gray-100 p-4 mb-5 text-sm leading-relaxed">
          {language && <code className="sr-only">{language}</code>}
          <code>{codeLines.join('\n')}</code>
        </pre>,
      )
      continue
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line)
    if (heading) {
      const level = heading[1].length
      const text = renderInline(heading[2])
      const className = level === 1
        ? 'text-3xl font-black text-gray-900 mt-8 mb-4'
        : level === 2
          ? 'text-2xl font-bold text-gray-900 mt-7 mb-3'
          : level === 3
            ? 'text-xl font-bold text-gray-800 mt-5 mb-2'
            : 'text-lg font-bold text-gray-800 mt-4 mb-2'
      const headingKey = `heading-${key++}`
      const id = headingId(heading[2])
      if (level === 1) blocks.push(<h1 id={id} key={headingKey} className={className}>{text}</h1>)
      else if (level === 2) blocks.push(<h2 id={id} key={headingKey} className={className}>{text}</h2>)
      else if (level === 3) blocks.push(<h3 id={id} key={headingKey} className={className}>{text}</h3>)
      else if (level === 4) blocks.push(<h4 id={id} key={headingKey} className={className}>{text}</h4>)
      else if (level === 5) blocks.push(<h5 id={id} key={headingKey} className={className}>{text}</h5>)
      else blocks.push(<h6 id={id} key={headingKey} className={className}>{text}</h6>)
      i += 1
      continue
    }

    if (/^\s*(\*{3,}|-{3,}|_{3,})\s*$/.test(line)) {
      blocks.push(<hr key={`hr-${key++}`} className="my-8 border-gray-200" />)
      i += 1
      continue
    }

    if (line.trim().startsWith('>')) {
      const quote: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''))
        i += 1
      }
      blocks.push(
        <blockquote key={`quote-${key++}`} className="border-l-4 border-green-300 pl-4 italic text-gray-600 mb-5">
          {quote.map((q, idx) => <p key={idx} className="mb-2 last:mb-0">{renderInline(q)}</p>)}
        </blockquote>,
      )
      continue
    }

    if (i + 1 < lines.length && line.includes('|') && isTableDivider(lines[i + 1])) {
      const headers = tableCells(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
        rows.push(tableCells(lines[i]))
        i += 1
      }
      blocks.push(
        <div key={`table-${key++}`} className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse text-sm">
            <thead><tr>{headers.map((cell, idx) => <th key={idx} className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-bold">{renderInline(cell)}</th>)}</tr></thead>
            <tbody>{rows.map((row, r) => <tr key={r}>{headers.map((_, c) => <td key={c} className="border border-gray-200 px-3 py-2 align-top">{renderInline(row[c] ?? '')}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      )
      continue
    }

    const unordered = /^\s*[-*+]\s+(.+)$/.exec(line)
    const ordered = /^\s*(\d+)[.)]\s+(.+)$/.exec(line)
    if (unordered || ordered) {
      const orderedList = Boolean(ordered)
      const items: string[] = []
      while (i < lines.length) {
        const match = orderedList ? /^\s*\d+[.)]\s+(.+)$/.exec(lines[i]) : /^\s*[-*+]\s+(.+)$/.exec(lines[i])
        if (!match) break
        items.push(match[1])
        i += 1
      }
      const List = orderedList ? 'ol' : 'ul'
      blocks.push(
        <List key={`list-${key++}`} className={`${orderedList ? 'list-decimal' : 'list-disc'} pl-6 mb-5 space-y-1 text-gray-700`}>
          {items.map((item, idx) => <li key={idx}>{renderInline(item)}</li>)}
        </List>,
      )
      continue
    }

    const paragraph: string[] = [line.trim()]
    i += 1
    while (i < lines.length && lines[i].trim()) {
      if (/^(#{1,6})\s+/.test(lines[i]) || /^\s*(?:[-*+]\s+|\d+[.)]\s+|>)/.test(lines[i]) || /^```|^~~~/.test(lines[i]) || /^\s*(?:\*{3,}|-{3,}|_{3,})\s*$/.test(lines[i])) break
      paragraph.push(lines[i].trim())
      i += 1
    }
    blocks.push(<p key={`p-${key++}`} className="text-gray-700 leading-relaxed mb-5">{renderInline(paragraph.join(' '))}</p>)
  }

  return <>{blocks}</>
}
