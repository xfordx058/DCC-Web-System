import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { safeHttpUrl } from '@/lib/urls';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeId(value: unknown): string {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  if (/^[\w-]{11}$/.test(raw)) return raw;
  const match = raw.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/|live\/)([\w-]{11})/);
  return match ? match[1] : '';
}

export type StreamEmbed = {
  provider: 'youtube' | 'facebook' | 'generic';
  embedUrl: string;
  poster?: string;
};

export function resolveStreamEmbed(value: unknown): StreamEmbed | null {
  const raw = String(value ?? '').trim();
  if (!raw) return null;

  const youtubeId = getYouTubeId(raw);
  if (youtubeId) {
    return {
      provider: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      poster: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  const safeUrl = safeHttpUrl(raw);
  if (!safeUrl) return null;

  if (/facebook\.com|fb\.watch/i.test(safeUrl)) {
    const normalized = safeUrl
      .replace(/^https?:\/\/web\.facebook\.com/i, 'https://www.facebook.com')
      .replace(/^https?:\/\/m\.facebook\.com/i, 'https://www.facebook.com')
      .replace(/^https?:\/\/fb\.watch/i, 'https://www.facebook.com');
    return {
      provider: 'facebook',
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(normalized)}&show_text=false&width=734&autoplay=false`,
    };
  }

  return { provider: 'generic', embedUrl: safeUrl };
}
