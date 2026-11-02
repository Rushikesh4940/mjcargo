// Every public fact about the business lives here. Only verified details belong
// in this file: anything left as `null` is hidden on the site and left out of
// the structured data, so nothing unconfirmed is ever published.

export const business = {
  name: 'M J Cargo Movers',
  // How the business appears on its Justdial listing.
  listedName: 'M J Cargo',
  // Road freight in the company's own trucks (confirmed by the owner, 2026-10-29).
  category: 'Full truck load transport, warehousing and freight forwarding',

  address: {
    unit: 'Plot No 1, Shop No 29',
    building: 'Shree Ganesh Plaza 1',
    area: 'Sector 1, Khanda Colony',
    landmark: 'Behind Netrajyot Hospital',
    street: 'New Panvel Road',
    locality: 'New Panvel',
    city: 'Navi Mumbai',
    region: 'Maharashtra',
    postalCode: '410206',
    country: 'IN',
  },

  // E.164 format, e.g. '+919876543210'. Call buttons appear only once this is set.
  phone: null as string | null,
  // Leave null to use the phone number for WhatsApp.
  whatsapp: null as string | null,
  email: null as string | null,
  // e.g. 'Mon–Sat, 9:30 am – 9:00 pm'. Not shown until confirmed.
  hours: null as string | null,
  // e.g. 2005. Not shown until confirmed.
  foundingYear: null as number | null,
}

export const fullAddressLines = [
  `${business.address.unit}, ${business.address.building}`,
  `${business.address.area}, ${business.address.landmark}`,
  `${business.address.street}, ${business.address.locality}`,
  `${business.address.city} ${business.address.postalCode}, ${business.address.region}`,
]

export const mapsQuery = `${business.address.building}, ${business.address.area}, ${business.address.locality}, ${business.address.city} ${business.address.postalCode}`
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`

export const whatsappNumber = business.whatsapp ?? business.phone

export function telHref(e164: string) {
  return `tel:${e164.replace(/[^+\d]/g, '')}`
}

export function whatsappHref(e164: string, text?: string) {
  const digits = e164.replace(/\D/g, '')
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export function formatPhone(e164: string) {
  const d = e164.replace(/\D/g, '')
  if (d.length === 12 && d.startsWith('91')) return `+91 ${d.slice(2, 7)} ${d.slice(7)}`
  return e164
}
