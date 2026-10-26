import LazyIframe from '@/components/ui/LazyIframe';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { resolveStreamEmbed } from '@/lib/utils';

const fallbackStreams = [
  { title: 'Catholic Church Catarman Northern Samar', description: 'Live mass and diocesan events.', url: 'https://www.youtube.com/watch?v=0aYgrX1O6Gg' },
  { title: 'Diocese Stream', description: 'Recorded services and special events.', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
];

export default function Streams() {
  const { items } = useRealtimeCollection('streams');
  const active = items
    .filter(item => item.active !== false)
    .sort((left, right) => Number(left.order ?? 0) - Number(right.order ?? 0))
    .map(item => ({
      title: String(item.title ?? 'Live Stream'),
      description: String(item.description ?? ''),
      embed: resolveStreamEmbed(item.url),
    }))
    .filter(stream => stream.embed);
  const streams = active.length
    ? active
    : fallbackStreams
        .map(stream => ({ title: stream.title, description: stream.description, embed: resolveStreamEmbed(stream.url) }))
        .filter(stream => stream.embed);

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Watch and pray</p>
        <h1>Live Streams</h1>
        <p>Join diocesan celebrations online and revisit recorded services from the Diocese of Catarman.</p>
      </header>
      <section className="public-stream-grid">
        {streams.map(stream => (
          <article className="public-stream-card" key={stream.title + stream.embed!.embedUrl}>
            <div className="public-stream-frame">
              <LazyIframe
                className="h-full w-full"
                src={stream.embed!.embedUrl}
                title={stream.title}
                poster={stream.embed!.poster}
              />
            </div>
            <div><h2>{stream.title}</h2><p>{stream.description}</p></div>
          </article>
        ))}
      </section>
    </div>
  );
}
