import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  country: string;
  ageGroup: string;
  ecoScore: number;
  level: string;
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
    level: "Newcomer",
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
