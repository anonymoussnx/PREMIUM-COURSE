import { mockCourses } from "@/lib/mockData";
import Link from "next/link";
import { Star, Clock, BookOpen, Users, Filter } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Browse all premium tech courses. Web development, data science, UI/UX design, DevOps and more.",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-semibold">Course Library</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            All <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            12+ expert-crafted courses designed to take you from zero to job-ready.
          </p>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 mb-10 items-center">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Filter size={14} />
            <span>Filter:</span>
          </div>
          {["All", "Web Dev", "Data & AI", "Design", "DevOps"].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                cat === "All"
                  ? "btn-primary"
                  : "glass hover:border-brand-blue/40 text-white/60 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto">
            <select className="glass border border-white/10 text-white/60 text-sm rounded-xl px-4 py-2.5 focus:outline-none">
              <option>Sort: Most Popular</option>
              <option>Sort: Price (Low)</option>
              <option>Sort: Newest</option>
              <option>Sort: Rating</option>
            </select>
          </div>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockCourses.map((course) => {
            const levelColor = {
              Beginner: "text-green-400 bg-green-400/10",
              Intermediate: "text-yellow-400 bg-yellow-400/10",
              Advanced: "text-red-400 bg-red-400/10",
            }[course.level];

            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {course.badge && (
                    <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-brand-purple/90 text-white">
                      {course.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor}`}>
                      {course.level}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-base text-white leading-snug mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-white/50 mb-4 line-clamp-2">{course.subtitle}</p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen size={11} /> {course.lessons} lessons</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {(course.studentCount / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} className="text-amber-400" fill="#fbbf24" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-amber-400">{course.rating}</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-white">${course.price}</span>
                        <span className="text-xs text-white/30 line-through">${course.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
