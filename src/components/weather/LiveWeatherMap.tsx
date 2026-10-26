import { useCurrentTime } from '@/lib/weather';

export type LiveWeatherData = {
  temperature_2m?: number;
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
  precipitation?: number;
  weather_code?: number;
};

const markers = [
  { name: 'Catarman', x: 50, y: 54 },
  { name: 'Allen', x: 20, y: 46 },
  { name: 'Laoang', x: 82, y: 38 },
  { name: 'Catubig', x: 63, y: 79 },
];

const cells = [
  { x: 26, y: 30, size: 46, delay: 0 },
  { x: 68, y: 58, size: 58, delay: -3.5 },
  { x: 46, y: 16, size: 34, delay: -7 },
  { x: 80, y: 26, size: 40, delay: -5 },
];

function conditionFor(code?: number, precipitation = 0) {
  if (code == null) return precipitation > 0 ? 'Rain' : 'Fair skies';
  if (code === 0) return 'Clear sky';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 85 && code <= 86) return 'Snow showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Fair skies';
}

export function LiveWeatherMap({ region, weather, compact = false }: { region: string; weather?: LiveWeatherData; compact?: boolean }) {
  const now = useCurrentTime();
  const precipitation = weather?.precipitation ?? 0;
  const wind = weather?.wind_speed_10m ?? 0;
  const temperature = weather?.temperature_2m;
  const stormy = precipitation > 0.1;
  const intensity = Math.min(1, precipitation / 8);
  const sweepSeconds = Math.max(2.6, 9 - wind / 6);
  const time = now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <div
      className={`live-weather-map${compact ? ' is-compact' : ''}${stormy ? ' is-stormy' : ''}`}
      role="img"
      aria-label={`Animated live weather map for ${region} showing ${conditionFor(weather?.weather_code, precipitation)}.`}
    >
      <div className="live-weather-map-grid" aria-hidden />
      <svg className="live-weather-map-rings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <circle cx="50" cy="50" r="14" />
        <circle cx="50" cy="50" r="28" />
        <circle cx="50" cy="50" r="42" />
        <line x1="50" y1="6" x2="50" y2="94" />
        <line x1="6" y1="50" x2="94" y2="50" />
      </svg>
      <div className="live-weather-map-sweep" style={{ animationDuration: `${sweepSeconds}s` }} aria-hidden />

      {cells.map((cell, index) => (
        <span
          key={index}
          className="live-weather-cell"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: cell.size,
            height: cell.size,
            animationDelay: `${cell.delay}s`,
            opacity: 0.18 + intensity * 0.55,
          }}
          aria-hidden
        />
      ))}

      {markers.map(marker => (
        <span
          key={marker.name}
          className={`live-weather-marker${marker.name === region ? ' is-current' : ''}`}
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <i aria-hidden />
          <b>{marker.name}</b>
        </span>
      ))}

      <div className="live-weather-badge"><i aria-hidden />Live</div>
      <div className="live-weather-clock">{time}</div>

      <div className="live-weather-readout">
        <strong>{temperature == null ? '—' : `${Math.round(temperature)}°C`}</strong>
        <span>{conditionFor(weather?.weather_code, precipitation)}</span>
        <small>{region} · {Math.round(wind)} km/h wind</small>
      </div>
    </div>
  );
}

export default LiveWeatherMap;
