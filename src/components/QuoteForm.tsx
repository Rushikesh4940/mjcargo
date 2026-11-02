import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from 'react'
import { AlertCircle, ArrowRight, Check, Copy, LoaderCircle, MessageCircle } from 'lucide-react'
import { whatsappHref, whatsappNumber, fullAddressLines } from '../config/business'
import { services, serviceById, type ServiceId } from '../data/services'
import {
  emptyQuote,
  fieldOrder,
  quoteEndpoint,
  quoteSummary,
  storageDurations,
  submitQuote,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
} from '../lib/quote'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'offline'

export function QuoteForm() {
  const uid = useId()
  const [values, setValues] = useState<QuoteFields>(emptyQuote)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteFields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const [minDate, setMinDate] = useState<string>()
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Prefill from a service link (?service=) or the quote starter (?from=&to=,
  // which is the full truck load journey).
  useEffect(() => {
    const p = new URLSearchParams(location.search)
    const from = p.get('from')?.slice(0, 120)
    const to = p.get('to')?.slice(0, 120)
    const asked = serviceById(p.get('service') ?? '')?.id
    setValues((v) => ({
      ...v,
      service: asked ?? (from || to ? 'ftl' : v.service),
      pickup: from ?? v.pickup,
      delivery: to ?? v.delivery,
    }))
    setMinDate(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10))
  }, [])

  const set = (key: keyof QuoteFields) => (e: { target: { value: string } }) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validateQuote(next)[key] }))
    if (status === 'error' || status === 'offline') setStatus('idle')
  }
  const blur = (key: keyof QuoteFields) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((prev) => ({ ...prev, [key]: validateQuote(values)[key] }))
  }
  const choose = (id: ServiceId) => {
    setValues((v) => ({ ...v, service: id }))
    // A new service asks new questions: show its errors only once they are earned.
    setTouched({})
    setErrors({})
    if (status === 'error' || status === 'offline') setStatus('idle')
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const found = validateQuote(values)
    setErrors(found)
    if (!values.service) {
      setTouched({ service: true })
      formRef.current?.querySelector<HTMLElement>('[name="service"]')?.focus()
      return
    }
    const order = fieldOrder[values.service]
    setTouched(Object.fromEntries(order.map((k) => [k, true])))
    const firstBad = order.find((k) => found[k])
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus()
      return
    }
    if ((e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value) return // bot trap

    if (!quoteEndpoint) {
      setStatus('offline')
      requestAnimationFrame(() => statusRef.current?.focus())
      return
    }
    setStatus('sending')
    try {
      await submitQuote(values, AbortSignal.timeout(20000))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(quoteSummary(values))
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  if (status === 'sent') {
    const what =
      values.service === 'warehousing'
        ? `storing ${values.goods.trim()}`
        : `${values.service === 'forwarding' ? 'forwarding cargo from' : 'a full truck from'} ${values.pickup.trim()} to ${values.delivery.trim()}`
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="sign outline-none">
        <span className="flex size-12 items-center justify-center rounded-full bg-lamp text-night" aria-hidden="true">
          <Check className="size-7" strokeWidth={3} />
        </span>
        <h2 className="type-gantry mt-6 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)]">Request received</h2>
        <p className="mt-4 max-w-[46ch] text-lamp-2">
          Thanks, {values.name.trim().split(' ')[0]}. We have your request for {what} and will call you on{' '}
          <span className="font-semibold text-lamp tabular-nums">{values.phone.trim()}</span> to go over the details and your quotation.
        </p>
        <button
          type="button"
          className="btn btn-ghost-night mt-8"
          onClick={() => {
            setValues(emptyQuote)
            setTouched({})
            setErrors({})
            setStatus('idle')
          }}
        >
          Send another request
        </button>
      </div>
    )
  }

  const err = (k: keyof QuoteFields) => (touched[k] ? errors[k] : undefined)
  const service = values.service
  const input = (key: keyof QuoteFields, props: Record<string, unknown> = {}) => (
    <input name={key} id={`${uid}-${key}`} className="field" value={values[key]} onChange={set(key)} onBlur={blur(key)} autoComplete="off" {...props} />
  )

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-10" aria-describedby={`${uid}-req`}>
      <p id={`${uid}-req`} className="text-ink-2">
        Fields marked <span className="font-bold text-ink">required</span> are all we need to prepare a quote.
      </p>

      <fieldset className="grid gap-4" aria-describedby={err('service') ? `${uid}-service-error` : undefined}>
        <legend className="type-h3 mb-4">What do you need a quote for?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {services.map((s) => (
            <label key={s.id} className="service-option">
              <input type="radio" name="service" value={s.id} checked={service === s.id} onChange={() => choose(s.id)} className="sr-only" />
              <span className="service-card">
                <span className="service-tick" aria-hidden="true">
                  <Check className="size-3.5" strokeWidth={3.5} />
                </span>
                <span className="block font-bold [font-stretch:110%]">{s.short}</span>
                <span className="service-line mt-1 block text-[0.9375rem] leading-snug">{s.line}</span>
              </span>
            </label>
          ))}
        </div>
        {err('service') && (
          <p id={`${uid}-service-error`} className="field-error">
            <AlertCircle className="mt-[0.2rem] size-4 shrink-0" aria-hidden="true" />
            {err('service')}
          </p>
        )}
      </fieldset>

      {service && (
        <div key={service} className="quote-swap grid gap-10">
          <fieldset className="grid gap-5">
            <legend className="type-h3 mb-5">{service === 'warehousing' ? 'What needs storing' : service === 'forwarding' ? 'The shipment' : 'The load'}</legend>

            {service === 'warehousing' ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field uid={uid} id="goods" label="Type of goods" required error={err('goods')}>
                  {input('goods', { placeholder: 'e.g. packaged goods on pallets' })}
                </Field>
                <Field uid={uid} id="quantity" label="Approximate quantity or space needed" required error={err('quantity')} hint="e.g. 40 pallets, 500 cartons, or a rough area">
                  {input('quantity')}
                </Field>
                <Field uid={uid} id="duration" label="Expected storage period">
                  <select name="duration" id={`${uid}-duration`} className="field" value={values.duration} onChange={set('duration')}>
                    <option value="">Choose one</option>
                    {storageDurations.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
                <Field uid={uid} id="location" label="Required storage location" hint="If the goods need to be stored in a particular area">
                  {input('location', { placeholder: 'e.g. near Taloja MIDC' })}
                </Field>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field uid={uid} id="pickup" label={service === 'forwarding' ? 'Origin' : 'Pickup location'} required error={err('pickup')}>
                  {input('pickup', { placeholder: 'Area and city, e.g. Taloja MIDC' })}
                </Field>
                <Field uid={uid} id="delivery" label={service === 'forwarding' ? 'Destination' : 'Delivery location'} required error={err('delivery')}>
                  {input('delivery', { placeholder: 'Area and city, e.g. Chakan, Pune' })}
                </Field>
                <Field uid={uid} id="goods" label={service === 'forwarding' ? 'Cargo description' : 'Goods description'} required error={err('goods')}>
                  {input('goods', { placeholder: service === 'forwarding' ? 'e.g. machine parts in crates' : 'e.g. steel coils, cartons of FMCG goods' })}
                </Field>
                <Field
                  uid={uid}
                  id="quantity"
                  label={service === 'forwarding' ? 'Approximate shipment quantity' : 'Approximate weight'}
                  hint={service === 'forwarding' ? 'e.g. 18 tonnes, or 300 cartons' : 'e.g. 9 tonnes'}
                >
                  {input('quantity')}
                </Field>
                <Field uid={uid} id="date" label={service === 'forwarding' ? 'Preferred movement date' : 'Preferred transport date'} error={err('date')}>
                  <input type="date" name="date" id={`${uid}-date`} min={minDate} className="field" value={values.date} onChange={set('date')} onBlur={blur('date')} />
                </Field>
              </div>
            )}

            <Field
              uid={uid}
              id="details"
              label="Anything else we should know?"
              hint={
                service === 'warehousing'
                  ? 'How the goods are packed, when they will arrive, how often they move in and out'
                  : service === 'forwarding'
                    ? 'Stages of the journey, handover points, timing, paperwork you already have'
                    : 'Loading help, fragile items, delivery timing, dimensions'
              }
            >
              <textarea name="details" id={`${uid}-details`} className="field" rows={4} value={values.details} onChange={set('details')} />
            </Field>
          </fieldset>

          <fieldset className="grid gap-5">
            <legend className="type-h3 mb-5">Your details</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field uid={uid} id="name" label="Full name" required error={err('name')}>
                <input name="name" id={`${uid}-name`} className="field" value={values.name} onChange={set('name')} onBlur={blur('name')} autoComplete="name" />
              </Field>
              <Field uid={uid} id="company" label="Company name">
                <input name="company" id={`${uid}-company`} className="field" value={values.company} onChange={set('company')} autoComplete="organization" />
              </Field>
              <Field uid={uid} id="phone" label="Phone number" required error={err('phone')} hint="We'll call you back on this number">
                <input type="tel" inputMode="tel" name="phone" id={`${uid}-phone`} className="field tabular-nums" value={values.phone} onChange={set('phone')} onBlur={blur('phone')} autoComplete="tel" placeholder="98765 43210" />
              </Field>
              <Field uid={uid} id="email" label="Email" error={err('email')}>
                <input type="email" inputMode="email" name="email" id={`${uid}-email`} className="field" value={values.email} onChange={set('email')} onBlur={blur('email')} autoComplete="email" />
              </Field>
            </div>
          </fieldset>

          <RequestSummary values={values} />
        </div>
      )}

      {/* Bot trap: hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="btn btn-paint" aria-disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                Sending request…
              </>
            ) : (
              <>
                Send quote request
                <ArrowRight className="nudge size-5" aria-hidden="true" />
              </>
            )}
          </button>
          {whatsappNumber && service && (
            <a href={whatsappHref(whatsappNumber, quoteSummary(values))} target="_blank" rel="noopener" className="btn btn-ghost-day">
              <MessageCircle className="size-5" aria-hidden="true" />
              Send on WhatsApp instead
            </a>
          )}
        </div>
        <p className="text-[0.9375rem] text-ink-2">
          We use these details only to reply to this request. See the <a href="/privacy/" className="underline">privacy policy</a>.
        </p>

        <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="assertive">
          {status === 'error' && (
            <Notice tone="error" title="Your request didn't go through">
              That's on our side or your connection, not your details. Please try again in a moment
              {whatsappNumber ? ', or send it on WhatsApp' : ''}.
            </Notice>
          )}
          {status === 'offline' && (
            <Notice tone="info" title="Online requests aren't switched on yet">
              Your details are filled in correctly, but this form can't send them yet. Copy them and bring or send them to our office at{' '}
              {fullAddressLines[0]}, {fullAddressLines[1]}
              {whatsappNumber ? ', or send them on WhatsApp' : ''}.
              <span className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="btn btn-ghost-day" onClick={copySummary}>
                  {copied ? <Check className="size-5" aria-hidden="true" /> : <Copy className="size-5" aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy my request'}
                </button>
              </span>
            </Notice>
          )}
        </div>
      </div>
    </form>
  )
}

// The one request being described, held in a single line as the visitor types.
function RequestSummary({ values: v }: { values: QuoteFields }) {
  const extra = (s: string) => s && <span className="font-medium text-lamp-2"> · {s}</span>
  let line: ReactNode
  if (v.service === 'warehousing') {
    if (!v.goods.trim() && !v.quantity.trim()) return null
    line = (
      <>
        Storage<span className="font-medium text-lamp-2"> · {v.goods.trim() || 'Goods'}</span>
        {extra(v.quantity.trim())}
        {extra(v.duration)}
        {extra(v.location.trim())}
      </>
    )
  } else {
    if (!v.pickup.trim() && !v.delivery.trim() && !v.goods.trim()) return null
    const forwarding = v.service === 'forwarding'
    line = (
      <>
        {v.pickup.trim() || (forwarding ? 'Origin' : 'Pickup')}{' '}
        <ArrowRight className="inline size-[1.05em] -translate-y-px align-middle text-paint" aria-hidden="true" />
        <span className="sr-only">to</span> {v.delivery.trim() || (forwarding ? 'Destination' : 'Delivery')}
        {extra(v.goods.trim())}
        {extra(v.quantity.trim())}
      </>
    )
  }
  return (
    <div className="rounded-2xl bg-night-2 px-5 py-4 text-lamp" aria-live="polite">
      <p className="text-[0.9375rem] text-lamp-2">Your request · {serviceById(v.service)?.name}</p>
      <p className="mt-1 text-[1.125rem] leading-snug font-bold [font-stretch:110%]">{line}</p>
    </div>
  )
}

function Field({ uid, id, label, required, error, hint, children }: { uid: string; id: keyof QuoteFields; label: string; required?: boolean; error?: string; hint?: string; children: ReactNode }) {
  const inputId = `${uid}-${id}`
  const describedBy = [hint && `${inputId}-hint`, error && `${inputId}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className="field-wrap" data-field={id}>
      <label htmlFor={inputId} className="field-label">
        {label}
        {required ? <span className="ml-2 text-[0.8125rem] font-semibold text-ink-2">required</span> : <span className="ml-2 text-[0.8125rem] font-medium text-ink-2">optional</span>}
      </label>
      {hint && (
        <p id={`${inputId}-hint`} className="-mt-1 mb-2 text-[0.9375rem] text-ink-2">
          {hint}
        </p>
      )}
      <FieldControl invalid={Boolean(error)} describedBy={describedBy} required={required}>
        {children}
      </FieldControl>
      {error && (
        <p id={`${inputId}-error`} className="field-error">
          <AlertCircle className="mt-[0.2rem] size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

// Adds aria attributes to the single control passed in.
function FieldControl({ children, invalid, describedBy, required }: { children: ReactNode; invalid: boolean; describedBy?: string; required?: boolean }) {
  if (!isValidElement(children)) return <>{children}</>
  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
  })
}

function Notice({ tone, title, children }: { tone: 'error' | 'info'; title: string; children: ReactNode }) {
  return (
    <div className={`rounded-2xl px-5 py-5 ${tone === 'error' ? 'bg-[#fdecea] text-ink' : 'bg-dawn text-ink'}`} role={tone === 'error' ? 'alert' : 'status'}>
      <p className="flex items-center gap-2 font-bold">
        <AlertCircle className={`size-5 ${tone === 'error' ? 'text-alert' : 'text-ink'}`} aria-hidden="true" />
        {title}
      </p>
      <p className="mt-2 text-ink-2">{children}</p>
    </div>
  )
}
