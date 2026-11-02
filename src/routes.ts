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
    title: 'M J Cargo Movers | Full Truck Load, Warehousing & Freight Forwarding',
    description:
      'Dedicated full truck load transport in our own trucks, warehousing and freight forwarding from New Panvel, Navi Mumbai. Tell us what you need and get a quote.',
    inSitemap: true,
  },
  {
    id: 'services',
    path: '/services/',
    title: 'Full Truck Load Transport, Warehousing & Freight Forwarding in Panvel | M J Cargo Movers',
    description:
      'Dedicated truck transportation for your whole load, warehousing services for your goods, and freight forwarding, from New Panvel, Navi Mumbai. See each service and request a quote.',
    inSitemap: true,
  },
  {
    id: 'about',
    path: '/about/',
    title: 'About M J Cargo Movers | Own trucks, warehousing & forwarding, New Panvel',
    description:
      'A New Panvel company with its own trucks, offering full truck load transport, warehousing and freight forwarding from an office in Shree Ganesh Plaza, Khanda Colony.',
    inSitemap: true,
  },
  {
    id: 'contact',
    path: '/contact/',
    title: 'Request a quote: full truck load, warehousing, freight forwarding | M J Cargo Movers',
    description:
      'Choose full truck load transport, warehousing or freight forwarding, add a few details and get a quotation. Or visit our office behind Netrajyot Hospital, New Panvel.',
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
