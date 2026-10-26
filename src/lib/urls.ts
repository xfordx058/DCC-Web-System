/** URL helpers that keep user/admin supplied links to safe schemes. */

const SAFE_PROTOCOLS = ['http:', 'https:'];

export function safeHttpUrl(value: unknown, fallback = ''): string {
  const raw = String(value ?? '').trim();
  if (!raw) return fallback;
  try {
    const url = new URL(raw, window.location.origin);
    if (!SAFE_PROTOCOLS.includes(url.protocol)) return fallback;
    return url.toString();
  } catch {
    return fallback;
  }
}

export function safeMailto(value: unknown): string {
  const raw = String(value ?? '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? `mailto:${raw}` : '';
}

export function safeTel(value: unknown): string {
  const raw = String(value ?? '').trim();
  return /^[+()\d\s-]{6,}$/.test(raw) ? `tel:${raw.replace(/\s+/g, '')}` : '';
}
