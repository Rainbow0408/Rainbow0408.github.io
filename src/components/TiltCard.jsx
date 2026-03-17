import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function TiltCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    setMousePos({ x: localX, y: localY });

    const centerX = localX - rect.width / 2;
    const centerY = localY - rect.height / 2;

    const multiplier = 8; // Adjust max tilt angle
    setRotateX(-(centerY / (rect.height / 2)) * multiplier);
    setRotateY((centerX / (rect.width / 2)) * multiplier);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className} interactive-card group`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      style={{ 
        transformPerspective: 1200, 
        transformStyle: "preserve-3d",
        ...style 
      }}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.2), transparent 40%)`
        }}
      />
      <div className="relative z-20 w-full h-full" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
