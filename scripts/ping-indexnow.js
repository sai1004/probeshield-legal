#!/usr/bin/env node

/**
 * scripts/ping-indexnow.js
 *
 * Automatically notifies search engines (Bing, Yandex, IndexNow-enabled engines)
 * about new and updated pages
 */

const fs = require('fs')
const path = require('path')

const HOST = process.env.INDEXNOW_HOST || 'probeshield.com'
const DEFAULT_KEY = '1bb629e5d7166f96b3507106eb1649dd'
const KEY = process.env.INDEXNOW_KEY || DEFAULT_KEY
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

const ENDPOINTS = ['https://api.indexnow.org/IndexNow', 'https://www.bing.com/IndexNow']

/**
 * Discovers all public canonical URLs from sitemap.xml or content files.
 */
function discoverUrls() {
  const discovered = new Set()

  const sitemapPath = path.join(process.cwd(), 'out', 'sitemap.xml')
  if (fs.existsSync(sitemapPath)) {
    try {
      const xml = fs.readFileSync(sitemapPath, 'utf8')
      const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      matches.forEach((url) => discovered.add(url))
    } catch (e) {
      // Fall through to file-based discovery
    }
  }

  // File-based guarantee
  const baseUrls = [
    `https://${HOST}/`,
    `https://${HOST}/blog/`,
    `https://${HOST}/checklist/`,
    `https://${HOST}/default-passwords/`,
    `https://${HOST}/tools/mac-lookup/`,
    `https://${HOST}/privacy/`,
    `https://${HOST}/terms/`,
  ]
  baseUrls.forEach((url) => discovered.add(url))

  const postsDir = path.join(process.cwd(), 'content', 'posts')
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.tsx'))
    for (const file of files) {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const match = content.match(/slug:\s*['"]([^'"]+)['"]/)
      if (match && match[1]) {
        discovered.add(`https://${HOST}/blog/${match[1]}/`)
      }
    }
  }

  const normalized = Array.from(discovered).map((raw) => {
    try {
      const u = new URL(raw)
      if (!u.pathname.endsWith('/') && !path.extname(u.pathname)) {
        u.pathname += '/'
      }
      return u.href
    } catch {
      return raw
    }
  })

  return Array.from(new Set(normalized))
}

/**
 * Formats input arguments or defaults to discovered URLs.
 */
function resolveUrlList(args) {
  if (args.length > 0) {
    return args.map((arg) => {
      if (arg.startsWith('http://') || arg.startsWith('https://')) {
        return arg
      }
      const cleanPath = arg.startsWith('/') ? arg : `/${arg}`
      const trailing = cleanPath.endsWith('/') || cleanPath.includes('.') ? cleanPath : `${cleanPath}/`
      return `https://${HOST}${trailing}`
    })
  }
  return discoverUrls()
}

/**
 * Sends the payload to an IndexNow endpoint.
 */
async function submitToIndexNow(endpoint, payload) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'ProbeShield-IndexNow-Ping/1.0',
      },
      body: JSON.stringify(payload),
    })

    const text = await response.text().catch(() => '')
    return {
      endpoint,
      status: response.status,
      ok: response.status === 200 || response.status === 202,
      body: text,
    }
  } catch (error) {
    return {
      endpoint,
      status: 0,
      ok: false,
      error: error.message,
    }
  }
}

async function main() {
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'))
  const urls = resolveUrlList(args)

  console.log(`\n======================================================`)
  console.log(` 📡 IndexNow Ping for ${HOST}`)
  console.log(`======================================================`)
  console.log(`Key:          ${KEY}`)
  console.log(`Key Location: ${KEY_LOCATION}`)
  console.log(`URLs to ping: ${urls.length} URL(s)\n`)

  urls.forEach((u, i) => console.log(`  ${i + 1}. ${u}`))
  console.log(`\nSending notification to IndexNow search engines...`)

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  let successCount = 0

  for (const endpoint of ENDPOINTS) {
    process.stdout.write(`Submitting to ${endpoint}... `)
    const result = await submitToIndexNow(endpoint, payload)

    if (result.ok) {
      successCount++
      console.log(`✅ [${result.status}] OK`)
    } else if (result.error) {
      console.log(`❌ Failed: ${result.error}`)
    } else {
      console.log(`⚠️ [${result.status}] ${result.body || 'Received error response'}`)
    }
  }

  console.log(`\n======================================================`)
  if (successCount > 0) {
    console.log(`🎉 Notified search engines (${successCount}/${ENDPOINTS.length} endpoints succeeded).`)
    console.log(`Participating engines (Bing, Yandex, etc.) will schedule indexing shortly.`)
  } else {
    console.log(`⚠️ All submissions returned errors. Note: If this is a newly generated key,`)
    console.log(`ensure '${KEY}.txt' is deployed to production before pinging live APIs.`)
  }
  console.log(`======================================================\n`)
}

main().catch((err) => {
  console.error('Fatal error running ping-indexnow:', err)
  process.exit(1)
})
