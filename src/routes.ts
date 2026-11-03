export type RouteId = 'home' | 'about' | 'services' | 'contact' | 'privacy' | 'credits' | 'notFound'

export interface RouteMeta {
  id: RouteId
  path: string
  title: string
  description: string
  inSitemap: boolean
}

export const routes: RouteMeta[] = [
  {
    id: 'home',
    path: '/',
    title: 'Full Truck Load, Warehousing & Freight Forwarding | M J Cargo Movers',
    description:
      'Full truck load transport in our own 40 trucks, from Nhava Sheva (JNPT) to all of India, plus 20,000 sq ft warehousing and freight forwarding. New Panvel.',
    inSitemap: true,
  },
  {
    id: 'services',
    path: '/services/',
    title: 'FTL Transport, Warehousing & Forwarding | M J Cargo Movers',
    description:
      'Full truck load transport from Nhava Sheva (JNPT) across India in our own GPS-fitted trucks, 20,000 sq ft of warehousing, and freight forwarding. Get a quote.',
    inSitemap: true,
  },
  {
    id: 'about',
    path: '/about/',
    title: 'About Us: 40 Own Trucks Since 2010 | M J Cargo Movers',
    description:
      'M J Cargo Movers has run its own trucks from New Panvel since 2010: 40 trucks with GPS, 20,000 sq ft of warehousing, and freight forwarding across India.',
    inSitemap: true,
  },
  {
    id: 'contact',
    path: '/contact/',
    title: 'Get a Transport Quote | M J Cargo Movers, New Panvel',
    description:
      'Request a quote for full truck load transport, warehousing or freight forwarding in a few steps, or visit our office behind Netrajyot Hospital, New Panvel.',
    inSitemap: true,
  },
  {
    id: 'privacy',
    path: '/privacy/',
    title: 'Privacy policy | M J Cargo Movers',
    description: 'How M J Cargo Movers handles the details you send through the quote request form.',
    inSitemap: true,
  },
  {
    id: 'credits',
    path: '/credits/',
    title: 'Image credits | M J Cargo Movers',
    description: 'Credits and licences for the photographs used on this website.',
    inSitemap: false,
  },
  {
    id: 'notFound',
    path: '/404',
    title: 'Page not found | M J Cargo Movers',
    description: 'This page does not exist.',
    inSitemap: false,
  },
]

export function routeForPath(pathname: string): RouteMeta {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  return routes.find((r) => r.path === normalized || (r.path === '/' && normalized === '/index.html/')) ?? routes.find((r) => r.id === 'notFound')!
}
