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
    title: 'M J Cargo Movers | Road freight in our own trucks, New Panvel',
    description:
      'M J Cargo Movers moves goods by road from New Panvel, Navi Mumbai, in its own trucks: full-truck and part-load freight for businesses. Tell us where your goods are going and get a quote.',
    inSitemap: true,
  },
  {
    id: 'services',
    path: '/services/',
    title: 'Full-truck & part-load road freight from Panvel | M J Cargo Movers',
    description:
      'Full truckload and part-load road freight in our own trucks, run from New Panvel. See what we handle and request a quote for your load.',
    inSitemap: true,
  },
  {
    id: 'about',
    path: '/about/',
    title: 'About M J Cargo Movers | Goods transport, Khanda Colony, New Panvel',
    description:
      'A road freight company with its own trucks and an office in Shree Ganesh Plaza, Khanda Colony, New Panvel. How we work with businesses that need goods moved by road.',
    inSitemap: true,
  },
  {
    id: 'contact',
    path: '/contact/',
    title: 'Request a cargo quote | M J Cargo Movers, New Panvel',
    description:
      'Send your pickup point, delivery point and cargo details for a road freight quote, or visit our office behind Netrajyot Hospital, New Panvel.',
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
