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
      <Strengths />
      <Visit />
      <PurposeVision />
      <Values />
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

// What the company can stand behind: only facts the owner has confirmed
// (fleet, GPS, routes, warehouse size and start date, 2026-11-02).
function Strengths() {
  const items = [
    { t: `${business.fleetSize} trucks of our own`, d: 'A fleet of our own trucks, so the truck that carries your goods is one of ours.' },
    { t: 'GPS on our trucks', d: 'Call us at any point in the journey and we can tell you where your goods are.' },
    { t: 'Nhava Sheva to all of India', d: 'Most of our loads start from Nhava Sheva and go to destinations across the country.' },
    { t: `${business.warehouseSqFt} sq ft of warehousing`, d: 'Space to store your goods between consignments, ahead of a delivery or while you free up room of your own.' },
    { t: 'On the road since 2010', d: 'We started on 1 June 2010 and have been moving goods by road ever since.' },
    { t: 'The whole truck is yours', d: 'Every full truck load gets a truck to itself, so your goods never share space with anyone else’s.' },
  ]
  return (
    <section className="bg-paper py-24 lg:py-40" aria-labelledby="strengths-title">
      <div className="frame">
        <div data-reveal className="grid gap-6 lg:grid-cols-12">
          <h2 id="strengths-title" className="type-gantry type-h2 lg:col-span-6">
            Our strengths
          </h2>
          <p className="type-lede text-ink-2 lg:col-span-5 lg:col-start-8 lg:self-end">What you get from a company that owns its trucks and has run them since 2010.</p>
        </div>
        <dl data-reveal className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-8">
          {items.map((i) => (
            <div key={i.t}>
              <dt className="type-h3">{i.t}</dt>
              <dd className="mt-3 max-w-[38ch] text-ink-2">{i.d}</dd>
            </div>
          ))}
        </dl>
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

// Why the company exists and where it is heading, in the owner's words to
// approve: plain statements, no growth figures or promises.
function PurposeVision() {
  const statements = [
    {
      id: 'purpose',
      title: 'Our purpose',
      body: 'To move, store and arrange our customers’ goods with care, so businesses around Panvel and Navi Mumbai can rely on one local company for their freight.',
    },
    {
      id: 'vision',
      title: 'Our vision',
      body: 'To be the company businesses in and around Panvel call first when their goods need to move, be stored or be arranged.',
    },
  ]
  return (
    <section className="bg-day py-24 lg:py-40" aria-label="Our purpose and vision">
      <div className="frame grid gap-16 lg:grid-cols-2 lg:gap-x-8">
        {statements.map((s) => (
          <div key={s.id} data-reveal>
            <h2 id={`${s.id}-title`} className="type-h3 text-ink-2">
              {s.title}
            </h2>
            <p className="mt-5 max-w-[24ch] text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] leading-tight font-bold text-ink [font-stretch:112%]">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// The logo's own line, "Transporting cargo with care", leads; the rest is how
// the company already works, stated as values.
function Values() {
  const items = [
    { t: 'Care with every load', d: '“Transporting cargo with care” is on our logo. Your goods are handled as if they were our own.' },
    { t: 'The price comes first', d: 'You get a quotation for your specific load and route, and nothing is booked until you agree to it.' },
    {
      t: 'Straight answers',
      d: "If a load or route isn’t one we can carry well, you hear that at the start. When you want news of a consignment, call us and we’ll tell you where it is.",
    },
    {
      t: 'Your details stay with us',
      d: 'What you send through the quote form is used to answer your request and nothing else.',
      link: { href: '/privacy/', label: 'Privacy policy' },
    },
  ]
  return (
    <section className="bg-paper py-24 lg:py-40" aria-labelledby="values-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-8">
        <h2 id="values-title" data-reveal className="type-gantry type-h2 max-w-[10ch] lg:col-span-4">
          Our values
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
