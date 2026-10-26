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
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(weatherUrl(lat, lon, fields));
        if (!response.ok) throw new Error('Weather request failed');
        const data = (await response.json()) as WeatherResponse;
        if (!cancelled) {
          setWeather(data.current ?? null);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setWeather(null);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [lat, lon, fields]);

  return { weather, loading, error };
}

export function useCurrentTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
}