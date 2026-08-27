"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { supabase } from "@/lib/supabase";
import { Check, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { state, total, dispatch } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", postalCode: "", country: "",
  });
  const shipping = total >= 500 ? 0 : 35;

  const upd = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  if (state.items.length === 0 && !submitted) {
    return (
      <div className="page-padding py-32 text-center max-w-lg mx-auto">
        <h1 className="font-serif text-2xl mb-4">Your bag is empty</h1>
        <p className="text-smoke mb-8">Add some beautiful pieces to get started.</p>
        <Link href="/shop" className="btn-primary">Browse Collection</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page-padding py-32 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-gold" />
        </div>
        <h1 className="font-serif text-2xl mb-4">Order Confirmed</h1>
        <p className="text-smoke mb-2">Thank you for your order. We will begin crafting your pieces shortly.</p>
        <p className="text-xs text-smoke/60 mb-8">A confirmation email will be sent. Each piece takes 2–4 weeks to handcraft.</p>
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  const placeOrder = async () => {
    setError("");
    if (!form.firstName.trim() || !form.email.trim() || !form.address.trim() || !form.city.trim() || !form.country.trim()) {
      setError("Please complete all required shipping fields.");
      return;
    }
    setSaving(true);
    try {
      const { error: err } = await supabase.from("orders").insert({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        postal_code: form.postalCode.trim(),
        country: form.country.trim(),
        items: state.items.map((item) => ({
          name: item.product.name,
          slug: item.product.slug,
          color: item.color || "",
          quantity: item.quantity,
          price: item.product.price,
        })),
        subtotal: total,
        shipping,
        total: total + shipping,
        status: "pending",
      });
      if (err) {
        console.error("[checkout] insert error:", err.message);
        setError("We could not place your order. Please contact us via WhatsApp and we will assist you.");
        setSaving(false);
        return;
      }
      setSubmitted(true);
      dispatch({ type: "CLEAR_CART" });
    } catch (e: any) {
      console.error("[checkout] fatal error:", e?.message || e);
      setError("We could not place your order. Please contact us via WhatsApp and we will assist you.");
    }
    setSaving(false);
  };

  const inputClass = "w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal";

  return (
    <div className="page-padding py-14 md:py-20 max-w-5xl mx-auto">
      <h1 className="section-title mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14">
        <div>
          {/* Steps */}
          <div className="flex gap-6 mb-10">
            <button onClick={() => setStep("shipping")} className={`text-xs tracking-label uppercase pb-2 border-b-2 transition-colors ${step === "shipping" ? "border-charcoal text-charcoal" : "border-transparent text-smoke/40"}`}>Shipping</button>
            <button onClick={() => setStep("payment")} className={`text-xs tracking-label uppercase pb-2 border-b-2 transition-colors ${step === "payment" ? "border-charcoal text-charcoal" : "border-transparent text-smoke/40"}`}>Payment</button>
          </div>

          {step === "shipping" ? (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">First Name</label>
                  <input value={form.firstName} onChange={(e) => upd("firstName", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">Last Name</label>
                  <input value={form.lastName} onChange={(e) => upd("lastName", e.target.value)} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">Phone / WhatsApp</label>
                  <input value={form.phone} onChange={(e) => upd("phone", e.target.value)} placeholder="+1 555 000 0000" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">Address</label>
                <input value={form.address} onChange={(e) => upd("address", e.target.value)} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">City</label>
                  <input value={form.city} onChange={(e) => upd("city", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">Postal Code</label>
                  <input value={form.postalCode} onChange={(e) => upd("postalCode", e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">Country</label>
                <input value={form.country} onChange={(e) => upd("country", e.target.value)} className={inputClass} />
              </div>
              <button onClick={() => setStep("payment")} className="btn-primary w-full mt-4">
                Continue to Payment
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="border border-line p-6">
                <p className="text-sm text-smoke mb-5">Stripe integration ready. Supporting Stripe, PayPal, Apple Pay, and Google Pay.</p>
                <div className="space-y-3">
                  <input placeholder="Card number" className={inputClass} />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM / YY" className={inputClass} />
                    <input placeholder="CVC" className={inputClass} />
                  </div>
                </div>
              </div>
              {error && <p className="text-xs text-red-500 bg-red-50 p-3">{error}</p>}
              <div className="flex gap-4">
                <button onClick={() => setStep("shipping")} className="btn-outline flex-1"><ArrowLeft size={14} className="mr-2" /> Back</button>
                <button onClick={placeOrder} disabled={saving} className="btn-primary flex-1 disabled:opacity-50">
                  {saving ? "Processing..." : `Place Order — $${(total + shipping).toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-ivory/30 p-8 h-fit">
          <h2 className="text-xs tracking-label uppercase text-smoke/50 mb-5">Order Summary</h2>
          <div className="flex flex-col gap-3 mb-6">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="truncate mr-4 text-smoke">{item.product.name}{item.color ? ` (${item.color})` : ""} × {item.quantity}</span>
                <span className="flex-shrink-0">${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-line pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-smoke"><span>Subtotal</span><span>${total.toLocaleString()}</span></div>
            <div className="flex justify-between text-smoke"><span>Shipping</span><span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span></div>
            <div className="flex justify-between font-medium pt-3 border-t border-line"><span>Total</span><span>${(total + shipping).toLocaleString()}</span></div>
          </div>
          {shipping === 0 && <p className="text-xs text-gold mt-3">Complimentary worldwide shipping</p>}
        </div>
      </div>
    </div>
  );
}
