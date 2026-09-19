"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa6";

interface MediaItem {
  type: "video" | "image";
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
}

interface MediaPanelProps {
  type: "video" | "image";
  items: MediaItem[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

function MediaPanel({
  type,
  items,
  currentIndex,
  setCurrentIndex,
  videoRef,
  isPlaying,
  onTogglePlay,
}: MediaPanelProps) {
  if (items.length === 0) return null;
  const currentItem = items[currentIndex];

  const handlePrev = () =>
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  const handleNext = () =>
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);

  const isVideo = type === "video";

  return (
    <div>
      {/* Main Display */}
      <div
        className={`relative bg-wine-dark/50 rounded-2xl overflow-hidden border-2 border-champagne-gold/30 ${
          isVideo ? "aspect-[9/16] sm:aspect-video max-h-[70vh]" : "aspect-video"
        }`}
      >
        {isVideo ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src={currentItem.src}
              className="w-full h-full object-contain"
              onEnded={() => onTogglePlay?.()}
              preload="metadata"
            />
            {/* Play Overlay */}
            {!isPlaying && (
              <button
                onClick={onTogglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group"
                aria-label="Play"
              >
                <div className="w-20 h-20 bg-champagne-gold/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaPlay className="text-3xl text-wine-dark ml-1" />
                </div>
              </button>
            )}
            {/* Pause Button (visible when playing) */}
            {isPlaying && (
              <button
                onClick={onTogglePlay}
                className="absolute bottom-4 right-4 w-12 h-12 bg-wine-dark/70 hover:bg-champagne-gold/90 rounded-full flex items-center justify-center transition-all group"
                aria-label="Pause"
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
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-wine-dark/70 hover:bg-champagne-gold/90 rounded-full flex items-center justify-center transition-all group"
          aria-label="Previous"
        >
          <FaChevronLeft className="text-lg text-champagne-gold group-hover:text-wine-dark" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-wine-dark/70 hover:bg-champagne-gold/90 rounded-full flex items-center justify-center transition-all group"
          aria-label="Next"
        >
          <FaChevronRight className="text-lg text-champagne-gold group-hover:text-wine-dark" />
        </button>
      </div>

      {/* Item Info */}
      <div className="text-center mt-4">
        <h3 className="text-lg md:text-xl font-display font-bold text-champagne-gold">
          {currentItem.title}
        </h3>
        {currentItem.description && (
          <p className="text-gray-400 mt-1 text-sm">{currentItem.description}</p>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${
              index === currentIndex
                ? "ring-2 ring-champagne-gold ring-offset-2 ring-offset-wine-dark"
                : "opacity-60 hover:opacity-100"
            }`}
            aria-label={`Item ${index + 1}`}
          >
            {isVideo ? (
              <video src={item.src} className="w-full h-full object-cover" preload="metadata" />
            ) : (
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            )}
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <FaPlay className="text-white text-xs" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1 mt-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-champagne-gold w-6"
                : "bg-gray-600 hover:bg-gray-500 w-2"
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function MediaCarousel() {
  const t = useTranslations("MediaCarousel");
  const tCat = useTranslations("MediaCategories");

  const [activeVideoCategory, setActiveVideoCategory] = useState<"usage" | "production">("usage");
  const [activeImageCategory, setActiveImageCategory] = useState<"processing" | "cases">("processing");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 视频缩略图复用 images 中的封面图/工艺图(避免硬编码同一张图多次)
  const heroThumb = images.hero.background;
  const craftThumb = images.craftsmanship.process1;

  // 视频区 - 使用
  // 视频 URL 已迁到新 OSS bucket (ligeyuanshan-taoguan),缩略图走 images.x
  const usageVideos: MediaItem[] = [
    {
      type: "video",
      src: "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/video/use/%E4%BD%BF%E7%94%A8-1.mp4",
      thumbnail: heroThumb,
      title: "Usage Tutorial 1",
      description: "How to use the ceramic amphora",
    },
    {
      type: "video",
      src: "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/video/use/%E4%BD%BF%E7%94%A8-2.mp4",
      thumbnail: heroThumb,
      title: "Usage Tutorial 2",
      description: "How to use the ceramic amphora",
    },
  ];

  // 视频区 - 制作
  // ⚠️ 当前 produce 分类的 URL 跟 use 指向同一个文件夹(/jar/attach/video/use/)
  //    后续若 produce 视频迁到独立文件夹(如 /jar/attach/video/produce/),
  //    更新这里 2 条 src 即可
  const productionVideos: MediaItem[] = [
    {
      type: "video",
      src: "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/video/use/%E4%BD%BF%E7%94%A8-2.mp4",
      thumbnail: craftThumb,
      title: "Production Process 1",
      description: "Ceramic amphora production",
    },
    {
      type: "video",
      src: "https://ligeyuanshan-taoguan.oss-accelerate.aliyuncs.com/jar/attach/video/use/%E4%BD%BF%E7%94%A8-1.mp4",
      thumbnail: craftThumb,
      title: "Production Process 2",
      description: "Ceramic amphora production",
    },
  ];

  // 图片区 - 加工(从 images.mediaCarousel.processing 取)
  const processingImages: MediaItem[] = images.mediaCarousel.processing.map((src, i) => ({
    type: "image" as const,
    src,
    title: `Processing ${i + 1}`,
  }));

  // 图片区 - 案例(从 images.mediaCarousel.cases 取)
  const caseImages: MediaItem[] = images.mediaCarousel.cases.map((src, i) => ({
    type: "image" as const,
    src,
    title: `Case ${i + 1}`,
  }));

  const currentVideoItems = activeVideoCategory === "usage" ? usageVideos : productionVideos;

  const handleVideoCategoryChange = (category: "usage" | "production") => {
    setActiveVideoCategory(category);
    setCurrentVideoIndex(0);
    setIsPlaying(false);
  };

  const handleImageCategoryChange = (category: "processing" | "cases") => {
    setActiveImageCategory(category);
    setCurrentImageIndex(0);
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
    <section className="relative py-6 md:py-20 lg:py-28 bg-gradient-to-b from-wine-dark to-wine-red/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {/* Stacked layout: Videos (top) + Images (bottom) */}
        <div className="grid grid-cols-1 gap-12">
          {/* Top: Videos */}
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-champagne-gold text-center mb-4">
              {t("videoTab")}
            </h3>
            <div className="flex justify-center gap-3 mb-6">
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
            <MediaPanel
              type="video"
              items={currentVideoItems}
              currentIndex={currentVideoIndex}
              setCurrentIndex={(i) => {
                setCurrentVideoIndex(i);
                setIsPlaying(false);
              }}
              videoRef={videoRef}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
            />
          </div>

          {/* Bottom: Images */}
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-champagne-gold text-center mb-4">
              {t("imageTab")}
            </h3>
            <div className="flex justify-center gap-3 mb-6">
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
            <MediaPanel
              type="image"
              items={activeImageCategory === "processing" ? processingImages : caseImages}
              currentIndex={currentImageIndex}
              setCurrentIndex={setCurrentImageIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}