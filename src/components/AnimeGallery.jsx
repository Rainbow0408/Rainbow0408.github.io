import { motion } from "framer-motion";
import { siteData } from "../config/siteData";
import { cn } from "../utils";
import { Link } from "react-router-dom";
import { ImageIcon } from "lucide-react";

export function AnimeGallery() {
  const { animeGallery } = siteData;

  if (!animeGallery || animeGallery.length === 0) return null;

  // Use the image marked as isCover, or fallback to the first image
  const cover = animeGallery.find(item => item.isCover) || animeGallery[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
      className="w-full h-full relative"
    >
      <div className={cn(
        "p-6 rounded-3xl bg-white/20 dark:bg-black/20 backdrop-blur-xl h-full flex flex-col",
        "border border-white/50 dark:border-white/10 shadow-xl"
      )}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            精选画廊
          </h2>
          <Link to="/anime" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 group">
            查看全部 <ImageIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>
        </div>
        
        <Link to="/anime" className="block relative w-full flex-1 min-h-[250px] rounded-2xl overflow-hidden cursor-pointer shadow-lg group isolate">
          <img 
            src={cover.imageUrl} 
            alt={cover.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            style={{ imageRendering: "high-quality" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 right-6 text-white font-semibold text-lg drop-shadow-md tracking-wider flex items-center gap-2 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <span>进入画集</span>
            <div className="w-8 h-[2px] bg-white rounded-full"></div>
          </div>
        </Link>
      </div>
    </motion.section>
  );
}
