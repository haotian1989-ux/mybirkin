"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

interface ContactLink {
  type: "whatsapp" | "telegram";
  label: string;
  url: string;
}

const defaultLinks: ContactLink[] = [
  { type: "whatsapp", label: "WhatsApp", url: "https://wa.me/0000000000" },
  { type: "telegram", label: "Telegram", url: "https://t.me/mybirkin" },
];

const STORAGE_KEY = "myb_contact_links";

function loadLinks(): ContactLink[] {
  if (typeof window === "undefined") return defaultLinks;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultLinks;
}

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState<ContactLink[]>(defaultLinks);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLinks(loadLinks());
    // Show after a short delay for animation
    const t = setTimeout(() => setVisible(true), 1500);
    // Listen for storage changes from admin panel
    const handler = () => setLinks(loadLinks());
    window.addEventListener("storage", handler);
    return () => {
      clearTimeout(t);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (links.length === 0) return null;

  return (
    <div
      className={`fixed bottom-8 right-6 md:right-10 z-40 flex flex-col items-end gap-2 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Expanded contact options */}
      {open && (
        <div className="flex flex-col gap-2 mb-2">
          {links.map((link) => (
            <a
              key={link.type}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center gap-3 px-5 py-3 text-sm shadow-lg transition-all duration-300
                animate-[slideUp_0.3s_ease-out]
                ${link.type === "whatsapp"
                  ? "bg-[#25D366] text-white hover:bg-[#20bd5a]"
                  : "bg-[#0088cc] text-white hover:bg-[#0077b3]"
                }
              `}
              onClick={() => setOpen(false)}
            >
              <span className="text-xs tracking-label uppercase font-medium">
                {link.label}
              </span>
              <span className="text-[10px] opacity-70">→</span>
            </a>
          ))}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          w-14 h-14 rounded-full shadow-xl flex items-center justify-center
          transition-all duration-400 ease-out
          ${open
            ? "bg-charcoal text-paper rotate-90 scale-110"
            : "bg-charcoal text-paper hover:bg-gold hover:text-charcoal hover:scale-110"
          }
        `}
        aria-label={open ? "Close contact" : "Contact us"}
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <MessageCircle size={20} strokeWidth={1.5} />}
      </button>

      {/* Pulse ring */}
      {!open && (
        <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-charcoal/20 animate-ping pointer-events-none" />
      )}
    </div>
  );
}
