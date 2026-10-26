import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LazyIframe from '@/components/ui/LazyIframe';
import { eventEndMs, formatDate, isEventActive, useRealtimeCollection } from '@/lib/firebase-data';
import { resolveStreamEmbed } from '@/lib/utils';

const heroFallback = [{ id: 'welcome', title: 'God is for you', subtitle: 'and so we are.' }];

function bishopInitials(name: unknown) {
  return String(name || '')
    .replace(/[^A-Za-z\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(-2)
    .map(word => word[0].toUpperCase())
    .join('');
}

const yearFallback = {
  name: 'Year of Faith',
  title: 'Year of Faith',
  description:
    'The Diocese dedicates this year to focusing on specific pastoral goals, renewing our commitment to faith, and strengthening our community bonds through dedicated programs and spiritual exercises.',
  image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
};

const liveStreamFallback = [
  { title: 'Catholic Church Catarman Northern Samar', url: 'https://www.youtube.com/watch?v=0aYgrX1O6Gg' },
  { title: 'Diocese of Catarman live stream', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
];

type FeatureEntry = { id: string; title: string; meta?: string; image?: string };

function FeatureCard({ label, items, seeMoreTo }: { label: string; items: FeatureEntry[]; seeMoreTo: string }) {
  const images = items.map(item => item.image).filter((src): src is string => Boolean(src)).slice(0, 4);

  return (
    <article className={`feature-card ${images.length ? '' : 'feature-card--no-collage'}`}>
      <h3 className="feature-label">{label}</h3>

      {images.length ? (
        <div className="feature-collage" role="img" aria-label={`${label} photo collage`}>
          {images.map((src, index) => (
            <img key={`${src}-${index}`} className="collage-item" src={src} alt="" loading="lazy" />
          ))}
        </div>
      ) : null}

      <div className="feature-body">
        <div className="feature-list">
          {items.length ? (
            items.map(item => (
              <div key={item.id} className="feature-item">
                {item.image ? (
                  <img className="feature-thumb" src={item.image} alt="" loading="lazy" />
                ) : (
                  <span className="feature-thumb-placeholder" aria-hidden />
                )}
                <div className="feature-item-text">
                  <span className="feature-item-title">{item.title}</span>
                  {item.meta ? <span className="feature-item-meta">{item.meta}</span> : null}
                </div>
              </div>
            ))
          ) : (
            <p className="feature-empty">No entries available.</p>
          )}
        </div>

        <div className="feature-card-footer">
          <Link to={seeMoreTo} className="section-link">
            See more <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { items: heroes } = useRealtimeCollection('heroes');
  const { items: bishops } = useRealtimeCollection('bishops');
  const { items: events } = useRealtimeCollection('events');
  const { items: churches } = useRealtimeCollection('churches');
  const { items: priests } = useRealtimeCollection('priests');
  const { items: yearThemes } = useRealtimeCollection('yearOf');
  const { items: streamItems } = useRealtimeCollection('streams');

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const slides = useMemo(() => {
    const active = heroes
      .filter(item => item.active !== false)
      .sort((left, right) => Number(left.order ?? 0) - Number(right.order ?? 0));
    return active.length ? active : heroFallback;
  }, [heroes]);

  const slideIndex = slides.length ? activeIndex % slides.length : 0;
  const activeSlide: Record<string, any> = slides[slideIndex] ?? heroFallback[0];

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => setActiveIndex(index => index + 1), 7000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length]);

  const upcomingEvents = useMemo(() => events
    .filter(item => isEventActive(item.dateExpired))
    .sort((left, right) => (eventEndMs(left.dateExpired) || 0) - (eventEndMs(right.dateExpired) || 0)), [events]);

  const currentBishop = bishops.find(item => item.isCurrent) ?? bishops[0];
  const currentYear = yearThemes.find(item => item.isCurrent) ?? yearFallback;

  const liveStreams = useMemo(() => {
    const source = streamItems.filter(item => item.active !== false);
    const ordered = source
      .sort((left, right) => Number(left.order ?? 0) - Number(right.order ?? 0))
      .map(item => ({ key: String(item.id), title: String(item.title ?? ''), embed: resolveStreamEmbed(item.url) }))
      .filter(item => item.embed);
    if (ordered.length) return ordered;
    return liveStreamFallback
      .map(item => ({ key: item.title, title: item.title, embed: resolveStreamEmbed(item.url) }))
      .filter(item => item.embed);
  }, [streamItems]);

  const parishEntries: FeatureEntry[] = churches.slice(0, 4).map(item => ({
    id: item.id,
    title: String(item.name ?? 'Parish'),
    meta: item.address,
    image: item.image,
  }));

  const clergyEntries: FeatureEntry[] = priests.slice(0, 4).map(item => ({
    id: item.id,
    title: String(item.name ?? 'Priest'),
    meta: item.assignment,
    image: item.photo,
  }));

  return (
    <div className="home">
      <section className="home-hero" aria-label="Welcome to the Diocese of Catarman">
        <div className="hero-bg" aria-hidden="true">
          <AnimatePresence mode="wait">
            {activeSlide.image ? (
              <motion.div
                key={`bg-${slideIndex}-${activeSlide.id ?? activeSlide.title}`}
                className="hero-photo"
                style={{ backgroundImage: `url("${activeSlide.image}")` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6 }}
              />
            ) : null}
          </AnimatePresence>
        </div>

        <div className="hero-message">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slideIndex}-${activeSlide.id ?? activeSlide.title}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.45 }}
            >
              <h1>{activeSlide.title}</h1>
              {activeSlide.subtitle ? <span className="hero-sub">{activeSlide.subtitle}</span> : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {slideIndex === 0 ? (
            <motion.article
              key="bishop-card"
              className="bishop-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.35 }}
            >
              <div className="bishop-card-image">
                {currentBishop?.image ? (
                  <img
                    src={currentBishop.image}
                    alt={currentBishop?.name || 'Current Bishop'}
                    fetchPriority="high"
                    decoding="async"
                  />
                ) : (
                  <div className="bishop-card-placeholder" aria-hidden="true">
                    <span>{bishopInitials(currentBishop?.name) || '\u271D'}</span>
                  </div>
                )}
              </div>
              <div className="bishop-card-content">
                <p className="bishop-name">{String(currentBishop?.name || 'Most Rev. Emmanuel C. Trance, D.D.').toUpperCase()}</p>
                <div className="bishop-rule" />
                <p className="bishop-role">Current Bishop</p>
                <p className="bishop-meta">Installed: {currentBishop?.yearInstalled || '\u2014'}</p>
              </div>
            </motion.article>
          ) : null}
        </AnimatePresence>

        {slides.length > 1 ? (
          <div className="hero-dots" role="group" aria-label="Hero slides">
            {slides.map((slide, index) => (
              <button
                key={slide.id ?? index}
                type="button"
                className="hero-dot"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === slideIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        ) : null}
      </section>

      <section id="latest" aria-labelledby="latest-heading">
        <div className="section-heading">
          <h2 id="latest-heading">Latest events</h2>
          <Link to="/events" className="section-link">
            See all events <ArrowRight size={14} />
          </Link>
        </div>

        {upcomingEvents.length ? (
          <div className="event-grid">
            {upcomingEvents.map(event => (
              <article key={event.id} className="event-card">
                {event.image ? (
                  <div className="event-image">
                    <img src={event.image} alt={String(event.title ?? 'Diocese event')} loading="lazy" />
                  </div>
                ) : null}
                <div className="event-body">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.description}</p>
                  {event.dateExpired ? <p className="event-date">Until {formatDate(event.dateExpired)}</p> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="events-empty">No latest news or events.</p>
        )}
      </section>

      <section id="parish-directory" aria-labelledby="parish-heading">
        <div className="section-heading">
          <h2 id="parish-heading">Parishes and mission centers</h2>
        </div>
        <div className="feature-grid">
          <FeatureCard label="Parishes & Mission Centers" items={parishEntries} seeMoreTo="/parishes" />
          <FeatureCard label="Pastors & Deacons" items={clergyEntries} seeMoreTo="/clergy" />
        </div>
      </section>

      <section aria-labelledby="streams-heading">
        <div className="section-heading">
          <h2 id="streams-heading">Live streams</h2>
        </div>
        <div className="video-grid">
          {liveStreams.map(stream => (
            <article key={stream.key} className="video-card">
              <div className="video-figure">
                <LazyIframe
                  className="w-full h-full"
                  src={stream.embed!.embedUrl}
                  title={stream.title}
                  poster={stream.embed!.poster}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="year-of-faith" aria-labelledby="year-heading">
        <h2 id="year-heading" className="year-label">
          {currentYear.name || currentYear.title || 'Year of Faith'}
        </h2>
        <div className="year-feature">
          <div className="year-image">
            <img
              src={currentYear.image || yearFallback.image}
              alt={String(currentYear.name || currentYear.title || 'Year of Faith')}
              loading="lazy"
            />
          </div>
          <div className="year-body">
            <p>{currentYear.description}</p>
          </div>
        </div>
      </section>

      <section id="vision" className="creed-block" aria-labelledby="vision-heading">
        <h2 id="vision-heading" className="creed-heading">Vision</h2>
        <p className="creed-text">
          {'\u201C'}A communion of communities, deeply rooted in Christ, living the Gospel values, and actively participating in the transformation of society.{'\u201D'}
        </p>
      </section>

      <section id="mission" className="creed-block" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="creed-heading">Mission</h2>
        <p className="creed-text">
          {'\u201C'}To proclaim the Good News, celebrate the sacraments faithfully, and serve the poor and marginalized with love, building a just and peaceful Diocese of Catarman.{'\u201D'}
        </p>
      </section>
    </div>
  );
}
