import { useEffect, useRef, type CSSProperties } from 'react'

// Long-exposure traffic on the night ground: streaks of headlight white and
// lane green running toward a vanishing point, like the expressway after
// dark. It lives in a runway strip of its own so it never crosses copy. One
// canvas, paused off screen and in background tabs, and a single still frame
// when the visitor prefers reduced motion.

interface Streak {
  lane: number
  x: number
  len: number
  speed: number
  green: boolean
  alpha: number
  width: number
}

const LAMP = '243, 244, 241'
const PAINT = '87, 158, 6'

export function LightTrails({ className = '', density = 1, style }: { className?: string; density?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let streaks: Streak[] = []
    let raf = 0
    let last = 0
    let onScreen = true

    const LANES = 9
    // Lanes fan out across the strip on the left and converge on a vanishing
    // point beyond the right edge, near the top: a road seen in perspective.
    const laneY = (lane: number, x: number) => {
      const y0 = h * (0.22 + (lane / (LANES - 1)) * 0.74)
      const vx = w * 1.45
      const vy = h * 0.12
      return y0 + (vy - y0) * (x / vx)
    }

    const make = (scatter: boolean): Streak => {
      const len = 80 + Math.random() * (w * 0.28)
      return {
        lane: Math.floor(Math.random() * LANES),
        x: scatter ? Math.random() * (w + len) : -Math.random() * w * 0.6,
        len,
        speed: 90 + Math.random() * 260,
        green: Math.random() < 0.3,
        alpha: 0.6 + Math.random() * 0.3,
        width: 1.5 + Math.random() * 1.8,
      }
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w < 640 ? 12 : 24) * density)
      streaks = Array.from({ length: count }, () => make(true))
      draw()
    }

    const draw = () => {
      // A hidden runway (the home hero below 1024px) has no size to draw in.
      if (!w || !h) return
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'
      for (const s of streaks) {
        const x1 = s.x
        const x0 = s.x - s.len
        const y0 = laneY(s.lane, x0)
        const y1 = laneY(s.lane, x1)
        const g = ctx.createLinearGradient(x0, y0, x1, y1)
        const rgb = s.green ? PAINT : LAMP
        // Bloom first, a wide faint stroke, then the bright core over it.
        const bloom = ctx.createLinearGradient(x0, y0, x1, y1)
        bloom.addColorStop(0, `rgba(${rgb}, 0)`)
        bloom.addColorStop(1, `rgba(${rgb}, ${s.alpha * 0.24})`)
        ctx.strokeStyle = bloom
        ctx.lineWidth = s.width + 6
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.stroke()
        g.addColorStop(0, `rgba(${rgb}, 0)`)
        g.addColorStop(1, `rgba(${rgb}, ${s.alpha})`)
        ctx.strokeStyle = g
        ctx.lineWidth = s.width
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.stroke()
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i]
        s.x += s.speed * dt
        if (s.x - s.len > w + 40) streaks[i] = make(false)
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (still || raf || !onScreen || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    io.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} style={style} />
}

// The strip the trails run in: open night at the foot of a dark header, below
// the copy, where the next section's sheet rises over its lower edge.
export function Runway({ className = 'h-32 lg:h-44', mask = 'linear-gradient(to bottom, transparent, black 30%)' }: { className?: string; mask?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <LightTrails className="absolute inset-0 size-full" style={{ maskImage: mask }} />
    </div>
  )
}
