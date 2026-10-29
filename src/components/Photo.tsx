import manifest from '../data/image-manifest.json'

export type PhotoName = keyof typeof manifest

interface PhotoProps {
  name: PhotoName
  alt: string
  sizes: string
  className?: string
  priority?: boolean
  // CSS object-position, to keep the subject in frame when cropped.
  position?: string
}

export function Photo({ name, alt, sizes, className, priority, position }: PhotoProps) {
  const { width, height, widths } = manifest[name]
  const set = (ext: string) => widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/images/${name}-1280.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  )
}
