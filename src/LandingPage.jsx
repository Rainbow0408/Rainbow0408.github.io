import { EntranceBlur } from "./components/EntranceBlur.jsx";
import { ProfileHeader } from "./components/ProfileHeader.jsx";
import { AnimeGallery } from "./components/AnimeGallery.jsx";
import { FootprintMap } from "./components/FootprintMap.jsx";
import { TimeAllocation } from "./components/TimeAllocation.jsx";
import { CTAButton } from "./components/CTAButton.jsx";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen pb-24"
    >
      <EntranceBlur />
      
      <div className="pt-8 px-4 sm:px-6">
        <ProfileHeader />
      </div>
      
      <AnimeGallery />
      
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 mt-12 px-4 sm:px-6 relative z-20">
        <div className="flex-[3] w-full">
          <FootprintMap />
        </div>
        <div className="flex-[2] w-full">
          <TimeAllocation />
        </div>
      </div>
      
      <CTAButton />
    </motion.div>
  );
}
