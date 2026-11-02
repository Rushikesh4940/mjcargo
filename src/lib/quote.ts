// Quote request: field definitions, validation and submission.
// Submissions are POSTed as JSON to VITE_QUOTE_ENDPOINT (Formspree, Web3Forms,
// Getform, or your own handler). With no endpoint configured the form never
// pretends to send: it tells the visitor and offers WhatsApp/copy instead.
//
// The visitor first chooses a service; each service asks only for what we
// need to price it. Fields shared by two services (origin and destination,
// goods, quantity, date) keep their values when the visitor switches.

import { serviceById, type ServiceId } from '../data/services'

export interface QuoteFields {
  service: ServiceId | ''
  // Full truck load: pickup and delivery. Freight forwarding: origin and destination.
  pickup: string
  delivery: string
  // Goods description (truck load, forwarding) or type of goods (warehousing).
  goods: string
  // Approximate weight (truck load), storage quantity (warehousing) or shipment quantity (forwarding).
  quantity: string
  // Warehousing only.
  duration: string
  location: string
  // Preferred transport or movement date (truck load, forwarding).
  date: string
  details: string
  name: string
  company: string
  phone: string
  email: string
}

export const emptyQuote: QuoteFields = {
  service: '',
  pickup: '',
  delivery: '',
  goods: '',
  quantity: '',
  duration: '',
  location: '',
  date: '',
  details: '',
  name: '',
  company: '',
  phone: '',
  email: '',
}

export const storageDurations = ['Less than a month', '1 to 3 months', '3 to 6 months', 'More than 6 months', 'Not sure yet']

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>

// The order fields appear on screen for each service, so a failed submit
// focuses the first problem the visitor can see.
export const fieldOrder: Record<ServiceId, (keyof QuoteFields)[]> = {
  ftl: ['pickup', 'delivery', 'goods', 'quantity', 'date', 'name', 'phone', 'email'],
  warehousing: ['goods', 'quantity', 'duration', 'location', 'name', 'phone', 'email'],
  forwarding: ['pickup', 'delivery', 'goods', 'quantity', 'date', 'name', 'phone', 'email'],
}

export function normalizeIndianPhone(raw: string): string | null {
  let d = raw.replace(/[^\d]/g, '')
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  if (/^[6-9]\d{9}$/.test(d)) return `+91${d}`
  // Landlines with STD code (e.g. 022 or 02143) normalise to 10 digits too.
  if (/^[1-5]\d{9}$/.test(d)) return `+91${d}`
  return null
}

export function validateQuote(v: QuoteFields): QuoteErrors {
  const e: QuoteErrors = {}
  if (!v.service) {
    e.service = 'Choose what you need a quote for.'
    return e
  }
  if (v.service === 'ftl' || v.service === 'forwarding') {
    const forwarding = v.service === 'forwarding'
    if (v.pickup.trim().length < 2) e.pickup = forwarding ? 'Where does the cargo start from?' : 'Where should the goods be picked up from?'
    if (v.delivery.trim().length < 2) e.delivery = forwarding ? 'Where does the cargo need to go?' : 'Where are the goods going?'
    if (v.goods.trim().length < 2) e.goods = forwarding ? 'Describe the cargo in a few words.' : 'Describe the goods in a few words.'
    if (v.date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (new Date(`${v.date}T00:00:00`) < today) e.date = 'Choose today or a later date.'
    }
  }
  if (v.service === 'warehousing') {
    if (v.goods.trim().length < 2) e.goods = 'What kind of goods do you need to store?'
    if (v.quantity.trim().length < 1) e.quantity = 'Roughly how much needs storing? A rough figure is enough.'
  }
  if (v.name.trim().length < 2) e.name = 'Enter your name so we know who to ask for.'
  if (!v.phone.trim()) e.phone = 'Enter a phone number we can call you back on.'
  else if (!normalizeIndianPhone(v.phone)) e.phone = 'Enter a 10-digit Indian number, e.g. 98765 43210.'
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'This email looks incomplete. Check it, or leave it blank.'
  return e
}

export function quoteSummary(v: QuoteFields): string {
  const service = serviceById(v.service)?.name ?? 'Not chosen'
  const t = (s: string) => s.trim()
  const lines =
    v.service === 'warehousing'
      ? [
          `Goods to store: ${t(v.goods)}`,
          `Quantity: ${t(v.quantity)}`,
          v.duration && `Storage period: ${v.duration}`,
          t(v.location) && `Preferred location: ${t(v.location)}`,
        ]
      : [
          `${v.service === 'forwarding' ? 'Origin' : 'Pickup'}: ${t(v.pickup)}`,
          `${v.service === 'forwarding' ? 'Destination' : 'Delivery'}: ${t(v.delivery)}`,
          `${v.service === 'forwarding' ? 'Cargo' : 'Goods'}: ${t(v.goods)}`,
          t(v.quantity) && `${v.service === 'forwarding' ? 'Shipment quantity' : 'Approximate weight'}: ${t(v.quantity)}`,
          v.date && `Preferred date: ${v.date}`,
        ]
  return [
    'Quote request — M J Cargo Movers',
    `Service: ${service}`,
    ...lines,
    t(v.details) && `Notes: ${t(v.details)}`,
    `Name: ${t(v.name)}${t(v.company) ? ` (${t(v.company)})` : ''}`,
    `Phone: ${t(v.phone)}`,
    t(v.email) && `Email: ${t(v.email)}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export function quoteSubject(v: QuoteFields): string {
  if (v.service === 'warehousing') return `Warehousing quote: ${v.goods.trim()}`
  const kind = v.service === 'forwarding' ? 'Freight forwarding' : 'Full truck load'
  return `${kind} quote: ${v.pickup.trim()} → ${v.delivery.trim()}`
}

// Only the fields that belong to the chosen service are sent.
function fieldsFor(v: QuoteFields): Partial<QuoteFields> {
  const contact = { name: v.name, company: v.company, phone: normalizeIndianPhone(v.phone) ?? v.phone, email: v.email, details: v.details }
  if (v.service === 'warehousing') return { service: v.service, goods: v.goods, quantity: v.quantity, duration: v.duration, location: v.location, ...contact }
  return { service: v.service, pickup: v.pickup, delivery: v.delivery, goods: v.goods, quantity: v.quantity, date: v.date, ...contact }
}

export const quoteEndpoint: string | undefined = import.meta.env.VITE_QUOTE_ENDPOINT || undefined

export async function submitQuote(v: QuoteFields, signal?: AbortSignal): Promise<void> {
  if (!quoteEndpoint) throw new Error('not-configured')
  const res = await fetch(quoteEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...fieldsFor(v), _subject: quoteSubject(v), message: quoteSummary(v) }),
    signal,
  })
  if (!res.ok) throw new Error(`http-${res.status}`)
}
