"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile, UserProfile } from "@/lib/db";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      // DEMO MODE BYPASS
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        const dummyUser = { uid: 'demo-user-123', email: 'demo@ecolife.app', displayName: 'Eco Hero' } as User;
        const dummyProfile: UserProfile = {
          uid: 'demo-user-123',
          email: 'demo@ecolife.app',
          displayName: 'Eco Hero',
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
        setUser(dummyUser);
        setUserProfile(dummyProfile);
        
        import('@/store/useEarthStore').then(({ useEarthStore }) => {
          useEarthStore.getState().syncProfile(dummyProfile);
        });
      }
      
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const profile = await getUserProfile(currentUser.uid);
          setUserProfile(profile);
          if (profile) {
            const { useEarthStore } = await import('@/store/useEarthStore');
            useEarthStore.getState().syncProfile(profile);
          }
        } catch (error) {
          console.error("Failed to load user profile", error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
