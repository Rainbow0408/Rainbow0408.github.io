import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function Live2DEyeTracker() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const vX = e.clientX - centerX;
      const vY = e.clientY - centerY;
      
      const distance = Math.sqrt(vX * vX + vY * vY);
      const maxDistance = 12; // Max offset
      
      // Normalize and scale
      const followX = (vX / distance || 0) * Math.min(distance * 0.05, maxDistance);
      const followY = (vY / distance || 0) * Math.min(distance * 0.05, maxDistance);
      
      setMouse({ x: followX, y: followY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[160px] bg-black/20 rounded-2xl border border-white/10 flex items-center justify-center gap-6 relative overflow-hidden group shadow-inner">
      <div className="absolute top-3 left-3 text-[10px] font-mono text-gray-500 tracking-widest">LIVE2D PROTOTYPE (GAZE TRACKING)</div>
      
      {/* Left Eye */}
      <div className="w-14 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-indigo-400 shadow-inner">
        <motion.div 
          className="w-8 h-8 bg-indigo-900 rounded-full relative"
          animate={{ x: mouse.x, y: mouse.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1" />
          <div className="w-1 h-1 bg-white rounded-full absolute bottom-2 right-2 opacity-60" />
        </motion.div>
      </div>

      {/* Right Eye */}
      <div className="w-14 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-indigo-400 shadow-inner">
        <motion.div 
          className="w-8 h-8 bg-indigo-900 rounded-full relative"
          animate={{ x: mouse.x, y: mouse.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1" />
          <div className="w-1 h-1 bg-white rounded-full absolute bottom-2 right-2 opacity-60" />
        </motion.div>
      </div>
    </div>
  );
}
