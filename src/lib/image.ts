// 图片优化：智能压缩，保持原始尺寸

export function optimizeImage(url: string): string {
  if (!url) return "";

  // Cloudinary：q_auto 智能压缩（不改格式，安全兼容）
  if (url.includes("res.cloudinary.com") || url.includes("cloudinary.com")) {
    if (url.includes("/q_auto")) return url;
    return url.replace("/upload/", "/upload/q_auto/");
  }

  // Unsplash：质量优化
  if (url.includes("images.unsplash.com")) {
    if (url.includes("q=80")) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}q=80`;
  }

  return url;
}
