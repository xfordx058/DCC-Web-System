import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  chunkError: boolean;
}

const CHUNK_RELOAD_KEY = 'dcc:chunk-reload-at';
const CHUNK_RELOAD_WINDOW = 10_000;

function isChunkLoadError(error: Error | null) {
  const message = String(error?.message ?? '');
  return /dynamically imported module|Importing a module script failed|Loading chunk|ChunkLoadError/i.test(message);
}

/**
 * A stale tab can request a hashed route chunk that no longer exists after a
 * deployment. Reload once (rate-limited) to pick up the new build instead of
 * showing a generic crash screen.
 */
function reloadOnceForChunkError() {
  try {
    const last = Number(window.sessionStorage.getItem(CHUNK_RELOAD_KEY) ?? 0);
    if (Date.now() - last < CHUNK_RELOAD_WINDOW) return false;
    window.sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
    window.location.reload();
    return true;
  } catch {
    window.location.reload();
    return true;
  }
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null, chunkError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, chunkError: isChunkLoadError(error) };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
    if (isChunkLoadError(error)) {
      reloadOnceForChunkError();
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    const chunkError = this.state.chunkError;

    return (
      <div className="ui-error-boundary" role="alert" aria-live="assertive">
        <div className="ui-error-boundary-card">
          <div className="ui-error-boundary-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>
          <h1>{chunkError ? 'A new version is available' : 'Something went wrong'}</h1>
          <p>
            {chunkError
              ? 'This page was updated while you were browsing. Reload to continue with the latest version.'
              : 'An unexpected error occurred while rendering this page. Please reload to try again.'}
          </p>
          <button type="button" onClick={this.handleReload} className="ui-btn ui-btn-primary">
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
