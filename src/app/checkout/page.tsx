"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { Check, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { state, total, dispatch } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const shipping = total >= 500 ? 0 : 35;

  if (state.items.length === 0 && !submitted) {
    return (
      <div className="page-padding py-32 text-center max-w-lg mx-auto">
        <h1 className="font-serif text-2xl mb-4">您的购物袋是空的</h1>
        <p className="text-smoke mb-8">选购一些精美单品开始吧。</p>
        <Link href="/shop" className="btn-primary">浏览系列</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page-padding py-32 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-gold" />
        </div>
        <h1 className="font-serif text-2xl mb-4">订单已确认</h1>
        <p className="text-smoke mb-2">感谢您的订单。我们将很快开始制作您的作品。</p>
        <p className="text-xs text-smoke/60 mb-8">确认邮件将发送给您。每件作品需要2-4周手工制作。</p>
        <Link href="/shop" className="btn-primary">继续购物</Link>
      </div>
    );
  }

  return (
    <div className="page-padding py-14 md:py-20 max-w-5xl mx-auto">
      <h1 className="section-title mb-12">结算</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14">
        <div>
          {/* Steps */}
          <div className="flex gap-6 mb-10">
            <button onClick={() => setStep("shipping")} className={`text-xs tracking-label uppercase pb-2 border-b-2 transition-colors ${step === "shipping" ? "border-charcoal text-charcoal" : "border-transparent text-smoke/40"}`}>配送信息</button>
            <button onClick={() => setStep("payment")} className={`text-xs tracking-label uppercase pb-2 border-b-2 transition-colors ${step === "payment" ? "border-charcoal text-charcoal" : "border-transparent text-smoke/40"}`}>支付</button>
          </div>

          {step === "shipping" ? (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">名</label>
                  <input required className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
                </div>
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">姓</label>
                  <input required className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">邮箱</label>
                <input type="email" required className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div>
                <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">地址</label>
                <input required className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">城市</label>
                  <input required className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
                </div>
                <div>
                  <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">邮编</label>
                  <input required className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-1.5">国家</label>
                <input required className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <button onClick={() => setStep("payment")} className="btn-primary w-full mt-4">
                继续支付
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="border border-line p-6">
                <p className="text-sm text-smoke mb-5">支付系统已就绪，支持 Stripe、PayPal、Apple Pay 和 Google Pay。</p>
                <div className="space-y-3">
                  <input placeholder="卡号" className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="月 / 年" className="border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
                    <input placeholder="CVC" className="border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep("shipping")} className="btn-outline flex-1"><ArrowLeft size={14} className="mr-2" /> 返回</button>
                <button
                  onClick={() => { setSubmitted(true); dispatch({ type: "CLEAR_CART" }); }}
                  className="btn-primary flex-1"
                >
                  提交订单 — ${(total + shipping).toLocaleString()}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-ivory/30 p-8 h-fit">
          <h2 className="text-xs tracking-label uppercase text-smoke/50 mb-5">订单摘要</h2>
          <div className="flex flex-col gap-3 mb-6">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="truncate mr-4 text-smoke">{item.product.name}{item.color ? ` (${item.color})` : ""} × {item.quantity}</span>
                <span className="flex-shrink-0">${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-line pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-smoke"><span>小计</span><span>${total.toLocaleString()}</span></div>
            <div className="flex justify-between text-smoke"><span>配送信息</span><span>{shipping === 0 ? "免费" : `$${shipping}`}</span></div>
            <div className="flex justify-between font-medium pt-3 border-t border-line"><span>合计</span><span>${(total + shipping).toLocaleString()}</span></div>
          </div>
          {shipping === 0 && <p className="text-xs text-gold mt-3">免费 worldwide shipping</p>}
        </div>
      </div>
    </div>
  );
}
