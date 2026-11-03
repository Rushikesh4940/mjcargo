import { business, fullAddressLines, mapsUrl } from '../config/business'
import { services } from '../data/services'
import type { RouteMeta } from '../routes'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const jsonLd = (data: unknown) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

// Breadcrumb names for the inner pages.
const crumbs: Partial<Record<RouteMeta['id'], string>> = {
  about: 'About us',
  services: 'Services',
  contact: 'Contact and quote',
  privacy: 'Privacy policy',
  credits: 'Image credits',
}

// Builds the per-page <head> tags at prerender time. `siteUrl` is the
// production origin (no trailing slash); without it, tags that need absolute
// URLs (canonical, og:url, og:image, breadcrumbs) are left out rather than
// guessed. `verification` is the Google Search Console token, if set.
export function buildHead(route: RouteMeta, siteUrl: string | undefined, verification?: string): string {
  const notFound = route.id === 'notFound'
  const tags: string[] = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta name="robots" content="${notFound ? 'noindex' : 'index, follow, max-image-preview:large'}" />`,
    `<meta name="geo.region" content="IN-MH" />`,
    `<meta name="geo.placename" content="New Panvel, Navi Mumbai" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(business.name)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
  ]
  if (verification) tags.push(`<meta name="google-site-verification" content="${esc(verification)}" />`)
  if (siteUrl && !notFound) {
    const url = `${siteUrl}${route.path}`
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${siteUrl}/og-image.jpg" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(`${business.name}: full truck load transport, warehousing and freight forwarding, New Panvel`)}" />`,
      `<meta name="twitter:image" content="${siteUrl}/og-image.jpg" />`,
    )
  }

  if (route.id === 'home') tags.push(jsonLd(websiteSchema(siteUrl)))
  if (route.id === 'home' || route.id === 'about' || route.id === 'contact') tags.push(jsonLd(localBusinessSchema(siteUrl)))
  if (route.id === 'services') tags.push(jsonLd(servicesSchema(siteUrl)))
  const crumb = crumbs[route.id]
  if (siteUrl && crumb) tags.push(jsonLd(breadcrumbSchema(siteUrl, crumb, route.path)))
  return tags.join('\n    ')
}

const businessId = (siteUrl: string | undefined) => (siteUrl ? `${siteUrl}/#business` : undefined)

function websiteSchema(siteUrl: string | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: business.name,
    alternateName: business.listedName,
    inLanguage: 'en-IN',
    ...(siteUrl && { url: `${siteUrl}/`, publisher: { '@id': businessId(siteUrl) } }),
  }
}

// Only verified facts: no rating, coordinates or hours unless they are set
// in config/business.ts.
export function localBusinessSchema(siteUrl: string | undefined) {
  const a = business.address
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    alternateName: business.listedName,
    description: `Full truck load transport in our own ${business.fleetSize} trucks, mostly from Nhava Sheva (JNPT) to all of India, ${business.warehouseSqFt} sq ft of warehousing, and freight forwarding, from New Panvel, Navi Mumbai.`,
    slogan: 'Transporting cargo with care',
    knowsAbout: ['Full truck load transport', 'Road freight', 'Warehousing', 'Freight forwarding'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.summary } })),
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.unit}, ${a.building}, ${a.area}, ${a.landmark}, ${a.street}`,
      addressLocality: `${a.locality}, ${a.city}`,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    hasMap: mapsUrl,
    areaServed: [
      { '@type': 'City', name: 'Navi Mumbai' },
      { '@type': 'Place', name: 'Nhava Sheva (JNPT)' },
      { '@type': 'Country', name: 'India' },
    ],
    taxID: business.gstin,
  }
  if (siteUrl) {
    schema['@id'] = businessId(siteUrl)
    schema.url = `${siteUrl}/`
    schema.logo = `${siteUrl}/brand/logo.png`
    schema.image = [`${siteUrl}/og-image.jpg`, `${siteUrl}/images/own-trucks-1280.jpg`]
  }
  if (business.phone) schema.telephone = business.phone
  if (business.email) schema.email = business.email
  if (business.foundingDate) schema.foundingDate = business.foundingDate
  return schema
}

// The Services page: one Service per offering, each pointing at the business.
function servicesSchema(siteUrl: string | undefined) {
  const provider = { '@type': 'LocalBusiness', name: business.name, ...(siteUrl && { '@id': businessId(siteUrl), url: `${siteUrl}/` }) }
  return {
    '@context': 'https://schema.org',
    '@graph': services.map((s) => ({
      '@type': 'Service',
      name: s.name,
      serviceType: s.name,
      description: s.summary,
      provider,
      areaServed: { '@type': 'Country', name: 'India' },
      ...(siteUrl && { url: `${siteUrl}/services/#${s.anchor}` }),
    })),
  }
}

function breadcrumbSchema(siteUrl: string, name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name, item: `${siteUrl}${path}` },
    ],
  }
}

export const addressText = fullAddressLines.join(', ')
