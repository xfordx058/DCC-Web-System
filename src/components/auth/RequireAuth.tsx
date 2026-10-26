import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isAdministrator, useAdmins } from '@/lib/admins';
import { ErrorState, Spinner } from '@/components/ui/states';

/**
 * Gate for the admin area.
 *
 * Being signed in is not enough: membership in the realtime `admins` node is
 * the source of truth for administrator access, matching the checks used when
 * provisioning accounts. Firebase security rules remain the real enforcement —
 * this only prevents signed-in non-administrators from seeing the workspace.
 */
export default function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user, loading, logout } = useAuth();
  const { admins, loading: adminsLoading, error, refetch } = useAdmins();
  const location = useLocation();

  if (loading || (user && adminsLoading)) {
    return (
      <div className="admin-auth-state" role="status" aria-live="polite">
        <Spinner label="Checking authentication" />
        <p>Checking your access…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (error) {
    return (
      <div className="admin-auth-state">
        <ErrorState
          title="We couldn’t verify your access"
          description="The administrator list could not be loaded. Check your connection and try again."
          onRetry={() => void refetch()}
          className="admin-auth-card"
        />
        <button type="button" className="ui-btn ui-btn-secondary" onClick={() => void logout()}>
          Sign out
        </button>
      </div>
    );
  }

  if (!isAdministrator(user.uid, admins)) {
    return (
      <main className="admin-auth-state">
        <div className="admin-auth-card ui-state is-error" role="alert">
          <span className="ui-state-icon" aria-hidden="true">
            <ShieldAlert size={20} />
          </span>
          <p className="ui-state-title">This account is not an administrator</p>
          <p className="ui-state-text">
            You are signed in as {user.email ?? 'this account'}, but it is not registered for admin access. Ask an
            existing administrator to add you, or sign out and use an administrator account.
          </p>
          <div className="ui-state-action">
            <button type="button" className="ui-btn ui-btn-primary" onClick={() => void logout()}>
              Sign out
            </button>
            <Link to="/" className="ui-btn ui-btn-secondary">
              Return to public site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return children;
}
