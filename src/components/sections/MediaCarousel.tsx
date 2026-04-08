"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa6";

interface MediaItem {
  type: "video" | "image";
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
}

interface ImageCategory {
  key: string;
  title: string;
  images: MediaItem[];
}

export default function MediaCarousel() {
  const t = useTranslations("MediaCarousel");
  const tCat = useTranslations("MediaCategories");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<"video" | "image">("video");
  const [activeVideoCategory, setActiveVideoCategory] = useState<"usage" | "production">("usage");
  const [activeImageCategory, setActiveImageCategory] = useState<"processing" | "cases">("processing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 视频区 - 使用
  const usageVideos: MediaItem[] = [
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/%E4%BD%BF%E7%94%A8-2.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%B0%81%E9%9D%A2%E5%9B%BE.png",
      title: locale === "zh" ? "使用教程 1" : "Usage Tutorial 1",
      description: locale === "zh" ? "陶罐使用方法演示" : "How to use the ceramic amphora",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/%E9%99%B6%E7%BD%90-%E4%BD%BF%E7%94%A8-en.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%B0%81%E9%9D%A2%E5%9B%BE.png",
      title: locale === "zh" ? "使用教程 2" : "Usage Tutorial 2",
      description: locale === "zh" ? "英文版使用说明" : "English usage guide",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/prod/%E8%91%A1%E8%90%84%E9%85%92%E9%99%B6%E7%BD%90%E5%8F%91%E9%85%B52.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%B0%81%E9%9D%A2%E5%9B%BE.png",
      title: locale === "zh" ? "葡萄酒陶罐发酵 2" : "Wine Fermentation 2",
      description: locale === "zh" ? "陶罐葡萄酒发酵过程展示" : "Wine fermentation process demonstration",
    },
  ];

  // 视频区 - 制作
  const productionVideos: MediaItem[] = [
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/%E9%99%B6%E7%BD%90-%E5%88%B6%E4%BD%9C-en.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "制作过程 1" : "Production Process 1",
      description: locale === "zh" ? "英文版制作工艺" : "English production process",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/%E5%88%B6%E4%BD%9C%E8%BF%87%E7%A8%8B-2.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "制作过程 2" : "Production Process 2",
      description: locale === "zh" ? "陶罐制作工艺展示" : "Ceramic amphora production",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E5%8E%8B%E6%A8%A1%E6%88%90%E5%9E%8B.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "压模成型 1" : "Press Molding 1",
      description: locale === "zh" ? "陶罐压模成型工艺" : "Ceramic press molding process",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E5%8E%8B%E6%A8%A1%E6%88%90%E5%9E%8B2.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "压模成型 2" : "Press Molding 2",
      description: locale === "zh" ? "陶罐压模成型工艺展示" : "Ceramic press molding demonstration",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B4.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "成型车间 1" : "Molding Workshop 1",
      description: locale === "zh" ? "陶罐成型车间实拍" : "Ceramic molding workshop footage",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B42.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "成型车间 2" : "Molding Workshop 2",
      description: locale === "zh" ? "陶罐成型车间实拍" : "Ceramic molding workshop footage",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B43.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "成型车间 3" : "Molding Workshop 3",
      description: locale === "zh" ? "陶罐成型车间实拍" : "Ceramic molding workshop footage",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B44.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "成型车间 4" : "Molding Workshop 4",
      description: locale === "zh" ? "陶罐成型车间实拍" : "Ceramic molding workshop footage",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/car/%E9%99%B6%E7%BD%90%E6%88%90%E5%9E%8B%E8%BD%A6%E9%97%B45.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "成型车间 5" : "Molding Workshop 5",
      description: locale === "zh" ? "陶罐成型车间实拍" : "Ceramic molding workshop footage",
    },
    {
      type: "video",
      src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/medio/prod/%E6%B3%A5%E5%9D%AF%E5%87%BA%E6%A8%A1%E5%90%8E%E6%89%93%E7%A3%A8.mp4",
      thumbnail: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/%E9%99%B6%E7%BD%90/%E5%9B%BE%E7%89%87/%E5%88%B6%E4%BD%9C1.png",
      title: locale === "zh" ? "泥坯出模后打磨" : "Molded Clay Polishing",
      description: locale === "zh" ? "陶罐泥坯出模后的打磨工艺" : "Polishing process after clay mold removal",
    },
  ];

  // 图片区 - 加工
  const processingImages: MediaItem[] = [
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/IMG20230313104633.jpg", title: locale === "zh" ? "加工过程 1" : "Processing 1" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240111232446.jpg", title: locale === "zh" ? "加工过程 2" : "Processing 2" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240111232456.jpg", title: locale === "zh" ? "加工过程 3" : "Processing 3" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315104533_112_202.jpg", title: locale === "zh" ? "加工过程 4" : "Processing 4" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315105009_115_202.jpg", title: locale === "zh" ? "加工过程 5" : "Processing 5" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315105133_117_202.jpg", title: locale === "zh" ? "加工过程 6" : "Processing 6" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315105137_118_202.jpg", title: locale === "zh" ? "加工过程 7" : "Processing 7" },
  ];

  // 图片区 - 案例
  const caseImages: MediaItem[] = [
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240109205146.jpg", title: locale === "zh" ? "案例展示 1" : "Case 1" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240115084605.jpg", title: locale === "zh" ? "案例展示 2" : "Case 2" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240115084614.jpg", title: locale === "zh" ? "案例展示 3" : "Case 3" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240115084621.jpg", title: locale === "zh" ? "案例展示 4" : "Case 4" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240115084626.jpg", title: locale === "zh" ? "案例展示 5" : "Case 5" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240115084633.jpg", title: locale === "zh" ? "案例展示 6" : "Case 6" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315104529_108_202.jpg", title: locale === "zh" ? "案例展示 7" : "Case 7" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315104532_111_202.jpg", title: locale === "zh" ? "案例展示 8" : "Case 8" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315123737_119_202.jpg", title: locale === "zh" ? "案例展示 9" : "Case 9" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315123740_120_202.jpg", title: locale === "zh" ? "案例展示 10" : "Case 10" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315123744_121_202.jpg", title: locale === "zh" ? "案例展示 11" : "Case 11" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315123748_122_202.jpg", title: locale === "zh" ? "案例展示 12" : "Case 12" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315123752_123_202.jpg", title: locale === "zh" ? "案例展示 13" : "Case 13" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315123800_125_202.jpg", title: locale === "zh" ? "案例展示 14" : "Case 14" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315124013_128_202.jpg", title: locale === "zh" ? "案例展示 15" : "Case 15" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315124022_131_202.jpg", title: locale === "zh" ? "案例展示 16" : "Case 16" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315124025_132_202.jpg", title: locale === "zh" ? "案例展示 17" : "Case 17" },
    { type: "image", src: "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260315124030_133_202.jpg", title: locale === "zh" ? "案例展示 18" : "Case 18" },
  ];

  const currentVideoItems = activeVideoCategory === "usage" ? usageVideos : productionVideos;
  const currentImageItems = activeImageCategory === "processing" ? processingImages : caseImages;
  const currentItems = activeTab === "video" ? currentVideoItems : currentImageItems;
  const currentItem = currentItems[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentItems.length - 1 : prev - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === currentItems.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  };

  const handleTabChange = (tab: "video" | "image") => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const handleVideoCategoryChange = (category: "usage" | "production") => {
    setActiveVideoCategory(category);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const handleImageCategoryChange = (category: "processing" | "cases") => {
    setActiveImageCategory(category);
    setCurrentIndex(0);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative py-10 md:py-20 lg:py-28 bg-gradient-to-b from-wine-dark to-wine-red/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleTabChange("video")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "video"
                ? "bg-champagne-gold text-wine-dark"
                : "border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold/10"
            }`}
          >
            {t("videoTab")}
          </button>
          <button
            onClick={() => handleTabChange("image")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "image"
                ? "bg-champagne-gold text-wine-dark"
                : "border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold/10"
            }`}
          >
            {t("imageTab")}
          </button>
        </div>

        {/* Video Category Buttons - Only show when video tab is active */}
        {activeTab === "video" && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleVideoCategoryChange("usage")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeVideoCategory === "usage"
                  ? "bg-wine-red/50 text-champagne-gold border border-champagne-gold/50"
                  : "text-gray-400 hover:text-champagne-gold"
              }`}
            >
              {tCat("usage")}
            </button>
            <button
              onClick={() => handleVideoCategoryChange("production")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeVideoCategory === "production"
                  ? "bg-wine-red/50 text-champagne-gold border border-champagne-gold/50"
                  : "text-gray-400 hover:text-champagne-gold"
              }`}
            >
              {tCat("production")}
            </button>
          </div>
        )}

        {/* Image Category Buttons - Only show when image tab is active */}
        {activeTab === "image" && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleImageCategoryChange("processing")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeImageCategory === "processing"
                  ? "bg-wine-red/50 text-champagne-gold border border-champagne-gold/50"
                  : "text-gray-400 hover:text-champagne-gold"
              }`}
            >
              {tCat("processing")}
            </button>
            <button
              onClick={() => handleImageCategoryChange("cases")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeImageCategory === "cases"
                  ? "bg-wine-red/50 text-champagne-gold border border-champagne-gold/50"
                  : "text-gray-400 hover:text-champagne-gold"
              }`}
            >
              {tCat("cases")}
            </button>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Display */}
          <div className={`relative bg-wine-dark/50 rounded-2xl overflow-hidden border-2 border-champagne-gold/30 ${
            currentItem.type === "video" 
              ? "aspect-[9/16] sm:aspect-video max-h-[70vh]" 
              : "aspect-video"
          }`}>
            {currentItem.type === "video" ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={currentItem.src}
                  className="w-full h-full object-contain"
                  onEnded={() => setIsPlaying(false)}
                  preload="metadata"
                />
                {/* Play/Pause Overlay */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group"
                  >
                    <div className="w-20 h-20 bg-champagne-gold/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPlay className="text-3xl text-wine-dark ml-1" />
                    </div>
                  </button>
                )}
                {isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-wine-dark/70 hover:bg-champagne-gold/90 rounded-full flex items-center justify-center transition-all group"
                  >
                    <FaPause className="text-xl text-champagne-gold group-hover:text-wine-dark" />
                  </button>
                )}
              </div>
            ) : (
              <img
                src={currentItem.src}
                alt={currentItem.title}
                className="w-full h-full object-contain bg-wine-dark/80"
              />
            )}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-wine-dark/70 hover:bg-champagne-gold/90 rounded-full flex items-center justify-center transition-all group"
            >
              <FaChevronLeft className="text-xl text-champagne-gold group-hover:text-wine-dark" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-wine-dark/70 hover:bg-champagne-gold/90 rounded-full flex items-center justify-center transition-all group"
            >
              <FaChevronRight className="text-xl text-champagne-gold group-hover:text-wine-dark" />
            </button>
          </div>

          {/* Item Info */}
          <div className="text-center mt-6">
            <h3 className="text-xl md:text-2xl font-display font-bold text-champagne-gold">
              {currentItem.title}
            </h3>
            {currentItem.description && (
              <p className="text-gray-400 mt-2">{currentItem.description}</p>
            )}
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {currentItems.map((item: MediaItem, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(false);
                }}
                className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-champagne-gold ring-offset-2 ring-offset-wine-dark"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <FaPlay className="text-white text-sm" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {currentItems.map((_: MediaItem, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-champagne-gold w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
