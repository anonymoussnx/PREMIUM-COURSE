"use client";

import { useState } from "react";
import { mockCourses } from "@/lib/mockData";
import {
  Star, Clock, BookOpen, Users, Check, Play,
  Shield, ChevronDown, Lock
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Support both Next.js 14 (sync) and 15 (async) params
  const resolvedParams = typeof (params as any).then === "function" ? use(params as Promise<{ slug: string }>) : params as { slug: string };
  const course = mockCourses.find((c) => c.slug === resolvedParams.slug);

  const [openModule, setOpenModule] = useState<string | null>("m1");
  const [showVideo, setShowVideo] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-6xl mb-4">😢</p>
          <h1 className="font-heading text-2xl font-bold text-white mb-2">Course not found</h1>
          <p className="text-white/50 mb-6">This course doesn't exist or has been removed.</p>
          <Link href="/courses" className="btn-primary px-6 py-3 rounded-xl">Browse All Courses</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Banner */}
      <div className="bg-brand-surface border-b border-white/5 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300">
                {course.category}
              </span>
              {course.badge && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-600/90 text-white">
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-6">
              {course.subtitle}
            </p>

            {/* Ratings row */}
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#fbbf24" className="text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-amber-400">{course.rating}</span>
                <span className="text-white/40">({course.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <span className="flex items-center gap-1 text-white/50">
                <Users size={14} /> {course.studentCount.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1 text-white/50">
                <Clock size={14} /> {course.duration}
              </span>
              <span className="flex items-center gap-1 text-white/50">
                <BookOpen size={14} /> {course.lessons} lessons
              </span>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-10 h-10 rounded-full bg-brand-card"
              />
              <div>
                <p className="text-sm text-white font-semibold">{course.instructor}</p>
                <p className="text-xs text-white/40">{course.instructorTitle}</p>
              </div>
            </div>
          </div>

          {/* Right: Sticky Pricing Card */}
          <div className="lg:sticky lg:top-24">
            <div className="glass rounded-2xl overflow-hidden border border-white/8">
              {/* Preview thumbnail */}
              <div
                className="relative h-48 bg-black cursor-pointer group"
                onClick={() => setShowVideo(true)}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 text-xs text-white/70 flex items-center gap-1">
                  <Play size={11} fill="currentColor" /> Preview this course
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-heading text-4xl font-black gradient-text">${course.price}</span>
                  <span className="text-lg text-white/30 line-through">${course.originalPrice}</span>
                  <span className="text-sm font-bold text-green-400">{discount}% OFF</span>
                </div>
                <p className="text-xs text-red-400 font-medium mb-4">⏰ Limited time offer</p>

                <Link
                  href="/checkout"
                  className="btn-primary w-full text-center py-4 rounded-xl text-base font-bold mb-3 block"
                >
                  Enroll Now — ${course.price}
                </Link>
                <button className="btn-secondary w-full py-3 rounded-xl text-sm font-medium">
                  Try Free Preview
                </button>

                <div className="mt-6 space-y-2">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                    This course includes:
                  </p>
                  {course.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-white/65">
                      <Check size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-white/40">
                  <Shield size={13} className="text-green-400" />
                  30-day money-back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2 space-y-12">
          {/* What you'll learn */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              What you'll learn
            </h2>
            <div className="glass rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <Check size={15} className="text-green-400 mt-0.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              Course Curriculum
            </h2>
            <div className="space-y-3">
              {course.modules.map((mod) => (
                <div key={mod.id} className="glass rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                    className="w-full flex items-center justify-between gap-4 p-5"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-white text-sm">{mod.title}</p>
                      <p className="text-xs text-white/40 mt-0.5">
                        {mod.lessons.length} lessons
                      </p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-white/40 transition-transform ${
                        openModule === mod.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openModule === mod.id && (
                    <div className="border-t border-white/5">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/3 transition-colors border-b border-white/3 last:border-0"
                        >
                          {lesson.isFree ? (
                            <Play size={14} className="text-cyan-400 flex-shrink-0" />
                          ) : (
                            <Lock size={14} className="text-white/30 flex-shrink-0" />
                          )}
                          <span className={`text-sm flex-1 ${lesson.isFree ? "text-white/80" : "text-white/50"}`}>
                            {lesson.title}
                          </span>
                          {lesson.isFree && (
                            <span className="text-xs text-cyan-400 font-medium">Free</span>
                          )}
                          <span className="text-xs text-white/35">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              Your Instructor
            </h2>
            <div className="glass rounded-2xl p-6 flex gap-5">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-20 h-20 rounded-2xl bg-brand-card flex-shrink-0"
              />
              <div>
                <h3 className="font-heading font-bold text-white text-lg mb-1">
                  {course.instructor}
                </h3>
                <p className="text-cyan-400 text-sm mb-3">{course.instructorTitle}</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  A passionate software engineer and educator with 10+ years of industry experience.
                  Has taught over 30,000 students worldwide through premium hands-on courses.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="hidden lg:block" />
      </div>

      {/* Video modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="w-full max-w-3xl glass rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-white font-medium">Course Preview</span>
              <button onClick={() => setShowVideo(false)} className="text-white/50 hover:text-white">✕</button>
            </div>
            <video
              controls
              autoPlay
              className="w-full aspect-video"
              controlsList="nodownload"
            >
              <source src={course.previewVideo} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
