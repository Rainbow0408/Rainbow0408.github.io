import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../utils";

export function CTAButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="flex justify-center my-12 relative z-50 pointer-events-auto"
    >
      <Link to="/models" className="group relative inline-flex items-center justify-center">
        {/* Animated glowing border effect */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 opacity-70 blur-md group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />
        
        <div className={cn(
          "relative px-10 py-4 bg-white dark:bg-[#0f2027] rounded-full",
          "flex items-center space-x-3 transition-transform duration-300",
          "group-hover:scale-[1.02] border border-white/20"
        )}>
          <span className="text-transparent font-bold tracking-wide text-lg bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-cyan-300 dark:to-blue-500">
            探索可视化模型世界
          </span>
          <ArrowRight className="w-5 h-5 text-indigo-500 dark:text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
