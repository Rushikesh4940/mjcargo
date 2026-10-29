import type { ReactNode } from 'react'
import { Runway } from './LightTrails'

// Opening band for inner pages: the night ground and a gantry headline. The
// page steps from night to day below it.
export function PageHeader({ title, lede, children }: { title: string; lede: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-night text-lamp" aria-labelledby="page-title">
      <div className="frame relative pt-[calc(var(--header-space)+3rem)] pb-4 lg:pt-[calc(var(--header-space)+5rem)] lg:pb-6">
        <h1 id="page-title" className="type-gantry max-w-[16ch] text-[clamp(2.5rem,1.5rem+4.4vw,5.25rem)]">
          {title}
        </h1>
        <div className="type-lede mt-6 max-w-[52ch] text-lamp-2 lg:mt-8">{lede}</div>
        {children}
      </div>
      <Runway />
    </section>
  )
}
