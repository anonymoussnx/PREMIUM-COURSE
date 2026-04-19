// Mock data for the platform
// Replace with real Firestore data once Firebase is configured

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  instructor: string;
  instructorTitle: string;
  instructorAvatar: string;
  thumbnail: string;
  previewVideo: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  tags: string[];
  features: string[];
  modules: Module[];
  badge?: string;
  isPopular?: boolean;
  isBestseller?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFree: boolean;
  isCompleted?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  course: string;
}

// ─── Mock Courses ─────────────────────────────────────────────────────────
export const mockCourses: Course[] = [
  {
    id: "c1",
    slug: "full-stack-web-mastery",
    title: "Full Stack Web Development Mastery",
    subtitle: "Master React, Node.js, and MongoDB — build real apps that get you hired",
    description: "The most comprehensive full-stack web development course on the internet. Learn modern JavaScript, React 18, Next.js 14, Node.js, Express, MongoDB, authentication, deployment and much more.",
    instructor: "Abhi Thakur",
    instructorTitle: "Senior Software Engineer & Educator",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abhi",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    previewVideo: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    price: 49,
    originalPrice: 199,
    rating: 4.9,
    reviewCount: 2847,
    studentCount: 12400,
    duration: "42 hours",
    lessons: 186,
    level: "Beginner",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "JavaScript"],
    isPopular: true,
    isBestseller: true,
    badge: "Bestseller",
    features: [
      "42 hours of HD video content",
      "186 lessons across 12 modules",
      "Source code for every project",
      "Certificate of completion",
      "Lifetime access + updates",
      "Access on all devices",
      "Private Discord community",
      "1-on-1 code reviews",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: JavaScript Foundations",
        lessons: [
          { id: "l1", title: "Welcome & Course Overview", duration: "5:30", videoUrl: "", isFree: true },
          { id: "l2", title: "Setting Up Your Dev Environment", duration: "12:00", videoUrl: "", isFree: true },
          { id: "l3", title: "ES6+ Modern JavaScript", duration: "28:45", videoUrl: "", isFree: false },
          { id: "l4", title: "Async/Await & Promises", duration: "22:10", videoUrl: "", isFree: false },
        ],
      },
      {
        id: "m2",
        title: "Module 2: React 18 Deep Dive",
        lessons: [
          { id: "l5", title: "React Fundamentals & JSX", duration: "20:00", videoUrl: "", isFree: false },
          { id: "l6", title: "Hooks — useState, useEffect, useContext", duration: "35:20", videoUrl: "", isFree: false },
          { id: "l7", title: "React Router & Navigation", duration: "18:45", videoUrl: "", isFree: false },
          { id: "l8", title: "State Management with Zustand", duration: "24:30", videoUrl: "", isFree: false },
        ],
      },
      {
        id: "m3",
        title: "Module 3: Next.js 14 & App Router",
        lessons: [
          { id: "l9", title: "Next.js App Router Architecture", duration: "22:00", videoUrl: "", isFree: false },
          { id: "l10", title: "Server Components & Actions", duration: "30:15", videoUrl: "", isFree: false },
          { id: "l11", title: "API Routes & Middleware", duration: "26:00", videoUrl: "", isFree: false },
        ],
      },
      {
        id: "m4",
        title: "Module 4: Node.js & Backend APIs",
        lessons: [
          { id: "l12", title: "Node.js & Express Setup", duration: "15:00", videoUrl: "", isFree: false },
          { id: "l13", title: "RESTful API Design", duration: "32:00", videoUrl: "", isFree: false },
          { id: "l14", title: "JWT Authentication", duration: "28:00", videoUrl: "", isFree: false },
        ],
      },
    ],
  },
  {
    id: "c2",
    slug: "python-data-science-ai",
    title: "Python for Data Science & AI",
    subtitle: "From zero to building real ML models — with Python, NumPy, Pandas & TensorFlow",
    description: "Master Python for data analysis and machine learning. Build 10 real-world AI projects including image classifiers, NLP models, and recommendation engines.",
    instructor: "Abhi Thakur",
    instructorTitle: "Senior Software Engineer & Educator",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abhi",
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7249f68c6?w=800&q=80",
    previewVideo: "",
    price: 59,
    originalPrice: 249,
    rating: 4.8,
    reviewCount: 1923,
    studentCount: 8700,
    duration: "38 hours",
    lessons: 152,
    level: "Intermediate",
    category: "Data Science",
    tags: ["Python", "ML", "TensorFlow", "Pandas"],
    isPopular: true,
    badge: "Hot",
    features: [
      "38 hours of HD video content",
      "10 real-world ML projects",
      "Jupyter Notebooks included",
      "Certificate of completion",
      "Lifetime access",
      "Access on all devices",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Python Fundamentals",
        lessons: [
          { id: "l1", title: "Python Setup & Basics", duration: "15:00", videoUrl: "", isFree: true },
          { id: "l2", title: "Data Structures & OOP", duration: "28:00", videoUrl: "", isFree: false },
        ],
      },
    ],
  },
  {
    id: "c3",
    slug: "ui-ux-design-masterclass",
    title: "UI/UX Design Masterclass",
    subtitle: "Design stunning interfaces in Figma — from wireframes to pixel-perfect prototypes",
    description: "Learn professional UI/UX design from scratch. Master Figma, design systems, user research, prototyping, and get job-ready with a professional portfolio.",
    instructor: "Abhi Thakur",
    instructorTitle: "Senior Software Engineer & Educator",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abhi",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    previewVideo: "",
    price: 39,
    originalPrice: 179,
    rating: 4.7,
    reviewCount: 1456,
    studentCount: 6200,
    duration: "28 hours",
    lessons: 124,
    level: "Beginner",
    category: "Design",
    tags: ["Figma", "UI", "UX", "Prototyping"],
    badge: "New",
    features: [
      "28 hours of HD video",
      "Figma starter kit included",
      "Portfolio project walkthroughs",
      "Certificate of completion",
      "Lifetime access",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Design Fundamentals",
        lessons: [
          { id: "l1", title: "Design Thinking Process", duration: "18:00", videoUrl: "", isFree: true },
          { id: "l2", title: "Color Theory & Typography", duration: "24:00", videoUrl: "", isFree: false },
        ],
      },
    ],
  },
  {
    id: "c4",
    slug: "devops-cloud-mastery",
    title: "DevOps & Cloud Engineering",
    subtitle: "AWS, Docker, Kubernetes, CI/CD — become a cloud engineer from scratch",
    description: "Master modern DevOps practices. Deploy apps on AWS, containerize with Docker, orchestrate with Kubernetes, and automate with GitHub Actions.",
    instructor: "Abhi Thakur",
    instructorTitle: "Senior Software Engineer & Educator",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abhi",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    previewVideo: "",
    price: 69,
    originalPrice: 299,
    rating: 4.9,
    reviewCount: 987,
    studentCount: 4100,
    duration: "52 hours",
    lessons: 210,
    level: "Advanced",
    category: "DevOps",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    badge: "Premium",
    features: [
      "52 hours of content",
      "AWS Free Tier compatible labs",
      "Real infrastructure projects",
      "Certificate of completion",
      "Lifetime access",
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Linux & Shell Scripting",
        lessons: [
          { id: "l1", title: "Linux Fundamentals", duration: "20:00", videoUrl: "", isFree: true },
          { id: "l2", title: "Shell Scripting Basics", duration: "25:00", videoUrl: "", isFree: false },
        ],
      },
    ],
  },
];

// ─── Mock Testimonials ────────────────────────────────────────────────────
export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    role: "Frontend Developer @ Google",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
    review: "This platform completely changed my career. I went from unemployed to landing a job at Google in 4 months. The content is world-class, and Abhi explains things in a way that just clicks.",
    course: "Full Stack Web Development Mastery",
  },
  {
    id: "t2",
    name: "Marcus Chen",
    role: "Data Scientist @ Amazon",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    rating: 5,
    review: "The Python & AI course is by far the best I've taken. Real projects, real code, zero fluff. I built 3 ML models for my portfolio and got hired within 6 weeks of completing it.",
    course: "Python for Data Science & AI",
  },
  {
    id: "t3",
    name: "Priya Sharma",
    role: "Product Designer @ Stripe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    rating: 5,
    review: "As a designer, I was always intimidated by coding. After the Full Stack course, I can prototype my own ideas end-to-end. The video quality and teaching approach is incredible.",
    course: "UI/UX Design Masterclass",
  },
  {
    id: "t4",
    name: "James Okonkwo",
    role: "DevOps Engineer @ Microsoft",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    rating: 5,
    review: "The DevOps course is insanely detailed. I had 0 cloud experience. Now I manage production Kubernetes clusters at Microsoft. Worth every penny — actually worth 10x the price.",
    course: "DevOps & Cloud Engineering",
  },
  {
    id: "t5",
    name: "Luna Park",
    role: "Freelance Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    rating: 5,
    review: "I'm earning $8k/month freelancing after completing just 2 courses here. The quality is Netflix-level. Clean UI, great player, and the community is super helpful.",
    course: "Full Stack Web Development Mastery",
  },
  {
    id: "t6",
    name: "Ahmed Al-Rashid",
    role: "Software Engineer @ Shopify",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
    rating: 5,
    review: "Best investment I made in my tech career. Started as a barista, now I'm a software engineer at Shopify. The structured curriculum and project-based learning made all the difference.",
    course: "Full Stack Web Development Mastery",
  },
];

// ─── Mock User (Dashboard) ─────────────────────────────────────────────────
export const mockUser = {
  id: "u1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  joinedDate: "January 2024",
  enrolledCourses: ["c1", "c2"],
  progress: {
    c1: { completed: 24, total: 186, percentage: 13 },
    c2: { completed: 45, total: 152, percentage: 30 },
  },
};

// ─── Stats ─────────────────────────────────────────────────────────────────
export const platformStats = {
  students: 31200,
  courses: 12,
  rating: 4.9,
  countries: 87,
  instructors: 3,
  completionRate: 94,
};

// ─── Pricing Plans ─────────────────────────────────────────────────────────
export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "Free",
    description: "Perfect to get started and explore",
    features: [
      "Access to 2 free courses",
      "Community forum access",
      "Course previews",
      "Basic certificates",
    ],
    notIncluded: [
      "Full course library",
      "HD downloads",
      "1-on-1 mentorship",
      "Project reviews",
    ],
    cta: "Get Started Free",
    popular: false,
    color: "border-white/10",
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    period: "per month",
    description: "Most popular — everything you need",
    features: [
      "Full course library (12+ courses)",
      "New courses every month",
      "HD video downloads",
      "Course certificates",
      "Private Discord community",
      "Weekly live Q&A sessions",
      "Code reviews",
      "Project feedback",
    ],
    notIncluded: [],
    cta: "Start Pro — $49/mo",
    popular: true,
    color: "border-brand-purple/50",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: 299,
    period: "one-time",
    description: "Pay once, own it forever",
    features: [
      "Everything in Pro",
      "Lifetime access to all courses",
      "All future courses included",
      "1-on-1 mentorship sessions (3x)",
      "Priority support",
      "Early access to new content",
      "Exclusive masterclasses",
      "Alumni network access",
    ],
    notIncluded: [],
    cta: "Get Lifetime Access",
    popular: false,
    color: "border-brand-blue/30",
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────
export const faqs = [
  {
    q: "Do I get lifetime access after purchase?",
    a: "Yes! Once you purchase a course or the Lifetime plan, you get permanent access — including all future updates and additions to that course. We also add new content regularly.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "We offer a 30-day money-back guarantee. If you're not happy for any reason, just contact us within 30 days of purchase and we'll refund you 100%. No questions asked.",
  },
  {
    q: "Are the courses downloadable for offline viewing?",
    a: "Pro and Lifetime members can download videos for offline viewing using our mobile app. All other members can stream in HD on any device.",
  },
  {
    q: "Will I get a certificate after completing a course?",
    a: "Yes! Every completed course comes with a professional certificate of completion that you can share on LinkedIn and add to your resume.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex) via Stripe, PayPal, and local payment methods including eSewa and Khalti for students in Nepal.",
  },
  {
    q: "Is there a student or group discount?",
    a: "Yes — we offer special discounts for students, teams, and bulk purchases. Contact us with your .edu email or team size and we'll send you a custom offer.",
  },
  {
    q: "How are the videos protected?",
    a: "All premium content is securely streamed with token-based authentication. Videos cannot be easily downloaded or shared. We protect your investment and our creators' content.",
  },
  {
    q: "Can I access the courses on mobile?",
    a: "Absolutely! The platform is fully responsive and works perfectly on mobile, tablet, and desktop. A dedicated mobile app is coming soon.",
  },
];
