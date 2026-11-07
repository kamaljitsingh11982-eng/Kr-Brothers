import { mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import BUSINESS_CONFIG from '../src/config/businessConfig.js'
import CITY_PAGES from '../src/config/cityPages.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://www.krbrothers.in'
const confirmedCities = new Set([
  ...BUSINESS_CONFIG.operations.confirmedMainServiceAreas,
  ...BUSINESS_CONFIG.operations.confirmedNearbyVillages,
])

const routes = [
  { route: '/', source: 'src/pages/Home.jsx' },
  ...BUSINESS_CONFIG.services.map(({ id }) => ({
    route: `/services/${id}/`,
    source: 'src/config/servicePages.js',
  })),
  ...CITY_PAGES
    .filter(({ city }) => confirmedCities.has(city))
    .map(({ slug }) => ({ route: `/${slug}/`, source: 'src/config/cityPages.js' })),
  { route: '/equipment/', source: 'src/pages/EquipmentPage.jsx' },
  { route: '/service-areas/', source: 'src/pages/ServiceAreasPage.jsx' },
  { route: '/contact/', source: 'src/pages/ContactPage.jsx' },
  { route: '/terms/', source: 'src/pages/TermsPage.jsx' },
]

const sourceDates = new Map(
  await Promise.all(
    [...new Set(routes.map(({ source }) => source))].map(async (source) => {
      const { mtime } = await stat(path.join(ROOT, source))
      return [source, mtime.toISOString().slice(0, 10)]
    }),
  ),
)

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const body = routes
  .map(
    ({ route, source }) => `  <url>
    <loc>${escapeXml(`${ORIGIN}${route}`)}</loc>
    <lastmod>${sourceDates.get(source)}</lastmod>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

await mkdir(path.join(ROOT, 'public'), { recursive: true })
await writeFile(path.join(ROOT, 'public', 'sitemap.xml'), sitemap, 'utf8')
console.log(`sitemap: wrote ${routes.length} URLs`)
