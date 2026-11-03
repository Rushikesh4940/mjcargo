// The company's three services, confirmed by the owner (2026-10-30). Pages,
// the quote form, the footer and the structured data all read from here, so
// the business is described the same way everywhere. M J Cargo Movers does
// not carry part loads, shared loads or parcels; nothing on the site should
// suggest it does.

export type ServiceId = 'ftl' | 'warehousing' | 'forwarding'

export interface Service {
  id: ServiceId
  name: string
  // Short label for the form picker and the footer.
  short: string
  // One line under the label in the form picker.
  line: string
  // Section id on the Services page.
  anchor: string
  // One-sentence description for search engines (structured data).
  summary: string
}

export const services: Service[] = [
  {
    id: 'ftl',
    name: 'Full truck load transport',
    short: 'Full truck load',
    line: 'A whole truck of ours for your goods',
    anchor: 'full-truck',
    summary: 'A whole truck from our own fleet of 40 for your load alone, mostly from Nhava Sheva (JNPT) to destinations all over India, with GPS on our trucks.',
  },
  {
    id: 'warehousing',
    name: 'Warehousing',
    short: 'Warehousing',
    line: 'Storage for your goods',
    anchor: 'warehousing',
    summary: '20,000 sq ft of storage for your goods between consignments, ahead of a delivery, or while you free up space of your own.',
  },
  {
    id: 'forwarding',
    name: 'Freight forwarding',
    short: 'Freight forwarding',
    line: 'Your cargo’s movement arranged for you',
    anchor: 'freight-forwarding',
    summary: 'We arrange the whole movement of your cargo by road, in stages where needed, and keep it on track from origin to destination.',
  },
]

export const serviceById = (id: string) => services.find((s) => s.id === id)

export const quoteHref = (id: ServiceId) => `/contact/?service=${id}#quote`
