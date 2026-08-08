import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Seeds' | 'Decorations' | 'Pets' | 'Earth' | 'Collectibles' | 'Special';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  quantity: number;
  description: string;
  icon?: string;
  isEquipped?: boolean;
  isPlaced?: boolean;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  country: string;
  ageGroup: string;
  ecoScore: number;
  xp: number;
  level: string;
  coins: number;
  streak: number;
  lastClaimDate: string | null;
  islandLevel: number;
  lifeTreeLevel: number;
  unlockedItems: string[];
  inventory: InventoryItem[];
  personality: string;
  answers: Record<string, string>;
  createdAt: string;
}

/**
 * Creates a new user profile document in Firestore
 */
export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  if (!db) return; // Fallback for local testing if DB not configured
  
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...data,
    ecoScore: 0,
    xp: 0,
    level: "Seed",
    coins: 0,
    streak: 0,
    lastClaimDate: null,
    islandLevel: 1,
    lifeTreeLevel: 1,
    unlockedItems: [],
    inventory: [],
    personality: "Explorer",
    answers: {},
    createdAt: new Date().toISOString(),
  });
}

/**
 * Updates the user's Eco DNA answers and recalculates their basic score
 */
export async function saveEcoDNA(uid: string, answers: Record<string, string>, score: number) {
  if (!db) return;

  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    answers,
    ecoScore: score,
    level: score > 80 ? "Forest Guardian" : score > 50 ? "Eco Explorer" : "Seedling",
    personality: "Sustainability Advocate"
  });
}

/**
 * Fetches the user profile
 */
export async function getUserProfile(uid: string) {
  if (!db) return null;
  
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data() as UserProfile;
  }
  return null;
}

/**
 * Updates user progression (XP, Coins, Levels)
 */
export async function updateUserProgress(uid: string, updates: Partial<UserProfile>) {
  if (!db) return;
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, updates);
}

/**
 * Claims daily reward and updates streak
 */
export async function claimDailyReward(uid: string, currentStreak: number, currentCoins: number, currentXp: number) {
  if (!db) return null;
  const userRef = doc(db, 'users', uid);
  
  const newStreak = currentStreak + 1;
  const rewardCoins = 50 + (Math.min(newStreak, 7) * 25); // Scale reward up to 7 days
  const rewardXp = 50;

  const updates = {
    streak: newStreak,
    coins: currentCoins + rewardCoins,
    xp: currentXp + rewardXp,
    lastClaimDate: new Date().toISOString().split('T')[0] // Store only YYYY-MM-DD
  };

  await updateDoc(userRef, updates);
  return { rewardCoins, rewardXp, newStreak };
}
