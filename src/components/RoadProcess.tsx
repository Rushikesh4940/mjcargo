import type { CSSProperties } from 'react'

// The process as a stretch of road travelled from night to day: each stop sits
// on a lighter ground than the last, so the colour itself says how far along
// the enquiry is. No tracking system is implied; updates come from people.
const stops = [
  {
    title: 'Tell us about the load',
    text: 'Pickup point, delivery point, what the goods are and roughly how much. The quote form, a phone call or a visit to the office all work.',
    ground: 'bg-night text-lamp',
    prev: 'var(--color-night)',
    sub: 'text-lamp-2',
  },
  {
    title: 'We go over the details',
    text: 'We check what we need to know to price it properly: full truck or part load, timing, and anything about loading or the goods themselves.',
    ground: 'bg-dusk text-lamp',
    prev: 'var(--color-night)',
    sub: 'text-lamp-2',
  },
  {
    title: 'You get a quotation',
    text: 'A price for your specific consignment and route, before anything is booked.',
    ground: 'bg-predawn text-lamp',
    prev: 'var(--color-dusk)',
    sub: 'text-[#dbe3ee]',
  },
  {
    title: 'Confirm, and we schedule a truck',
    text: 'Once you agree, we put one of our trucks on your load and agree the pickup with you.',
    ground: 'bg-dawn text-ink',
    prev: 'var(--color-predawn)',
    sub: 'text-ink-2',
  },
  {
    title: 'Stay in touch until delivery',
    text: 'For updates, call or speak to us directly. You deal with the same local office from start to finish.',
    ground: 'bg-paper text-ink',
    prev: 'var(--color-dawn)',
    sub: 'text-ink-2',
  },
]

// Full-bleed band: on desktop the gutters take the first and last grounds, so
// night runs off the left edge and daylight runs off the right into the
// section that follows.
export function RoadProcess() {
  return (
    <div className="road-wrap">
      <div className="frame !px-0 lg:!px-8 xl:!px-12">
        <ol className="road-band grid lg:grid-cols-5" aria-label="How a quote request becomes a booked load">
          {stops.map((s, i) => (
            <li key={s.title} style={{ '--i': i, '--prev': s.prev } as CSSProperties} className={`road-stop relative flex gap-5 px-5 pt-8 pb-10 lg:block lg:bg-transparent lg:px-6 lg:pt-0 lg:pb-24 ${s.ground}`}>
              {/* The lane: vertical on phones, horizontal across the stops on desktop. */}
              <div className="relative w-5 shrink-0 lg:h-16 lg:w-auto" aria-hidden="true">
                <span className={`lane-y absolute top-0 left-1/2 h-full -translate-x-1/2 lg:hidden ${i === stops.length - 1 ? 'h-6!' : ''}`} />
                <span className={`lane-x absolute top-1/2 hidden -translate-y-1/2 lg:block ${i === 0 ? 'left-0' : '-left-6'} ${i === stops.length - 1 ? 'right-[calc(100%-0.75rem)]' : '-right-6'}`} />
                <span
                  className={`road-marker absolute top-1 left-1/2 -translate-x-1/2 lg:top-1/2 lg:left-0 lg:translate-x-0 lg:-translate-y-1/2 ${
                    i === stops.length - 1 ? 'size-6 rounded-[5px] bg-paint' : 'size-5 rounded-full bg-paint'
                  }`}
                />
              </div>
              <div className="lg:pt-2">
                <h3 className="type-h3">{s.title}</h3>
                <p className={`mt-3 max-w-[34ch] ${s.sub}`}>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
