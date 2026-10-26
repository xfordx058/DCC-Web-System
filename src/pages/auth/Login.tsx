import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { auth, firebaseSignInWithEmailAndPassword } from '@/db/firebase';
import { setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail } from 'firebase/auth';
import { DIOCESE_SEAL_URL } from '@/lib/brand';
import SmartImage from '@/components/ui/SmartImage';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(
    () => (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/admin',
    [location.state]
  );

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setFormError('');
    setEmailError('');
    setPasswordError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Please enter your admin email.');
      emailRef.current?.focus();
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      passwordRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      const persistence = remember ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      await firebaseSignInWithEmailAndPassword(auth, trimmedEmail, password);
      toast('success', 'Signed in successfully');
      navigate(from, { replace: true });
    } catch {
      setFormError('Unable to sign in. Please check your email and password.');
      toast('error', 'Unable to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (sendingReset) return;
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Enter your email above, then request a reset link.');
      emailRef.current?.focus();
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      emailRef.current?.focus();
      return;
    }
    setSendingReset(true);
    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      toast('success', 'Password reset email sent.');
    } catch {
      toast('error', 'Failed to send reset email.');
    } finally {
      setSendingReset(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-brand" aria-label="Diocese of Catarman">
        <div className="login-brand-inner">
          <SmartImage
            src={DIOCESE_SEAL_URL}
            alt="Coat of arms of the Diocese of Catarman"
            className="login-brand-logo"
            loading="eager"
          />
          <h1 className="login-brand-title">Diocese of Catarman</h1>
          <p className="login-brand-text">
            Secure administrative portal for managing content, personnel, and parish operations.
          </p>
          <span className="login-badge">
            <ShieldCheck className="login-badge-icon" aria-hidden="true" />
            <span>Encrypted &amp; Secured Connection</span>
          </span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-content">
          <header className="login-heading">
            <h2>Welcome back</h2>
            <p>Please enter your credentials to access the system.</p>
          </header>

          <div className="login-card">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="admin-email">Admin Email</label>
                <div className="login-input-wrap">
                  <Mail className="login-input-icon" aria-hidden="true" />
                  <input
                    ref={emailRef}
                    id="admin-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoFocus
                    placeholder="admin@diocese.com"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    aria-required="true"
                    aria-invalid={emailError ? true : undefined}
                    aria-describedby={emailError ? 'admin-email-error' : undefined}
                  />
                </div>
                {emailError && (
                  <p id="admin-email-error" className="login-error" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="login-field">
                <label htmlFor="admin-password">Password</label>
                <div className="login-input-wrap">
                  <Lock className="login-input-icon" aria-hidden="true" />
                  <input
                    ref={passwordRef}
                    id="admin-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    aria-required="true"
                    aria-invalid={passwordError ? true : undefined}
                    aria-describedby={passwordError ? 'admin-password-error' : undefined}
                  />
                  <button
                    type="button"
                    className="login-reveal"
                    onClick={() => setShowPassword(value => !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                  </button>
                </div>
                {passwordError && (
                  <p id="admin-password-error" className="login-error" role="alert">
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="login-row">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="login-forgot"
                  onClick={handleForgot}
                  disabled={sendingReset}
                  aria-busy={sendingReset}
                >
                  {sendingReset ? 'Sending reset link…' : 'Forgot password?'}
                </button>
              </div>

              {formError && (
                <p className="login-error login-error-form" role="alert" aria-live="assertive">
                  {formError}
                </p>
              )}

              <button type="submit" className="login-submit" disabled={loading} aria-busy={loading}>
                {loading && <span className="login-spinner" aria-hidden="true" />}
                {loading ? 'Signing in…' : 'Sign In to Dashboard'}
              </button>

              <Link to="/" className="login-return">
                <ArrowLeft className="login-return-icon" aria-hidden="true" />
                Return to Public Website
              </Link>
            </form>
          </div>

          <p className="login-notice">
            By logging in, you agree to our strict access policies and confidentiality agreements.
            Unauthorized access is prohibited.
          </p>
        </div>
      </section>
    </main>
  );
}
