import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Code2, Layers } from "lucide-react";
import { cn } from "../utils";

export function CTAButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="w-full my-8 relative z-50"
    >
      <Link to="/models" className="block group">
        <div className={cn(
          "relative overflow-hidden rounded-3xl",
          "bg-white/20 dark:bg-black/20 backdrop-blur-sm md:backdrop-blur-xl",
          "border border-white/50 dark:border-white/10",
          "shadow-xl hover:shadow-2xl transition-all duration-500",
          "hover:-translate-y-1"
        )}>
          {/* Animated gradient border glow on hover */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500 -z-10" />

          <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Left: Icon cluster */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Center: Text content */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">
                探索可视化模型世界
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                基于原生 Canvas 与 WebGL 构建的可视化实验作品集，包含粒子系统、分形几何、流体模拟等交互式项目。
              </p>
            </div>

            {/* Right: CTA */}
            <div className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg group-hover:shadow-indigo-500/30 group-hover:scale-105 transition-all duration-300">
              <span>进入体验</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Decorative floating particles */}
          <div className="absolute top-4 right-8 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none" />
          <div className="absolute bottom-4 left-12 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-cyan-500/10 rounded-full blur-lg group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}
