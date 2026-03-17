import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";

export function DirectoryCard({ model, index }) {
  const IconComponent = Icons[model.icon] || Icons.Circle;

  return (
    <motion.div
      layoutId={`card-${model.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.5, 
        ease: "easeOut" 
      }}
      className="group relative h-full"
    >
      <Link 
        to={`/model/${model.id}`}
        className="block relative h-full overflow-hidden bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-500"
      >
        {/* Soft pastel glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated top highlight line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left" />

        <div className="px-8 py-10 flex flex-col items-start justify-between h-full relative z-10">
          <div className="p-3 rounded-2xl bg-white/80 dark:bg-black/20 shadow-sm mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
            <IconComponent className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          </div>
          
          <div className="flex-grow flex flex-col justify-end">
             <h2 className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300 mb-2">
               {model.name}
             </h2>
             <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
               {model.description}
             </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
