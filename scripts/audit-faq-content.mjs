import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('app/calculators')
const patterns = [
  /completely free/i,
  /100% free/i,
  /free to use/i,
  /no (?:account )?registration/i,
  /no signup/i,
  /no subscription/i,
  /no ads/i,
  /data (?:stored|shared|sold)/i,
  /privacy.*data/i,
  /works (?:on|with) (?:all|any) devices/i,
  /multiple currencies/i,
  /what currencies/i,
  /can i use this calculator for both/i,
]

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.name.endsWith('.tsx')) out.push(full)
  }
  return out
}

const files = walk(root)
let filesWithGenericFaqs = 0
let genericFaqPatternHits = 0
const samples = []

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const blocks = [...text.matchAll(/(?:const|let|var)\s+faqs\s*=\s*\[/g)]
  if (!blocks.length) continue
  let fileMatched = 0
  for (const match of blocks) {
    const start = match.index + match[0].length
    const end = text.indexOf(']\n', start)
    const block = end >= 0 ? text.slice(start, end) : text.slice(start)
    fileMatched += patterns.filter(p => p.test(block)).length
  }
  if (fileMatched) {
    filesWithGenericFaqs++
    genericFaqPatternHits += fileMatched
    if (samples.length < 20) samples.push({ file: path.relative(process.cwd(), file), matches: fileMatched })
  }
}

console.log(JSON.stringify({ filesScanned: files.length, filesWithGenericFaqs, genericFaqPatternHits, samples }, null, 2))
