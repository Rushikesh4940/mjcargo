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

// Opening: night ground, the headline and the quote sign on the left, and
// the goods truck drawn in light on the right, driving forward on its lane.
// The light trails run along the foot of the first screen on desktop. On
// phones the truck sits between the copy and the quote sign.
function Hero() {
  return (
    <section className="relative overflow-hidden bg-night text-lamp lg:flex lg:min-h-[clamp(44rem,100svh,60rem)] lg:flex-col" aria-labelledby="hero-title">
      <div className="frame relative grid gap-10 pt-[calc(var(--header-space)+2.5rem)] pb-[calc(var(--radius-sheet)+3.5rem)] lg:flex-1 lg:grid-cols-12 lg:content-center lg:gap-x-8 lg:gap-y-10 lg:pt-[calc(var(--header-space)+2rem)] lg:pb-6">
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
          <h1 id="hero-title" className="type-gantry type-display max-w-[11ch] lg:text-[clamp(3.5rem,calc(11.25vw_-_4.5rem),6rem)]">
            Moving your cargo forward
          </h1>
          <p className="type-lede mt-6 max-w-[40ch] text-lamp-2 lg:mt-8">
            <strong className="font-semibold text-lamp">M J Cargo Movers</strong> moves goods by road from New Panvel, Navi Mumbai, in our own trucks.
            Full-truck and part-load freight for businesses, priced per consignment.
          </p>
        </div>
        <TruckArt className="-mx-1 w-[calc(100%+0.5rem)] sm:mx-auto sm:w-[86%] lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:w-[calc(100%+1.25rem)] lg:max-w-none lg:self-center" />
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <QuoteStarter id="hero-quote" />
        </div>
      </div>
      <Runway className="hidden h-32 lg:block xl:h-40" />
    </section>
  )
}

function Services() {
  return (
    <section className="bg-day py-24 lg:py-40" aria-labelledby="services-title">
      <div className="frame">
        <div data-reveal className="grid gap-6 lg:grid-cols-12">
          <h2 id="services-title" className="type-gantry type-h2 lg:col-span-6">
            Two ways to send a load
          </h2>
          <p className="type-lede text-ink-2 lg:col-span-5 lg:col-start-8 lg:self-end">
            Whether your goods fill a whole truck or only part of one, they travel on our trucks, and one local office keeps you informed.
          </p>
        </div>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <article data-reveal>
              <Photo
                name="truck-front"
                alt="A decorated Tata truck with a tarpaulin-covered load parked on a roadside"
                sizes="(min-width: 1024px) 55vw, 100vw"
                position="50% 55%"
                className="rounded-[var(--radius-photo)] aspect-[3/2] w-full object-cover"
              />
              <h3 className="type-h3 mt-6">Full truckload</h3>
              <p className="mt-3 max-w-[52ch] text-ink-2">
                A truck dedicated to your consignment, from your pickup point straight to the delivery point. Suited to bulk stock, large orders and
                goods that shouldn't share space.
              </p>
              <a href="/contact/?load=Full%20truck#quote" className="link-go mt-5 text-ink">
                Get a full-truck quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </article>
            <p data-reveal className="mt-16 lg:mt-24">
              <a href="/services/#booking" className="btn btn-ghost-day">
                How booking works
                <ArrowRight className="nudge size-5" aria-hidden="true" />
              </a>
            </p>
          </div>

          <article data-reveal className="lg:col-span-5 lg:pt-40">
            <Photo
              name="road-truck"
              alt="A small goods truck moving along a city road"
              sizes="(min-width: 1024px) 40vw, 100vw"
              position="40% 60%"
              className="rounded-[var(--radius-photo)] aspect-[4/5] w-full object-cover sm:aspect-[3/2] lg:aspect-[4/5]"
            />
            <h3 className="type-h3 mt-6">Part load</h3>
            <p className="mt-3 max-w-[48ch] text-ink-2">
              For consignments that don't need a whole vehicle. Your goods travel with other loads going the same way, so you pay for the space you use.
            </p>
            <a href="/contact/?load=Part%20load#quote" className="link-go mt-5 text-ink">
              Get a part-load quote
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
            From your enquiry to the road
          </h2>
          <p className="type-lede text-lamp-2 lg:col-span-4 lg:col-start-9 lg:self-end">Five steps, the same people throughout.</p>
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
      t: 'Our own trucks',
      d: 'Your goods travel on trucks we run ourselves, and you deal with the same local office from the first enquiry to delivery.',
    },
    {
      t: 'The price before the booking',
      d: 'You receive a quotation for your specific load and route, and nothing is booked until you agree to it.',
    },
    {
      t: 'Straight answers',
      d: "If a load or route isn't something we can carry well, we'll say so at the start rather than after you've committed.",
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
          <figure className="mt-10 max-w-[26rem]">
            <Photo
              name="own-trucks"
              alt={photoAlts['own-trucks']}
              sizes="(min-width: 1024px) 26rem, 100vw"
              position="50% 58%"
              className="rounded-[var(--radius-photo)] aspect-[4/5] w-full object-cover"
            />
          </figure>
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
