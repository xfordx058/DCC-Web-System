import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import PublicLayout from './components/layouts/PublicLayout';
import Home from './pages/public/Home';
import Clergy from './pages/public/Clergy';
import Parishes from './pages/public/Parishes';
import ChurchDetail from './pages/public/ChurchDetail';
import Announcements from './pages/public/Announcements';
import Events from './pages/public/Events';
import Streams from './pages/public/Streams';
import Statistics from './pages/public/Statistics';
import YearOf from './pages/public/YearOf';
import Contact from './pages/public/Contact';
import PublicDonations from './pages/public/Donations';
import Login from './pages/auth/Login';
import { AuthProvider } from './contexts/AuthContext';
import MaintenanceGate from './components/maintenance/MaintenanceGate';

// Admin
import AdminLayout from './components/layouts/AdminLayout';
import RequireAuth from './components/auth/RequireAuth';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPriests from './pages/admin/Priests';
import AdminBishops from './pages/admin/Bishops';
import AdminChurches from './pages/admin/Churches';
import AdminEvents from './pages/admin/Events';
import AdminYearOf from './pages/admin/YearOf';
import AdminSettings from './pages/admin/Settings';
import AdminLogs from './pages/admin/Logs';
import AdminAccount from './pages/admin/Account';
import AdminDonations from './pages/admin/Donations';
import AdminHeroes from './pages/admin/Heroes';
import AdminAnnouncements from './pages/admin/Announcements';
import AdminStreams from './pages/admin/Streams';
import AdminMaintenance from './pages/admin/Maintenance';
import AdminWeather from './pages/admin/Weather';

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
              <Route path="clergy" element={<Clergy />} />
              <Route path="parishes" element={<Parishes />} />
              <Route path="parishes/:id" element={<ChurchDetail />} />
            </Route>

            {/* Admin Routes (placeholders) */}
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminLayout />
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
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </ToastProvider>
    </AuthProvider>
  );
}
