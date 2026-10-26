import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Decorative images pass an empty alt and are hidden from assistive tech. */
  alt?: string;
  /** Optional accessible label when the image is only an illustration. */
  fallbackLabel?: string;
};

/**
 * Image with a reserved layout slot, async decoding and a graceful failure
 * state. Containers already define aspect ratios, so the fallback inherits the
 * same box and the page does not shift when an image is broken or missing.
 */
export function SmartImage({ src, alt = '', className, fallbackLabel, loading = 'lazy', ...rest }: SmartImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(src ? 'loading' : 'error');

  useEffect(() => {
    setStatus(src ? 'loading' : 'error');
  }, [src]);

  if (!src || status === 'error') {
    return (
      <span
        className={cn('img-fallback', className)}
        role={alt ? 'img' : undefined}
        aria-label={alt ? fallbackLabel ?? alt : undefined}
        aria-hidden={alt ? undefined : true}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={cn('smart-img', status === 'loaded' && 'is-loaded', className)}
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      {...rest}
    />
  );
}

export default SmartImage;
