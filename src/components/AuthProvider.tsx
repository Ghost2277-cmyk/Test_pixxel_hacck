"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DummyUser {
  uid: string;
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: DummyUser | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  signup: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DummyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load dummy user from localStorage if present
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("dummy_user");
      if (stored) {
        try {
          const parsedUser = JSON.parse(stored);
          setUser(parsedUser);
          
          const dummyProfile = {
            uid: parsedUser.uid,
            email: parsedUser.email,
            displayName: parsedUser.displayName,
            createdAt: Date.now(),
            onboardingCompleted: true,
            streak: 1,
            coins: 500,
            xp: 1000,
            level: 'Guardian',
            ecoScore: 100,
            inventory: [],
            islandLevel: 5,
            lifeTreeLevel: 5,
            unlockedItems: [],
            personality: 'Eco Warrior',
            answers: {}
          };
          
          import('@/store/useEarthStore').then(({ useEarthStore }) => {
            useEarthStore.getState().syncProfile(dummyProfile);
          });
        } catch {}
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const dummy = { uid: "dummy-" + Date.now(), email, displayName: email.split("@")[0] };
    localStorage.setItem("dummy_user", JSON.stringify(dummy));
    setUser(dummy);
  };

  const signup = (email: string, password: string, name: string) => {
    const dummy = { uid: "dummy-" + Date.now(), email, displayName: name };
    localStorage.setItem("dummy_user", JSON.stringify(dummy));
    setUser(dummy);
  };

  const logout = () => {
    localStorage.removeItem("dummy_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
