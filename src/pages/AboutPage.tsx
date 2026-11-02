import { MapPin } from 'lucide-react'
import { business, fullAddressLines, mapsUrl } from '../config/business'
import { OfficeMap } from '../components/OfficeMap'
import { PageHeader } from '../components/PageHeader'
import { Photo } from '../components/Photo'
import { QuoteCta } from '../components/QuoteCta'
import { photoAlts } from '../data/photo-credits'

export function AboutPage() {
  return (
    <>
      <PageHeader
        title="Our own trucks, from New Panvel"
        lede={
          <p>
            {business.name} runs full truck load transport in its own trucks, with warehousing and freight forwarding, for businesses from an office in Khanda Colony, New Panvel
            {business.foundingYear ? `, and has done since ${business.foundingYear}` : ''}. You talk to the same people from the first enquiry to delivery.
          </p>
        }
      />
      <Role />
      <Visit />
      <Commitments />
      <QuoteCta id="about-cta" title="Tell us about your load" />
    </>
  )
}

function Role() {
  return (
    <section className="bg-day py-24 lg:py-40" aria-labelledby="role-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className="lg:col-span-5">
          <h2 id="role-title" className="type-gantry type-h2 max-w-[12ch]">
            Your load, on our trucks
          </h2>
          <div className="mt-8 grid max-w-[48ch] gap-5 text-ink-2">
            <p className="type-lede text-ink">
              Sending goods by road takes a truck of the right size, going the right way, at the right time. We run our own trucks to do exactly that.
            </p>
            <p>
              You describe the consignment. We work out which of our trucks suits it and give you a price, and once you agree, we schedule the pickup
              with you.
            </p>
            <p>
              When your goods need to wait, we offer warehousing; when a consignment needs its whole journey arranged, we handle the freight forwarding.
            </p>
            <p>For you, that means one local company to deal with, from the quote to the delivery.</p>
          </div>
        </div>
        <figure data-reveal className="mx-auto w-full max-w-[30rem] lg:col-span-5 lg:col-start-8 lg:mx-0 lg:max-w-none">
          <Photo
            name="own-trucks"
            alt={photoAlts['own-trucks']}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 30rem, 100vw"
            position="50% 58%"
            className="rounded-[var(--radius-photo)] aspect-[4/5] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section className="bg-night py-24 text-lamp lg:py-36" aria-labelledby="visit-title">
      <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className="lg:col-span-6">
          <h2 id="visit-title" className="type-gantry type-h2 max-w-[12ch]">
            Come and talk it through
          </h2>
          <p className="type-lede mt-6 max-w-[40ch] text-lamp-2">
            Bring the details of your consignment to the office and we'll go over it with you in person.
          </p>
          <p className="mt-10 text-[1.375rem] leading-snug font-bold [font-stretch:115%] sm:text-[1.625rem]">
            {business.address.building}
            <span className="block text-lamp-2">{business.address.landmark}</span>
          </p>
          <address className="mt-5 not-italic leading-relaxed text-lamp-2">
            {fullAddressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          {business.hours && <p className="mt-5 text-lamp">Office hours: {business.hours}</p>}
          <a href={mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost-night mt-8">
            <MapPin className="size-5" aria-hidden="true" />
            Directions
            <span className="sr-only">(opens Google Maps in a new tab)</span>
          </a>
        </div>
        <div data-reveal className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <OfficeMap tone="night" />
        </div>
      </div>
    </section>
  )
}

function Commitments() {
  const items = [
    { t: 'The price comes first', d: 'You get a quotation for your specific load and route, and nothing is booked until you agree to it.' },
    {
      t: 'Updates come from people',
      d: "We don't run an online tracking system. When you want news of a consignment, you call or speak to us and we find out.",
    },
    { t: "We say so if we can't", d: "If a load or route isn't one we can carry well, you hear that at the start, not after you've committed." },
    {
      t: 'Your details stay with us',
      d: 'What you send through the quote form is used to answer your request and nothing else.',
      link: { href: '/privacy/', label: 'Privacy policy' },
    },
  ]
  return (
    <section className="bg-paper py-24 lg:py-40" aria-labelledby="commit-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-8">
        <h2 id="commit-title" data-reveal className="type-gantry type-h2 max-w-[10ch] lg:col-span-4">
          How we work
        </h2>
        <dl data-reveal className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {items.map((i) => (
            <div key={i.t}>
              <dt className="type-h3">{i.t}</dt>
              <dd className="mt-3 text-ink-2">
                {i.d}
                {i.link && (
                  <>
                    {' '}
                    <a href={i.link.href} className="font-semibold text-ink underline">
                      {i.link.label}
                    </a>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
