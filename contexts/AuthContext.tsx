"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type User } from "firebase/auth";
import { onAuthChange } from "@/lib/auth";
import { getUserDocument, type UserDocument } from "@/lib/firestore";

// ─── Types ──────────────────────────────────────────────────────────────
interface AuthContextValue {
  user: User | null;
  userDoc: UserDocument | null;
  loading: boolean;
  isAdmin: boolean;
  isEnrolled: (courseId: string) => boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue>({
  user: null,
  userDoc: null,
  loading: true,
  isAdmin: false,
  isEnrolled: () => false,
});

// ─── Provider ────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Fetch the Firestore user document
        try {
          const doc = await getUserDocument(firebaseUser.uid);
          setUserDoc(doc);
        } catch (err) {
          console.error("Error fetching user document:", err);
          setUserDoc(null);
        }
      } else {
        setUserDoc(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = userDoc?.role === "admin";

  const isEnrolled = (courseId: string) =>
    userDoc?.enrolledCourses?.includes(courseId) ?? false;

  return (
    <AuthContext.Provider value={{ user, userDoc, loading, isAdmin, isEnrolled }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}
