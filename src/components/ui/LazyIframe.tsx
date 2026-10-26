import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play, TriangleAlert } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { safeHttpUrl } from '@/lib/urls';
import SmartImage from '@/components/ui/SmartImage';

type Props = {
  src: string;
  title?: string;
  className?: string;
  poster?: string;
  allow?: string;
  onLoad?: () => void;
  onError?: () => void;
};

export default function LazyIframe({ src, title, className, poster, allow, onLoad, onError }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const safeSrc = safeHttpUrl(src);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (!ref.current) return;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '300px' }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    setVisible(true);
  }, []);

  const label = title || 'Embedded media';

  return (
    <div ref={ref} className={`lazy-frame ${className ?? ''}`}>
      {failed || !safeSrc ? (
        <div className="lazy-frame-error" role="status">
          <TriangleAlert size={20} aria-hidden />
          <strong>Media unavailable</strong>
          <span>{failed ? 'This embedded media could not be loaded.' : 'This media link is not valid.'}</span>
          {safeSrc ? (
            <a href={safeSrc} target="_blank" rel="noopener noreferrer">
              Open in a new tab <ExternalLink size={13} aria-hidden />
            </a>
          ) : null}
        </div>
      ) : visible ? (
        <>
          {!loaded ? <Skeleton className="lazy-frame-loading rounded-none" /> : null}
          <iframe
            src={safeSrc}
            title={label}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow={allow || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
            allowFullScreen
            onLoad={() => {
              setLoaded(true);
              onLoad?.();
            }}
            onError={() => {
              setFailed(true);
              onError?.();
            }}
          />
        </>
      ) : (
        <div className="lazy-frame-poster">
          {poster ? <SmartImage src={poster} alt="" /> : null}
          <button type="button" className="lazy-frame-play" onClick={() => setVisible(true)} aria-label={`Load ${label}`}>
            <Play size={16} aria-hidden />
            Play
          </button>
        </div>
      )}
    </div>
  );
}
