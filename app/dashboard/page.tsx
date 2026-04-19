"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen, TrendingUp, Award, Clock, Play, ChevronRight,
  User, Settings, LogOut, Zap, Star
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth";
import { mockCourses } from "@/lib/mockData";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const { user, userDoc, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("courses");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/");
  };

  // Show loading skeleton while auth resolves
  if (loading || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Real enrolled courses from Firestore (or empty if none yet)
  const enrolledCourseIds = userDoc?.enrolledCourses || [];
  const enrolledCourses = mockCourses.filter((c) => enrolledCourseIds.includes(c.id));
  const progress = userDoc?.progress || {};

  // Display name
  const displayName = user.displayName || user.email?.split("@")[0] || "Learner";
  const firstName = displayName.split(" ")[0];

  // Stats from real data
  const totalCompleted = Object.values(progress).reduce(
    (sum, p: any) => sum + (p.completed || 0),
    0
  );

  return (
    <div className="min-h-screen pt-20 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Welcome header */}
        <div className="glass rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-2xl font-black text-white">
              {firstName[0]?.toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <p className="text-white/50 text-sm">Welcome back,</p>
            <h1 className="font-heading text-2xl font-black text-white">
              {firstName} 👋
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {user.email} · {enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} enrolled
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-white/60">
              <Zap size={14} className="text-brand-blue" />
              <span>Keep learning! 🔥</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Courses Enrolled", value: String(enrolledCourses.length), icon: BookOpen, color: "text-brand-blue" },
            { label: "Lessons Completed", value: String(totalCompleted), icon: Play, color: "text-green-400" },
            { label: "Hours Learned", value: "—", icon: Clock, color: "text-brand-purple-light" },
            { label: "Certificates Earned", value: "0", icon: Award, color: "text-amber-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-5">
              <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon size={17} />
              </div>
              <p className="font-heading text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-white/45 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 glass rounded-xl p-1 mb-6 w-fit">
              {["courses", "progress", "activity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    activeTab === tab ? "btn-primary" : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* My Courses */}
            {activeTab === "courses" && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-white text-lg">My Courses</h2>

                {enrolledCourses.length === 0 ? (
                  <div className="glass rounded-2xl p-12 text-center">
                    <BookOpen size={36} className="text-white/20 mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-white mb-2">No courses yet</h3>
                    <p className="text-white/50 text-sm mb-6">
                      Browse our catalog and enroll in your first course.
                    </p>
                    <Link href="/courses" className="btn-primary px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2">
                      <BookOpen size={15} /> Browse Courses
                    </Link>
                  </div>
                ) : (
                  enrolledCourses.map((course) => {
                    const p = (progress as any)[course.id] || { completed: 0, total: course.lessons, percentage: 0 };
                    return (
                      <div key={course.id} className="glass rounded-2xl p-5 flex gap-5 items-start">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-20 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm mb-1 truncate">{course.title}</h3>
                          <p className="text-xs text-white/40 mb-3">
                            {p.completed} / {p.total} lessons completed
                          </p>
                          <div className="w-full h-1.5 bg-white/10 rounded-full mb-3">
                            <div className="progress-bar h-full rounded-full" style={{ width: `${p.percentage}%` }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/40">{p.percentage}% complete</span>
                            <Link
                              href={`/dashboard/learn/${course.id}/l1`}
                              className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors"
                            >
                              <Play size={12} fill="currentColor" /> Continue
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}

                {/* Browse more */}
                <Link
                  href="/courses"
                  className="glass glass-hover rounded-2xl p-5 flex items-center gap-4 border-dashed border-2 border-white/10 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                    <BookOpen size={18} className="text-brand-purple-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Browse more courses</p>
                    <p className="text-xs text-white/40">10+ courses waiting for you</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-white/30 group-hover:text-white/60 transition-colors" />
                </Link>
              </div>
            )}

            {/* Progress tab */}
            {activeTab === "progress" && (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading font-bold text-white text-lg mb-6">Learning Progress</h2>
                {enrolledCourses.length === 0 ? (
                  <p className="text-white/40 text-sm text-center py-8">
                    Enroll in courses to track your progress here.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {enrolledCourses.map((course) => {
                      const p = (progress as any)[course.id] || { completed: 0, total: course.lessons, percentage: 0 };
                      return (
                        <div key={course.id}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-white truncate pr-4">{course.title}</span>
                            <span className="text-sm font-bold gradient-text whitespace-nowrap">{p.percentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full">
                            <div className="progress-bar h-full rounded-full" style={{ width: `${p.percentage}%` }} />
                          </div>
                          <p className="text-xs text-white/40 mt-1">{p.completed} of {p.total} lessons</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Activity tab */}
            {activeTab === "activity" && (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading font-bold text-white text-lg mb-6">Recent Activity</h2>
                <div className="text-center py-8">
                  <TrendingUp size={32} className="text-white/20 mx-auto mb-3" />
                  <p className="text-white/40 text-sm">
                    Activity tracking will appear here as you complete lessons.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="glass rounded-2xl p-5">
              <h3 className="font-heading font-semibold text-white text-sm mb-4">Quick Actions</h3>
              <div className="space-y-1">
                {[
                  { icon: User, label: "Edit Profile", href: "#" },
                  { icon: Award, label: "My Certificates", href: "#" },
                  { icon: Settings, label: "Account Settings", href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                ))}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </div>

            {/* Recommended */}
            <div className="glass rounded-2xl p-5">
              <h3 className="font-heading font-semibold text-white text-sm mb-4">
                Recommended for You
              </h3>
              {mockCourses
                .filter((c) => !enrolledCourseIds.includes(c.id))
                .slice(0, 2)
                .map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="flex gap-3 items-center mb-4 last:mb-0 group"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-14 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                        {course.title}
                      </p>
                      <p className="text-[10px] text-white/35 mt-0.5 flex items-center gap-1">
                        <Star size={9} fill="#fbbf24" className="text-amber-400" />
                        {course.rating} · ${course.price}
                      </p>
                    </div>
                  </Link>
                ))}

              {mockCourses.filter((c) => !enrolledCourseIds.includes(c.id)).length === 0 && (
                <p className="text-xs text-white/30 text-center py-2">
                  You've explored all our courses! 🎉
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
