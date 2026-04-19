"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Zap, Mail, Lock, User } from "lucide-react";
import type { Metadata } from "next";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Wire up Firebase Auth
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-surface relative overflow-hidden flex-col items-center justify-center p-14">
        <div className="hero-glow w-[400px] h-[600px] bg-brand-purple/30 top-[-100px] left-[-100px]" />
        <div className="hero-glow w-[300px] h-[300px] bg-brand-blue/20 bottom-0 right-0" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative z-10 text-center max-w-sm">
          <Link href="/" className="flex items-center gap-2 justify-center mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
              <Zap size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-heading font-bold text-2xl text-white">
              Learn<span className="gradient-text">Pro</span>
            </span>
          </Link>

          <div className="glass rounded-2xl p-8 mb-8 text-left">
            <div className="text-4xl mb-3">🚀</div>
            <h2 className="font-heading text-xl font-bold text-white mb-2">
              Your tech career starts here
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              Join 30,000+ students worldwide learning in-demand tech skills from industry experts.
            </p>
          </div>

          {[
            "✅ Lifetime access to all courses",
            "✅ Certificate on completion",
            "✅ 30-day money-back guarantee",
            "✅ Private student community",
          ].map((item) => (
            <p key={item} className="text-sm text-white/55 text-left mb-2">{item}</p>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-brand-black">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-heading font-bold text-lg text-white">
              Learn<span className="gradient-text">Pro</span>
            </span>
          </Link>

          <h1 className="font-heading text-3xl font-black text-white mb-2">
            {mode === "login" ? "Welcome back 👋" : "Join LearnPro 🎓"}
          </h1>
          <p className="text-white/50 text-sm mb-8">
            {mode === "login"
              ? "Sign in to continue your learning journey"
              : "Create your free account and start learning today"}
          </p>

          {/* Tab switch */}
          <div className="glass rounded-xl p-1 flex mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === "login"
                  ? "btn-primary"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === "register"
                  ? "btn-primary"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Google OAuth */}
          <button className="w-full glass border border-white/10 flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-medium text-white hover:border-white/20 transition-all mb-6">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/30">or continue with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 transition-colors"
                />
              </div>
            )}

            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-11 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {mode === "login" && (
              <div className="text-right">
                <a href="#" className="text-xs text-brand-blue hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-xl text-base font-bold mt-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : mode === "login" ? (
                "Sign In →"
              ) : (
                "Create Free Account →"
              )}
            </button>
          </form>

          <p className="text-xs text-white/30 text-center mt-6">
            By continuing, you agree to our{" "}
            <a href="#" className="text-white/50 hover:text-white underline">Terms</a> and{" "}
            <a href="#" className="text-white/50 hover:text-white underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
