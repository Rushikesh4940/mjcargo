import { ArrowRight } from 'lucide-react'

// The road sign that asks where the cargo is going: the start of a full truck
// load quote. A plain GET form to the contact page, which picks up `service`,
// `from` and `to` and fills the full request. The #quote fragment survives
// the GET, so the visitor lands on the form.
export function QuoteStarter({ id, heading = 'Where is your cargo going?' }: { id: string; heading?: string }) {
  return (
    <form action="/contact/#quote" method="get" className="sign" aria-labelledby={`${id}-title`}>
      <input type="hidden" name="service" value="ftl" />
      <h2 id={`${id}-title`} className="text-[1.375rem] leading-tight font-extrabold tracking-[-0.015em] [font-stretch:118%] sm:text-[1.625rem]">
        {heading}
      </h2>

      <div className="mt-6 grid grid-cols-[1.25rem_1fr] gap-x-4">
        <div className="relative row-span-2" aria-hidden="true">
          <span className="absolute top-[2.65rem] left-1/2 size-4 -translate-x-1/2 rounded-full bg-night-2 ring-4 ring-paint" />
          <span className="lane-y absolute top-[4.1rem] bottom-[3.2rem] left-1/2 -translate-x-1/2" />
          <span className="absolute bottom-[1.55rem] left-1/2 size-5 -translate-x-1/2 rounded-[5px] bg-paint" />
        </div>
        <div>
          <label htmlFor={`${id}-from`} className="field-label text-lamp">
            Pickup from
          </label>
          <input id={`${id}-from`} name="from" className="field" placeholder="e.g. Taloja MIDC, Navi Mumbai" autoComplete="address-level2" />
        </div>
        <div className="mt-4">
          <label htmlFor={`${id}-to`} className="field-label text-lamp">
            Deliver to
          </label>
          <input id={`${id}-to`} name="to" className="field" placeholder="e.g. Pune, Nashik, Surat" autoComplete="off" />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 pl-9 sm:flex-row sm:flex-wrap sm:items-center">
        <button type="submit" className="btn btn-paint shrink-0 whitespace-nowrap">
          Continue to quote
          <ArrowRight className="nudge size-5" aria-hidden="true" />
        </button>
        <p className="min-w-[12rem] flex-1 text-[0.9375rem] leading-snug text-lamp-2">Next: what you're sending and how much.</p>
      </div>
    </form>
  )
}
