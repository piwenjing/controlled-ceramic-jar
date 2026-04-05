import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ProductStructure from "@/components/sections/ProductStructure";
import SuccessCases from "@/components/sections/SuccessCases";
import MediaCarousel from "@/components/sections/MediaCarousel";
import ComparisonSection from "@/components/sections/ComparisonSection";
import BrandStory from "@/components/sections/BrandStory";
import CoreAdvantages from "@/components/sections/CoreAdvantages";
import ProductLineup from "@/components/sections/ProductLineup";
import Specifications from "@/components/sections/Specifications";
import CraftsmanshipSection from "@/components/sections/CraftsmanshipSection";
import ContactInfo from "@/components/sections/ContactInfo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <SuccessCases />
      <MediaCarousel />
      <ComparisonSection />
      <ProductStructure />
      <BrandStory />
      <CoreAdvantages />
      <ProductLineup />
      <CraftsmanshipSection />
      <Specifications />
      <ContactInfo />
    </>
  );
}
