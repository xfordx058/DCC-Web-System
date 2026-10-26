import { useCallback, useEffect, useRef, useState } from 'react';
import { Layers, Map as MapIcon, Pause, Play, RefreshCw } from 'lucide-react';
import L from 'leaflet';
import type { Map as LeafletMap, TileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';

export type LiveWeatherData = {
  temperature_2m?: number;
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
  wind_direction_10m?: number;
  precipitation?: number;
  weather_code?: number;
};

export type WeatherMapLocation = { name: string; latitude: number; longitude: number };

type RadarFrame = { time: number; path: string };
type RadarMetadata = { host: string; radar: { past?: RadarFrame[]; nowcast?: RadarFrame[] } };
type RadarState = 'loading' | 'ready' | 'empty' | 'error';

const RADAR_METADATA_URL = 'https://api.rainviewer.com/public/weather-maps.json';
const RADAR_METADATA_TTL = 5 * 60_000;
let radarCache: { data: RadarMetadata; cachedAt: number } | null = null;

function isRadarMetadata(value: unknown): value is RadarMetadata {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<RadarMetadata>;
  return typeof data.host === 'string' && Boolean(data.radar && typeof data.radar === 'object');
}

function conditionFor(code?: number) {
  if (code == null) return 'Condition unavailable';
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
  return 'Condition unavailable';
}

function frameLabel(frame: RadarFrame) {
  return new Date(frame.time * 1000).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
}

function WindFlowOverlay({ speed, direction }: { speed: number; direction: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let previousTime = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bearing = ((direction + 180) % 360) * Math.PI / 180;
    const velocity = Math.max(5, Math.min(46, speed * 0.8));
    const particles = Array.from({ length: 34 }, (_, index) => ({
      x: ((index * 67 + 19) % 100) / 100,
      y: ((index * 43 + 11) % 100) / 100,
      length: 10 + ((index * 7) % 15),
      opacity: 0.2 + ((index * 13) % 45) / 100,
    }));

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      paint(0);
    };

    const paint = (elapsed: number) => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const dx = Math.sin(bearing);
      const dy = -Math.cos(bearing);
      for (const particle of particles) {
        const startX = particle.x * width;
        const startY = particle.y * height;
        const travel = (elapsed * velocity / 1000) % (Math.max(width, height) + particle.length);
        let x = startX;
        let y = startY;
        if (!reduceMotion) {
          x = ((startX + dx * travel) % width + width) % width;
          y = ((startY + dy * travel) % height + height) % height;
        }
        const length = particle.length + Math.min(speed, 45) * 0.16;
        const endX = x + dx * length;
        const endY = y + dy * length;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(endX, endY);
        context.strokeStyle = `rgba(125, 220, 255, ${particle.opacity})`;
        context.lineWidth = 1.2;
        context.lineCap = 'round';
        context.stroke();
        context.beginPath();
        context.moveTo(endX, endY);
        context.lineTo(endX - dx * 4 - dy * 2, endY - dy * 4 + dx * 2);
        context.moveTo(endX, endY);
        context.lineTo(endX - dx * 4 + dy * 2, endY - dy * 4 - dx * 2);
        context.stroke();
      }
    };

    const animate = (time: number) => {
      if (time - previousTime >= 45) {
        paint(time);
        previousTime = time;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    if (!reduceMotion && speed > 0) animationFrame = window.requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [speed, direction]);

  return <canvas ref={canvasRef} className="weather-wind-canvas" aria-hidden="true" />;
}

export function LiveWeatherMap({
  region,
  locations,
  weather,
  compact = false,
}: {
  region: string;
  locations: WeatherMapLocation[];
  weather?: LiveWeatherData | null;
  compact?: boolean;
}) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const radarLayerRef = useRef<TileLayer | null>(null);
  const [radarState, setRadarState] = useState<RadarState>('loading');
  const [radarError, setRadarError] = useState('');
  const [frames, setFrames] = useState<RadarFrame[]>([]);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  const selectedLocation = locations.find(location => location.name === region) ?? locations[0];

  const loadRadar = useCallback(async (retry = false) => {
    setRadarError('');
    if (!retry && radarCache && Date.now() - radarCache.cachedAt < RADAR_METADATA_TTL) {
      const cachedFrames = [...(radarCache.data.radar.past ?? []), ...(radarCache.data.radar.nowcast ?? [])]
        .filter(frame => Number.isFinite(frame.time) && typeof frame.path === 'string')
        .sort((a, b) => a.time - b.time);
      setFrames(cachedFrames);
      setSelectedFrame(Math.max(0, cachedFrames.length - 1));
      setRadarState(cachedFrames.length ? 'ready' : 'empty');
      return;
    }

    setRadarState('loading');
    try {
      const response = await fetch(RADAR_METADATA_URL, { signal: AbortSignal.timeout(12_000) });
      if (!response.ok) throw new Error('Radar data service is unavailable.');
      const data: unknown = await response.json();
      if (!isRadarMetadata(data)) throw new Error('Radar data response was not valid.');
      radarCache = { data, cachedAt: Date.now() };
      const availableFrames = [...(data.radar.past ?? []), ...(data.radar.nowcast ?? [])]
        .filter(frame => Number.isFinite(frame.time) && typeof frame.path === 'string')
        .sort((a, b) => a.time - b.time);
      setFrames(availableFrames);
      setSelectedFrame(Math.max(0, availableFrames.length - 1));
      setRadarState(availableFrames.length ? 'ready' : 'empty');
    } catch (caught) {
      setRadarState('error');
      setRadarError(caught instanceof Error ? caught.message : 'Unable to load radar data.');
    }
  }, []);

  useEffect(() => {
    void loadRadar();
  }, [loadRadar]);

  useEffect(() => {
    const element = mapElementRef.current;
    if (!element || mapRef.current || !selectedLocation) return;

    const map = L.map(element, {
      center: [selectedLocation.latitude, selectedLocation.longitude],
      zoom: 8,
      minZoom: 5,
      maxZoom: 15,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 5,
      maxZoom: 19,
      maxNativeZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>',
    }).addTo(map);
    L.control.zoom({ position: 'topright' }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      radarLayerRef.current = null;
    };
  }, [selectedLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedLocation) return;
    map.setView([selectedLocation.latitude, selectedLocation.longitude], map.getZoom(), { animate: false });
  }, [selectedLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const validLocations = locations.filter(location => Number.isFinite(location.latitude) && Number.isFinite(location.longitude));
    const markers = validLocations.map(location => {
      if (location.name === region) {
        const direction = weather?.wind_direction_10m;
        const speed = weather?.wind_speed_10m;
        const hasWindDirection = Number.isFinite(direction);
        const flowDirection = hasWindDirection ? ((Number(direction) + 180) % 360) : 0;
        const flowDuration = Math.max(0.55, 2.8 - Math.min(1, (speed ?? 0) / 70) * 2.1);
        const icon = L.divIcon({
          className: 'weather-active-marker',
          iconSize: [92, 92],
          iconAnchor: [46, 46],
          html: `<span class="weather-wind-vector${hasWindDirection ? ' has-direction' : ''}" style="--wind-heading:${flowDirection}deg;--wind-speed:${flowDuration}s" aria-hidden="true"><svg viewBox="0 0 92 92" role="presentation"><path d="M8 46 C23 23 35 68 50 42 S72 25 85 43"/><path d="M7 54 C22 31 33 76 49 50 S72 33 86 51"/><path d="M11 37 C25 17 37 58 52 34 S72 18 83 34"/></svg><i></i></span>`,
        });
        const marker = L.marker([location.latitude, location.longitude], { icon, keyboard: true, title: `${location.name} selected weather station` }).addTo(map);
        const windLabel = speed == null ? 'Wind speed unavailable' : `${speed.toFixed(1)} km/h wind`;
        const directionLabel = hasWindDirection ? `Direction ${Math.round(Number(direction))}°` : 'Wind direction unavailable';
        marker.bindTooltip(`${location.name} · ${windLabel} · ${directionLabel}`, { direction: 'top', offset: [0, -34] });
        marker.bindPopup(`<strong>${location.name}</strong><br>${conditionFor(weather?.weather_code)}${weather?.temperature_2m == null ? '' : `<br>${weather.temperature_2m.toFixed(1)} °C`}${speed == null ? '' : `<br>${windLabel}`}${hasWindDirection ? `<br>${directionLabel}` : ''}`);
        return marker;
      }
      const marker = L.circleMarker([location.latitude, location.longitude], {
        radius: location.name === region ? 7 : 5,
        color: '#ffffff',
        weight: 2,
        fillColor: location.name === region ? '#e6b321' : '#145b96',
        fillOpacity: 1,
      }).addTo(map);
      marker.bindTooltip(location.name, { direction: 'top', offset: [0, -5] });
      return marker;
    });
    return () => markers.forEach(marker => marker.remove());
  }, [locations, region, weather?.weather_code, weather?.temperature_2m, weather?.wind_direction_10m, weather?.wind_speed_10m]);

  useEffect(() => {
    const map = mapRef.current;
    const frame = frames[selectedFrame];
    const host = radarCache?.data.host;
    radarLayerRef.current?.remove();
    radarLayerRef.current = null;
    if (!map || !frame || !host || radarState !== 'ready') return;
    const layer = L.tileLayer(`${host}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`, {
      opacity: 0.72,
      minZoom: 5,
      maxZoom: 15,
      maxNativeZoom: 7,
      attribution: '<a href="https://www.rainviewer.com/" target="_blank" rel="noreferrer">Weather data by RainViewer</a>',
    });
    layer.addTo(map);
    radarLayerRef.current = layer;
    return () => {
      layer.remove();
      if (radarLayerRef.current === layer) radarLayerRef.current = null;
    };
  }, [frames, selectedFrame, radarState]);

  useEffect(() => {
    if (!playing || frames.length < 2) return;
    const timer = window.setInterval(() => setSelectedFrame(index => (index + 1) % frames.length), 850);
    return () => window.clearInterval(timer);
  }, [playing, frames.length]);

  const activeFrame = frames[selectedFrame];

  return (
    <section className={`live-weather-map${compact ? ' is-compact' : ''}`} aria-label={`Weather radar map for ${region}`}>
      <div className="weather-map-heading">
        <div><p className="weather-map-eyebrow"><MapIcon size={14} aria-hidden="true" /> Geographic view</p><h2>{region} radar</h2></div>
        {weather?.weather_code != null ? <span className="weather-map-condition">{conditionFor(weather.weather_code)}</span> : null}
      </div>
      <div className="weather-map-canvas-wrap">
        <div ref={mapElementRef} className="weather-map-canvas" role="application" aria-label={`Interactive map centered on ${region}. Use arrow keys to pan and plus or minus controls to zoom.`} />
        {weather?.wind_direction_10m != null && weather.wind_speed_10m != null && weather.wind_speed_10m > 0 ? <WindFlowOverlay speed={weather.wind_speed_10m} direction={weather.wind_direction_10m} /> : null}
        {radarState === 'loading' ? <div className="weather-radar-state" role="status"><span className="weather-radar-spinner" />Loading radar frames…</div> : null}
        {radarState === 'empty' ? <div className="weather-radar-state" role="status"><Layers size={18} aria-hidden="true" /><span>No radar frames are currently available from the provider.</span></div> : null}
        {radarState === 'error' ? <div className="weather-radar-state is-error" role="status"><span>{radarError || 'Radar is unavailable.'}</span><Button className="weather-small-button" variant="secondary" onClick={() => void loadRadar(true)}><RefreshCw size={14} aria-hidden="true" /> Retry radar</Button></div> : null}
        <div className="weather-map-live-pill"><span />RADAR</div>
      </div>
      <div className="weather-radar-controls">
        {frames.length > 1 ? <>
          <Button type="button" className="weather-small-button" variant="secondary" onClick={() => setPlaying(value => !value)} aria-label={playing ? 'Pause radar playback' : 'Play radar frames'}>
            {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}{playing ? 'Pause' : 'Play'}
          </Button>
          <label className="weather-frame-slider"><span className="sr-only">Radar frame time</span><input type="range" min={0} max={frames.length - 1} value={selectedFrame} onChange={event => { setPlaying(false); setSelectedFrame(Number(event.target.value)); }} /><span>{activeFrame ? frameLabel(activeFrame) : '—'}</span></label>
        </> : <p>{activeFrame ? `Radar frame ${frameLabel(activeFrame)}` : 'Radar timeline unavailable'}</p>}
        <p className="weather-map-legend"><span aria-hidden="true" />Precipitation · radar coverage varies by location</p>
        <p className="weather-wind-caption">Wind flow across this view follows the selected location’s measured direction and speed; it is not a regional wind model.</p>
      </div>
      <p className="weather-map-attribution">Map © OpenStreetMap contributors · Weather data by <a href="https://www.rainviewer.com/" target="_blank" rel="noopener noreferrer">RainViewer</a></p>
    </section>
  );
}

export default LiveWeatherMap;
