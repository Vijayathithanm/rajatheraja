import Image, { type ImageProps } from 'next/image';

/**
 * Thin wrapper over next/image with sensible defaults for our SVG/placeholder
 * assets. next/image automatically prefixes the deploy basePath, keeping the
 * static GitHub Pages export working under a project sub-path.
 */
export function Media({ alt, className, ...props }: ImageProps) {
  return <Image alt={alt} className={className} {...props} />;
}
