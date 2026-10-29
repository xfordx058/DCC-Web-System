import { useEffect, useMemo, useState } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, deleteUser, getAuth, signOut, type Auth } from 'firebase/auth';
import { auth, db, get, onValue, ref, set } from '@/db/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeCollection } from '@/lib/firebase-data';

const SECONDARY_APP_NAME = 'dcc-admin-provision';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_ADMIN_PASSWORD_LENGTH = 6;
export const MAX_ADMIN_PASSWORD_LENGTH = 128;

export type AdministratorPasswordQuality = {
  lengthValid: boolean;
  characterTypes: number;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  containsPersonalInfo: boolean;
  strength: 'weak' | 'fair' | 'strong';
};

/** Shared live feedback and password policy for account provisioning. */
export function getAdministratorPasswordQuality(name: string, email: string, password: string): AdministratorPasswordQuality {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z\d]/.test(password);
  const characterGroups = [hasLowercase, hasUppercase, hasNumber, hasSymbol];
  const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const normalizedPassword = normalize(password);
  const personalParts = [
    ...name.split(/[^\p{L}\p{N}]+/u),
    ...(email.split('@')[0] ?? '').split(/[^\p{L}\p{N}]+/u),
  ].map(normalize).filter(part => part.length >= 3);

  const containsPersonalInfo = personalParts.some(part => normalizedPassword.includes(part));
  const characterTypes = characterGroups.filter(Boolean).length;
  const lengthValid = password.length >= MIN_ADMIN_PASSWORD_LENGTH && password.length <= MAX_ADMIN_PASSWORD_LENGTH;
  const strength = !lengthValid || characterTypes < 2 || containsPersonalInfo
    ? 'weak'
    : lengthValid && characterTypes >= 3 && password.length >= 10
      ? 'strong'
      : 'fair';

  return { lengthValid, characterTypes, hasLowercase, hasUppercase, hasNumber, hasSymbol, containsPersonalInfo, strength };
}

/** Shared password policy for both the form and the account provisioning call. */
export function getAdministratorPasswordError(name: string, email: string, password: string): string | null {
  const quality = getAdministratorPasswordQuality(name, email, password);
  if (password.length < MIN_ADMIN_PASSWORD_LENGTH) return `Use at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.`;
  if (password.length > MAX_ADMIN_PASSWORD_LENGTH) return `Use no more than ${MAX_ADMIN_PASSWORD_LENGTH} characters.`;
  if (quality.characterTypes < 3) return 'Use at least 3 of these: lowercase, uppercase, number, and symbol.';
  if (quality.containsPersonalInfo) return 'Password must not contain your name or any part of your email address.';
  return null;
}

export type AdminAccount = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
};

export type CreateAdministratorInput = {
  name: string;
  email: string;
  password: string;
};

let secondaryAuth: Auth | null = null;

/**
 * Auth instance for provisioning accounts. A secondary Firebase app keeps
 * the signed-in administrator's session untouched while a new account is
 * created (createUserWithEmailAndPassword always switches session on the
 * instance it runs against).
 */
function getProvisioningAuth(): Auth {
  if (!secondaryAuth) {
    const primary = getApps()[0];
    if (!primary) throw new Error('Firebase is not initialized.');
    const app = getApps().find(candidate => candidate.name === SECONDARY_APP_NAME)
      ?? initializeApp(primary.options, SECONDARY_APP_NAME);
    secondaryAuth = getAuth(app);
  }
  return secondaryAuth;
}

export function useAdmins(): { admins: AdminAccount[]; loading: boolean; error: boolean; refetch: () => Promise<void> } {
  const { items, loading, error, refetch } = useRealtimeCollection('admins');

  const admins = useMemo(
    () =>
      items.map(item => ({
        id: String(item.id),
        name: item.name ? String(item.name) : '',
        email: item.email ? String(item.email) : '',
        role: item.role ? String(item.role) : '',
        createdAt: item.createdAt ? String(item.createdAt) : '',
        updatedAt: item.updatedAt ? String(item.updatedAt) : '',
        createdBy: item.createdBy ? String(item.createdBy) : '',
      })),
    [items]
  );

  return { admins, loading, error, refetch };
}

/** Membership in the `admins` node is what makes a signed-in user an administrator. */
export function isAdministrator(uid: string | null | undefined, admins: AdminAccount[]): boolean {
  if (!uid) return false;
  return admins.some(admin => admin.id === uid);
}

/**
 * Checks the signed-in user's own admin record.
 *
 * Reading the whole `admins` collection is restricted to existing
 * administrators, but the rules allow a user to read their own entry. Looking up
 * just that entry keeps the access check working without exposing the directory.
 */
export function useAdminAccess(): {
  isAdmin: boolean;
  loading: boolean;
  error: boolean;
  refetch: () => void;
} {
  const { user, loading: authLoading } = useAuth();
  const uid = user?.uid ?? '';
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ uid: '', isAdmin: false, loading: true, error: false });
  const current = state.uid === uid
    ? state
    : { uid, isAdmin: false, loading: Boolean(uid) || authLoading, error: false };

  useEffect(() => {
    if (authLoading) {
      setState({ uid, isAdmin: false, loading: true, error: false });
      return;
    }

    if (!uid) {
      setState({ uid: '', isAdmin: false, loading: false, error: false });
      return;
    }

    setState({ uid, isAdmin: false, loading: true, error: false });
    const stop = onValue(
      ref(db, `admins/${uid}`),
      snapshot => setState({ uid, isAdmin: snapshot.exists(), loading: false, error: false }),
      () => setState({ uid, isAdmin: false, loading: false, error: true })
    );
    return stop;
  }, [attempt, authLoading, uid]);

  return { ...current, refetch: () => setAttempt(value => value + 1) };
}

function friendlyCreateError(error: unknown): string {
  const code = typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: string }).code)
    : '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account already exists for that email address.';
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/weak-password':
      return `Password must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.`;
    case 'auth/operation-not-allowed':
      return 'Email and password sign-in is disabled for this project.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      return 'Unable to create the administrator account. Please try again.';
  }
}

/**
 * Creates a new administrator: provisions the Firebase Auth account,
 * registers it under `admins/<uid>`, and rolls the account back if the
 * registration write fails so no orphaned accounts are left behind.
 *
 * Callers must already be a registered administrator; the check is
 * re-verified against the database immediately before provisioning so a
 * stale UI state cannot grant access.
 */
export async function createAdministrator(input: CreateAdministratorInput): Promise<{ uid: string; email: string }> {
  const caller = auth.currentUser;
  if (!caller) throw new Error('Sign in to add an administrator.');

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (name.length < 2 || name.length > 100) throw new Error('Enter a name between 2 and 100 characters.');
  if (!EMAIL_PATTERN.test(email) || email.length > 254) throw new Error('Enter a valid email address.');
  const passwordError = getAdministratorPasswordError(name, email, password);
  if (passwordError) throw new Error(passwordError);

  const snapshot = await get(ref(db, 'admins'));
  const registered = snapshot.val() ?? {};
  if (!Object.prototype.hasOwnProperty.call(registered, caller.uid)) {
    throw new Error('Only registered administrators can add new administrators.');
  }

  const secondary = getProvisioningAuth();
  let uid = '';
  try {
    const credential = await createUserWithEmailAndPassword(secondary, email, password);
    uid = credential.user.uid;
  } catch (error) {
    throw new Error(friendlyCreateError(error));
  }

  try {
    await set(ref(db, `admins/${uid}`), {
      name,
      email,
      role: 'admin',
      createdAt: new Date().toISOString(),
      createdBy: caller.uid,
    });
  } catch (error) {
    try {
      const current = secondary.currentUser;
      if (current) await deleteUser(current);
    } catch {
      console.error('Unable to roll back partially created administrator account', error);
    }
    throw new Error('Unable to register the new administrator. Please try again.');
  } finally {
    try {
      await signOut(secondary);
    } catch {
      // Provisioning session cleanup is best-effort only.
    }
  }

  return { uid, email };
}
