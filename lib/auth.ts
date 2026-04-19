// Authentication helpers — wraps Firebase Auth for use throughout the app

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";
import { createUserDocument } from "./firestore";

const googleProvider = new GoogleAuthProvider();

// ─── Register with email + password ───────────────────────────────────
export async function registerWithEmail(
  name: string,
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Set display name
    await updateProfile(result.user, { displayName: name });
    // Create Firestore user document
    await createUserDocument(result.user, { displayName: name });
    return { user: result.user, error: null };
  } catch (err: any) {
    return { user: null, error: formatAuthError(err.code) };
  }
}

// ─── Sign in with email + password ────────────────────────────────────
export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (err: any) {
    return { user: null, error: formatAuthError(err.code) };
  }
}

// ─── Sign in with Google ───────────────────────────────────────────────
export async function signInWithGoogle(): Promise<{ user: User | null; error: string | null }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Create/update Firestore user document for Google users
    await createUserDocument(result.user, {});
    return { user: result.user, error: null };
  } catch (err: any) {
    return { user: null, error: formatAuthError(err.code) };
  }
}

// ─── Sign out ──────────────────────────────────────────────────────────
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

// ─── Password reset ────────────────────────────────────────────────────
export async function resetPassword(email: string): Promise<{ error: string | null }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (err: any) {
    return { error: formatAuthError(err.code) };
  }
}

// ─── Auth state listener ───────────────────────────────────────────────
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// ─── Error message formatter ───────────────────────────────────────────
function formatAuthError(code: string): string {
  const errors: Record<string, string> = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
    "auth/network-request-failed": "Network error. Check your internet connection.",
    "auth/popup-closed-by-user": "Sign-in cancelled.",
    "auth/cancelled-popup-request": "Sign-in cancelled.",
    "auth/invalid-credential": "Incorrect email or password.",
  };
  return errors[code] || `Authentication error (${code}). Please try again.`;
}
