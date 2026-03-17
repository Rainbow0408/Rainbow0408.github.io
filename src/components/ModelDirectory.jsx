import { motion } from "framer-motion";
import { DirectoryCard } from "./DirectoryCard.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function ModelDirectory({ models }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen text-gray-900 dark:text-gray-100 pt-20 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30 relative"
    >
      {/* Gentle background gradient to fit the fresh aesthetic */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#f5f3ff] dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#0f1020] opacity-80" />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-300">
              项目图鉴
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium text-sm md:text-base tracking-wide max-w-xl">
              探索一系列基于原生 Canvas 与 WebGL 构建的可视化实验。
            </p>
          </div>
          
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100 transition-colors bg-white/50 dark:bg-black/20 backdrop-blur-md border border-indigo-100 dark:border-white/10 shadow-sm hover:shadow-md px-5 py-2.5 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wide">返回主页</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {models.map((model, idx) => (
            <DirectoryCard key={model.id} model={model} index={idx} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
