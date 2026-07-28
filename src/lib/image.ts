// 图片优化：自动格式 + 智能压缩，保持原始尺寸

export function optimizeImage(url: string): string {
  if (!url) return url;

  // Cloudinary：f_auto 自动 WebP/AVIF，q_auto 智能压缩
  if (url.includes("res.cloudinary.com") || url.includes("cloudinary.com")) {
    if (url.includes("/f_auto")) return url; // 已优化
    return url.replace("/upload/", "/upload/f_auto,q_auto/");
  }

  // Unsplash：自动格式 + 质量
  if (url.includes("images.unsplash.com")) {
    if (url.includes("auto=format")) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}q=80&auto=format`;
  }

  return url;
}
