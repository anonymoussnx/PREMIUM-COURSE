"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star, Play, ChevronDown, ChevronUp, Check, ArrowRight,
  Users, BookOpen, Globe, Award, Zap, Shield, TrendingUp,
  Code2, Brain, Palette, Cloud, X
} from "lucide-react";
import { mockCourses, mockTestimonials, platformStats, pricingPlans, faqs } from "@/lib/mockData";

// ─── Animated Counter ──────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Course Card ───────────────────────────────────────────────────────
function CourseCard({ course }: { course: typeof mockCourses[0] }) {
  const levelColor = {
    Beginner: "text-green-400 bg-green-400/10",
    Intermediate: "text-yellow-400 bg-yellow-400/10",
    Advanced: "text-red-400 bg-red-400/10",
  }[course.level];

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {course.badge && (
          <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-brand-purple/90 text-white uppercase tracking-wide">
            {course.badge}
          </span>
        )}
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={14} className="text-white ml-0.5" fill="white" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor}`}>
            {course.level}
          </span>
          <span className="text-xs text-white/40">{course.category}</span>
        </div>
        <h3 className="font-heading font-semibold text-base text-white leading-snug mb-1.5 line-clamp-2 group-hover:text-brand-blue transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-white/50 line-clamp-2 mb-4 leading-relaxed">
          {course.subtitle}
        </p>
        <div className="mt-auto">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-amber-400" fill="#fbbf24" />
              ))}
            </div>
            <span className="text-xs font-bold text-amber-400">{course.rating}</span>
            <span className="text-xs text-white/30">({course.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">${course.price}</span>
              <span className="text-sm text-white/30 line-through">${course.originalPrice}</span>
            </div>
            <span className="text-xs text-white/40">{course.duration} • {course.lessons} lessons</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Category icons mapping ────────────────────────────────────────────
const categoryIcons = [
  { icon: Code2, label: "Web Dev", color: "from-blue-500/20 to-cyan-500/20 border-blue-500/20" },
  { icon: Brain, label: "Data & AI", color: "from-purple-500/20 to-pink-500/20 border-purple-500/20" },
  { icon: Palette, label: "UI / UX", color: "from-pink-500/20 to-rose-500/20 border-pink-500/20" },
  { icon: Cloud, label: "DevOps", color: "from-green-500/20 to-emerald-500/20 border-green-500/20" },
  { icon: Shield, label: "Security", color: "from-amber-500/20 to-orange-500/20 border-amber-500/20" },
  { icon: TrendingUp, label: "Product", color: "from-indigo-500/20 to-blue-500/20 border-indigo-500/20" },
];

// ─── Main Landing Page ─────────────────────────────────────────────────
export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setEmailSubmitted(true);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="hero-glow w-[700px] h-[700px] bg-brand-purple/25 top-[-150px] left-1/2 -translate-x-1/2 animate-glow-pulse" />
        <div className="hero-glow w-[400px] h-[400px] bg-brand-blue/15 top-[200px] right-[-100px]" />
        <div className="hero-glow w-[300px] h-[300px] bg-brand-pink/10 bottom-[50px] left-[-50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/70">
              🎉 New courses added —{" "}
              <Link href="/courses" className="text-brand-blue hover:underline">
                See what's new
              </Link>
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Master Tech Skills
            <br />
            <span className="gradient-text">That Get You Hired</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            World-class video courses in web development, data science, design & DevOps.
            Join <strong className="text-white">30,000+</strong> students learning from industry experts.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/courses"
              className="btn-primary px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2"
            >
              Browse All Courses <ArrowRight size={18} />
            </Link>
            <Link
              href="/courses/full-stack-web-mastery"
              className="btn-secondary px-8 py-4 rounded-full text-base flex items-center gap-2"
            >
              <Play size={16} fill="currentColor" /> Watch Free Preview
            </Link>
          </div>

          {/* Social proof row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["a", "b", "c", "d", "e"].map((s) => (
                  <img
                    key={s}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`}
                    className="w-7 h-7 rounded-full border-2 border-brand-black bg-brand-surface"
                    alt="Student"
                  />
                ))}
              </div>
              <span>30,000+ students enrolled</span>
            </div>
            <span className="hidden sm:block text-white/20">|</span>
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-amber-400" fill="#fbbf24" />
              ))}
              <span>4.9 average rating</span>
            </div>
            <span className="hidden sm:block text-white/20">|</span>
            <span>🌍 87 countries</span>
          </div>

          {/* Floating course cards preview */}
          <div className="mt-20 relative max-w-5xl mx-auto hidden lg:block">
            <div className="glass rounded-2xl p-2 shadow-2xl border border-white/5">
              <div className="grid grid-cols-4 gap-3 p-4">
                {mockCourses.slice(0, 4).map((course) => (
                  <div key={course.id} className="glass rounded-xl overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-xs font-semibold text-white line-clamp-2 leading-snug mb-1">
                        {course.title}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star size={10} fill="#fbbf24" className="text-amber-400" />
                        <span className="text-[10px] text-amber-400 font-bold">{course.rating}</span>
                        <span className="text-[10px] text-white/30 ml-auto font-bold text-brand-blue">${course.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGO BAR ──────────────────────────────────────────────────── */}
      <section className="py-14 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <p className="text-xs uppercase tracking-widest text-white/30 font-medium">
            Our students now work at
          </p>
        </div>
        <div className="flex animate-marquee whitespace-nowrap gap-16 px-8">
          {["Google", "Amazon", "Microsoft", "Stripe", "Shopify", "Netflix", "Meta", "Apple", "Airbnb", "Uber", "Spotify", "Atlassian"].map((company) => (
            <span key={company} className="text-lg font-bold text-white/20 uppercase tracking-widest flex-shrink-0">
              {company}
            </span>
          ))}
          {["Google", "Amazon", "Microsoft", "Stripe", "Shopify", "Netflix", "Meta", "Apple", "Airbnb", "Uber", "Spotify", "Atlassian"].map((company) => (
            <span key={company + "2"} className="text-lg font-bold text-white/20 uppercase tracking-widest flex-shrink-0">
              {company}
            </span>
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold">Why LearnPro</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
              Learning that <span className="gradient-text">actually works</span>
            </h2>
            <p className="text-white/55 text-lg max-w-xl mx-auto">
              Not just another course platform. A complete system designed to take you from beginner to hired.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Play,
                title: "HD Video Lessons",
                desc: "Crystal-clear 1080p video with zero buffering. Stream on any device, anytime.",
                color: "from-blue-500/20 to-cyan-500/10",
                iconColor: "text-brand-blue",
              },
              {
                icon: Code2,
                title: "Real-World Projects",
                desc: "Build actual apps you can showcase in your portfolio. Not toy examples.",
                color: "from-purple-500/20 to-pink-500/10",
                iconColor: "text-brand-purple-light",
              },
              {
                icon: Users,
                title: "Private Community",
                desc: "Join a Discord of 30,000+ students. Get help, accountability, networking.",
                color: "from-green-500/20 to-emerald-500/10",
                iconColor: "text-green-400",
              },
              {
                icon: TrendingUp,
                title: "Track Your Progress",
                desc: "Visual progress bars, streaks, and completion certificates to keep you motivated.",
                color: "from-amber-500/20 to-orange-500/10",
                iconColor: "text-amber-400",
              },
              {
                icon: Shield,
                title: "30-Day Guarantee",
                desc: "Not happy? Get a full refund within 30 days. Zero risk, zero questions.",
                color: "from-red-500/20 to-pink-500/10",
                iconColor: "text-red-400",
              },
              {
                icon: Globe,
                title: "Lifetime Access",
                desc: "Pay once, own forever. All future updates included. Access from anywhere.",
                color: "from-indigo-500/20 to-blue-500/10",
                iconColor: "text-indigo-400",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`glass glass-hover rounded-2xl p-6 bg-gradient-to-br ${feature.color}`}
              >
                <div className={`w-11 h-11 rounded-xl glass flex items-center justify-center mb-5 ${feature.iconColor}`}>
                  <feature.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES SHOWCASE ──────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-brand-surface/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-blue font-semibold">Courses</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mt-3">
                Top-rated courses
              </h2>
            </div>
            <Link
              href="/courses"
              className="hidden sm:flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          {/* Category pills */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categoryIcons.map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                className={`flex items-center gap-2 px-4 py-2 rounded-full glass border bg-gradient-to-r ${color} text-sm text-white/70 hover:text-white whitespace-nowrap transition-all hover:-translate-y-0.5`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm"
            >
              Browse All 12+ Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="hero-glow w-[500px] h-[300px] bg-brand-purple/20 top-0 left-1/2 -translate-x-1/2" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white">
              Trusted by learners <span className="gradient-text">worldwide</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: platformStats.students, suffix: "+", label: "Students Enrolled", icon: Users },
              { value: platformStats.courses, suffix: "+", label: "Premium Courses", icon: BookOpen },
              { value: platformStats.countries, suffix: "+", label: "Countries Reached", icon: Globe },
              { value: platformStats.completionRate, suffix: "%", label: "Completion Rate", icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="glass glass-hover rounded-2xl p-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={18} className="text-brand-purple-light" />
                </div>
                <div className="font-heading text-4xl font-black gradient-text mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-brand-surface/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold">Testimonials</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
              Real results from <span className="gradient-text">real students</span>
            </h2>
            <p className="text-white/55 max-w-xl mx-auto">
              Don't take our word for it. Here's what our students say after completing courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTestimonials.map((t, i) => (
              <div
                key={t.id}
                className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="#fbbf24" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full bg-brand-surface"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-semibold">Pricing</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-white/55 max-w-xl mx-auto">
              No subscriptions that sneak in fees. Pay for what you want, own it forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 border flex flex-col ${
                  plan.popular
                    ? "pricing-popular"
                    : "glass"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="btn-primary text-xs font-bold px-4 py-1.5 rounded-full">
                      ✨ Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-heading text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-white/50">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    {plan.price === 0 ? (
                      <span className="font-heading text-4xl font-black text-white">Free</span>
                    ) : (
                      <>
                        <span className="font-heading text-4xl font-black gradient-text">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-white/40">{plan.period}</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check size={15} className="text-green-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/30 line-through">
                      <X size={15} className="text-white/20 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.price === 0 ? "/login" : "/checkout"}
                  className={`text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="mt-10 text-center flex items-center justify-center gap-2 text-sm text-white/50">
            <Shield size={16} className="text-green-400" />
            All plans include a <strong className="text-white/70">30-day money-back guarantee</strong>. Zero risk.
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-4 sm:px-6 bg-brand-surface/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold">FAQ</span>
            <h2 className="font-heading text-4xl font-black text-white mt-3 mb-4">
              Common <span className="gradient-text">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-white font-medium text-sm sm:text-base">{faq.q}</span>
                  {faqOpen === i ? (
                    <ChevronUp size={18} className="text-brand-blue flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-white/40 flex-shrink-0" />
                  )}
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="hero-glow w-[600px] h-[400px] bg-brand-blue/15 top-0 right-0" />
        <div className="hero-glow w-[400px] h-[400px] bg-brand-purple/20 bottom-0 left-0" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="glass rounded-3xl p-10 border border-brand-purple/20">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-semibold mb-4 block">
              Stay Updated
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4">
              Get <span className="gradient-text">free resources</span>
              <br />delivered to your inbox
            </h2>
            <p className="text-white/55 mb-8 leading-relaxed">
              Weekly tutorials, course launches, exclusive discounts, and tips from industry experts.
            </p>

            {emailSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
                <Check size={20} />
                You're in! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 transition-colors"
                />
                <button type="submit" className="btn-primary px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap">
                  Get Free Access →
                </button>
              </form>
            )}
            <p className="text-xs text-white/30 mt-3">
              No spam. Unsubscribe anytime. 10,000+ subscribers.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 border border-brand-purple/20 relative overflow-hidden">
          <div className="hero-glow w-[400px] h-[300px] bg-brand-purple/20 top-0 left-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-4">
              Ready to <span className="gradient-text">level up?</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Join 30,000+ students who already transformed their careers. Start learning today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/courses"
                className="btn-primary px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2"
              >
                <Zap size={18} /> Start Learning Now
              </Link>
              <Link href="/about" className="btn-secondary px-8 py-4 rounded-full text-base">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
