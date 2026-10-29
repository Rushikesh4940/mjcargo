import { business, fullAddressLines, mapsUrl } from '../config/business'
import type { RouteMeta } from '../routes'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Builds the per-page <head> tags at prerender time. `siteUrl` is the
// production origin (no trailing slash); without it, tags that need absolute
// URLs (canonical, og:url, og:image) are left out rather than guessed.
export function buildHead(route: RouteMeta, siteUrl: string | undefined): string {
  const tags: string[] = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(business.name)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
  if (route.id === 'notFound') tags.push(`<meta name="robots" content="noindex" />`)
  if (siteUrl && route.id !== 'notFound') {
    const url = `${siteUrl}${route.path}`
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${siteUrl}/og-image.jpg" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(`${business.name}, road freight from New Panvel, Navi Mumbai`)}" />`,
    )
  }
  if (route.id === 'home' || route.id === 'contact') {
    tags.push(`<script type="application/ld+json">${JSON.stringify(localBusinessSchema(siteUrl)).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}

// Only verified facts: no rating, coordinates, hours or founding date unless
// they are set in config/business.ts.
export function localBusinessSchema(siteUrl: string | undefined) {
  const a = business.address
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    alternateName: business.listedName,
    description: 'Goods transport company in New Panvel, Navi Mumbai, moving full-truck and part-load road freight in its own trucks.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.unit}, ${a.building}, ${a.area}, ${a.landmark}, ${a.street}`,
      addressLocality: `${a.locality}, ${a.city}`,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    hasMap: mapsUrl,
    areaServed: { '@type': 'City', name: 'Navi Mumbai' },
  }
  if (siteUrl) {
    schema.url = `${siteUrl}/`
    schema.image = `${siteUrl}/og-image.jpg`
  }
  if (business.phone) schema.telephone = business.phone
  if (business.email) schema.email = business.email
  if (business.foundingYear) schema.foundingDate = String(business.foundingYear)
  return schema
}

export const addressText = fullAddressLines.join(', ')
