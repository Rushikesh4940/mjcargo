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
}

export const services: Service[] = [
  {
    id: 'ftl',
    name: 'Full truck load transport',
    short: 'Full truck load',
    line: 'A whole truck of ours for your goods',
    anchor: 'full-truck',
  },
  {
    id: 'warehousing',
    name: 'Warehousing',
    short: 'Warehousing',
    line: 'Storage for your goods',
    anchor: 'warehousing',
  },
  {
    id: 'forwarding',
    name: 'Freight forwarding',
    short: 'Freight forwarding',
    line: 'Your cargo’s movement arranged for you',
    anchor: 'freight-forwarding',
  },
]

export const serviceById = (id: string) => services.find((s) => s.id === id)

export const quoteHref = (id: ServiceId) => `/contact/?service=${id}#quote`
