/**
 * Video data for SEO optimization
 * Used in JSON-LD structured data
 */

export type VideoLocale = "en" | "zh" | "fr" | "es";

interface VideoLocalizedContent {
  name: string;
  description: string;
}

interface VideoData {
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  localizedContent: {
    en: VideoLocalizedContent;
    zh: VideoLocalizedContent;
  };
}

/**
 * All videos displayed on the website
 * Usage tutorials (3) + Production process (10) = 13 videos total
 */
export const videos: VideoData[] = [
  // === Usage Tutorials (3 videos) ===
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/%E4%BD%BF%E7%94%A8-2.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%B0%81%E9%9D%A2%E5%9B%BE.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Ceramic Amphora Usage Tutorial 1",
        description: "How to use ceramic amphora for wine fermentation",
      },
      zh: {
        name: "陶罐使用教程 1",
        description: "陶罐葡萄酒发酵使用方法演示",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/%E9%99%B6%E7%BD%90-%E4%BD%BF%E7%94%A8-en.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%B0%81%E9%9D%A2%E5%9B%BE.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Ceramic Amphora Usage Guide",
        description: "English guide for ceramic amphora usage",
      },
      zh: {
        name: "陶罐使用指南",
        description: "陶罐英文版使用说明",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/prod/%E8%91%A1%E8%90%84%E9%85%92%E9%99%B6%E7%BD%90%E5%8F%91%E9%85%B52.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%B0%81%E9%9D%A2%E5%9B%BE.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Wine Amphora Fermentation Process",
        description: "Demonstration of wine fermentation in ceramic amphora",
      },
      zh: {
        name: "葡萄酒陶罐发酵过程",
        description: "陶罐葡萄酒发酵过程展示",
      },
    },
  },
  // === Production Process (10 videos) ===
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/%E9%99%B6%E7%BD%90-%E5%88%B6%E4%BD%9C-en.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Amphora Production Process",
        description: "English version of ceramic amphora production",
      },
      zh: {
        name: "陶罐制作工艺",
        description: "陶罐英文版制作工艺展示",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/%E5%88%B6%E4%BD%9C%E8%BF%87%E7%A8%8B-2.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Ceramic Amphora Craftsmanship",
        description: "Traditional ceramic amphora production techniques",
      },
      zh: {
        name: "陶罐制作工艺展示",
        description: "传统陶罐制作工艺展示",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E5%8E%8B%E6%A8%A1%E6%88%90%E5%9E%8B.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Amphora Press Molding",
        description: "Ceramic amphora press molding process",
      },
      zh: {
        name: "陶罐压模成型",
        description: "陶罐压模成型工艺",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E5%8E%8B%E6%A8%A1%E6%88%90%E5%9E%8B2.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Amphora Press Molding Process",
        description: "Detailed ceramic amphora press molding demonstration",
      },
      zh: {
        name: "陶罐压模成型展示",
        description: "陶罐压模成型工艺展示",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B4.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Amphora Molding Workshop",
        description: "Inside the ceramic amphora molding workshop",
      },
      zh: {
        name: "陶罐成型车间",
        description: "陶罐成型车间实拍",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B42.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Amphora Molding Workshop Tour",
        description: "Tour of the ceramic amphora molding workshop",
      },
      zh: {
        name: "陶罐成型车间展示",
        description: "陶罐成型车间实拍",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B43.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Amphora Workshop Operations",
        description: "Ceramic amphora workshop operations footage",
      },
      zh: {
        name: "陶罐车间作业",
        description: "陶罐成型车间作业实拍",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B44.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Amphora Workshop Footage",
        description: "Ceramic amphora workshop footage",
      },
      zh: {
        name: "陶罐车间实录",
        description: "陶罐成型车间实录",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B45.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Amphora Production Line",
        description: "Ceramic amphora production line footage",
      },
      zh: {
        name: "陶罐生产线",
        description: "陶罐成型生产线实拍",
      },
    },
  },
  {
    contentUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/prod/%E6%B3%A5%E5%9D%AF%E5%87%BA%E6%A8%A1%E5%90%8E%E6%89%93%E7%A3%A8.mp4",
    thumbnailUrl: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
    uploadDate: "2024-01-01",
    localizedContent: {
      en: {
        name: "Clay Amphora Polishing After Molding",
        description: "Polishing process after clay amphora mold removal",
      },
      zh: {
        name: "泥坯出模后打磨",
        description: "陶罐泥坯出模后的打磨工艺",
      },
    },
  },
];

/**
 * Get localized video content
 * Falls back to English for locales without specific translations
 */
export function getLocalizedVideoContent(
  video: VideoData,
  locale: VideoLocale
): VideoLocalizedContent {
  if (locale === "zh") {
    return video.localizedContent.zh;
  }
  // Default to English for en, fr, es
  return video.localizedContent.en;
}

/**
 * Generate VideoObject JSON-LD array for a specific locale
 */
export function generateVideoJsonLd(locale: VideoLocale, baseUrl: string): object[] {
  const pageUrl = baseUrl;

  return videos.map((video) => {
    const localizedContent = getLocalizedVideoContent(video, locale);

    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: localizedContent.name,
      description: localizedContent.description,
      thumbnailUrl: video.thumbnailUrl,
      contentUrl: video.contentUrl,
      uploadDate: video.uploadDate,
      embedUrl: `${pageUrl}#media-carousel`,
    };
  });
}
