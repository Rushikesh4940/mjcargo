import { useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { business, telHref } from '../config/business'
import type { RouteId } from '../routes'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ routeId, children }: { routeId: RouteId; children: ReactNode }) {
  useReveal()
  return (
    <>
      <a href="#main" className="btn btn-paint fixed top-3 left-3 z-50 -translate-y-24 focus:translate-y-0">
        Skip to content
      </a>
      <Header routeId={routeId} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      {routeId !== 'contact' && <MobileQuoteBar />}
    </>
  )
}

// Thumb-reach actions on phones. Hidden on the contact page, where the form is
// the page, and slid away while a quote-starter sign is on screen so two
// primary actions never stack.
function MobileQuoteBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const starters = document.querySelectorAll('form.sign')
    if (!('IntersectionObserver' in window) || starters.length === 0) {
      setShow(true)
      return
    }
    const onScreen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target)
        else onScreen.delete(e.target)
      }
      setShow(onScreen.size === 0)
    })
    starters.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return (
    <div
      data-show={show || undefined}
      className="quote-bar fixed inset-x-0 bottom-0 z-30 bg-night px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
    >
      <div className="flex gap-2">
        <a href="/contact/#quote" className="btn btn-paint flex-1">
          Get a quote
          <ArrowRight className="size-5" aria-hidden="true" />
        </a>
        {business.phone && (
          <a href={telHref(business.phone)} className="btn btn-ghost-night" aria-label="Call M J Cargo Movers">
            <Phone className="size-5" aria-hidden="true" />
            Call
          </a>
        )}
      </div>
    </div>
  )
}

function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window) || targets.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    // Anything already on screen shows immediately, without animating.
    const vh = window.innerHeight
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add('is-in')
      else io.observe(el)
    })
    document.documentElement.classList.add('reveal-ready')
    return () => io.disconnect()
  }, [])
}
