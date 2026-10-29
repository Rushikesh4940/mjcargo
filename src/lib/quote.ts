// Quote request: field definitions, validation and submission.
// Submissions are POSTed as JSON to VITE_QUOTE_ENDPOINT (Formspree, Web3Forms,
// Getform, or your own handler). With no endpoint configured the form never
// pretends to send: it tells the visitor and offers WhatsApp/copy instead.

export interface QuoteFields {
  name: string
  company: string
  phone: string
  email: string
  pickup: string
  delivery: string
  cargoType: string
  load: string
  weight: string
  date: string
  details: string
}

export const emptyQuote: QuoteFields = {
  name: '',
  company: '',
  phone: '',
  email: '',
  pickup: '',
  delivery: '',
  cargoType: '',
  load: '',
  weight: '',
  date: '',
  details: '',
}

export const cargoTypes = [
  'Cartons / packaged goods',
  'Industrial material or machinery',
  'Raw material (bags, drums, sacks)',
  'Furniture or fixtures',
  'Other (describe below)',
]

export const loadTypes = ['Full truck', 'Part load', 'Not sure yet']

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>

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
  if (v.name.trim().length < 2) e.name = 'Enter your name so we know who to ask for.'
  if (!v.phone.trim()) e.phone = 'Enter a phone number we can call you back on.'
  else if (!normalizeIndianPhone(v.phone)) e.phone = 'Enter a 10-digit Indian number, e.g. 98765 43210.'
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'This email looks incomplete. Check it, or leave it blank.'
  if (v.pickup.trim().length < 2) e.pickup = 'Where should the goods be picked up from?'
  if (v.delivery.trim().length < 2) e.delivery = 'Where are the goods going?'
  if (!v.cargoType) e.cargoType = 'Choose the closest type of goods.'
  if (v.date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (new Date(`${v.date}T00:00:00`) < today) e.date = 'Choose today or a later date.'
  }
  return e
}

export function quoteSummary(v: QuoteFields): string {
  const lines = [
    'Quote request — M J Cargo Movers',
    `Name: ${v.name.trim()}${v.company.trim() ? ` (${v.company.trim()})` : ''}`,
    `Phone: ${v.phone.trim()}`,
    v.email.trim() && `Email: ${v.email.trim()}`,
    `From: ${v.pickup.trim()}`,
    `To: ${v.delivery.trim()}`,
    `Goods: ${v.cargoType}`,
    v.load && `Load: ${v.load}`,
    v.weight.trim() && `Weight / quantity: ${v.weight.trim()}`,
    v.date && `Preferred date: ${v.date}`,
    v.details.trim() && `Notes: ${v.details.trim()}`,
  ]
  return lines.filter(Boolean).join('\n')
}

export const quoteEndpoint: string | undefined = import.meta.env.VITE_QUOTE_ENDPOINT || undefined

export async function submitQuote(v: QuoteFields, signal?: AbortSignal): Promise<void> {
  if (!quoteEndpoint) throw new Error('not-configured')
  const res = await fetch(quoteEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...v,
      phone: normalizeIndianPhone(v.phone) ?? v.phone,
      _subject: `Quote request: ${v.pickup.trim()} → ${v.delivery.trim()}`,
      message: quoteSummary(v),
    }),
    signal,
  })
  if (!res.ok) throw new Error(`http-${res.status}`)
}
