import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { business, formatPhone, fullAddressLines, mapsUrl, telHref, whatsappHref, whatsappNumber } from '../config/business'
import { OfficeMap } from '../components/OfficeMap'
import { PageHeader } from '../components/PageHeader'
import { QuoteForm } from '../components/QuoteForm'
import { quoteEndpoint } from '../lib/quote'

const nextSteps = quoteEndpoint
  ? [
      'We read your request and call you back on the number you give us.',
      'We go over anything we need to know to price the load.',
      'You get a quotation. Nothing is booked until you say yes.',
    ]
  : [
      'Fill in the form and copy your request when it asks.',
      'Bring it to the office, and we go over anything we need to price the load.',
      'You get a quotation. Nothing is booked until you say yes.',
    ]

export function ContactPage() {
  return (
    <>
      <PageHeader
        title="Request a quote"
        lede={
          <p>
            Tell us where the goods are going and what they are. We'll get back to you with a quotation, and nothing is booked until you agree to it.
          </p>
        }
      />

      <section id="quote" className="bg-day py-16 lg:py-24" aria-label="Quote request form">
        <div className="frame grid gap-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="reach-title">
            <div className="grid gap-12">
              <div>
                <h2 id="reach-title" className="type-h3">
                  Visit the office
                </h2>
                <address className="mt-4 not-italic leading-relaxed text-ink-2">
                  {fullAddressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                {business.hours && <p className="mt-4 text-ink">Office hours: {business.hours}</p>}
                <a href={mapsUrl} target="_blank" rel="noopener" className="link-go mt-5 text-ink">
                  <MapPin className="size-4" aria-hidden="true" />
                  Directions in Google Maps
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>

              {(business.phone || whatsappNumber || business.email) && (
                <div>
                  <h2 className="type-h3">Call or message</h2>
                  <div className="mt-5 grid gap-3">
                    {business.phone && (
                      <a href={telHref(business.phone)} className="btn btn-ghost-day justify-start">
                        <Phone className="size-5" aria-hidden="true" />
                        {formatPhone(business.phone)}
                      </a>
                    )}
                    {whatsappNumber && (
                      <a href={whatsappHref(whatsappNumber)} target="_blank" rel="noopener" className="btn btn-ghost-day justify-start">
                        <MessageCircle className="size-5" aria-hidden="true" />
                        WhatsApp us
                      </a>
                    )}
                    {business.email && (
                      <a href={`mailto:${business.email}`} className="link-go text-ink">
                        {business.email}
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h2 className="type-h3">What happens next</h2>
                <ol className="mt-5 grid gap-4">
                  {nextSteps.map((step, i) => (
                    <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-ink-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-night text-[0.9375rem] font-bold text-lamp tabular-nums" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="hidden lg:block">
                <OfficeMap tone="day" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
