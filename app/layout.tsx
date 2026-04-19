import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LearnPro — Premium Tech Courses & Software Tools",
    template: "%s | LearnPro",
  },
  description:
    "Master in-demand tech skills with world-class video courses. Full-stack development, Data Science, UI/UX, DevOps and more. Join 30,000+ students learning worldwide.",
  keywords: [
    "online courses",
    "programming courses",
    "web development",
    "data science",
    "learn to code",
    "tech skills",
    "React",
    "Python",
    "software engineering",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "LearnPro — Premium Tech Courses & Software Tools",
    description:
      "Join 30,000+ students mastering in-demand tech skills with world-class video courses.",
    type: "website",
    locale: "en_US",
    siteName: "LearnPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnPro — Premium Tech Courses",
    description: "Premium tech courses for the modern developer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-brand-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#11111E",
              color: "#f8f8ff",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
