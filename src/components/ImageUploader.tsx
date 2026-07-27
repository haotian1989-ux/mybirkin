"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mybirkin_uploads");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/vzsmwu1w/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
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
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-charcoal/80 text-paper p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={12} />
          </button>
          <label className="absolute bottom-1 left-1 bg-paper/90 text-charcoal px-2 py-1 text-[9px] tracking-label uppercase opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            本地上传
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        </div>
      ) : (
        <label className="flex items-center gap-2 border border-dashed border-line px-4 py-3 text-xs text-smoke/50 hover:text-smoke hover:border-smoke transition-colors cursor-pointer">
          {uploading ? (
            <Loader size={14} className="animate-spin" />
          ) : (
            <Upload size={14} />
          )}
          {uploading ? "上传中..." : "本地上传"}
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      )}
    </div>
  );
}
