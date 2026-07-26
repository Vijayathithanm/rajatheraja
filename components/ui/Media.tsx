'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { asset } from '@/lib/utils';

/**
 * next/image wrapper with two responsibilities:
 *
 * 1. basePath — with `images.unoptimized`, next/image does NOT prepend the
 *    deploy basePath to local `src`s, so on GitHub Pages (served under
 *    /<repo>) every local image would 404. We prepend it ourselves via
 *    `asset()`. Absolute (http) URLs are left untouched.
 * 2. Graceful fallback — if the primary image fails to load, swap to
 *    `fallbackSrc` (a local SVG) so the UI never shows a broken image.
 */
function withBase(s: ImageProps['src']): ImageProps['src'] {
  return typeof s === 'string' ? asset(s) : s;
}

export function Media({
  src,
  fallbackSrc,
  alt,
  className,
  ...props
}: ImageProps & { fallbackSrc?: string }) {
  const [current, setCurrent] = useState<ImageProps['src']>(withBase(src));

  useEffect(() => setCurrent(withBase(src)), [src]);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        const fb = fallbackSrc ? asset(fallbackSrc) : undefined;
        if (fb && current !== fb) setCurrent(fb);
      }}
    />
  );
}
