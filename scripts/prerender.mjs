/**
 * Post-build prerender.
 *
 * Vite emits one empty shell for every route, so a crawler that does not run
 * JavaScript would see an empty <div id="root"> on /services/*. This script
 * serves dist/ with SPA fallback, drives headless Chrome with Playwright, waits
 * for each route to hydrate, then writes the rendered DOM back out as a real
 * static HTML file at the same path.
 *
 * Install the Playwright Chromium browser before building with:
 * `npx playwright install chromium`
 *
 * Usage: node scripts/prerender.mjs   (also runs as `npm run postbuild`)
 */

import http from 'node:http'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import BUSINESS_CONFIG from '../src/config/businessConfig.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.resolve(process.env.PRERENDER_DIST ?? path.join(ROOT, 'dist'))

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
}

function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0])
    let file = path.join(DIST, urlPath)

    // Guard against path traversal before touching the filesystem.
    if (!file.startsWith(DIST)) file = path.join(DIST, 'index.html')

    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      const asIndex = path.join(file, 'index.html')
      file = fs.existsSync(asIndex) ? asIndex : path.join(DIST, 'index.html')
    }

    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    fs.createReadStream(file).pipe(res)
  })

  return new Promise((resolve, reject) => {
    // Port 0 lets the OS pick a free port, so a stray server on a fixed port
    // cannot fail the build.
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Waits until the route has an h1 and no pending Suspense fallback. */
async function waitForHydration(page) {
  for (let i = 0; i < 60; i++) {
    const ready = await page.evaluate(() => {
      const root = document.getElementById('root');
      if (!root || root.children.length === 0) return false;
      if (document.querySelector('[aria-busy="true"]')) return false;
      if (!document.querySelector('h1')) return false;
      if (!document.title) return false;
      return true;
    })
    if (ready) {
      // Let reveal animations settle so captured markup is not mid-transition.
      await sleep(350)
      return true
    }
    await sleep(150)
  }
  return false
}

async function prerenderRoute(route, port, page) {
  await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'domcontentloaded' })
  await sleep(500)
  const ready = await waitForHydration(page)
  if (!ready) return { route, ok: false, bytes: 0 }

  const html = await page.evaluate((isHome) => {
    // Drop the runtime "js" marker before serialising. It is re-added by the
    // inline head script on every real page load, so leaving it in the static
    // file would hide the scroll-reveal content for visitors without
    // JavaScript. Any is-visible picked up by the observer during the capture is
    // stripped too, so the saved markup is exactly the pre-hydration state React
    // expects and nothing mismatches on the next load.
    document.documentElement.classList.remove('js');
    document
      .querySelectorAll('.reveal.is-visible')
      .forEach((el) => el.classList.remove('is-visible'));
    document.querySelectorAll('[data-count-up-final]').forEach((el) => {
      el.textContent = el.dataset.countUpFinal
    })
    if (!isHome) document.getElementById('homepage-jsonld')?.remove()
    document.querySelectorAll('link[rel="modulepreload"]').forEach((link) => {
      const url = new URL(link.href)
      if (url.origin === document.location.origin) {
        link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`)
      }
    })
    return document.documentElement.outerHTML;
  }, route === '/')

  // "/" is dist/index.html and "/404.html" is the static-host not-found
  // document; every other route becomes <route>/index.html so plain static
  // servers resolve it without any rewrite rule.
  const outFile =
    route === '/'
      ? path.join(DIST, 'index.html')
      : route === '/404.html'
        ? path.join(DIST, '404.html')
        : path.join(DIST, route.replace(/^\//, ''), 'index.html')

  await fsp.mkdir(path.dirname(outFile), { recursive: true })
  await fsp.writeFile(outFile, `<!doctype html>\n${html}`, 'utf8')

  return { route, ok: true, bytes: Buffer.byteLength(html) }
}

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    throw new Error(`${path.join(DIST, 'index.html')} not found - run vite build first`)
  }

  const routes = [
    '/',
    ...BUSINESS_CONFIG.services.map(({ id }) => `/services/${id}`),
    ...BUSINESS_CONFIG.secondaryNavigation.map(({ href }) => href),
    // Static hosts (GitHub Pages, Netlify, Cloudflare Pages) serve this file
    // for unknown URLs, so the styled 404 works without JavaScript or rewrites.
    '/404.html',
  ]
  const { server, port } = await startServer()
  let browser
  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    console.log(`prerender: ${routes.length} routes`)
    let failed = 0

    for (const route of routes) {
      const result = await prerenderRoute(route, port, page)
      if (!result.ok) {
        failed++
        console.warn(`  FAIL  ${route}  (never hydrated)`)
      } else {
        console.log(`  ok    ${route}  ${(result.bytes / 1024).toFixed(1)} kB`)
      }
    }

    if (failed) throw new Error(`${failed} route(s) failed to prerender`)
  } finally {
    await browser?.close()
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()))
    })
  }
}

main().catch((err) => {
  console.error('prerender crashed:', err)
  process.exit(1)
})