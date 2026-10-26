import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Page not found</p>
        <h1>We couldn’t find that page</h1>
        <p>The page may have been moved, renamed, or is no longer available.</p>
      </header>

      <section className="public-content-card not-found-card">
        <span className="not-found-code" aria-hidden="true">
          404
        </span>
        <div>
          <h2>Looking for something else?</h2>
          <p>Visit the homepage for the latest diocesan news, or browse the parish directory.</p>
          <div className="not-found-actions">
            <Link to="/" className="ui-btn ui-btn-primary">
              <Home size={15} aria-hidden="true" />
              Back to home
            </Link>
            <Link to="/parishes" className="ui-btn ui-btn-secondary">
              <Compass size={15} aria-hidden="true" />
              Browse parishes
            </Link>
            <Link to="/contact" className="ui-btn ui-btn-ghost">
              <ArrowLeft size={15} aria-hidden="true" />
              Contact the Diocese
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
