const KEY = process.env.INDEXNOW_KEY || '5a108cc9e1994443af3e9bfb8b969aa8';
const HOST = 'tooltrio.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function getSitemapUrls() {
  const response = await fetch(SITEMAP);
  if (!response.ok) throw new Error(`Sitemap request failed: ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\\/loc>/g)].map(match => match[1].trim());
}

async function submit(urls) {
  if (!urls.length) return;
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });
  console.log(`IndexNow response: HTTP ${response.status}`);
  if (!response.ok) console.log(await response.text());
}

const urls = await getSitemapUrls();
console.log(`Submitting ${urls.length} sitemap URLs to IndexNow...`);
for (let i = 0; i < urls.length; i += 100) {
  await submit(urls.slice(i, i + 100));
}
console.log('Done.');
