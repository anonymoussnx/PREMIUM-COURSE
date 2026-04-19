// Firestore database helpers — all DB read/write operations live here

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { type User } from "firebase/auth";
import { db } from "./firebase";

// ─── Types ─────────────────────────────────────────────────────────────

export interface UserDocument {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  enrolledCourses: string[];
  progress: Record<string, { completed: number; total: number; percentage: number }>;
  role: "student" | "admin";
  createdAt: any;
  updatedAt: any;
}

export interface PurchaseRecord {
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  stripeSessionId?: string;
  status: "paid" | "refunded" | "pending";
  purchasedAt: any;
}

// ─── User Documents ────────────────────────────────────────────────────

/** Creates or merges a Firestore user document on first sign-up */
export async function createUserDocument(
  user: User,
  extraData: Partial<UserDocument> = {}
): Promise<void> {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: extraData.displayName || user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || null,
      enrolledCourses: [],
      progress: {},
      role: "student",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

/** Fetch a user document by UID */
export async function getUserDocument(uid: string): Promise<UserDocument | null> {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? (snapshot.data() as UserDocument) : null;
}

/** Update user profile fields */
export async function updateUserDocument(
  uid: string,
  data: Partial<UserDocument>
): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { ...data, updatedAt: serverTimestamp() });
}

// ─── Course Access ─────────────────────────────────────────────────────

/** Grant a user access to a course (called after successful payment) */
export async function enrollUserInCourse(userId: string, courseId: string): Promise<void> {
  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    const data = snapshot.data() as UserDocument;
    const enrolled = data.enrolledCourses || [];
    if (!enrolled.includes(courseId)) {
      await updateDoc(userRef, {
        enrolledCourses: [...enrolled, courseId],
        updatedAt: serverTimestamp(),
      });
    }
  }
}

/** Check if a user is enrolled in a course */
export async function isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  const userDoc = await getUserDocument(userId);
  return userDoc?.enrolledCourses?.includes(courseId) ?? false;
}

// ─── Lesson Progress ───────────────────────────────────────────────────

/** Mark a lesson as complete and update the course progress percentage */
export async function markLessonComplete(
  userId: string,
  courseId: string,
  lessonId: string,
  totalLessons: number
): Promise<void> {
  const userRef = doc(db, "users", userId);
  const progressRef = doc(db, "progress", `${userId}_${courseId}`);

  // Get or create progress doc
  const progressSnap = await getDoc(progressRef);
  const existing = progressSnap.exists()
    ? (progressSnap.data() as { completedLessons: string[] })
    : { completedLessons: [] };

  const completedLessons = existing.completedLessons || [];
  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId);
  }

  const percentage = Math.round((completedLessons.length / totalLessons) * 100);

  await setDoc(
    progressRef,
    {
      userId,
      courseId,
      completedLessons,
      percentage,
      lastUpdated: serverTimestamp(),
    },
    { merge: true }
  );

  // Also update summary on user document
  await updateDoc(userRef, {
    [`progress.${courseId}`]: {
      completed: completedLessons.length,
      total: totalLessons,
      percentage,
    },
    updatedAt: serverTimestamp(),
  });
}

/** Get lesson progress for a specific course */
export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<{ completedLessons: string[]; percentage: number }> {
  const progressRef = doc(db, "progress", `${userId}_${courseId}`);
  const snap = await getDoc(progressRef);
  if (snap.exists()) {
    const data = snap.data();
    return {
      completedLessons: data.completedLessons || [],
      percentage: data.percentage || 0,
    };
  }
  return { completedLessons: [], percentage: 0 };
}

// ─── Purchase Records ──────────────────────────────────────────────────

/** Record a completed purchase */
export async function recordPurchase(data: Omit<PurchaseRecord, "purchasedAt">): Promise<string> {
  const purchasesRef = collection(db, "purchases");
  const docRef = await addDoc(purchasesRef, {
    ...data,
    purchasedAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Get all purchases for a user */
export async function getUserPurchases(userId: string): Promise<PurchaseRecord[]> {
  const q = query(
    collection(db, "purchases"),
    where("userId", "==", userId),
    orderBy("purchasedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as PurchaseRecord);
}

// ─── Admin: Courses (future — replaces mockData) ───────────────────────

/** Get all courses from Firestore (admin or public listing) */
export async function getAllCourses() {
  const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Get a single course by slug */
export async function getCourseBySlug(slug: string) {
  const q = query(collection(db, "courses"), where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

/** Add a new course (admin only) */
export async function addCourse(data: object): Promise<string> {
  const ref = await addDoc(collection(db, "courses"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update a course (admin only) */
export async function updateCourse(courseId: string, data: object): Promise<void> {
  await updateDoc(doc(db, "courses", courseId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Delete a course (admin only) */
export async function deleteCourse(courseId: string): Promise<void> {
  await deleteDoc(doc(db, "courses", courseId));
}

// ─── Admin: All Users ──────────────────────────────────────────────────

/** Fetch all users (admin only — use Firestore security rules to restrict) */
export async function getAllUsers(max = 50) {
  const q = query(
    collection(db, "users"),
    orderBy("createdAt", "desc"),
    limit(max)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
