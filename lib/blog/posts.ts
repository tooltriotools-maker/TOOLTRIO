export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  categorySlug: string
  readTime: string
  publishedAt: string
  updatedAt?: string
  author: string
  tags: string[]
  relatedCalc: { name: string; href: string }
  relatedCalcs?: { name: string; href: string; icon: string; desc: string }[]
  relatedBlogs?: { title: string; slug: string; desc: string }[]
  trendingKeywords?: string[]
  seoTitle: string
  seoDescription: string
  keywords: string[]
}

export const blogCategories = [
  { name: 'ZIP Code Guides', slug: 'zip-codes', desc: 'ZIP code lookup, ZIP+4, distance, timezones & format rules', icon: '📮'},
]

export { zipBlogPosts as blogPosts } from './zipBlogPosts'
import { zipBlogPosts } from './zipBlogPosts'

export const publishedBlogPosts = zipBlogPosts
export const scheduledBlogPosts: BlogPost[] = []
export const publicBlogPosts = zipBlogPosts

export const isBlogPostPublished = (post: BlogPost, now = new Date()): boolean => {
  if (!post.publishedAt) return false
  const published = new Date(`${post.publishedAt}T00:00:00Z`)
  return Number.isFinite(published.getTime()) && published.getTime() <= now.getTime()
}

export function getBlogCategoryCount(categorySlug: string, posts = publishedBlogPosts): number {
  return posts.filter(post => post.categorySlug === categorySlug).length
}
