import { MapPin } from 'lucide-react'
import { Logo } from './Wordmark'
import { services } from '../data/services'
import { business, fullAddressLines, mapsUrl, telHref, formatPhone, whatsappHref, whatsappNumber } from '../config/business'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-night-2 pb-28 text-lamp sm:pb-12">
      <div className="frame">
        <div className="pt-14 pb-12 sm:pt-20">
          <Logo variant="full" alt="M J Cargo Movers: transporting cargo with care" className="h-auto w-full max-w-[42rem]" />
        </div>

        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-lg font-bold [font-stretch:112%]">Office</h2>
            <address className="mt-3 not-italic leading-relaxed text-lamp-2">
              {fullAddressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a href={mapsUrl} target="_blank" rel="noopener" className="link-go mt-4 text-lamp">
              <MapPin className="size-4" aria-hidden="true" />
              Open in Google Maps
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {(business.phone || business.email) && (
              <ul className="mt-6 space-y-2">
                {business.phone && (
                  <li>
                    <a href={telHref(business.phone)} className="font-semibold underline-offset-4 hover:underline">
                      {formatPhone(business.phone)}
                    </a>
                  </li>
                )}
                {whatsappNumber && (
                  <li>
                    <a href={whatsappHref(whatsappNumber)} target="_blank" rel="noopener" className="font-semibold underline-offset-4 hover:underline">
                      WhatsApp us
                    </a>
                  </li>
                )}
                {business.email && (
                  <li>
                    <a href={`mailto:${business.email}`} className="font-semibold underline-offset-4 hover:underline">
                      {business.email}
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-lg font-bold [font-stretch:112%]">Pages</h2>
            <ul className="mt-3 space-y-2 text-lamp-2">
              <li><a className="hover:text-lamp hover:underline" href="/">Home</a></li>
              <li><a className="hover:text-lamp hover:underline" href="/about/">About us</a></li>
              <li><a className="hover:text-lamp hover:underline" href="/services/">Services</a></li>
              <li><a className="hover:text-lamp hover:underline" href="/#why-us">Why choose us</a></li>
              <li><a className="hover:text-lamp hover:underline" href="/contact/">Contact &amp; quote</a></li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-lg font-bold [font-stretch:112%]">Services</h2>
            <ul className="mt-3 space-y-2 text-lamp-2">
              {services.map((s) => (
                <li key={s.id}>
                  <a className="hover:text-lamp hover:underline" href={`/services/#${s.anchor}`}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-night px-6 py-4 sm:rounded-full text-[0.9375rem] text-lamp-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {business.name}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <a className="hover:text-lamp hover:underline" href="/privacy/">Privacy policy</a>
            <a className="hover:text-lamp hover:underline" href="/credits/">Image credits</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
