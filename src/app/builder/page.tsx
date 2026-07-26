"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartContext";
import {
  defaultLeatherTypes, defaultColors, defaultHardware,
  defaultSilhouettes, defaultArtisans,
  LeatherType, ColorOption, HardwareOption, SilhouetteOption, ArtisanOption,
} from "@/lib/builder-data";
import AdminPanel from "@/components/AdminPanel";

function useStored<T>(key: string, defaults: T[]): [T[], boolean] {
  const [items, setItems] = useState<T[]>(defaults);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length > 0) { setItems(p); setLoaded(true); return; } }
    } catch {}
    setItems(defaults);
    localStorage.setItem(key, JSON.stringify(defaults));
    setLoaded(true);
    const onStorage = () => {
      try {
        const r = localStorage.getItem(key);
        if (r) { const p = JSON.parse(r); if (Array.isArray(p) && p.length > 0) setItems(p); }
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, defaults]);
  return [items, loaded];
}

const stepLabels = ["Leather", "Color", "Hardware", "Silhouette", "Artisan"];

export default function BuilderPage() {
  const { dispatch } = useCart();
  const [step, setStep] = useState(0);
  const [leatherId, setLeather] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [bicolor, setBicolor] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState("");
  const [hardwareId, setHardware] = useState("");
  const [silhouetteId, setSilhouette] = useState("");
  const [artisanId, setArtisan] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);

  const [leathers] = useStored<LeatherType>("myb_admin_leathers", defaultLeatherTypes as any);
  const [colors] = useStored<ColorOption>("myb_admin_colors", defaultColors);
  const [hardwares] = useStored<HardwareOption>("myb_admin_hardware", defaultHardware as any);
  const [silhouettes] = useStored<SilhouetteOption>("myb_admin_silhouettes", defaultSilhouettes as any);
  const [artisans] = useStored<ArtisanOption>("myb_admin_artisans", defaultArtisans as any);

  const leather = leathers.find((l: any) => l.id === leatherId);
  const hw = hardwares.find((h: any) => h.id === hardwareId);
  const sil = silhouettes.find((s: any) => s.id === silhouetteId);
  const art = artisans.find((a: any) => a.id === artisanId);
  const pColor = colors.find((c: any) => c.id === primaryColor);
  const sColor = colors.find((c: any) => c.id === secondaryColor);

  const hwPrice = (hw as any)?.price || 0;
  const totalPrice = ((sil as any)?.basePrice || 0) + hwPrice;

  const canNext = () => {
    if (step === 0 && !leatherId) return false;
    if (step === 1 && !primaryColor) return false;
    if (step === 1 && bicolor && !secondaryColor) return false;
    if (step === 2 && !hardwareId) return false;
    if (step === 3 && !silhouetteId) return false;
    if (step === 4 && !artisanId) return false;
    return true;
  };

  const progress = ((step + 1) / 5) * 100;

  const handleAddToCart = useCallback(() => {
    if (!leather || !sil || !pColor) return;
    const l = leather as any; const s = sil as any; const h = hw as any; const a = art as any;
    const colorLabel = bicolor && sColor ? `${pColor.name} × ${sColor.name} (Bicolor)` : pColor.name;

    dispatch({
      type: "ADD_ITEM",
      product: {
        id: `custom-${Date.now()}`,
        name: `Custom ${s.name}`,
        slug: "",
        category: "handbags",
        price: totalPrice,
        description: `${l.name} leather · ${colorLabel} · ${h?.name || ""} hardware · By ${a?.name || "Master Artisan"}`,
        details: [
          `Leather: ${l.name}${l.hermesEquivalent ? ` (Hermès ${l.hermesEquivalent})` : ""}`,
          bicolor ? `Color: Bicolor — ${pColor.name} body / ${sColor?.name || ""} trim` : `Color: ${pColor.name}`,
          `Hardware: ${h?.name || ""} (${h?.material || ""})`,
          `Artisan: ${a?.name || ""}`,
          `Silhouette: ${s.name}`,
          `Bespoke order — 4-6 weeks production`,
        ],
        materials: `${l.name} leather, ${h?.name || ""} hardware`,
        dimensions: s.desc || "",
        colors: bicolor && sColor ? [`${pColor.name} × ${sColor.name}`] : [pColor.name],
        images: [s.image || ""],
        inStock: true,
        featured: false,
        newArrival: false,
      },
    });
  }, [leather, sil, pColor, sColor, hw, art, bicolor, totalPrice, dispatch]);

  return (
    <div className="page-padding py-14 md:py-20">
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-1">
          <p className="section-label">Bespoke Atelier</p>
          <button onClick={() => setShowAdmin(!showAdmin)} className="text-[10px] tracking-label uppercase text-smoke/30 hover:text-smoke transition-colors">
            {showAdmin ? "Close Admin" : "Manage Data"}
          </button>
        </div>
        <h1 className="section-title mb-3">Design Your Piece</h1>
        <p className="body-text">Select leather, colors, hardware, silhouette, and artisan.</p>
        <div className="mt-8">
          <div className="flex justify-between mb-2">
            {stepLabels.map((t, i) => (
              <span key={t} className={`text-[10px] tracking-label uppercase ${i <= step ? "text-charcoal" : "text-smoke/30"}`}>{t}</span>
            ))}
          </div>
          <div className="h-0.5 bg-line rounded-full overflow-hidden">
            <div className="h-full bg-charcoal transition-all duration-600 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {showAdmin && <AdminPanel />}

      <div className="max-w-4xl mx-auto">
        {/* Step 0: Leather */}
        {step === 0 && (
          <div>
            <h2 className="font-serif text-xl md:text-2xl mb-1">Choose Your Leather</h2>
            <p className="text-xs text-smoke/60 mb-8">Each leather has a distinct character.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {leathers.map((l: any) => (
                <button key={l.id} onClick={() => setLeather(l.id)}
                  className={`text-left p-5 border transition-all duration-300 ${
                    leatherId === l.id ? "border-charcoal ring-1 ring-charcoal" : "border-line hover:border-charcoal/30"}`}>
                  <p className="text-sm font-medium">{l.name}</p>
                  {l.hermesEquivalent && <p className="text-[10px] text-gold tracking-label uppercase">Hermès {l.hermesEquivalent}</p>}
                  {l.grain && <p className="text-[10px] text-smoke/60 mt-1 capitalize">· {l.grain} grain</p>}
                  {l.bestFor && <p className="text-[10px] text-smoke/50 mt-0.5">{l.bestFor}</p>}
                  <p className="text-[10px] text-smoke/40 leading-relaxed mt-1.5">{typeof l.characteristics === "string" ? l.characteristics.slice(0, 80) : ""}...</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Colors */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-xl md:text-2xl mb-1">Choose Your Color</h2>
            <p className="text-xs text-smoke/60 mb-2">
              {(leather as any)?.name} leather in your perfect shade.
            </p>
            <label className="inline-flex items-center gap-2 mb-6 cursor-pointer">
              <input type="checkbox" checked={bicolor} onChange={(e) => { setBicolor(e.target.checked); if (!e.target.checked) setSecondaryColor(""); }} className="w-4 h-4 accent-charcoal" />
              <span className="text-xs text-smoke">Bicolor — two-tone body &amp; trim</span>
            </label>

            <p className="text-[10px] tracking-label uppercase text-smoke/40 mb-3">{bicolor ? "Body Color" : "Color"}</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
              {colors.map((c: any) => (
                <button key={c.id} onClick={() => setPrimaryColor(c.id)} disabled={bicolor && c.id === secondaryColor}
                  className={`flex flex-col items-center gap-2 p-3 border transition-all ${
                    primaryColor === c.id ? "border-charcoal ring-1 ring-charcoal" : "border-line hover:border-charcoal/30"
                  } ${bicolor && c.id === secondaryColor ? "opacity-30 cursor-not-allowed" : ""}`}>
                  <div className="w-8 h-8 rounded-full border border-line/50" style={{ backgroundColor: c.hex }} />
                  <span className="text-[10px] text-center leading-tight">{c.name}</span>
                </button>
              ))}
            </div>
            {bicolor && (
              <>
                <p className="text-[10px] tracking-label uppercase text-smoke/40 mb-3">Trim / Accent Color</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {colors.map((c: any) => (
                    <button key={c.id} onClick={() => setSecondaryColor(c.id)} disabled={c.id === primaryColor}
                      className={`flex flex-col items-center gap-2 p-3 border transition-all ${
                        secondaryColor === c.id ? "border-charcoal ring-1 ring-charcoal" : "border-line hover:border-charcoal/30"
                      } ${c.id === primaryColor ? "opacity-30 cursor-not-allowed" : ""}`}>
                      <div className="w-8 h-8 rounded-full border border-line/50" style={{ backgroundColor: c.hex }} />
                      <span className="text-[10px] text-center leading-tight">{c.name}</span>
                    </button>
                  ))}
                </div>
                {primaryColor && secondaryColor && (
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex gap-0"><div className="w-8 h-6 border border-line" style={{ backgroundColor: pColor?.hex }} /><div className="w-8 h-6 border border-line border-l-0" style={{ backgroundColor: sColor?.hex }} /></div>
                    <span className="text-xs text-smoke">{pColor?.name} body · {sColor?.name} trim</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Step 2: Hardware */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-xl md:text-2xl mb-1">Choose Your Hardware</h2>
            <p className="text-xs text-smoke/60 mb-8">Solid brass, hand-finished.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hardwares.map((h: any) => (
                <button key={h.id} onClick={() => setHardware(h.id)}
                  className={`flex items-center gap-4 p-5 border text-left transition-all ${
                    hardwareId === h.id ? "border-charcoal ring-1 ring-charcoal" : "border-line hover:border-charcoal/30"}`}>
                  <div className="w-12 h-12 rounded-full border border-line/50 flex-shrink-0" style={{ backgroundColor: h.hex }} />
                  <div>
                    <p className="text-sm font-medium">{h.name}</p>
                    <p className="text-[10px] text-smoke/60">{h.material}</p>
                    <p className="text-[10px] text-smoke/40 mt-0.5">{h.description}</p>
                  </div>
                  {h.price > 0 && <span className="text-[10px] text-gold ml-auto flex-shrink-0">+${h.price}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Silhouette */}
        {step === 3 && (
          <div>
            <h2 className="font-serif text-xl md:text-2xl mb-1">Choose Your Silhouette</h2>
            <p className="text-xs text-smoke/60 mb-8">The foundation of your design.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {silhouettes.map((s: any) => (
                <button key={s.id} onClick={() => setSilhouette(s.id)}
                  className={`p-5 border text-left transition-all ${
                    silhouetteId === s.id ? "border-charcoal ring-1 ring-charcoal" : "border-line hover:border-charcoal/30"}`}>
                  <p className="text-sm font-medium">{s.name}</p>
                  {s.dimensions && <p className="text-[10px] text-smoke/60 mt-1">{s.dimensions}</p>}
                  {s.desc && <p className="text-[10px] text-smoke/40 mt-1 leading-relaxed">{s.desc}</p>}
                  <p className="text-sm mt-2">${(s.basePrice || 0).toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Artisan */}
        {step === 4 && (
          <div>
            <h2 className="font-serif text-xl md:text-2xl mb-1">Choose Your Artisan</h2>
            <p className="text-xs text-smoke/60 mb-8">Who will bring your vision to life?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {artisans.map((a: any) => (
                <button key={a.id} onClick={() => setArtisan(a.id)}
                  className={`p-5 border text-left transition-all ${
                    artisanId === a.id ? "border-charcoal ring-1 ring-charcoal" : "border-line hover:border-charcoal/30"}`}>
                  <p className="text-sm font-medium">{a.name}</p>
                  <p className="text-[10px] text-smoke/60">{a.role}{a.years ? ` · ${a.years} yrs` : ""}</p>
                  {a.quote && <p className="text-[10px] text-smoke/40 italic mt-2 leading-relaxed">"{a.quote}"</p>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-line">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className={`text-xs tracking-label uppercase flex items-center gap-1.5 ${step === 0 ? "text-smoke/20 cursor-not-allowed" : "text-smoke hover:text-charcoal"}`}>
            <ArrowLeft size={14} /> Back
          </button>
          {step < 4 ? (
            <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()}
              className={`btn-primary ${!canNext() ? "opacity-30 cursor-not-allowed hover:!bg-charcoal hover:!text-paper" : ""}`}>
              Next <ArrowRight size={14} className="ml-2" />
            </button>
          ) : (
            <Link href="/checkout" onClick={handleAddToCart} className="btn-primary">
              Add to Bag — ${totalPrice.toLocaleString()}
            </Link>
          )}
        </div>

        {(leather || primaryColor || hardwareId || silhouetteId) && (
          <div className="mt-8 p-5 border border-line bg-ivory/20">
            <p className="text-[10px] tracking-label uppercase text-smoke/40 mb-3">Your Configuration</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-smoke">
              {leather && <span>👜 {(leather as any).name}{(leather as any).hermesEquivalent ? ` (H. ${(leather as any).hermesEquivalent})` : ""}</span>}
              {pColor && <span>🎨 {bicolor && sColor ? "Bicolor: " : ""}{pColor.name}{bicolor && sColor ? ` × ${sColor.name}` : ""}</span>}
              {hw && <span>✨ {(hw as any).name}</span>}
              {sil && <span>📐 {(sil as any).name}</span>}
              {art && <span>👤 {(art as any).name}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
