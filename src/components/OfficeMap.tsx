import { useState } from 'react'
import { ExternalLink, Map } from 'lucide-react'
import { mapsQuery, mapsUrl } from '../config/business'

// Click-to-load map: no Google requests (or cookies) until the visitor asks.
// The pin comes from the address search, so treat it as approximate until the
// owner confirms the exact location on Google Maps.
export function OfficeMap({ tone = 'day' }: { tone?: 'day' | 'night' }) {
  const [loaded, setLoaded] = useState(false)
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&output=embed`

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-sign)] ${tone === 'day' ? 'bg-dawn' : 'bg-dusk'}`}>
      {loaded ? (
        <iframe title="Map showing the M J Cargo Movers office in New Panvel" src={src} className="absolute inset-0 size-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 p-6">
          <OfficeSketch />
          <div className="relative flex flex-wrap gap-3">
            <button type="button" className={`btn ${tone === 'day' ? 'btn-ghost-day bg-paper' : 'btn-ghost-night bg-night'}`} onClick={() => setLoaded(true)}>
              <Map className="size-5" aria-hidden="true" />
              Show map here
            </button>
            <a href={mapsUrl} target="_blank" rel="noopener" className="link-go self-center text-ink">
              Open in Google Maps
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <p className="relative text-[0.875rem] text-ink-2">Loading the map shares your visit with Google.</p>
        </div>
      )}
    </div>
  )
}

// A placeholder face for the map: one road and a pin. Deliberately not a
// street plan, so it can't be mistaken for directions.
function OfficeSketch() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" className="fill-dawn" />
      <path d="M-20 190 L420 150" stroke="#a5b6cd" strokeWidth="34" />
      <path d="M-20 190 L420 150" stroke="#f3f4f1" strokeWidth="3" strokeDasharray="18 14" />
      <g transform="translate(232 88)">
        <path d="M0 -34c-12 0-21 9-21 21 0 16 21 35 21 35s21-19 21-35c0-12-9-21-21-21z" className="fill-night" />
        <circle cy="-13" r="7" className="fill-lamp" />
      </g>
    </svg>
  )
}
