// 图片优化（暂时直接返回原URL，排查问题中）

export function optimizeImage(url: string): string {
  return url || "";
}

// 正方形展示：不强制 Cloudinary 变换（避免严格变换模式下 404），
// 由容器 aspect-square + object-cover 完成居中裁剪
export function squareImage(url: string, size = 800): string {
  if (!url) return "";
  if (url.includes("placehold.co")) {
    return url.replace(/placehold\.co\/\d+x\d+/, `placehold.co/${size}x${size}`);
  }
  return url;
}
