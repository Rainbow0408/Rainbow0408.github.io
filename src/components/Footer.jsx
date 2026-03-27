import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function Footer() {
  const totalVisitors = 55;
  const totalViews = 78;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full mt-16 py-8 px-4 sm:px-6 border-t border-white/20 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>© {new Date().getFullYear()}</span>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Ra1nb0w
          </span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          </span>
        </div>

        {/* Right: Manual visitor stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-gray-500 dark:text-gray-500">
          <span>
            总访客 <span className="font-bold text-indigo-500 dark:text-indigo-400">{totalVisitors}</span>
          </span>
          <span className="w-px h-3 bg-gray-400/30" />
          <span>
            总访问 <span className="font-bold text-purple-500 dark:text-purple-400">{totalViews}</span>
          </span>
          <span className="text-[10px] text-gray-400">手动统计</span>
        </div>
      </div>
    </motion.footer>
  );
}
