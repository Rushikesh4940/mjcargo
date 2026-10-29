// Turns the source photographs in assets-src/ into responsive AVIF/WebP/JPEG
// files in public/images/. The logo, icons and Open Graph card come from
// scripts/brand-assets.mjs.
// Run with `npm run images` whenever a source image changes.
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'assets-src')
const outDir = path.join(root, 'public/images')
const WIDTHS = [640, 960, 1440, 1920]

await mkdir(outDir, { recursive: true })

const manifest = {}
const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f))

for (const file of files) {
  const name = path.parse(file).name
  const input = sharp(path.join(srcDir, file)).rotate()
  const { width, height } = await input.metadata()
  const widths = WIDTHS.filter((w) => w <= width)
  if (!widths.includes(Math.min(width, WIDTHS.at(-1)))) widths.push(Math.min(width, WIDTHS.at(-1)))

  // A light, shared grade so photos from different sources sit together.
  const graded = () => input.clone().modulate({ saturation: 0.88 }).linear(1.04, -4)

  for (const w of widths) {
    const resized = () => graded().resize({ width: w })
    await resized().avif({ quality: 52, effort: 6 }).toFile(path.join(outDir, `${name}-${w}.avif`))
    await resized().webp({ quality: 74 }).toFile(path.join(outDir, `${name}-${w}.webp`))
  }
  await graded().resize({ width: 1280 }).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(outDir, `${name}-1280.jpg`))

  manifest[name] = { width, height, widths }
  console.log(`${name}: ${width}x${height} -> ${widths.join(', ')}`)
}

await writeFile(path.join(root, 'src/data/image-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
