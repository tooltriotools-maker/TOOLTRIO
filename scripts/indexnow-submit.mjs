const SITE_URL = "https://tooltrio.com";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

if (!INDEXNOW_KEY) {
  console.error("INDEXNOW_KEY environment variable is missing.");
  process.exit(1);
}

const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  console.log("Reading sitemap:", SITEMAP_URL);

  const sitemapResponse = await fetch(SITEMAP_URL);

  if (!sitemapResponse.ok) {
    throw new Error(
      `Could not fetch sitemap: ${sitemapResponse.status} ${sitemapResponse.statusText}`
    );
  }

  const xml = await sitemapResponse.text();

  // Extract URLs from <loc>...</loc>
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter(Boolean);

  if (urls.length === 0) {
    console.log("No URLs found in sitemap.");
    return;
  }

  console.log(`Found ${urls.length} URLs in sitemap.`);

  const payload = {
    host: "tooltrio.com",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  console.log("Submitting URLs to IndexNow...");

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  console.log("IndexNow HTTP status:", response.status);

  if (responseText) {
    console.log("IndexNow response:", responseText);
  }

  if (!response.ok) {
    throw new Error(
      `IndexNow submission failed with HTTP ${response.status}`
    );
  }

  console.log(`Successfully submitted ${urls.length} URLs to IndexNow.`);
}

main().catch((error) => {
  console.error("IndexNow error:");
  console.error(error);
  process.exit(1);
});