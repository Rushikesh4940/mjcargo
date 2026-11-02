// Turns the supplied logo (assets-src/brand/logo.png, navy and green on white)
// into the site's brand files: transparent logos for dark grounds, the MJ
// monogram icons, and the Open Graph card. Run with `npm run brand` whenever
// the logo changes.
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const src = path.join(root, 'assets-src/brand/logo.png')
const out = path.join(root, 'public/brand')
await mkdir(out, { recursive: true })

const NAVY = [40, 68, 116] // #284474, the logo's box
const GREEN = [87, 158, 6] // #579e06, the logo's truck and lettering

// Regions of the 2000×2000 source, in source pixels.
const BOX = { left: 852, top: 896, right: 1598, bottom: 1218 } // navy box interior, kept as drawn
const FULL = { left: 236, top: 880, width: 1684, height: 485 } // whole lockup with tagline
const TRUCK = { left: 735, top: 880, width: 1185, height: 485 } // truck only
const MONO = { left: 870, top: 925, width: 255, height: 290 } // white MJ on navy

// Lift the logo off its white background. Outside the navy box every pixel is
// white blended with either the green or the navy, so project it onto the
// nearer of those two lines: the projection is its alpha, the ink its colour.
const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const rgba = Buffer.alloc(info.width * info.height * 4)
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 3
    const o = (y * info.width + x) * 4
    const c = [data[i], data[i + 1], data[i + 2]]
    const inBox = x >= BOX.left && x <= BOX.right && y >= BOX.top && y <= BOX.bottom
    if (inBox) {
      rgba.set([...c, 255], o)
      continue
    }
    let best = null
    for (const ink of [GREEN, NAVY]) {
      const v = ink.map((k) => k - 255)
      const d = c.map((k) => k - 255)
      const vv = v[0] ** 2 + v[1] ** 2 + v[2] ** 2
      const t = (d[0] * v[0] + d[1] * v[1] + d[2] * v[2]) / vv
      const res = Math.hypot(d[0] - t * v[0], d[1] - t * v[1], d[2] - t * v[2])
      if (!best || res < best.res) best = { ink, t, res }
    }
    const a = best.t < 0.08 ? 0 : Math.min(1, best.t)
    rgba.set([...best.ink, Math.round(a * 255)], o)
  }
}
const matted = () => sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })

for (const [name, region, width] of [
  ['logo', FULL, 1400],
  ['logo-truck', TRUCK, 640],
]) {
  const buf = await matted().extract(region).resize({ width }).png().toBuffer()
  await sharp(buf).png({ compressionLevel: 9, palette: false }).toFile(path.join(out, `${name}.png`))
  await sharp(buf).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(out, `${name}.webp`))
}

// The navy box alone, white MJ and green "CARGO MOVERS" as drawn: the livery
// painted on the side of the hero truck's cargo body. Inset a few pixels so
// none of the white around the box comes with it.
const PANEL = { left: 856, top: 900, width: 738, height: 314 }
await sharp(src).removeAlpha().extract(PANEL).resize({ width: 600 }).webp({ quality: 88 }).toFile(path.join(out, 'logo-panel.webp'))

// Monogram icons: the white MJ from the box, centred on a navy square. The
// crop catches the first letter of "CARGO" in its lower right, painted out.
const mono = await sharp(src)
  .removeAlpha()
  .extract(MONO)
  .composite([
    {
      input: { create: { width: 40, height: 130, channels: 3, background: { r: NAVY[0], g: NAVY[1], b: NAVY[2] } } },
      left: MONO.width - 40,
      top: MONO.height - 130,
    },
  ])
  .toBuffer()
const side = 400
const square = await sharp({ create: { width: side, height: side, channels: 3, background: { r: NAVY[0], g: NAVY[1], b: NAVY[2] } } })
  .composite([{ input: await sharp(mono).resize({ height: 300 }).toBuffer(), gravity: 'centre' }])
  .png()
  .toBuffer()
await sharp(square).resize(512, 512).png().toFile(path.join(root, 'public/icon-512.png'))
await sharp(square).resize(180, 180).png().toFile(path.join(root, 'public/apple-touch-icon.png'))
await sharp(square).resize(48, 48).png().toFile(path.join(root, 'public/favicon-48.png'))

// Open Graph card: the logo on white beside a photograph of our own trucks.
const photo = await sharp(path.join(root, 'assets-src/own-trucks.jpg'))
  .resize(560, 630, { fit: 'cover', position: 'centre' })
  .modulate({ saturation: 0.88 })
  .toBuffer()
const lockup = await matted().extract(FULL).resize({ width: 560 }).png().toBuffer()
const caption = Buffer.from(`<svg width="640" height="120" xmlns="http://www.w3.org/2000/svg">
  <text x="40" y="44" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="#14284a">Full truck load · Warehousing</text>
  <text x="40" y="84" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="700" fill="#14284a">Freight forwarding · New Panvel</text>
</svg>`)
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([
    { input: lockup, left: 40, top: 170 },
    { input: caption, left: 0, top: 360 },
    { input: photo, left: 640, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'))

console.log('brand: logo, logo-truck, logo-panel, icons and og-image.jpg written')
