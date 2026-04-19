"use client";

import { useState } from "react";
import {
  Users, BookOpen, DollarSign, TrendingUp, Plus, Edit2,
  Trash2, Eye, BarChart3, Upload, Settings, LogOut,
  Package, AlertCircle, Check
} from "lucide-react";
import Link from "next/link";
import { mockCourses, platformStats } from "@/lib/mockData";

// ─── Simulated admin data ──────────────────────────────────────────────
const mockOrders = [
  { id: "#1042", user: "Sarah Johnson", course: "Full Stack Web Dev", amount: 49, date: "Apr 19, 2025", status: "Paid" },
  { id: "#1041", user: "Marcus Chen", course: "Python & AI", amount: 59, date: "Apr 19, 2025", status: "Paid" },
  { id: "#1040", user: "Priya Sharma", course: "UI/UX Design", amount: 39, date: "Apr 18, 2025", status: "Paid" },
  { id: "#1039", user: "James Okonkwo", course: "DevOps & Cloud", amount: 69, date: "Apr 18, 2025", status: "Refunded" },
  { id: "#1038", user: "Luna Park", course: "Full Stack Web Dev", amount: 49, date: "Apr 17, 2025", status: "Paid" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "", subtitle: "", price: "", level: "Beginner", category: ""
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "users", label: "Users", icon: Users },
    { id: "orders", label: "Orders", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Course added! (Connect to Firestore to persist this)");
    setShowAddCourse(false);
    setNewCourse({ title: "", subtitle: "", price: "", level: "Beginner", category: "" });
  };

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-60 glass-dark border-r border-white/5 flex flex-col z-40">
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
              <Settings size={15} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">LearnPro</p>
              <p className="text-[10px] text-white/40">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-brand-purple/20 text-white border border-brand-purple/30"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <Eye size={15} /> View Site
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={15} /> Sign Out
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="ml-60 flex-1 p-8 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-black text-white capitalize">{activeTab}</h1>
            <p className="text-sm text-white/40">
              {activeTab === "overview" ? "Platform performance at a glance" : `Manage your ${activeTab}`}
            </p>
          </div>
          {activeTab === "courses" && (
            <button
              onClick={() => setShowAddCourse(true)}
              className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
            >
              <Plus size={16} /> Add Course
            </button>
          )}
        </div>

        {/* ── Overview ──────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Revenue", value: "$18,420", icon: DollarSign, change: "+12.4%", good: true },
                { label: "Total Students", value: "31,200+", icon: Users, change: "+8.7%", good: true },
                { label: "Active Courses", value: "12", icon: BookOpen, change: "+2", good: true },
                { label: "Refund Rate", value: "1.2%", icon: TrendingUp, change: "-0.3%", good: true },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon size={16} className="text-brand-blue" />
                    <span className={`text-xs font-medium ${stat.good ? "text-green-400" : "text-red-400"}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="font-heading text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h2 className="font-heading font-bold text-white">Recent Orders</h2>
                <button onClick={() => setActiveTab("orders")} className="text-xs text-brand-blue hover:underline">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full admin-table">
                  <thead>
                    <tr>
                      <th className="text-left">Order ID</th>
                      <th className="text-left">Student</th>
                      <th className="text-left">Course</th>
                      <th className="text-left">Amount</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.slice(0, 3).map((order) => (
                      <tr key={order.id}>
                        <td className="text-brand-blue font-mono font-medium">{order.id}</td>
                        <td>{order.user}</td>
                        <td className="max-w-xs truncate">{order.course}</td>
                        <td className="text-green-400 font-semibold">${order.amount}</td>
                        <td>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "Paid"
                              ? "bg-green-500/15 text-green-400"
                              : "bg-red-500/15 text-red-400"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Courses ───────────────────────────────────────────────── */}
        {activeTab === "courses" && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5">
              <p className="text-xs text-white/40">{mockCourses.length} courses listed</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th className="text-left">Course</th>
                    <th className="text-left">Category</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Students</th>
                    <th className="text-left">Rating</th>
                    <th className="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img src={course.thumbnail} alt="" className="w-10 h-7 rounded object-cover" />
                          <span className="font-medium text-white text-sm max-w-xs truncate">
                            {course.title}
                          </span>
                        </div>
                      </td>
                      <td>{course.category}</td>
                      <td className="text-green-400 font-semibold">${course.price}</td>
                      <td>{course.studentCount.toLocaleString()}</td>
                      <td className="text-amber-400">★ {course.rating}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 glass rounded-lg text-white/50 hover:text-brand-blue transition-colors">
                            <Edit2 size={13} />
                          </button>
                          <button className="p-1.5 glass rounded-lg text-white/50 hover:text-red-400 transition-colors">
                            <Trash2 size={13} />
                          </button>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="p-1.5 glass rounded-lg text-white/50 hover:text-white transition-colors"
                          >
                            <Eye size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Orders ────────────────────────────────────────────────── */}
        {activeTab === "orders" && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th className="text-left">Order ID</th>
                    <th className="text-left">Student</th>
                    <th className="text-left">Course</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="text-brand-blue font-mono font-medium">{order.id}</td>
                      <td>{order.user}</td>
                      <td>{order.course}</td>
                      <td className="text-green-400 font-semibold">${order.amount}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          order.status === "Paid"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-red-500/15 text-red-400"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Users ─────────────────────────────────────────────────── */}
        {activeTab === "users" && (
          <div className="glass rounded-2xl p-6 text-center">
            <Users size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/50 text-sm">
              Connect Firebase to view and manage real user data.
            </p>
            <p className="text-xs text-white/30 mt-1">31,200+ registered students in production</p>
          </div>
        )}

        {/* ── Settings ──────────────────────────────────────────────── */}
        {activeTab === "settings" && (
          <div className="max-w-xl space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-bold text-white mb-4">Platform Settings</h3>
              <div className="space-y-4">
                {["Platform Name", "Support Email", "Currency"].map((field) => (
                  <div key={field}>
                    <label className="text-xs text-white/50 block mb-1.5">{field}</label>
                    <input
                      type="text"
                      placeholder={field === "Platform Name" ? "LearnPro" : field === "Support Email" ? "hello@learnpro.com" : "USD"}
                      className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60"
                    />
                  </div>
                ))}
                <button className="btn-primary px-5 py-2.5 rounded-xl text-sm">Save Changes</button>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-bold text-white mb-4">Payment Settings</h3>
              <div className="space-y-3">
                {[
                  { label: "Stripe", status: "Test Mode", color: "text-amber-400" },
                  { label: "PayPal", status: "Not Connected", color: "text-red-400" },
                  { label: "eSewa", status: "Sandbox", color: "text-amber-400" },
                  { label: "Khalti", status: "Sandbox", color: "text-amber-400" },
                ].map((p) => (
                  <div key={p.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-white">{p.label}</span>
                    <span className={`text-xs font-medium ${p.color}`}>{p.status}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 mt-4">
                Add API keys in <code className="text-brand-blue">.env.local</code> to activate live payments.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-dark rounded-2xl p-8 w-full max-w-xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-white text-xl">Add New Course</h2>
              <button onClick={() => setShowAddCourse(false)} className="text-white/40 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleAddCourse} className="space-y-4">
              {[
                { key: "title", label: "Course Title", placeholder: "e.g. Full Stack Web Development" },
                { key: "subtitle", label: "Subtitle", placeholder: "Short description of the course" },
                { key: "price", label: "Price (USD)", placeholder: "49" },
                { key: "category", label: "Category", placeholder: "Web Development" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-white/50 block mb-1.5">{label}</label>
                  <input
                    type={key === "price" ? "number" : "text"}
                    placeholder={placeholder}
                    value={(newCourse as any)[key]}
                    onChange={(e) => setNewCourse({ ...newCourse, [key]: e.target.value })}
                    required
                    className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-white/50 block mb-1.5">Level</label>
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                  className="w-full glass border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple/60"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="glass rounded-xl p-4 border border-dashed border-white/15 text-center">
                <Upload size={20} className="text-white/30 mx-auto mb-2" />
                <p className="text-xs text-white/40">Click to upload thumbnail</p>
                <p className="text-[10px] text-white/25 mt-1">PNG, JPG up to 5MB</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddCourse(false)} className="btn-secondary flex-1 py-3 rounded-xl text-sm">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 py-3 rounded-xl text-sm font-bold">
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
