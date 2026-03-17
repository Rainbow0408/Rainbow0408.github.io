import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const buildLogs = [
  "[ 10%] Building CXX object src/core/main.cpp.o",
  "[ 20%] Building CXX object src/engine/renderer.cpp.o",
  "[ 30%] Linking CXX static library libengine.a",
  "[ 40%] Built target engine",
  "[ 50%] Building CXX object src/ui/glassmorphism.cpp.o",
  "[ 60%] Building CXX object src/physics/cursor.cpp.o",
  "[ 70%] Linking CXX executable rainbow_system",
  "[ 80%] Optimizing layouts and mounting React tree...",
  "[ 90%] Injecting ECharts and Live2D context...",
  "[100%] Build target rainbow_system completed successfully."
];

export function CompilerLoading({ onComplete }) {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (logIndex < buildLogs.length) {
      const timer = setTimeout(() => {
        setLogIndex(prev => prev + 1);
      }, Math.random() * 80 + 20); // very fast typing effect
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 600); // pause at the end before opening
      return () => clearTimeout(timer);
    }
  }, [logIndex, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0c0c0c] text-[#4af626] font-mono text-sm sm:text-base p-6 overflow-hidden flex flex-col justify-end pb-12"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: "blur(8px)",
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-1">
        <p className="text-gray-500 mb-4">root@rainbow-server:~/workspace# make sys_rebuild -j12</p>
        {buildLogs.slice(0, logIndex).map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
          >
            {log}
          </motion.div>
        ))}
        {logIndex < buildLogs.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 bg-[#4af626] mt-1 inline-block align-middle"
          />
        )}
      </div>
    </motion.div>
  );
}
