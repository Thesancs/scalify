// src/lib/firebase.tsx
'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, onIdTokenChanged, type User } from 'firebase/auth';
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

// Type for custom claims, including the role
interface CustomClaims {
    role?: 'Owner' | 'Admin' | 'Membro';
    [key: string]: any;
}

// Extended user type to include role
export interface AppUser extends User {
    role?: CustomClaims['role'];
}


// Auth context
const AuthContext = createContext<{
  user: AppUser | null;
  loading: boolean;
  role: CustomClaims['role'] | null;
}>({
  user: null,
  loading: true,
  role: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<CustomClaims['role'] | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const claims = tokenResult.claims as CustomClaims;
        // HACK: For development, grant 'Owner' role to a specific email
        // or default to 'Membro'. In a real app, this logic should be
        // handled securely on a backend.
        const userRole = claims.role || (user.email === 'agenciasancs@gmail.com' ? 'Owner' : 'Membro');
        
        const userWithRole: AppUser = { ...user, role: userRole };

        setUser(userWithRole);
        setRole(userWithRole.role);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { auth };
