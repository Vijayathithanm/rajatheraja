'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

/**
 * next/image wrapper with graceful CDN fallback.
 *
 * `src` is the primary image (typically HD Unsplash photography); if it fails
 * to load, the component swaps to `fallbackSrc` (a local SVG placeholder), so
 * the UI never shows a broken image. next/image automatically prefixes the
 * deploy basePath, keeping the static GitHub Pages export working.
 */
export function Media({
  src,
  fallbackSrc,
  alt,
  className,
  ...props
}: ImageProps & { fallbackSrc?: string }) {
  const [current, setCurrent] = useState(src);

  useEffect(() => setCurrent(src), [src]);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (fallbackSrc && current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
