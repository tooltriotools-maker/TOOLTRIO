# IndexNow + 410 URL Cleanup

ToolTrio uses the existing `middleware.ts` HTTP 410 rules as the source of truth for permanently removed URL families.

## Live URLs

Submit the current sitemap URLs with:

```powershell
$env:INDEXNOW_KEY="5a108cc9e1994443af3e9bfb8b969aa8"
npm run indexnow:submit
```

## 410 / wildcard URLs

The middleware calls IndexNow from the existing `goneResponse()` path. This means every **specific URL request** that matches a wildcard 410 rule is submitted to IndexNow automatically; no 900-URL list is required.

Examples covered by the current wildcard rules include:

- `/calculators/finance/:path*`
- `/calculators/health/:path*`
- `/calculators/dev/:path*`
- `/commodity/:path*`
- `/commodities/:path*`
- `/calculator/commodity/:path*`
- `/calculator/commodities/:path*`
- `/calculators/commodity/:path*`
- `/calculators/commodities/:path*`
- `/tools/commodity/:path*`
- `/tools/commodities/:path*`
- `/commodity-tools/:path*`
- `/commodities-tools/:path*`
- `/blog/:path*` for unpublished/removed blog paths

The response remains HTTP `410 Gone` with `X-Robots-Tag: noindex, follow`. IndexNow is only a notification; it does not guarantee removal or indexing.

## Important limitation

IndexNow accepts exact URLs, not wildcard patterns. Therefore the middleware can notify IndexNow when an exact old URL is requested, but it cannot proactively submit all historical URLs represented by a wildcard if those exact URLs are not available anywhere in the project.

Bing Webmaster Tools URL Blocking is separate from IndexNow. Keep the permanent `410` logic even after using URL Blocking.
