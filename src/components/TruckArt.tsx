import { useEffect, useRef, type CSSProperties } from 'react'

// The hero illustration: a goods truck in the company's colours, side on and
// facing left, toward the headline. A navy cab under the headboard every
// Indian truck carries, a white box body with the logo's navy panel painted
// on its side, three wheels on steel discs. It is an illustration in the
// brand's livery, not a portrait of a particular truck in the fleet.
//
// Motion, in two acts. Arrival: the truck drives in from beyond the right
// edge of the screen and brakes into its place beside the headline, its
// wheels rolling exactly the distance it covers, the body pitching nose-down
// as the brakes bite and settling after. Cruise: the camera has caught up
// and travels with it, so the truck holds its place while the road streams
// backward beneath it, front to rear, at one cruise speed, the wheels turn at that speed and the
// body rides its suspension. The road picks up speed as the truck slows, so
// the hand-over has no seam.
//
// The script below measures how far the truck has to travel at this width
// and hands that distance (and the wheel turn that covers it) to the
// keyframes in index.css. When the arrival can't play cleanly (a background
// tab, the hero off screen, the script late) the truck simply cruises. Off
// screen it pauses; under reduced motion it is parked and still.

const W = 860
const H = 420
const GROUND = 336
const R = 38
const AXLE = GROUND - R
// The far edge of the road, behind the wheels, so they stand on the asphalt.
const FAR = GROUND - 18
const WHEELS = [186, 610, 698]
// The frontmost point of the drawing (the mirror), which must start off screen.
const FRONT = 56
// The truck's own waiting animation reveals it, parked, after this long.
const WAIT_MS = 1900
// Cruise speed in drawing units a second. The road's pattern repeats every
// 120 units, so it streams one period a second (truck-lane in index.css),
// and a wheel turns once in 2πR / CRUISE = 1.99s (truck-spin).
const CRUISE = 120

// Place a layer by its box in the 860×420 drawing.
const box = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  height: `${(h / H) * 100}%`,
})

const stop = (color: string, opacity = 1) => ({ stopColor: color, stopOpacity: opacity })

export function TruckArt({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = ref.current
    if (!stage || stage.dataset.state) return
    const rig = stage.querySelector<HTMLElement>('.truck-rig')
    const waited = rig?.getAnimations?.().find((a) => (a as CSSAnimation).animationName === 'truck-wait')
    const rect = stage.getBoundingClientRect()
    const vw = document.documentElement.clientWidth
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stage.dataset.state = 'parked'
      return
    }
    const io = new IntersectionObserver(([entry]) => stage.toggleAttribute('data-paused', !entry.isIntersecting))
    io.observe(stage)
    const skipArrival =
      document.visibilityState === 'hidden' ||
      rect.bottom < 0 ||
      rect.top > window.innerHeight ||
      Number(waited?.currentTime ?? 0) > WAIT_MS
    if (skipArrival) {
      stage.dataset.state = 'cruise'
      return () => io.disconnect()
    }
    const scale = rect.width / W
    const travel = Math.ceil(vw - (rect.left + FRONT * scale) + 8)
    const spin = ((travel / scale / R) * 180) / Math.PI
    const dur = Math.round(Math.min(2600, Math.max(1700, 1100 + travel * 1.75)))
    stage.style.setProperty('--truck-travel', `${travel}px`)
    stage.style.setProperty('--truck-spin', `${spin.toFixed(1)}deg`)
    stage.style.setProperty('--truck-dur', `${dur}ms`)
    // The road accelerates from still to cruise speed over the arrival, so it
    // covers half the distance it would at full speed.
    stage.style.setProperty('--truck-lane-in', `${((CRUISE * dur) / 2000).toFixed(1)}px`)
    stage.dataset.state = 'drive'
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`truck-stage relative aspect-[860/420] ${className}`}
      role="img"
      aria-label="Illustration of a goods truck in M J Cargo Movers colours pulling up on the road"
    >
      {/* The road. It runs off the right edge of the screen, where the truck
          comes from, and fades out toward the copy on the left. */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="tk-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={stop('var(--color-night-2)')} />
            <stop offset="1" style={stop('var(--color-night)', 0)} />
          </linearGradient>
          <linearGradient id="tk-road-fade" gradientUnits="userSpaceOnUse" x1="-40" x2="150">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <mask id="tk-road-mask" maskUnits="userSpaceOnUse" x="-40" y={FAR - 4} width="2400" height={H - FAR + 8}>
            <rect x="-40" y={FAR - 4} width="2400" height={H - FAR + 8} fill="url(#tk-road-fade)" />
          </mask>
          {/* Shared by the wheels: radial, so they light the same at any turn */}
          <radialGradient id="tk-tyre">
            <stop offset="0.7" stopColor="#141c2b" />
            <stop offset="1" stopColor="#070b14" />
          </radialGradient>
          <radialGradient id="tk-disc">
            <stop offset="0" stopColor="#d5dce6" />
            <stop offset="1" stopColor="#8a97ab" />
          </radialGradient>
        </defs>
        <g mask="url(#tk-road-mask)">
          <rect x="-40" y={FAR} width="2400" height={H - FAR} fill="url(#tk-road)" />
          <path d={`M-40 ${FAR} H2360`} className="stroke-lamp-2" strokeWidth="1.5" opacity="0.4" />
          <g className="stroke-lamp-2" strokeWidth="1" opacity="0.12">
            {[-300, -120, 60, 240, 420, 600, 780, 960, 1140, 1320].map((x) => (
              <path key={x} d={`M${x * 0.45 + 236} ${FAR} L${x} ${H}`} />
            ))}
          </g>
        </g>
        {/* The route, as on the quote sign: from the round origin to the square
            destination. Its paint and the grain of the asphalt stream backward
            (rightward, front to rear) between the markers, which stay put. */}
        <clipPath id="tk-lane-clip">
          <rect x="44" y={GROUND + 4} width="778" height={H - GROUND} />
        </clipPath>
        <g clipPath="url(#tk-lane-clip)">
          <g className="truck-lane-in">
            <g className="truck-lane">
              <path className="stroke-paint" strokeWidth="5" strokeDasharray="36 24" d={`M-400 ${GROUND + 40} H1200`} />
              <g className="stroke-lamp-2" strokeWidth="2" strokeLinecap="round" opacity="0.16">
                <path strokeDasharray="10 110" d={`M-400 ${GROUND + 16} H1200`} />
                <path strokeDasharray="18 102" strokeDashoffset="-64" d={`M-400 ${GROUND + 66} H1200`} />
              </g>
            </g>
          </g>
        </g>
        <circle className="fill-night stroke-paint" strokeWidth="5" cx="836" cy={GROUND + 40} r="11" />
        <rect className="fill-paint" x="10" y={GROUND + 29} width="24" height="22" rx="5" />
      </svg>

      {/* The rig: everything that drives in together */}
      <div className="truck-rig absolute inset-0" aria-hidden="true">
        {/* On the road under it: the shadow it casts and the headlamp's pool */}
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
          <defs>
            <radialGradient id="tk-shadow">
              <stop offset="0" stopColor="#03070f" stopOpacity="0.75" />
              <stop offset="1" stopColor="#03070f" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tk-pool">
              <stop offset="0" stopColor="#fff6dc" stopOpacity="0.2" />
              <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="440" cy={GROUND + 2} rx="400" ry="14" fill="url(#tk-shadow)" />
          {WHEELS.map((cx) => (
            <ellipse key={cx} cx={cx} cy={GROUND + 1} rx="50" ry="6" fill="url(#tk-shadow)" />
          ))}
          <ellipse cx="10" cy={GROUND + 8} rx="120" ry="16" fill="url(#tk-pool)" />
        </svg>

        {/* Cab and body ride the suspension over the wheels */}
        <div className="truck-body absolute inset-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
            <defs>
              <linearGradient id="tk-box" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#eef1f5" />
                <stop offset="0.6" stopColor="#d5dce6" />
                <stop offset="1" stopColor="#a9b6c8" />
              </linearGradient>
              <linearGradient id="tk-dusk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3a5b92" />
                <stop offset="0.45" style={stop('var(--color-dusk)')} />
                <stop offset="1" stopColor="#192e54" />
              </linearGradient>
              <linearGradient id="tk-crown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#24406f" />
                <stop offset="1" stopColor="#14284c" />
              </linearGradient>
              <linearGradient id="tk-glass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2b4673" />
                <stop offset="1" stopColor="#0a1530" />
              </linearGradient>
              <linearGradient id="tk-steel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d3dae4" />
                <stop offset="1" stopColor="#66748a" />
              </linearGradient>
              <linearGradient id="tk-dim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0.35" stopColor="#0c1a31" stopOpacity="0" />
                <stop offset="1" stopColor="#0c1a31" stopOpacity="0.28" />
              </linearGradient>
              <linearGradient id="tk-beam" gradientUnits="userSpaceOnUse" x1="72" x2="-70">
                <stop offset="0" stopColor="#fff6dc" stopOpacity="0.26" />
                <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
              </linearGradient>
              <filter id="tk-soft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <radialGradient id="tk-lamp">
                <stop offset="0" stopColor="#fff6dc" stopOpacity="0.7" />
                <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="tk-tail">
                <stop offset="0" stopColor="#ff5a4a" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ff5a4a" stopOpacity="0" />
              </radialGradient>
              <clipPath id="tk-panel">
                <rect x="394" y="106" width="300" height="128" rx="5" />
              </clipPath>
            </defs>

            {/* Headlamp beam, low and ahead of the cab */}
            <path d="M72 230 L-70 268 L-60 346 L72 248 Z" fill="url(#tk-beam)" filter="url(#tk-soft)" />

            {/* Chassis, tank, battery box and side guard under the body */}
            <rect x="96" y="254" width="716" height="16" fill="#0b1322" />
            <rect x="300" y="262" width="92" height="30" rx="13" fill="url(#tk-steel)" />
            <path d="M322 263 V291 M370 263 V291" stroke="#3d4a60" strokeWidth="2" />
            <rect x="404" y="266" width="48" height="24" rx="3" fill="#1a2740" />
            <rect x="462" y="277" width="100" height="5" rx="2" fill="#4d5d77" />
            <path d="M566 256 H744 V266 H566 Z" fill="#0b1322" />
            <rect x="742" y="258" width="9" height="62" rx="2" fill="#0b1322" />
            <rect x="236" y="276" width="7" height="44" rx="2" fill="#0b1322" />

            {/* Box body: roof, side, ribs, rails and corner posts */}
            <path d="M276 84 L282 77 H818 L812 84 Z" fill="#f6f7f9" />
            <rect x="276" y="84" width="536" height="170" fill="url(#tk-box)" />
            <g stroke="#0c1a31" strokeWidth="2" opacity="0.07">
              {Array.from({ length: 20 }, (_, i) => 300 + i * 26).map((x) => (
                <path key={x} d={`M${x} 94 V244`} />
              ))}
            </g>
            <rect x="276" y="84" width="536" height="9" fill="#c4cdd9" />
            <rect x="276" y="93" width="536" height="3" fill="#fff" opacity="0.55" />
            <rect x="276" y="242" width="536" height="14" fill="#6c7a91" />
            <rect x="276" y="84" width="9" height="172" fill="#bcc6d3" />
            <rect x="800" y="84" width="12" height="172" fill="#8f9cb0" />
            <path d="M806 96 V240" stroke="#4d5b72" strokeWidth="1.5" />

            {/* The logo's navy box, as painted livery; a plain navy panel if the image fails */}
            <rect x="394" y="106" width="300" height="128" rx="5" style={{ fill: 'var(--color-dusk)' }} />
            <image href="/brand/logo-panel.webp" x="394" y="106" width="300" height="128" preserveAspectRatio="none" clipPath="url(#tk-panel)" />

            {/* Night falls off down the side, over the livery too */}
            <rect x="276" y="84" width="536" height="172" fill="url(#tk-dim)" />

            {/* Tail lamp */}
            <circle cx="806" cy="264" r="16" fill="url(#tk-tail)" />
            <rect x="800" y="259" width="12" height="10" rx="2" fill="#e0483a" />

            {/* Headboard over the cab, with its painted lights */}
            <path d="M114 124 L100 86 Q98 77 107 77 H252 Q260 77 260 85 V124 Z" fill="url(#tk-crown)" />
            <path d="M104 79 H255" className="stroke-lamp-2" strokeWidth="2" opacity="0.45" strokeLinecap="round" />
            <path
              className="fill-paint"
              d="M150 92 L157 99 L150 106 L143 99 Z M182 92 L189 99 L182 106 L175 99 Z M214 92 L221 99 L214 106 L207 99 Z"
            />

            {/* Cab, cut for the front wheel */}
            <path d="M264 124 V284 H234 A50 50 0 0 0 138 284 H86 Q74 284 74 272 V204 L88 142 Q92 124 110 124 Z" fill="url(#tk-dusk)" />
            <path d="M74 272 V204 L88 142 Q92 124 110 124 L114 131 Q100 132 96 146 L83 206 V276 Z" fill="#0c1a31" opacity="0.35" />
            <rect x="110" y="124" width="154" height="4" fill="#fff" opacity="0.16" />
            <rect x="248" y="124" width="16" height="160" fill="#0c1a31" opacity="0.18" />
            <path d="M120 140 H208 Q214 140 214 146 V192 Q214 196 210 196 H104 L114 146 Q116 140 120 140 Z" fill="url(#tk-glass)" />
            <path d="M150 140 H176 L146 196 H120 Z" fill="#fff" opacity="0.07" />
            <path d="M222 132 V266" stroke="#0c1a31" strokeWidth="1.5" opacity="0.5" />
            <rect x="198" y="206" width="16" height="4" rx="2" className="fill-lamp-2" opacity="0.7" />

            {/* Mirror on its arm, bumper, headlamp */}
            <path d="M92 152 L68 146" stroke="#0e1a2e" strokeWidth="3" strokeLinecap="round" />
            <rect x="56" y="128" width="11" height="42" rx="4" fill="#0e1a2e" />
            <path d="M58.5 133 V165" className="stroke-lamp-2" strokeWidth="1.5" opacity="0.45" strokeLinecap="round" />
            <rect x="66" y="262" width="34" height="26" rx="5" fill="#0e1a2e" />
            <path d="M70 264 H96" className="stroke-lamp-2" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
            <circle cx="73" cy="238" r="30" fill="url(#tk-lamp)" />
            <rect x="68" y="230" width="11" height="16" rx="4" fill="#fff7e0" />
          </svg>
        </div>

        {/* Wheels: the outer layer rolls the arrival's distance, the inner one cruises */}
        {WHEELS.map((cx) => (
          <div key={cx} className="truck-wheel-in absolute" style={box(cx - 44, AXLE - 44, 88, 88)}>
            <svg viewBox="-44 -44 88 88" className="truck-wheel size-full overflow-visible">
              <circle r={R} fill="url(#tk-tyre)" />
              <circle r={R - 5} fill="none" stroke="#1d2737" strokeWidth="2.5" />
              <circle r="25" fill="url(#tk-disc)" />
              <circle r="20.5" fill="#7d8aa0" />
              <g fill="#070b14">
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <ellipse key={a} cx="14" rx="2.8" ry="3.8" transform={`rotate(${a})`} />
                ))}
              </g>
              <circle r="8.5" fill="#c3ccd8" />
              <g fill="#5a677d">
                {[30, 90, 150, 210, 270, 330].map((a) => (
                  <circle key={a} cx="5.6" r="1.3" transform={`rotate(${a})`} />
                ))}
              </g>
              <circle r="2.6" fill="#5a677d" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
