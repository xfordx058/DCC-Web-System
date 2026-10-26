import React, { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    if (!ref.current) return;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setVisible(true);
              io.disconnect();
            }
          });
        },
        { rootMargin: '300px' }
      );
      io.observe(ref.current);
      return () => io.disconnect();
    }
    // fallback
    setVisible(true);
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          loading="lazy"
          allow={allow || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
          allowFullScreen
          onLoad={() => onLoad?.()}
          onError={() => onError?.()}
        />
      ) : (
        <div className="relative w-full h-full bg-[var(--bg-secondary)] flex items-center justify-center">
          {poster ? <img src={poster} alt={title || 'placeholder'} className="absolute inset-0 w-full h-full object-cover" /> : null}
          <button
            className="z-10 inline-flex items-center gap-2 rounded px-4 py-2 bg-[var(--signal)] text-[var(--bg-primary)]"
            onClick={() => setVisible(true)}
            aria-label={`Load ${title || 'media'}`}
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
}
