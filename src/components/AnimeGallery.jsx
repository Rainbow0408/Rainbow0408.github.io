import { motion } from "framer-motion";
import { siteData } from "../config/siteData";
import { cn } from "../utils";
import { ImageIcon } from "lucide-react";

export function AnimeGallery() {
  const { animeGallery } = siteData;
  const mentorCoverImage = "/images/cityphotos/大理.webp";

  if (!animeGallery || animeGallery.length === 0) return null;

  // 导师演示模式：使用风景封面，同时暂时关闭二级画廊入口。
  const cover = { imageUrl: mentorCoverImage, title: "风景封面" };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
      className="w-full h-full relative"
    >
      <div className={cn(
        "p-6 rounded-3xl bg-white/20 dark:bg-black/20 backdrop-blur-sm md:backdrop-blur-xl h-full flex flex-col will-change-transform",
        "border border-white/50 dark:border-white/10 shadow-xl"
      )}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            精选画廊
          </h2>
          <span className="text-sm font-medium text-gray-500 transition-colors flex items-center gap-1">
            暂不开放 <ImageIcon className="w-4 h-4" />
          </span>
        </div>
        
        <div className="block relative w-full flex-1 min-h-[250px] rounded-2xl overflow-hidden shadow-lg group isolate">
          <img 
            src={`${import.meta.env.BASE_URL}${cover.imageUrl.replace(/^\//, '')}`} 
            alt={cover.title} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-white/5 aspect-[4/3] sm:aspect-auto" 
            style={{ imageRendering: "high-quality" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 right-6 text-white font-semibold text-lg drop-shadow-md tracking-wider flex items-center gap-2 opacity-100 transition-all duration-300">
            <div className="w-8 h-[2px] bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
