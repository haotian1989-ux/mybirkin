"use client";

import { useCallback, useRef } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const widgetRef = useRef<any>(null);

  const handleUpload = useCallback(() => {
    if (typeof window === "undefined") return;

    // Load Cloudinary widget if not loaded
    const openWidget = () => {
      const w = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: "vzsmwu1w",
          uploadPreset: "mybirkin_uploads",
          maxFiles: 1,
          sources: ["local", "url", "camera"],
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "avif"],
          maxFileSize: 10000000, // 10MB
          styles: {
            palette: {
              window: "#FAF8F5",
              windowBorder: "#1C1C1C",
              tabIcon: "#1C1C1C",
              menuIcons: "#6B6B6B",
              textDark: "#1C1C1C",
              textLight: "#FAF8F5",
              link: "#B8935A",
              action: "#B8935A",
              inactiveTabIcon: "#C0C0C0",
              error: "#C44",
              inProgress: "#B8935A",
              complete: "#4A8",
              sourceBg: "#F3EFE8",
            },
          },
        },
        (err: any, result: any) => {
          if (!err && result && result.event === "success") {
            onChange(result.info.secure_url);
          }
        }
      );
      widgetRef.current = w;
      w.open();
    };

    if ((window as any).cloudinary) {
      openWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.onload = openWidget;
      document.head.appendChild(script);
    }
  }, [onChange]);

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div>
      {label && (
        <label className="text-[9px] tracking-label uppercase text-smoke/40 block mb-0.5">
          {label}
        </label>
      )}
      {value ? (
        <div className="relative group">
          <div className="aspect-[3/4] max-w-[200px] overflow-hidden bg-ivory/50">
            <img src={value} alt="" className="w-full h-full object-cover" />
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-charcoal/80 text-paper p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={12} />
          </button>
          <button
            onClick={handleUpload}
            className="absolute bottom-1 left-1 bg-paper/90 text-charcoal px-2 py-1 text-[9px] tracking-label uppercase opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Change
          </button>
        </div>
      ) : (
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 border border-dashed border-line px-4 py-3 text-xs text-smoke/50 hover:text-smoke hover:border-smoke transition-colors"
        >
          <Upload size={14} />
          Upload Image
        </button>
      )}
    </div>
  );
}
