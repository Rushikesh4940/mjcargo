import { ArrowLeft } from 'lucide-react'
import { QuoteStarter } from '../components/QuoteStarter'
import { Runway } from '../components/LightTrails'

export function NotFoundPage() {
  return (
    <section className="relative overflow-hidden bg-night text-lamp" aria-labelledby="page-title">
      <div className="frame relative grid gap-12 pt-[calc(var(--header-space)+3rem)] pb-4 lg:grid-cols-12 lg:gap-8 lg:pt-[calc(var(--header-space)+5rem)] lg:pb-6">
        <div className="lg:col-span-6">
          <h1 id="page-title" className="type-gantry type-display max-w-[9ch]">
            Wrong turn
          </h1>
          <p className="type-lede mt-6 max-w-[38ch] text-lamp-2 lg:mt-8">
            There's no page at this address. It may have moved, or the link may be mistyped.
          </p>
          <a href="/" className="btn btn-ghost-night mt-10">
            <ArrowLeft className="size-5" aria-hidden="true" />
            Back to the homepage
          </a>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <QuoteStarter id="lost-quote" heading="Or tell us where your cargo is going" />
        </div>
      </div>
      <Runway />
    </section>
  )
}
