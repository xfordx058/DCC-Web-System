import { useEffect, useState } from 'react';

const CATARMAN_LAT = 12.4989;
const CATARMAN_LON = 124.6377;

export interface WeatherNow {
  temperature_2m?: number;
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
  precipitation?: number;
  weather_code?: number;
}

interface WeatherResponse {
  current?: WeatherNow;
}

export function weatherUrl(lat: number, lon: number, fields: string) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: fields,
    timezone: 'Asia/Manila',
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

export function useCurrentWeather(lat = CATARMAN_LAT, lon = CATARMAN_LON, fields = 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation') {
  const [weather, setWeather] = useState<WeatherNow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const response = await fetch(weatherUrl(lat, lon, fields), { signal: controller.signal });
        if (!response.ok) throw new Error('Weather request failed');
        const data = (await response.json()) as WeatherResponse;
        setWeather(data.current ?? null);
        setError(false);
      } catch {
        if (controller.signal.aborted) return;
        setWeather(null);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void load();
    return () => controller.abort();
  }, [lat, lon, fields]);

  return { weather, loading, error };
}

export function useCurrentMinute() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let interval: number | undefined;
    const tick = () => setNow(new Date());
    // Align the first update to the next minute boundary, then tick per minute.
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));

    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, []);

  return now;
}

/** Second-level ticker for the admin live-radar clock. */
export function useSecondTicker() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
}
