import { ImageResponse } from 'next/og'
import { publishedBlogPosts } from '@/lib/blog/posts'

export const runtime = 'edge'
export const alt = 'ToolTrio article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = publishedBlogPosts.find(item => item.slug === params.slug)
  const title = post?.title ?? 'ToolTrio Blog'
  const category = post?.category ?? 'Guides'

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px', background: 'linear-gradient(135deg,#f0fdf4,#ffffff,#ecfdf5)', color: '#111827' }}>
      <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: '#15803d' }}>ToolTrio · {category}</div>
      <div style={{ display: 'flex', fontSize: 58, lineHeight: 1.08, fontWeight: 800, maxWidth: 1050 }}>{title}</div>
      <div style={{ display: 'flex', fontSize: 24, color: '#4b5563' }}>tooltrio.com/blog/{params.slug}</div>
    </div>,
    size,
  )
}
