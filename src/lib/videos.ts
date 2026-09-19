/**
 * Video data for SEO optimization
 * Used in JSON-LD structured data
 *
 * 视频 URL 直接硬编码(每条对应 OSS 上的 mp4 文件,语义化命名)。
 * 缩略图(thumbnailUrl)统一引用 lib/images —— 修改封面/工艺图只动 images.ts。
 *
 * 2026-09:项目只剩英文版,localizedContent 不再有 zh 分支
 */

import { images } from "@/lib/images";

export type VideoLocale = "en";

interface VideoContent {
  name: string;
  description: string;
}

interface VideoData {
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  content: VideoContent;
}

/**
 * All videos displayed on the website
 * Usage (2) + Production (2) = 4 videos
 *
 * ⚠️ 当前 produce 分类的 URL 跟 use 指向同一文件夹(/jar/attach/video/use/),
 *    后续若 produce 视频迁到独立路径,只改下面 2 条 contentUrl 即可
 */
export const videos: VideoData[] = [
  // === Usage Tutorials (2 videos) ===
  {
    contentUrl: "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/video/use/%E4%BD%BF%E7%94%A8-1.mp4",
    thumbnailUrl: images.hero.background,
    uploadDate: "2024-01-01",
    content: {
      name: "Ceramic Amphora Usage Tutorial 1",
      description: "How to use ceramic amphora for wine fermentation",
    },
  },
  {
    contentUrl: "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/video/use/%E4%BD%BF%E7%94%A8-2.mp4",
    thumbnailUrl: images.hero.background,
    uploadDate: "2024-01-01",
    content: {
      name: "Ceramic Amphora Usage Tutorial 2",
      description: "How to use ceramic amphora for wine fermentation",
    },
  },
  // === Production Process (2 videos) ===
  {
    contentUrl: "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/video/use/%E4%BD%BF%E7%94%A8-2.mp4",
    thumbnailUrl: images.craftsmanship.process1,
    uploadDate: "2024-01-01",
    content: {
      name: "Amphora Production Process 1",
      description: "Ceramic amphora production process demonstration",
    },
  },
  {
    contentUrl: "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/video/use/%E4%BD%BF%E7%94%A8-1.mp4",
    thumbnailUrl: images.craftsmanship.process1,
    uploadDate: "2024-01-01",
    content: {
      name: "Amphora Production Process 2",
      description: "Ceramic amphora production process demonstration",
    },
  },
];

/**
 * Generate VideoObject JSON-LD array
 */
export function generateVideoJsonLd(locale: VideoLocale, baseUrl: string): object[] {
  const pageUrl = baseUrl;

  return videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.content.name,
    description: video.content.description,
    thumbnailUrl: video.thumbnailUrl,
    contentUrl: video.contentUrl,
    embedUrl: `${pageUrl}#media-carousel`,
    uploadDate: video.uploadDate,
  }));
}