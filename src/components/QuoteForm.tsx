import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from 'react'
import { AlertCircle, ArrowRight, Check, Copy, LoaderCircle, MessageCircle } from 'lucide-react'
import { whatsappHref, whatsappNumber, fullAddressLines } from '../config/business'
import { cargoTypes, emptyQuote, loadTypes, quoteEndpoint, quoteSummary, submitQuote, validateQuote, type QuoteErrors, type QuoteFields } from '../lib/quote'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'offline'

// Visual order, so a failed submit focuses the first problem on screen.
const order: (keyof QuoteFields)[] = ['pickup', 'delivery', 'cargoType', 'date', 'name', 'phone', 'email']

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

  // Prefill from the quote starter (?from=&to=) or a service link (?load=).
  useEffect(() => {
    const p = new URLSearchParams(location.search)
    const load = p.get('load') ?? ''
    setValues((v) => ({
      ...v,
      pickup: p.get('from')?.slice(0, 120) ?? v.pickup,
      delivery: p.get('to')?.slice(0, 120) ?? v.delivery,
      load: loadTypes.includes(load) ? load : v.load,
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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const found = validateQuote(values)
    setErrors(found)
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
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="sign outline-none">
        <span className="flex size-12 items-center justify-center rounded-full bg-lamp text-night" aria-hidden="true">
          <Check className="size-7" strokeWidth={3} />
        </span>
        <h2 className="type-gantry mt-6 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)]">Request received</h2>
        <p className="mt-4 max-w-[46ch] text-lamp-2">
          Thanks, {values.name.trim().split(' ')[0]}. We have your request for {values.pickup.trim()} to {values.delivery.trim()} and will call you on{' '}
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
  const summaryReady = values.pickup.trim() || values.delivery.trim() || values.cargoType

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-10" aria-describedby={`${uid}-req`}>
      <p id={`${uid}-req`} className="text-ink-2">
        Fields marked <span className="font-bold text-ink">required</span> are all we need to prepare a quote.
      </p>

      <fieldset className="grid gap-5">
        <legend className="type-h3 mb-5">The load</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field uid={uid} id="pickup" label="Pickup location" required error={err('pickup')}>
            <input name="pickup" id={`${uid}-pickup`} className="field" value={values.pickup} onChange={set('pickup')} onBlur={blur('pickup')} placeholder="Area and city, e.g. Taloja MIDC" autoComplete="off" />
          </Field>
          <Field uid={uid} id="delivery" label="Delivery location" required error={err('delivery')}>
            <input name="delivery" id={`${uid}-delivery`} className="field" value={values.delivery} onChange={set('delivery')} onBlur={blur('delivery')} placeholder="Area and city, e.g. Chakan, Pune" autoComplete="off" />
          </Field>
          <Field uid={uid} id="cargoType" label="Type of goods" required error={err('cargoType')}>
            <select name="cargoType" id={`${uid}-cargoType`} className="field" value={values.cargoType} onChange={set('cargoType')} onBlur={blur('cargoType')}>
              <option value="">Choose one</option>
              {cargoTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field uid={uid} id="load" label="Full truck or part load?">
            <select name="load" id={`${uid}-load`} className="field" value={values.load} onChange={set('load')}>
              <option value="">Choose one</option>
              {loadTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field uid={uid} id="weight" label="Approximate weight or quantity" hint="e.g. 2 tonnes, or 40 cartons">
            <input name="weight" id={`${uid}-weight`} className="field" value={values.weight} onChange={set('weight')} autoComplete="off" />
          </Field>
          <Field uid={uid} id="date" label="Preferred pickup date" error={err('date')}>
            <input type="date" name="date" id={`${uid}-date`} min={minDate} className="field" value={values.date} onChange={set('date')} onBlur={blur('date')} />
          </Field>
        </div>
        <Field uid={uid} id="details" label="Anything else we should know?" hint="Loading help, fragile items, delivery timing, dimensions">
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

      {/* Bot trap: hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {summaryReady && (
        <div className="rounded-2xl bg-night-2 px-5 py-4 text-lamp" aria-live="polite">
          <p className="text-[0.9375rem] text-lamp-2">Your consignment</p>
          <p className="mt-1 text-[1.125rem] leading-snug font-bold [font-stretch:110%]">
            {values.pickup.trim() || 'Pickup'} <span className="text-paint">→</span> {values.delivery.trim() || 'Delivery'}
            {values.cargoType && <span className="font-medium text-lamp-2"> · {values.cargoType.replace(' (describe below)', '')}</span>}
            {values.load && <span className="font-medium text-lamp-2"> · {values.load}</span>}
            {values.weight.trim() && <span className="font-medium text-lamp-2"> · {values.weight.trim()}</span>}
          </p>
        </div>
      )}

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
          {whatsappNumber && (
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
