
// src/lib/firebase.tsx
'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'studio-645573664-a93eb',
  appId: '1:77741898145:web:75daff6ea5e26ed19a73e0',
  apiKey: 'AIzaSyA-X4jdcAaH8umf8I42xWoiApUlyH-EIXs',
  authDomain: 'studio-645573664-a93eb.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '77741898145',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Auth context
const AuthContext = createContext<{
  user: any;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { auth };
