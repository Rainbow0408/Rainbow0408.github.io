import { motion } from "framer-motion";
import { cn } from "../utils";
import { siteData } from "../config/siteData";

export function ProfileHeader() {
  const { name, avatar, description, portfolioLabel } = siteData.profile;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
      className={cn(
        "w-full max-w-5xl mx-auto mt-8 relative rounded-3xl z-40",
        "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/50 dark:border-white/10",
        "shadow-2xl flex flex-col sm:flex-row items-center justify-between p-6 sm:px-10 overflow-hidden"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-blue-500/10 dark:to-cyan-500/10" />
      
      <div className="relative flex items-center space-x-6 z-20 w-full">
        <div className="relative isolate">
          <motion.img 
            src={`${import.meta.env.BASE_URL}${avatar.replace(/^\//, '')}`} 
            alt={`${name} Avatar`} 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/80 dark:border-white/30 shadow-[0_0_15px_rgba(0,0,0,0.1)] object-cover relative z-30 transform-gpu"
            style={{ imageRendering: "high-quality" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-purple-800 dark:from-white dark:to-gray-300">
            {name}
          </h1>
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-400 mt-1 max-w-md">
            {description}
          </p>
        </div>
      </div>
      
      <div className="hidden sm:block absolute right-10 top-1/2 -translate-y-1/2 z-20">
         <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500/50 dark:text-white/30 rotate-90 origin-right">
           {portfolioLabel}
         </div>
      </div>
    </motion.header>
  );
}
