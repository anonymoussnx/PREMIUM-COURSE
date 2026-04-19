"use client";

import Link from "next/link";
import { Zap, Share2, PlayCircle, Link2, AtSign, Mail } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "All Courses", href: "/courses" },
    { label: "Pricing", href: "/#pricing" },
    { label: "About Us", href: "/about" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Support: [
    { label: "FAQ", href: "/#faq" },
    { label: "Contact Us", href: "mailto:hello@learnpro.com" },
    { label: "Community", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socials = [
  { icon: Share2, href: "#", label: "Twitter / X" },
  { icon: PlayCircle, href: "#", label: "YouTube" },
  { icon: Link2, href: "#", label: "GitHub" },
  { icon: AtSign, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
                <Zap size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                Learn<span className="gradient-text">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              The premium platform for mastering in-demand tech skills. Built by developers, for developers.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 transition-colors"
              />
              <button className="btn-primary px-4 py-2.5 rounded-lg text-sm whitespace-nowrap">
                <Mail size={15} />
              </button>
            </div>
            <p className="text-xs text-white/30 mt-2">Get new course announcements. No spam.</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2025 LearnPro. All rights reserved. Made with ❤️ for learners worldwide.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
