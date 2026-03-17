import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "../config/siteData";
import { cn } from "../utils";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

export function AnimePage() {
  const { animeGallery } = siteData;
  const [selectedImage, setSelectedImage] = useState(null);

  // If no images are available, show a fallback
  if (!animeGallery || animeGallery.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">没有可用的画廊图片</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="relative w-full min-h-screen pb-24 pt-12 px-4 sm:px-6 z-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 z-30 relative">
          <Link 
            to="/"
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-md transition-all",
              "bg-white/20 hover:bg-white/40 dark:bg-black/20 dark:hover:bg-black/40",
              "border border-white/40 dark:border-white/10 shadow-lg text-gray-800 dark:text-gray-200 font-semibold"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-purple-800 dark:from-white dark:to-gray-300 drop-shadow-sm">
            全景画廊
          </h1>
        </div>

        <div className={cn(
          "columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6",
          "p-6 rounded-3xl bg-white/10 dark:bg-black/10 backdrop-blur-2xl",
          "border border-white/30 dark:border-white/5 shadow-2xl"
        )}>
          {animeGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-lg group isolate break-inside-avoid cursor-pointer"
              onClick={() => setSelectedImage(item.imageUrl)}
            >
              <div className="block focus:outline-none focus:ring-4 focus:ring-indigo-500/50 rounded-2xl">
                <img 
                  src={`${import.meta.env.BASE_URL}${item.imageUrl.replace(/^\//, '')}`} 
                  alt={`Anime Image ${item.id}`} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ imageRendering: "high-quality" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors z-50 backdrop-blur-sm border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            
            {/* Expanded Image */}
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={`${import.meta.env.BASE_URL}${selectedImage.replace(/^\//, '')}`}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing the modal
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
