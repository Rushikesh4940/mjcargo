// Renders every route to static HTML after `vite build`, so each page ships
// with its content, title, meta tags and structured data already in place.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const serverEntry = path.join(root, 'dist-server/entry-server.js')

const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/+$/, '')

const { render, routes, buildHead } = await import(pathToFileURL(serverEntry).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

for (const route of routes) {
  const html = template
    .replace('<!--app-head-->', buildHead(route, siteUrl || undefined))
    .replace('<!--app-html-->', render(route.path))
  const file = route.id === 'notFound' ? path.join(dist, '404.html') : path.join(dist, route.path, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`prerendered ${route.path} -> ${path.relative(root, file)}`)
}

let robots = 'User-agent: *\nAllow: /\n'
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes
    .filter((r) => r.inSitemap)
    .map((r) => `  <url><loc>${siteUrl}${r.path}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
  robots += `\nSitemap: ${siteUrl}/sitemap.xml\n`
  console.log(`sitemap.xml written for ${siteUrl}`)
} else {
  console.warn('SITE_URL is not set: skipped sitemap.xml, canonical URLs and og:image. Set SITE_URL for production builds.')
}
await writeFile(path.join(dist, 'robots.txt'), robots)
await rm(path.join(root, 'dist-server'), { recursive: true, force: true })
