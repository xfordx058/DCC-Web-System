import { useMemo } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, deleteUser, getAuth, signOut, type Auth } from 'firebase/auth';
import { auth, db, get, ref, set } from '@/db/firebase';
import { useRealtimeCollection } from '@/lib/firebase-data';

const SECONDARY_APP_NAME = 'dcc-admin-provision';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_ADMIN_PASSWORD_LENGTH = 8;

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

export function useAdmins(): { admins: AdminAccount[]; loading: boolean; error: boolean } {
  const { items, loading, error } = useRealtimeCollection('admins');

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

  return { admins, loading, error };
}

/** Membership in the `admins` node is what makes a signed-in user an administrator. */
export function isAdministrator(uid: string | null | undefined, admins: AdminAccount[]): boolean {
  if (!uid) return false;
  return admins.some(admin => admin.id === uid);
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

  if (name.length < 2) throw new Error("Enter the administrator's full name.");
  if (!EMAIL_PATTERN.test(email)) throw new Error('Enter a valid email address.');
  if (password.length < MIN_ADMIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.`);
  }

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
