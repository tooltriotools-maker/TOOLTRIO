const KEY = process.env.INDEXNOW_KEY || '5a108cc9e1994443af3e9bfb8b969aa8';
const HOST = 'tooltrio.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BASE = `https://${HOST}`;

// These are the exact, explicitly-listed 410 URLs from middleware.ts.
// Prefix-based 410 rules cannot be enumerated because they intentionally
// cover arbitrary old URLs. Those are notified automatically by middleware
// when they are requested.
const explicitGonePaths = [
  '/fun/calories-in-beer',
  '/fun/how-rich-am-i',
  '/fun/life-expectancy-fun',
  '/fun/procrastination-score',
  '/fun/screen-time-calculator',
  '/fun/sleep-debt-calculator',
  '/fun/social-media-addiction',
  '/fun/insult-generator/roast-generator',
  '/fun/insult-generator/savage-insult-generator',
  '/fun/insult-generator/schoolyard-insult-generator',
  '/fun/insult-generator/office-roast-generator',
  '/fun/insult-generator/best-friend-roast-generator',
  '/fun/shakespeare-insult-generator',
  '/fun/insult-generator/shakespear-insult-generator',
  '/calculators/fun/shakespeare-insult-generator',
];

const urls = explicitGonePaths.map(path => `${BASE}${path}`);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }),
});

console.log(`Submitted ${urls.length} explicit 410 URLs to IndexNow.`);
console.log(`IndexNow response: HTTP ${response.status}`);
if (!response.ok) {
  console.log(await response.text());
  process.exitCode = 1;
}
