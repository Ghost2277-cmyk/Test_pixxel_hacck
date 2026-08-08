import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyD-8GmVYpy_o97wr9Ptux0YXWlf8Yf8HT8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "ecolife-production.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "ecolife-production",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "ecolife-production.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "205871938939",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:205871938939:web:131d43fd16f3b56e23d1de",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-0F337NP33Q",
};

// Initialize Firebase only if we have a valid config (prevent errors if not set or default)
const isValidConfig = firebaseConfig.apiKey && firebaseConfig.apiKey.length > 10 && firebaseConfig.apiKey !== 'your_api_key_here';
const app = getApps().length > 0 ? getApp() : (isValidConfig ? initializeApp(firebaseConfig) : null);
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;

const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
