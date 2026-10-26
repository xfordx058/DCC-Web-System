import { FormEvent, useEffect, useState } from 'react';
import { Eye, EyeOff, KeyRound, Mail, Save, UserPlus, UserRound, UsersRound } from 'lucide-react';
import { AdminField, AdminHeader } from '@/components/admin/AdminPrimitives';
import { AdminModal } from '@/components/admin/AdminModal';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { auth, db, ref, update, updateEmail, updatePassword, updateProfile } from '@/db/firebase';
import { recordActivity } from '@/lib/activity-log';
import { createAdministrator, isAdministrator, MIN_ADMIN_PASSWORD_LENGTH, useAdmins } from '@/lib/admins';
import { SkeletonList } from '@/components/ui/skeleton';
import { ErrorState, Spinner } from '@/components/ui/states';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AdministratorForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const emptyAdministratorForm: AdministratorForm = { name: '', email: '', password: '', confirmPassword: '' };

export default function AdminAccount() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { admins, loading: adminsLoading, error: adminsError, refetch: refetchAdmins } = useAdmins();

  const [name, setName] = useState(user?.displayName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageTone, setMessageTone] = useState<'success' | 'error'>('success');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [administratorOpen, setAdministratorOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [administratorForm, setAdministratorForm] = useState<AdministratorForm>(emptyAdministratorForm);
  const [administratorErrors, setAdministratorErrors] = useState<Record<string, string>>({});
  const [showAdministratorPassword, setShowAdministratorPassword] = useState(false);

  const canManageAdministrators = isAdministrator(user?.uid, admins);

  useEffect(() => {
    setName(user?.displayName ?? '');
    setEmail(user?.email ?? '');
  }, [user]);

  function openAdministratorForm() {
    setAdministratorForm(emptyAdministratorForm);
    setAdministratorErrors({});
    setShowAdministratorPassword(false);
    setAdministratorOpen(true);
  }

  async function saveAccount(event: FormEvent) {
    event.preventDefault();
    if (saving || !auth.currentUser) return;
    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageTone('error');
      return;
    }

    setSaving(true);
    try {
      const changed: string[] = [];
      if (name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
        changed.push('name');
      }
      if (email && email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, email);
        changed.push('email');
      }
      if (password) {
        await updatePassword(auth.currentUser, password);
        changed.push('password');
      }
      await update(ref(db, `admins/${auth.currentUser.uid}`), { name, email, updatedAt: new Date().toISOString() });

      setPassword('');
      setConfirmPassword('');
      setMessage('Account updated.');
      setMessageTone('success');
      toast('success', 'Account updated.');
      if (changed.length) {
        void recordActivity({
          source: 'Account',
          action: 'Updated administrator profile',
          details: `Changed ${changed.join(', ')}`,
        });
      }
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Unable to update account.';
      setMessage(text);
      setMessageTone('error');
      toast('error', text);
    } finally {
      setSaving(false);
    }
  }

  async function submitAdministrator(event: FormEvent) {
    event.preventDefault();
    if (creating) return;

    const formName = administratorForm.name.trim();
    const formEmail = administratorForm.email.trim().toLowerCase();
    const errors: Record<string, string> = {};
    if (formName.length < 2) errors.name = "Enter the administrator's full name.";
    if (!EMAIL_PATTERN.test(formEmail)) errors.email = 'Enter a valid email address.';
    if (administratorForm.password.length < MIN_ADMIN_PASSWORD_LENGTH) {
      errors.password = `Password must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.`;
    }
    if (administratorForm.password !== administratorForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    setAdministratorErrors(errors);
    if (Object.keys(errors).length) return;

    setCreating(true);
    try {
      const created = await createAdministrator({
        name: formName,
        email: formEmail,
        password: administratorForm.password,
      });
      setAdministratorOpen(false);
      setAdministratorForm(emptyAdministratorForm);
      toast('success', `Administrator ${created.email} created.`);
      void recordActivity({
        source: 'Account',
        action: 'Created administrator account',
        details: created.email,
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Unable to create administrator.';
      setAdministratorErrors({ form: text });
      toast('error', text);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="admin-page">
      <AdminHeader title="Account" description="Review and update the authenticated administrator profile." />

      <form onSubmit={saveAccount} className="admin-editor admin-account-form">
        <div className="admin-account-summary">
          <div className="admin-avatar">{(name || email || 'A').slice(0, 1).toUpperCase()}</div>
          <div className="admin-account-identity">
            <strong>{name || 'Administrator'}</strong>
            <p><Mail size={12} aria-hidden /> {user?.email || 'No email on file'}</p>
            <small title={user?.uid ?? ''}>Account ID {user?.uid ? user.uid.slice(0, 8) : '—'}</small>
          </div>
        </div>
        <div className="admin-form-grid">
          <AdminField label="Name">
            <div className="admin-input-wrap has-icon">
              <span className="admin-input-icon" aria-hidden="true"><UserRound size={16} /></span>
              <input autoComplete="name" value={name} onChange={event => setName(event.target.value)} />
            </div>
          </AdminField>
          <AdminField label="Email">
            <div className="admin-input-wrap has-icon">
              <span className="admin-input-icon" aria-hidden="true"><Mail size={16} /></span>
              <input type="email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} />
            </div>
          </AdminField>
          <AdminField label="New password" className="admin-field-password">
            <div className="admin-input-wrap has-icon has-reveal">
              <span className="admin-input-icon" aria-hidden="true"><KeyRound size={16} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="admin-input-reveal"
                onClick={() => setShowPassword(value => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
              </button>
            </div>
            <small className="admin-hint">Leave blank to keep your current password.</small>
          </AdminField>
          <AdminField label="Confirm password" className="admin-field-password">
            <div className="admin-input-wrap has-icon has-reveal">
              <span className="admin-input-icon" aria-hidden="true"><KeyRound size={16} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
              />
              <button
                type="button"
                className="admin-input-reveal"
                onClick={() => setShowPassword(value => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
              </button>
            </div>
            {password && confirmPassword && password !== confirmPassword ? (
              <small className="admin-error" role="alert">Passwords do not match.</small>
            ) : null}
          </AdminField>
          <div className="admin-form-actions">
            <Button type="submit" disabled={saving} className="gap-2" aria-busy={saving}>
              {saving ? <Spinner label="Saving" /> : <Save size={16} aria-hidden />}
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
            {message ? (
              <span
                className={`admin-form-message ${messageTone === 'error' ? 'is-error' : 'is-success'}`}
                role={messageTone === 'error' ? 'alert' : 'status'}
              >
                {message}
              </span>
            ) : null}
          </div>
        </div>
      </form>

      <section className="admin-table-section admin-administrators">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">Access</p>
            <h2 className="admin-heading-with-icon"><UsersRound size={17} aria-hidden /> Administrators</h2>
          </div>
          {canManageAdministrators ? (
            <Button type="button" onClick={openAdministratorForm} className="gap-2">
              <UserPlus size={16} aria-hidden /> Add administrator
            </Button>
          ) : null}
        </div>

        {adminsLoading ? (
          <SkeletonList rows={3} />
        ) : adminsError ? (
          <ErrorState
            compact
            title="Unable to load administrators"
            description="The administrator list could not be reached. Try again."
            onRetry={() => void refetchAdmins()}
          />
        ) : canManageAdministrators ? (
          admins.length ? (
            <div className="admin-list">
              {admins.map(admin => (
                <div key={admin.id}>
                  <div className="admin-list-identity">
                    <span className="admin-avatar-sm" aria-hidden="true">
                      {(admin.name || admin.email || 'A').slice(0, 1).toUpperCase()}
                    </span>
                    <div>
                      <strong>{admin.name || admin.email || 'Administrator'}</strong>
                      <small>{admin.email || 'No email on file'}{admin.id === user?.uid ? ' · You' : ''}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-empty">No administrators registered yet.</p>
          )
        ) : (
          <p className="admin-empty">Only registered administrators can review or add administrator accounts.</p>
        )}
      </section>

      <AdminModal
        open={administratorOpen}
        onClose={() => setAdministratorOpen(false)}
        eyebrow="Access"
        title="Add administrator"
        description="Create sign-in credentials for another administrator. New administrators receive full access to the admin portal."
        icon={<UserPlus size={20} aria-hidden />}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => setAdministratorOpen(false)} disabled={creating}>
              Cancel
            </Button>
            <Button type="submit" form="administrator-form" disabled={creating} aria-busy={creating}>
              {creating ? <Spinner className="mr-2" label="Creating administrator" /> : null}
              {creating ? 'Creating…' : 'Create administrator'}
            </Button>
          </>
        }
      >
        <form id="administrator-form" className="admin-form-grid" onSubmit={submitAdministrator}>
          <AdminField label="Full name">
            <div className="admin-input-wrap has-icon">
              <span className="admin-input-icon" aria-hidden="true"><UserRound size={16} /></span>
              <input
                id="new-admin-name"
                autoComplete="off"
                aria-required="true"
                aria-invalid={Boolean(administratorErrors.name)}
                aria-describedby={administratorErrors.name ? 'new-admin-name-error' : undefined}
                value={administratorForm.name}
                onChange={event => setAdministratorForm(current => ({ ...current, name: event.target.value }))}
              />
            </div>
            {administratorErrors.name ? (
              <small id="new-admin-name-error" className="admin-error" role="alert">{administratorErrors.name}</small>
            ) : null}
          </AdminField>
          <AdminField label="Email address">
            <div className="admin-input-wrap has-icon">
              <span className="admin-input-icon" aria-hidden="true"><Mail size={16} /></span>
              <input
                id="new-admin-email"
                type="email"
                autoComplete="off"
                aria-required="true"
                aria-invalid={Boolean(administratorErrors.email)}
                aria-describedby={administratorErrors.email ? 'new-admin-email-error' : undefined}
                value={administratorForm.email}
                onChange={event => setAdministratorForm(current => ({ ...current, email: event.target.value }))}
              />
            </div>
            {administratorErrors.email ? (
              <small id="new-admin-email-error" className="admin-error" role="alert">{administratorErrors.email}</small>
            ) : null}
          </AdminField>
          <AdminField label="Password" className="admin-field-password">
            <div className="admin-input-wrap has-icon has-reveal">
              <span className="admin-input-icon" aria-hidden="true"><KeyRound size={16} /></span>
              <input
                id="new-admin-password"
                type={showAdministratorPassword ? 'text' : 'password'}
                autoComplete="new-password"
                aria-required="true"
                aria-invalid={Boolean(administratorErrors.password)}
                aria-describedby={administratorErrors.password ? 'new-admin-password-error' : 'new-admin-password-hint'}
                value={administratorForm.password}
                onChange={event => setAdministratorForm(current => ({ ...current, password: event.target.value }))}
              />
              <button
                type="button"
                className="admin-input-reveal"
                onClick={() => setShowAdministratorPassword(value => !value)}
                aria-label={showAdministratorPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showAdministratorPassword}
              >
                {showAdministratorPassword ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
              </button>
            </div>
            {administratorErrors.password ? (
              <small id="new-admin-password-error" className="admin-error" role="alert">{administratorErrors.password}</small>
            ) : (
              <small id="new-admin-password-hint" className="admin-hint">Use at least {MIN_ADMIN_PASSWORD_LENGTH} characters.</small>
            )}
          </AdminField>
          <AdminField label="Confirm password" className="admin-field-password">
            <div className="admin-input-wrap has-icon has-reveal">
              <span className="admin-input-icon" aria-hidden="true"><KeyRound size={16} /></span>
              <input
                id="new-admin-password-confirm"
                type={showAdministratorPassword ? 'text' : 'password'}
                autoComplete="new-password"
                aria-required="true"
                aria-invalid={Boolean(administratorErrors.confirmPassword)}
                aria-describedby={administratorErrors.confirmPassword ? 'new-admin-password-confirm-error' : undefined}
                value={administratorForm.confirmPassword}
                onChange={event => setAdministratorForm(current => ({ ...current, confirmPassword: event.target.value }))}
              />
              <button
                type="button"
                className="admin-input-reveal"
                onClick={() => setShowAdministratorPassword(value => !value)}
                aria-label={showAdministratorPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showAdministratorPassword}
              >
                {showAdministratorPassword ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
              </button>
            </div>
            {administratorErrors.confirmPassword ? (
              <small id="new-admin-password-confirm-error" className="admin-error" role="alert">{administratorErrors.confirmPassword}</small>
            ) : null}
          </AdminField>
          {administratorErrors.form ? (
            <p className="admin-form-message is-error admin-field-full" role="alert">{administratorErrors.form}</p>
          ) : null}
        </form>
      </AdminModal>
    </div>
  );
}
