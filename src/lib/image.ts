// 图片优化（暂时直接返回原URL，排查问题中）

export function optimizeImage(url: string): string {
  return url || "";
}

// 把图片裁剪为指定尺寸的正方形（默认 800x800，Cloudinary 居中裁剪）
export function squareImage(url: string, size = 800): string {
  if (!url) return "";
  if (url.includes("res.cloudinary.com")) {
    return url.replace("/upload/", `/upload/c_fill,w_${size},h_${size}/`);
  }
  if (url.includes("placehold.co")) {
    return url.replace(/placehold\.co\/\d+x\d+/, `placehold.co/${size}x${size}`);
  }
  return url;
}
