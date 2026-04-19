"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Lock, Tag, Check, CreditCard, ChevronRight } from "lucide-react";
import { mockCourses } from "@/lib/mockData";

const course = mockCourses[0]; // Default to first course; in production, pass via URL params

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "esewa" | "khalti">("card");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    email: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const price = couponApplied ? course.price * 0.9 : course.price;
  const savings = course.originalPrice - price;

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // TODO: Process payment with Stripe
    setTimeout(() => {
      setProcessing(false);
      alert("Payment successful! (Demo mode — connect Stripe for live payments)");
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <Lock size={18} className="text-brand-green" />
          <h1 className="font-heading text-2xl font-black text-white">Secure Checkout</h1>
          <span className="ml-auto text-xs text-white/40 flex items-center gap-1.5">
            <Shield size={12} className="text-green-400" /> SSL Encrypted
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Payment form */}
          <div className="lg:col-span-3 space-y-6">

            {/* Contact */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-heading font-bold text-white mb-5">Contact Information</h2>
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 transition-colors"
              />
            </div>

            {/* Payment method selector */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-heading font-bold text-white mb-5">Payment Method</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { id: "card", label: "Card", icon: "💳" },
                  { id: "paypal", label: "PayPal", icon: "🅿️" },
                  { id: "esewa", label: "eSewa", icon: "🟢" },
                  { id: "khalti", label: "Khalti", icon: "🟣" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                      paymentMethod === method.id
                        ? "border-brand-purple bg-brand-purple/15 text-white"
                        : "border-white/10 text-white/50 hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl">{method.icon}</span>
                    {method.label}
                  </button>
                ))}
              </div>

              {/* Card form */}
              {paymentMethod === "card" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-white/50 block mb-1.5">Name on card</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.cardName}
                      onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1.5">Card number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={form.cardNumber}
                        onChange={(e) => setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })}
                        maxLength={19}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 font-mono"
                      />
                      <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/50 block mb-1.5">Expiry date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={form.expiry}
                        onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                        maxLength={7}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 block mb-1.5">CVV</label>
                      <input
                        type="text"
                        placeholder="•••"
                        value={form.cvv}
                        onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                        maxLength={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60 font-mono"
                      />
                    </div>
                  </div>

                  {/* Stripe test hint */}
                  <div className="glass rounded-xl px-4 py-3 text-xs text-brand-blue/70">
                    🧪 <strong>Test mode:</strong> Use card 4242 4242 4242 4242, any future date, any CVV
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {processing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        Pay ${price.toFixed(2)} Securely
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* PayPal */}
              {paymentMethod === "paypal" && (
                <div className="text-center py-6">
                  <p className="text-sm text-white/60 mb-6">
                    You'll be redirected to PayPal to complete your purchase securely.
                  </p>
                  <button className="w-full py-4 rounded-xl font-bold text-white bg-[#0070BA] hover:bg-[#005ea6] transition-colors">
                    Continue to PayPal →
                  </button>
                </div>
              )}

              {/* eSewa */}
              {paymentMethod === "esewa" && (
                <div className="text-center py-6">
                  <div className="glass rounded-xl p-4 mb-6 text-sm text-amber-400/80">
                    ⚠️ eSewa integration is in test mode. Live payments require a merchant account.
                  </div>
                  <p className="text-sm text-white/60 mb-6">
                    Pay via eSewa — Nepal's most trusted digital wallet.
                  </p>
                  <button className="w-full py-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors">
                    Pay with eSewa — NPR {(price * 133).toFixed(0)}
                  </button>
                </div>
              )}

              {/* Khalti */}
              {paymentMethod === "khalti" && (
                <div className="text-center py-6">
                  <div className="glass rounded-xl p-4 mb-6 text-sm text-amber-400/80">
                    ⚠️ Khalti integration is in test mode. Live payments require a merchant account.
                  </div>
                  <p className="text-sm text-white/60 mb-6">
                    Pay via Khalti — fast and reliable digital payments.
                  </p>
                  <button className="w-full py-4 rounded-xl font-bold text-white bg-purple-700 hover:bg-purple-800 transition-colors">
                    Pay with Khalti — NPR {(price * 133).toFixed(0)}
                  </button>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/40">
              {["🔒 SSL Secured", "✅ 30-Day Refund", "🌍 Global Payments", "⚡ Instant Access"].map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h2 className="font-heading font-bold text-white mb-6">Order Summary</h2>

              {/* Course item */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-white/5">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-white leading-snug mb-1">
                    {course.title}
                  </p>
                  <p className="text-xs text-white/40">
                    {course.duration} • {course.lessons} lessons
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] text-amber-400">★ {course.rating}</span>
                    <span className="text-[10px] text-white/30">({course.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <label className="text-xs text-white/50 block mb-2">Coupon code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      placeholder="SAVE10"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-purple/60"
                    />
                  </div>
                  <button
                    onClick={() => { if (coupon === "SAVE10") setCouponApplied(true); }}
                    className="btn-secondary px-4 py-3 rounded-xl text-sm"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                    <Check size={12} /> Coupon applied! 10% discount
                  </p>
                )}
                <p className="text-xs text-white/30 mt-1">Try code: SAVE10</p>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 mb-6 pb-6 border-b border-white/5">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Original price</span>
                  <span className="line-through">${course.originalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-green-400">
                  <span>Discount</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-brand-blue">
                    <span>Coupon (SAVE10)</span>
                    <span>-${(course.price * 0.1).toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-white">Total</span>
                <span className="font-heading text-2xl font-black gradient-text">
                  ${price.toFixed(2)}
                </span>
              </div>

              {/* Guarantees */}
              <div className="space-y-2.5">
                {[
                  { icon: "🔒", text: "Secure payment processing" },
                  { icon: "♻️", text: "30-day money-back guarantee" },
                  { icon: "⚡", text: "Instant access after payment" },
                  { icon: "🌍", text: "Lifetime access, any device" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-white/50">
                    <span>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
