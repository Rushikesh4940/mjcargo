import { ArrowRight } from 'lucide-react'
import { business } from '../config/business'
import { quoteHref } from '../data/services'
import { QuoteStarter } from './QuoteStarter'

// The close every page ends on: a short pitch beside the quote-starter sign,
// which starts a full truck load quote, with the other two services one tap away.
export function QuoteCta({
  id = 'cta',
  title = 'Got goods to move?',
  lede = "Start with where it's going and we'll book a whole truck for it. We'll ask for the rest on the next page and come back to you with a quote.",
}: {
  id?: string
  title?: string
  lede?: string
}) {
  return (
    <section className="bg-night py-24 text-lamp lg:py-36" aria-labelledby={`${id}-title`}>
      <div className="frame grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className="lg:col-span-5">
          <h2 id={`${id}-title`} className="type-gantry type-h2 max-w-[11ch]">
            {title}
          </h2>
          <p className="type-lede mt-6 max-w-[34ch] text-lamp-2">{lede}</p>
          <p className="mt-8 max-w-[38ch] text-lamp-2">Need storage or freight forwarding instead?</p>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <a href={quoteHref('warehousing')} className="link-go text-lamp">
              Warehousing quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href={quoteHref('forwarding')} className="link-go text-lamp">
              Freight forwarding quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </p>
          {business.hours && <p className="mt-6 text-lamp">Office hours: {business.hours}</p>}
        </div>
        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <QuoteStarter id={`${id}-quote`} heading="Start a quote" />
        </div>
      </div>
    </section>
  )
}
