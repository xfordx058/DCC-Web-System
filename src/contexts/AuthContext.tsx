import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  auth,
  firebaseSignInWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  type User,
} from '@/db/firebase';
import { recordActivity } from '@/lib/activity-log';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await firebaseSignInWithEmailAndPassword(auth, email, password);
      await recordActivity({ source: 'Authentication', action: 'Admin signed in', details: email });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await recordActivity({ source: 'Authentication', action: 'Admin signed out', details: auth.currentUser?.email ?? '' });
      await firebaseSignOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
