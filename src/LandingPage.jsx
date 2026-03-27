import { ProfileCard } from "./components/ProfileCard.jsx";
import { AnimeGallery } from "./components/AnimeGallery.jsx";
import { FootprintMap } from "./components/FootprintMap.jsx";
import { VisitorChart } from "./components/charts/VisitorChart.jsx";
import { PreferenceRadar } from "./components/charts/PreferenceRadar.jsx";
import { MilestoneTimeline } from "./components/charts/MilestoneTimeline.jsx";
import { TechTreeGraph } from "./components/charts/TechTreeGraph.jsx";
import { CTAButton } from "./components/CTAButton.jsx";
import { Footer } from "./components/Footer.jsx";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen pb-0"
    >

      {/* Row 1: ProfileCard + AnimeGallery (always first) */}
      <div className="pt-12 px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 items-stretch relative z-30">
        <div className="w-full lg:w-1/3 flex">
          <ProfileCard />
        </div>
        <div className="w-full lg:w-2/3 flex">
          <AnimeGallery />
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 mt-12 px-4 sm:px-6 relative z-20">
        {/* Row 2: FootprintMap + VisitorChart */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-[3] w-full">
            <FootprintMap />
          </div>
          <div className="flex-[2] w-full">
            <VisitorChart />
          </div>
        </div>
        
        {/* Row 3: PreferenceRadar */}
        <div className="w-full mt-4">
          <PreferenceRadar />
        </div>
        
        {/* Row 4: Visualization CTA Card (before TechTree) */}
        <CTAButton />
        
        {/* Row 5: TechTree */}
        <div className="w-full">
          <TechTreeGraph />
        </div>
        
        {/* Row 6: Milestone Timeline */}
        <div className="w-full">
          <MilestoneTimeline />
        </div>
        
      </div>
      
      {/* Footer with visitor stats */}
      <Footer />
    </motion.div>
  );
}
