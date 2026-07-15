// IndexNow ping — notifies Bing, Yandex, Naver, Seznam (NOT Google) that the
// site's URLs changed, for faster non-Google indexing. Run after a deploy:
//
//   node scripts/indexnow-ping.mjs
//
// It auto-discovers the IndexNow key from the file in /public (named
// {key}.txt, content == key), reads the live sitemap, and submits every URL.

import { readdirSync, readFileSync } from 'fs'

const HOST = 'www.darrenlbuckner.com'
const SITEMAP = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

// Find the IndexNow key file in /public: a *.txt whose basename equals its
// (hex) content — that's the key IndexNow verifies against.
function findKey() {
  for (const f of readdirSync('public')) {
    if (!f.endsWith('.txt')) continue
    const base = f.slice(0, -4)
    const content = readFileSync(`public/${f}`, 'utf8').trim()
    if (base === content && /^[a-f0-9]{8,128}$/i.test(content)) return content
  }
  throw new Error('No IndexNow key file found in /public (expected {key}.txt)')
}

async function main() {
  const key = findKey()
  const keyLocation = `https://${HOST}/${key}.txt`

  const xml = await (await fetch(SITEMAP)).text()
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (urlList.length === 0) throw new Error('No <loc> URLs found in sitemap')

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation, urlList }),
  })

  console.log(`submitted ${urlList.length} URLs -> IndexNow: HTTP ${res.status}`)
  // 200/202 = accepted. 403 = key not verifiable yet (deploy the key file first).
  if (!res.ok) {
    console.error(await res.text())
    process.exit(1)
  }
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
