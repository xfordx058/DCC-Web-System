import { useRealtimeCollection } from '@/components/admin/AdminPrimitives';

export default function Statistics() {
  const { items: churches, loading: churchesLoading } = useRealtimeCollection('churches');
  const { items: priests, loading: priestsLoading } = useRealtimeCollection('priests');
  const { items: bishops, loading: bishopsLoading } = useRealtimeCollection('bishops');
  const loading = churchesLoading || priestsLoading || bishopsLoading;

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">A living Diocese</p>
        <h1>Diocese Statistics</h1>
        <p>Explore the communities and ministers serving Northern Samar.</p>
      </header>
      <section className="public-statistics public-statistics-page">
        <div><strong>{loading ? '?' : churches.length}</strong><span>Total churches and mission centers</span></div>
        <div><strong>{loading ? '?' : priests.length}</strong><span>Total priests serving the Diocese</span></div>
        <div><strong>{loading ? '?' : bishops.length}</strong><span>Bishops recorded in diocesan history</span></div>
        <div><strong>1</strong><span>Diocese united in faith and service</span></div>
      </section>
    </div>
  );
}
