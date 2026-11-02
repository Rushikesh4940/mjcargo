import type { ReactNode } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Photo } from '../components/Photo'
import { QuoteStarter } from '../components/QuoteStarter'
import { RoadProcess } from '../components/RoadProcess'
import { photoAlts } from '../data/photo-credits'
import { quoteHref, services } from '../data/services'

export function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Full truck load, warehousing and freight forwarding"
        lede={
          <p>
            Three services for businesses in and around Panvel and Navi Mumbai: a dedicated truck of our own for your whole load, storage for your
            goods, and freight forwarding to arrange how your cargo moves.
          </p>
        }
      >
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-3 lg:mt-12">
          {[...services.map((s) => ({ href: `#${s.anchor}`, label: s.short })), { href: '#booking', label: 'How a truck load is booked' }].map((l) => (
            <a key={l.href} href={l.href} className="btn btn-ghost-night !min-h-11 !px-4 !text-[0.96875rem]">
              {l.label}
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </PageHeader>

      <Service
        id="full-truck"
        name="Full truck load transport"
        tagline="A whole truck, dedicated to your load."
        ground="bg-day"
        media={
          <Photo
            name="own-trucks"
            alt={photoAlts['own-trucks']}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 100vw"
            position="50% 58%"
            className="mx-auto aspect-[4/5] w-full max-w-[28rem] rounded-[var(--radius-photo)] object-cover lg:max-w-none"
          />
        }
        intro="You book the whole truck, so your goods are the only goods on board: loaded at your pickup point and driven straight to the delivery point."
        listTitle="Suited to"
        list={['Bulk stock and large orders', 'Goods that shouldn’t share space with anyone else’s', 'Consignments that need to go straight from pickup to delivery']}
        note="Tell us roughly how much there is. It decides what size of truck the load needs, and that is the biggest part of the price."
        cta={{ href: quoteHref('ftl'), label: 'Get a full truck load quote' }}
      />

      <Service
        id="warehousing"
        name="Warehousing"
        tagline="Secure storage solutions for your business."
        ground="bg-paper"
        flip
        media={
          <Photo
            name="warehouse"
            alt={photoAlts.warehouse}
            sizes="(min-width: 1024px) 40vw, 100vw"
            position="50% 55%"
            className="aspect-[4/3] w-full rounded-[var(--radius-photo)] object-cover"
          />
        }
        intro="When your goods need to wait, we can store them: between consignments, ahead of a delivery date, or while you free up space of your own."
        listTitle="Why use storage"
        list={[
          'Keep stock off your own premises until it is needed',
          'Hold goods between one consignment and the next',
          'Store and transport with the same company, so the next move is one phone call away',
        ]}
        note="Tell us what you need to store, roughly how much, and for how long. We'll confirm space, location and terms with you when you enquire."
        cta={{ href: quoteHref('warehousing'), label: 'Ask about storage space' }}
      />

      <Service
        id="freight-forwarding"
        name="Freight forwarding"
        tagline="Connecting cargo to its destination through reliable freight forwarding."
        ground="bg-day"
        media={
          <Photo
            name="freight-forwarding"
            alt={photoAlts['freight-forwarding']}
            sizes="(min-width: 1024px) 40vw, 100vw"
            position="40% 60%"
            className="aspect-[4/3] w-full rounded-[var(--radius-photo)] object-cover"
          />
        }
        intro="Some consignments need more than one truck, more than one leg or more than one handover. Freight forwarding means we arrange the whole movement for you and keep it on track from origin to destination."
        listTitle="What we arrange"
        list={[
          'How the cargo should move, and in what stages',
          'The transport for each stage of the journey',
          'Pickups, handovers and delivery timings',
          'One point of contact for updates throughout',
        ]}
        note="Tell us where the cargo starts, where it needs to go and what it is. We'll explain how we would arrange it, and price it, before anything is booked."
        cta={{ href: quoteHref('forwarding'), label: 'Get a freight forwarding quote' }}
      />

      <section id="booking" className="bg-night pt-24 text-lamp lg:pt-40" aria-labelledby="booking-title">
        <div className="frame">
          <div data-reveal className="grid gap-6 pb-14 lg:grid-cols-12 lg:pb-20">
            <h2 id="booking-title" className="type-gantry type-h2 lg:col-span-7">
              How a truck load is booked
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

// One service: its name as the heading with its promise under it, the
// picture beside, then who it suits, a note on what to tell us, and the quote.
function Service({
  id,
  name,
  tagline,
  ground,
  flip,
  media,
  intro,
  listTitle,
  list,
  note,
  cta,
}: {
  id: string
  name: string
  tagline: string
  ground: string
  flip?: boolean
  media: ReactNode
  intro: string
  listTitle: string
  list: string[]
  note: string
  cta: { href: string; label: string }
}) {
  return (
    <section id={id} className={`${ground} py-24 lg:py-36`} aria-labelledby={`${id}-title`}>
      <div className="frame grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
          {media}
        </div>
        <div data-reveal className={`lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
          <h2 id={`${id}-title`} className="type-gantry type-h2">
            {name}
          </h2>
          <p className="mt-4 text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] leading-tight font-bold text-ink-2 [font-stretch:112%]">{tagline}</p>
          <p className="type-lede mt-6 text-ink-2">{intro}</p>
          <h3 className="mt-10 font-bold [font-stretch:112%]">{listTitle}</h3>
          <ul className="mt-3 grid gap-2">
            {list.map((s) => (
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
  const groups = [
    { service: 'Full truck load', items: ['Pickup and delivery locations', 'What the goods are', 'Approximate weight', 'Preferred transport date, if you have one'] },
    { service: 'Warehousing', items: ['Type of goods', 'Roughly how much, or the space you need', 'How long you expect to store them', 'Where they need to be stored, if it matters'] },
    { service: 'Freight forwarding', items: ['Origin and destination', 'What the cargo is', 'Approximate shipment quantity', 'Preferred movement date, if you have one'] },
  ]
  return (
    <section className="flow-on bg-paper py-24 lg:py-40" aria-labelledby="ready-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className="lg:col-span-7">
          <h2 id="ready-title" className="type-gantry type-h2 max-w-[13ch]">
            What we need to quote
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {groups.map((g) => (
              <div key={g.service}>
                <h3 className="font-bold [font-stretch:112%]">{g.service}</h3>
                <ul className="mt-3 grid gap-2 text-ink-2">
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-[50ch] text-ink-2">
            <strong className="font-bold text-ink">Not sure which you need?</strong> Tell us about the goods and where they need to be, and we'll suggest
            the right service.
          </p>
        </div>
        <div data-reveal className="lg:col-span-4 lg:col-start-9 lg:self-start">
          <QuoteStarter id="services-quote" />
        </div>
      </div>
    </section>
  )
}
