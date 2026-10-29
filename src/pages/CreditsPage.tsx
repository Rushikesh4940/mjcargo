import { ExternalLink } from 'lucide-react'
import { business } from '../config/business'
import { PageHeader } from '../components/PageHeader'
import { Photo } from '../components/Photo'
import { photoAlts, photoCredits, type CreditedPhoto } from '../data/photo-credits'

const order: CreditedPhoto[] = ['truck-front', 'road-truck', 'expressway']

export function CreditsPage() {
  return (
    <>
      <PageHeader
        title="Image credits"
        lede={
          <p>
            The photograph of our two trucks is our own. The other photographs on this site were taken by the photographers below, not by{' '}
            {business.name}, and they don't show our vehicles.
          </p>
        }
      />

      <section className="bg-paper py-20 lg:py-28" aria-labelledby="photos-title">
        <div className="frame">
          <h2 id="photos-title" className="type-gantry type-h2">
            Photographs
          </h2>
          <p className="mt-5 max-w-[62ch] text-ink-2">
            Each photo has been resized, cropped and colour-adjusted for this site. The adapted versions of the Creative Commons photos are shared under the
            same licence as the original.
          </p>

          <ul className="mt-14 grid gap-14 lg:mt-20">
            {order.map((name) => {
              const c = photoCredits[name]
              return (
                <li key={name} className="grid gap-6 sm:grid-cols-12 sm:gap-8">
                  <div className="sm:col-span-5 lg:col-span-4">
                    <Photo name={name} alt={photoAlts[name]} sizes="(min-width: 640px) 34vw, 100vw" className="rounded-[var(--radius-photo)] aspect-[3/2] w-full object-cover" />
                  </div>
                  <div className="sm:col-span-7 lg:col-span-7 lg:col-start-6">
                    <h3 className="type-h3">{c.title}</h3>
                    <dl className="mt-4 grid gap-x-6 gap-y-2 text-ink-2 sm:grid-cols-[8rem_1fr]">
                      <dt className="font-semibold text-ink">Photographer</dt>
                      <dd>{c.author}</dd>
                      <dt className="font-semibold text-ink">Licence</dt>
                      <dd>
                        <a href={c.licenceUrl} className="link-go text-ink" target="_blank" rel="noopener license">
                          {c.licence}
                          <ExternalLink className="size-4" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </dd>
                      <dt className="font-semibold text-ink">Source</dt>
                      <dd>
                        <a href={c.sourceUrl} className="link-go text-ink" target="_blank" rel="noopener">
                          {c.source}
                          <ExternalLink className="size-4" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </dd>
                      <dt className="font-semibold text-ink">Used on</dt>
                      <dd>{c.usedOn}</dd>
                    </dl>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-day py-20 lg:py-28" aria-labelledby="type-title">
        <div className="frame">
          <div className="prose-road">
            <h2 id="type-title">Type and icons</h2>
            <p>
              Text is set in <strong>Archivo</strong> by Omnibus-Type, used under the{' '}
              <a href="https://openfontlicense.org/" target="_blank" rel="noopener license">
                SIL Open Font License
              </a>
              . Icons are from{' '}
              <a href="https://lucide.dev/" target="_blank" rel="noopener">
                Lucide
              </a>
              , used under the ISC licence.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
