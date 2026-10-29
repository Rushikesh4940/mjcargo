import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { business, telHref, formatPhone } from '../config/business'
import type { RouteId } from '../routes'
import { Logo } from './Wordmark'

const nav: { href: string; label: string; id?: RouteId }[] = [
  { href: '/', label: 'Home', id: 'home' },
  { href: '/about/', label: 'About us', id: 'about' },
  { href: '/services/', label: 'Services', id: 'services' },
  { href: '/#why-us', label: 'Why choose us' },
  { href: '/contact/', label: 'Contact', id: 'contact' },
]

export function Header({ routeId }: { routeId: RouteId }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('a')?.focus()
    document.documentElement.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && panel) {
        const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[]
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    // A floating bar over the page rather than a full-width strip: the header
    // takes no space of its own, and the first section pads for it.
    <header className="pointer-events-none sticky top-0 z-40 h-0 text-lamp">
      <div className="frame pt-2 lg:pt-3">
        <div className="pointer-events-auto flex h-[5.25rem] items-center justify-between gap-4 rounded-[1.75rem] bg-night-2 pr-2.5 pl-3 shadow-[0_18px_40px_-18px_rgb(4_10_22/0.75)] ring-1 ring-lamp/10 sm:pr-3 sm:pl-4 lg:h-[5.75rem]">
          <a href="/" className="-m-1 shrink-0 rounded-2xl p-1" aria-label="M J Cargo Movers, home">
            <Logo alt="" className="h-[4.25rem] w-auto lg:h-[4.75rem]" />
          </a>
  
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const current = item.id === routeId
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={current ? 'page' : undefined}
                      className={`block rounded-full px-3.5 py-2 text-[0.96875rem] font-semibold transition-colors duration-150 ${
                        current ? 'bg-lamp text-night' : 'text-lamp-2 hover:text-lamp'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
  
          <div className="flex items-center gap-2">
            {business.phone && (
              <a href={telHref(business.phone)} className="btn btn-ghost-night hidden !min-h-11 !px-4 xl:inline-flex">
                <Phone className="size-4" aria-hidden="true" />
                {formatPhone(business.phone)}
              </a>
            )}
            <a href="/contact/#quote" className="btn btn-paint hidden !min-h-11 !px-4 sm:inline-flex">
              Get a quote
              <ArrowRight className="nudge size-4" aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="btn btn-ghost-night !min-h-11 !px-3 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              <span>{open ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="mobile-menu pointer-events-auto fixed inset-x-0 top-[var(--header-space)] bottom-0 overflow-y-auto overscroll-contain bg-night lg:hidden"
      >
        <nav aria-label="Main" className="frame flex min-h-full flex-col pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.id === routeId ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="-mx-3 flex items-center justify-between rounded-2xl px-3 py-4 text-[1.75rem] font-extrabold tracking-[-0.02em] [font-stretch:118%] aria-[current=page]:bg-lamp aria-[current=page]:text-night"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <a href="/contact/#quote" onClick={() => setOpen(false)} className="btn btn-paint w-full">
              Get a quote
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            {business.phone && (
              <a href={telHref(business.phone)} className="btn btn-ghost-night w-full">
                <Phone className="size-5" aria-hidden="true" />
                Call {formatPhone(business.phone)}
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
