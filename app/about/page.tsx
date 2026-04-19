import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Globe, Award, Users, ArrowRight, Star, Shield, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about LearnPro's mission to provide world-class tech education to everyone, anywhere.",
};

const teamMembers = [
  {
    name: "Abhi Thakur",
    role: "Founder & Lead Instructor",
    bio: "10+ years in software engineering. Worked at top startups and now dedicated to teaching the next generation of developers.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abhi&backgroundColor=b6e3f4",
    courses: 4,
    students: 31200,
  },
];

const values = [
  {
    icon: "🎯",
    title: "Outcome Focused",
    desc: "Every lesson, project, and exercise is designed to get you job-ready. We cut the fluff and focus on skills that matter.",
  },
  {
    icon: "💎",
    title: "Premium Quality",
    desc: "Professionally recorded 1080p video, carefully structured curriculum, and real-world projects in every course.",
  },
  {
    icon: "🤝",
    title: "Community First",
    desc: "Learning is better together. Our private community gives you accountability, help, and networking opportunities.",
  },
  {
    icon: "🔓",
    title: "Accessible to All",
    desc: "We believe quality education shouldn't be a luxury. Competitive pricing, local payments (eSewa, Khalti), and a free tier.",
  },
];

const milestones = [
  { year: "2022", event: "LearnPro founded with 1 course and 100 beta students" },
  { year: "2023", event: "Grew to 8,000+ students across 40 countries" },
  { year: "2024", event: "Launched 8 new courses, added software tools section" },
  { year: "2025", event: "30,000+ students, 87 countries, 4.9★ average rating" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden pt-32">
        <div className="hero-glow w-[600px] h-[400px] bg-brand-purple/20 top-0 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-semibold">About LearnPro</span>
          <h1 className="font-heading text-5xl sm:text-6xl font-black text-white mt-4 mb-6">
            We believe <span className="gradient-text">education</span> changes everything
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            LearnPro was built with one mission: give every person on earth access to the same quality
            of tech education that top engineers get at the world's best companies.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "30,000+", label: "Students Enrolled", icon: Users },
            { value: "87", label: "Countries Reached", icon: Globe },
            { value: "4.9★", label: "Average Rating", icon: Star },
            { value: "94%", label: "Completion Rate", icon: Award },
          ].map((stat) => (
            <div key={stat.label} className="glass glass-hover rounded-2xl p-6 text-center">
              <stat.icon size={20} className="text-brand-blue mx-auto mb-3" />
              <p className="font-heading text-3xl font-black gradient-text mb-1">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our story */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold">Our Story</span>
            <h2 className="font-heading text-4xl font-black text-white mt-3 mb-6">
              Built by a developer, <span className="gradient-text">for developers</span>
            </h2>
            <div className="space-y-4 text-white/60 text-base leading-relaxed">
              <p>
                LearnPro started in 2022 when our founder noticed that most online courses were either
                too shallow to be useful, or wildly overpriced. Students were paying $500+ for bootcamps
                and still couldn't land jobs.
              </p>
              <p>
                So we built something different. Project-based courses taught by real engineers, priced
                at what a student can actually afford, with a community that holds you accountable.
              </p>
              <p>
                Today, our students work at Google, Amazon, Microsoft, Stripe, Shopify, and hundreds of
                startups around the world. Every day we get messages that make everything worth it.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {milestones.map((m) => (
              <div key={m.year} className="glass glass-hover rounded-xl p-5 flex gap-4">
                <div className="text-2xl font-heading font-black gradient-text w-16 flex-shrink-0">
                  {m.year}
                </div>
                <p className="text-sm text-white/65 leading-relaxed pt-1">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 bg-brand-surface/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-semibold">What We Stand For</span>
            <h2 className="font-heading text-4xl font-black text-white mt-3">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="glass glass-hover rounded-2xl p-6">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold">The Team</span>
            <h2 className="font-heading text-4xl font-black text-white mt-3">
              Meet the <span className="gradient-text">instructor</span>
            </h2>
          </div>
          {teamMembers.map((member) => (
            <div key={member.name} className="glass rounded-2xl p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-28 h-28 rounded-2xl bg-brand-surface flex-shrink-0"
              />
              <div>
                <h3 className="font-heading text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-brand-blue text-sm mb-4">{member.role}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{member.bio}</p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="font-heading font-black text-xl gradient-text">{member.courses}+</p>
                    <p className="text-xs text-white/40">Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-black text-xl gradient-text">
                      {(member.students / 1000).toFixed(0)}k+
                    </p>
                    <p className="text-xs text-white/40">Students</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 px-4 sm:px-6 bg-brand-surface/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-white text-center mb-10">
            Why Students <span className="gradient-text">Trust Us</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: "30-Day Guarantee",
                desc: "Full refund, no questions asked, within 30 days.",
              },
              {
                icon: BookOpen,
                title: "Lifetime Access",
                desc: "Pay once and access your courses forever, including updates.",
              },
              {
                icon: Heart,
                title: "Real Support",
                desc: "Our team responds within 24 hours. Students come first.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-xl p-6 text-center">
                <div className="w-11 h-11 rounded-xl bg-brand-purple/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-brand-purple-light" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/55">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-10">
          <h2 className="font-heading text-3xl font-black text-white mb-4">
            Ready to start your <span className="gradient-text">journey?</span>
          </h2>
          <p className="text-white/55 mb-8">Join 30,000+ students and transform your career today.</p>
          <Link href="/courses" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold">
            Browse Courses <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
