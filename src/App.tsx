import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import PublicLayout from './components/layouts/PublicLayout';
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import { AuthProvider } from './contexts/AuthContext';
import MaintenanceGate from './components/maintenance/MaintenanceGate';
import RequireAuth from './components/auth/RequireAuth';
import NotFound from './pages/public/NotFound';
import { Spinner } from './components/ui/states';

/**
 * Public pages are split per route so visitors only download what they view.
 * The home page stays eager because it is the most common entry point.
 */
const Clergy = lazy(() => import('./pages/public/Clergy'));
const Parishes = lazy(() => import('./pages/public/Parishes'));
const ChurchDetail = lazy(() => import('./pages/public/ChurchDetail'));
const Announcements = lazy(() => import('./pages/public/Announcements'));
const Events = lazy(() => import('./pages/public/Events'));
const Streams = lazy(() => import('./pages/public/Streams'));
const Statistics = lazy(() => import('./pages/public/Statistics'));
const YearOf = lazy(() => import('./pages/public/YearOf'));
const Contact = lazy(() => import('./pages/public/Contact'));
const PublicDonations = lazy(() => import('./pages/public/Donations'));
const Legal = lazy(() => import('./pages/public/Legal'));

/** The admin shell and screens are only needed after signing in. */
const AdminLayout = lazy(() => import('./components/layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminPriests = lazy(() => import('./pages/admin/Priests'));
const AdminBishops = lazy(() => import('./pages/admin/Bishops'));
const AdminChurches = lazy(() => import('./pages/admin/Churches'));
const AdminEvents = lazy(() => import('./pages/admin/Events'));
const AdminYearOf = lazy(() => import('./pages/admin/YearOf'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminLogs = lazy(() => import('./pages/admin/Logs'));
const AdminAccount = lazy(() => import('./pages/admin/Account'));
const AdminDonations = lazy(() => import('./pages/admin/Donations'));
const AdminHeroes = lazy(() => import('./pages/admin/Heroes'));
const AdminAnnouncements = lazy(() => import('./pages/admin/Announcements'));
const AdminStreams = lazy(() => import('./pages/admin/Streams'));
const AdminMaintenance = lazy(() => import('./pages/admin/Maintenance'));
const AdminWeather = lazy(() => import('./pages/admin/Weather'));

function BootScreen({ label }: { label: string }) {
  return (
    <div className="route-boot" role="status" aria-live="polite">
      <Spinner label={label} />
      <p>{label}</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<MaintenanceGate><PublicLayout /></MaintenanceGate>}>
              <Route index element={<Home />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="events" element={<Events />} />
              <Route path="streams" element={<Streams />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="year-of" element={<YearOf />} />
              <Route path="contact" element={<Contact />} />
              <Route path="donations" element={<PublicDonations />} />
              <Route path="terms" element={<Legal />} />
              <Route path="privacy-policy" element={<Legal />} />
              <Route path="clergy" element={<Clergy />} />
              <Route path="parishes" element={<Parishes />} />
              <Route path="parishes/:id" element={<ChurchDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <Suspense fallback={<BootScreen label="Loading admin workspace…" />}>
                    <AdminLayout />
                  </Suspense>
                </RequireAuth>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="priests" element={<AdminPriests />} />
              <Route path="bishops" element={<AdminBishops />} />
              <Route path="churches" element={<AdminChurches />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="yearof" element={<AdminYearOf />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="streams" element={<AdminStreams />} />
              <Route path="heroes" element={<AdminHeroes />} />
              <Route path="donations" element={<AdminDonations />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="logs" element={<AdminLogs />} />
              <Route path="account" element={<AdminAccount />} />
              <Route path="maintenance" element={<AdminMaintenance />} />
              <Route path="weather" element={<AdminWeather />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </ToastProvider>
    </AuthProvider>
  );
}
