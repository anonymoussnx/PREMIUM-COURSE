// Firebase configuration
// Reads from .env.local — falls back to hardcoded values for local dev
// NEVER commit real API keys to git without this dual-source approach

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCQU4s-uZQJ3D0oMPFBPZot2_kvDyrmixE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "premium-course-ea6f9.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "premium-course-ea6f9",
  storageBucket: "premium-course-ea6f9.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "96495897862",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:96495897862:web:0eafa81d64a2a776972287",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-BH77LKDZD9",
};

// Firebase is now active with real credentials
export const MOCK_MODE = false;
