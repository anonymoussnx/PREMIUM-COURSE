// Firebase app + services singleton
// All other files import from here — never initialize Firebase more than once

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase (singleton pattern — safe for Next.js SSR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
