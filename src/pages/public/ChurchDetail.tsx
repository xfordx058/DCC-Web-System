import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Church as ChurchIcon, ExternalLink, MapPin, ShieldCheck, UserRound, UsersRound } from 'lucide-react';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { Skeleton, SkeletonGrid, SkeletonText } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import LazyIframe from '@/components/ui/LazyIframe';
import SmartImage from '@/components/ui/SmartImage';
import type { Church, Priest } from '@/types';

type Coordinates = { lat: number; lng: number };

function readCoordinates(value: Church['coordinates']): Coordinates | null {
  let lat: number;
  let lng: number;
  if (typeof value === 'string') {
    const [latitude, longitude] = value.split(',').map(part => part.trim());
    if (!latitude || !longitude) return null;
    lat = Number(latitude);
    lng = Number(longitude);
  } else if (value && typeof value === 'object') {
    lat = Number(value.lat);
    lng = Number(value.lng);
  } else {
    return null;
  }
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

function priestName(priest: Priest) {
  return priest.name || `${priest.firstName || ''} ${priest.lastName || ''}`.trim();
}

function ParishLoadingState() {
  return (
    <div className="public-page-stack parish-detail-loading" aria-label="Loading parish details" role="status">
      <Skeleton className="h-4 w-64" />
      <div className="public-detail-hero parish-detail-hero-skeleton"><Skeleton className="h-full w-full" /></div>
      <div className="parish-facts-grid parish-facts-skeleton" aria-hidden="true">
        <div className="parish-fact-card"><Skeleton className="parish-fact-icon" /><div><Skeleton className="h-3 w-20" /><Skeleton className="h-5 w-32" /></div></div>
        <div className="parish-fact-card"><Skeleton className="parish-fact-icon" /><div><Skeleton className="h-3 w-24" /><Skeleton className="h-5 w-28" /></div></div>
        <div className="parish-fact-card"><Skeleton className="parish-fact-icon" /><div><Skeleton className="h-3 w-24" /><Skeleton className="h-5 w-24" /></div></div>
      </div>
      <div className="parish-detail-skeleton-grid">
        <div className="public-detail-panel"><Skeleton className="h-5 w-40" /><SkeletonText lines={4} /></div>
        <div className="public-detail-panel"><Skeleton className="h-5 w-40" /><SkeletonText lines={4} /></div>
      </div>
      <SkeletonGrid count={3} />
      <span className="sr-only">Loading parish information, please wait.</span>
    </div>
  );
}

export default function ChurchDetail() {
  const { id } = useParams();
  const { items: churchRecords, loading, error, refetch } = useRealtimeCollection('churches');
  const { items: priestRecords, loading: priestsLoading, error: priestsError, refetch: refetchPriests } = useRealtimeCollection('priests');
  const church = churchRecords.find(item => item.id === id) as Church | undefined;
  const priests = priestRecords as Priest[];

  if (loading) return <ParishLoadingState />;

  if (error) {
    return (
      <div className="public-page-stack parish-page-state">
        <Link to="/parishes" className="section-link">← Back to parishes</Link>
        <ErrorState title="Unable to load this church" description="The church details could not be reached. Check your connection and try again." onRetry={() => void refetch()} />
      </div>
    );
  }

  if (!church || !church.name) {
    return (
      <div className="public-page-stack parish-page-state">
        <Link to="/parishes" className="section-link">← Back to parishes</Link>
        <EmptyState icon={ChurchIcon} title="Church not found" description="This church may have been moved or removed from the parish directory." action={<Link to="/parishes" className="ui-btn ui-btn-secondary">Browse all parishes</Link>} />
      </div>
    );
  }

  const coordinates = readCoordinates(church.coordinates);
  const destination = coordinates ? `${coordinates.lat},${coordinates.lng}` : String(church.address || '').trim();
  const mapSource = destination ? `https://www.google.com/maps?q=${encodeURIComponent(destination)}&output=embed` : '';
  const directionsHref = destination ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}` : '';
  const assistantIds = Array.from(new Set(Array.isArray(church.assistantPriests)
    ? church.assistantPriests.filter(Boolean)
    : String(church.assistantPriests || '').split(',').map(value => value.trim()).filter(Boolean)));
  const mainPriest = church.mainPriestId ? priests.find(priest => priest.id === church.mainPriestId) : undefined;
  const assistantPriests = assistantIds.map(priestId => priests.find(priest => priest.id === priestId)).filter((priest): priest is Priest => Boolean(priest));
  const relatedParishes = (churchRecords as Church[])
    .filter(item => item.id !== id && item.name)
    .sort((a, b) => String(a.name).localeCompare(String(b.name)))
    .slice(0, 3);
  const hasClergyAssignments = Boolean(church.mainPriestId || assistantIds.length);

  return (
    <div className="public-page-stack parish-detail-page">
      <nav className="parish-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/parishes">Parishes</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{church.name}</li>
        </ol>
      </nav>

      <section className={`parish-detail-hero${church.image ? '' : ' has-no-image'}`} aria-label={`${church.name} parish` }>
        {church.image ? <SmartImage className="parish-detail-image" src={church.image} alt={`${church.name} church`} loading="eager" fetchPriority="high" fallbackLabel="Church image unavailable" /> : <div className="parish-detail-image-placeholder" aria-hidden="true"><ChurchIcon size={48} strokeWidth={1.4} /></div>}
        <div className="parish-detail-hero-overlay">
          <p className="parish-hero-kicker">{church.status || 'Parish'}</p>
          <h1>{church.name}</h1>
          {church.address ? <p><MapPin size={16} aria-hidden="true" />{church.address}</p> : null}
        </div>
      </section>

      <section className="parish-facts-grid" aria-label="Parish at a glance">
        {church.patronSaint ? (
          <article className="parish-fact-card">
            <span className="parish-fact-icon" aria-hidden="true"><ShieldCheck size={19} /></span>
            <div><p>Patron saint</p><h2>{church.patronSaint}</h2></div>
          </article>
        ) : null}
        {church.status ? (
          <article className="parish-fact-card">
            <span className="parish-fact-icon" aria-hidden="true"><ChurchIcon size={19} /></span>
            <div><p>Parish status</p><h2>{church.status}</h2></div>
          </article>
        ) : null}
        {hasClergyAssignments ? (
          <article className="parish-fact-card">
            <span className="parish-fact-icon" aria-hidden="true"><UsersRound size={19} /></span>
            <div><p>Clergy assigned</p><h2>{assistantIds.length + (church.mainPriestId ? 1 : 0)} {assistantIds.length + (church.mainPriestId ? 1 : 0) === 1 ? 'member' : 'members'}</h2></div>
          </article>
        ) : null}
      </section>

      <div className="parish-detail-layout">
        <div className="parish-detail-main">
          <section className="public-detail-panel parish-about-panel parish-content-card" aria-labelledby="parish-about-heading">
            <div className="parish-card-heading"><p className="admin-eyebrow">About the parish</p><h2 id="parish-about-heading">Church history</h2></div>
            {church.history?.trim() ? <p className="parish-history-text">{church.history}</p> : <p className="parish-information-note">Information not yet available.</p>}
          </section>

          <section className="parish-clergy-section parish-content-card" aria-labelledby="parish-clergy-heading">
            <div className="parish-section-heading">
              <div><p className="admin-eyebrow">Leadership</p><h2 id="parish-clergy-heading">Parish clergy</h2></div>
            </div>
            {priestsError ? <ErrorState compact title="Clergy assignments unavailable" description="We could not load the clergy directory." onRetry={() => void refetchPriests()} /> : null}
            {priestsLoading ? (
              <div className="parish-clergy-grid" aria-label="Loading clergy assignments" role="status">
                <div className="parish-clergy-card"><Skeleton className="parish-clergy-avatar" /><div><Skeleton className="h-3 w-28" /><Skeleton className="h-5 w-40" /></div></div>
                <div className="parish-clergy-card"><Skeleton className="parish-clergy-avatar" /><div><Skeleton className="h-3 w-28" /><Skeleton className="h-5 w-40" /></div></div>
              </div>
            ) : hasClergyAssignments ? (
              <div className="parish-clergy-grid">
                {church.mainPriestId ? (
                  <article className="parish-clergy-card">
                    {mainPriest?.photo ? <SmartImage className="parish-clergy-avatar" src={mainPriest.photo} alt={`${priestName(mainPriest) || 'Parish priest'} portrait`} /> : <span className="parish-clergy-avatar parish-clergy-placeholder" aria-hidden="true"><UserRound size={22} /></span>}
                    <div><p className="parish-role-label">Main priest in-charge</p><h3>{mainPriest ? priestName(mainPriest) || 'Name not provided' : 'Clergy record unavailable'}</h3></div>
                  </article>
                ) : null}
                {assistantIds.length ? (
                  <article className="parish-clergy-card parish-assistant-card">
                    <span className="parish-clergy-avatar parish-clergy-placeholder" aria-hidden="true"><UserRound size={22} /></span>
                    <div><p className="parish-role-label">Assistant priests</p>{assistantPriests.length ? <ul>{assistantPriests.map((priest, index) => <li key={priest.id || index}>{priestName(priest) || 'Name not provided'}</li>)}</ul> : <p className="parish-information-note">No assistant priest records are available.</p>}</div>
                  </article>
                ) : null}
              </div>
            ) : <EmptyState compact icon={UserRound} title="No clergy assignments listed" description="Parish leadership information has not been added yet." />}
          </section>

          <section className="parish-location-section parish-content-card" aria-labelledby="parish-location-heading">
            <div className="parish-section-heading"><div><p className="admin-eyebrow">Visit</p><h2 id="parish-location-heading">Location</h2></div></div>
            {church.address || coordinates ? (
              <div className="parish-location-card">
                <div className="parish-location-summary">
                  <span className="parish-location-icon" aria-hidden="true"><MapPin size={19} /></span>
                  <div>
                    <h3>Parish address</h3>
                    <p>{church.address || 'Address not provided.'}</p>
                    {coordinates ? <p className="parish-coordinates">Coordinates: {coordinates.lat}, {coordinates.lng}</p> : null}
                    {directionsHref ? <a className="parish-directions-link" href={directionsHref} target="_blank" rel="noopener noreferrer">Get directions <ExternalLink size={14} aria-hidden="true" /></a> : null}
                  </div>
                </div>
                {mapSource ? <LazyIframe src={mapSource} title={`Map to ${church.name}`} className="parish-location-map" /> : null}
              </div>
            ) : <EmptyState compact icon={MapPin} title="Location not provided" description="A parish address or coordinates have not been added yet." />}
          </section>
        </div>

        <aside className="public-detail-panel parish-info-panel" aria-labelledby="parish-info-heading">
          <p className="admin-eyebrow">At a glance</p>
          <h2 id="parish-info-heading">Parish information</h2>
          <dl className="public-detail-list">
            {church.patronSaint ? <div><dt>Patron saint</dt><dd>{church.patronSaint}</dd></div> : null}
            {church.status ? <div><dt>Status</dt><dd>{church.status}</dd></div> : null}
            {church.secretary ? <div><dt>Secretary</dt><dd>{church.secretary}</dd></div> : null}
          </dl>
          {!church.patronSaint && !church.status && !church.secretary ? <p className="parish-information-note">Information not yet available.</p> : null}
        </aside>
      </div>

      <section className="parish-related-section" aria-labelledby="other-parishes-heading">
        <div className="parish-section-heading"><div><p className="admin-eyebrow">Explore</p><h2 id="other-parishes-heading">Other parishes</h2></div><Link to="/parishes" className="parish-view-all">View all parishes <ArrowRight size={15} aria-hidden="true" /></Link></div>
        {loading ? <SkeletonGrid count={3} /> : error ? <ErrorState compact description="Other parishes could not be loaded." onRetry={() => void refetch()} /> : relatedParishes.length ? (
          <div className="public-card-grid parish-related-grid">
            {relatedParishes.map(parish => (
              <article key={parish.id} className="public-media-card">
                <div className="public-media-card-figure" aria-hidden="true">
                  {parish.image ? <SmartImage src={parish.image} alt="" /> : <span className="public-parish-placeholder"><ChurchIcon size={26} /></span>}
                </div>
                <div className="public-media-card-body">
                  <p className="admin-eyebrow">{parish.status || 'Church'}</p>
                  <h3>{parish.name}</h3>
                  {parish.address ? <p>{parish.address}</p> : null}
                  <Link to={`/parishes/${parish.id}`} className="read-more-btn">View parish <ArrowRight size={14} aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        ) : <EmptyState compact icon={ChurchIcon} title="No other parishes listed" description="More parish records will appear here when available." />}
      </section>
    </div>
  );
}
