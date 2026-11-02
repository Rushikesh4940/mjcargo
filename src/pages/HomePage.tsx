import { ArrowRight, MapPin } from 'lucide-react'
import { fullAddressLines, mapsUrl } from '../config/business'
import { Photo } from '../components/Photo'
import { QuoteStarter } from '../components/QuoteStarter'
import { RoadProcess } from '../components/RoadProcess'
import { OfficeMap } from '../components/OfficeMap'
import { QuoteCta } from '../components/QuoteCta'
import { Runway } from '../components/LightTrails'
import { TruckArt } from '../components/TruckArt'
import { photoAlts } from '../data/photo-credits'
import { quoteHref } from '../data/services'

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <WhyUs />
      <Office />
      <QuoteCta />
    </>
  )
}

// Opening: the promise on three lines across the top, the lede beside it,
// then the quote sign on the left and the truck pulling up on the right.
// The light trails run along the foot of the first screen on desktop. On
// phones: headline, lede, truck, quote sign.
function Hero() {
  return (
    <section className="relative overflow-hidden bg-night text-lamp lg:flex lg:min-h-[clamp(44rem,100svh,60rem)] lg:flex-col" aria-labelledby="hero-title">
      <div className="frame relative grid gap-8 pt-[calc(var(--header-space)+2.5rem)] pb-[calc(var(--radius-sheet)+3.5rem)] lg:flex-1 lg:grid-cols-12 lg:content-center lg:gap-x-8 lg:gap-y-12 lg:pt-[calc(var(--header-space)+2.5rem)] lg:pb-6">
        {/* The three services, one per line at every width: on phones the type is a
            little narrower and sized to the screen so the longest line fits. */}
        <h1
          id="hero-title"
          className="type-gantry text-[clamp(1.75rem,calc((100vw_-_2.25rem)/11.6),3.75rem)] [font-stretch:112%] lg:col-span-8 lg:row-start-1 lg:text-[clamp(2.75rem,4.3vw,4.25rem)] lg:[font-stretch:125%]"
        >
          <span className="block whitespace-nowrap">Full truck loads,</span>
          <span className="block whitespace-nowrap">warehousing and</span>
          <span className="block whitespace-nowrap">freight forwarding.</span>
        </h1>
        <p className="type-lede max-w-[40ch] text-lamp-2 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-end">
          Book a whole truck of ours, store your goods, or let us arrange the journey. <strong className="font-semibold whitespace-nowrap text-lamp">M J Cargo Movers</strong>
          : one company in New Panvel for all three.
        </p>
        <TruckArt className="-mx-1 w-[calc(100%+0.5rem)] sm:mx-auto sm:w-[86%] lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:mx-0 lg:w-[calc(100%+1.25rem)] lg:max-w-none lg:self-center" />
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <QuoteStarter id="hero-quote" />
        </div>
      </div>
      <Runway className="hidden h-32 lg:block xl:h-40" />
    </section>
  )
}

// The three services. Full truck load leads, with the company's own trucks;
// warehousing and freight forwarding follow as a pair, each with a stock photo.
function Services() {
  return (
    <section className="bg-day py-24 lg:py-40" aria-labelledby="services-title">
      <div className="frame">
        <div data-reveal className="grid gap-6 lg:grid-cols-12">
          <h2 id="services-title" className="type-gantry type-h2 lg:col-span-6">
            Three services, one company
          </h2>
          <p className="type-lede text-ink-2 lg:col-span-5 lg:col-start-8 lg:self-end">
            A whole truck for your load, storage for your goods, and someone to arrange the journey. Use one, or combine them.
          </p>
        </div>

        <article data-reveal className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="w-full max-w-[28rem] lg:col-span-5 lg:max-w-none">
            <Photo
              name="own-trucks"
              alt={photoAlts['own-trucks']}
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 100vw"
              position="50% 58%"
              className="aspect-[4/5] w-full rounded-[var(--radius-photo)] object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="type-gantry text-[clamp(1.75rem,1.3rem+1.9vw,2.75rem)]">Full truck load transport</h3>
            <p className="type-lede mt-5 max-w-[42ch] text-ink-2">
              Book the whole truck. Your goods are the only goods on board, loaded at your pickup point and driven straight to the delivery point.
            </p>
            <ul className="mt-8 grid gap-2">
              {['Bulk stock and large orders', 'Goods that shouldn’t share space with anyone else’s', 'Consignments that need to go straight from pickup to delivery'].map(
                (t) => (
                  <li key={t} className="flex gap-3 text-ink-2">
                    <ArrowRight className="mt-[0.35rem] size-4 shrink-0 text-ink" aria-hidden="true" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={quoteHref('ftl')} className="btn btn-paint">
                Get a full truck load quote
                <ArrowRight className="nudge size-5" aria-hidden="true" />
              </a>
              <a href="/services/#booking" className="link-go text-ink">
                How a truck load is booked
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>

        <div className="mt-24 grid gap-16 lg:mt-32 lg:grid-cols-2 lg:gap-x-8">
          <article data-reveal className="flex flex-col">
            <Photo
              name="warehouse"
              alt={photoAlts.warehouse}
              sizes="(min-width: 1024px) 44vw, 100vw"
              position="50% 55%"
              className="aspect-[4/3] w-full rounded-[var(--radius-photo)] object-cover"
            />
            <h3 className="type-h3 mt-6">Warehousing</h3>
            <p className="mt-3 max-w-[48ch] flex-1 text-ink-2">
              Storage for your goods when they need to wait: between consignments, ahead of a delivery, or while you free up space of your own.
            </p>
            <a href={quoteHref('warehousing')} className="link-go mt-5 self-start text-ink">
              Ask about storage
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </article>
          <article data-reveal className="flex flex-col">
            <Photo
              name="freight-forwarding"
              alt={photoAlts['freight-forwarding']}
              sizes="(min-width: 1024px) 44vw, 100vw"
              position="40% 60%"
              className="aspect-[4/3] w-full rounded-[var(--radius-photo)] object-cover"
            />
            <h3 className="type-h3 mt-6">Freight forwarding</h3>
            <p className="mt-3 max-w-[48ch] flex-1 text-ink-2">
              When a consignment needs more than one leg or more than one handover, we arrange how it moves and keep it on track from origin to
              destination.
            </p>
            <a href={quoteHref('forwarding')} className="link-go mt-5 self-start text-ink">
              Get a freight forwarding quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="bg-night pt-24 text-lamp lg:pt-40" aria-labelledby="process-title">
      <div className="frame">
        <div data-reveal className="grid gap-6 pb-14 lg:grid-cols-12 lg:pb-20">
          <h2 id="process-title" className="type-gantry type-h2 lg:col-span-7">
            How a truck load is booked
          </h2>
          <p className="type-lede text-lamp-2 lg:col-span-4 lg:col-start-9 lg:self-end">
            Five steps, the same people throughout. Storage and forwarding enquiries start the same way, with your details and a quotation.
          </p>
        </div>
      </div>
      <RoadProcess />
    </section>
  )
}

function WhyUs() {
  const points = [
    {
      t: 'A real office you can walk into',
      d: 'Shree Ganesh Plaza 1, behind Netrajyot Hospital in Khanda Colony. Come in and talk your consignment through in person.',
    },
    {
      t: 'A whole truck, our own',
      d: 'Every load we carry gets a truck of ours to itself, and you deal with the same local office from the first enquiry to delivery.',
    },
    {
      t: 'The price before the booking',
      d: 'You receive a quotation for your specific load and route, and nothing is booked until you agree to it.',
    },
    {
      t: 'Transport, storage and forwarding together',
      d: 'When your goods need to wait, or their journey needs arranging, warehousing and freight forwarding come from the same company.',
    },
  ]
  return (
    <section id="why-us" className="flow-on bg-paper py-24 lg:py-40" aria-labelledby="why-title">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className="lg:col-span-5">
          <h2 id="why-title" className="type-gantry type-h2 max-w-[12ch]">
            Why businesses choose us
          </h2>
          <p className="type-lede mt-6 max-w-[34ch] text-ink-2">
            Here is what working with a local transport company that runs its own trucks means in practice.
          </p>
        </div>
        <dl data-reveal className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
          {points.map((p) => (
            <div key={p.t}>
              <dt className="type-h3">{p.t}</dt>
              <dd className="mt-3 text-ink-2">{p.d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Office() {
  return (
    <section className="relative bg-night text-lamp" aria-labelledby="office-title">
      <Photo
        name="expressway"
        alt="The Mumbai–Pune Expressway curving towards a tunnel through green hills"
        sizes="100vw"
        position="50% 60%"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-night/35" aria-hidden="true" />
      <div className="frame relative grid gap-8 py-20 lg:grid-cols-12 lg:py-32">
        <div data-reveal className="sign !bg-night lg:col-span-6">
          <h2 id="office-title" className="type-gantry text-[clamp(1.875rem,1.3rem+2.4vw,3.25rem)]">
            Find us in New Panvel
          </h2>
          <address className="mt-5 not-italic leading-relaxed text-lamp-2">
            {fullAddressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-5 max-w-[46ch] text-lamp">
            A short drive from the start of the Mumbai–Pune Expressway. Destinations and routes are confirmed for each consignment when you enquire.
          </p>
          <a href={mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost-night mt-7">
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
