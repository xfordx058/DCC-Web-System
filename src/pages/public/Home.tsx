import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Church, Radio, UserRound, type LucideIcon } from 'lucide-react';
import LazyIframe from '@/components/ui/LazyIframe';
import SmartImage from '@/components/ui/SmartImage';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import { eventEndMs, formatDate, isEventActive, useRealtimeCollection } from '@/lib/firebase-data';
import { resolveStreamEmbed } from '@/lib/utils';

const heroFallback: Array<{ id: string; title: string; subtitle: string; image?: string; isDefault?: boolean }> = [
  { id: 'default', title: 'God is for you', subtitle: 'and so we are.', isDefault: true },
];

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
];

type FeatureEntry = { id: string; title: string; meta?: string; image?: string };

function FeatureCard({
  label,
  items,
  seeMoreTo,
  loading,
  icon: Icon,
  emptyTitle,
  emptyDescription,
}: {
  label: string;
  items: FeatureEntry[];
  seeMoreTo: string;
  loading?: boolean;
  icon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
}) {
  const images = items.map(item => item.image).filter((src): src is string => Boolean(src)).slice(0, 4);

  return (
    <article className={`feature-card ${images.length || loading ? '' : 'feature-card--no-collage'}`}>
      <h3 className="feature-label">{label}</h3>

      {loading ? (
        <div className="feature-collage" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="collage-item rounded-none" />
          ))}
        </div>
      ) : images.length ? (
        <div className="feature-collage" role="img" aria-label={`${label} photo collage`}>
          {images.map((src, index) => (
            <SmartImage key={`${src}-${index}`} className="collage-item" src={src} alt="" />
          ))}
        </div>
      ) : null}

      <div className="feature-body">
        <div className="feature-list">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="feature-item" aria-hidden="true">
                <Skeleton className="feature-thumb" />
                <div className="feature-item-text">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))
          ) : items.length ? (
            items.map(item => (
              <div key={item.id} className="feature-item">
                {item.image ? (
                  <SmartImage className="feature-thumb" src={item.image} alt="" fallbackLabel={item.title} />
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
            <EmptyState
              compact
              className="feature-empty-state"
              icon={Icon}
              title={emptyTitle}
              description={emptyDescription}
            />
          )}
        </div>

        <div className="feature-card-footer">
          <Link to={seeMoreTo} className="section-link">
            See more <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  const bishopsResult = useRealtimeCollection('bishops');
  const eventsResult = useRealtimeCollection('events');
  const churchesResult = useRealtimeCollection('churches');
  const priestsResult = useRealtimeCollection('priests');
  const yearResult = useRealtimeCollection('yearOf');
  const streamsResult = useRealtimeCollection('streams');
  const heroesResult = useRealtimeCollection('heroes');

  const heroes = heroesResult.items;
  const bishops = bishopsResult.items;
  const events = eventsResult.items;
  const churches = churchesResult.items;
  const priests = priestsResult.items;
  const yearThemes = yearResult.items;
  const streamItems = streamsResult.items;

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
    const defaultSlide = active.find(item => item.isDefault === true);
    if (defaultSlide) {
      return [defaultSlide, ...active.filter(item => item.id !== defaultSlide.id)];
    }
    return [...heroFallback, ...active];
  }, [heroes]);

  const slideIndex = slides.length ? activeIndex % slides.length : 0;
  const activeSlide: Record<string, any> = slides[slideIndex] ?? heroFallback[0];
  const slideTitle = String(activeSlide.title ?? '').trim();
  const slideSubtitle = String(activeSlide.subtitle ?? '').trim();
  const hasHeroCopy = Boolean(slideTitle || slideSubtitle);
  const imageOnlySlide = Boolean(activeSlide.image) && !hasHeroCopy;
  const showBishop = activeSlide.isDefault === true;

  useEffect(() => {
    if (reducedMotion || paused || slides.length < 2) return;
    const timer = window.setInterval(() => setActiveIndex(index => index + 1), 7000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, slides.length]);

  const upcomingEvents = useMemo(
    () =>
      events
        .filter(item => isEventActive(item.dateExpired))
        .sort((left, right) => (eventEndMs(left.dateExpired) || 0) - (eventEndMs(right.dateExpired) || 0)),
    [events]
  );

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
    meta: item.address ? String(item.address) : undefined,
    image: item.image ? String(item.image) : undefined,
  }));

  const clergyEntries: FeatureEntry[] = priests
    .filter(item => String(item.status ?? 'active').toLowerCase() !== 'inactive')
    .slice(0, 4)
    .map(item => ({
    id: item.id,
    title: String(item.name ?? 'Priest'),
    meta: item.assignment ? String(item.assignment) : undefined,
    image: item.photo ? String(item.photo) : undefined,
    }));

  const churchError = churchesResult.error || priestsResult.error;
  const featureLoading = churchesResult.loading || priestsResult.loading;

  return (
    <div className="home">
      <section
        className={`home-hero${imageOnlySlide ? ' is-image-only' : ''}`}
        aria-label={imageOnlySlide ? 'Diocese of Catarman image slide' : 'Welcome to the Diocese of Catarman'}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
        }}
      >
        <div className="hero-bg" aria-hidden="true">
          {slides.map((slide, index) =>
            slide.image ? (
              <div
                key={String(slide.id ?? slide.title ?? index)}
                className={`hero-photo${index === slideIndex ? ' is-active' : ''}`}
                style={{ backgroundImage: `url("${String(slide.image)}")` }}
              />
            ) : null
          )}
        </div>

        {hasHeroCopy ? (
          <div className="hero-message">
            <div key={`${slideIndex}-${activeSlide.id ?? activeSlide.title}`} className="hero-message-inner">
              {slideTitle ? <h1>{slideTitle}</h1> : null}
              {slideSubtitle ? <span className="hero-sub">{slideSubtitle}</span> : null}
            </div>
          </div>
        ) : null}

        {showBishop ? (
          <article className="bishop-card hero-fade">
            <div className="bishop-card-image">
              {currentBishop?.image ? (
                <SmartImage
                  src={String(currentBishop.image)}
                  alt={String(currentBishop.name || 'Current Bishop')}
                  loading="eager"
                  fetchPriority="high"
                  fallbackLabel="Bishop portrait unavailable"
                />
              ) : (
                <div className="bishop-card-placeholder" aria-hidden="true">
                  <span>{bishopInitials(currentBishop?.name) || '\u271D'}</span>
                </div>
              )}
            </div>
            <div className="bishop-card-content">
              {bishopsResult.loading ? (
                <>
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-2 w-16" />
                  <Skeleton className="h-3 w-24" />
                </>
              ) : (
                <>
                  <p className="bishop-name">{String(currentBishop?.name || 'Most Rev. Emmanuel C. Trance, D.D.').toUpperCase()}</p>
                  <div className="bishop-rule" />
                  <p className="bishop-role">Current Bishop</p>
                  <p className="bishop-meta">Installed: {currentBishop?.yearInstalled || '\u2014'}</p>
                </>
              )}
            </div>
          </article>
        ) : null}

        {slides.length > 1 ? (
          <div className="hero-dots" role="group" aria-label="Hero slides">
            {slides.map((slide, index) => (
              <button
                key={String(slide.id ?? index)}
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
            See all events <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        {eventsResult.loading ? (
          <div className="event-grid" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, index) => (
              <article className="event-card" key={index}>
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="event-body">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </article>
            ))}
          </div>
        ) : eventsResult.error ? (
          <ErrorState
            compact
            title="Unable to load the latest events"
            description="The diocesan calendar could not be reached."
            onRetry={() => void eventsResult.refetch()}
          />
        ) : upcomingEvents.length ? (
          <div className="event-grid">
            {upcomingEvents.map(event => (
              <article key={event.id} className="event-card">
                {event.image ? (
                  <div className="event-image">
                    <SmartImage
                      src={String(event.image)}
                      alt={String(event.title ?? 'Diocese event')}
                      fallbackLabel="Event image unavailable"
                    />
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
          <EmptyState
            compact
            icon={CalendarDays}
            title="No upcoming events"
            description="New masses and diocesan celebrations will appear here once scheduled."
            action={
              <Link to="/events" className="ui-btn ui-btn-secondary">
                View the calendar
              </Link>
            }
          />
        )}
      </section>

      <section id="parish-directory" aria-labelledby="parish-heading">
        <div className="section-heading">
          <h2 id="parish-heading">Parishes and mission centers</h2>
        </div>
        {churchError && !featureLoading ? (
          <ErrorState
            compact
            title="Unable to load parishes and clergy"
            description="The directory could not be reached."
            onRetry={async () => {
              await Promise.all([churchesResult.refetch(), priestsResult.refetch()]);
            }}
          />
        ) : (
          <div className="feature-grid">
            <FeatureCard
              label="Parishes & Mission Centers"
              items={parishEntries}
              seeMoreTo="/parishes"
              loading={featureLoading}
              icon={Church}
              emptyTitle="No parish listings yet"
              emptyDescription="Parish and mission center profiles will appear here once added."
            />
            <FeatureCard
              label="Pastors & Deacons"
              items={clergyEntries}
              seeMoreTo="/clergy"
              loading={featureLoading}
              icon={UserRound}
              emptyTitle="No clergy listings yet"
              emptyDescription="Clergy profiles will appear here once added."
            />
          </div>
        )}
      </section>

      <section aria-labelledby="streams-heading">
        <div className="section-heading">
          <h2 id="streams-heading">Live streams</h2>
          <Link to="/streams" className="section-link">
            All streams <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        {streamsResult.loading ? (
          <div className="video-grid" aria-hidden="true">
            {Array.from({ length: 2 }).map((_, index) => (
              <article className="video-card" key={index}>
                <Skeleton className="aspect-video w-full rounded-none" />
              </article>
            ))}
          </div>
        ) : streamsResult.error ? (
          <ErrorState compact title="Unable to load live streams" description="The stream list could not be reached." onRetry={() => void streamsResult.refetch()} />
        ) : liveStreams.length ? (
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
        ) : (
          <EmptyState
            compact
            icon={Radio}
            title="No live streams scheduled"
            description="Live mass and diocesan celebrations will be shared here."
          />
        )}
      </section>

      <section id="year-of-faith" aria-labelledby="year-heading">
        <h2 id="year-heading" className="year-label">
          {currentYear.name || currentYear.title || 'Year of Faith'}
        </h2>
        <div className="year-feature">
          <div className="year-image">
            {yearResult.loading ? (
              <Skeleton className="h-full w-full rounded-none" />
            ) : (
              <SmartImage
                src={String(currentYear.image || yearFallback.image)}
                alt={String(currentYear.name || currentYear.title || 'Year of Faith')}
                fallbackLabel="Year theme image unavailable"
              />
            )}
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
