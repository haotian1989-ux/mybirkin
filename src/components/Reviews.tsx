"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

const STORAGE_KEY = "mybirkin_reviews";

function loadReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

function saveReviews(reviews: Review[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

// Pre-seeded reviews
const seedReviews: Review[] = [
  { id: "seed-1", productId: "hb-001", author: "Sophie L.", rating: 5, content: "The Mirage Tote exceeded every expectation. The leather is buttery soft and the craftsmanship is immediately apparent. I've had it for three months and it only gets better with age.", date: "2024-12-15" },
  { id: "seed-2", productId: "hb-001", author: "Amara K.", rating: 5, content: "Worth every penny. The hand-stitching is flawless and the suede interior feels incredibly luxurious. I chose Cognac and the patina is developing beautifully.", date: "2024-11-28" },
  { id: "seed-3", productId: "hb-001", author: "Claire V.", rating: 4, content: "Gorgeous bag. The only reason I'm not giving 5 stars is that I wish the shoulder strap was slightly wider for heavier loads. Otherwise, perfection.", date: "2024-10-09" },
  { id: "seed-4", productId: "pt-001", author: "Marcus T.", rating: 5, content: "My Doberman has never looked more distinguished. The collar is substantial without being heavy, and the brass hardware has a wonderful weight to it.", date: "2024-12-01" },
  { id: "seed-5", productId: "pt-001", author: "Yuki H.", rating: 5, content: "Finally, a luxury dog collar that doesn't compromise on quality. The hot-stamped initials were the perfect touch.", date: "2024-11-15" },
  { id: "seed-6", productId: "hb-004", author: "David R.", rating: 5, content: "The Nomad Backpack is the most refined backpack I've ever owned. The bridle leather straps are a work of art. Fits my 16-inch MacBook perfectly.", date: "2024-12-20" },
  { id: "seed-7", productId: "hb-002", author: "Isabella M.", rating: 5, content: "The Serpentine Clutch was the star of my gala. So many compliments. The wave edge is incredibly elegant in person.", date: "2024-11-05" },
];

if (typeof window !== "undefined") {
  const existing = loadReviews();
  if (existing.length === 0) {
    saveReviews(seedReviews);
  }
}

export default function Reviews({ productId, productName }: { productId: string; productName: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverStar, setHoverStar] = useState(0);

  useEffect(() => {
    const all = loadReviews();
    // Merge seeds if not present
    const ids = new Set(all.map((r) => r.id));
    const missing = seedReviews.filter((s) => !ids.has(s.id));
    if (missing.length > 0) {
      const merged = [...all, ...missing];
      saveReviews(merged);
      setReviews(merged.filter((r) => r.productId === productId));
    } else {
      setReviews(all.filter((r) => r.productId === productId));
    }
  }, [productId]);

  const productReviews = reviews;
  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length).toFixed(1)
    : "0.0";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const all = loadReviews();
    const newReview: Review = {
      id: Date.now().toString(),
      productId,
      author: author.trim() || "Anonymous",
      rating,
      content: content.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    saveReviews([newReview, ...all]);
    setReviews([newReview, ...reviews]);
    setAuthor("");
    setContent("");
    setRating(5);
    setShowForm(false);
  };

  return (
    <section className="mt-20 pt-16 border-t border-line">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-serif text-xl md:text-2xl mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={s <= Math.round(Number(avgRating)) ? "fill-gold text-gold" : "text-border"}
                />
              ))}
            </div>
            <span className="text-sm text-smoke">
              {avgRating} · {productReviews.length} review{productReviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-outline">
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Review form */}
      {showForm && (
        <form onSubmit={submit} className="bg-ivory/30 p-8 mb-10 space-y-5">
          <h3 className="text-sm tracking-label uppercase text-smoke/60">Share Your Experience</h3>
          <div>
            <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverStar(s)}
                  onMouseLeave={() => setHoverStar(0)}
                >
                  <Star
                    size={20}
                    className={s <= (hoverStar || rating) ? "fill-gold text-gold" : "text-border"}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-2">Your Name</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="How should we address you?" className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal" />
          </div>
          <div>
            <label className="text-[11px] tracking-label uppercase text-smoke/50 block mb-2">Your Review</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={4} placeholder="Tell us about your experience with {productName}..." className="w-full border border-line bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal resize-none" />
          </div>
          <button type="submit" className="btn-primary">Submit Review</button>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-8">
        {productReviews.length === 0 && !showForm && (
          <p className="text-smoke text-sm">No reviews yet. Be the first to share your experience.</p>
        )}
        {productReviews.map((r) => (
          <div key={r.id} className="pb-8 border-b border-line last:border-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className={s <= r.rating ? "fill-gold text-gold" : "text-border"} />
                ))}
              </div>
              <span className="text-xs text-smoke/60">{r.date}</span>
            </div>
            <p className="text-sm text-smoke leading-relaxed mb-2">{r.content}</p>
            <p className="text-xs text-smoke/50">— {r.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
