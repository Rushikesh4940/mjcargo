// The M J Cargo Movers logo, lifted off its white background by
// scripts/brand-assets.mjs so it sits on the night grounds. `truck` is the
// truck alone, for the header; `full` adds the "Transporting cargo with care"
// tagline.
const files = {
  truck: { name: 'logo-truck', width: 640, height: 262 },
  full: { name: 'logo', width: 1400, height: 403 },
}

export function Logo({ variant = 'truck', className = '', alt = 'M J Cargo Movers' }: { variant?: keyof typeof files; className?: string; alt?: string }) {
  const f = files[variant]
  return (
    <picture>
      <source type="image/webp" srcSet={`/brand/${f.name}.webp`} />
      <img src={`/brand/${f.name}.png`} alt={alt} width={f.width} height={f.height} decoding="async" className={className} />
    </picture>
  )
}
