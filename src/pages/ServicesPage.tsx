import type { ReactNode } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Photo } from '../components/Photo'
import { QuoteStarter } from '../components/QuoteStarter'
import { RoadProcess } from '../components/RoadProcess'
import { photoAlts } from '../data/photo-credits'

export function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Road freight, booked from New Panvel"
        lede={
          <p>
            Full-truck and part-load road freight for businesses in and around Panvel and Navi Mumbai, in our own trucks. Tell us the load and where
            it's going: we quote, schedule a truck, and keep you posted.
          </p>
        }
      >
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-3 lg:mt-12">
          {[
            { href: '#full-truck', label: 'Full truckload' },
            { href: '#part-load', label: 'Part load' },
            { href: '#booking', label: 'How booking works' },
          ].map((l) => (
            <a key={l.href} href={l.href} className="btn btn-ghost-night !min-h-11 !px-4 !text-[0.96875rem]">
              {l.label}
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </PageHeader>

      <Service
        id="full-truck"
        title="Full truckload"
        ground="bg-day"
        photo={
          <Photo
            name="truck-front"
            alt={photoAlts['truck-front']}
            sizes="(min-width: 1024px) 50vw, 100vw"
            position="50% 55%"
            className="rounded-[var(--radius-photo)] aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
          />
        }
        intro="A truck dedicated to your consignment, loaded at your pickup point and driven to the delivery point without sharing space with anyone else's goods."
        suits={['Bulk stock and large orders', 'Goods that shouldn’t travel alongside other loads', 'Consignments that need to go straight from pickup to delivery']}
        note="Tell us roughly how much there is. It decides what size of vehicle the load needs, and that is the biggest part of the price."
        cta={{ href: '/contact/?load=Full%20truck#quote', label: 'Get a full-truck quote' }}
      />

      <Service
        id="part-load"
        title="Part load"
        ground="bg-paper"
        flip
        photo={
          <Photo
            name="road-truck"
            alt={photoAlts['road-truck']}
            sizes="(min-width: 1024px) 50vw, 100vw"
            position="58% 60%"
            className="rounded-[var(--radius-photo)] aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
          />
        }
        intro="For consignments that don't need a whole vehicle. Your goods travel with other loads heading the same way, so you pay for the space you use."
        suits={['Smaller consignments', 'Regular dispatches that never fill a truck', 'Senders who can be flexible on the pickup day']}
        note="Part loads move when one of our trucks has space going your way. If your date is fixed, say so when you enquire and we'll tell you whether a part load can meet it."
        cta={{ href: '/contact/?load=Part%20load#quote', label: 'Get a part-load quote' }}
      />

      <section id="booking" className="bg-night pt-24 text-lamp lg:pt-40" aria-labelledby="booking-title">
        <div className="frame">
          <div data-reveal className="grid gap-6 pb-14 lg:grid-cols-12 lg:pb-20">
            <h2 id="booking-title" className="type-gantry type-h2 lg:col-span-7">
              How booking works
            </h2>
            <p className="type-lede text-lamp-2 lg:col-span-4 lg:col-start-9 lg:self-end">
              From your enquiry to our truck at your door, you deal with one office throughout.
            </p>
          </div>
        </div>
        <RoadProcess />
      </section>

      <Checklist />
    </>
  )
}

function Service({
  id,
  title,
  ground,
  flip,
  photo,
  intro,
  suits,
  note,
  cta,
}: {
  id: string
  title: string
  ground: string
  flip?: boolean
  photo: ReactNode
  intro: string
  suits: string[]
  note: string
  cta: { href: string; label: string }
}) {
  return (
    <section id={id} className={`${ground} py-24 lg:py-36`} aria-labelledby={`${id}-title`}>
      <div className="frame grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
          {photo}
        </div>
        <div data-reveal className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
          <h2 id={`${id}-title`} className="type-gantry type-h2">
            {title}
          </h2>
          <p className="type-lede mt-6 text-ink-2">{intro}</p>
          <h3 className="mt-10 font-bold [font-stretch:112%]">Suited to</h3>
          <ul className="mt-3 grid gap-2">
            {suits.map((s) => (
              <li key={s} className="flex gap-3 text-ink-2">
                <ArrowRight className="mt-[0.35rem] size-4 shrink-0 text-ink" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[46ch] rounded-2xl bg-dawn/60 px-5 py-4 text-ink">{note}</p>
          <a href={cta.href} className="btn btn-paint mt-8">
            {cta.label}
            <ArrowRight className="nudge size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

// Mirrors the quote form, so senders can gather the details before they start.
function Checklist() {
  const items = [
    { k: 'Pickup point', v: 'Area and city, e.g. Taloja MIDC, Navi Mumbai' },
    { k: 'Delivery point', v: 'Where the goods are going' },
    { k: 'Type of goods', v: 'Cartons, machinery, raw material in bags or drums, furniture, or something else' },
    { k: 'Weight or quantity', v: 'A rough figure is enough: 2 tonnes, or 40 cartons' },
    { k: 'Pickup date', v: 'If you have one in mind' },
  ]
  return (
    <section className="flow-on bg-paper py-24 lg:py-40" aria-labelledby="ready-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className="lg:col-span-6">
          <h2 id="ready-title" className="type-gantry type-h2 max-w-[13ch]">
            What we need to quote
          </h2>
          <dl className="mt-10 grid gap-6">
            {items.map((i) => (
              <div key={i.k} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-bold [font-stretch:110%]">{i.k}</dt>
                <dd className="text-ink-2">{i.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 max-w-[50ch] text-ink-2">
            <strong className="font-bold text-ink">Something else to move?</strong> If your goods need packing, storage or a particular kind of vehicle,
            ask when you enquire. We'll tell you straight whether it's something we can handle.
          </p>
        </div>
        <div data-reveal className="lg:col-span-5 lg:col-start-8 lg:self-start">
          <QuoteStarter id="services-quote" />
        </div>
      </div>
    </section>
  )
}
