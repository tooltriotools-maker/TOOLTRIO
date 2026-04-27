import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: '.htaccess Generator — Apache Redirect and Rewrite Rules Free',
  description: 'Generate .htaccess rules for redirects, URL rewriting, HTTPS enforcement, caching headers, and CORS. Runs entirely in your browser.',
  slug: 'htaccess-generator',
  keywords: ['htaccess generator online free','apache htaccess builder browser','mod_rewrite generator free','301 redirect htaccess generator','apache config generator tool'],
})

const faqs = [
  { question: 'What is .htaccess and when should I use it instead of Apache main config?', answer: ".htaccess is a directory-level Apache configuration file that applies to the directory it is in and all subdirectories. It allows per-directory configuration without access to the main httpd.conf. Use .htaccess when: you are on shared hosting without access to server config, you need different rules per directory, or your deployment pipeline makes updating the main config difficult. When to prefer main config: .htaccess is checked on every request for every file served from that directory, which has a small performance cost. High-traffic sites should move .htaccess rules to the main server config (or a virtual host config) and disable AllowOverride to eliminate the performance overhead." },
  { question: 'How do I redirect all HTTP traffic to HTTPS with .htaccess?', answer: `RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\nThe R=301 flag is critical — 301 is permanent redirect, which browsers and search engines cache. R=302 is temporary. Using 302 for an HTTPS redirect means browsers will not cache it and will always send an HTTP request first. For sites with HSTS (HTTP Strict Transport Security), also add the header: Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" — this tells browsers to always use HTTPS for 1 year without even attempting HTTP.` },
  { question: 'How do I create clean URLs by removing .php or .html extensions?', answer: "RewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^([^.]+)$ $1.php [L]\n\nThe conditions !-f and !-d ensure existing files and directories are served directly without rewriting. This rule rewrites /about to /about.php. For removing .html: replace $1.php with $1.html. For a more flexible approach that tries PHP first, then HTML: use a RewriteCond checking for each file\'s existence. Always test rewrites carefully — a misconfigured rule can cause infinite redirect loops or 500 errors." },
  { question: 'How do I set browser caching headers with .htaccess?', answer: `<IfModule mod_expires.c>\nExpiresActive On\nExpiresByType image/jpeg "access plus 1 year"\nExpiresByType image/png "access plus 1 year"\nExpiresByType text/css "access plus 1 month"\nExpiresByType application/javascript "access plus 1 month"\nExpiresByType text/html "access plus 0 seconds"\n</IfModule>\n\nSet images and static assets to 1 year when you use content-hash filenames (image.abc123.png). Set HTML to 0 seconds (no cache) so new deployments are picked up immediately. For versioned assets without hash filenames, use shorter periods (1 week or 1 month) to balance caching and freshness.` },
  { question: 'How do I enable GZIP compression with .htaccess?', answer: "<IfModule mod_deflate.c>\nAddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript text/xml application/xml\n</IfModule>\n\nGZIP typically compresses HTML/CSS/JS by 60-80%, significantly reducing page load time. Do not compress images (already compressed) or binary files (no benefit). If your server does not have mod_deflate, mod_gzip is an older alternative. Modern Apache servers (2.4+) often have mod_brotli available for even better compression ratios than GZIP — brotli compresses ~15-20% better than GZIP for typical web assets." },
  { question: 'What is the difference between a 301 and 302 redirect in .htaccess?', answer: "301 Moved Permanently: the resource has permanently moved to the new URL. Browsers cache this redirect — after visiting once, the browser goes directly to the new URL without hitting the server. Search engines transfer link equity (PageRank) to the new URL and update their index. Use for: HTTPS redirects, domain migrations, permanent URL restructuring. 302 Found (Temporary): the resource is temporarily at the new URL. Browsers do not cache it. Search engines retain the original URL in their index. Use for: maintenance pages, A/B testing redirects, temporary location changes." },
  { question: 'What other web server and infrastructure tools are on this site?', answer: "The robots.txt Generator creates search crawler control files that accompany .htaccess server configuration. The MIME Type Lookup tool identifies MIME types to add to .htaccess AddType directives. The CIDR Calculator helps with IP-based access control rules (Allow from 192.168.1.0/24). The HTTP Headers Analyzer checks which headers your server is actually returning after .htaccess changes. The Meta Tag Generator handles HTML-level redirects as an alternative to .htaccess when server access is unavailable. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: '.htaccess Generator — Apache Redirect and Rewrite Rules Free',
    description: 'Generate .htaccess rules for redirects, URL rewriting, HTTPS enforcement, caching headers, and CORS. Runs entirely in your browser.',
    slug: 'htaccess-generator',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
