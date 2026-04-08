"use client";

import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaImage } from "react-icons/fa";

import { useState, useEffect, useCallback } from "react";

// RetryImage component with auto-retry, loading and error states
interface RetryImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  onLoad?: () => void;
}

function RetryImage({ src, alt, className = "", loading = "lazy", onLoad }: RetryImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const getRetrySrc = (originalSrc: string, retry: number) => {
    if (retry === 0) return originalSrc;
    const separator = originalSrc.includes("?") ? "&" : "?";
    return `${originalSrc}${separator}retry=${retry}`;
  };

  const handleError = useCallback(() => {
    if (retryCount < maxRetries) {
      const nextRetry = retryCount + 1;
      const delay = nextRetry * 1000; // 1s, 2s, 3s delays
      
      setTimeout(() => {
        setRetryCount(nextRetry);
        setStatus("loading");
      }, delay);
    } else {
      setStatus("error");
    }
  }, [retryCount]);

  const handleLoad = useCallback(() => {
    setStatus("loaded");
    onLoad?.();
  }, [onLoad]);

  // Reset state when src changes
  useEffect(() => {
    setStatus("loading");
    setRetryCount(0);
  }, [src]);

  if (status === "error") {
    return (
      <div className={`${className} bg-wine-red/10 flex flex-col items-center justify-center`}>
        <FaImage className="w-8 h-8 text-wine-red/40 mb-2" />
        <span className="text-wine-red/60 text-xs">图片加载失败</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {status === "loading" && (
        <div className="absolute inset-0 bg-wine-red/20 animate-pulse" />
      )}
      <img
        src={getRetrySrc(src, retryCount)}
        alt={alt}
        className={`${className} ${status === "loading" ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

const caseImages = [
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406114030_468_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406114029_467_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406114026_466_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406114023_465_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406114020_464_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406114017_463_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406113927_461_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406113924_460_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406113921_459_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406113916_458_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406113909_457_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406113905_456_226.jpg",
  "https://ligeyuanshan.oss-accelerate.aliyuncs.com/pic-2-successeg/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260406113902_455_226.jpg",
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, caseImages.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % caseImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + caseImages.length) % caseImages.length);
  };

  return (
    <>
      {/* Carousel Container */}
      <div className="relative mb-12 md:mb-16">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView + 1.5)}%)`,
            }}
          >
            {caseImages.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 cursor-pointer group"
                style={{ width: `calc(${100 / itemsPerView}% - 12px)` }}
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-wine-red/20">
                  <RetryImage
                    src={src}
                    alt={`Wine amphora success case ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-wine-dark/90 border border-champagne-gold/50 flex items-center justify-center text-champagne-gold hover:bg-champagne-gold hover:text-wine-dark transition-all duration-300 shadow-lg z-10"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-wine-dark/90 border border-champagne-gold/50 flex items-center justify-center text-champagne-gold hover:bg-champagne-gold hover:text-wine-dark transition-all duration-300 shadow-lg z-10"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-champagne-gold w-6"
                  : "bg-champagne-gold/40 hover:bg-champagne-gold/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <span className="text-2xl">&times;</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <RetryImage
              src={caseImages[lightboxIndex]}
              alt={`Wine amphora success case ${lightboxIndex + 1}`}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxIndex + 1} / {caseImages.length}
          </div>
        </div>
      )}
    </>
  );
}

export default function SuccessCases() {
  const t = useTranslations("SuccessCases");
  const regions: Array<{
    name: string;
    desc: string;
    wineries: string[];
  }> = t.raw("regions");

  return (
    <section
      id="cases"
      className="relative py-10 md:py-20 lg:py-28 bg-wine-dark scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <ImageCarousel />

        <div className="space-y-6 md:space-y-12">
          {regions.map((region, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-wine-red/30 to-wine-red/10 border border-champagne-gold/30 rounded-xl p-4 sm:p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <FaMapMarkerAlt className="text-3xl text-champagne-gold" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                  {region.name}
                </h3>
              </div>
              <p className="text-champagne-gold text-lg mb-4">{region.desc}</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {region.wineries.map((winery, j) => (
                  <div
                    key={j}
                    className="bg-wine-dark/50 rounded-lg p-4 text-center"
                  >
                    <p className="text-champagne-gold font-semibold text-sm">
                      {winery}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
